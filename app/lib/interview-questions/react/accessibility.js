export const accessibilityQuestions = [
    {
        id: 'react-a11y-1',
        category: 'Accessibility',
        difficulty: 'Hard',
        question: 'ARIA Patterns in React Components',
        answer: `Increasingly important - asked at **Airbnb, Microsoft, and Google**.

### Key ARIA Roles:
- \`role="button"\` - Clickable non-button elements
- \`role="dialog"\` - Modal/dialog content
- \`role="alert"\` - Important announcements
- \`role="navigation"\` - Nav menus
- \`role="tablist/tab/tabpanel"\` - Tab interfaces

### Common ARIA Attributes:
- \`aria-label\` - Accessible name
- \`aria-labelledby\` - Name from another element
- \`aria-describedby\` - Additional description
- \`aria-hidden\` - Hide from screen readers
- \`aria-live\` - Announce dynamic changes

### First Rule of ARIA:
Use native HTML elements when possible. ARIA is a last resort!`,
        codeExample: `// ARIA Patterns in React
console.log('=== First Rule of ARIA ===');
console.log('Use native HTML elements first!');
console.log('');
console.log('❌ <div role="button">Click</div>');
console.log('✓ <button>Click</button>');
console.log('');
console.log('❌ <span role="link">Home</span>');
console.log('✓ <a href="/">Home</a>');

console.log('\\n=== When ARIA is Needed ===');

// Custom button (when you can't use native)
console.log('\\n1. Custom Button:');
console.log('<div');
console.log('  role="button"');
console.log('  tabIndex={0}');
console.log('  onClick={handleClick}');
console.log('  onKeyDown={(e) => e.key === "Enter" && handleClick()}');
console.log('  aria-pressed={isPressed}');
console.log('>');
console.log('  Toggle');
console.log('</div>');

// Modal/Dialog
console.log('\\n2. Modal Dialog:');
console.log('<div');
console.log('  role="dialog"');
console.log('  aria-modal="true"');
console.log('  aria-labelledby="modal-title"');
console.log('  aria-describedby="modal-desc"');
console.log('>');
console.log('  <h2 id="modal-title">Confirm Delete</h2>');
console.log('  <p id="modal-desc">This cannot be undone.</p>');
console.log('</div>');

// Tabs
console.log('\\n3. Tab Interface:');
console.log('<div role="tablist" aria-label="Settings">');
console.log('  <button role="tab" aria-selected="true" aria-controls="panel-1">');
console.log('    General');
console.log('  </button>');
console.log('  <button role="tab" aria-selected="false" aria-controls="panel-2">');
console.log('    Privacy');
console.log('  </button>');
console.log('</div>');
console.log('<div role="tabpanel" id="panel-1">Content...</div>');

console.log('\\n=== aria-live for Announcements ===');

console.log('<div aria-live="polite">');
console.log('  {/* Content changes are announced to screen readers */}');
console.log('  {message}');
console.log('</div>');
console.log('');
console.log('aria-live="polite" - Wait for user to finish');
console.log('aria-live="assertive" - Interrupt immediately');

console.log('\\n=== Common Patterns ===');

const patterns = {
  'Icon Button': 'aria-label="Close" or visually hidden text',
  'Loading State': 'aria-busy="true" on container',
  'Form Errors': 'aria-invalid="true" + aria-describedby',
  'Expandable': 'aria-expanded="true/false"',
  'Current Page': 'aria-current="page"'
};

Object.entries(patterns).forEach(([pattern, solution]) => {
  console.log(pattern + ': ' + solution);
});

console.log('\\n✓ Use native elements first');
console.log('✓ ARIA is for complex widgets only');`
    },
    {
        id: 'react-a11y-2',
        category: 'Accessibility',
        difficulty: 'Hard',
        question: 'Keyboard Navigation and Focus Management',
        answer: `Essential for **any accessible application**.

### Key Requirements:
1. **All interactive elements focusable**
2. **Logical tab order**
3. **Visible focus indicators**
4. **Keyboard shortcuts for complex widgets**

### Focus Management Scenarios:
- Modal open: Focus first focusable element
- Modal close: Return focus to trigger
- Delete item: Focus next/previous item
- Route change: Announce new page

### React Patterns:
- useRef for focus management
- Focus trapping in modals
- Skip links for navigation`,
        codeExample: `// Keyboard Navigation & Focus Management
console.log('=== Focus Management Patterns ===');

// Modal focus trap
console.log('\\n1. Modal Focus Trap:');

function useFocusTrap(ref) {
  useEffect(() => {
    console.log('[FocusTrap] Trapping focus in modal');
    
    const focusableSelectors = [
      'button',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    console.log('[FocusTrap] Focusable elements:', focusableSelectors.join(', '));
    console.log('[FocusTrap] Tab cycles within modal');
    console.log('[FocusTrap] Escape closes modal');
    
    return () => console.log('[FocusTrap] Focus returned to trigger');
  }, []);
}

useFocusTrap({ current: null });

console.log('\\n2. Focus on Mount:');

function AutoFocusInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    console.log('[AutoFocus] Focusing input on mount');
    // inputRef.current?.focus();
  }, []);
  
  return { ref: inputRef };
}

AutoFocusInput();

console.log('\\n3. Focus After Delete:');

function useFocusOnDelete(items, deletedIndex) {
  const refs = useRef([]);
  
  useEffect(() => {
    if (deletedIndex !== null) {
      // Focus next item, or previous if last
      const nextIndex = deletedIndex < items.length 
        ? deletedIndex 
        : deletedIndex - 1;
      
      console.log('[Delete] Item', deletedIndex, 'deleted');
      console.log('[Delete] Focusing item', nextIndex);
    }
  }, [items, deletedIndex]);
}

useFocusOnDelete(['a', 'b', 'c'], 1);

console.log('\\n=== Skip Link Pattern ===');

console.log('<!-- First focusable element -->');
console.log('<a href="#main" className="skip-link">');
console.log('  Skip to main content');
console.log('</a>');
console.log('');
console.log('.skip-link {');
console.log('  position: absolute;');
console.log('  left: -9999px;');
console.log('}');
console.log('.skip-link:focus {');
console.log('  left: 0;');
console.log('}');

console.log('\\n=== Keyboard Shortcuts ===');

console.log('useEffect(() => {');
console.log('  const handleKeyDown = (e) => {');
console.log('    if (e.key === "Escape") closeModal();');
console.log('    if (e.key === "ArrowDown") focusNext();');
console.log('    if (e.key === "ArrowUp") focusPrev();');
console.log('  };');
console.log('  window.addEventListener("keydown", handleKeyDown);');
console.log('  return () => window.removeEventListener("keydown", handleKeyDown);');
console.log('}, []);');

console.log('\\n✓ All interactive elements must be focusable');
console.log('✓ Return focus after modals/deletions');
console.log('✓ Visible focus indicators required');`
    },
    {
        id: 'react-a11y-3',
        category: 'Accessibility',
        difficulty: 'Hard',
        question: 'Screen Reader Optimization',
        answer: `Critical for **true accessibility**.

### Screen Reader Announcements:
1. **Headings** - Navigate by heading structure
2. **Landmarks** - main, nav, article, aside
3. **Live regions** - Dynamic content updates
4. **Form labels** - Associated with inputs

### Hidden Content:
- \`display: none\` - Hidden from everyone
- \`visibility: hidden\` - Hidden from everyone
- \`aria-hidden="true"\` - Hidden from screen readers only
- Visually hidden class - Hidden visually, read by SR

### Testing Tools:
- VoiceOver (Mac)
- NVDA (Windows, free)
- JAWS (Windows, paid)
- axe DevTools (automated)`,
        codeExample: `// Screen Reader Optimization
console.log('=== Proper Heading Structure ===');

console.log('✓ Correct:');
console.log('  <h1>Page Title</h1>');
console.log('    <h2>Section</h2>');
console.log('      <h3>Subsection</h3>');
console.log('    <h2>Another Section</h2>');
console.log('');
console.log('✗ Wrong (skipped level):');
console.log('  <h1>Title</h1>');
console.log('    <h3>Subsection</h3>  ← h2 missing!');

console.log('\\n=== Semantic Landmarks ===');

console.log('<header>Site header</header>');
console.log('<nav aria-label="Main">Navigation</nav>');
console.log('<main>Primary content</main>');
console.log('<aside>Sidebar</aside>');
console.log('<footer>Site footer</footer>');
console.log('');
console.log('Screen readers: "Jump to main", "Skip nav"');

console.log('\\n=== Visually Hidden Text ===');

const visuallyHiddenCSS = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  border: '0'
};

console.log('Visually Hidden CSS:');
console.log(JSON.stringify(visuallyHiddenCSS, null, 2));

console.log('\\nUsage:');
console.log('<button>');
console.log('  <Icon name="delete" />');
console.log('  <span className="visually-hidden">Delete item</span>');
console.log('</button>');
console.log('');
console.log('Screen reader: "Delete item, button"');
console.log('Sighted user: sees icon only');

console.log('\\n=== Live Regions for Updates ===');

console.log('// Announce form submission result');
console.log('<div role="status" aria-live="polite">');
console.log('  {message}');
console.log('</div>');
console.log('');
console.log('When message changes:');
console.log('Screen reader announces: "Form submitted successfully"');

console.log('\\n=== Form Labels ===');

console.log('✓ Explicit label:');
console.log('<label htmlFor="email">Email</label>');
console.log('<input id="email" type="email" />');
console.log('');
console.log('✓ Implicit label:');
console.log('<label>');
console.log('  Email');
console.log('  <input type="email" />');
console.log('</label>');
console.log('');
console.log('✓ aria-label for icons:');
console.log('<button aria-label="Close dialog">');
console.log('  <CloseIcon />');
console.log('</button>');

console.log('\\n✓ Test with real screen readers');
console.log('✓ Use landmarks and headings');`
    },
    {
        id: 'react-a11y-4',
        category: 'Accessibility',
        difficulty: 'Expert',
        question: 'Building Accessible Form Components',
        answer: `Essential for **any form-heavy application**.

### Form Accessibility Checklist:
1. **Labels** - Every input needs a label
2. **Error messages** - Associated with inputs
3. **Required fields** - aria-required or required
4. **Error prevention** - Clear validation messages
5. **Success feedback** - Announced to screen readers

### Complex Patterns:
- Form groups with fieldset/legend
- Multi-step forms with progress
- Inline validation feedback
- Error summaries at top

### Best Practices:
- Don't rely on color alone for errors
- Provide text alternatives
- Allow error correction easily`,
        codeExample: `// Accessible Form Components
console.log('=== Complete Accessible Input ===');

console.log('/');
console.log('const AccessibleInput = ({ id, label, error, required }) => (');
console.log('  <div>');
console.log('    <label htmlFor={id}>');
console.log('      {label}');
console.log('      {required && <span aria-hidden="true">*</span>}');
console.log('    </label>');
console.log('    <input');
console.log('      id={id}');
console.log('      aria-required={required}');
console.log('      aria-invalid={!!error}');
console.log('      aria-describedby={error ? id + "-error" : undefined}');
console.log('    />');
console.log('    {error && (');
console.log('      <span id={id + "-error"} role="alert">');
console.log('        {error}');
console.log('      </span>');
console.log('    )}');
console.log('  </div>');
console.log(');');

console.log('\\n=== Form Group with Fieldset ===');

console.log('<fieldset>');
console.log('  <legend>Shipping Address</legend>');
console.log('  ');
console.log('  <label htmlFor="street">Street</label>');
console.log('  <input id="street" />');
console.log('  ');
console.log('  <label htmlFor="city">City</label>');
console.log('  <input id="city" />');
console.log('</fieldset>');
console.log('');
console.log('Screen reader: "Shipping Address group, Street, edit text"');

console.log('\\n=== Error Summary Pattern ===');

console.log('<div role="alert" aria-labelledby="error-summary">');
console.log('  <h2 id="error-summary">Please fix the following errors:</h2>');
console.log('  <ul>');
console.log('    <li><a href="#email">Email is required</a></li>');
console.log('    <li><a href="#password">Password too short</a></li>');
console.log('  </ul>');
console.log('</div>');
console.log('');
console.log('On submit with errors:');
console.log('1. Focus moves to error summary');
console.log('2. Screen reader announces errors');
console.log('3. Links jump to each field');

console.log('\\n=== Radio/Checkbox Groups ===');

console.log('<fieldset>');
console.log('  <legend>Preferred contact method</legend>');
console.log('  ');
console.log('  <label>');
console.log('    <input type="radio" name="contact" value="email" />');
console.log('    Email');
console.log('  </label>');
console.log('  ');
console.log('  <label>');
console.log('    <input type="radio" name="contact" value="phone" />');
console.log('    Phone');
console.log('  </label>');
console.log('</fieldset>');

console.log('\\n=== Inline Validation ===');

function InlineValidation() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validate = (value) => {
    if (!value) setError('Email is required');
    else if (!value.includes('@')) setError('Invalid email format');
    else setError('');
  };
  
  console.log('[Validation] Email:', email);
  console.log('[Validation] Error:', error || 'none');
}

InlineValidation();

console.log('\\n✓ Every input needs a label');
console.log('✓ Errors announced with role="alert"');
console.log('✓ Use fieldset/legend for groups');`
    }
];
