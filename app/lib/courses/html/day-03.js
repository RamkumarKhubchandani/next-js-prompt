export const day03 = {
  day: 3,
  title: "Day 3: Forms That People Can Actually Use (Labels, Groups, Errors)",
  intro:
    "Forms are where products win or lose. Today you’ll build accessible forms with correct labels, grouping, error messaging, and keyboard-first UX.",
  aiSession: {
    enabled: true,
    steps: [
      {
        "type": "talk",
        "message": "Day 3. Forms. A form input without a label is like a door without a handle—blind users can't use it."
      },
      {
        "type": "challenge",
        "instruction": "This input has no accessible name. Connect the label to the input using `for` and `id`.",
        "buggyCode": "<!-- ❌ Unlinked label -->\n<label>Email</label>\n<input type=\"email\" />",
        "solutionCode": "<!-- ✅ Linked label -->\n<label for=\"email\">Email</label>\n<input id=\"email\" type=\"email\" />",
        "verifyOutput": "for=\"email\"",
        "successMessage": "Perfect. Now clicking the label focuses the input, and screen readers announce 'Email edit text'.",
        "hint": "Add `id='email'` to the input and `for='email'` to the label."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Most form bugs are not “backend” bugs — they’re HTML structure bugs. If a screen reader can’t associate a label to an input, the form is broken.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Label → control</span>: use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">label for</code> + matching <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">id</code>.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Grouping</span>: use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">fieldset</code>/<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">legend</code> for related controls.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Help + errors</span>: use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">aria-describedby</code> to connect messages.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Autocomplete</span>: help the user (and reduce errors) with <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">autocomplete</code> attributes.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Keyboard UX</span>: visible focus, proper tab order, no fake inputs.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Small demo</h3>
<p class="text-gray-600 dark:text-light-300 mb-4">
You’ll build a “Profile settings” form: name, email, notification preference, and a consent checkbox.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Annotated code (why this works)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-6 text-gray-700 dark:text-light-200">
  <ul class="list-disc list-inside space-y-2">
    <li>Every input has a label (or explicit accessible name).</li>
    <li>Related radios are grouped with fieldset/legend.</li>
    <li>Help/error text is linked with <code class="bg-white dark:bg-dark-800 px-1 rounded">aria-describedby</code>.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided steps</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Tab through the form: focus ring must be visible on every control.</li>
  <li>Click labels: focus should move to the matching input.</li>
  <li>Confirm grouped radios announce as one group (fieldset/legend).</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Add a required “Role” select with <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">required</code> and a help hint.</li>
  <li>Add an error message area below email; connect it via <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">aria-describedby</code>.</li>
  <li>Add a “danger zone” section with a destructive button and clear warning text.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Common mistakes (with fixes)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> placeholder as label. <span class="text-green-300 font-bold">Fix:</span> placeholders are hints, not labels.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> radio buttons without fieldset/legend. <span class="text-green-300 font-bold">Fix:</span> group them semantically.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> error text not connected to input. <span class="text-green-300 font-bold">Fix:</span> add <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">aria-describedby</code>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Checkpoints (auto-check)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-blue-700 dark:text-blue-300 font-bold">Label test:</span> clicking label moves focus to the input.</li>
  <li><span class="text-blue-700 dark:text-blue-300 font-bold">Keyboard:</span> tab order is logical and all focus is visible.</li>
  <li><span class="text-blue-700 dark:text-blue-300 font-bold">Semantics:</span> radios grouped with fieldset/legend.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Summary</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
You built a form that is usable without a mouse and understandable without sight — that’s the professional bar.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
<p class="text-gray-600 dark:text-light-300">
Next: media (images/video), tables, and when ARIA is appropriate.
</p>
`,
  checkpoints: [
    {
      prompt: "What is the correct way to associate a label with an input?",
      options: [
        "Put label text in the placeholder",
        "Use <label for='id'> and match it with the input's id",
        "Use a div with role='label'",
        "Only use aria-label always",
      ],
      correctIndex: 1,
      explanation:
        "The reliable baseline is label[for] + input#id. aria-label is useful but not the default replacement.",
    },
    {
      prompt: "When should you use fieldset/legend?",
      options: [
        "For any input, always",
        "To group related controls like radio buttons and checkboxes under one question",
        "Only for styling",
        "Never; it’s outdated",
      ],
      correctIndex: 1,
      explanation:
        "fieldset/legend provides semantic grouping that assistive tech announces as one unit.",
    },
    {
      prompt: "What is the main reason to use aria-describedby on inputs?",
      options: [
        "To make the input required",
        "To connect help and error text to the control for screen readers",
        "To change the input type",
        "To style the input",
      ],
      correctIndex: 1,
      explanation:
        "aria-describedby lets assistive tech read linked hint/error messages as part of the control context.",
    },
  ],
  recap: {
    takeaways: [
      "Labels are required for usability and accessibility.",
      "Group related controls with fieldset/legend.",
      "Connect hints/errors with aria-describedby and keep focus visible.",
    ],
    commonMistakes: [
      "Placeholder used as label.",
      "Unlinked error messages that users never hear.",
      "Radio groups without a legend.",
    ],
    nextActions: [
      "Add a required select + hint using aria-describedby.",
      "Add an inline error region and test tab order.",
      "Ensure all inputs have autocomplete where appropriate.",
    ],
  },
  sandbox: {
    html: `<!-- Day 3: accessible form -->
<main class="page">
  <header class="page__header">
    <h1 class="page__title">Profile Settings</h1>
    <p class="page__subtitle">A form that works with keyboard + screen readers.</p>
  </header>

  <form class="form" action="#" method="post" novalidate>
    <div class="field">
      <label class="field__label" for="name">Full name</label>
      <input class="field__control" id="name" name="name" type="text" autocomplete="name" placeholder="e.g. Alex Kim" />
      <p class="field__hint" id="name-hint">Use your real name (for certificates).</p>
    </div>

    <div class="field">
      <label class="field__label" for="email">Email</label>
      <input class="field__control" id="email" name="email" type="email" autocomplete="email"
        aria-describedby="email-hint email-error"
        placeholder="you@example.com"
      />
      <p class="field__hint" id="email-hint">We’ll send important updates only.</p>
      <p class="field__error" id="email-error" role="alert">Example error: Please enter a valid email.</p>
    </div>

    <fieldset class="fieldset">
      <legend class="fieldset__legend">Notifications</legend>
      <div class="choice">
        <input class="choice__control" id="n1" type="radio" name="notify" value="all" checked />
        <label class="choice__label" for="n1">All notifications</label>
      </div>
      <div class="choice">
        <input class="choice__control" id="n2" type="radio" name="notify" value="important" />
        <label class="choice__label" for="n2">Only important</label>
      </div>
      <div class="choice">
        <input class="choice__control" id="n3" type="radio" name="notify" value="none" />
        <label class="choice__label" for="n3">None</label>
      </div>
    </fieldset>

    <div class="choice choice--checkbox">
      <input class="choice__control" id="consent" type="checkbox" name="consent" />
      <label class="choice__label" for="consent">I agree to receive account emails.</label>
    </div>

    <div class="actions">
      <button class="btn" type="submit">Save changes</button>
      <button class="btn btn--ghost" type="reset">Reset</button>
    </div>
  </form>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
  --danger:#ff5d5d;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:880px;margin:0 auto;padding:26px 16px 44px}
.page__title{margin:0 0 6px}
.page__subtitle{margin:0 0 18px;color:var(--muted)}
.form{border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:18px}
.field{display:grid;gap:8px;margin-bottom:14px}
.field__label{font-weight:800}
.field__control{
  width:100%; padding:12px 12px; border-radius:12px;
  border:1px solid rgba(230,240,255,.18); background:rgba(0,0,0,.20); color:var(--text);
}
.field__control::placeholder{color:rgba(230,240,255,.45)}
.field__hint{margin:0;color:var(--muted);font-size:13px}
.field__error{margin:0;color:rgba(255,93,93,.95);font-size:13px}
.fieldset{border:1px solid rgba(230,240,255,.16);border-radius:14px;padding:12px;margin:16px 0}
.fieldset__legend{padding:0 8px;font-weight:900;color:var(--text)}
.choice{display:flex;align-items:flex-start;gap:10px;padding:8px 6px}
.choice__control{margin-top:3px}
.choice__label{color:var(--text)}
.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
.btn{
  border:0;border-radius:12px;padding:10px 14px;font-weight:900;
  background:var(--brand);color:#00120b;
}
.btn--ghost{
  background:rgba(255,255,255,.06); color:var(--text);
  border:1px solid var(--border);
}
.btn:focus-visible,.field__control:focus-visible,.choice__control:focus-visible{
  outline:3px solid rgba(0,255,150,.5); outline-offset:3px;
}
@media (prefers-reduced-motion: reduce){
  *{scroll-behavior:auto!important;transition:none!important;animation:none!important}
}`,
  },
};


