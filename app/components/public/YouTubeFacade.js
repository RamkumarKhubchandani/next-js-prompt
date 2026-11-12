"use client";
import React, { useState } from 'react';

export default function YouTubeFacade({ id, title = 'Student feedback', className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className={`relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div className={`relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 group cursor-pointer shadow-lg ${className}`}>
      {/* Plain img element without next/image to prevent SSR prefetching and extra server hops */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        width={480}
        height={360}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        aria-label={`Play video: ${title}`}
        className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600/95 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl transition-all duration-200 transform group-hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-400"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
        <p className="text-xs font-semibold text-white truncate">{title}</p>
      </div>
    </div>
  );
}
