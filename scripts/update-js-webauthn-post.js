require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Secure Authentication with WebAuthn and Passkeys";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem with Passwords" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Passwords are a security nightmare. Users choose weak ones, reuse them across services, and fall victim to phishing attacks. WebAuthn is a modern web standard that allows users to log in using secure, hardware-based authenticators instead of passwords. This could be their fingerprint (Windows Hello, Touch ID), their face (Face ID), or a physical security key (like a YubiKey). Passkeys are the user-friendly implementation of this standard, syncing these credentials across a user's devices (e.g., via iCloud Keychain or Google Password Manager)." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "How WebAuthn Works: Public-Key Cryptography" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The process is based on public-key cryptography, the same technology that secures the internet (HTTPS)." }] },
        { type: 'orderedList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Registration: When a user registers, their device (the 'authenticator') creates a unique public/private key pair for your website. The private key is stored securely on the device and never leaves it. The public key is sent to your server and stored." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Authentication: To log in, your server sends a 'challenge' (a random string) to the browser. The browser asks the authenticator to sign this challenge with the private key. The device prompts the user for their biometric or PIN to authorize this. The signed challenge is sent back to the server. The server verifies the signature using the stored public key. Since only the user's device could have signed the challenge correctly, their identity is verified." }] }] },
        ]},
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "A Simplified Code Example (Registration)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The WebAuthn API can be complex. Libraries like `simplewebauthn` are highly recommended. This example shows the core browser API call." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `async function register() {\n  // 1. Fetch challenge and user info from your server\n  const options = await fetch('/register-options').then(res => res.json());\n\n  // 2. Call the WebAuthn API\n  try {\n    const credential = await navigator.credentials.create({\n      publicKey: options\n    });\n\n    // 3. Send the resulting public key credential to your server to be stored\n    await fetch('/register-verify', {\n      method: 'POST',\n      body: JSON.stringify(credential),\n      headers: { 'Content-Type': 'application/json' }\n    });\n    \n    alert('Registration successful!');\n  } catch (err) {\n    console.error('Registration failed:', err);\n  }\n}` }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Benefits of Passkeys" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Phishing Resistant: Since credentials are tied to a specific website origin, users can't be tricked into using them on a fake site." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Strong Security: Based on industry-standard, strong public-key cryptography." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Better UX: Faster and easier for users than typing passwords." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "WebAuthn and Passkeys represent the future of web authentication. By moving to a passwordless model, you can dramatically improve the security of your application and provide a more seamless, modern login experience for your users." }] },
    ]
};

async function updatePostContent() {
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    const result = await Post.findOneAndUpdate(
        { title: POST_TITLE },
        { $set: { content: content } },
        { new: true }
    );

    if (result) {
        console.log(`Successfully updated post: ${result.title}`);
    } else {
        console.log(`Could not find a post with the title: "${POST_TITLE}"`);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

updatePostContent();
