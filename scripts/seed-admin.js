/**
 * Seed an admin user into MongoDB.
 *
 * Usage (PowerShell):
 *   $env:MONGODB_URI="mongodb+srv://..."
 *   node scripts/seed-admin.js --email admin@gmail.com --password "admin@123"
 *
 * Notes:
 * - Uses the existing Mongoose User model, so passwords are hashed via the pre('save') hook.
 * - Safe to re-run: it will update role to 'admin' if the user already exists.
 */

const path = require('path');

// Load env vars if present
try {
  // eslint-disable-next-line import/no-extraneous-dependencies
  require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });
} catch (_) {}

// Ensure we can import the app models from a Node script
const connectDB = require('../app/lib/mongodb').default || require('../app/lib/mongodb');
const User = require('../app/models/User').default || require('../app/models/User');

function getArg(name, fallback) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return fallback;
}

async function main() {
  // Support both flags and positional args:
  //   node scripts/seed-admin.js --email a@b.com --password "pw"
  //   node scripts/seed-admin.js a@b.com "pw"
  const positionalEmail = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : undefined;
  const positionalPassword = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : undefined;

  const email = getArg('email', positionalEmail || 'admin@gmail.com');
  const password = getArg('password', positionalPassword || 'admin@123');
  const name = getArg('name', 'Admin');

  if (!process.env.MONGODB_URI) {
    console.error('Missing MONGODB_URI. Add it to .env.local or environment variables.');
    process.exit(1);
  }

  await connectDB();

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({
      name,
      email,
      password,
      role: 'admin',
      plan: 'free',
      learningPath: 'none',
    });
    await user.save();
    console.log(`Created admin user: ${email}`);
  } else {
    user.role = 'admin';
    if (!user.name) user.name = name;
    // Reset password if explicitly requested OR if a password was provided on the command line.
    const reset = getArg('resetPassword', 'false') === 'true';
    const explicitPasswordProvided =
      process.argv.includes('--password') ||
      process.argv.includes('--resetPassword') ||
      typeof positionalPassword === 'string';
    if (reset || explicitPasswordProvided) user.password = password;
    await user.save();
    console.log(`Updated existing user to admin: ${email}${reset ? ' (password reset)' : ''}`);
  }

  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


