"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function truncate(s, n) {
  const str = String(s || '');
  if (str.length <= n) return str;
  return str.slice(0, n - 1) + '…';
}

export default function AICourseHelper({ contextTitle, contextText }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Ask me anything about this lesson. I’ll answer using the day’s context (no paid API keys).",
    },
  ]);
  const [input, setInput] = useState('');
  const [loadingModel, setLoadingModel] = useState(true);
  const [modelError, setModelError] = useState('');
  const [working, setWorking] = useState(false);
  const qaRef = useRef(null);
  const endRef = useRef(null);

  const ctx = useMemo(() => {
    const title = contextTitle ? `Context: ${contextTitle}\n\n` : '';
    // Keep context small for in-browser QA models.
    return truncate(title + (contextText || ''), 1800);
  }, [contextTitle, contextText]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, working, loadingModel]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoadingModel(true);
        setModelError('');
        // Load model lazily (free, runs in-browser)
        // IMPORTANT: Use the dist bundle. The source build hard-imports `sharp` (Node-only) and will fail in browser.
        const mod = await import('@xenova/transformers/dist/transformers.js');
        const { pipeline, env } = mod;

        // IMPORTANT for Next.js/browser:
        // Ensure ONNX wasm assets are resolvable and avoid threading mode requiring COOP/COEP.
        // transformers.js already defaults wasmPaths to jsDelivr for its own dist; keep that behavior explicitly here.
        if (env?.backends?.onnx?.wasm) {
          const v = env.version || '2.17.2';
          env.backends.onnx.wasm.wasmPaths = `https://cdn.jsdelivr.net/npm/@xenova/transformers@${v}/dist/`;
          env.backends.onnx.wasm.numThreads = 1;
        }
        if (env) {
          env.useBrowserCache = true;
          env.allowLocalModels = false;
          env.allowRemoteModels = true;
          // If HuggingFace is blocked on your network, you can swap this to a mirror later.
          // env.remoteHost = 'https://huggingface.co/';
        }

        const qa = await pipeline('question-answering', 'Xenova/distilbert-base-cased-distilled-squad');
        if (!cancelled) qaRef.current = qa;
      } catch (e) {
        console.error('AI model load failed:', e);
        if (!cancelled) {
          qaRef.current = null;
          setModelError(e?.message || String(e));
        }
      } finally {
        if (!cancelled) setLoadingModel(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const retryLoad = async () => {
    // Simple retry: reset state and re-run the loader by reloading the page-level module
    // (In practice, most failures are network-related; retry after fixing connectivity works.)
    setLoadingModel(true);
    setModelError('');
    qaRef.current = null;
    try {
      const mod = await import('@xenova/transformers/dist/transformers.js');
      const { pipeline, env } = mod;
      if (env?.backends?.onnx?.wasm) {
        const v = env.version || '2.17.2';
        env.backends.onnx.wasm.wasmPaths = `https://cdn.jsdelivr.net/npm/@xenova/transformers@${v}/dist/`;
        env.backends.onnx.wasm.numThreads = 1;
      }
      if (env) {
        env.useBrowserCache = true;
        env.allowLocalModels = false;
        env.allowRemoteModels = true;
      }
      const qa = await pipeline('question-answering', 'Xenova/distilbert-base-cased-distilled-squad');
      qaRef.current = qa;
    } catch (e) {
      console.error('AI model retry failed:', e);
      setModelError(e?.message || String(e));
    } finally {
      setLoadingModel(false);
    }
  };

  const fallbackAnswer = (question) => {
    // Free, always-available fallback: simple context search + snippets.
    const q = String(question || '').toLowerCase();
    const lines = String(ctx || '').split('\n').filter(Boolean);
    const hits = lines
      .map((line) => ({ line, score: q.split(/\s+/).filter(Boolean).reduce((acc, w) => acc + (line.toLowerCase().includes(w) ? 1 : 0), 0) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => `- ${x.line}`);

    if (hits.length === 0) {
      return "I couldn’t load the free model here, and I also couldn’t find this in today’s context. Paste your code/error and I’ll help.";
    }
    return `I couldn’t load the free model here, so I’m answering using a simple context search:\n\n${hits.join('\n')}\n\nIf you paste your code/error, I can be more specific.`;
  };

  const ask = async () => {
    const q = input.trim();
    if (!q || working) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: q }]);
    setWorking(true);

    try {
      if (loadingModel && !modelError) {
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            content:
              "The free AI model is still downloading/loading in your browser (first load can take 1–3 minutes). Wait until the badge says “Ready”, then ask again.\n\nMeanwhile, I can still answer using the lesson context if you want—ask again after it’s ready for higher-quality answers.",
          },
        ]);
        return;
      }
      if (!qaRef.current) {
        setMessages((m) => [...m, { role: 'assistant', content: fallbackAnswer(q) }]);
        return;
      }

      const question = String(q ?? '');
      const context = String(ctx ?? '');

      let res;
      try {
        // Newer/most common signature
        res = await qaRef.current({ question, context });
      } catch (e) {
        // Some versions expect positional args
        res = await qaRef.current(question, context);
      }

      const answer = res?.answer != null ? String(res.answer) : '';
      const score = typeof res?.score === 'number' ? res.score : null;

      const final =
        answer && answer.trim().length > 0
          ? `${answer}${score != null ? `\n\n(Confidence: ${Math.round(score * 100)}%)` : ''}`
          : "I couldn’t find that in today’s context. Ask in a different way, or paste the error/code snippet.";

      setMessages((m) => [...m, { role: 'assistant', content: final }]);
    } catch (e) {
      console.error(e);
      setMessages((m) => [...m, { role: 'assistant', content: fallbackAnswer(q) }]);
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="mt-14">
      <div className="bg-gradient-to-br from-dark-700 to-dark-800 rounded-2xl p-1 border border-brand-primary/20 shadow-lg">
        <div className="bg-dark-800 rounded-xl p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="min-w-0">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-brand-primary" />
                Still any doubts? Ask the AI Tutor
              </h3>
              <p className="text-sm text-light-400 mt-2">
                Free, runs in your browser. Context is auto-attached from the current day/lesson.
              </p>
              {contextTitle && (
                <p className="mt-3 text-xs text-light-400">
                  <span className="font-bold tracking-widest uppercase text-light-500">Context</span>{' '}
                  <span className="text-light-200">— {contextTitle}</span>
                </p>
              )}
            </div>

            <div className="shrink-0 px-3 py-2 rounded-xl border border-dark-600 bg-dark-900/40 text-xs text-light-300 flex items-center gap-2">
              <Bot size={16} className="text-brand-primary" />
              {loadingModel ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Loading model…
                </>
              ) : (
                modelError ? 'Fallback' : 'Ready'
              )}
            </div>
          </div>

          {modelError && (
            <div className="mb-6 p-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-100">
              <p className="font-bold text-sm">AI model failed to load (using fallback).</p>
              <p className="text-xs text-light-200 mt-2 whitespace-pre-wrap">
                {modelError}
              </p>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={retryLoad}
                  className="px-4 py-2 rounded-xl font-bold text-sm bg-brand-primary text-dark-900 hover:opacity-90"
                >
                  Retry model load
                </button>
                <p className="text-xs text-light-300 self-center">
                  If you’re on a restricted network, allow access to HuggingFace + jsDelivr CDN.
                </p>
              </div>
            </div>
          )}

          <div className="border border-dark-700 rounded-2xl overflow-hidden">
            <div className="max-h-[340px] overflow-y-auto p-5 space-y-4 bg-dark-900/30">
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 border ${
                      m.role === 'user'
                        ? 'bg-brand-primary/15 border-brand-primary/30 text-light-100'
                        : 'bg-dark-800 border-dark-700 text-light-200'
                    }`}
                  >
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                      {m.content}
                    </pre>
                  </div>
                </motion.div>
              ))}
              {working && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-3 border bg-dark-800 border-dark-700 text-light-200 flex items-center gap-2 text-sm">
                    <Loader2 size={14} className="animate-spin" /> Thinking…
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-4 bg-dark-800 border-t border-dark-700">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      ask();
                    }
                  }}
                  placeholder="Ask about today’s lesson… (paste your error message too)"
                  className="flex-1 px-4 py-3 rounded-xl bg-dark-900 border border-dark-600 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                />
                <button
                  onClick={ask}
                  disabled={working}
                  className={`px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 ${
                    working
                      ? 'opacity-60 cursor-not-allowed bg-dark-700 text-light-300 border border-dark-600'
                      : 'bg-brand-primary text-dark-900 hover:opacity-90'
                  }`}
                >
                  <Send size={16} />
                  Ask
                </button>
              </div>
              <p className="mt-3 text-xs text-light-500">
                Tip: Ask “Why does this happen?” + paste the exact error line. I’ll answer in the context of this day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


