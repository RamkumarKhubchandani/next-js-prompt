"use client";

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, PlayCircle, Lock, CheckCircle2, CircleDot, Shield, ArrowRight, Wand2 } from 'lucide-react';

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

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function canUnlock(node, progressById) {
  const req = Array.isArray(node?.requires) ? node.requires : [];
  if (req.length === 0) return true;
  return req.every((id) => progressById?.[id]?.status === 'done');
}

function computeNodeStatus(node, progressById) {
  const saved = progressById?.[node.id]?.status;
  if (saved === 'done') return 'done';
  if (saved === 'doing') return 'doing';
  return canUnlock(node, progressById) ? 'todo' : 'locked';
}

function statusBadge(status) {
  if (status === 'done') return { label: 'Completed', Icon: CheckCircle2, cls: 'bg-green-500/15 text-green-300 border-green-500/30' };
  if (status === 'doing') return { label: 'In Progress', Icon: CircleDot, cls: 'bg-brand-primary/15 text-brand-primary border-brand-primary/30' };
  if (status === 'locked') return { label: 'Locked', Icon: Lock, cls: 'bg-dark-700 text-light-300 border-dark-600' };
  return { label: 'Available', Icon: Shield, cls: 'bg-blue-500/15 text-blue-300 border-blue-500/30' };
}

export default function FrontendRoadmap({ roadmap }) {
  const [activeId, setActiveId] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [progressById, setProgressById] = useState({});
  const [learningPath, setLearningPath] = useState('none');

  // Pan / zoom state for the skill tree canvas.
  const viewportRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const initialViewRef = useRef({ pan: { x: 0, y: 0 }, zoom: 1 });

  const nodes = useMemo(() => Object.values(roadmap.nodes), [roadmap]);
  const layoutNodes = roadmap?.layout?.nodes || {};
  const edges = roadmap?.layout?.edges || [];

  // Load persisted progress for this roadmap.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/roadmap/progress?roadmapId=${encodeURIComponent(roadmap.id)}`);
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled) return;
        setProgressById(json.progress || {});
        setLearningPath(json.learningPath || 'none');
      } catch {
        // ignore (roadmap still works without progress)
      }
    })();
    return () => { cancelled = true; };
  }, [roadmap.id]);

  // Helpful default: if user picked a learningPath and has no explicit progress yet,
  // show that node as "doing" and earlier core path nodes as "done" (UI-only, not persisted).
  const derivedProgress = useMemo(() => {
    const hasAny = progressById && Object.keys(progressById).length > 0;
    if (hasAny) return progressById;
    if (!learningPath || learningPath === 'none') return progressById;
    const next = { ...(progressById || {}) };

    const core = Array.isArray(roadmap.path) ? roadmap.path : [];
    const idx = core.indexOf(learningPath);
    if (idx >= 0) {
      for (let i = 0; i < idx; i++) next[core[i]] = { status: 'done' };
      next[learningPath] = { status: 'doing' };
    } else {
      // learningPath might be a courseId not present in the roadmap core (e.g. angular/fullstack)
      // We still mark JS as doing if they chose javascript; React if react, otherwise do nothing.
      if (learningPath === 'javascript') next.javascript = { status: 'doing' };
      if (learningPath === 'react') next.react = { status: 'doing' };
      if (learningPath === 'fullstack') next.nodejs = { status: 'doing' };
    }
    return next;
  }, [progressById, learningPath, roadmap.path]);

  async function setNodeProgress(id, status) {
    // optimistic
    setProgressById((prev) => ({ ...(prev || {}), [id]: { status, updatedAt: new Date().toISOString() } }));
    try {
      await fetch('/api/roadmap/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roadmapId: roadmap.id, nodeId: id, status })
      });
    } catch {
      // ignore; optimistic state still helps UX
    }
  }

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

  const canvasBounds = useMemo(() => {
    // compute bounds from node positions
    const pts = Object.values(layoutNodes).filter(Boolean);
    if (pts.length === 0) return { minX: -400, minY: -200, maxX: 400, maxY: 900 };
    const xs = pts.map(p => p.x);
    const ys = pts.map(p => p.y);
    return {
      minX: Math.min(...xs) - 220,
      maxX: Math.max(...xs) + 220,
      minY: Math.min(...ys) - 180,
      maxY: Math.max(...ys) + 220,
    };
  }, [layoutNodes]);

  // Initialize pan so the tree starts centered-ish.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rootId = Array.isArray(roadmap.path) && roadmap.path.length > 0 ? roadmap.path[0] : 'html';
    const root = layoutNodes[rootId] || layoutNodes.html || { x: 0, y: 0 };

    // Put the root node near TOP-CENTER so the user immediately sees the "start" of the tree.
    const desiredX = rect.width * 0.5;
    // Move the start node closer to the top (but keep a small margin so the card isn't clipped).
    const desiredY = 120;
    const nextPan = {
      x: desiredX - root.x * 1,
      y: desiredY - root.y * 1,
    };

    setZoom(1);
    setPan(nextPan);
    initialViewRef.current = { pan: nextPan, zoom: 1 };
  }, [layoutNodes, roadmap.path]);

  return (
    <div className="relative">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white">🧠 Skill Tree • {roadmap.title}</h1>
        <p className="text-light-300 mt-2">
          A living skill tree: follow the glowing trunk, branch into specializations, and track your progress.
        </p>
      </div>

      {/* Skill tree viewport */}
      <div className="rounded-2xl border border-dark-700 bg-dark-900 overflow-hidden">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 bg-dark-800 border-b border-dark-700">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-light-400">View</span>
            <button
              className="px-3 py-1.5 rounded-lg bg-dark-700 border border-dark-600 hover:bg-dark-600 text-xs font-semibold text-light-200"
              onClick={() => setZoom((z) => clamp(Number((z - 0.1).toFixed(2)), 0.7, 1.4))}
              type="button"
            >
              −
            </button>
            <div className="text-xs text-light-300 w-14 text-center">{Math.round(zoom * 100)}%</div>
            <button
              className="px-3 py-1.5 rounded-lg bg-dark-700 border border-dark-600 hover:bg-dark-600 text-xs font-semibold text-light-200"
              onClick={() => setZoom((z) => clamp(Number((z + 0.1).toFixed(2)), 0.7, 1.4))}
              type="button"
            >
              +
            </button>
            <button
              className="px-3 py-1.5 rounded-lg bg-dark-700 border border-dark-600 hover:bg-dark-600 text-xs font-semibold text-light-200"
              onClick={() => {
                const iv = initialViewRef.current || { pan: { x: 0, y: 0 }, zoom: 1 };
                setZoom(iv.zoom ?? 1);
                setPan(iv.pan ?? { x: 0, y: 0 });
              }}
              type="button"
            >
              Reset
            </button>
          </div>
          <div className="text-xs text-light-400">
            Drag to pan • Scroll to zoom • Click nodes to open the Agent panel
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative h-[70vh] min-h-[560px] bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,150,0.10),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.10),transparent_45%)]"
          onWheel={(e) => {
            // zoom around current cursor (simple)
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.06 : 0.06;
            setZoom((z) => clamp(Number((z + delta).toFixed(2)), 0.7, 1.4));
          }}
          onPointerDown={(e) => {
            // pan
            // If the user is clicking a node/button, don't start panning.
            if (e.target?.closest?.('button, a, input, select, textarea')) return;
            const start = { x: e.clientX, y: e.clientY };
            const startPan = pan;
            const onMove = (ev) => {
              setPan({
                x: startPan.x + (ev.clientX - start.x),
                y: startPan.y + (ev.clientY - start.y),
              });
            };
            const onUp = () => {
              window.removeEventListener('pointermove', onMove);
              window.removeEventListener('pointerup', onUp);
            };
            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp);
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Canvas */}
          <div
            className="absolute left-0 top-0"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0'
            }}
          >
            {/* Edges */}
            <svg
              width={canvasBounds.maxX - canvasBounds.minX}
              height={canvasBounds.maxY - canvasBounds.minY}
              viewBox={`${canvasBounds.minX} ${canvasBounds.minY} ${canvasBounds.maxX - canvasBounds.minX} ${canvasBounds.maxY - canvasBounds.minY}`}
              className="absolute left-0 top-0"
            >
              <defs>
                <linearGradient id="edgeGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(0,255,150,0.55)" />
                  <stop offset="50%" stopColor="rgba(59,130,246,0.45)" />
                  <stop offset="100%" stopColor="rgba(168,85,247,0.45)" />
                </linearGradient>
              </defs>
              {edges.map(([a, b], idx) => {
                const pa = layoutNodes[a];
                const pb = layoutNodes[b];
                if (!pa || !pb) return null;
                const nodeA = roadmap.nodes[a];
                const nodeB = roadmap.nodes[b];
                const statusA = computeNodeStatus(nodeA, derivedProgress);
                const statusB = computeNodeStatus(nodeB, derivedProgress);
                const active = statusA === 'done' || statusB === 'doing' || statusB === 'done';
                const stroke = active ? 'url(#edgeGlow)' : 'rgba(255,255,255,0.12)';
                const width = active ? 3.2 : 2;
                const cx = (pa.x + pb.x) / 2;
                // soft curve
                const d = `M ${pa.x} ${pa.y} C ${cx} ${pa.y + 60}, ${cx} ${pb.y - 60}, ${pb.x} ${pb.y}`;
                return (
                  <path
                    key={idx}
                    d={d}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={width}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const pos = layoutNodes[node.id];
              if (!pos) return null;
              const status = computeNodeStatus(node, derivedProgress);
              const badge = statusBadge(status);
              const locked = status === 'locked';
              const glow =
                status === 'done'
                  ? 'shadow-[0_0_0_4px_rgba(34,197,94,0.12),0_0_30px_rgba(34,197,94,0.18)]'
                  : status === 'doing'
                    ? 'shadow-[0_0_0_4px_rgba(0,255,150,0.12),0_0_30px_rgba(0,255,150,0.16)]'
                    : 'shadow-[0_0_0_4px_rgba(59,130,246,0.08)]';

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  onClick={() => openNode(node.id)}
                  disabled={locked}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={locked ? undefined : { scale: 1.02 }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-[270px] rounded-2xl border p-4 text-left transition ${locked
                      ? 'bg-dark-800/40 border-dark-700 text-light-400 cursor-not-allowed opacity-60'
                      : 'bg-dark-800 border-dark-700 hover:border-brand-primary/50'
                    } ${glow}`}
                  style={{ left: pos.x, top: pos.y }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] tracking-widest uppercase text-light-400">{node.level}</p>
                      <h3 className="text-lg font-extrabold text-white truncate">{node.title}</h3>
                      <p className="text-sm text-light-300/90 mt-1 line-clamp-2">{node.summary}</p>
                    </div>
                    <span className={`shrink-0 text-[11px] px-2 py-1 rounded-full border ${badge.cls} flex items-center gap-1.5`}>
                      <badge.Icon size={14} />
                      {badge.label}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-light-400">{node.courseId ? `Course: ${node.courseId}` : 'Guided node'}</span>
                    <span className="text-xs font-bold text-brand-primary flex items-center gap-1">
                      Open <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
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

                  {/* Progress + Agent actions */}
                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl border border-dark-700 bg-dark-800 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-white">Progress</p>
                        <span className="text-xs text-light-400">
                          {statusBadge(computeNodeStatus(activeData.node, derivedProgress)).label}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setNodeProgress(activeData.node.id, 'doing')}
                          className="px-3 py-2 rounded-xl bg-brand-primary/15 border border-brand-primary/30 text-brand-primary text-sm font-bold hover:bg-brand-primary/20"
                        >
                          Mark In Progress
                        </button>
                        <button
                          type="button"
                          onClick={() => setNodeProgress(activeData.node.id, 'done')}
                          className="px-3 py-2 rounded-xl bg-green-500/15 border border-green-500/30 text-green-300 text-sm font-bold hover:bg-green-500/20"
                        >
                          Mark Completed
                        </button>
                        <button
                          type="button"
                          onClick={() => setNodeProgress(activeData.node.id, 'todo')}
                          className="px-3 py-2 rounded-xl bg-dark-700 border border-dark-600 text-light-200 text-sm font-bold hover:bg-dark-600"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-dark-700 bg-gradient-to-br from-purple-500/10 via-dark-800 to-dark-900 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-light-400 uppercase tracking-widest">Agent Mode</p>
                          <h4 className="text-lg font-extrabold text-white flex items-center gap-2 mt-1">
                            <Wand2 className="text-brand-primary" size={18} />
                            What to do next (no human needed)
                          </h4>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-500/30">
                          AI Guide
                        </span>
                      </div>

                      <ul className="mt-3 space-y-2 text-sm text-light-200">
                        <li className="flex gap-2">
                          <span className="text-brand-primary font-bold">1.</span>
                          <span>Skim the “What to learn” bullets, then do one 20‑minute focused practice block.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-brand-primary font-bold">2.</span>
                          <span>Build a tiny artifact (1 component / 1 layout / 1 API) that proves the concept.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-brand-primary font-bold">3.</span>
                          <span>Mark this node “Completed” only after you can explain it in 60 seconds.</span>
                        </li>
                      </ul>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeData.node.courseId ? (
                          <Link
                            href={`/path/${activeData.node.courseId}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-dark-900 font-extrabold hover:opacity-90"
                          >
                            Open Course <ArrowRight size={16} />
                          </Link>
                        ) : (
                          <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-700 border border-dark-600 text-light-100 font-bold hover:bg-dark-600"
                          >
                            Browse Tutorials <ArrowRight size={16} />
                          </Link>
                        )}
                        <Link
                          href="/dashboard"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-700 border border-dark-600 text-light-100 font-bold hover:bg-dark-600"
                        >
                          Back to Dashboard
                        </Link>
                      </div>
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






