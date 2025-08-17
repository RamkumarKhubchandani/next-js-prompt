"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function TiptapView({ content }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || '',
        editable: false,
        immediatelyRender: false,
    });

    return (
        <EditorContent editor={editor} />
    );
}
