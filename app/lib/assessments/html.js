export const htmlAssessment = {
    id: "html-certification",
    title: "HTML Certification",
    description: "Prove your mastery of semantic HTML, accessibility, and modern web standards.",
    questions: [
        {
            id: "html-1",
            question: "What is the primary purpose of the <main> element?",
            options: [
                "To contain the site's navigation links",
                "To wrap the unique content of the page, excluding headers/footers/sidebars",
                "To define the main heading (h1) of the page",
                "To create a container for the main JavaScript file"
            ],
            correctAnswer: 1,
            explanation: "The <main> element represents the dominant content of the <body> of a document. It should not contain content that is repeated across documents such as sidebars, navigation links, copyright information, site logos, and search forms."
        },
        {
            id: "html-2",
            question: "Which attribute is crucial for screen readers to understand the purpose of an image?",
            options: ["title", "src", "alt", "caption"],
            correctAnswer: 2,
            explanation: "The 'alt' attribute provides alternative text for an image if it cannot be displayed or for screen reader users. It should describe the image's content or function."
        },
        {
            id: "html-3",
            question: "What is the correct way to associate a <label> with an <input>?",
            options: [
                "Place the input inside the label",
                "Use the 'for' attribute on the label matching the input's 'id'",
                "Both A and B are correct",
                "Use the 'name' attribute on both"
            ],
            correctAnswer: 2,
            explanation: "You can associate a label by wrapping the input (implicit) or by using the 'for' attribute on the label that matches the input's 'id' (explicit). Both are valid."
        },
        {
            id: "html-4",
            question: "Which HTML5 element should be used for independent, self-contained content like a blog post?",
            options: ["<section>", "<div>", "<article>", "<aside>"],
            correctAnswer: 2,
            explanation: "The <article> element specifies independent, self-contained content. An article should make sense on its own and it should be possible to distribute it independently from the rest of the site."
        },
        {
            id: "html-5",
            question: "What is the purpose of the <meta name='viewport'> tag?",
            options: [
                "To set the background color of the viewport",
                "To control layout on mobile browsers",
                "To define the SEO keywords",
                "To link external stylesheets"
            ],
            correctAnswer: 1,
            explanation: "The viewport meta tag gives the browser instructions on how to control the page's dimensions and scaling, which is essential for responsive web design."
        },
        {
            id: "html-6",
            question: "Which input type allows the user to select multiple options from a list?",
            options: ["type='radio'", "type='checkbox'", "type='text'", "type='submit'"],
            correctAnswer: 1,
            explanation: "Checkboxes (type='checkbox') allow users to select zero or more options from a limited number of choices. Radio buttons are for single selection."
        },
        {
            id: "html-7",
            question: "What does the 'defer' attribute do on a <script> tag?",
            options: [
                "It blocks HTML parsing until the script is downloaded",
                "It runs the script immediately after downloading",
                "It downloads the script in parallel but executes it after HTML parsing is complete",
                "It prevents the script from running on mobile devices"
            ],
            correctAnswer: 2,
            explanation: "The 'defer' attribute tells the browser to download the script in the background but wait to execute it until the HTML parsing is fully complete. This prevents blocking the DOM construction."
        },
        {
            id: "html-8",
            question: "Which element represents a thematic grouping of content, typically with a heading?",
            options: ["<div>", "<span>", "<section>", "<p>"],
            correctAnswer: 2,
            explanation: "The <section> element represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. It typically has a heading."
        },
        {
            id: "html-9",
            question: "What is the semantic difference between <strong> and <b>?",
            options: [
                "They are identical",
                "<strong> implies importance/urgency, while <b> is just stylistic bold",
                "<b> is for importance, <strong> is for bold text",
                "<strong> is deprecated"
            ],
            correctAnswer: 1,
            explanation: "<strong> indicates that its contents have strong importance, seriousness, or urgency. <b> is used to draw attention to text without indicating extra importance (stylistic offset)."
        },
        {
            id: "html-10",
            question: "Which tag is used to define a caption for a <figure> element?",
            options: ["<caption >", "<summary>", "<figcaption>", "<title>"],
            correctAnswer: 2,
            explanation: "The <figcaption> element represents a caption or legend for the rest of the contents of its parent <figure> element."
        },
        {
            id: "html-11",
            question: "What is the purpose of the 'aria-label' attribute?",
            options: [
                "To provide a visual tooltip",
                "To provide an accessible name for an element that doesn't have visible text",
                "To style the element with ARIA CSS",
                "To link to an ARIA diagram"
            ],
            correctAnswer: 1,
            explanation: "aria-label provides a string value that labels an interactive element, essential when the element has no visible text (like an icon button)."
        },
        {
            id: "html-12",
            question: "Which element is used to define a set of navigation links?",
            options: ["<navigation>", "<nav>", "<links>", "<menu>"],
            correctAnswer: 1,
            explanation: "The <nav> element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents."
        },
        {
            id: "html-13",
            question: "What is the correct HTML5 doctype declaration?",
            options: [
                "<!DOCTYPE html>",
                "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 5.0//EN'>",
                "<doctype html>",
                "<!DOCTYPE html5>"
            ],
            correctAnswer: 0,
            explanation: "<!DOCTYPE html> is the standard doctype for HTML5. It triggers standards mode in browsers."
        },
        {
            id: "html-14",
            question: "Which element is best for marking up a quote from another source?",
            options: ["<q>", "<blockquote>", "<cite>", "All of the above depending on context"],
            correctAnswer: 3,
            explanation: "<blockquote> is for block-level quotes, <q> is for inline quotes, and <cite> is for the title of the work. All are relevant for quoting."
        },
        {
            id: "html-15",
            question: "What does the 'rel=\"noopener noreferrer\"' attribute prevent?",
            options: [
                "It prevents the new page from accessing the window.opener object (security risk)",
                "It prevents the link from opening in a new tab",
                "It prevents the browser from caching the page",
                "It prevents 404 errors"
            ],
            correctAnswer: 0,
            explanation: "When using target='_blank', 'rel=\"noopener noreferrer\"' prevents the new page from having access to the window.opener object, which can be a security vulnerability (tabnabbing) and performance issue."
        },
        {
            id: "html-16",
            question: "Which input attribute validates that a field is not empty before submission?",
            options: ["validate", "required", "mandatory", "needs-value"],
            correctAnswer: 1,
            explanation: "The 'required' attribute is a boolean attribute that specifies that an input field must be filled out before submitting the form."
        },
        {
            id: "html-17",
            question: "What is the purpose of the <aside> element?",
            options: [
                "To create a sidebar that is tangentially related to the content around it",
                "To create a footer",
                "To put content aside for later",
                "To comment out code"
            ],
            correctAnswer: 0,
            explanation: "The <aside> element represents a portion of a document whose content is only indirectly related to the document's main content (e.g., sidebars, call-out boxes)."
        },
        {
            id: "html-18",
            question: "Which element represents a control for generating a public-private key pair?",
            options: ["<keygen>", "<key>", "<encrypt>", "None, <keygen> is deprecated"],
            correctAnswer: 3,
            explanation: "The <keygen> element was deprecated and removed from web standards. It should not be used."
        },
        {
            id: "html-19",
            question: "How do you semantically mark up a list where the order does not matter?",
            options: ["<ol>", "<ul>", "<dl>", "<list>"],
            correctAnswer: 1,
            explanation: "<ul> (Unordered List) is used for lists where the order of items is not important (typically bullet points)."
        },
        {
            id: "html-20",
            question: "What is the 'title' attribute used for?",
            options: [
                "To set the page title",
                "To provide advisory information (often a tooltip)",
                "To make text bold",
                "To define a section title"
            ],
            correctAnswer: 1,
            explanation: "The global 'title' attribute contains text representing advisory information related to the element it belongs to. Browsers typically display it as a tooltip."
        }
    ]
};
