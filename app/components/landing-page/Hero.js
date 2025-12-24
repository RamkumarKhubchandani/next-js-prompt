"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import Link from "next/link";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const NeuralCodeWeaver = () => {
    const ref = useRef();
    const { viewport, mouse } = useThree();

    const [points] = useMemo(() => {
        const positions = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            positions.set([x, y, z], i * 3);
        }
        return [positions];
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.x += delta / 15;
        ref.current.rotation.y += delta / 20;
        const targetX = mouse.x * viewport.width / 2;
        const targetY = mouse.y * viewport.height / 2;
        ref.current.position.x += (targetX - ref.current.position.x) * 0.02;
        ref.current.position.y += (targetY - ref.current.position.y) * 0.02;
    });

    return (
        <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00f5a0"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    );
};

export const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-light-100 via-light-100 to-light-200 dark:from-dark-900 dark:via-dark-900 dark:to-dark-900">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <NeuralCodeWeaver />
            </Canvas>
        </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-5xl font-bold tracking-tight text-dark-900 dark:text-light-100 sm:text-7xl">
            Become Agentic.
            <br />
            Command the Code.
          </h1>
          <p className="mt-6 text-lg leading-8 text-dark-900/70 dark:text-light-200">
            Stop just writing code. Start architecting the future. Our curriculum trains you in agentic workflows, transforming you from a developer into a hyper-productive AI-augmented engineer.
          </p>
          <div className="mt-10">
            <Link href="/javascript-tutorials">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-brand-primary px-8 py-4 text-lg font-semibold text-dark-900 shadow-[0_0_25px_#00f5a0] hover:shadow-[0_0_40px_#00f5a0] transition-shadow"
              >
                Start Your Ascension
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
