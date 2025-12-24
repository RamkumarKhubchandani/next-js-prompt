require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "Intl.Segmenter API: Advanced Internationalization and Text Processing";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Challenge of Splitting Text" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Splitting a string by words seems simple, right? Just use `string.split(' ')`. But this fails for many languages. In Japanese, there are no spaces between words (e.g., '日本語'). In German, you have long compound words ('Donaudampfschifffahrtsgesellschaftskapitän'). `split()` is not unicode-aware and can't handle grapheme clusters like emojis ('👩‍👩‍👧‍👦'). The `Intl.Segmenter` API solves this by providing a locale-aware way to correctly split strings into words, sentences, or graphemes." }] },
        
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Splitting by Grapheme (User-Perceived Characters)" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "A grapheme is the smallest unit of a writing system. For users, it's what they see as a single character, which might be composed of multiple code points (e.g., an emoji with a skin tone modifier)." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const emojiString = '👨‍👩‍👧‍👦 Family';\n\n// Incorrectly splits the emoji\nconsole.log([...emojiString].length); // Outputs: 9\n\n// Correctly segments by grapheme\nconst segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });\nconst segments = segmenter.segment(emojiString);\n\nconst graphemes = Array.from(segments).map(s => s.segment);\nconsole.log(graphemes); // Outputs: ['👨‍👩‍👧‍👦', ' ', 'F', 'a', 'm', 'i', 'l', 'y']\nconsole.log(graphemes.length); // Outputs: 8` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Splitting by Word in Different Locales" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "This is where `Intl.Segmenter` truly shines. It understands the word boundary rules for different languages." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const japaneseString = '日本語のテキスト'; // 'Japanese text'\n\n// Incorrect: split() doesn't work\nconsole.log(japaneseString.split(' ')); // Outputs: ['日本語のテキスト']\n\n// Correct: Use Intl.Segmenter for the 'ja' (Japanese) locale\nconst japaneseSegmenter = new Intl.Segmenter('ja', { granularity: 'word' });\nconst japaneseSegments = Array.from(japaneseSegmenter.segment(japaneseString));\n\n// The 'isWordLike' property helps filter out punctuation\nconst words = japaneseSegments\n    .filter(segment => segment.isWordLike)\n    .map(segment => segment.segment);\n\nconsole.log(words); // Outputs: ['日本語', 'の', 'テキスト']` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Practical Use Cases" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Accurately counting the number of characters in a string." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Implementing a word or character counter in a text editor." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Correctly highlighting or selecting words on double-click in any language." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Building robust international search functionality." }] }] },
        ]},
        { type: 'paragraph', content: [{ type: 'text', text: "The `Intl.Segmenter` is a powerful and essential tool for building truly global web applications. By respecting the linguistic rules of different locales, it ensures that your application handles text correctly and provides a better user experience for everyone, everywhere." }] },
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
