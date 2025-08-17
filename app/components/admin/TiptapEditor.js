"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Toolbar = ({ editor }) => {
    if (!editor) {
        return null;
    }
    // Simple toolbar component - we will expand this later
    return (
        <div className="p-2 bg-dark-700 rounded-t-lg border-b border-dark-600 flex items-center gap-2">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>Bold</button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>Italic</button>
            <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>Code</button>
        </div>
    );
};

export default function TiptapEditor({ onChange, content }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
        immediatelyRender: false,
    });

    return (
        <div className="border border-dark-600 rounded-lg">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
