"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Quote, Code, Heading1, Heading2, Image as ImageIcon } from 'lucide-react';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="border-b border-gray-200 dark:border-dark-700 p-2 flex gap-1 flex-wrap bg-gray-50 dark:bg-dark-800 rounded-t-lg">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-dark-600 ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-dark-600' : ''}`}
            >
                <Bold size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-dark-600 ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-dark-600' : ''}`}
            >
                <Italic size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-dark-600 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-dark-600' : ''}`}
            >
                <Heading1 size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-dark-600 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-dark-600' : ''}`}
            >
                <Heading2 size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-dark-600 ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-dark-600' : ''}`}
            >
                <List size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-dark-600 ${editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-dark-600' : ''}`}
            >
                <ListOrdered size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-dark-600 ${editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-dark-600' : ''}`}
            >
                <Quote size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-dark-600 ${editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-dark-600' : ''}`}
            >
                <Code size={18} />
            </button>
            <button
                type="button"
                onClick={addImage}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-dark-600"
            >
                <ImageIcon size={18} />
            </button>
        </div>
    );
};

export default function TutorialEditor({ content, onChange, editable = true }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: content || '',
        editable: editable,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none p-4 focus:outline-none min-h-[300px]',
            },
        },
    });

    return (
        <div className="border border-gray-200 dark:border-dark-700 rounded-lg overflow-hidden bg-white dark:bg-dark-800">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
