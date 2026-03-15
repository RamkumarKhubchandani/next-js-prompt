"use client";
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { COURSES } from "../../lib/courses/index";
import {
  Lock,
  CheckCircle,
  PlayCircle,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Code,
  Brain,
  Youtube,
  Scale,
  Copy,
  Check,
  ArrowLeftRight,
  Menu,
  X,
  MonitorPlay,
  Sparkles,
} from "lucide-react";
import UpgradeToProModal from "../../components/UpgradeToProModal";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Logo } from "../../components/Logo";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import CompleteButton from "../../components/public/CompleteButton";
import CodeComparison from "../../components/public/CodeComparison";
import HtmlCssPlayground from "../../components/public/HtmlCssPlayground";
import ConnectOneToOneModal from "../../components/public/ConnectOneToOneModal";
import AICodingTutorChat from "../../components/public/AICodingTutorChat";
import AISessionPlayer from "../../components/public/AISessionPlayer";
import { LiveCodeEditor } from "../../components/public/LiveCodeEditor";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CssSandbox from "../../components/public/CssSandbox";

function progressKey(courseId, day) {
  return `asio:path:${courseId}:day:${day}:progress`;
}

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function loadDayProgress(courseId, day) {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(progressKey(courseId, day));
  if (!raw) return null;
  return safeJsonParse(raw, null);
}

function saveDayProgress(courseId, day, progress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    progressKey(courseId, day),
    JSON.stringify(progress)
  );
}

function slugifyId(input) {
  const s = String(input ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || "item";
}

function getMasteryChecklistItems(dayObj) {
  // Preferred: author-provided checklist
  const raw = dayObj?.masteryChecklist;
  if (Array.isArray(raw) && raw.length > 0) {
    return raw
      .map((it, idx) => {
        if (typeof it === "string") {
          return { id: `m-${idx}-${slugifyId(it).slice(0, 24)}`, text: it };
        }
        const text = it?.text ?? it?.label ?? "";
        if (!text) return null;
        const id = it?.id
          ? String(it.id)
          : `m-${idx}-${slugifyId(text).slice(0, 24)}`;
        return { id, text };
      })
      .filter(Boolean);
  }

  // Fallback: derive from recap.takeaways
  const takeaways = dayObj?.recap?.takeaways;
  if (Array.isArray(takeaways) && takeaways.length > 0) {
    return takeaways
      .slice(0, 5)
      .map((t, idx) => ({
        id: `auto-${idx}-${slugifyId(t).slice(0, 24)}`,
        text: String(t),
      }));
  }

  return [];
}

function stripHtml(html) {
  const s = String(html || "");
  return s
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildAiContext({
  courseTitle,
  courseId,
  day,
  lessonTitle,
  activeContent,
}) {
  const parts = [];
  parts.push(`Course: ${courseTitle || courseId}`);
  parts.push(`Day ${day}: ${lessonTitle}`);
  if (activeContent?.intro) parts.push(`Intro: ${String(activeContent.intro)}`);

  const recap = activeContent?.recap;
  if (recap?.takeaways?.length)
    parts.push(`Key takeaways: ${recap.takeaways.slice(0, 6).join(" | ")}`);
  if (recap?.commonMistakes?.length)
    parts.push(
      `Common mistakes: ${recap.commonMistakes.slice(0, 6).join(" | ")}`
    );
  if (recap?.nextActions?.length)
    parts.push(`Next actions: ${recap.nextActions.slice(0, 6).join(" | ")}`);

  const checkpoints = Array.isArray(activeContent?.checkpoints)
    ? activeContent.checkpoints
    : [];
  if (checkpoints.length)
    parts.push(
      `Checkpoints: ${checkpoints
        .slice(0, 4)
        .map((c) => c?.prompt)
        .filter(Boolean)
        .join(" | ")}`
    );

  // Keep a small excerpt of lesson body (HTML stripped)
  const body = stripHtml(activeContent?.content || "");
  if (body) parts.push(`Lesson excerpt: ${body.slice(0, 900)}`);

  return parts.join("\n");
}

function MasteryChecklist({ items = [], progress, onProgress }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const doneCount = items.reduce(
    (acc, it) => acc + (progress?.masteryChecklist?.[it.id] ? 1 : 0),
    0
  );

  return (
    <div className="mb-12 border-t border-gray-200 dark:border-dark-700 pt-8">
      <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-6 flex items-center gap-2">
        <CheckCircle className="text-green-400" size={20} />
        End-of-day mastery checklist
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-dark-800 text-gray-500 dark:text-light-400">
          {doneCount}/{items.length}
        </span>
      </h3>
      <div className="grid sm:grid-cols-1 gap-3">
        {items.map((it) => {
          const checked = !!progress?.masteryChecklist?.[it.id];
          return (
            <label
              key={it.id}
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${checked
                ? "bg-green-500/5 border-green-500/20"
                : "bg-white dark:bg-dark-800 border-gray-200 dark:border-dark-700 hover:border-brand-primary/30"
                }`}
            >
              <div
                className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked
                  ? "bg-green-500 border-green-500 text-dark-900"
                  : "border-gray-300 dark:border-dark-500 bg-transparent"
                  }`}
              >
                {checked && <Check size={12} strokeWidth={4} />}
              </div>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => {
                  onProgress?.({
                    type: "mastery_toggle",
                    itemId: it.id,
                    value: e.target.checked,
                  });
                }}
                className="hidden"
              />
              <span
                className={`text-sm font-medium ${checked
                  ? "text-dark-900/60 dark:text-light-400 line-through"
                  : "text-dark-900 dark:text-light-200"
                  }`}
              >
                {it.text}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

// Helper to inject Syntax Highlighting & Copy Buttons
function ProseCopyEnhancer({ htmlContent }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const pres = containerRef.current.querySelectorAll("pre");

    pres.forEach((pre) => {
      // A. Apply Syntax Highlighting (Safe Tokenizer)
      // We strip existing HTML/Attributes and rebuild safely
      if (!pre.getAttribute("data-highlighted")) {
        pre.classList.add(
          "relative",
          "group",
          "font-mono",
          "text-sm",
          "text-gray-800",
          "dark:text-gray-300",
          "overflow-x-auto",
          "leading-relaxed"
        );

        const text = pre.innerText;
        const tokens = [];
        const save = (content, className) => {
          const id = `__TOKEN_${tokens.length}__`;
          tokens.push({ id, content, className });
          return id;
        };

        // Pipeline: Strings -> Comments -> Decorators -> Keywords -> etc.
        // Order matters to prevent matching inside strings/comments
        let processed = text
          // 1. Strings
          .replace(/('.*?'|".*?"|`.*?`)/g, (m) =>
            save(m, "text-green-600 dark:text-green-400")
          )

          // 2. Comments
          .replace(/(\/\/.*$|#.*$)/gm, (m) =>
            save(m, "text-gray-500 dark:text-gray-500 italic")
          )

          // 3. Decorators
          .replace(/(@\w+)/g, (m) =>
            save(m, "text-yellow-600 dark:text-yellow-400 font-bold")
          )

          // 4. Keywords
          .replace(
            /\b(const|let|var|function|class|import|export|from|return|if|else|this|new|constructor|true|false|null|undefined|async|await)\b/g,
            (m) => save(m, "text-purple-600 dark:text-purple-400 font-bold")
          )

          // 5. Types
          .replace(/\b(string|number|boolean|any|void)\b/g, (m) =>
            save(m, "text-blue-600 dark:text-blue-400 italic")
          )

          // 6. Function calls
          .replace(/\b([a-zA-Z0-9_]+)(?=\()/g, (m) =>
            save(m, "text-blue-600 dark:text-blue-300")
          );

        // Escape HTML characters in the base text
        processed = processed
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

        // Restore tokens (escaping their content too)
        tokens.forEach((t) => {
          const safeContent = t.content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
          processed = processed.replace(
            t.id,
            `<span class="${t.className}">${safeContent}</span>`
          );
        });

        pre.innerHTML = processed;
        pre.setAttribute("data-highlighted", "true");
      }

      // B. Inject Copy Button
      if (pre.getAttribute("data-copy-enhanced")) return;
      pre.setAttribute("data-copy-enhanced", "true");

      const btn = document.createElement("button");
      btn.className =
        "absolute top-3 right-3 p-1.5 rounded-md bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-200 dark:border-gray-700 shadow-sm z-10 cursor-pointer";
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
      btn.setAttribute("aria-label", "Copy code");

      btn.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          // Copy raw text, not HTML
          const code = pre.innerText;
          await navigator.clipboard.writeText(code);

          // Feedback
          const originalIcon = btn.innerHTML;
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>`;
          setTimeout(() => {
            btn.innerHTML = originalIcon;
          }, 2000);
        } catch (err) {
          console.error("Failed to copy!", err);
        }
      };

      pre.appendChild(btn);
    });
  }, [htmlContent]);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

function LearningCheckpoints({
  courseId,
  day,
  checkpoints = [],
  progress,
  onProgress,
}) {
  const [answers, setAnswers] = useState({});

  if (!Array.isArray(checkpoints) || checkpoints.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
        <HelpCircle className="text-yellow-400" />
        Checkpoints: Prove You Understand
      </h3>

      <div className="space-y-4">
        {checkpoints.map((c, idx) => {
          const selected = answers[idx];
          const isAnswered = selected !== undefined;
          const isCorrect = isAnswered && selected === c.correctIndex;

          return (
            <div
              key={idx}
              className="border border-dark-700/10 dark:border-dark-600 rounded-xl overflow-hidden bg-white/70 dark:bg-dark-800 backdrop-blur-lg"
            >
              <div className="p-5 border-b border-dark-700/10 dark:border-dark-700">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-bold text-dark-900 dark:text-light-100">
                    {idx + 1}. {c.prompt}
                  </p>
                  {isAnswered && (
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full border ${isCorrect
                        ? "text-green-300 bg-green-500/10 border-green-500/30"
                        : "text-red-300 bg-red-500/10 border-red-500/30"
                        }`}
                    >
                      {isCorrect ? "Correct" : "Not quite"}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  {(c.options || []).map((opt, optIdx) => {
                    const picked = selected === optIdx;
                    const showCorrect = isAnswered && optIdx === c.correctIndex;
                    const showWrongPicked =
                      isAnswered && picked && optIdx !== c.correctIndex;

                    return (
                      <button
                        key={optIdx}
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [idx]: optIdx }))
                        }
                        onMouseUp={() => {
                          // Sticky mastery: once correct, it stays correct even if user clicks other options later.
                          const isNowCorrect = optIdx === c.correctIndex;
                          if (!courseId && courseId !== "") return;
                          if (typeof day !== "number") return;
                          if (!isNowCorrect) return;

                          onProgress?.({
                            type: "checkpoint_correct",
                            checkpointIndex: idx,
                          });
                        }}
                        className={`text-left w-full p-3 rounded-xl border transition ${picked
                          ? "border-brand-primary/60 bg-brand-primary/10"
                          : "border-dark-700/10 dark:border-dark-600 bg-white/70 dark:bg-dark-900/30 hover:bg-dark-900/5 dark:hover:bg-dark-700"
                          } ${showCorrect ? "ring-1 ring-green-500/40" : ""} ${showWrongPicked ? "ring-1 ring-red-500/40" : ""
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${showCorrect
                              ? "border-green-500/40 text-green-300 bg-green-500/10"
                              : showWrongPicked
                                ? "border-red-500/40 text-red-300 bg-red-500/10"
                                : "border-dark-700/10 dark:border-dark-600 text-dark-900/50 dark:text-light-400 bg-white/80 dark:bg-dark-800"
                              }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="text-dark-900/70 dark:text-light-200">
                            {opt}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div
                    className={`p-4 rounded-xl border ${isCorrect
                      ? "border-green-500/30 bg-green-500/5"
                      : "border-yellow-500/30 bg-yellow-500/5"
                      }`}
                  >
                    <p className="text-xs font-bold tracking-widest uppercase mb-2 text-dark-900/60 dark:text-light-300">
                      Explanation
                    </p>
                    <p className="text-dark-900/70 dark:text-light-200 leading-relaxed">
                      {c.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GuidedLab({ steps = [], onLoad }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = Array.isArray(steps) ? steps[activeIdx] : null;

  useEffect(() => {
    setActiveIdx(0);
  }, [steps]);

  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
        <PlayCircle className="text-green-400" />
        Guided Lab: Bug → Observe → Fix (Like a Human Teacher)
      </h3>
      <p className="text-sm text-dark-900/60 dark:text-light-400 mb-6">
        This is optional, but it’s the fastest path. Load the buggy step,
        predict what happens, run it, then load the fix and explain why it
        works.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <div className="bg-white/70 dark:bg-dark-800 border border-dark-700/10 dark:border-dark-700 rounded-2xl p-4 backdrop-blur-lg">
            <p className="text-xs font-bold tracking-widest uppercase text-dark-900/60 dark:text-light-400 mb-3">
              Steps
            </p>
            <div className="space-y-2">
              {steps.map((s, i) => (
                <button
                  key={s.id || i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full text-left p-3 rounded-xl border transition ${i === activeIdx
                    ? "border-green-500/40 bg-green-500/10"
                    : "border-dark-700/10 dark:border-dark-700 bg-white/70 dark:bg-dark-900/20 hover:bg-dark-900/5 dark:hover:bg-dark-700"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${i === activeIdx
                        ? "border-green-500/40 text-green-300 bg-green-500/10"
                        : "border-dark-700/10 dark:border-dark-600 text-dark-900/50 dark:text-light-400 bg-white/80 dark:bg-dark-800"
                        }`}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-dark-900 dark:text-light-100 truncate">
                        {s.title}
                      </p>
                      {s.subtitle && (
                        <p className="text-xs text-dark-900/60 dark:text-light-400 mt-1 truncate">
                          {s.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white/70 dark:bg-dark-800 border border-dark-700/10 dark:border-dark-700 rounded-2xl p-6 backdrop-blur-lg">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-green-300 mb-2">
                  Step {activeIdx + 1} / {steps.length}
                </p>
                <h4 className="text-xl font-bold text-dark-900 dark:text-white">
                  {active?.title}
                </h4>
                {active?.subtitle && (
                  <p className="text-sm text-dark-900/60 dark:text-light-400 mt-2">
                    {active.subtitle}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                  disabled={activeIdx === 0}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border ${activeIdx === 0
                    ? "opacity-50 cursor-not-allowed bg-dark-900/5 dark:bg-dark-700 border-dark-700/10 dark:border-dark-600 text-dark-900/50 dark:text-light-400"
                    : "bg-dark-900/5 dark:bg-dark-700 hover:bg-dark-900/10 dark:hover:bg-dark-600 border-dark-700/10 dark:border-dark-600 text-dark-900/70 dark:text-light-200"
                    }`}
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setActiveIdx((i) => Math.min(steps.length - 1, i + 1))
                  }
                  disabled={activeIdx === steps.length - 1}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border ${activeIdx === steps.length - 1
                    ? "opacity-50 cursor-not-allowed bg-dark-700 border-dark-600 text-light-400"
                    : "bg-dark-700 hover:bg-dark-600 border-dark-600 text-light-200"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>

            {active?.teacherNote && (
              <div className="mb-5 p-4 rounded-xl border border-blue-500/30 bg-blue-500/5">
                <p className="text-xs font-bold tracking-widest uppercase text-blue-700 dark:text-blue-300 mb-2">
                  Teacher Note
                </p>
                <p className="text-gray-700 dark:text-light-200 leading-relaxed">
                  {active.teacherNote}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-3 mb-5">
              <button
                onClick={() =>
                  onLoad?.({
                    stepId: active?.id,
                    kind: "bug",
                    code: active?.bugCode || "",
                    focus: active?.bugFocus,
                    label: "Buggy Version",
                  })
                }
                className="p-4 rounded-2xl border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 transition"
              >
                <p className="text-xs font-bold tracking-widest uppercase text-red-700 dark:text-red-300 mb-2">
                  Load Bug
                </p>
                <p className="text-gray-700 dark:text-light-200 text-sm leading-relaxed">
                  Run it and observe the wrong output / crash.
                </p>
              </button>
              <button
                onClick={() =>
                  onLoad?.({
                    stepId: active?.id,
                    kind: "fix",
                    code: active?.fixCode || "",
                    focus: active?.fixFocus,
                    label: "Fixed Version",
                  })
                }
                className="p-4 rounded-2xl border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition"
              >
                <p className="text-xs font-bold tracking-widest uppercase text-green-700 dark:text-green-300 mb-2">
                  Load Fix
                </p>
                <p className="text-gray-700 dark:text-light-200 text-sm leading-relaxed">
                  Compare the change, then run again.
                </p>
              </button>
            </div>

            {active?.whatToNotice && (
              <div className="p-4 rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-100 dark:bg-dark-900/30">
                <p className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-light-400 mb-2">
                  What to notice
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-light-200">
                  {active.whatToNotice.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonRecap({ recap }) {
  if (!recap) return null;
  const takeaways = Array.isArray(recap.takeaways) ? recap.takeaways : [];
  const mistakes = Array.isArray(recap.commonMistakes)
    ? recap.commonMistakes
    : [];
  const next = Array.isArray(recap.nextActions) ? recap.nextActions : [];

  if (takeaways.length === 0 && mistakes.length === 0 && next.length === 0)
    return null;

  return (
    <div className="mt-10">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-800 rounded-2xl p-1 border border-brand-primary/25 shadow-lg">
        <div className="bg-white dark:bg-dark-800 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <CheckCircle className="text-brand-primary" />
            Mini Recap (Teacher Summary)
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {takeaways.length > 0 && (
              <div className="lg:col-span-6 bg-gray-50 dark:bg-dark-900/30 border border-gray-200 dark:border-dark-600 rounded-2xl p-6">
                <p className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-light-400 mb-3">
                  Key takeaways
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-light-200">
                  {takeaways.slice(0, 8).map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {mistakes.length > 0 && (
              <div className="lg:col-span-6 bg-gray-50 dark:bg-dark-900/30 border border-gray-200 dark:border-dark-600 rounded-2xl p-6">
                <p className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-light-400 mb-3">
                  Common mistakes
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-light-200">
                  {mistakes.slice(0, 8).map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {next.length > 0 && (
              <div className="lg:col-span-12 bg-gray-50 dark:bg-dark-900/30 border border-gray-200 dark:border-dark-600 rounded-2xl p-6">
                <p className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-light-400 mb-3">
                  Next actions (10 minutes)
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-light-200">
                  {next.slice(0, 8).map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AngularSandpack({ initialCode, title }) {
  // Extract selector and class name
  const selectorMatch = initialCode.match(/selector:\s*['"]([^'"]+)['"]/);
  const selector = selectorMatch ? selectorMatch[1] : "app-playground";

  const classNameMatch = initialCode.match(/export class (\w+)/);
  const className = classNameMatch ? classNameMatch[1] : "PlaygroundComponent";

  // Auto-fix missing imports
  let correctedCode = initialCode;
  const primitives = [
    "effect",
    "signal",
    "computed",
    "inject",
    "input",
    "output",
    "viewChild",
    "contentChild",
  ];

  if (!correctedCode.includes("@angular/core")) {
    correctedCode =
      "import { Component } from '@angular/core';\n" + correctedCode;
  }

  primitives.forEach((prim) => {
    const isImported = new RegExp(
      `import\\s*{[^}]*\\b${prim}\\b[^}]*}\\s*from\\s*['"]@angular/core['"]`
    ).test(correctedCode);
    const isUsed = correctedCode.includes(`${prim}(`);

    if (isUsed && !isImported) {
      correctedCode = correctedCode.replace(
        /import\s*{([^}]*)}\s*from\s*['"]@angular\/core['"]/,
        (match, existingImports) => {
          return `import { ${existingImports}, ${prim} } from '@angular/core'`;
        }
      );
    }
  });

  const files = {
    "src/polyfills.ts": {
      code: `import 'zone.js';`,
    },
    "src/main.ts": {
      code: `import './polyfills';
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { ${className} } from './app/app.component';

bootstrapApplication(${className})
  .then(ref => {
    // Ensure the component is attached
    if (!document.querySelector('${selector}')) {
        console.error('Bootstrap success but selector "${selector}" not found.');
    }
  })
  .catch((err) => {
    console.error(err);
    document.body.innerHTML = \`<div style="color: red; padding: 20px; background: #2d1f1f;">
        <h3>Bootstrap Error</h3>
        <pre>\${err.message}\\n\${err.stack}</pre>
    </div>\`;
  });`,
    },
    "src/app/app.component.ts": {
      code: correctedCode,
      active: true,
    },
    "src/index.html": {
      code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white p-4 font-sans antialiased">
  <${selector}>
    <div class="flex flex-col items-center justify-center h-full pt-20 space-y-4">
        <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-sm text-gray-400 font-mono animate-pulse">Initializing Angular...</p>
    </div>
  </${selector}>
</body>
</html>`,
    },
  };

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Code className="text-red-500" />
        {title || "Angular Playground"}
        <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-red-500/20 text-red-500 rounded-full border border-red-500/30">
          Real Runtime
        </span>
      </h3>
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-dark-600 shadow-2xl">
        <Sandpack
          template="angular"
          theme="dark"
          files={files}
          options={{
            showNavigator: false,
            showTabs: false,
            editorHeight: 500,
            showLineNumbers: true,
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
          customSetup={{
            dependencies: {
              "@angular/core": "^17.0.0",
              "@angular/common": "^17.0.0",
              "@angular/compiler": "^17.0.0",
              "@angular/forms": "^17.0.0",
              "@angular/platform-browser": "^17.0.0",
              "@angular/platform-browser-dynamic": "^17.0.0",
              rxjs: "~7.8.0",
              "zone.js": "~0.14.0",
            },
          }}
        />
      </div>
      <p className="mt-3 text-sm text-gray-500 dark:text-light-400 flex items-center gap-2">
        <span className="text-red-400">⚡</span>
        Running full Angular 17 runtime. Initial load may take a moment.
      </p>
    </div>
  );
}

// React Live Editor Component - Simple version
function ReactLiveEditor({ initialCode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(initialCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clean up any existing render calls
  let cleanCode = initialCode
    .replace(/ReactDOM\.createRoot.*render\(.*\);?/gs, "")
    .replace(/ReactDOM\.render\(.*\);?/gs, "")
    .replace(/render\s*\(\s*<App\s*\/>\s*\)\s*;?/g, "")
    .trim();

  // Check if code has multiple top-level declarations (needs noInline)
  // Count function/const declarations at start of lines
  const hasMultipleDeclarations =
    (cleanCode.match(/^(const |function |class )/gm) || []).length > 1;

  // If multiple declarations, add render() call for noInline mode
  if (hasMultipleDeclarations && !cleanCode.includes("render(")) {
    cleanCode = cleanCode + "\n\nrender(<App />);";
  }

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Code className="text-blue-400" />
        Live Lab: Try It Yourself
        <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
          React
        </span>
      </h3>
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-dark-600 shadow-2xl">
        <LiveProvider
          code={cleanCode}
          noInline={hasMultipleDeclarations}
          scope={{ React }}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
            <span className="text-xs font-mono text-gray-500 dark:text-light-400">
              App.jsx
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-light-300 hover:text-gray-900 dark:hover:text-white bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 rounded-lg transition-colors"
            >
              {copied ? (
                <Check size={14} className="text-green-400" />
              ) : (
                <Copy size={14} />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Code Editor */}
          <div className="bg-[#1a1a2e] text-sm font-mono">
            <LiveEditor
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "14px",
                padding: "16px",
                minHeight: "200px",
                backgroundColor: "#1a1a2e",
              }}
            />
          </div>

          {/* Error Display */}
          <LiveError
            style={{
              padding: "12px 16px",
              backgroundColor: "#2d1f1f",
              color: "#ff6b6b",
              fontFamily: "monospace",
              fontSize: "13px",
              borderTop: "1px solid #4a3333",
            }}
          />

          {/* Live Preview */}
          <div className="bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-600">
            <div className="px-4 py-2 text-xs font-mono text-gray-600 dark:text-light-300 border-b border-gray-200 dark:border-dark-700 flex items-center gap-2 bg-gray-100 dark:bg-dark-800">
              <span className="text-blue-400">●</span> Live Preview
            </div>
            <div className="p-4 min-h-[120px] bg-white text-gray-900">
              <LivePreview />
            </div>
          </div>
        </LiveProvider>
      </div>
      <p className="mt-3 text-sm text-gray-500 dark:text-light-400 flex items-center gap-2">
        <span className="text-blue-400">⚡</span>
        Edit the code above - changes appear instantly!
      </p>
    </div>
  );
}

export default function LearningPathPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const courseId = params.courseId;
  const course = COURSES[courseId];
  const courseOptions = Object.entries(COURSES || {}).map(([id, c]) => ({
    id,
    title: c?.title ? String(c.title) : id,
  }));

  const initialDay =
    courseId && COURSES[courseId]?.days?.length
      ? COURSES[courseId].days[0].day
      : 0;

  const [activeDay, setActiveDay] = useState(() => {
    const paramDay = searchParams.get("day");
    if (paramDay) {
      const num = Number(paramDay);
      if (!isNaN(num)) return num;
    }
    return initialDay;
  });
  const [completedDays, setCompletedDays] = useState([]);
  const [serverCompleted, setServerCompleted] = useState([]);
  const liveLabEditorRef = useRef(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/user/progress")
        .then((res) => res.json())
        .then((data) => {
          if (data.completedTutorials) {
            setServerCompleted(data.completedTutorials);
          }
        })
        .catch((err) => console.error("Failed to fetch progress:", err));
    }
  }, [session]);
  const guidedLabEditorRef = useRef(null);
  const [progressByDay, setProgressByDay] = useState({});
  const [isDesktop, setIsDesktop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const lessonTopRef = useRef(null);
  const didScrollOnMountRef = useRef(false);

  const isPro = session?.user?.plan?.includes('pro') || session?.user?.role === 'admin' || session?.user?.role === 'pro';
  // First 3 days (1, 2, 3) are free. Day 4+ is locked.
  const isLocked = !isPro && activeDay > 3;

  // If user navigates between courses, reset to the first available day for that course.
  useEffect(() => {
    setActiveDay(initialDay);
  }, [initialDay]);

  // Load progress for this course from localStorage
  useEffect(() => {
    if (!courseId || !course?.days?.length) return;
    const next = {};
    for (const d of course.days) {
      next[d.day] = loadDayProgress(courseId, d.day) || {
        checkpointsCorrect: {},
        lab: {},
        masteryChecklist: {},
      };
    }
    setProgressByDay(next);
  }, [courseId, course?.days?.length]);

  // Sync activeDay with URL searchParams (handles client-side navigation)
  useEffect(() => {
    const paramDay = searchParams.get("day");
    if (paramDay) {
      const num = Number(paramDay);
      if (!isNaN(num) && num !== activeDay) {
        setActiveDay(num);
        // Also ensure we scroll to top if needed
        if (!didScrollOnMountRef.current) {
          didScrollOnMountRef.current = true;
        }
      }
    }
  }, [searchParams, activeDay]);

  // Auto-Resume / Smart Deep Link (Fallback if no query param)
  // If we haven't auto-resumed yet and no param provided, pick the first incomplete day.
  useEffect(() => {
    if (!courseId || !course?.days?.length) return;
    if (!didScrollOnMountRef.current && !searchParams.get("day")) {
      // Find first incomplete day logic...
      const firstIncomplete = course.days.find((d) => {
        const p = progressByDay?.[d.day]; // Use progressByDay from state
        if (!p) return true;
        // ... (mastery logic)
        const checkpoints = Array.isArray(d.checkpoints) ? d.checkpoints : [];
        const needsCheckpoints = checkpoints.length > 0;
        const checkpointsOk = !needsCheckpoints
          ? true
          : checkpoints.every((_, idx) => p.checkpointsCorrect?.[idx] === true);

        const steps = Array.isArray(d.labSteps) ? d.labSteps : [];
        const needsLabs = steps.length > 0;
        const labsOk = !needsLabs
          ? true
          : steps.every(
            (s) => p.lab?.[s.id]?.bug === true && p.lab?.[s.id]?.fix === true
          );

        return !(checkpointsOk && labsOk);
      });

      if (firstIncomplete) {
        setActiveDay(firstIncomplete.day);
      }
      didScrollOnMountRef.current = true;
    }
  }, [courseId, course?.days?.length, searchParams, progressByDay]); // Add progressByDay to dependencies

  const activeContent =
    course?.days?.find((d) => d.day === activeDay) || course?.days?.[0] || {};
  const aiContextTitle = `${course?.title || courseId} — Day ${activeDay}: ${activeContent?.title || ""
    }`;
  const aiContextText = buildAiContext({
    courseTitle: course?.title,
    courseId,
    day: activeDay,
    lessonTitle: activeContent?.title,
    activeContent,
  });

  const isDayMastered = (dayNumber) => {
    const dayObj = course?.days?.find((d) => d.day === dayNumber);
    if (!dayObj) return false;
    const p = progressByDay?.[dayNumber] || {
      checkpointsCorrect: {},
      lab: {},
      masteryChecklist: {},
    };

    const checkpoints = Array.isArray(dayObj.checkpoints)
      ? dayObj.checkpoints
      : [];
    const needsCheckpoints = checkpoints.length > 0;
    const checkpointsOk = !needsCheckpoints
      ? true
      : checkpoints.every((_, idx) => p.checkpointsCorrect?.[idx] === true);

    const steps = Array.isArray(dayObj.labSteps) ? dayObj.labSteps : [];
    const needsLabs = steps.length > 0;
    const labsOk = !needsLabs
      ? true
      : steps.every(
        (s) => p.lab?.[s.id]?.bug === true && p.lab?.[s.id]?.fix === true
      );

    return checkpointsOk && labsOk;
  };

  const handleSelectDay = (dayNumber) => {
    setActiveDay(dayNumber);
    const search = new URLSearchParams(searchParams);
    search.set("day", dayNumber);
    router.push(`/path/${courseId}?${search.toString()}`, { scroll: false });
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "auto" });
  };

  const updateProgress = (dayNumber, updater) => {
    setProgressByDay((prev) => {
      const current = prev?.[dayNumber] || {
        checkpointsCorrect: {},
        lab: {},
        masteryChecklist: {},
      };
      const nextForDay = updater(current);
      const next = { ...prev, [dayNumber]: nextForDay };
      saveDayProgress(courseId, dayNumber, nextForDay);
      return next;
    });
  };

  const activeProgress = progressByDay?.[activeDay] || {
    checkpointsCorrect: {},
    lab: {},
    masteryChecklist: {},
  };
  const activeCheckpoints = Array.isArray(activeContent.checkpoints)
    ? activeContent.checkpoints
    : [];
  const activeLabSteps = Array.isArray(activeContent.labSteps)
    ? activeContent.labSteps
    : [];
  const activeMasteryItems = getMasteryChecklistItems(activeContent);
  const activeMasteryDoneCount = activeMasteryItems.reduce(
    (acc, it) => acc + (activeProgress.masteryChecklist?.[it.id] ? 1 : 0),
    0
  );
  const activeCheckpointsCorrectCount = activeCheckpoints.reduce(
    (acc, _, idx) => acc + (activeProgress.checkpointsCorrect?.[idx] ? 1 : 0),
    0
  );
  const activeLabCompletedCount = activeLabSteps.reduce((acc, s) => {
    const st = activeProgress.lab?.[s.id];
    return acc + (st?.bug && st?.fix ? 1 : 0);
  }, 0);

  const maxDayNumber =
    Array.isArray(course?.days) && course.days.length
      ? Math.max(...course.days.map((d) => Number(d?.day ?? 0)))
      : 0;

  const jsBonusStartDay = courseId === "javascript" ? 34 : null;
  const jsHasBonusDays =
    jsBonusStartDay != null && Array.isArray(course?.days)
      ? course.days.some((d) => Number(d?.day ?? 0) >= jsBonusStartDay)
      : false;
  const jsBonusStartIndex = jsHasBonusDays
    ? course.days.findIndex((d) => Number(d?.day ?? 0) >= jsBonusStartDay)
    : -1;

  // Reset the guided sandbox when changing lessons
  useEffect(() => {
    const placeholder = `// Guided Lab Sandbox\n// Use "Load Bug" / "Load Fix" above to load code here.\nconsole.clear();\n`;
    guidedLabEditorRef.current?.loadStep({
      code: placeholder,
      // focus: Removed to prevent auto-scroll to bottom
      label: "Guided Lab Sandbox",
      animate: false,
    });
  }, [courseId, activeDay]);

  // Allow opening the connect modal
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      setConnectOpen(true);
      lessonTopRef.current?.scrollIntoView?.({
        behavior: "smooth",
        block: "start",
      });
    };
    window.addEventListener("open-connect-modal", handler);
    return () => window.removeEventListener("open-connect-modal", handler);
  }, []);

  // Always Scroll to top on mount and day change
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Force top position instantly
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [courseId, activeDay]);

  if (!course)
    return (
      <div className="text-dark-900 dark:text-white p-10">Course not found</div>
    );

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] text-dark-900 dark:text-light-100 font-sans selection:bg-brand-primary/20 relative overflow-hidden">
      {/* Premium Rich Background (Soft 'Aurora' Glows) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/5 dark:bg-blue-900/10 blur-[120px]" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/5 dark:bg-brand-primary/5 blur-[120px]" />
      </div>

      {/* Top Navigation Bar (Floating/Glass) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${didScrollOnMountRef.current
          ? "bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="w-full px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/"
              className="opacity-80 hover:opacity-100 transition-opacity shrink-0"
            >
              <Logo small />
            </Link>
            <div className="w-px h-6 bg-gray-200 dark:bg-white/10 hidden sm:block" />

            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-transparent hover:scale-105 transition-all shadow-lg hover:shadow-xl group"
              aria-label="Open Curriculum"
            >
              <Menu size={16} className="text-white dark:text-slate-900" />
              <span className="hidden sm:inline text-xs font-black uppercase tracking-widest text-white dark:text-slate-900">
                Curriculum
              </span>
            </button>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-widest uppercase text-brand-primary">
                Day {activeDay}
              </span>
              <h1 className="text-sm md:text-base font-bold text-dark-900 dark:text-white truncate max-w-[200px] md:max-w-md hidden sm:block">
                {activeContent.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-dark-500 hover:text-dark-900 dark:text-light-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeftRight size={14} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            <div className="hidden sm:block">
              <ThemeSwitcher />
            </div>

            <CompleteButton
              variant="compact"
              postId={`${courseId}-day-${activeDay}`}
              initialCompleted={serverCompleted.includes(
                `${courseId}-day-${activeDay}`
              )}
            />

            {/* Top Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-8 h-8 rounded-full bg-brand-primary text-dark-900 font-bold flex items-center justify-center border border-dark-900/10 dark:border-white/10"
              >
                {session?.user?.name?.charAt(0).toUpperCase() || (
                  <User size={16} />
                )}
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-dark-800 shadow-2xl ring-1 ring-black/5 focus:outline-none border border-gray-100 dark:border-dark-700 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-dark-700">
                      <p className="text-xs text-gray-500 dark:text-light-300">
                        Signed in as
                      </p>
                      <p className="text-sm font-medium text-dark-900 dark:text-white truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-light-200 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                      >
                        <LayoutDashboard
                          size={16}
                          className="mr-3 text-brand-primary"
                        />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex w-full items-center px-4 py-3 text-sm text-gray-700 dark:text-light-200 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-left"
                      >
                        <LogOut size={16} className="mr-3 text-red-400" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Drawer (Sliding Overlay) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-[400px] bg-white dark:bg-[#0F0F12] z-50 shadow-2xl border-r border-gray-200 dark:border-white/5 flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                <h2 className="font-bold text-lg text-dark-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="text-brand-primary" size={20} />{" "}
                  Curriculum
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
                {course.days.map((day, idx) => {
                  const isActive = activeDay === day.day;
                  const isCompleted = serverCompleted.includes(
                    `${courseId}-day-${day.day}`
                  );

                  return (
                    <button
                      key={day.day}
                      onClick={() => {
                        handleSelectDay(day.day);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-start text-left p-4 rounded-xl transition-all group border ${isActive
                        ? "bg-brand-primary/10 dark:bg-brand-primary/5 border-brand-primary/20"
                        : "border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                    >
                      <div
                        className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${isActive
                          ? "bg-brand-primary text-dark-900 shadow-sm"
                          : isCompleted
                            ? "bg-green-500/20 text-green-500"
                            : "bg-gray-200 dark:bg-dark-700 text-dark-400"
                          }`}
                      >
                        {!isPro && day.day > 3 ? (
                          <Lock size={12} className="text-gray-400" />
                        ) : isCompleted && !isActive ? (
                          <Check size={12} strokeWidth={3} />
                        ) : (
                          day.day
                        )}
                      </div>
                      <div className="ml-4 min-w-0">
                        <p
                          className={`text-sm font-bold ${isActive
                            ? "text-dark-900 dark:text-white"
                            : "text-gray-600 dark:text-light-400 group-hover:text-dark-900 dark:group-hover:text-light-200"
                            }`}
                        >
                          {day.title}
                        </p>
                        {day.subtitle && (
                          <p className="text-xs opacity-60 truncate mt-1">
                            {day.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#13141B]">
                <div className="flex items-center gap-3">
                  <div className="w-full bg-gray-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-primary h-full rounded-full"
                      style={{
                        width: `${(serverCompleted.length / course.days.length) * 100
                          }%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap">
                    {Math.round(
                      (serverCompleted.length / course.days.length) * 100
                    )}
                    % Complete
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area - Cinematic Single Column */}
      <div className="relative z-10 flex-1 w-full min-h-screen pt-24 pb-32">
        <div ref={lessonTopRef} className="scroll-mt-32" />
        <UpgradeToProModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />

        {isLocked ? (
          <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-8 animate-pulse">
              <Lock size={48} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-dark-900 dark:text-white mb-6">
              Pro Content Locked
            </h2>
            <p className="text-xl text-gray-600 dark:text-light-300 max-w-2xl mb-10 leading-relaxed">
              This advanced lesson (Day {activeDay}) is available exclusively to Pro members.
              Upgrade to unlock the full curriculum, AI interviews, and more.
            </p>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg rounded-full shadow-xl shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
            >
              Unlock Pro Access
            </button>
          </div>
        ) : (
          <>
            <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24">
              {/* Hero Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white/5 backdrop-blur-sm mb-6"
                >
                  <span className="text-brand-primary font-bold text-xs uppercase tracking-widest">
                    Day {activeDay}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-light-600" />
                  <span className="text-gray-500 dark:text-light-400 text-xs font-bold uppercase tracking-widest">
                    {activeContent.duration || "20 min"}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-dark-900 dark:text-white tracking-tight leading-[1.1] mb-8"
                >
                  {activeContent.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-gray-600 dark:text-light-300 leading-relaxed max-w-3xl mx-auto font-medium"
                  dangerouslySetInnerHTML={{ __html: activeContent.intro }}
                />
              </div>

              {/* AI Tutor Session */}
              {activeContent.aiSession && activeContent.aiSession.enabled && (
                <div className="mb-20">
                  <AISessionPlayer
                    key={activeDay}
                    session={activeContent.aiSession}
                    onComplete={() => {
                      updateProgress(activeDay, (p) => ({
                        ...p,
                        aiSessionCompleted: true,
                      }));
                    }}
                  />
                </div>
              )}

              {/* Progress Stats Bar */}
              {(activeCheckpoints.length > 0 || activeLabSteps.length > 0) && (
                <div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-12 opacity-80">
                  {activeCheckpoints.length > 0 && (
                    <div className="flex items-center gap-2 text-sm font-bold text-dark-600 dark:text-light-300 bg-white dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
                      <HelpCircle size={16} className="text-yellow-400" />
                      <span>
                        {activeCheckpointsCorrectCount}/{activeCheckpoints.length}{" "}
                        Checkpoints
                      </span>
                    </div>
                  )}
                  {activeLabSteps.length > 0 && (
                    <div className="flex items-center gap-2 text-sm font-bold text-dark-600 dark:text-light-300 bg-white dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
                      <Code size={16} className="text-blue-400" />
                      <span>
                        {activeLabCompletedCount}/{activeLabSteps.length} Steps
                      </span>
                    </div>
                  )}
                  {activeMasteryItems.length > 0 && (
                    <div className="flex items-center gap-2 text-sm font-bold text-dark-600 dark:text-light-300 bg-white dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>
                        {activeMasteryDoneCount}/{activeMasteryItems.length}{" "}
                        Mastered
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Cinematic Video Player */}
              {activeContent.video && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-20 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-800 relative group"
                >
                  <div className="aspect-video relative">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${activeContent.video}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </motion.div>
              )}


              {/* Main Text Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-20 text-dark-900/80 dark:text-light-200 prose-headings:font-bold prose-p:leading-relaxed prose-pre:rounded-2xl prose-pre:shadow-xl prose-img:rounded-2xl prose-pre:bg-transparent prose-pre:min-w-0 prose-pre:text-gray-900 dark:prose-pre:text-gray-200">
                <ProseCopyEnhancer htmlContent={activeContent.content} />
              </div>

              {/* CSS Interactive Sandbox */}
              {activeContent.sandbox && (
                <CssSandbox
                  sandbox={activeContent.sandbox}
                  title={`${activeContent.title} - Live Example`}
                />
              )}

              {/* Property-by-Property Examples */}
              {activeContent.propertyExamples && activeContent.propertyExamples.length > 0 && (
                <div className="mb-20">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
                      Property Reference & Examples
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-light-300">
                      Visual examples for every property - see them in action!
                    </p>
                  </div>

                  <div className="space-y-16">
                    {activeContent.propertyExamples.map((example, index) => (
                      <div key={index} className="bg-white dark:bg-dark-800 rounded-3xl border border-gray-200 dark:border-dark-700 overflow-hidden shadow-lg">
                        {/* Property Header */}
                        <div className="bg-gradient-to-r from-brand-primary/10 to-purple-500/10 px-8 py-6 border-b border-gray-200 dark:border-dark-700">
                          <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
                            <code className="bg-dark-900/10 dark:bg-white/10 px-3 py-1 rounded-lg text-brand-primary">
                              {example.property}
                            </code>
                          </h3>
                          <p className="text-gray-600 dark:text-light-300 leading-relaxed">
                            {example.description}
                          </p>
                        </div>

                        {/* Property Example */}
                        <div className="p-8">
                          <CssSandbox
                            sandbox={{ html: example.html, css: example.css }}
                            title={example.property}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Modules Container */}
              <div className="space-y-20">
                {/* Comparison */}
                {activeContent.comparison && (
                  <section>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                        <Scale size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-dark-900 dark:text-white">
                          Zero to Architect: The Diff
                        </h3>
                        <p className="text-gray-500 text-sm">
                          See the evolution from junior to senior code.
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                      <CodeComparison
                        juniorCode={activeContent.comparison.junior}
                        seniorCode={activeContent.comparison.senior}
                      />
                    </div>
                  </section>
                )}

                {/* Checkpoints */}
                {activeContent.checkpoints && (
                  <LearningCheckpoints
                    courseId={courseId}
                    day={activeDay}
                    checkpoints={activeContent.checkpoints}
                    progress={activeProgress}
                    onProgress={(evt) => {
                      if (evt?.type === "checkpoint_correct") {
                        updateProgress(activeDay, (p) => ({
                          ...p,
                          checkpointsCorrect: {
                            ...(p.checkpointsCorrect || {}),
                            [evt.checkpointIndex]: true,
                          },
                        }));
                      }
                    }}
                  />
                )}

                {/* Labs */}
                {activeContent.labSteps && (
                  <section className="bg-dark-900/5 dark:bg-white/5 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/5">
                    <GuidedLab
                      steps={activeContent.labSteps}
                      onLoad={({ stepId, kind, code, focus, label }) => {
                        if (stepId && (kind === "bug" || kind === "fix")) {
                          updateProgress(activeDay, (p) => ({
                            ...p,
                            lab: {
                              ...(p.lab || {}),
                              [stepId]: {
                                ...(p.lab?.[stepId] || {}),
                                [kind]: true,
                              },
                            },
                          }));
                        }
                        guidedLabEditorRef.current?.loadStep({
                          code,
                          focus,
                          label,
                          animate: true,
                        });
                      }}
                    />
                    <div className="mt-8">
                      <LiveCodeEditor
                        ref={guidedLabEditorRef}
                        initialCode={`// Guided Lab Sandbox\n// Use "Load Bug" / "Load Fix" above to load code here.\nconsole.clear();\n`}
                        predictions={[]}
                        title="Guided Lab Sandbox"
                      />
                    </div>
                  </section>
                )}

                {/* Live Editor */}
                {activeContent?.sandbox?.html || activeContent?.sandbox?.css ? (
                  <HtmlCssPlayground
                    initialHtml={activeContent?.sandbox?.html || ""}
                    initialCss={activeContent?.sandbox?.css || ""}
                    title="HTML/CSS Lab"
                  />
                ) : (
                  activeContent.code &&
                  (courseId === "react" ? (
                    <ReactLiveEditor initialCode={activeContent.code} />
                  ) : courseId === "angular" ? (
                    <AngularSandpack
                      initialCode={activeContent.code}
                      title="Live Lab: Try It Yourself"
                    />
                  ) : (
                    <LiveCodeEditor
                      ref={liveLabEditorRef}
                      initialCode={activeContent.code}
                      predictions={activeContent.predictions}
                      title="Live Lab: Try It Yourself"
                      subtitle="Experiment with the concepts you just learned."
                    />
                  ))
                )}

                {/* Interview Prep */}
                {activeContent.interview && (
                  <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                        <Brain className="text-purple-400" size={32} />
                        Interview Prep
                      </h3>
                      <div className="space-y-4">
                        {activeContent.interview.questions.map((q, i) => (
                          <div
                            key={i}
                            className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
                          >
                            <details className="group">
                              <summary className="flex justify-between items-center p-5 cursor-pointer hover:bg-white/5 transition">
                                <span className="font-bold text-lg pr-4">
                                  Q{i + 1}: {q.q}
                                </span>
                                <ChevronRight className="group-open:rotate-90 transition-transform text-purple-400" />
                              </summary>
                              <div className="p-8 bg-black/40 border-t border-white/10 text-gray-300 leading-relaxed text-lg">
                                <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
                                  Target Answer
                                </div>
                                {q.a}
                              </div>
                            </details>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Recap */}
                {activeContent.recap && <LessonRecap recap={activeContent.recap} />}

                {/* Mastery */}
                <MasteryChecklist
                  items={activeMasteryItems}
                  progress={activeProgress}
                  onProgress={(evt) => {
                    if (evt?.type !== "mastery_toggle") return;
                    updateProgress(activeDay, (p) => ({
                      ...p,
                      masteryChecklist: {
                        ...(p.masteryChecklist || {}),
                        [evt.itemId]: !!evt.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>

            {/* Floating 'Dynamic Island' Tools */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/90 dark:bg-[#1A1A1E]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl rounded-full px-2 py-2 flex items-center gap-2">
              <button
                onClick={() => setConnectOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary text-dark-900 font-bold text-sm hover:scale-105 transition-transform"
              >
                <MonitorPlay size={16} /> 1:1 Help
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1" />

              <button
                onClick={() => setAiChatOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-dark-900 dark:text-light-200 font-bold text-sm transition-colors"
              >
                <Sparkles size={16} className="text-brand-primary" />
                AI Tutor
              </button>
            </div>

            {/* AI Tutor Modal */}
            <AnimatePresence>
              {aiChatOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setAiChatOpen(false)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.2,
                      y: 300,
                      borderRadius: "100%",
                    }}
                    animate={{ opacity: 1, scale: 1, y: 0, borderRadius: "24px" }}
                    exit={{ opacity: 0, scale: 0.2, y: 300, borderRadius: "100%" }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformOrigin: "bottom center" }}
                    className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl bg-white dark:bg-[#0A0A0C] shadow-2xl z-10 ring-1 ring-black/5 dark:ring-white/10"
                  >
                    {/* Decorative faint glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-brand-primary/10 blur-[80px] pointer-events-none z-0" />

                    {/* Scrollable Content Container */}
                    <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
                      <button
                        onClick={() => setAiChatOpen(false)}
                        className="absolute top-6 right-6 z-20 p-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white rounded-full backdrop-blur-md transition-colors border border-black/5 dark:border-white/10"
                      >
                        <X size={20} />
                      </button>
                      {/* Negative margin to counteract the component's built-in margin if necessary, or just a wrapper */}
                      <AICodingTutorChat
                        contextTitle={aiContextTitle}
                        contextText={aiContextText}
                      />
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Connect Modal */}
            <ConnectOneToOneModal
              open={connectOpen}
              onClose={() => setConnectOpen(false)}
              sessionUser={session?.user}
              courseId={courseId}
              courseTitle={course?.title}
              day={activeDay}
              lessonTitle={activeContent?.title}
            />
          </>
        )}
      </div>
    </div>
  );
}
