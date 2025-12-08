const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Challenge Schema (copied since we can't import ES modules easily in this script without babel)
const challengeSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Expert'], default: 'Easy' },
    category: { type: String, required: true },
    initialCode: { type: String, required: true },
    solutionCode: { type: String, required: true },
    hints: [{ type: String }],
    xpReward: { type: Number, default: 50 },
    dayNumber: { type: Number, unique: true }
});

const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);

const challenges = [
    {
        dayNumber: 1,
        slug: 'infinite-loop-useeffect',
        title: 'The Infinite Loop of Death',
        description: 'This component crashes the browser. Why does `useEffect` keep running?',
        difficulty: 'Easy',
        category: 'React',
        hints: ['Check the dependency array', 'Are you updating state inside an effect that depends on that state?'],
        initialCode: `import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // ❌ BUG: This runs on every render, causing an infinite loop!
    setCount(count + 1);
  }); 

  return <h1>Count: {count}</h1>;
}`,
        solutionCode: `import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // ✅ Fix: Add empty dependency array to run once
    // OR add proper logic to stop recursion
    const timer = setInterval(() => {
       setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []); 

  return <h1>Count: {count}</h1>;
}`
    },
    {
        dayNumber: 2,
        slug: 'stale-closure-hook',
        title: 'The Stale Closure Trap',
        description: 'The alert always shows 0, even after clicking increment. Why?',
        difficulty: 'Medium',
        category: 'React',
        hints: ['Closures capture variables at creation time', 'useRef can hold mutable values'],
        initialCode: `import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Count is: ' + count); // Always 0!
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Empty array means effect is created once with initial 'count' (0)

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
        solutionCode: `import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Count is: ' + count);
    }, 1000);
    return () => clearInterval(timer);
  }, [count]); // ✅ Fix: Re-create effect when count changes

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`
    },
    {
        dayNumber: 3,
        slug: 'missing-keys-list',
        title: 'The Ghost of Missing Keys',
        description: 'React is yelling about unique keys. But why do we strictly need them?',
        difficulty: 'Easy',
        category: 'React',
        hints: ['Keys help React identify changed items', 'Using index as key is bad for reordering'],
        initialCode: `import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState(['Learn React', 'Fix Bug', 'Ship It']);

  return (
    <ul>
      {todos.map((todo) => (
        // ❌ Missing 'key' prop
        <li>{todo}</li>
      ))}
    </ul>
  );
}`,
        solutionCode: `import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState(['Learn React', 'Fix Bug', 'Ship It']);

  return (
    <ul>
      {todos.map((todo) => (
        // ✅ Fix: Add unique key
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  );
}`
    },
    {
        dayNumber: 4,
        slug: 'async-state-update',
        title: 'The Async State Mystery',
        description: 'We set the count to 5, but the console logs 0 immediately after. Why?',
        difficulty: 'Easy',
        category: 'React',
        hints: ['setState is asynchronous', 'Use useEffect to react to state changes'],
        initialCode: `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(5);
    // ❌ BUG: This logs 0, not 5
    console.log(count); 
  };

  return <button onClick={handleClick}>Set to 5</button>;
}`,
        solutionCode: `import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(5);
  };

  // ✅ Fix: Log inside useEffect
  useEffect(() => {
    console.log(count);
  }, [count]);

  return <button onClick={handleClick}>Set to 5</button>;
}`
    },
    {
        dayNumber: 5,
        slug: 'object-mutation',
        title: 'The Silent Object Mutation',
        description: 'We updated the user name, but the component didn\'t re-render.',
        difficulty: 'Medium',
        category: 'React',
        hints: ['React checks for reference equality', 'Mutating an object keeps the same reference'],
        initialCode: `import React, { useState } from 'react';

export default function App() {
  const [user, setUser] = useState({ name: 'Alice', age: 25 });

  const updateName = () => {
    // ❌ BUG: Direct mutation
    user.name = 'Bob'; 
    setUser(user); // Reference is same, no re-render!
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={updateName}>Change to Bob</button>
    </div>
  );
}`,
        solutionCode: `import React, { useState } from 'react';

export default function App() {
  const [user, setUser] = useState({ name: 'Alice', age: 25 });

  const updateName = () => {
    // ✅ Fix: Create new object copy
    setUser({ ...user, name: 'Bob' });
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={updateName}>Change to Bob</button>
    </div>
  );
}`
    },
    {
        dayNumber: 6,
        slug: 'prop-drilling-hell',
        title: 'Prop Drilling Hell',
        description: 'This code is a mess. Refactor it using Context API.',
        difficulty: 'Medium',
        category: 'React Pattern',
        hints: ['createContext', 'useContext'],
        initialCode: `import React, { useState } from 'react';

// ❌ Passing 'user' down 3 levels
const GrandChild = ({ user }) => <div>User: {user}</div>;
const Child = ({ user }) => <GrandChild user={user} />;
const Parent = ({ user }) => <Child user={user} />;

export default function App() {
  const [user] = useState("Alice");
  return <Parent user={user} />;
}`,
        solutionCode: `import React, { useState, createContext, useContext } from 'react';

const UserContext = createContext();

const GrandChild = () => {
  const user = useContext(UserContext);
  return <div>User: {user}</div>;
};

const Child = () => <GrandChild />;
const Parent = () => <Child />;

export default function App() {
  const [user] = useState("Alice");
  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}`
    },
    {
        dayNumber: 7,
        slug: 'fetch-race-condition',
        title: 'The Fetch Race Condition',
        description: 'Fast clicking causes data mismatch. The last request should win.',
        difficulty: 'Hard',
        category: 'React',
        hints: ['Cleanup function in useEffect', 'AbortController'],
        initialCode: `import React, { useState, useEffect } from 'react';

export default function App({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // ❌ If 'id' changes fast, old requests might finish AFTER new ones
    fetch(\`/api/data/\${id}\`).then(r => r.json()).then(setData);
  }, [id]);

  return <div>{JSON.stringify(data)}</div>;
}`,
        solutionCode: `import React, { useState, useEffect } from 'react';

export default function App({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(\`/api/data/\${id}\`)
      .then(r => r.json())
      .then(d => {
        if (!ignore) setData(d);
      });
      
    return () => { ignore = true; };
  }, [id]);

  return <div>{JSON.stringify(data)}</div>;
}`
    },
    {
        dayNumber: 8,
        slug: 'closure-memory-leak',
        title: 'The Memory Leak',
        description: 'This component keeps eating memory even after unmount. Find the leak.',
        difficulty: 'Hard',
        category: 'JavaScript',
        hints: ['Event listeners must be removed', 'Check window.addEventListener'],
        initialCode: `import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
    };
    
    // ❌ Leak: Listener added but never removed
    window.addEventListener('resize', handleResize);
  }, []);

  return <div>Resize the window and check console</div>;
}`,
        solutionCode: `import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // ✅ Fix: Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>Resize the window and check console</div>;
}`
    },
    {
        dayNumber: 9,
        slug: 'usememo-referential-integrity',
        title: 'Broken Memoization',
        description: 'Child component re-renders even when props technically didn\'t change. Why?',
        difficulty: 'Expert',
        category: 'React Performance',
        hints: ['Objects are compared by reference', 'Inline objects are new every render'],
        initialCode: `import React, { useState, memo } from 'react';

const Child = memo(({ config }) => {
  console.log("Child Rendered");
  return <div>Config: {config.theme}</div>;
});

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      
      {/* ❌ Bug: New object created every render breaks memo */}
      <Child config={{ theme: 'dark' }} />
    </div>
  );
}`,
        solutionCode: `import React, { useState, memo, useMemo } from 'react';

const Child = memo(({ config }) => {
  console.log("Child Rendered");
  return <div>Config: {config.theme}</div>;
});

export default function App() {
  const [count, setCount] = useState(0);

  // ✅ Fix: Stable reference
  const config = useMemo(() => ({ theme: 'dark' }), []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <Child config={config} />
    </div>
  );
}`
    },
    {
        dayNumber: 10,
        slug: 'event-loop-block',
        title: 'Blocking the Event Loop',
        description: 'Clicking the button freezes the entire UI. How can we keep the UI responsive?',
        difficulty: 'Expert',
        category: 'JavaScript System',
        hints: ['The main thread is single-threaded', 'Chunking work with setTimeout'],
        initialCode: `import React, { useState } from 'react';

export default function App() {
  const [status, setStatus] = useState('Idle');

  const runHeavyTask = () => {
    setStatus('Processing...');
    
    // ❌ Bug: Synchronous loop blocks rendering
    // The UI won't update to "Processing..." until this finishes
    const start = Date.now();
    while (Date.now() - start < 3000) {
      // Simulate 3s of heavy CPU work
    }
    
    setStatus('Done');
  };

  return (
    <div>
      <div>Status: {status}</div>
      <button onClick={runHeavyTask}>Run Heavy Task</button>
    </div>
  );
}`,
        solutionCode: `import React, { useState } from 'react';

export default function App() {
  const [status, setStatus] = useState('Idle');

  const runHeavyTask = () => {
    setStatus('Processing...');
    
    // ✅ Fix: Defer CPU work to next tick to allow UI paint
    setTimeout(() => {
        const start = Date.now();
        while (Date.now() - start < 3000) {
          // Heavy work still blocks, but at least "Processing..." rendered first
        }
        setStatus('Done');
    }, 0);
    
    // Ideally use Web Workers for true parallelism!
  };

  return (
    <div>
      <div>Status: {status}</div>
      <button onClick={runHeavyTask}>Run Heavy Task</button>
    </div>
  );
}`
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Challenge.deleteMany({});
        console.log('Cleared existing challenges');

        await Challenge.insertMany(challenges);
        console.log(`Seeded ${challenges.length} challenges`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding challenges:', error);
        process.exit(1);
    }
}

seed();
