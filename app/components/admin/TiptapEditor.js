"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { useCallback, useEffect } from 'react';
import { Bold, Italic, Strikethrough, Link as LinkIcon, List, ListOrdered, Heading1, Heading2, Heading3, Image as ImageIcon, Table as TableIcon, Code, Quote } from 'lucide-react';

const Toolbar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const setLink = useCallback(() => {
        // ... link logic
    }, [editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('URL');

        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    return (
        <div className="p-2 bg-dark-700 rounded-t-lg border-b border-dark-600 flex items-center gap-2 flex-wrap">
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={18} /></button>
            <button onClick={setLink}><LinkIcon size={18} /></button>
            <button onClick={addImage}><ImageIcon size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code size={18} /></button>
            <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><TableIcon size={18} /></button>
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
            TableRow, TableHeader, TableCell,
            TextStyle, Color,
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
