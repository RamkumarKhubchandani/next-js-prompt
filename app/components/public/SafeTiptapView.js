"use client";
import React, { useEffect, useState } from 'react';
import TiptapView from './TiptapView';

export default function SafeTiptapView({ content }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Or a loading spinner
    }

    return <TiptapView content={content} />;
}
