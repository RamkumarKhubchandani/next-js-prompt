"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { X, CalendarClock, Mail, User, MessageSquare, Phone, FileText } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ConnectOneToOneModal({
  open,
  onClose,
  sessionUser,
  courseId,
  courseTitle,
  day,
  lessonTitle,
  headline,
  subhead,
  ctaLabel,
  defaultNotes,
}) {
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'ok' | 'err'
  const [error, setError] = useState('');

  const initialEmail = sessionUser?.email || '';
  const initialName = sessionUser?.name || sessionUser?.username || '';

  const timezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return '';
    }
  }, []);

  const [form, setForm] = useState({
    email: initialEmail,
    name: initialName,
    phoneCountryCode: '+91',
    phoneNumber: '',
    preferredTime: '',
    timezone,
    notes: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setStatus(null);
    setError('');
    setSubmitting(false);
    setForm((prev) => ({
      ...prev,
      email: initialEmail,
      name: initialName,
      timezone,
      notes: defaultNotes ?? prev.notes ?? '',
    }));

    // Prefill phone from profile settings if available
    (async () => {
      try {
        const res = await fetch('/api/user/settings');
        if (!res.ok) return;
        const data = await res.json();
        const phone = data?.phone || {};
        if (phone?.countryCode || phone?.number) {
          setForm((p) => ({
            ...p,
            phoneCountryCode: phone.countryCode || p.phoneCountryCode,
            phoneNumber: phone.number || p.phoneNumber,
          }));
        }
      } catch { }
    })();
  }, [open, initialEmail, initialName, timezone]);

  const submit = async () => {
    if (!form.phoneNumber?.trim()) {
      setStatus('err');
      setError('Mobile number is required for 1:1 connect.');
      return;
    }
    setSubmitting(true);
    setStatus(null);
    setError('');
    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          phone: {
            countryCode: form.phoneCountryCode,
            number: form.phoneNumber,
          },
          preferredTime: form.preferredTime,
          timezone: form.timezone,
          notes: form.notes,
          courseId,
          courseTitle,
          day,
          lessonTitle,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
          profile: {
            id: sessionUser?.id,
            username: sessionUser?.username,
            plan: sessionUser?.plan,
            role: sessionUser?.role,
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || 'Request failed');
      }
      setStatus('ok');
    } catch (e) {
      setStatus('err');
      setError(e?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    mounted
      ? createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // Center alignment 
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
              onMouseDown={(e) => {
                // click outside closes
                if (e.target === e.currentTarget) onClose?.();
              }}
            >
              <div className="absolute inset-0 bg-black/20 dark:bg-black/80 backdrop-blur-sm transition-opacity" />

              <motion.div
                initial={{ opacity: 0, y: 300, scale: 0.2, borderRadius: "100%" }}
                animate={{ opacity: 1, y: 0, scale: 1, borderRadius: "32px" }}
                exit={{ opacity: 0, y: 300, scale: 0.2, borderRadius: "100%" }}
                transition={{ type: "spring", stiffness: 220, damping: 25 }}
                style={{ transformOrigin: "bottom center" }}
                className="relative w-full max-w-2xl bg-white dark:bg-[#111] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                {/* Premium Gradient Topbar (No text, just vibe) */}
                <div className="h-2 w-full bg-gradient-to-r from-brand-primary via-blue-500 to-purple-500" />
                <div className="px-8 pt-8 pb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {headline || 'Book a 1:1 call'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {subhead || 'Direct line to your mentor.'}
                    </p>
                  </div>
                  <button
                    onClick={() => onClose?.()}
                    className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                  >
                    <X size={20} className="text-gray-900 dark:text-white" />
                  </button>
                </div>

                {/* Scrollable body so the footer stays visible on small screens */}
                {/* Clean Form Body */}
                <div className="px-8 space-y-5 overflow-y-auto flex-1 custom-scrollbar pb-4">
                  {status === 'ok' && (
                    <div className="p-4 rounded-2xl bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium text-center">
                      Request sent! check your inbox.
                    </div>
                  )}
                  {status === 'err' && (
                    <div className="p-4 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium text-center">
                      {error || 'Failed to send request.'}
                    </div>
                  )}

                  <div className="space-y-4">

                    {/* Session Context Badge */}
                    {(courseId || lessonTitle) && (
                      <div className="p-3 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-black rounded-xl text-brand-primary shadow-sm">
                          <FileText size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-bold text-brand-primary uppercase tracking-widest leading-none mb-1">Current Session</div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white truncate">
                            {courseTitle || courseId} • Day {day}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {lessonTitle}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Contact</label>
                      <input
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white dark:focus:bg-black text-gray-900 dark:text-white transition-all outline-none font-medium"
                        placeholder="Email"
                      />
                    </div>

                    <div className="grid grid-cols-[80px,1fr] gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Code</label>
                        <input
                          value={form.phoneCountryCode}
                          onChange={(e) => setForm((p) => ({ ...p, phoneCountryCode: e.target.value }))}
                          className="w-full px-3 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white dark:focus:bg-black text-gray-900 dark:text-white transition-all outline-none font-medium text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Mobile</label>
                        <input
                          value={form.phoneNumber}
                          onChange={(e) => setForm((p) => ({ ...p, phoneNumber: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white dark:focus:bg-black text-gray-900 dark:text-white transition-all outline-none font-medium"
                          placeholder="Mobile Number"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Name (Optional)</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white dark:focus:bg-black text-gray-900 dark:text-white transition-all outline-none font-medium"
                        placeholder="Your Name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Preferred Time</label>
                        <input
                          type="datetime-local"
                          value={form.preferredTime}
                          onChange={(e) => setForm((p) => ({ ...p, preferredTime: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white dark:focus:bg-black text-gray-900 dark:text-white transition-all outline-none font-medium text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Timezone</label>
                        <input
                          value={form.timezone}
                          onChange={(e) => setForm((p) => ({ ...p, timezone: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white dark:focus:bg-black text-gray-900 dark:text-white transition-all outline-none font-medium"
                          placeholder="Asia/Kolkata"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Message</label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white dark:focus:bg-black text-gray-900 dark:text-white transition-all outline-none font-medium resize-none"
                        placeholder="What's blocking you?"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={submit}
                    disabled={submitting || status === 'ok'}
                    className={`w-full py-4 rounded-2xl font-bold text-base transition-all transform active:scale-95 shadow-lg ${submitting || status === 'ok'
                      ? 'opacity-60 cursor-not-allowed bg-gray-200 text-gray-500'
                      : 'bg-black dark:bg-white text-white dark:text-black hover:shadow-xl'
                      }`}
                  >
                    {submitting ? 'Sending...' : status === 'ok' ? 'Sent!' : (ctaLabel || 'Send Request')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
      : null
  );
}


