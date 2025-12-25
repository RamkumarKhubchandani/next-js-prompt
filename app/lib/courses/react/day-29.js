export const day29 = {
  day: 29,
  title: "Machine Coding: Modal & Toast System",
  intro: "Build a professional modal and toast notification system with portals, animations, and accessibility.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Build</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Modal component with React Portal</li>
<li>Focus trap for accessibility</li>
<li>Toast notification system with queue</li>
<li>Auto-dismiss with progress bar</li>
<li>Multiple toast types (success, error, warning)</li>
<li>Smooth enter/exit animations</li>
</ul>

<div class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
<h4 class="text-blue-400 font-bold mb-2">💡 Why Portals?</h4>
<p class="text-gray-600 dark:text-light-300">Modals need to render at the top of the DOM (to escape overflow:hidden, z-index issues). React Portals let you render children into a different DOM node while keeping React's event bubbling.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Key Concepts</h3>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">1. React Portal</h4>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-700 dark:text-cyan-300">ReactDOM.createPortal(
children,
document.getElementById('modal-root')
)</pre>
</div>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">2. Focus Trap</h4>
<p class="mb-4 text-gray-600 dark:text-light-300">Keep focus inside the modal. When Tab reaches the last element, loop back to the first. Close on Escape key.</p>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">3. Toast Queue Pattern</h4>
<p class="mb-4 text-gray-600 dark:text-light-300">Use Context + Reducer to manage a queue of toasts. New toasts push to array, auto-dismiss removes after timeout.</p>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔔 MODAL & TOAST NOTIFICATION SYSTEM                                ║
║  Production-ready with accessibility & animations                    ║
╠══════════════════════════════════════════════════════════════════════╣
║  PART 1: Modal with Portal & Focus Trap                              ║
║  PART 2: Toast Notification System                                   ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📦 PART 1: MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════
function Modal({ isOpen, onClose, title, children }) {
const modalRef = React.useRef(null);
const previousActiveElement = React.useRef(null);

// Lock body scroll when modal is open
React.useEffect(() => {
if (isOpen) {
  previousActiveElement.current = document.activeElement;
  document.body.style.overflow = 'hidden';
  // Focus the modal
  modalRef.current?.focus();
} else {
  document.body.style.overflow = '';
  // Restore focus
  previousActiveElement.current?.focus();
}
return () => {
  document.body.style.overflow = '';
};
}, [isOpen]);

// Handle Escape key
React.useEffect(() => {
const handleEscape = (e) => {
  if (e.key === 'Escape' && isOpen) onClose();
};
document.addEventListener('keydown', handleEscape);
return () => document.removeEventListener('keydown', handleEscape);
}, [isOpen, onClose]);

if (!isOpen) return null;

return (
// In real app: ReactDOM.createPortal(content, document.body)
<div
  style={{
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease-out'
  }}
  onClick={onClose}
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <div
    ref={modalRef}
    tabIndex={-1}
    onClick={(e) => e.stopPropagation()}
    style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto',
      animation: 'slideUp 0.3s ease-out',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
    }}
  >
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: '16px'
    }}>
      <h2 id="modal-title" style={{ margin: 0 }}>{title}</h2>
      <button
        onClick={onClose}
        aria-label="Close modal"
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          padding: '4px'
        }}
      >
        ×
      </button>
    </div>
    {children}
  </div>
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🔔 PART 2: TOAST SYSTEM
// ═══════════════════════════════════════════════════════════════════
const ToastContext = React.createContext(null);

const TOAST_TYPES = {
success: { bg: '#22c55e', icon: '✅' },
error: { bg: '#ef4444', icon: '❌' },
warning: { bg: '#f59e0b', icon: '⚠️' },
info: { bg: '#3b82f6', icon: 'ℹ️' }
};

function ToastProvider({ children }) {
const [toasts, setToasts] = React.useState([]);

const addToast = React.useCallback((message, type = 'info', duration = 3000) => {
const id = Date.now() + Math.random();
setToasts(prev => [...prev, { id, message, type, duration }]);

// Auto remove
if (duration > 0) {
  setTimeout(() => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, duration);
}

return id;
}, []);

const removeToast = React.useCallback((id) => {
setToasts(prev => prev.filter(t => t.id !== id));
}, []);

return (
<ToastContext.Provider value={{ addToast, removeToast }}>
  {children}
  <ToastContainer toasts={toasts} removeToast={removeToast} />
</ToastContext.Provider>
);
}

function ToastContainer({ toasts, removeToast }) {
return (
<div style={{
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  zIndex: 1001
}}>
  {toasts.map(toast => (
    <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
  ))}
</div>
);
}

function Toast({ toast, onClose }) {
const config = TOAST_TYPES[toast.type] || TOAST_TYPES.info;

return (
<div
  role="alert"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: config.bg,
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    animation: 'slideIn 0.3s ease-out',
    minWidth: '250px'
  }}
>
  <span style={{ fontSize: '18px' }}>{config.icon}</span>
  <span style={{ flex: 1 }}>{toast.message}</span>
  <button
    onClick={onClose}
    style={{
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      color: 'white',
      borderRadius: '4px',
      padding: '4px 8px',
      cursor: 'pointer'
    }}
  >
    ×
  </button>
  
  {/* Progress bar */}
  {toast.duration > 0 && (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'rgba(255,255,255,0.3)',
      borderRadius: '0 0 8px 8px',
      overflow: 'hidden'
    }}>
      <div style={{
        height: '100%',
        background: 'rgba(255,255,255,0.7)',
        animation: \`shrink \${toast.duration}ms linear forwards\`
      }} />
    </div>
  )}
</div>
);
}

function useToast() {
const context = React.useContext(ToastContext);
if (!context) throw new Error('useToast must be used within ToastProvider');
return context;
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 DEMO APP
// ═══════════════════════════════════════════════════════════════════
function DemoContent() {
const [isModalOpen, setIsModalOpen] = React.useState(false);
const { addToast } = useToast();

return (
<div style={{ padding: '20px', fontFamily: 'system-ui' }}>
  <style>{\`
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes shrink { from { width: 100%; } to { width: 0%; } }
  \`}</style>
  
  <h3>🔔 Modal & Toast Demo</h3>
  
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
    <button 
      onClick={() => setIsModalOpen(true)}
      style={{ padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
    >
      Open Modal
    </button>
    
    <button 
      onClick={() => addToast('Operation successful!', 'success')}
      style={{ padding: '10px 20px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
    >
      Success Toast
    </button>
    
    <button 
      onClick={() => addToast('Something went wrong', 'error')}
      style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
    >
      Error Toast
    </button>
    
    <button 
      onClick={() => addToast('Please check this', 'warning')}
      style={{ padding: '10px 20px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
    >
      Warning Toast
    </button>
  </div>

  <Modal 
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)}
    title="🎉 Welcome!"
  >
    <p>This modal uses React Portal (conceptually) and includes:</p>
    <ul style={{ marginLeft: '20px' }}>
      <li>Body scroll lock</li>
      <li>Escape key to close</li>
      <li>Click outside to close</li>
      <li>Focus management</li>
      <li>ARIA attributes</li>
    </ul>
    <button 
      onClick={() => {
        setIsModalOpen(false);
        addToast('Modal closed!', 'info');
      }}
      style={{ marginTop: '15px', padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
    >
      Close Modal
    </button>
  </Modal>
</div>
);
}

function App() {
return (
<ToastProvider>
  <DemoContent />
</ToastProvider>
);
}`,
  comparison: {
    junior: `// ❌ Modal without portal
function Modal({ isOpen }) {
// Rendered inside parent div
// z-index wars, overflow:hidden breaks it
return isOpen ? <div className="modal">...</div> : null;
}`,
    senior: `// ✅ Modal with portal
function Modal({ isOpen }) {
return isOpen 
? ReactDOM.createPortal(
    <div className="modal">...</div>,
    document.body  // Renders at top level!
  ) 
: null;
}`
  },
  interview: {
    questions: [
      {
        q: "Why use React Portal for modals?",
        a: "Portals render children outside the parent DOM hierarchy while maintaining React context and event bubbling. This avoids z-index issues, overflow:hidden clipping, and stacking context problems. The modal is at document.body level but still a React child."
      },
      {
        q: "How do you implement focus trap in a modal?",
        a: "Query all focusable elements inside modal. On Tab, check if focus is on last element → move to first. On Shift+Tab at first → move to last. Store previous activeElement, restore on close. Use tabIndex={-1} on container for initial focus."
      },
      {
        q: "How would you implement toast queue with max limit?",
        a: "In addToast: check if toasts.length >= MAX_TOASTS, if so remove oldest. Use a reducer for complex state. For animations, use a 'leaving' state before removing from array so exit animation can play."
      }
    ]
  }
};
