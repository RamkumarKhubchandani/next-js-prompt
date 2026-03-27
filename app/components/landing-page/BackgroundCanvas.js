"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

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

export default function BackgroundCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6] }}
      gl={{ powerPreference: "high-performance", antialias: false }}
      dpr={[1, 2]}
    >
      <NeuralCodeWeaver />
    </Canvas>
  );
}
