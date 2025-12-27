export const typescriptQuestions = [
    {
        id: 'react-ts-1',
        category: 'TypeScript',
        difficulty: 'Hard',
        question: 'TypeScript with React - Component Props Typing',
        answer: `Essential for **modern React development**.

### Basic Props Typing:
\`\`\`typescript
interface Props {
  name: string;
  age: number;
  isActive?: boolean; // Optional
}

function User({ name, age, isActive = false }: Props) {
  return <div>{name}</div>;
}
\`\`\`

### Children Props:
- \`React.ReactNode\` - Any renderable content
- \`React.ReactElement\` - Only React elements
- \`JSX.Element\` - Specific JSX

### Event Handlers:
- \`React.MouseEvent<HTMLButtonElement>\`
- \`React.ChangeEvent<HTMLInputElement>\`
- \`React.FormEvent<HTMLFormElement>\`

### Generic Components:
Type-safe reusable components`,
        codeExample: `// TypeScript with React - Props Typing
console.log('=== Basic Props Interface ===');

console.log('interface ButtonProps {');
console.log('  label: string;');
console.log('  onClick: () => void;');
console.log('  variant?: "primary" | "secondary";');
console.log('  disabled?: boolean;');
console.log('}');
console.log('');
console.log('function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {');
console.log('  return (');
console.log('    <button onClick={onClick} disabled={disabled}>');
console.log('      {label}');
console.log('    </button>');
console.log('  );');
console.log('}');

console.log('\\n=== Children Props ===');

console.log('\\n// React.ReactNode - Most flexible');
console.log('interface CardProps {');
console.log('  children: React.ReactNode;');
console.log('}');
console.log('// Accepts: string, number, JSX, array, null');

console.log('\\n// React.ReactElement - Only React elements');
console.log('interface LayoutProps {');
console.log('  children: React.ReactElement;');
console.log('}');
console.log('// Accepts: <div />, <Component />');
console.log('// Rejects: "text", 123, null');

console.log('\\n=== Event Handlers ===');

console.log('\\nfunction Form() {');
console.log('  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {');
console.log('    e.preventDefault();');
console.log('    // e is typed!');
console.log('  };');
console.log('  ');
console.log('  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {');
console.log('    const value = e.target.value; // Typed as string');
console.log('  };');
console.log('  ');
console.log('  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {');
console.log('    const button = e.currentTarget; // Typed as HTMLButtonElement');
console.log('  };');
console.log('}');

console.log('\\n=== Generic Components ===');

console.log('\\ninterface ListProps<T> {');
console.log('  items: T[];');
console.log('  renderItem: (item: T) => React.ReactNode;');
console.log('}');
console.log('');
console.log('function List<T>({ items, renderItem }: ListProps<T>) {');
console.log('  return (');
console.log('    <ul>');
console.log('      {items.map((item, i) => (');
console.log('        <li key={i}>{renderItem(item)}</li>');
console.log('      ))}');
console.log('    </ul>');
console.log('  );');
console.log('}');
console.log('');
console.log('// Usage with type inference');
console.log('<List');
console.log('  items={[{ id: 1, name: "Alice" }]}');
console.log('  renderItem={(user) => user.name} // user is typed!');
console.log('/>');

console.log('\\n=== Extending HTML Props ===');

console.log('\\ninterface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {');
console.log('  variant: "primary" | "secondary";');
console.log('}');
console.log('');
console.log('function CustomButton({ variant, ...props }: CustomButtonProps) {');
console.log('  return <button {...props} className={variant} />;');
console.log('}');
console.log('');
console.log('// Inherits all button props: onClick, disabled, type, etc.');

console.log('\\n✓ Use interfaces for props');
console.log('✓ React.ReactNode for children');
console.log('✓ Extend HTML attributes when needed');`
    },
    {
        id: 'react-ts-2',
        category: 'TypeScript',
        difficulty: 'Expert',
        question: 'TypeScript Hooks - useState, useRef, useContext',
        answer: `Advanced TypeScript patterns for **type-safe hooks**.

### useState Typing:
\`\`\`typescript
// Inferred
const [count, setCount] = useState(0); // number

// Explicit (union types)
const [user, setUser] = useState<User | null>(null);

// With initial undefined
const [data, setData] = useState<Data>();
\`\`\`

### useRef Typing:
- \`useRef<HTMLDivElement>(null)\` - DOM refs
- \`useRef<number>(0)\` - Mutable values

### useContext Typing:
Create type-safe context with proper defaults

### Custom Hook Typing:
Return tuples or objects with proper types`,
        codeExample: `// TypeScript Hooks
console.log('=== useState Typing ===');

console.log('// Type inference');
console.log('const [count, setCount] = useState(0);');
console.log('// count: number, setCount: (value: number) => void');

console.log('\\n// Explicit type (union)');
console.log('interface User {');
console.log('  id: number;');
console.log('  name: string;');
console.log('}');
console.log('');
console.log('const [user, setUser] = useState<User | null>(null);');
console.log('// user: User | null');

console.log('\\n// Array state');
console.log('const [items, setItems] = useState<string[]>([]);');
console.log('// items: string[]');

console.log('\\n=== useRef Typing ===');

console.log('\\n// DOM ref');
console.log('const inputRef = useRef<HTMLInputElement>(null);');
console.log('');
console.log('useEffect(() => {');
console.log('  inputRef.current?.focus(); // Optional chaining needed');
console.log('}, []);');

console.log('\\n// Mutable value ref');
console.log('const countRef = useRef<number>(0);');
console.log('countRef.current = 5; // No optional chaining');

console.log('\\n=== useContext Typing ===');

console.log('\\ninterface AuthContextType {');
console.log('  user: User | null;');
console.log('  login: (email: string, password: string) => Promise<void>;');
console.log('  logout: () => void;');
console.log('}');
console.log('');
console.log('const AuthContext = createContext<AuthContextType | undefined>(undefined);');
console.log('');
console.log('// Custom hook with type guard');
console.log('function useAuth() {');
console.log('  const context = useContext(AuthContext);');
console.log('  if (!context) {');
console.log('    throw new Error("useAuth must be used within AuthProvider");');
console.log('  }');
console.log('  return context; // Typed as AuthContextType');
console.log('}');

console.log('\\n=== Custom Hook Typing ===');

console.log('\\n// Return tuple');
console.log('function useToggle(initial: boolean): [boolean, () => void] {');
console.log('  const [value, setValue] = useState(initial);');
console.log('  const toggle = () => setValue(v => !v);');
console.log('  return [value, toggle];');
console.log('}');
console.log('');
console.log('const [isOpen, toggleOpen] = useToggle(false);');
console.log('// isOpen: boolean, toggleOpen: () => void');

console.log('\\n// Return object');
console.log('interface UseFetchResult<T> {');
console.log('  data: T | null;');
console.log('  loading: boolean;');
console.log('  error: Error | null;');
console.log('}');
console.log('');
console.log('function useFetch<T>(url: string): UseFetchResult<T> {');
console.log('  const [data, setData] = useState<T | null>(null);');
console.log('  const [loading, setLoading] = useState(true);');
console.log('  const [error, setError] = useState<Error | null>(null);');
console.log('  ');
console.log('  // ... fetch logic');
console.log('  ');
console.log('  return { data, loading, error };');
console.log('}');
console.log('');
console.log('// Usage with type inference');
console.log('const { data, loading } = useFetch<User[]>("/api/users");');
console.log('// data: User[] | null');

console.log('\\n=== useReducer Typing ===');

console.log('\\ntype Action =');
console.log('  | { type: "increment" }');
console.log('  | { type: "decrement" }');
console.log('  | { type: "set"; payload: number };');
console.log('');
console.log('interface State {');
console.log('  count: number;');
console.log('}');
console.log('');
console.log('function reducer(state: State, action: Action): State {');
console.log('  switch (action.type) {');
console.log('    case "increment":');
console.log('      return { count: state.count + 1 };');
console.log('    case "decrement":');
console.log('      return { count: state.count - 1 };');
console.log('    case "set":');
console.log('      return { count: action.payload }; // payload is typed!');
console.log('  }');
console.log('}');

console.log('\\n✓ Explicit types for complex state');
console.log('✓ Type guards for context');
console.log('✓ Generic custom hooks');`
    },
    {
        id: 'react-ts-3',
        category: 'TypeScript',
        difficulty: 'Expert',
        question: 'Advanced TypeScript Patterns - Utility Types',
        answer: `Advanced patterns for **type-safe React**.

### Utility Types:
- \`Partial<T>\` - All properties optional
- \`Required<T>\` - All properties required
- \`Pick<T, K>\` - Select specific properties
- \`Omit<T, K>\` - Exclude specific properties
- \`Record<K, T>\` - Object with specific keys

### Component Patterns:
- \`React.FC<Props>\` vs function components
- \`React.ComponentProps<typeof Component>\`
- \`React.ElementType\` for polymorphic components

### Advanced Patterns:
- Discriminated unions
- Conditional types
- Template literal types`,
        codeExample: `// Advanced TypeScript Patterns
console.log('=== Utility Types ===');

console.log('\\ninterface User {');
console.log('  id: number;');
console.log('  name: string;');
console.log('  email: string;');
console.log('  role: "admin" | "user";');
console.log('}');

console.log('\\n// Partial - All optional');
console.log('type UserUpdate = Partial<User>;');
console.log('// { id?: number; name?: string; ... }');

console.log('\\n// Pick - Select properties');
console.log('type UserPreview = Pick<User, "id" | "name">;');
console.log('// { id: number; name: string; }');

console.log('\\n// Omit - Exclude properties');
console.log('type UserWithoutId = Omit<User, "id">;');
console.log('// { name: string; email: string; role: ... }');

console.log('\\n// Record - Object type');
console.log('type UserMap = Record<number, User>;');
console.log('// { [key: number]: User }');

console.log('\\n=== Component Props Extraction ===');

console.log('\\n// Extract props from existing component');
console.log('type ButtonProps = React.ComponentProps<typeof Button>;');
console.log('');
console.log('// Extract HTML element props');
console.log('type DivProps = React.ComponentProps<"div">;');
console.log('// Same as React.HTMLAttributes<HTMLDivElement>');

console.log('\\n=== Discriminated Unions ===');

console.log('\\ntype LoadingState =');
console.log('  | { status: "idle" }');
console.log('  | { status: "loading" }');
console.log('  | { status: "success"; data: User[] }');
console.log('  | { status: "error"; error: string };');
console.log('');
console.log('function DataDisplay({ state }: { state: LoadingState }) {');
console.log('  switch (state.status) {');
console.log('    case "idle":');
console.log('      return <div>Click to load</div>;');
console.log('    case "loading":');
console.log('      return <div>Loading...</div>;');
console.log('    case "success":');
console.log('      return <div>{state.data.length} users</div>; // data is typed!');
console.log('    case "error":');
console.log('      return <div>Error: {state.error}</div>; // error is typed!');
console.log('  }');
console.log('}');

console.log('\\n=== Polymorphic Components ===');

console.log('\\ntype PolymorphicProps<E extends React.ElementType> = {');
console.log('  as?: E;');
console.log('  children: React.ReactNode;');
console.log('} & React.ComponentPropsWithoutRef<E>;');
console.log('');
console.log('function Text<E extends React.ElementType = "span">({');
console.log('  as,');
console.log('  children,');
console.log('  ...props');
console.log('}: PolymorphicProps<E>) {');
console.log('  const Component = as || "span";');
console.log('  return <Component {...props}>{children}</Component>;');
console.log('}');
console.log('');
console.log('// Usage');
console.log('<Text>Default span</Text>');
console.log('<Text as="h1">Heading</Text>');
console.log('<Text as="a" href="/home">Link</Text> // href is typed!');

console.log('\\n=== Conditional Types ===');

console.log('\\ntype IsArray<T> = T extends any[] ? true : false;');
console.log('');
console.log('type A = IsArray<string[]>; // true');
console.log('type B = IsArray<string>;   // false');

console.log('\\n// Extract return type');
console.log('type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;');
console.log('');
console.log('function getUser() {');
console.log('  return { id: 1, name: "John" };');
console.log('}');
console.log('');
console.log('type User = ReturnType<typeof getUser>;');
console.log('// { id: number; name: string; }');

console.log('\\n=== Template Literal Types ===');

console.log('\\ntype EventName = "click" | "focus" | "blur";');
console.log('type HandlerName = \`on\${Capitalize<EventName>}\`;');
console.log('// "onClick" | "onFocus" | "onBlur"');

console.log('\\n✓ Use utility types for DRY code');
console.log('✓ Discriminated unions for state');
console.log('✓ Polymorphic components for flexibility');`
    },
    {
        id: 'react-ts-4',
        category: 'TypeScript',
        difficulty: 'Hard',
        question: 'TypeScript Best Practices and Common Pitfalls',
        answer: `Production TypeScript patterns for **maintainable code**.

### Best Practices:
1. **Strict mode** - Enable all strict flags
2. **Avoid any** - Use unknown instead
3. **Type inference** - Let TS infer when possible
4. **Interfaces over types** - For objects
5. **Const assertions** - For literal types

### Common Pitfalls:
- Type assertions (as) - Use sparingly
- Non-null assertion (!) - Dangerous
- Implicit any - Enable noImplicitAny
- Missing return types - Explicit for public APIs

### Performance:
- Avoid complex conditional types
- Use type aliases for reuse
- Incremental compilation`,
        codeExample: `// TypeScript Best Practices
console.log('=== Strict Mode Configuration ===');

console.log('// tsconfig.json');
console.log('{');
console.log('  "compilerOptions": {');
console.log('    "strict": true,');
console.log('    "noImplicitAny": true,');
console.log('    "strictNullChecks": true,');
console.log('    "strictFunctionTypes": true,');
console.log('    "noUnusedLocals": true,');
console.log('    "noUnusedParameters": true');
console.log('  }');
console.log('}');

console.log('\\n=== Avoid "any" ===');

console.log('\\n❌ Bad:');
console.log('function handleData(data: any) {');
console.log('  return data.value; // No type safety!');
console.log('}');

console.log('\\n✓ Good: Use unknown');
console.log('function handleData(data: unknown) {');
console.log('  if (typeof data === "object" && data !== null && "value" in data) {');
console.log('    return (data as { value: string }).value;');
console.log('  }');
console.log('  throw new Error("Invalid data");');
console.log('}');

console.log('\\n=== Type Inference ===');

console.log('\\n❌ Redundant:');
console.log('const count: number = 5;');
console.log('const items: string[] = ["a", "b"];');

console.log('\\n✓ Let TypeScript infer:');
console.log('const count = 5; // inferred as number');
console.log('const items = ["a", "b"]; // inferred as string[]');

console.log('\\n✓ Explicit when needed:');
console.log('const user: User | null = null; // Union type');
console.log('const items: readonly string[] = ["a"]; // Readonly');

console.log('\\n=== Const Assertions ===');

console.log('\\nconst colors = ["red", "blue"] as const;');
console.log('// Type: readonly ["red", "blue"]');
console.log('// Not: string[]');

console.log('\\nconst config = {');
console.log('  apiUrl: "https://api.example.com",');
console.log('  timeout: 5000');
console.log('} as const;');
console.log('// All properties readonly and literal types');

console.log('\\n=== Avoid Type Assertions ===');

console.log('\\n❌ Dangerous:');
console.log('const user = data as User; // Bypasses type checking!');

console.log('\\n✓ Better: Type guard');
console.log('function isUser(data: unknown): data is User {');
console.log('  return (');
console.log('    typeof data === "object" &&');
console.log('    data !== null &&');
console.log('    "id" in data &&');
console.log('    "name" in data');
console.log('  );');
console.log('}');
console.log('');
console.log('if (isUser(data)) {');
console.log('  console.log(data.name); // Type-safe!');
console.log('}');

console.log('\\n=== Non-null Assertion ===');

console.log('\\n❌ Dangerous:');
console.log('const element = document.getElementById("app")!;');
console.log('element.innerHTML = "..."; // Runtime error if null!');

console.log('\\n✓ Safe:');
console.log('const element = document.getElementById("app");');
console.log('if (element) {');
console.log('  element.innerHTML = "...";');
console.log('}');

console.log('\\n=== Explicit Return Types ===');

console.log('\\n// Public API - explicit return type');
console.log('export function getUser(id: number): Promise<User> {');
console.log('  return fetch(\`/api/users/\${id}\`).then(r => r.json());');
console.log('}');

console.log('\\n// Internal - inference OK');
console.log('function formatName(user: User) {');
console.log('  return \`\${user.firstName} \${user.lastName}\`;');
console.log('}');

console.log('\\n=== Interface vs Type ===');

console.log('\\n✓ Interface for objects (extendable):');
console.log('interface User {');
console.log('  id: number;');
console.log('  name: string;');
console.log('}');
console.log('');
console.log('interface Admin extends User {');
console.log('  role: "admin";');
console.log('}');

console.log('\\n✓ Type for unions/intersections:');
console.log('type Status = "idle" | "loading" | "success";');
console.log('type Result = Success | Error;');

console.log('\\n✓ Enable strict mode');
console.log('✓ Avoid any, use unknown');
console.log('✓ Let TypeScript infer when possible');
console.log('✓ Use type guards over assertions');`
    }
];
