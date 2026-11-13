"use client";
import React, { useRef, useEffect } from 'react';

export default function ReviewMarquee({ children, reverse = false, className = '' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const track = el.querySelector('.marquee-track');
        if (track && !track.dataset.cloned) {
            const clone = track.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.dataset.cloned = 'true';
            el.appendChild(clone);
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={`flex gap-6 overflow-hidden select-none hover:pause ${className}`}
        >
            <div
                className="flex gap-6 shrink-0 animate-marquee marquee-track"
                style={reverse ? { animationDirection: 'reverse' } : undefined}
            >
                {children}
            </div>
        </div>
    );
}
