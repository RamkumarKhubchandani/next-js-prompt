"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

const AnimatedSphere = () => {
    return (
      <Canvas>
        <OrbitControls enableZoom={false} autoRotate />
        <ambientLight intensity={1} />
        <directionalLight position={[3, 2, 1]} />
        <Sphere args={[1, 100, 200]} scale={2.4}>
          <MeshDistortMaterial
            color="#00f5a0"
            attach="material"
            distort={0.5}
            speed={2}
          />
        </Sphere>
      </Canvas>
    );
  };

export const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <AnimatedSphere />
        </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-light-100 sm:text-6xl">
            Unlock Your Potential.
            <br />
            Master Modern Web Dev.
          </h1>
          <p className="mt-6 text-lg leading-8 text-light-200">
            Join a new generation of developers. Our AI-powered, interactive
            courses are designed to make you a master in the art of code.
          </p>
          <div className="mt-10">
            <Link href="/javascript-tutorials">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-brand-primary px-8 py-3 text-base font-semibold text-dark-900 shadow-[0_0_20px_#00f5a0] hover:shadow-[0_0_30px_#00f5a0] transition-shadow"
              >
                Start Your Journey
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
