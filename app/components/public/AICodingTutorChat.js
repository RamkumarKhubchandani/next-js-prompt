"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, Loader2, Sparkles, StopCircle, Cpu } from "lucide-react";
import { motion } from "framer-motion";

function truncate(s, n) {
  const str = String(s || "");
  if (str.length <= n) return str;
  return str.slice(0, n - 1) + "…";
}

function safeNowId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function buildSystemPrompt({ contextTitle, contextText }) {
  // Hard guardrails: coding-only tutor, and always grounded in the current lesson context.
  const ctx = truncate(`${contextTitle ? `Lesson Context: ${contextTitle}\n` : ""}${contextText || ""}`, 6000);
  return `
You are an expert human coding tutor. You ONLY help with programming, software engineering, web development, debugging, and career-relevant coding guidance.

Rules:
- If the user asks non-coding questions (medical, legal, finance, relationships, etc.), refuse briefly and redirect to coding.
- Ask 1-3 clarifying questions when needed before answering.
- Prefer step-by-step reasoning and practical guidance.
- Provide code snippets when helpful, and explain them.
- When debugging, request the exact error message + relevant code + what they expected.
- Keep the tone supportive and teacher-like.

You MUST use the Lesson Context below to tailor your help to what the learner is studying today.
If the context is missing info, say what’s missing and ask for it. Do not hallucinate APIs.

=== Lesson Context ===
${ctx}
`;
}

function fallbackSearchAnswer({ question, contextText }) {
  const q = String(question || "").toLowerCase();
  const text = String(contextText || "");
  const lines = text.split("\n").map((x) => x.trim()).filter(Boolean);
  const terms = q.split(/\s+/).filter(Boolean).slice(0, 10);
  const hits = lines
    .map((line) => ({
      line,
      score: terms.reduce((acc, t) => acc + (line.toLowerCase().includes(t) ? 1 : 0), 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((x) => `- ${x.line}`);

  if (!hits.length) {
    return "I can’t run the free AI chat model on this device/browser (or it’s still loading). Paste your code/error and I’ll help based on the lesson context.";
  }
  return `I can’t run the free AI chat model right now, so here are the most relevant lesson snippets I found:\n\n${hits.join("\n")}\n\nPaste your code/error and I’ll guide you step-by-step.`;
}

export default function AICodingTutorChat({ contextTitle, contextText }) {
  const [messages, setMessages] = useState([
    {
      id: safeNowId(),
      role: "assistant",
      content:
        "Ask me anything about today’s lesson. I’ll behave like a human tutor (debugging steps, code examples, best practices).",
    },
  ]);
  const [input, setInput] = useState("");
  const [engineStatus, setEngineStatus] = useState("idle"); // idle | loading | ready | error
  const [engineError, setEngineError] = useState("");
  const [progressText, setProgressText] = useState("");
  const [progressPct, setProgressPct] = useState(null); // 0..100
  const [streaming, setStreaming] = useState(false);
  const [needsDownload, setNeedsDownload] = useState(false);
  const [cachedOnDevice, setCachedOnDevice] = useState(null); // true|false|null unknown
  const [pendingModelId, setPendingModelId] = useState(null);
  const [showCachedNotice, setShowCachedNotice] = useState(false);

  const engineRef = useRef(null);
  const abortRef = useRef(false);
  const scrollBoxRef = useRef(null);

  const systemPrompt = useMemo(
    () => buildSystemPrompt({ contextTitle, contextText }),
    [contextTitle, contextText]
  );

  // Prefer a coding model; fallback to a general instruct model if needed.
  const preferredModelIds = useMemo(
    () => [
      "Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC",
      "Qwen2.5-Coder-3B-Instruct-q4f16_1-MLC",
      "Qwen2.5-3B-Instruct-q4f16_1-MLC",
      "Phi-3.5-mini-instruct-q4f16_1-MLC",
      "Llama-3.2-3B-Instruct-q4f16_1-MLC",
      "Llama-3.2-1B-Instruct-q4f16_1-MLC",
    ],
    []
  );

  const [modelId, setModelId] = useState(preferredModelIds[0]);
  const [availableModels, setAvailableModels] = useState([]);

  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Auto-scroll ONLY the chat box, never the whole page.
  useEffect(() => {
    const el = scrollBoxRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const checkCached = async (webllm, id) => {
    try {
      const ok = await webllm.hasModelInCache(id, webllm.prebuiltAppConfig);
      setCachedOnDevice(ok);
      return ok;
    } catch {
      setCachedOnDevice(null);
      return null;
    }
  };

  const startDownloadAndLoad = async ({ webllm, id }) => {
    setNeedsDownload(false);
    setPendingModelId(null);
    setEngineStatus("loading");
    setEngineError("");
    setProgressPct(0);
    setProgressText("Downloading & preparing the AI model… (one-time on this device)");

    const onProgress = (report) => {
      const text =
        report?.text ||
        report?.status ||
        (report?.progress != null ? `Loading… ${(report.progress * 100).toFixed(0)}%` : "Loading…");
      setProgressText(text);
      if (typeof report?.progress === "number") {
        setProgressPct(Math.max(0, Math.min(100, report.progress * 100)));
      }
    };

    // If engine exists, reload; else create.
    const engine = engineRef.current;
    if (engine?.setInitProgressCallback) engine.setInitProgressCallback(onProgress);

    try {
      if (engine?.reload) {
        await engine.reload(id);
        engineRef.current = engine;
      } else {
        const created = await webllm.CreateMLCEngine(id, {
          initProgressCallback: onProgress,
        });
        engineRef.current = created;
      }

      setModelId(id);
      setEngineStatus("ready");
      setProgressText("");
      setProgressPct(null);
      setCachedOnDevice(true);
      setShowCachedNotice(true);
      setTimeout(() => setShowCachedNotice(false), 5000);
    } catch (e) {
      console.error("WebLLM load failed:", e);
      setEngineStatus("error");
      setEngineError(e?.message || String(e));
      setProgressPct(null);
    }
  };

  useEffect(() => {
    // Load model list + engine on mount.
    let cancelled = false;
    (async () => {
      try {
        // WebGPU required for true on-device chat LLM.
        const hasWebGPU = typeof navigator !== "undefined" && !!navigator.gpu;
        if (!hasWebGPU) {
          setEngineStatus("error");
          setEngineError("WebGPU is not available in this browser/device. Use Chrome/Edge (desktop) with WebGPU enabled.");
          return;
        }

        const webllm = await import("@mlc-ai/web-llm");
        const list = webllm?.prebuiltAppConfig?.model_list || [];
        if (!cancelled) setAvailableModels(list);

        // If our preferred model isn't available, auto-pick the first available.
        const modelIds = list.map((m) => m.model_id);
        const picked =
          preferredModelIds.find((id) => modelIds.includes(id)) || modelIds[0] || modelId;
        if (!cancelled) setModelId(picked);

        // Only auto-load if cached; otherwise ask the user before downloading a large model.
        const cached = await webllm.hasModelInCache(picked, webllm.prebuiltAppConfig).catch(() => null);
        if (cancelled) return;
        setCachedOnDevice(cached);
        if (cached) {
          await startDownloadAndLoad({ webllm, id: picked });
        } else {
          setEngineStatus("idle");
          setNeedsDownload(true);
          setPendingModelId(picked);
          setProgressText("");
          setProgressPct(null);
        }
      } catch (e) {
        console.error("WebLLM load failed:", e);
        if (!cancelled) {
          setEngineStatus("error");
          setEngineError(e?.message || String(e));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadModel = async (nextModelId) => {
    try {
      const hasWebGPU = typeof navigator !== "undefined" && !!navigator.gpu;
      if (!hasWebGPU) {
        setEngineStatus("error");
        setEngineError("WebGPU is not available in this browser/device.");
        return;
      }
      abortRef.current = false;

      const webllm = await import("@mlc-ai/web-llm");
      const cached = await checkCached(webllm, nextModelId);
      if (cached === false) {
        setEngineStatus("idle");
        setNeedsDownload(true);
        setPendingModelId(nextModelId);
        setProgressText("");
        setProgressPct(null);
        return;
      }

      await startDownloadAndLoad({ webllm, id: nextModelId });
    } catch (e) {
      console.error("Model reload failed:", e);
      setEngineStatus("error");
      setEngineError(e?.message || String(e));
    }
  };

  const stop = async () => {
    abortRef.current = true;
    try {
      await engineRef.current?.interruptGenerate?.();
    } catch {}
    setStreaming(false);
  };

  const buildHistory = () => {
    // Keep history small to avoid long prefill / context overflow on smaller models.
    const raw = (messagesRef.current || [])
      .filter((x) => x.role === "user" || x.role === "assistant")
      .slice(-8)
      .map((x) => ({
        role: x.role,
        content: truncate(String(x.content || ""), 1200),
      }));
    return raw;
  };

  const ask = async () => {
    const q = input.trim();
    if (!q || streaming) return;
    setInput("");
    abortRef.current = false;

    const userMsg = { id: safeNowId(), role: "user", content: q };
    setMessages((m) => [...m, userMsg]);

    // If engine not ready, fallback (never block the learner)
    if (engineStatus !== "ready" || !engineRef.current) {
      const fallback = fallbackSearchAnswer({ question: q, contextText });
      setMessages((m) => [...m, { id: safeNowId(), role: "assistant", content: fallback }]);
      return;
    }

    setStreaming(true);
    const assistantId = safeNowId();
    setMessages((m) => [...m, { id: assistantId, role: "assistant", content: "" }]);

    try {
      // Reset engine-side conversation so each request is self-contained.
      // We keep our own chat history and always send it explicitly.
      try {
        await engineRef.current?.resetChat?.(true);
      } catch {}

      const history = buildHistory();

      const request = {
        model: modelId,
        stream: true,
        messages: [
          { role: "system", content: systemPrompt },
          ...history,
          { role: "user", content: q },
        ],
        max_tokens: 700,
        temperature: 0.2,
        top_p: 0.95,
      };

      // Protect against rare hangs in `create()` (seen after several prompts).
      const createTimeoutMs = 25000;
      const iter = await Promise.race([
        engineRef.current.chat.completions.create(request),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timed out starting generation")), createTimeoutMs)
        ),
      ]);
      let acc = "";
      let gotAnyDelta = false;
      let lastDeltaAt = Date.now();

      // Watchdog: if no tokens arrive for too long, interrupt and fall back.
      const watchdog = setInterval(async () => {
        // streaming state is not reliable inside closures; use abortRef instead.
        if (abortRef.current) return;
        const idleMs = Date.now() - lastDeltaAt;
        if (gotAnyDelta && idleMs < 15000) return;
        if (!gotAnyDelta && idleMs < 20000) return; // allow a bit longer for first token

        abortRef.current = true;
        try {
          await engineRef.current?.interruptGenerate?.();
        } catch {}

        const msg =
          "The free on-device model seems stuck (no tokens received). I cancelled it.\n\n" +
          "Try one of these:\n" +
          "- Switch to a smaller model (e.g. `Qwen2.5-Coder-1.5B…` or `Llama-3.2-1B…`).\n" +
          "- Refresh the page.\n" +
          "- Ask a shorter question or paste only the relevant code.\n\n" +
          "Meanwhile, here’s help from the lesson context:\n\n" +
          fallbackSearchAnswer({ question: q, contextText });

        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: msg } : m))
        );
        setStreaming(false);
        clearInterval(watchdog);
      }, 1000);

      for await (const chunk of iter) {
        if (abortRef.current) break;
        const deltaObj = chunk?.choices?.[0]?.delta || {};
        const delta = deltaObj?.content || "";
        if (!delta) continue;
        gotAnyDelta = true;
        lastDeltaAt = Date.now();
        acc += delta;
        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantId ? { ...msg, content: acc } : msg))
        );
      }
      clearInterval(watchdog);

      if (!acc.trim()) {
        const fallback = fallbackSearchAnswer({ question: q, contextText });
        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantId ? { ...msg, content: fallback } : msg))
        );
      }
    } catch (e) {
      console.error("Chat failed:", e);
      const fallback = fallbackSearchAnswer({ question: q, contextText });
      setMessages((prev) =>
        prev.map((msg) => (msg.id === assistantId ? { ...msg, content: fallback } : msg))
      );
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div className="mt-14">
      <div className="bg-gradient-to-br from-dark-700 to-dark-800 rounded-2xl p-1 border border-brand-primary/20 shadow-lg">
        <div className="bg-dark-800 rounded-xl p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="min-w-0">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-brand-primary" />
                Ask the AI Tutor (Free Chat)
              </h3>
              <p className="text-sm text-light-400 mt-2">
                Runs locally in the learner’s browser (WebGPU). Best for coding guidance.
              </p>
              {contextTitle && (
                <p className="mt-3 text-xs text-light-400">
                  <span className="font-bold tracking-widest uppercase text-light-500">Context</span>{" "}
                  <span className="text-light-200">— {contextTitle}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
              <div className="px-3 py-2 rounded-xl border border-dark-600 bg-dark-900/40 text-xs text-light-300 flex items-center gap-2">
                <Bot size={16} className="text-brand-primary" />
                {engineStatus === "loading" ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Loading…
                  </>
                ) : engineStatus === "ready" ? (
                  <>
                    <Cpu size={14} />
                    Ready
                  </>
                ) : (
                  "Fallback"
                )}
              </div>

              <select
                value={modelId}
                onChange={(e) => reloadModel(e.target.value)}
                disabled={engineStatus === "loading" || streaming}
                className="px-3 py-2 rounded-xl border border-dark-600 bg-dark-900/40 text-xs text-light-200"
              >
                {(availableModels.length ? availableModels : preferredModelIds.map((id) => ({ model_id: id }))).map(
                  (m) => (
                    <option key={m.model_id} value={m.model_id}>
                      {m.model_id}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {progressText && engineStatus === "loading" && (
            <div className="mb-6 p-4 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-100">
              <p className="font-bold text-sm">Loading AI model…</p>
              <p className="text-xs text-light-200 mt-2 whitespace-pre-wrap">{progressText}</p>
              {typeof progressPct === "number" && (
                <div className="mt-3">
                  <div className="h-2 rounded-full bg-dark-900/40 border border-dark-700 overflow-hidden">
                    <div
                      className="h-full bg-brand-primary"
                      style={{ width: `${Math.max(1, Math.min(100, progressPct))}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-light-300">
                    {Math.round(progressPct)}%
                  </p>
                </div>
              )}
              <p className="text-xs text-light-300 mt-2">
                If this is your first time on this device, it will download model files once. Next time it loads from cache (no re-download).
              </p>
            </div>
          )}

          {needsDownload && engineStatus !== "loading" && (
            <div className="mb-6 p-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-100">
              <p className="font-bold text-sm">One-time AI download required</p>
              <p className="text-xs text-light-200 mt-2">
                To use the free AI tutor, we need to download the model to your browser (this can be large). It will be cached on this device, so next time it won’t download again.
              </p>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={async () => {
                    const webllm = await import("@mlc-ai/web-llm");
                    await startDownloadAndLoad({ webllm, id: pendingModelId || modelId });
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-sm bg-brand-primary text-dark-900 hover:opacity-90"
                >
                  Download & enable AI tutor
                </button>
                <button
                  onClick={() => {
                    setNeedsDownload(false);
                    setPendingModelId(null);
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-sm bg-dark-700 hover:bg-dark-600 border border-dark-600 text-light-200"
                >
                  Not now
                </button>
              </div>
            </div>
          )}

          {showCachedNotice && (
            <div className="mb-6 p-4 rounded-2xl border border-green-500/30 bg-green-500/10 text-green-100">
              <p className="font-bold text-sm">AI tutor is ready</p>
              <p className="text-xs text-light-200 mt-2">
                The model is now cached on this device. Next time it will load without downloading again.
              </p>
            </div>
          )}

          {engineStatus === "error" && (
            <div className="mb-6 p-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-100">
              <p className="font-bold text-sm">AI chat can’t run on this device/browser.</p>
              <p className="text-xs text-light-200 mt-2 whitespace-pre-wrap">{engineError}</p>
              <p className="text-xs text-light-300 mt-2">
                Use Chrome/Edge desktop with WebGPU enabled. Meanwhile, the fallback will still help using lesson context.
              </p>
            </div>
          )}

          <div className="border border-dark-700 rounded-2xl overflow-hidden">
            <div
              ref={scrollBoxRef}
              className="max-h-[360px] overflow-y-auto p-5 space-y-4 bg-dark-900/30"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-3 border ${
                      m.role === "user"
                        ? "bg-brand-primary/15 border-brand-primary/30 text-light-100"
                        : "bg-dark-800 border-dark-700 text-light-200"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{m.content}</pre>
                  </div>
                </motion.div>
              ))}

              {streaming && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-3 border bg-dark-800 border-dark-700 text-light-200 flex items-center gap-2 text-sm">
                    <Loader2 size={14} className="animate-spin" /> Thinking…
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-dark-800 border-t border-dark-700">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      ask();
                    }
                  }}
                  placeholder="Ask a coding question… paste your error + code for best help"
                  className="flex-1 px-4 py-3 rounded-xl bg-dark-900 border border-dark-600 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                />

                {streaming ? (
                  <button
                    onClick={stop}
                    className="px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 bg-red-500/15 text-red-200 border border-red-500/30 hover:bg-red-500/20"
                  >
                    <StopCircle size={16} />
                    Stop
                  </button>
                ) : (
                  <button
                    onClick={ask}
                    className="px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 bg-brand-primary text-dark-900 hover:opacity-90"
                  >
                    <Send size={16} />
                    Ask
                  </button>
                )}
              </div>
              <p className="mt-3 text-xs text-light-500">
                Best results: include the exact error message + the smallest code snippet that reproduces it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


