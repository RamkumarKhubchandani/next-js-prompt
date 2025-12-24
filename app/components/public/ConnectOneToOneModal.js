"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { X, CalendarClock, Mail, User, MessageSquare, Phone } from 'lucide-react';
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
      } catch {}
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
                // Use scrollable overlay + top padding so tall modals never render off-screen.
                className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
                onMouseDown={(e) => {
                  // click outside closes
                  if (e.target === e.currentTarget) onClose?.();
                }}
              >
                <div className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm" />

                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  className="relative w-full max-w-2xl rounded-2xl border border-dark-700/10 dark:border-dark-700 bg-white dark:bg-dark-800 shadow-2xl overflow-hidden flex flex-col my-6 sm:my-10 max-h-[calc(100vh-2rem)]"
                >
                  <div className="p-6 border-b border-dark-700/10 dark:border-dark-700 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-bold tracking-widest uppercase text-brand-primary">
                        1:1 Connect
                      </p>
                      <h3 className="text-2xl font-bold text-dark-900 dark:text-white mt-2">
                        {headline || 'Book a 1:1 call'}
                      </h3>
                      <p className="text-sm text-dark-900/60 dark:text-light-100/70 mt-2">
                        {subhead || 'We’ll email you to confirm.'}
                        {(courseId && lessonTitle && typeof day === 'number') ? (
                          <>
                            {' '}Context is auto-attached:
                            <span className="text-dark-900 dark:text-light-200 font-semibold"> {courseTitle || courseId}</span>, Day{' '}
                            <span className="text-dark-900 dark:text-light-200 font-semibold">{day}</span> —{' '}
                            <span className="text-dark-900 dark:text-light-200 font-semibold">{lessonTitle}</span>
                          </>
                        ) : (
                          <>
                            {' '}This request will be sent as a general 1:1 help request (no specific lesson selected).
                          </>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => onClose?.()}
                      className="shrink-0 w-10 h-10 rounded-xl bg-dark-900/5 dark:bg-dark-700 hover:bg-dark-900/10 dark:hover:bg-dark-600 border border-dark-700/10 dark:border-dark-600 flex items-center justify-center"
                      aria-label="Close"
                    >
                      <X size={18} className="text-dark-900/70 dark:text-light-200" />
                    </button>
                  </div>

                  {/* Scrollable body so the footer stays visible on small screens */}
                  <div className="p-6 space-y-4 overflow-y-auto flex-1">
                    {status === 'ok' && (
                      <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-200">
                        Request sent. Check your inbox for confirmation.
                      </div>
                    )}
                    {status === 'err' && (
                      <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200">
                        {error || 'Failed to send request.'}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="block">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-100/70 mb-2">
                          <Mail size={14} /> Your email
                        </div>
                        <input
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-600 text-dark-900 dark:text-white placeholder:text-dark-900/40 dark:placeholder:text-light-100/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                          placeholder="you@gmail.com"
                        />
                      </label>
                      <label className="block">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-100/70 mb-2">
                          <User size={14} /> Name (optional)
                        </div>
                        <input
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-600 text-dark-900 dark:text-white placeholder:text-dark-900/40 dark:placeholder:text-light-100/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                          placeholder="Your name"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className="block">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-100/70 mb-2">
                          <Phone size={14} /> Country code
                        </div>
                        <input
                          value={form.phoneCountryCode}
                          onChange={(e) => setForm((p) => ({ ...p, phoneCountryCode: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-600 text-dark-900 dark:text-white placeholder:text-dark-900/40 dark:placeholder:text-light-100/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                          placeholder="+91"
                        />
                      </label>
                      <label className="block md:col-span-2">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-100/70 mb-2">
                          <Phone size={14} /> Mobile number (required)
                        </div>
                        <input
                          value={form.phoneNumber}
                          onChange={(e) => setForm((p) => ({ ...p, phoneNumber: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-600 text-dark-900 dark:text-white placeholder:text-dark-900/40 dark:placeholder:text-light-100/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                          placeholder="9876543210"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-100/70 mb-2">
                        <CalendarClock size={14} /> Preferred timing
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="datetime-local"
                          value={form.preferredTime}
                          onChange={(e) => setForm((p) => ({ ...p, preferredTime: e.target.value }))}
                          className="md:col-span-2 w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-600 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                        />
                        <input
                          value={form.timezone}
                          onChange={(e) => setForm((p) => ({ ...p, timezone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-600 text-dark-900 dark:text-white placeholder:text-dark-900/40 dark:placeholder:text-light-100/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                          placeholder="Timezone (e.g. Asia/Kolkata)"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-100/70 mb-2">
                        <MessageSquare size={14} /> What do you need help with?
                      </div>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-600 text-dark-900 dark:text-white placeholder:text-dark-900/40 dark:placeholder:text-light-100/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 resize-none"
                        placeholder="Describe your blocker, errors, what you tried, etc."
                      />
                    </label>
                  </div>

                  <div className="p-6 border-t border-dark-700/10 dark:border-dark-700 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <p className="text-xs text-dark-900/60 dark:text-light-100/70">
                      This sends an email to <span className="text-dark-900 dark:text-light-200 font-semibold">ramkumarkhub@gmail.com</span> and to you.
                    </p>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onClose?.()}
                        className="px-4 py-2 rounded-xl border border-dark-700/10 dark:border-dark-600 bg-dark-900/5 dark:bg-dark-700 hover:bg-dark-900/10 dark:hover:bg-dark-600 text-dark-900 dark:text-light-200 font-bold text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={submit}
                        disabled={submitting || status === 'ok'}
                        className={`px-4 py-2 rounded-xl font-bold text-sm ${
                          submitting || status === 'ok'
                            ? 'opacity-60 cursor-not-allowed bg-brand-primary text-dark-900'
                            : 'bg-brand-primary hover:opacity-90 text-dark-900'
                        }`}
                      >
                        {submitting ? 'Sending…' : status === 'ok' ? 'Sent' : (ctaLabel || 'Send request')}
                      </button>
                    </div>
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


