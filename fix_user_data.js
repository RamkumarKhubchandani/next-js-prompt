
const mongoose = require('mongoose');

// Use the connection string from your .env.local or hardcoded for this script if known
// Assuming typical local mongo or provided via env
require('dotenv').config({ path: '.env.local' });

// We need to define the User schema briefly to use it, or import it if we were in a module system
// But for a standalone script, defining a minimal schema is often easier on the fly
// However, since we have the app structure, let's try to import or just raw-mongo it.
// Given strict mode, let's use the app's connection logic if possible, or just standard mongoose.

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/asiofication"; // Fallback if env missing

async function fixUser() {
    if (!MONGODB_URI) {
        console.error('No MONGODB_URI found');
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');

        const email = 'ramkumarkhub@yahoo.com';

        // Find the user first
        const user = await mongoose.connection.db.collection('users').findOne({ email });

        if (!user) {
            console.log('User not found:', email);
            return;
        }

        console.log('Found user:', user);

        // Update fields
        const result = await mongoose.connection.db.collection('users').updateOne(
            { email },
            {
                $set: {
                    plan: 'pro',
                    role: 'user', // Ensure role is valid
                    learningPath: 'javascript', // Set expected path
                    subscriptionEndDate: new Date('2026-12-31T23:59:59Z'), // Extend far future
                    activePro: true
                }
            }
        );

        console.log('Update result:', result);

        const updatedUser = await mongoose.connection.db.collection('users').findOne({ email });
        console.log('Updated user state:', {
            email: updatedUser.email,
            plan: updatedUser.plan,
            learningPath: updatedUser.learningPath,
            subscriptionEndDate: updatedUser.subscriptionEndDate
        });

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await mongoose.disconnect();
    }
}

fixUser();
