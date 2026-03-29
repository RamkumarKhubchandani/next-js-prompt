"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Points, PointMaterial } from "@react-three/drei";
import { Sparkles, Code2, Globe, Cpu, Users, Zap, CheckCircle2 } from "lucide-react";

const NeuralCodeWeaver = () => {
  const ref = useRef();
  const { viewport, mouse } = useThree();

  const [points] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions.set([
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      ], i * 3);

      const color = Math.random() > 0.5 ? [0, 0.96, 0.63] : [0.5, 0.2, 1];
      colors.set(color, i * 3);
    }
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta / 25;
    ref.current.rotation.y += delta / 30;
    const targetX = (mouse.x * viewport.width) / 5;
    const targetY = (mouse.y * viewport.height) / 5;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.05;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};



// Floating Badge Component
const FloatingBadge = ({ icon: Icon, text, color, delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: 1,
      scale: 1,
      x: [0, x, 0],
      y: [0, y, 0]
    }}
    transition={{
      duration: 0.5,
      delay,
      x: { duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
      y: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }
    }}
    className="absolute z-20 hidden lg:flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-full border border-gray-200 dark:border-white/20 shadow-lg text-gray-900 dark:text-white"
    style={{
      top: y > 0 ? `${50 + y}%` : undefined,
      bottom: y < 0 ? `${50 + Math.abs(y)}%` : undefined,
      left: x < 0 ? `${50 - Math.abs(x)}%` : undefined,
      right: x > 0 ? `${50 - x}%` : undefined,
    }}
  >
    <div className={`p-1.5 rounded-full ${color} bg-opacity-20`}>
      <Icon size={16} className={color.replace("bg-", "text-")} />
    </div>
    <span className="text-xs font-bold tracking-wide">{text}</span>
  </motion.div>
);



export const Hero = () => {
  const introMessage = "Do you want to learn JavaScript, React, Angular, Full stack, Node.js, or any programming skills? Let's learn together! I will make you a next-level coder.";
  const [currentMessage, setCurrentMessage] = useState(introMessage);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Try to auto-start unmuted (Subject to browser policy)
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timer;
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, delay canvas for performance. On mobile keep it off.
      if (!mobile) {
        timer = setTimeout(() => setIsCanvasReady(true), 1500);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // TTS Logic - Only switch messages AFTER intro is done manually or naturally
  useEffect(() => {
    let interval;
    if (hasSpokenIntro && !isSpeaking) {
      const secondaryMessages = [
        "I'll help you master System Design! 🚀",
        "Ready to become a 10x Engineer? 💻",
        "Let's debug that React code. 🛠️",
        "Agentic Workflows are the future. 🤖"
      ];
      // Slow rotation of messages visually, but DON'T auto-speak them to avoid annoyance
      interval = setInterval(() => {
        const nextMsg = secondaryMessages[Math.floor(Math.random() * secondaryMessages.length)];
        setCurrentMessage(nextMsg);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [hasSpokenIntro, isSpeaking]);

  const speak = () => {
    if (!currentMessage) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentMessage);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.lang === 'en-US');
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Slightly higher pitch for character

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (currentMessage === introMessage) setHasSpokenIntro(true);
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Attempt to speak immediately if not muted. 
    // Note: Most browsers block audio without gesture. If blocked, we just show visual.
    if (!isMuted && !isSpeaking && !hasSpokenIntro) {
      // Short delay to ensure voices loaded
      setTimeout(() => speak(), 1000);
    } else if (isMuted) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isMuted]); // Remove dependencies to prevent loop, triggered by load or mute toggle



  return (
    <div className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#050505]">
      {/* Background Canvas - Disabled on Mobile and delayed on Desktop for performance */}
      {!isMobile && isCanvasReady && (
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 6] }}
            gl={{ powerPreference: "high-performance", antialias: false }}
            dpr={[1, 2]}
          >
            <NeuralCodeWeaver />
          </Canvas>
        </div>
      )}

      {/* Ambient Glows - Enhanced on Mobile as fallback */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow ${isMobile ? 'opacity-100' : 'opacity-70'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow ${isMobile ? 'opacity-100' : 'opacity-70'}`} />
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-brand-primary/5" />
        )}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-teal-700 dark:text-brand-primary text-xs font-bold uppercase tracking-widest"
            >
              <Zap size={14} className="text-teal-700 dark:text-brand-primary" fill="currentColor" />
              4 free tools · no credit card needed
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              Learn to code. Get{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-500">
                job support.
              </span>
              <br />
              Build your career — free tools included.
            </h1>

            {/* Subtitle */}
            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              1:1 mentorship for{' '}
              <strong className="text-gray-900 dark:text-white">
                React, Angular, Vue, Node.js, TypeScript, JavaScript, Full Stack &amp; Playwright
              </strong>. Plus free resume builder, interview prep, daily learning dashboard, and live events.
            </p>

            {/* 3 CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/login" aria-label="Book free session" className="focus:outline-none">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-full bg-brand-primary px-6 py-3.5 text-dark-900 text-sm font-extrabold shadow-[0_0_20px_rgba(0,245,160,0.3)] hover:shadow-[0_0_35px_rgba(0,245,160,0.5)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} fill="currentColor" />
                  Book free session
                </motion.div>
              </Link>

              <a
                href="https://wa.me/918237320942?text=Hi%2C%20I%20need%20job%20support%20and%20mentorship."
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none"
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-full bg-[#1a9e52] px-6 py-3.5 text-white text-sm font-extrabold shadow-lg shadow-green-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Job support — WhatsApp now
                </motion.div>
              </a>

              <Link href="/dashboard" aria-label="Browse free tools" className="focus:outline-none">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-full border-2 border-brand-primary/50 px-6 py-3.5 text-teal-700 dark:text-brand-primary text-sm font-extrabold hover:bg-brand-primary/10 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Globe size={16} />
                  Browse free tools
                </motion.div>
              </Link>
            </div>

            {/* Micro trust bullets */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['Free resume builder', 'Free interview prep', 'Free daily learning', 'Reply in 30 mins'].map((text) => (
                <span key={text} className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  <CheckCircle2 size={12} className="text-brand-primary" />
                  {text}
                </span>
              ))}
            </div>

            {/* What's Free Card */}
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                What&apos;s Free — No Signup Required
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Resume builder', 'Interview Q&A', 'Events', 'Daily learning',
                  '+ 1:1 mentorship', 'Job support',
                  'React', 'Angular', 'Vue', 'TypeScript', 'Node.js', 'Full Stack', 'Playwright'
                ].map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border cursor-default ${
                      ['React', 'Angular', 'Vue', 'TypeScript', 'Node.js', 'Full Stack', 'Playwright'].includes(tag)
                        ? 'bg-white dark:bg-dark-800 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
                        : 'bg-brand-primary/10 border-brand-primary/25 text-teal-700 dark:text-brand-primary'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Character & Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Interactive Speech Bubble - Moved Inside Hero for State Access */}
            <div className="absolute top-10 -left-12 sm:left-0 z-50 pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  className="relative bg-white dark:bg-[#0A0A0C] border border-gray-200 dark:border-white/10 px-5 py-3 rounded-2xl rounded-tr-none shadow-xl max-w-[220px] cursor-pointer group"
                  onClick={() => setIsMuted(!isMuted)}
                  role="button"
                  tabIndex={0}
                  aria-label="Toggle AI Voice"
                  onKeyDown={(e) => { if (e.key === 'Enter') setIsMuted(!isMuted); }}
                >
                  <div className="flex items-start gap-2">
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                      {currentMessage}
                    </p>
                    <div className="shrink-0 pt-0.5 flex gap-0.5 h-3 items-end">
                      {isSpeaking ? (
                        <>
                          <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.3 }} className="w-1 bg-brand-primary rounded-full" />
                          <motion.div animate={{ height: [6, 14, 6] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-brand-primary rounded-full" />
                          <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.35 }} className="w-1 bg-brand-primary rounded-full" />
                        </>
                      ) : (
                        isMuted ? <Zap size={14} className="text-gray-400" /> : <div className="w-2 h-2 bg-brand-primary rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* Hint */}
                  <div className="absolute -bottom-8 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-[10px] font-bold text-white bg-black/80 px-2 py-1 rounded-full">
                      {isMuted ? "Tap to Listen" : (isSpeaking ? "Speaking..." : "Voice Enabled")}
                    </span>
                  </div>

                  <svg className="absolute -right-2 top-0 w-4 h-4 text-white dark:text-[#0A0A0C] transform rotate-90" viewBox="0 0 10 10" style={{ fill: "currentColor" }}>
                    <path d="M0 0 L10 10 L0 10 Z" />
                  </svg>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Main Character Image with Talking Animation */}
            <motion.div
              animate={{
                y: [-15, 15, -15],
                scale: isSpeaking ? [1, 1.05, 1] : 1, // More dramatic scale change when speaking
              }}
              transition={{
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" } // Slower bounce
              }}
              className="relative z-10 w-full max-w-lg"
            >
              <div className="relative aspect-square">
                {/* Glow behind character */}
                <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] rounded-full" />

                <Image
                  src="/assets/hero-character.png"
                  alt="Futuristic AI Coder Learning JavaScript and React"
                  width={800}
                  height={800}
                  className="object-contain drop-shadow-2xl"
                  priority
                />



                {/* Floating Holographic Cards */}
                <motion.div
                  animate={{ y: [10, -10, 10], rotate: [0, 2, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-8 top-1/4 p-4 rounded-2xl bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl w-48 hidden sm:block"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 dark:bg-blue-500/20">
                      <Globe size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold">Global Hub</p>
                      <p className="text-xs text-gray-900 dark:text-white font-bold">150+ Countries</p>
                    </div>
                  </div>
                  <div className="h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-blue-500 dark:bg-blue-400" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, -2, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -right-4 bottom-1/4 p-4 rounded-2xl bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl w-52 hidden sm:block"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-purple-500/10 dark:bg-purple-500/20">
                      <Cpu size={18} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold">AI Tutor Status</p>
                      <p className="text-xs text-teal-700 dark:text-brand-primary font-bold truncate">Thinking: Optimization...</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-white/5 rounded-full" />
                    <div className="h-1.5 w-[70%] bg-gray-200 dark:bg-white/5 rounded-full" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
