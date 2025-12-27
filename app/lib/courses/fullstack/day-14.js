export const day14 = {
  day: 14,
  title: "Security: Hashing & Salting",
  intro: "Protecting user passwords.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Hashing vs encryption (and why passwords must be hashed, not encrypted).</li>
  <li>Salts, work factors, and why slow hashes defeat brute force.</li>
  <li>Modern choices: bcrypt vs scrypt vs argon2.</li>
  <li>Safe auth storage: pepper, timing-safe compares, and upgrade strategy.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Hashing vs Encryption</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6 text-sm">
  <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl text-gray-700 dark:text-light-200">
    <p class="font-bold text-red-700 dark:text-red-300 mb-2">Encryption (reversible)</p>
    <p>If you can decrypt it, attackers can too if keys leak.</p>
  </div>
  <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl text-gray-700 dark:text-light-200">
    <p class="font-bold text-green-300 mb-2">Hashing (one-way)</p>
    <p>Store only a derived value. Validate by recomputing and comparing.</p>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Why “Slow” is Good</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Attackers do billions of hashes per second with GPUs. You want a hashing scheme that is slow and expensive per guess.
</p>
            `,
  code: `/**
 * Day 14: Password hashing (bcrypt) + upgrade strategy
 * Install: npm i bcrypt
 */

const bcrypt = require('bcrypt');

async function hashPassword(password) {
  // cost factor: higher = slower (more secure but more CPU)
  const cost = 12;
  return bcrypt.hash(password, cost);
}

async function verifyPassword(password, storedHash) {
  // bcrypt.compare is timing-safe internally
  return bcrypt.compare(password, storedHash);
}

// Upgrade strategy:
// If user logs in and storedHash has lower cost factor, rehash with higher cost.
async function verifyAndUpgrade(password, storedHash, persistNewHash) {
  const ok = await verifyPassword(password, storedHash);
  if (!ok) return false;

  const currentCost = bcrypt.getRounds(storedHash);
  const targetCost = 12;
  if (currentCost < targetCost) {
    const newHash = await bcrypt.hash(password, targetCost);
    await persistNewHash(newHash);
  }
  return true;
}`,
  comparison: {
    junior: `// ❌ Plain Text / MD5
db.save({ password: "password123" });
// One hack = Everyone exposed`,
    senior: `// ✅ Salted Hash
// Saved as: $2b$10$nOUIs5...
// Even if DB leaks, passwords are safe`
  },
  interview: {
    questions: [
      {
        q: "Why use a salt?",
        a: "To make identical passwords produce different hashes and to defeat precomputed rainbow tables. Salts are stored with the hash and are not secret."
      },
      {
        q: "Why not use SHA-256 for passwords?",
        a: "Fast hashes are bad for passwords because attackers can brute force quickly. Password hashing needs slow, adaptive algorithms like bcrypt/scrypt/argon2."
      },
      {
        q: "How do you increase password hashing strength over time?",
        a: "Use an upgrade strategy: store the cost factor; on successful login, if cost is lower than desired, rehash with a higher cost and store the new hash."
      }
    ]
  }
};
