"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CustomCodeBlock from './CustomCodeBlock';

export default function TiptapView({ content }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false, // disable the default code block
            }),
            CustomCodeBlock,
        ],
        content: content || '',
        editable: false,
        immediatelyRender: false,
    });

    return <EditorContent editor={editor} />;
}
