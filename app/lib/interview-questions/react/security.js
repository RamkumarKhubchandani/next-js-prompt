export const securityQuestions = [
    {
        id: 'react-sec-1',
        category: 'Security',
        difficulty: 'Hard',
        question: 'XSS Prevention in React Applications',
        answer: `Critical security question at **any company**.

### React's Built-in Protection:
React escapes content by default using JSX, preventing most XSS attacks.

### Still Vulnerable:
1. **dangerouslySetInnerHTML** - Bypasses escaping
2. **href with javascript:** - Link injection
3. **DOM manipulation** - Direct innerHTML
4. **URL parameters** - Unvalidated user input

### Prevention:
- Sanitize HTML (DOMPurify)
- Validate URLs
- Use CSP headers
- Validate and encode user input
- Avoid dangerouslySetInnerHTML

### Security Headers:
- Content-Security-Policy
- X-Content-Type-Options
- X-Frame-Options`,
        codeExample: `// XSS Prevention in React
console.log('=== React Auto-Escaping ===');

// React escapes by default - SAFE
function SafeComponent({ userInput }) {
  // This is automatically escaped
  console.log('JSX auto-escapes:', userInput);
  console.log('Script tags become text, not executable');
  
  return '<div>' + userInput + '</div>';
}

const maliciousInput = '<script>alert("XSS")</script>';
SafeComponent({ userInput: maliciousInput });
console.log('✓ Script rendered as text, not executed');

console.log('\\n=== Dangerous Patterns ===');

// ❌ DANGEROUS: dangerouslySetInnerHTML
console.log('\\n❌ dangerouslySetInnerHTML:');
console.log('<div dangerouslySetInnerHTML={{ __html: userContent }} />');
console.log('If userContent = "<script>evil()</script>", XSS happens!');

// ❌ DANGEROUS: javascript: URLs
console.log('\\n❌ javascript: URLs:');
console.log('const userUrl = "javascript:alert(1)";');
console.log('<a href={userUrl}>Click</a>');
console.log('Clicking executes JavaScript!');

console.log('\\n=== Safe Patterns ===');

// ✓ SAFE: Sanitize HTML
console.log('\\n✓ Sanitize with DOMPurify:');
console.log('import DOMPurify from "dompurify";');
console.log('const clean = DOMPurify.sanitize(dirty);');
console.log('<div dangerouslySetInnerHTML={{ __html: clean }} />');

// Simulate DOMPurify
function sanitize(html) {
  // Remove script tags
  const clean = html.replace(/<script[^>]*>.*?<\\/script>/gi, '');
  console.log('Input:', html);
  console.log('Sanitized:', clean);
  return clean;
}

sanitize('<p>Hello</p><script>evil()</script>');

// ✓ SAFE: Validate URLs
console.log('\\n✓ Validate URLs:');

function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    const safe = ['http:', 'https:'].includes(parsed.protocol);
    console.log('URL:', url, safe ? '✓ Safe' : '✗ Blocked');
    return safe;
  } catch {
    console.log('URL:', url, '✗ Invalid');
    return false;
  }
}

isValidUrl('https://example.com');
isValidUrl('javascript:alert(1)');
isValidUrl('data:text/html,<script>');

console.log('\\n=== Content Security Policy ===');
console.log('CSP Header prevents inline scripts:');
console.log("Content-Security-Policy: default-src 'self'; script-src 'self'");
console.log('');
console.log('Even if XSS payload injected, CSP blocks execution!');

console.log('\\n✓ React escapes by default');
console.log('✓ Sanitize dangerouslySetInnerHTML');
console.log('✓ Validate URLs, use CSP');`
    },
    {
        id: 'react-sec-2',
        category: 'Security',
        difficulty: 'Hard',
        question: 'CSRF Protection in React SPAs',
        answer: `Important security for **any application with auth**.

### What is CSRF?
Cross-Site Request Forgery - Attacker tricks user into performing unwanted actions.

### SPA vs Traditional:
- Traditional: Cookie-based, vulnerable by default
- SPA: Token-based auth (localStorage), less vulnerable

### Protection Strategies:
1. **SameSite Cookies** - Prevent cross-origin cookie sending
2. **CSRF Tokens** - Server validates token with each request
3. **Custom Headers** - X-Requested-With (simple attacks)
4. **Token in Header** - JWT in Authorization header

### Best Practices:
- Use SameSite=Strict for auth cookies
- Double submit cookie pattern
- Verify Origin/Referer headers`,
        codeExample: `// CSRF Protection Patterns
console.log('=== Understanding CSRF ===');

console.log('\\nAttack Scenario:');
console.log('1. User logged into bank.com (has auth cookie)');
console.log('2. User visits evil.com');
console.log('3. evil.com has: <img src="bank.com/transfer?to=attacker&amount=1000">');
console.log('4. Browser sends cookie with request!');
console.log('5. Transfer happens without user consent');

console.log('\\n=== Protection: SameSite Cookies ===');

const secureCookie = {
  name: 'sessionId',
  value: 'abc123',
  sameSite: 'Strict', // or 'Lax'
  secure: true,
  httpOnly: true
};

console.log('Secure Cookie Settings:');
console.log(JSON.stringify(secureCookie, null, 2));
console.log('');
console.log('SameSite=Strict: Cookie never sent cross-origin');
console.log('SameSite=Lax: Cookie sent for GET navigation only');

console.log('\\n=== Protection: CSRF Tokens ===');

// Server generates token
function generateCsrfToken() {
  const token = 'csrf_' + Math.random().toString(36).slice(2);
  console.log('[Server] Generated CSRF token:', token);
  return token;
}

// Client sends token with requests
function makeSecureRequest(url, data) {
  const csrfToken = 'csrf_abc123'; // from cookie or meta tag
  
  console.log('[Client] Request to:', url);
  console.log('[Client] With CSRF token:', csrfToken);
  console.log('[Client] Headers: { X-CSRF-Token: "' + csrfToken + '" }');
  
  // Server validates token matches session
  console.log('[Server] Validated token ✓');
}

generateCsrfToken();
makeSecureRequest('/api/transfer', { amount: 100 });

console.log('\\n=== SPA with JWT (Safer) ===');

console.log('Token stored in memory/localStorage (not cookie):');
console.log('');
console.log('fetch("/api/data", {');
console.log('  headers: {');
console.log('    Authorization: "Bearer " + jwtToken');
console.log('  }');
console.log('});');
console.log('');
console.log('✓ Cross-origin requests cannot attach JWT');
console.log('✓ Must explicitly include Authorization header');

console.log('\\n=== Double Submit Cookie ===');

console.log('1. Server sets CSRF token in cookie');
console.log('2. Client reads cookie, sends in header');
console.log('3. Server compares cookie vs header');
console.log('4. Attacker cannot read cookie cross-origin!');

console.log('\\n✓ Use SameSite cookies');
console.log('✓ For cookies: implement CSRF tokens');
console.log('✓ JWT in Authorization header is CSRF-safe');`
    },
    {
        id: 'react-sec-3',
        category: 'Security',
        difficulty: 'Expert',
        question: 'Secure Authentication Patterns in React',
        answer: `Critical for **any production application**.

### Token Storage Options:
| Location | XSS Safe | CSRF Safe | Best For |
|----------|----------|-----------|----------|
| HttpOnly Cookie | ✓ | ✗ | SSR apps |
| localStorage | ✗ | ✓ | SPAs (with care) |
| Memory (React state) | ✓ | ✓ | Most secure |
| Secure Cookie + Token | ✓ | ✓ | Best of both |

### Best Practices:
1. **Short-lived access tokens** (15 min)
2. **Refresh tokens in HttpOnly cookies**
3. **Token rotation**
4. **Secure logout** (invalidate server-side)
5. **Rate limiting** on auth endpoints`,
        codeExample: `// Secure Authentication Patterns
console.log('=== Token Storage Comparison ===');

console.log('\\n1. localStorage (Common but risky):');
console.log('   ✗ XSS can steal token');
console.log('   ✓ CSRF safe');
console.log('   → OK for low-security apps');

console.log('\\n2. HttpOnly Cookie (More secure):');
console.log('   ✓ XSS cannot access');
console.log('   ✗ Needs CSRF protection');
console.log('   → Use with SameSite=Strict');

console.log('\\n3. Memory (Most secure):');
console.log('   ✓ XSS cannot access global');
console.log('   ✓ CSRF safe');
console.log('   ✗ Lost on refresh');
console.log('   → Use with refresh token rotation');

console.log('\\n=== Recommended: Dual Token Pattern ===');

function secureAuthFlow() {
  console.log('\\n--- Login Flow ---');
  console.log('1. User submits credentials');
  console.log('2. Server validates');
  console.log('3. Server returns:');
  console.log('   • Access token (short-lived, in response)');
  console.log('   • Refresh token (HttpOnly cookie, long-lived)');
  
  console.log('\\n--- API Request ---');
  console.log('1. Client sends access token in header');
  console.log('2. Server validates token');
  
  console.log('\\n--- Token Refresh ---');
  console.log('1. Access token expires');
  console.log('2. Client calls /refresh endpoint');
  console.log('3. Server reads refresh token from cookie');
  console.log('4. Server issues new access token');
  
  console.log('\\n--- Logout ---');
  console.log('1. Clear access token from memory');
  console.log('2. Call /logout to invalidate refresh token');
  console.log('3. Server clears HttpOnly cookie');
}

secureAuthFlow();

console.log('\\n=== Auth Context Pattern ===');

console.log('const AuthContext = createContext();');
console.log('');
console.log('function AuthProvider({ children }) {');
console.log('  // Token in memory (not localStorage)');
console.log('  const [accessToken, setAccessToken] = useState(null);');
console.log('  ');
console.log('  // Auto-refresh before expiry');
console.log('  useEffect(() => {');
console.log('    const refresh = async () => {');
console.log('      const { accessToken } = await api.refresh();');
console.log('      setAccessToken(accessToken);');
console.log('    };');
console.log('    const interval = setInterval(refresh, 14 * 60 * 1000);');
console.log('    return () => clearInterval(interval);');
console.log('  }, []);');
console.log('}');

console.log('\\n✓ Access tokens in memory');
console.log('✓ Refresh tokens in HttpOnly cookies');
console.log('✓ Short access token lifespan');`
    },
    {
        id: 'react-sec-4',
        category: 'Security',
        difficulty: 'Hard',
        question: 'Content Security Policy (CSP) for React Apps',
        answer: `Production security at **enterprise companies**.

### What is CSP?
HTTP header that controls which resources can load/execute.

### Key Directives:
- \`default-src\` - Fallback for all types
- \`script-src\` - JavaScript sources
- \`style-src\` - CSS sources
- \`img-src\` - Image sources
- \`connect-src\` - API endpoints

### React-Specific Challenges:
1. **Inline scripts** - Webpack runtime
2. **Inline styles** - styled-components, emotion
3. **eval()** - Development mode

### Solutions:
- Nonces for inline scripts
- Hash of inline content
- Strict-dynamic for trusted scripts`,
        codeExample: `// Content Security Policy for React
console.log('=== CSP Basics ===');

const basicCSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "connect-src 'self' https://api.example.com"
].join('; ');

console.log('Basic CSP:');
console.log(basicCSP);

console.log('\\n=== What Each Directive Does ===');

const directives = {
  "default-src 'self'": 'Only load from same origin',
  "script-src 'self'": 'Only scripts from same origin',
  "style-src 'unsafe-inline'": 'Allow inline styles (needed for CSS-in-JS)',
  "img-src data:": 'Allow data: URLs for images',
  "connect-src https://api.example.com": 'Allow fetch to API'
};

Object.entries(directives).forEach(([directive, explanation]) => {
  console.log(directive);
  console.log('  → ' + explanation);
});

console.log('\\n=== React Production CSP ===');

// For Next.js or CRA production
const productionCSP = [
  "default-src 'self'",
  "script-src 'self' 'nonce-{RANDOM}'", // Nonce for inline scripts
  "style-src 'self' 'unsafe-inline'",   // CSS-in-JS needs this
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://api.example.com wss://socket.example.com"
].join('; ');

console.log('Production CSP:');
console.log(productionCSP);

console.log('\\n=== Nonces for Inline Scripts ===');

console.log('Server generates random nonce per request:');
console.log('<script nonce="abc123">// inline code</script>');
console.log('');
console.log('CSP:');
console.log("script-src 'nonce-abc123'");
console.log('');
console.log('Only scripts with matching nonce execute!');

console.log('\\n=== CSP Reporting ===');

console.log('report-uri /csp-violation-report');
console.log('');
console.log('When policy is violated:');
console.log('Browser sends report to your endpoint');
console.log('You can detect attacks/misconfigurations');

console.log('\\n=== Testing CSP ===');

console.log("Content-Security-Policy-Report-Only: ...");
console.log('');
console.log('✓ Reports violations without blocking');
console.log('✓ Test before enforcing');

console.log('\\n✓ CSP: defense in depth against XSS');
console.log('✓ Start with report-only mode');`
    }
];
