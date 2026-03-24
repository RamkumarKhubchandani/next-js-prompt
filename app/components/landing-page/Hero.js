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
    const count = 3000; // Reduced from 6000 for better performance & lower TBT
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions.set([
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      ], i * 3);

      // Mix of cyan and purple for a premium tech feel
      const color = Math.random() > 0.5 ? [0, 0.96, 0.63] : [0.5, 0.2, 1];
      colors.set(color, i * 3);
    }
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta / 25;
    ref.current.rotation.y += delta / 30;
    // Subtle mouse interaction
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
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-teal-700 dark:text-brand-primary text-xs font-bold uppercase tracking-widest mb-6"
              >
                <Zap size={14} className="text-teal-700 dark:text-brand-primary" fill="currentColor" />
                The Future of Coding is Here
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                Free Agentic-Coding Hub. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600 dark:from-brand-primary dark:to-purple-400">
                  Architect React & Node.js.
                </span>
              </h1>
            </div>

            <p className="text-lg lg:text-xl text-gray-800 dark:text-gray-300 leading-relaxed max-w-2xl font-medium">
              Transformation from developer to <span className="text-black dark:text-white font-bold">AI-Augmented Architect</span> starts here.
              Master JavaScript, React, System Design, and Agentic AI workflows with
              <span className="text-brand-primary font-bold"> 1:1 Expert Guidance</span> and our <span className="text-purple-700 dark:text-purple-400 font-bold">Proprietary AI Tutor</span>.
            </p>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-3">
              {['Fullstack Mastery', 'WebLLM Intelligence', '1:1 Mentorship', 'Global Certification'].map((tag, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-xs font-bold text-gray-900 dark:text-gray-300">
                  <CheckCircle2 size={12} className="text-brand-primary" />
                  {tag}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-brand-primary to-emerald-400 px-8 py-4 text-dark-900 text-lg font-bold shadow-[0_0_20px_rgba(0,245,160,0.3)] hover:shadow-[0_0_35px_rgba(0,245,160,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} fill="currentColor" className="text-dark-900" />
                  Start Your Ascension
                </motion.button>
              </Link>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-8 py-4 text-gray-900 dark:text-white text-lg font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <Users size={20} />
                  Join the Elite Loop
                </motion.button>
              </Link>
            </div>

            {/* SEO Keyword Salad / Trust Micro-copy */}
            <p className="text-xs text-gray-700 dark:text-gray-500 max-w-lg mt-4 font-medium">
              Trusted by engineers worldwide. Expert-verified curriculum for <span className="text-gray-900 dark:text-gray-400 font-bold">React, Angular, Node.js, Next.js 15, Rust, and Playwright</span>.
            </p>
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
