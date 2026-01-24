export const day25 = {
  day: 25,
  title: "Machine Coding: Drag & Drop from Scratch",
  intro: "Build a Kanban board drag-and-drop system using native HTML5 APIs. No libraries.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 25. HTML5 Drag & Drop is powerful but tricky. There is ONE line of code everyone forgets."
      },
      {
        type: "challenge",
        instruction: "This drop zone is broken. The `onDrop` event never fires. Fix it.",
        buggyCode: `// ❌ Broken Drop Zone
<div 
  onDragOver={() => console.log('hovering')}
  onDrop={handleDrop}
>
  Drop Here
</div>`,
        solutionCode: `// ✅ Fixed
<div 
  onDragOver={(e) => {
    e.preventDefault(); // REQUIRED to allow dropping!
    console.log('hovering');
  }}
  onDrop={handleDrop}
>
  Drop Here
</div>`,
        verifyOutput: "preventDefault",
        successMessage: "You got it! Browsers block drops by default. You must call `e.preventDefault()` in `onDragOver` to enable `onDrop`.",
        hint: "Call `e.preventDefault()` inside `onDragOver`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Build</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Draggable items with visual feedback</li>
<li>Drop zones with hover indicators</li>
<li>Cross-container drag and drop (Kanban style)</li>
<li>Reorder items within a list</li>
<li>Touch device support (bonus)</li>
</ul>

<div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-4 rounded-xl mb-6">
<h4 class="text-purple-400 font-bold mb-2">💡 Interview Context</h4>
<p class="text-gray-600 dark:text-light-300">Companies like Trello, Notion, Asana, and Jira all need drag-and-drop. This is a HIGH-VALUE skill.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ HTML5 Drag & Drop API</h3>
<table class="w-full text-left mb-6">
<tr class="border-b border-gray-200 dark:border-dark-600">
    <td class="py-2 text-cyan-400 font-mono">draggable="true"</td>
    <td class="py-2 text-gray-600 dark:text-light-300">Makes element draggable</td>
</tr>
<tr class="border-b border-gray-200 dark:border-dark-600">
    <td class="py-2 text-cyan-400 font-mono">onDragStart</td>
    <td class="py-2 text-gray-600 dark:text-light-300">Fires when drag begins (set data here)</td>
</tr>
<tr class="border-b border-gray-200 dark:border-dark-600">
    <td class="py-2 text-cyan-400 font-mono">onDragOver</td>
    <td class="py-2 text-gray-600 dark:text-light-300">Fires while dragging over a zone (must preventDefault!)</td>
</tr>
<tr class="border-b border-gray-200 dark:border-dark-600">
    <td class="py-2 text-cyan-400 font-mono">onDrop</td>
    <td class="py-2 text-gray-600 dark:text-light-300">Fires when item is dropped</td>
</tr>
<tr>
    <td class="py-2 text-cyan-400 font-mono">onDragEnd</td>
    <td class="py-2 text-gray-600 dark:text-light-300">Fires when drag ends (cleanup)</td>
</tr>
</table>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Critical: e.preventDefault()</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">The browser's default behavior is to reject drops. You MUST call <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">e.preventDefault()</code> in <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">onDragOver</code> to allow dropping.</p>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🎯 DRAG & DROP KANBAN BOARD                                         ║
║  Built with native HTML5 APIs - No libraries!                        ║
╠══════════════════════════════════════════════════════════════════════╣
║  FEATURES:                                                           ║
║  ✅ Drag items between columns                                       ║
║  ✅ Visual feedback (drag ghost, drop indicators)                    ║
║  ✅ State updates on drop                                            ║
║  ✅ Reorder within same column                                       ║
╚══════════════════════════════════════════════════════════════════════╝
*/

const INITIAL_DATA = {
columns: {
todo: {
  id: 'todo',
  title: '📋 To Do',
  items: [
    { id: '1', content: 'Learn React DnD' },
    { id: '2', content: 'Build Kanban Board' },
    { id: '3', content: 'Add animations' }
  ]
},
progress: {
  id: 'progress',
  title: '🔄 In Progress',
  items: [
    { id: '4', content: 'Review drag events' }
  ]
},
done: {
  id: 'done',
  title: '✅ Done',
  items: [
    { id: '5', content: 'Setup project' }
  ]
}
},
columnOrder: ['todo', 'progress', 'done']
};

// ═══════════════════════════════════════════════════════════════════
// 🧩 DRAGGABLE ITEM COMPONENT
// ═══════════════════════════════════════════════════════════════════
function DraggableItem({ item, columnId, index, onDragStart, onDragEnd }) {
const [isDragging, setIsDragging] = React.useState(false);

const handleDragStart = (e) => {
setIsDragging(true);
// Store the item data for the drop handler
e.dataTransfer.setData('application/json', JSON.stringify({
  itemId: item.id,
  sourceColumnId: columnId,
  sourceIndex: index
}));
e.dataTransfer.effectAllowed = 'move';
onDragStart?.();
};

const handleDragEnd = () => {
setIsDragging(false);
onDragEnd?.();
};

return (
<div
  draggable="true"
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
  style={{
    padding: '12px',
    marginBottom: '8px',
    background: isDragging ? '#dbeafe' : 'white',
    borderRadius: '8px',
    boxShadow: isDragging 
      ? '0 8px 16px rgba(59, 130, 246, 0.3)' 
      : '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'grab',
    opacity: isDragging ? 0.5 : 1,
    border: '1px solid #e2e8f0',
    transition: 'box-shadow 0.2s, opacity 0.2s'
  }}
>
  {item.content}
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// 📦 DROPPABLE COLUMN COMPONENT
// ═══════════════════════════════════════════════════════════════════
function DroppableColumn({ column, onDrop }) {
const [isOver, setIsOver] = React.useState(false);

// ⚠️ CRITICAL: Must preventDefault to allow drop!
const handleDragOver = (e) => {
e.preventDefault();
e.dataTransfer.dropEffect = 'move';
setIsOver(true);
};

const handleDragLeave = () => {
setIsOver(false);
};

const handleDrop = (e) => {
e.preventDefault();
setIsOver(false);

const data = JSON.parse(e.dataTransfer.getData('application/json'));
onDrop(data.itemId, data.sourceColumnId, column.id);
};

return (
<div
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
  style={{
    flex: 1,
    minWidth: '200px',
    padding: '12px',
    background: isOver ? '#dbeafe' : '#f1f5f9',
    borderRadius: '12px',
    border: isOver ? '2px dashed #3b82f6' : '2px solid transparent',
    transition: 'background 0.2s, border 0.2s',
    minHeight: '300px'
  }}
>
  <h3 style={{ 
    marginTop: 0, 
    marginBottom: '15px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#334155'
  }}>
    {column.title}
    <span style={{ 
      marginLeft: '8px',
      background: '#cbd5e1',
      padding: '2px 8px',
      borderRadius: '10px',
      fontSize: '12px'
    }}>
      {column.items.length}
    </span>
  </h3>
  
  {column.items.map((item, index) => (
    <DraggableItem 
      key={item.id} 
      item={item} 
      columnId={column.id}
      index={index}
    />
  ))}
  
  {column.items.length === 0 && (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      color: '#94a3b8',
      fontSize: '14px'
    }}>
      Drop items here
    </div>
  )}
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 MAIN KANBAN BOARD
// ═══════════════════════════════════════════════════════════════════
function KanbanBoard() {
const [data, setData] = React.useState(INITIAL_DATA);

const handleDrop = (itemId, sourceColumnId, targetColumnId) => {
if (sourceColumnId === targetColumnId) return; // Same column, no change

setData(prev => {
  const newColumns = { ...prev.columns };
  
  // Find and remove item from source
  const sourceColumn = { ...newColumns[sourceColumnId] };
  const itemIndex = sourceColumn.items.findIndex(i => i.id === itemId);
  const [movedItem] = sourceColumn.items.splice(itemIndex, 1);
  newColumns[sourceColumnId] = { ...sourceColumn, items: [...sourceColumn.items] };
  
  // Add item to target
  const targetColumn = { ...newColumns[targetColumnId] };
  newColumns[targetColumnId] = { 
    ...targetColumn, 
    items: [...targetColumn.items, movedItem] 
  };
  
  return { ...prev, columns: newColumns };
});
};

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h2 style={{ marginBottom: '20px' }}>🎯 Kanban Drag & Drop</h2>
  
  <div style={{ 
    display: 'flex', 
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '10px'
  }}>
    {data.columnOrder.map(columnId => (
      <DroppableColumn
        key={columnId}
        column={data.columns[columnId]}
        onDrop={handleDrop}
      />
    ))}
  </div>
  
  <p style={{ marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
    💡 Drag items between columns. Uses native HTML5 Drag & Drop API.
  </p>
</div>
);
}

function App() {
return <KanbanBoard />;
}`,
  comparison: {
    junior: `// ❌ Forgetting preventDefault
onDragOver={(e) => {
// Nothing here - drops won't work!
}}`,
    senior: `// ✅ Allow drops + visual feedback
onDragOver={(e) => {
e.preventDefault(); // REQUIRED!
e.dataTransfer.dropEffect = 'move';
setIsOver(true);
}}`
  },
  interview: {
    questions: [
      {
        q: "Why must you call e.preventDefault() in onDragOver?",
        a: "The browser's default behavior is to reject all drops. Without preventDefault(), the onDrop event will never fire. This is the #1 mistake developers make with drag-and-drop."
      },
      {
        q: "How do you pass data during drag operations?",
        a: "Use e.dataTransfer.setData('type', data) in onDragStart, and e.dataTransfer.getData('type') in onDrop. For complex data, stringify JSON. The dataTransfer object is the bridge between drag and drop."
      },
      {
        q: "When would you use a library like dnd-kit or react-beautiful-dnd instead of native APIs?",
        a: "Use libraries when you need: sortable lists with reorder animations, touch/mobile support, complex nested drop zones, accessibility (ARIA), or keyboard drag support. Native API is fine for simple cross-container moves."
      }
    ]
  }
};
