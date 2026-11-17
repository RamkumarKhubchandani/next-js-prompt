import { COURSE_INDIA } from './course-india.js';

/**
 * 20 Plain-language FAQs for the Full Stack Live Coding Course.
 * Honest, direct, no marketing hype, no unbacked claims.
 */

export const COURSE_FAQS = [
  {
    id: 'prerequisites',
    question: 'What are the prerequisites for this course?',
    answer: 'You need basic computer literacy: typing comfortably, creating and organizing folders, installing software on your machine, and using a modern web browser like Chrome or Firefox. You do not need any prior programming background, mathematics degree, or computer science credential. We start from ground zero on Day 1.',
  },
  {
    id: 'laptop-specs',
    question: 'What laptop or computer hardware do I need?',
    answer: 'Any standard laptop or desktop running Windows 10/11, macOS (Intel or Apple Silicon), or a modern Linux distribution (Ubuntu, Fedora) is sufficient. We recommend at least 8 GB of RAM (4 GB can work with fewer browser tabs open) and at least 10 GB of free disk storage for VS Code, Node.js, and project files. You will also need a stable internet connection for live video sessions and screen sharing.',
  },
  {
    id: 'no-prior-coding',
    question: 'Can I join if I have zero prior coding experience?',
    answer: 'Yes. The first week begins with absolute foundations: how web browsers communicate with servers, how HTML structures documents, and how CSS rules style elements. Every concept is explained step-by-step with practical live coding exercises before advancing into JavaScript and React.',
  },
  {
    id: 'missed-class',
    question: 'What happens if I miss a live session?',
    answer: 'Every session comes with a detailed day-by-day guide, all source code pushed to a dedicated GitHub repository branch, and specific exercise prompts. If an emergency arises and you cannot attend, you can follow the step-by-step notes, complete the daily assignment, and ask questions during the next session’s Q&A or via our community channel.',
  },
  {
    id: 'recordings',
    question: 'Are class recordings provided?',
    answer: COURSE_INDIA.recordings,
  },
  {
    id: 'how-joining-works',
    question: 'How does the enrollment and joining process work?',
    answer: 'Joining follows a simple 3-step process. Step 1: Book a free 15-minute call using the form below. We discuss your background, schedule, and goals to verify this course is the right fit. Step 2: If we mutually agree it is a fit, you complete your enrollment fee of ₹10,000 via direct UPI. Step 3: You immediately receive your onboarding email, software setup checklist, calendar invites, and an official payment receipt.',
  },
  {
    id: 'refund-policy',
    question: 'What is the refund policy?',
    answer: 'We offer a full refund until the end of Session 2. If you attend the initial sessions and determine that the teaching style or curriculum pace is not suitable for your learning needs, you can request a full refund with no friction. We believe in honest education: we only want students who genuinely benefit from the live coaching.',
  },
  {
    id: 'certificate',
    question: 'Do I get a certificate upon completion?',
    answer: 'Yes. You receive a digital Certificate of Completion from OutlineDev upon completing all 5 modules and submitting your capstone project repository. Please note: this is a certificate of coursework completion issued by OutlineDev, not a government-accredited university degree or formal academic credential. In software engineering, your live deployed GitHub projects matter far more to hiring teams than paper certificates.',
  },
  {
    id: 'language-of-instruction',
    question: 'What language is the course taught in?',
    answer: 'The primary language of instruction is clear, practical English. Technical terms, documentation, code comments, and project briefs are all in English to prepare you for industry work. Conversational Hindi explanations are available when students need concepts clarified or simplified during Q&A.',
  },
  {
    id: 'switch-batches',
    question: 'Can I join any upcoming batch or switch batches if my schedule changes?',
    answer: 'Yes. You can select any listed batch date that fits your calendar. If unforeseen work or university commitments arise before your batch starts, you can transfer your seat to a later scheduled batch by giving us advance notice before Day 1.',
  },
  {
    id: 'practice-time',
    question: 'How much time should I practice outside of live classes?',
    answer: 'We recommend dedicating 5 to 8 hours per week to self-practice outside of the 4 live hours. Coding is a muscle memory skill: following along during live instruction is only half the battle. Re-typing the code from scratch, completing the daily exercises, and solving small debugging puzzles on your own machine is where true comprehension happens.',
  },
  {
    id: 'projects-built',
    question: 'What real projects will I build during the 20 days?',
    answer: 'You build three portfolio-grade projects from scratch: (1) An accessible, mobile-first responsive portfolio website deployed to GitHub Pages (Module 1); (2) An interactive public API search and filter application with live asynchronous data fetching and DevTools debugging (Module 2); and (3) A full-stack Task and Booking Management web app with user authentication (bcrypt + JWT), React frontend, Express REST API, and SQLite database deployed to production (Modules 4 & 5).',
  },
  {
    id: 'interview-help',
    question: 'Is interview preparation or resume guidance included?',
    answer: 'Yes. In Module 5, we review how to present your projects on GitHub, how to write a professional README that engineers actually read, and how to articulate architectural trade-offs (such as why you chose SQLite over MongoDB) during technical interviews. We also conduct live code walkthroughs to help you communicate clearly under interview conditions.',
  },
  {
    id: 'job-guarantee',
    question: 'Does this course include job placement or a job guarantee?',
    answer: 'No. We do not offer job guarantees, placement promises, or salary claims. Any institution promising guaranteed software jobs for a 40-hour foundational course is being dishonest. What we do provide is rigorous, practical coding ability, real code on GitHub, and genuine technical understanding so you can confidently pass technical assessments and contribute on day one.',
  },
  {
    id: 'sqlite-vs-mongo-postgres',
    question: 'How does SQLite differ from MongoDB and PostgreSQL, and why do you use it?',
    answer: 'SQLite is a genuine relational SQL database that stores its entire database as a single file on your local disk. Unlike PostgreSQL or MySQL, SQLite requires no background server process, no port configuration, zero network latency, and zero cloud hosting fees. Unlike MongoDB (which is a document store), SQLite teaches you real SQL syntax (SELECT, WHERE, JOIN, foreign keys) and relational normalization. Everything you learn about SQL with SQLite applies directly when you later use PostgreSQL or MySQL.',
  },
  {
    id: 'why-this-stack',
    question: 'Why this specific tech stack (HTML, CSS, JavaScript, React, Node, Express, SQLite)?',
    answer: 'This stack is the most direct, coherent, and practical web engineering foundation in the industry. By using JavaScript across both the frontend (React) and the backend (Node/Express), you do not have to context-switch between programming languages while learning foundational concepts. Adding SQLite gives you relational data modeling without server overhead. Once you master this stack, picking up TypeScript, Next.js, or PostgreSQL is straightforward.',
  },
  {
    id: 'after-the-course',
    question: 'What happens after the course finishes?',
    answer: 'You retain lifetime access to the course GitHub repository with all session notes, project boilerplates, and reference solutions. You also remain part of our alumni community where you can ask technical questions, share your subsequent projects, and receive ongoing guidance from OutlineDev mentors.',
  },
  {
    id: 'payment-receipt',
    question: 'Will I receive a formal payment receipt for my fees?',
    answer: 'Yes. Upon receiving your UPI payment, we issue an official digital payment receipt and invoice confirming the transaction date, student name, course details, and fee paid (₹10,000, no GST charged).',
  },
  {
    id: 'class-format',
    question: 'Is this a 1-on-1 course or a group cohort?',
    answer: 'This is a focused, small-group live cohort. The pilot batch is intentionally kept small to ensure every student receives individual attention, live screen sharing support, and code review on your capstone project (Day 14 and Day 19). Sessions are conversational, interactive, and code-along.',
  },
  {
    id: 'assignments-and-code-reviews',
    question: 'How are assignments and code reviews conducted?',
    answer: 'Daily exercises are committed to your GitHub repository for practice and feedback. You receive dedicated code review on your capstone project (Day 14 and Day 19), where the instructor reviews your architecture, component decomposition, Express routes, and database integration directly on GitHub pull requests with actionable written and verbal feedback.',
  },
];
