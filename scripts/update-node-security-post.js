require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Securing Your Node.js & Express API: A Production Checklist";

const updatedContent = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Beyond Functionality: The Importance of API Security" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Building a functional API is only half the battle. To create a famous, trusted application, you must protect your users and your infrastructure from attacks. An insecure API can lead to data breaches, service disruptions, and a loss of user trust. This guide provides a production-ready checklist of essential security practices for any Node.js and Express API." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "1. Set Security Headers with `helmet`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "`helmet` is a crucial middleware that sets various HTTP headers to help protect your app from well-known web vulnerabilities like Cross-Site Scripting (XSS) and click-jacking. It's a simple, one-line addition that provides a massive security boost." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const express = require('express');\nconst helmet = require('helmet');\n\nconst app = express();\n\napp.use(helmet()); // Sets 11 security-related HTTP headers` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "2. Implement Rate Limiting" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Rate limiting prevents brute-force attacks against your authentication and protects against Denial-of-Service (DoS) attacks by limiting the number of requests a single IP address can make in a given time. The `express-rate-limit` package is the standard solution." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const rateLimit = require('express-rate-limit');\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100, // Limit each IP to 100 requests per windowMs\n  standardHeaders: true,\n  legacyHeaders: false,\n});\n\napp.use(limiter);` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "3. Sanitize and Validate User Input" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Never trust user input. Malicious input is a primary vector for attacks like NoSQL injection and XSS. Use a validation library like `joi` or `express-validator` to ensure that all incoming data is in the expected format before your application processes it." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "4. Use Asynchronous Hashing for Passwords" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Never, ever store passwords in plain text. Use a strong, slow, and salted hashing algorithm like `bcrypt`. The hashing should always be done asynchronously to avoid blocking the Node.js event loop." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const bcrypt = require('bcrypt');\nconst saltRounds = 10;\n\nasync function hashPassword(password) {\n  const hash = await bcrypt.hash(password, saltRounds);\n  return hash;\n}` }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "5. Protect Against NoSQL Injection" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "If you're using MongoDB, attackers can use malicious input to manipulate your queries. A common technique is to submit an object containing query operators like `$gt`. Using a library like `mongoose` for data modeling can help, as can sanitizing user input to remove any `$` characters." }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: Build a Fortress" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "API security is a continuous process, not a one-time setup. This checklist covers the most critical vulnerabilities. By implementing these practices, you build a strong foundation of security for your application. This protects your users, builds trust, and is an essential step in creating a truly world-class, production-ready service." }] }
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
        { $set: { content: updatedContent } },
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
