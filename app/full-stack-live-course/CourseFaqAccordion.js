"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COURSE_FAQS } from '@/app/lib/course-faq';

export default function CourseFaqAccordion() {
  const [openId, setOpenId] = useState(COURSE_FAQS[0]?.id || null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {COURSE_FAQS.map((faq, index) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
              className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-2xl"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold text-emerald-400/80 pt-0.5 shrink-0">
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <span className="text-base sm:text-lg font-bold text-white leading-snug">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180 text-emerald-400' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div
                id={`faq-answer-${faq.id}`}
                className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/60 pl-11"
              >
                <p className="whitespace-pre-line">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
