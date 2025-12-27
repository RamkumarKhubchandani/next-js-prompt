export const cssFundamentalsQuestions = [
    {
        id: 'css-fund-1',
        category: 'CSS Fundamentals',
        difficulty: 'Easy',
        question: 'Explain the CSS Box Model.',
        answer: `**The Box Model is the foundation of layout.**

**Components (Inside Out):**
1. **Content:** The actual image or text.
2. **Padding:** Clear space around content (transparent).
3. **Border:** A border that goes around the padding and content.
4. **Margin:** Clear space outside the border.

**box-sizing:**
- **content-box (Default):** \`width = content\`. Borders/padding add to total size.
- **border-box (Best Practice):** \`width = content + padding + border\`. Much easier to reason about.`,
        codeExample: `<style>
  div { margin-bottom: 20px; background: lightblue; height: 50px; }
  
  /* Total Width = 200 + 20(p) + 20(p) + 10(b) + 10(b) = 260px */
  .content-box {
    box-sizing: content-box;
    width: 200px;
    padding: 20px;
    border: 10px solid blue;
  }

  /* Total Width = 200px (Content shrinks to fit) */
  .border-box {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;
    border: 10px solid green;
  }
</style>

<div class="content-box">Content Box (Wider)</div>
<div class="border-box">Border Box (Exact)</div>`
    },
    {
        id: 'css-fund-2',
        category: 'CSS Fundamentals',
        difficulty: 'Medium',
        question: 'How does Specificity work? How do you calculate it?',
        answer: `**Specificity determines which style "wins" when multiple rules match.**

**Hierarchy (Highest to Lowest):**
1. **!important** (Override all).
2. **Inline Styles** (\`style="..."\`) -> (1,0,0,0)
3. **IDs** (\`#id\`) -> (0,1,0,0)
4. **Classes/Attributes/Pseudo-classes** (\`.class\`) -> (0,0,1,0)
5. **Elements/Pseudo-elements** (\`div\`) -> (0,0,0,1)

**Calculation:**
- \`#nav .item\` = 1 ID, 1 Class = **101** points.
- \`div p span\` = 3 Elements = **3** points.
- ID wins.`,
        codeExample: `<style>
  /* 0,0,1,0 */
  .text { color: blue; }

  /* 0,1,0,0 (Wins) */
  #unique { color: red; }

  /* 0,0,2,0 (Wins over .text but loses to #unique) */
  .text.highlight { color: green; }
</style>

<p class="text">I am Blue</p>
<p class="text highlight">I am Green (More specific class)</p>
<p class="text" id="unique">I am Red (ID wins)</p>

<!-- Inline Style (1,0,0,0) Wins -->
<p class="text" id="unique" style="color: purple">I am Purple</p>`
    },
    {
        id: 'css-fund-3',
        category: 'CSS Fundamentals',
        difficulty: 'Medium',
        question: 'What is Margin Collapse?',
        answer: `**When two vertical margins meet, they combine into one.**

**Rules:**
- They don't add up (\`20px + 30px != 50px\`).
- The **larger** margin wins (\`max(20, 30) = 30px\`).
- Happens between sibling elements and parent/child elements (if no border/padding separates them).

**Fixes:**
- Use \`padding\` instead.
- Add a border/padding to parent.
- Use Flexbox/Grid container (margins don't collapse inside).`,
        codeExample: `<style>
  .box {
    height: 50px;
    background: #ccc;
    margin-bottom: 30px; /* This collapses */
  }
  
  .next-box {
    height: 50px;
    background: #aaa;
    margin-top: 20px; /* This collapses into the 30px */
  }
  
  .flex-container {
    display: flex;
    flex-direction: column;
  }
</style>

<h3>Block Layout (Collapse)</h3>
<div class="box">Margin Bottom 30px</div>
<div class="next-box">Margin Top 20px (Gap is 30px, not 50px)</div>

<h3>Flex Layout (No Collapse)</h3>
<div class="flex-container">
  <div class="box">Margin Bottom 30px</div>
  <div class="next-box">Margin Top 20px (Gap is 50px)</div>
</div>`
    },
    {
        id: 'css-fund-4',
        category: 'CSS Fundamentals',
        difficulty: 'Easy',
        question: 'Difference between display: inline, block, and inline-block?',
        answer: `**They control how an element behaves in the document flow.**

1. **block (e.g., div, p):**
   - Starts on new line.
   - Takes full width available.
   - Can set width/height/margins.

2. **inline (e.g., span, a):**
   - Flows with text.
   - **Width/Height/Vertical Margins are ignored.**

3. **inline-block (e.g., button, img):**
   - Flows with text.
   - **Respected Width/Height/Margins.**`,
        codeExample: `<style>
  .box { background: orange; padding: 5px; border: 1px solid black; }
  
  .block { display: block; width: 100px; margin: 10px; }
  .inline { display: inline; width: 100px; /* Ignored */ margin: 10px 0; /* Vertical ignored */ }
  .inline-block { display: inline-block; width: 100px; margin: 10px; }
</style>

<span class="box block">Block (New Line, Sized)</span>
<span class="box inline">Inline (No Width, No Vert Margin)</span>
<span class="box inline-block">Inline-Block (Flows, Sized)</span>`
    },
    {
        id: 'css-fund-5',
        category: 'CSS Fundamentals',
        difficulty: 'Medium',
        question: 'What is the Stacking Context (z-index)?',
        answer: `**z-index only works on positioned elements.**

**Stacking Context:**
- A new context is created by properties like \`opacity < 1\`, \`transform\`, \`filter\`, or \`position: relative/absolute\` with z-index.
- **Trap:** A child with \`z-index: 9999\` inside a parent with \`z-index: 1\` cannot appear above a sibling with \`z-index: 2\`. The parent traps it.`,
        codeExample: `<style>
  div { width: 100px; height: 100px; position: absolute; }
  
  .blue {
    background: blue;
    top: 50px; left: 50px;
    z-index: 10; /* Lower Parent */
  }
  
  .red {
    background: red;
    top: 20px; left: 20px;
    z-index: 100; /* Inside Blue, effectively 10.100 */
  }
  
  .green {
    background: green;
    top: 80px; left: 80px;
    z-index: 20; /* Higher Sibling, beats Blue and Red */
  }
</style>

<div class="blue">
  Blue (z:10)
  <div class="red">Red (z:100)</div>
</div>
<div class="green">Green (z:20)</div>

<!-- Result: Green is on top of Red, even though 100 > 20. -->`
    }
];
