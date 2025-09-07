require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;

const MONGODB_URI = process.env.MONGODB_URI;
const POST_TITLE = "The Temporal API: A Modern Approach to Dates and Times in JavaScript";

const content = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The End of an Era: Why We Needed a New Date API" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "For over a decade, the JavaScript `Date` object has been a notorious source of bugs and developer frustration. It's mutable, its API is inconsistent, and it struggles with time zones. Libraries like Moment.js and date-fns became essential, but added significant weight to bundles. The `Temporal` API is the official, modern solution from the TC39 committee, designed to solve these problems with a powerful, immutable, and unambiguous set of tools." }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Core Concept: Immutability and Specificity" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The two biggest wins for `Temporal` are:" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Immutability: Every `Temporal` object is immutable. When you perform an operation, like adding 3 days, it returns a *new* object, eliminating a huge class of bugs." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Specificity: Instead of one `Date` object for everything, `Temporal` provides distinct types for different use cases, making your code clearer and less error-prone." }] }] },
        ]},

        { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "The Most Important `Temporal` Types" }] },
        { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`Temporal.PlainDate`: A date with no time and no time zone (e.g., '2025-09-26')." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`Temporal.PlainTime`: A time with no date and no time zone (e.g., '14:30:00')." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`Temporal.PlainDateTime`: A combination of the two above." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`Temporal.ZonedDateTime`: A date and time in a specific time zone (the most powerful type)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`Temporal.Instant`: An exact point in universal time, independent of calendar or time zone (similar to the old `Date` object's internal value)." }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "`Temporal.Duration`: A length of time (e.g., '3 hours and 30 minutes')." }] }] },
        ]},

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Practical Examples in 2025" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "Let's see how `Temporal` simplifies common date operations. (Note: As of late 2024, `Temporal` is in Stage 3 and requires a polyfill for full browser support)." }] },
        { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// 1. Creating and modifying a date\nconst today = Temporal.PlainDate.from('2025-09-26');\nconst nextWeek = today.add({ days: 7 }); // Returns a new object\n\nconsole.log(today.toString());      // 2025-09-26\nconsole.log(nextWeek.toString());   // 2025-10-03\n\n// 2. Working with time zones\nconst meetingTimeInNY = Temporal.ZonedDateTime.from('2025-11-10T10:00:00[America/New_York]');\nconst meetingTimeInLondon = meetingTimeInNY.withTimeZone('Europe/London');\n\nconsole.log(meetingTimeInNY.toString());     // 2025-11-10T10:00:00-05:00[America/New_York]\nconsole.log(meetingTimeInLondon.toString()); // 2025-11-10T15:00:00+00:00[Europe/London]\n\n// 3. Calculating durations\nconst flightDeparture = Temporal.PlainDateTime.from('2025-03-01T10:00');\nconst flightArrival = Temporal.PlainDateTime.from('2025-03-01T18:45');\nconst flightDuration = flightDeparture.until(flightArrival);\n\nconsole.log(flightDuration.total({ unit: 'hour' })); // 8.75` }] },

        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Conclusion: The Future is `Temporal`" }] },
        { type: 'paragraph', content: [{ type: 'text', text: "The `Temporal` API is one of the most significant and long-awaited additions to the JavaScript language. It provides a robust, immutable, and developer-friendly toolkit for handling dates and times. While it may still require a polyfill in early 2025, it is the clear future. By learning and adopting `Temporal` now, you are future-proofing your applications, eliminating a common source of bugs, and writing cleaner, more readable, and more reliable date-based logic." }] },
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
