"use client";

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, PlayCircle, Lock } from 'lucide-react';

function NodeCard({ node, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-dark-800 hover:bg-dark-700 border border-dark-600 hover:border-brand-primary rounded-xl p-4 text-left transition-all"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-light-400 uppercase tracking-wider">{node.level}</p>
          <h3 className="text-lg font-bold text-white">{node.title}</h3>
          <p className="text-sm text-light-300 mt-1">{node.summary}</p>
        </div>
        <div className="text-brand-primary font-bold">→</div>
      </div>
    </button>
  );
}

function MediaBlock({ demo }) {
  if (!demo || demo.kind !== 'media') return null;

  const isVideo = demo.mediaType === 'video' || (demo.src || '').endsWith('.mp4');

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
        <PlayCircle className="text-brand-primary" size={18} />
        {demo.label || 'Demo'}
      </p>

      <div className="rounded-xl border border-dark-600 bg-dark-900 overflow-hidden">
        {isVideo ? (
          <video
            src={demo.src}
            controls
            muted
            playsInline
            className="w-full h-auto"
            onError={(e) => {
              // Hide broken media element and show fallback
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('[data-fallback]');
              if (fallback) fallback.style.display = 'block';
            }}
          />
        ) : (
          <img
            src={demo.src}
            alt={demo.label || 'Demo'}
            className="w-full h-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('[data-fallback]');
              if (fallback) fallback.style.display = 'block';
            }}
          />
        )}

        <div
          data-fallback
          style={{ display: 'none' }}
          className="p-4 text-sm text-light-300"
        >
          <p className="font-bold text-white mb-1">Demo media not found</p>
          <p>
            Add your GIF/video at <code className="bg-dark-700 px-1 rounded">{demo.src}</code> (under
            <code className="bg-dark-700 px-1 rounded">/public</code>) to enable the Cursor demo.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FrontendRoadmap({ roadmap }) {
  const [activeId, setActiveId] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const corePath = useMemo(() => roadmap.path.map((id) => roadmap.nodes[id]), [roadmap]);
  const extras = useMemo(() => roadmap.extras.map((id) => roadmap.nodes[id]), [roadmap]);

  async function openNode(id) {
    setActiveId(id);
    setLoading(true);
    setError(null);
    setActiveData(null);

    try {
      const res = await fetch(`/api/roadmap/node?id=${encodeURIComponent(id)}`);
      if (!res.ok) {
        const msg = res.status === 403 ? 'Pro required' : 'Failed to load node';
        throw new Error(msg);
      }
      const json = await res.json();
      setActiveData(json);
    } catch (e) {
      setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white">🗺️ {roadmap.title}</h1>
        <p className="text-light-300 mt-2">
          A living, clickable path. Click a node to see a guided explanation + a “Cursor demo” media slot.
        </p>
      </div>

      {/* Core Path (visual line) */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Core Path</h2>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {corePath.map((node, idx) => (
            <div key={node.id} className="flex items-center gap-3 flex-1">
              <div className="flex-1">
                <NodeCard node={node} onClick={() => openNode(node.id)} />
              </div>
              {idx < corePath.length - 1 && (
                <div className="hidden lg:block w-10 h-1 bg-dark-600 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Extra nodes */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">Clickable Skill Nodes</h2>
        <p className="text-sm text-light-300 mb-4">
          These expand the core path. Example: click <span className="text-brand-primary font-bold">CSS Grid</span> to see the Cursor demo slot.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {extras.map((node) => (
            <NodeCard key={node.id} node={node} onClick={() => openNode(node.id)} />
          ))}
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
              className="absolute right-0 top-0 h-full w-full max-w-xl bg-dark-900 border-l border-dark-700 p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-light-400 uppercase tracking-wider">Living Roadmap • Pro</p>
                  <h3 className="text-2xl font-bold text-white">
                    {roadmap.nodes[activeId]?.title || activeId}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveId(null)}
                  className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-700"
                >
                  <X className="text-light-200" />
                </button>
              </div>

              {loading && (
                <div className="text-light-300">Loading…</div>
              )}

              {!loading && error && (
                <div className="rounded-xl border border-red-500/30 bg-red-900/20 p-4 text-red-200">
                  <div className="flex items-center gap-2 font-bold">
                    <Lock size={18} /> {error}
                  </div>
                  <p className="text-sm mt-2 text-red-200/90">
                    This roadmap is Pro-only. If you’re already Pro, refresh and try again.
                  </p>
                </div>
              )}

              {!loading && !error && activeData?.node && (
                <>
                  <div className="rounded-2xl border border-dark-700 bg-dark-800 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-light-300">{activeData.node.summary}</p>
                      <span className="text-xs px-2 py-1 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/30 whitespace-nowrap">
                        {activeData.node.level}
                      </span>
                    </div>
                    <div className="mt-3 text-xs text-light-400 flex items-center gap-2">
                      <Sparkles size={14} className="text-brand-primary" />
                      AI-updated: {new Date(activeData.aiUpdatedAt).toLocaleString()}
                    </div>
                  </div>

                  {Array.isArray(activeData.node.why) && activeData.node.why.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-bold text-white mb-2">Why this matters</h4>
                      <ul className="list-disc list-inside space-y-2 text-light-300">
                        {activeData.node.why.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {Array.isArray(activeData.node.learn) && activeData.node.learn.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-bold text-white mb-2">What to learn</h4>
                      <ul className="list-disc list-inside space-y-2 text-light-300">
                        {activeData.node.learn.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <MediaBlock demo={activeData.node.demo} />
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}





