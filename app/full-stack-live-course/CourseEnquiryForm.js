"use client";

import React, { useState } from 'react';
import { Calendar, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { COURSE_INDIA, isSet, getUpcomingBatches } from '@/app/lib/course-india';

export default function CourseEnquiryForm({ defaultBatch = '' }) {
  const upcomingBatches = getUpcomingBatches();
  const initialBatch = defaultBatch || upcomingBatches[0]?.startDate || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: initialBatch,
    message: '',
    consent: true,
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your name, email, and WhatsApp/phone number.');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('Please accept the consent checkbox to be contacted about your consultation.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const selectedBatchObj = upcomingBatches.find((b) => b.startDate === formData.batch);
      const batchLabel = selectedBatchObj ? `${selectedBatchObj.formattedDate} (${selectedBatchObj.label})` : formData.batch;

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        budget: '₹10,000 (Full Stack Live Course)',
        goal: `Full Stack Live Course Consultation (${batchLabel})`,
        stack: ['full-stack-course', 'html-css', 'javascript', 'react', 'nodejs', 'sqlite'],
        description: formData.message.trim()
          ? `[Source: full-stack-course | Batch: ${batchLabel}] ${formData.message.trim()}`
          : `[Source: full-stack-course | Batch: ${batchLabel}] Booking a free 15-minute consultation call.`,
        urgency: formData.batch,
      };

      const res = await fetch('/api/mentorship/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit request. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your internet connection or try again.');
    }
  };

  const hasValidWhatsapp = isSet(COURSE_INDIA.whatsappNumber);
  const hasValidCall = isSet(COURSE_INDIA.callNumber);

  return (
    <div id="booking-form" className="scroll-mt-28 p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl max-w-2xl mx-auto">
      {status === 'success' ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Consultation Request Received!</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed mb-6">
            Thank you, <strong className="text-white">{formData.name}</strong>. We have received your request for the{' '}
            <strong className="text-emerald-400">{formData.batch}</strong> cohort. We will reach out via WhatsApp or email to schedule your 15-minute 1-on-1 video call.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto text-left space-y-2">
            <p className="font-semibold text-slate-200">What happens on the 15-minute call:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Review your current coding background and weekly availability.</li>
              <li>Walk through the live session workflow and laptop requirements.</li>
              <li>Answer any technical questions about the syllabus and projects.</li>
              <li>If it is a good fit, provide direct UPI payment instructions and receipt details.</li>
            </ul>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-slate-800 pb-4 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1 of Enrollment</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Book a Free 15-Minute Intro Call
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Talk directly with the instructor before paying anything. We review your goals and verify this course is the right fit.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/80 text-xs text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="field-name">
              Full Name *
            </label>
            <input
              id="field-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Rahul Sharma"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="field-email">
                Email Address *
              </label>
              <input
                id="field-email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="field-phone">
                WhatsApp / Phone Number *
              </label>
              <input
                id="field-phone"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="field-batch">
              Select Preferred Cohort Batch *
            </label>
            <div className="relative">
              <select
                id="field-batch"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 transition appearance-none cursor-pointer"
              >
                {upcomingBatches.map((b) => (
                  <option key={b.startDate} value={b.startDate}>
                    Starts {b.formattedDate} — {b.label}
                  </option>
                ))}
              </select>
              <Calendar className="w-4 h-4 text-slate-500 absolute right-4 top-3 pointer-events-none" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              You can switch to another upcoming batch prior to Day 1 if your schedule changes.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="field-message">
              Questions or Background (Optional)
            </label>
            <textarea
              id="field-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your background (student, working professional, complete beginner) and any questions you have."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer pt-1">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-0.5 rounded text-emerald-500 bg-slate-950 border-slate-800 focus:ring-emerald-500"
            />
            <span>
              OutlineDev may contact me via WhatsApp or email to schedule this free consultation call. No spam, ever.
            </span>
          </label>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting request...</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                <span>Book a free 15-minute call</span>
              </>
            )}
          </button>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold">
            {hasValidWhatsapp && (
              <a
                href="https://wa.me/918237320942?text=Hi%2C%20I%20want%20to%20join%20the%20Full%20Stack%20Live%20Course"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition"
              >
                <span>Chat on WhatsApp</span>
              </a>
            )}
            {hasValidCall && (
              <a
                href={`tel:${COURSE_INDIA.callNumber}`}
                rel="noopener"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <span>Call us: {COURSE_INDIA.callNumberDisplay}</span>
              </a>
            )}
          </div>

          <p className="text-[11px] text-slate-500 text-center leading-relaxed">
            Direct 1-on-1 call with Ramkumar Khubchandani. No payment taken today. No sales pressure.
          </p>
        </form>
      )}
    </div>
  );
}
