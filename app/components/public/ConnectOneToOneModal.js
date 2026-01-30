"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { X, CalendarClock, Mail, User, MessageSquare, Phone, FileText } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

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
      let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Handle common aliases
      if (tz === 'Asia/Calcutta') tz = 'Asia/Kolkata';
      return tz;
    } catch {
      return 'Asia/Kolkata'; // Default to India if detection fails
    }
  }, []);

  const [form, setForm] = useState({
    email: initialEmail,
    name: initialName,
    phone: '',
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
        if (phone?.countryCode && phone?.number) {
          const combinedPhone = `${phone.countryCode}${phone.number}`;
          setForm((p) => ({ ...p, phone: combinedPhone }));
        }
      } catch { }
    })();
  }, [open, initialEmail, initialName, timezone]);

  const submit = async () => {
    if (!form.phone?.trim()) {
      setStatus('err');
      setError('Mobile number is required for 1:1 connect.');
      return;
    }
    setSubmitting(true);
    setStatus(null);
    setError('');
    try {
      // Parse phone number - it comes in format like "+919876543210"
      const phoneMatch = form.phone.match(/^(\+\d{1,4})(.+)$/);
      const countryCode = phoneMatch ? phoneMatch[1] : '+91';
      const number = phoneMatch ? phoneMatch[2].replace(/\D/g, '') : form.phone.replace(/\D/g, '');

      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          phone: {
            countryCode,
            number,
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
                    <div className="p-6 rounded-2xl bg-green-500/10 border-2 border-green-500/20 text-green-700 dark:text-green-400">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Request Sent Successfully!</h4>
                          <p className="text-sm opacity-90">We've received your request</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">Thanks for reaching out! We'll get back to you soon.</p>
                        <div className="pt-3 mt-3 border-t border-green-500/20">
                          <p className="font-semibold mb-2">You can also contact us directly:</p>
                          <div className="space-y-1.5">
                            <a href="https://wa.me/918237320942" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                              </svg>
                              <span>WhatsApp: +91 823 732 0942</span>
                            </a>
                            <a href="mailto:contact@outlinedev.com" className="flex items-center gap-2 hover:underline">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span>Email: contact@outlinedev.com</span>
                            </a>
                          </div>
                        </div>
                      </div>
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

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">WhatsApp Number *</label>
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        value={form.phone}
                        onChange={(value) => setForm((p) => ({ ...p, phone: value }))}
                        className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white dark:focus:bg-black text-gray-900 dark:text-white transition-all outline-none font-medium"
                        placeholder="Enter phone number"
                        required
                      />
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
                        <select
                          value={form.timezone}
                          onChange={(e) => setForm((p) => ({ ...p, timezone: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white dark:focus:bg-black text-gray-900 dark:text-white transition-all outline-none font-medium"
                        >
                          <option value="">Select Timezone</option>
                          <optgroup label="🇮🇳 India">
                            <option value="Asia/Kolkata">India (IST - UTC+5:30)</option>
                          </optgroup>
                          <optgroup label="🇺🇸 United States">
                            <option value="America/New_York">Eastern Time (ET - UTC-5)</option>
                            <option value="America/Chicago">Central Time (CT - UTC-6)</option>
                            <option value="America/Denver">Mountain Time (MT - UTC-7)</option>
                            <option value="America/Los_Angeles">Pacific Time (PT - UTC-8)</option>
                            <option value="America/Anchorage">Alaska (AKT - UTC-9)</option>
                            <option value="Pacific/Honolulu">Hawaii (HST - UTC-10)</option>
                          </optgroup>
                          <optgroup label="🇨🇦 Canada">
                            <option value="America/Toronto">Toronto (ET - UTC-5)</option>
                            <option value="America/Vancouver">Vancouver (PT - UTC-8)</option>
                            <option value="America/Edmonton">Edmonton (MT - UTC-7)</option>
                            <option value="America/Halifax">Halifax (AT - UTC-4)</option>
                          </optgroup>
                          <optgroup label="🇬🇧 United Kingdom">
                            <option value="Europe/London">London (GMT/BST - UTC+0)</option>
                          </optgroup>
                          <optgroup label="🇪🇺 Europe">
                            <option value="Europe/Paris">Paris (CET - UTC+1)</option>
                            <option value="Europe/Berlin">Berlin (CET - UTC+1)</option>
                            <option value="Europe/Rome">Rome (CET - UTC+1)</option>
                            <option value="Europe/Madrid">Madrid (CET - UTC+1)</option>
                            <option value="Europe/Amsterdam">Amsterdam (CET - UTC+1)</option>
                            <option value="Europe/Brussels">Brussels (CET - UTC+1)</option>
                            <option value="Europe/Zurich">Zurich (CET - UTC+1)</option>
                            <option value="Europe/Vienna">Vienna (CET - UTC+1)</option>
                            <option value="Europe/Stockholm">Stockholm (CET - UTC+1)</option>
                            <option value="Europe/Warsaw">Warsaw (CET - UTC+1)</option>
                            <option value="Europe/Athens">Athens (EET - UTC+2)</option>
                            <option value="Europe/Istanbul">Istanbul (TRT - UTC+3)</option>
                            <option value="Europe/Moscow">Moscow (MSK - UTC+3)</option>
                          </optgroup>
                          <optgroup label="🇦🇺 Australia">
                            <option value="Australia/Sydney">Sydney (AEDT - UTC+11)</option>
                            <option value="Australia/Melbourne">Melbourne (AEDT - UTC+11)</option>
                            <option value="Australia/Brisbane">Brisbane (AEST - UTC+10)</option>
                            <option value="Australia/Perth">Perth (AWST - UTC+8)</option>
                            <option value="Australia/Adelaide">Adelaide (ACDT - UTC+10:30)</option>
                          </optgroup>
                          <optgroup label="🇨🇳 China">
                            <option value="Asia/Shanghai">China (CST - UTC+8)</option>
                            <option value="Asia/Hong_Kong">Hong Kong (HKT - UTC+8)</option>
                          </optgroup>
                          <optgroup label="🇮🇱 Israel">
                            <option value="Asia/Jerusalem">Israel (IST - UTC+2)</option>
                          </optgroup>
                          <optgroup label="🌏 Asia">
                            <option value="Asia/Tokyo">Tokyo (JST - UTC+9)</option>
                            <option value="Asia/Seoul">Seoul (KST - UTC+9)</option>
                            <option value="Asia/Singapore">Singapore (SGT - UTC+8)</option>
                            <option value="Asia/Dubai">Dubai (GST - UTC+4)</option>
                            <option value="Asia/Bangkok">Bangkok (ICT - UTC+7)</option>
                            <option value="Asia/Jakarta">Jakarta (WIB - UTC+7)</option>
                            <option value="Asia/Manila">Manila (PHT - UTC+8)</option>
                            <option value="Asia/Karachi">Karachi (PKT - UTC+5)</option>
                          </optgroup>
                          <optgroup label="🌍 Middle East & Africa">
                            <option value="Africa/Cairo">Cairo (EET - UTC+2)</option>
                            <option value="Africa/Johannesburg">Johannesburg (SAST - UTC+2)</option>
                            <option value="Africa/Lagos">Lagos (WAT - UTC+1)</option>
                            <option value="Africa/Nairobi">Nairobi (EAT - UTC+3)</option>
                          </optgroup>
                          <optgroup label="🌎 South America">
                            <option value="America/Sao_Paulo">São Paulo (BRT - UTC-3)</option>
                            <option value="America/Argentina/Buenos_Aires">Buenos Aires (ART - UTC-3)</option>
                            <option value="America/Mexico_City">Mexico City (CST - UTC-6)</option>
                            <option value="America/Lima">Lima (PET - UTC-5)</option>
                            <option value="America/Bogota">Bogotá (COT - UTC-5)</option>
                          </optgroup>
                          <optgroup label="🌏 Pacific">
                            <option value="Pacific/Auckland">Auckland (NZDT - UTC+13)</option>
                            <option value="Pacific/Fiji">Fiji (FJT - UTC+12)</option>
                          </optgroup>
                        </select>
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


