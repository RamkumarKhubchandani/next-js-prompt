"use client";
import React, { useEffect, useState } from 'react';
import TiptapEditor from './TiptapEditor';

export default function SafeTiptapEditor({ onEditorReady, content }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Or a loading spinner
    }

    return <TiptapEditor onEditorReady={onEditorReady} content={content} />;
}
