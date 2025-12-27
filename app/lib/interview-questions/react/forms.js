export const formsQuestions = [
    {
        id: 'react-forms-1',
        category: 'Forms',
        difficulty: 'Hard',
        question: 'Form Validation Patterns - Client and Server',
        answer: `Asked at **every company** for form-heavy applications.

### Validation Timing:
1. **onChange** - Real-time (can be annoying)
2. **onBlur** - After leaving field (balanced)
3. **onSubmit** - All at once (traditional)
4. **Hybrid** - Blur first, then real-time after

### Validation Types:
- **Required** - Field must have value
- **Format** - Email, phone, URL patterns
- **Length** - Min/max character counts
- **Custom** - Business rules, async validation
- **Cross-field** - Password confirmation

### Best Practices:
- Validate on blur, re-validate on change
- Show error below field immediately
- Don't clear user input on error
- Server validation is always required`,
        codeExample: `// Form Validation Patterns
console.log('=== Validation Timing Strategy ===');

function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Validate single field
  const validateField = (name, value) => {
    const rules = validationRules[name] || [];
    
    for (const rule of rules) {
      const error = rule(value, values);
      if (error) {
        console.log('[Validate]', name, ':', error);
        return error;
      }
    }
    console.log('[Validate]', name, ': ✓ valid');
    return null;
  };
  
  // Validate all fields
  const validateAll = () => {
    const newErrors = {};
    Object.keys(values).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return { values, errors, touched, validateField, validateAll };
}

// Validation rules
const rules = {
  email: [
    v => !v && 'Email is required',
    v => !/^[^@]+@[^@]+\\.[^@]+$/.test(v) && 'Invalid email format'
  ],
  password: [
    v => !v && 'Password is required',
    v => v.length < 8 && 'Password must be 8+ characters'
  ]
};

console.log('Validation Rules:');
console.log(JSON.stringify(Object.keys(rules), null, 2));

console.log('\\n=== Demo: Validating Fields ===');

const form = useFormValidation(
  { email: '', password: '' },
  rules
);

console.log('\\nValidating empty email:');
form.validateField('email', '');

console.log('\\nValidating invalid email:');
form.validateField('email', 'not-an-email');

console.log('\\nValidating valid email:');
form.validateField('email', 'user@example.com');

console.log('\\nValidating short password:');
form.validateField('password', '123');

console.log('\\nValidating valid password:');
form.validateField('password', 'secure123!');

console.log('\\n=== Blur → Change Hybrid ===');

console.log('const handleBlur = (e) => {');
console.log('  setTouched({ ...touched, [e.target.name]: true });');
console.log('  validateField(e.target.name, e.target.value);');
console.log('};');
console.log('');
console.log('const handleChange = (e) => {');
console.log('  setValue(e.target.value);');
console.log('  // Only validate if already touched');
console.log('  if (touched[e.target.name]) {');
console.log('    validateField(e.target.name, e.target.value);');
console.log('  }');
console.log('};');

console.log('\\n✓ Validate on blur first');
console.log('✓ Re-validate on change after touch');
console.log('✓ Server validation always required');`
    },
    {
        id: 'react-forms-2',
        category: 'Forms',
        difficulty: 'Expert',
        question: 'Multi-Step Wizard Forms',
        answer: `Complex pattern asked at **enterprise and fintech companies**.

### Key Challenges:
1. **State persistence** - Data across steps
2. **Navigation** - Forward/back, skip logic
3. **Validation** - Per-step and final
4. **Progress indication** - User orientation
5. **Accessibility** - Announce step changes

### Implementation Approaches:
- **Context + Reducer** - Full control
- **URL state** - Shareable, refreshable
- **Library** - React Hook Form + Wizard

### Best Practices:
- Save progress (localStorage/API)
- Validate before next step
- Allow back navigation
- Show summary before submit`,
        codeExample: `// Multi-Step Wizard Form
console.log('=== Wizard Form Architecture ===');

// Wizard state with reducer
function wizardReducer(state, action) {
  switch (action.type) {
    case 'NEXT_STEP':
      console.log('[Wizard] Next step:', state.currentStep + 1);
      return { ...state, currentStep: state.currentStep + 1 };
    case 'PREV_STEP':
      console.log('[Wizard] Previous step:', state.currentStep - 1);
      return { ...state, currentStep: state.currentStep - 1 };
    case 'SET_DATA':
      console.log('[Wizard] Saving data:', JSON.stringify(action.payload));
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'SET_STEP':
      console.log('[Wizard] Jump to step:', action.step);
      return { ...state, currentStep: action.step };
    default:
      return state;
  }
}

const initialState = {
  currentStep: 0,
  data: {},
  steps: ['Personal', 'Address', 'Payment', 'Review']
};

let state = initialState;
const dispatch = (action) => {
  state = wizardReducer(state, action);
};

console.log('Steps:', initialState.steps.join(' → '));
console.log('Current:', state.currentStep, '(' + state.steps[state.currentStep] + ')');

console.log('\\n=== Step Navigation ===');

dispatch({ type: 'SET_DATA', payload: { name: 'John', email: 'john@example.com' } });
dispatch({ type: 'NEXT_STEP' });
dispatch({ type: 'SET_DATA', payload: { address: '123 Main St', city: 'NYC' } });
dispatch({ type: 'NEXT_STEP' });
dispatch({ type: 'PREV_STEP' });

console.log('\\nFinal data:', JSON.stringify(state.data));
console.log('Current step:', state.currentStep, '(' + state.steps[state.currentStep] + ')');

console.log('\\n=== Progress Indicator ===');

function ProgressBar({ steps, currentStep }) {
  steps.forEach((step, index) => {
    const status = index < currentStep ? '✓' : 
                   index === currentStep ? '●' : '○';
    console.log(status + ' ' + step);
  });
}

ProgressBar({ steps: initialState.steps, currentStep: 2 });

console.log('\\n=== Step Validation ===');

const stepValidation = {
  0: (data) => {
    if (!data.name) return 'Name required';
    if (!data.email) return 'Email required';
    return null;
  },
  1: (data) => {
    if (!data.address) return 'Address required';
    return null;
  },
  2: (data) => {
    if (!data.cardNumber) return 'Card required';
    return null;
  }
};

console.log('Each step validates before proceeding:');
const step0Error = stepValidation[0]({ name: 'John' });
console.log('Step 0 validation:', step0Error || '✓ Valid');

console.log('\\n=== Save Progress ===');

console.log('// Auto-save to localStorage');
console.log('useEffect(() => {');
console.log('  localStorage.setItem("wizardData", JSON.stringify(data));');
console.log('}, [data]);');
console.log('');
console.log('// Restore on mount');
console.log('const saved = localStorage.getItem("wizardData");');
console.log('if (saved) dispatch({ type: "SET_DATA", payload: JSON.parse(saved) });');

console.log('\\n✓ Validate each step before next');
console.log('✓ Save progress for recovery');
console.log('✓ Show progress indicator');`
    },
    {
        id: 'react-forms-3',
        category: 'Forms',
        difficulty: 'Hard',
        question: 'File Upload Patterns in React',
        answer: `Common pattern asked in **media and enterprise apps**.

### Upload Approaches:
1. **Native input** - Simple, basic
2. **Drag and drop** - Better UX
3. **Chunked upload** - Large files
4. **Presigned URLs** - Direct to S3

### Key Features:
- Progress tracking
- Preview before upload
- Multiple file handling
- Validation (type, size)
- Error handling

### Best Practices:
- Show upload progress
- Allow cancellation
- Validate before upload
- Handle errors gracefully
- Support retry`,
        codeExample: `// File Upload Patterns
console.log('=== Basic File Input ===');

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleFiles = (fileList) => {
    console.log('[Upload] Files selected:', fileList.length);
    
    // Validate files
    const validFiles = Array.from(fileList).filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        console.log('[Validate] ✗ Too large:', file.name);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        console.log('[Validate] ✗ Not image:', file.name);
        return false;
      }
      console.log('[Validate] ✓ Valid:', file.name);
      return true;
    });
    
    setFiles(validFiles);
  };
  
  const upload = async () => {
    console.log('[Upload] Starting upload...');
    setUploading(true);
    
    // Simulate progress
    for (let p = 0; p <= 100; p += 20) {
      setProgress(p);
      console.log('[Upload] Progress:', p + '%');
    }
    
    console.log('[Upload] Complete!');
    setUploading(false);
  };
  
  // Simulate file selection
  handleFiles([
    { name: 'photo.jpg', size: 1024 * 1024, type: 'image/jpeg' },
    { name: 'doc.pdf', size: 2 * 1024 * 1024, type: 'application/pdf' },
    { name: 'huge.jpg', size: 10 * 1024 * 1024, type: 'image/jpeg' }
  ]);
  
  upload();
}

FileUpload();

console.log('\\n=== Drag and Drop ===');

console.log('const DropZone = ({ onFiles }) => {');
console.log('  const [isDragging, setIsDragging] = useState(false);');
console.log('  ');
console.log('  return (');
console.log('    <div');
console.log('      onDragOver={(e) => {');
console.log('        e.preventDefault();');
console.log('        setIsDragging(true);');
console.log('      }}');
console.log('      onDragLeave={() => setIsDragging(false)}');
console.log('      onDrop={(e) => {');
console.log('        e.preventDefault();');
console.log('        setIsDragging(false);');
console.log('        onFiles(e.dataTransfer.files);');
console.log('      }}');
console.log('    >');
console.log('      Drop files here');
console.log('    </div>');
console.log('  );');
console.log('};');

console.log('\\n=== Image Preview ===');

function previewImage(file) {
  console.log('[Preview] Creating preview for:', file.name);
  // const url = URL.createObjectURL(file);
  console.log('[Preview] URL created (remember to revoke!)');
}

previewImage({ name: 'photo.jpg' });

console.log('\\n=== Presigned URL Pattern ===');

console.log('1. Client requests upload URL from server');
console.log('2. Server generates presigned S3 URL');
console.log('3. Client uploads directly to S3');
console.log('4. Client notifies server of success');
console.log('');
console.log('Benefits:');
console.log('  • No file goes through your server');
console.log('  • Faster uploads');
console.log('  • Lower server load');

console.log('\\n✓ Validate before upload');
console.log('✓ Show progress indicator');
console.log('✓ Handle errors gracefully');`
    },
    {
        id: 'react-forms-4',
        category: 'Forms',
        difficulty: 'Hard',
        question: 'React Hook Form vs Formik - When to Use Each',
        answer: `Common comparison question at **any company**.

### React Hook Form:
- **Philosophy:** Uncontrolled by default
- **Performance:** Minimal re-renders
- **Bundle:** ~9KB gzipped
- **API:** useForm, register, handleSubmit

### Formik:
- **Philosophy:** Controlled components
- **Performance:** More re-renders
- **Bundle:** ~13KB gzipped
- **API:** Formik, Field, Form components

### Decision Guide:
| Factor | React Hook Form | Formik |
|--------|-----------------|--------|
| Performance | ✓ Better | ○ Good |
| Complex validation | ○ Yup/Zod | ✓ Built-in |
| Learning curve | ↑ Steeper | ↓ Easier |
| TypeScript | ✓ Excellent | ✓ Good |
| Dynamic forms | ✓ useFieldArray | ✓ FieldArray |`,
        codeExample: `// React Hook Form vs Formik
console.log('=== React Hook Form Pattern ===');

// Simulating react-hook-form
function useFormHook(options = {}) {
  const formState = {
    errors: {},
    isSubmitting: false,
    isValid: true
  };
  
  const register = (name, validation) => {
    console.log('[RHF] Registered:', name, validation ? 'with validation' : '');
    return { name, ref: {} };
  };
  
  const handleSubmit = (onSubmit) => {
    console.log('[RHF] Form submitted');
    return (e) => {
      console.log('[RHF] Validating all fields...');
      onSubmit({ email: 'test@example.com', password: '123456' });
    };
  };
  
  return { register, handleSubmit, formState };
}

const { register, handleSubmit, formState } = useFormHook();

console.log('\\nRegistering fields:');
register('email', { required: true, pattern: /^[^@]+@[^@]+$/ });
register('password', { required: true, minLength: 8 });

console.log('\\nSubmitting:');
handleSubmit((data) => {
  console.log('[RHF] Data:', JSON.stringify(data));
})();

console.log('\\n=== Formik Pattern ===');

function FormikExample() {
  console.log('[Formik] Using controlled components');
  console.log('[Formik] Values in state, updated on every keystroke');
  
  const initialValues = { email: '', password: '' };
  
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    if (!values.password) errors.password = 'Required';
    console.log('[Formik] Validation:', Object.keys(errors).length ? errors : 'valid');
    return errors;
  };
  
  validate({ email: '', password: 'test' });
  
  console.log('[Formik] Re-renders on every change');
}

FormikExample();

console.log('\\n=== Performance Comparison ===');

console.log('React Hook Form:');
console.log('  ○ Initial render');
console.log('  (type "hello")');
console.log('  ○ No re-renders during typing!');
console.log('  ○ Submit re-render');
console.log('  Total: 2 renders');

console.log('\\nFormik:');
console.log('  ○ Initial render');
console.log('  (type "hello")');
console.log('  ○ Re-render "h"');
console.log('  ○ Re-render "he"');
console.log('  ○ Re-render "hel"');
console.log('  ○ Re-render "hell"');
console.log('  ○ Re-render "hello"');
console.log('  ○ Submit re-render');
console.log('  Total: 7 renders');

console.log('\\n=== Recommendation ===');
console.log('Large forms / Performance critical → React Hook Form');
console.log('Simple forms / Quick setup → Formik');
console.log('Complex validation → Either (with Yup/Zod)');

console.log('\\n✓ Both are good choices');
console.log('✓ RHF wins on performance');`
    }
];
