export const cssAssessment = {
    id: "css-certification",
    title: "CSS Certification",
    description: "Demonstrate your ability to style modern, responsive layouts using Flexbox, Grid, and the Cascade.",
    questions: [
        {
            id: "css-1",
            question: "Which CSS property controls the space between the border and the content?",
            options: ["margin", "padding", "border-spacing", "gap"],
            correctAnswer: 1,
            explanation: "Padding is the space inside the border, between the border and the actual content. Margin is the space outside the border."
        },
        {
            id: "css-2",
            question: "What is the result of 'box-sizing: border-box'?",
            options: [
                "The width and height include the content, padding, and border",
                "The width and height include only the content",
                "The width and height include the content and margin",
                "It adds a border to the box"
            ],
            correctAnswer: 0,
            explanation: "With 'border-box', the padding and border are included in the element's total width and height. This makes sizing elements much more intuitive."
        },
        {
            id: "css-3",
            question: "Which selector has the highest specificity?",
            options: [
                ".nav .link",
                "#header",
                "div > p",
                "a:hover"
            ],
            correctAnswer: 1,
            explanation: "ID selectors (#header) have a much higher specificity (1-0-0) than class selectors (0-1-0) or element selectors."
        },
        {
            id: "css-4",
            question: "In Flexbox, which property aligns items along the main axis?",
            options: ["align-items", "justify-content", "align-content", "flex-direction"],
            correctAnswer: 1,
            explanation: "justify-content defines how the browser distributes space between and around content items along the main-axis of a flex container."
        },
        {
            id: "css-5",
            question: "What does 'position: absolute' do?",
            options: [
                "Positions the element relative to the viewport",
                "Positions the element relative to its normal position",
                "Positions the element relative to its nearest positioned ancestor",
                "Fixes the element to the top of the page"
            ],
            correctAnswer: 2,
            explanation: "An absolute positioned element is removed from the normal document flow, and positioned relative to its nearest positioned ancestor (non-static)."
        },
        {
            id: "css-6",
            question: "Which unit is relative to the font-size of the root element (html)?",
            options: ["em", "rem", "px", "vh"],
            correctAnswer: 1,
            explanation: "rem stands for 'root em'. It is relative to the font-size of the root element (<html>), whereas em is relative to the font-size of the element itself."
        },
        {
            id: "css-7",
            question: "How do you center a div horizontally and vertically using Flexbox?",
            options: [
                "justify-content: center; align-items: center;",
                "text-align: center; vertical-align: middle;",
                "margin: auto;",
                "position: absolute; top: 50%; left: 50%;"
            ],
            correctAnswer: 0,
            explanation: "Setting both justify-content (main axis) and align-items (cross axis) to center on a flex container centers its children perfectly."
        },
        {
            id: "css-8",
            question: "What is the default value of the 'position' property?",
            options: ["relative", "absolute", "fixed", "static"],
            correctAnswer: 3,
            explanation: "The default position value is 'static'. Static elements are positioned according to the normal flow of the page."
        },
        {
            id: "css-9",
            question: "Which property is used to change the stacking order of elements?",
            options: ["z-index", "stack-order", "order", "position-index"],
            correctAnswer: 0,
            explanation: "The z-index property specifies the stack order of an element. An element with greater stack order is always in front of an element with a lower stack order."
        },
        {
            id: "css-10",
            question: "In CSS Grid, which property defines the columns?",
            options: ["grid-template-rows", "grid-template-columns", "grid-columns", "grid-auto-flow"],
            correctAnswer: 1,
            explanation: "grid-template-columns defines the line names and track sizing functions of the grid columns."
        },
        {
            id: "css-11",
            question: "What does the pseudo-class ':nth-child(2)' select?",
            options: [
                "All children except the second one",
                "The second child of its parent",
                "Every second child (2, 4, 6...)",
                "The child with index 2 (starting from 0)"
            ],
            correctAnswer: 1,
            explanation: ":nth-child(2) matches an element that is the second child of its parent."
        },
        {
            id: "css-12",
            question: "Which media query targets screens smaller than 600px?",
            options: [
                "@media (min-width: 600px)",
                "@media (max-width: 600px)",
                "@media (screen-size < 600px)",
                "@media (width: 600px)"
            ],
            correctAnswer: 1,
            explanation: "@media (max-width: 600px) applies styles when the viewport width is 600 pixels or less."
        },
        {
            id: "css-13",
            question: "What happens when margins collapse?",
            options: [
                "Margins are added together",
                "The larger margin wins, and the smaller one is ignored",
                "Margins are set to zero",
                "Elements overlap"
            ],
            correctAnswer: 1,
            explanation: "When vertical margins of two adjacent elements collapse, the distance between them becomes the larger of the two margins, not the sum."
        },
        {
            id: "css-14",
            question: "Which property controls the visibility of an element without removing it from the layout?",
            options: ["display: none", "visibility: hidden", "opacity: 0", "z-index: -1"],
            correctAnswer: 1,
            explanation: "visibility: hidden hides the element, but it still takes up the same space as before. display: none removes it from the document flow entirely."
        },
        {
            id: "css-15",
            question: "What is the 'gap' property used for?",
            options: [
                "To create space between flex or grid items",
                "To create space around the container",
                "To create a border gap",
                "To add line-height"
            ],
            correctAnswer: 0,
            explanation: "The gap property (formerly grid-gap) defines the size of the gap between the rows and columns in a grid or flex layout."
        },
        {
            id: "css-16",
            question: "Which value of 'display' makes an element behave like a span but allows setting width/height?",
            options: ["block", "inline", "inline-block", "flex"],
            correctAnswer: 2,
            explanation: "inline-block elements are like inline elements, but they can have a width and height."
        },
        {
            id: "css-17",
            question: "What does 'flex-grow: 1' do?",
            options: [
                "Prevents the item from shrinking",
                "Allows the item to grow to fill available space",
                "Sets the initial size of the item",
                "Aligns the item to the end"
            ],
            correctAnswer: 1,
            explanation: "flex-grow defines the ability for a flex item to grow if necessary. A value of 1 means it will take up available space."
        },
        {
            id: "css-18",
            question: "How do you select all <p> elements inside a <div>?",
            options: ["div + p", "div > p", "div p", "div ~ p"],
            correctAnswer: 2,
            explanation: "'div p' is the descendant selector, which selects all <p> elements that are descendants (children, grandchildren, etc.) of a <div>."
        },
        {
            id: "css-19",
            question: "Which property is used to create a sticky header?",
            options: ["position: fixed", "position: sticky", "position: absolute", "display: sticky"],
            correctAnswer: 1,
            explanation: "position: sticky positions the element based on the user's scroll position. It toggles between relative and fixed depending on the scroll position."
        },
        {
            id: "css-20",
            question: "What does the universal selector (*) do?",
            options: [
                "Selects the root element",
                "Selects all elements",
                "Selects all text",
                "Selects nothing"
            ],
            correctAnswer: 1,
            explanation: "The asterisk (*) is the universal selector, which matches elements of any type."
        }
    ]
};
