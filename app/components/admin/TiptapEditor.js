"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { useCallback, useEffect } from 'react';

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

export default function TiptapEditor({ onEditorReady, content }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Image,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            // This will be handled by the publish button now
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert lg:prose-xl max-w-none focus:outline-none p-4',
            },
        },
        immediatelyRender: false, // This is the definitive fix
    });

    useEffect(() => {
        if (editor && onEditorReady) {
            onEditorReady(editor);
        }
    }, [editor, onEditorReady]);

    // ... (logic for image, video, link handlers)

    return (
        <div className="border border-dark-600 rounded-lg">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
