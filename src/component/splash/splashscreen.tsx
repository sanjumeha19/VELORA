"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onFinish: () => void;
}

const loadingTexts = [
  "Preparing your workspace...",
  "Analyzing your career...",
  "Loading AI modules...",
  "Almost Ready..."
];

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 600);

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F3EB] overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-[#D8F0EE] opacity-30 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-32 w-96 h-96 rounded-full bg-[#E8B7C8] opacity-20 blur-3xl"></div>

      {/* Logo */}
      <div className="animate-[fadeIn_0.8s_ease-out]">
       <Image
  src="/logo.png"
  alt="Velora Lotus"
  width={120}
  height={120}
  priority
/>
      </div>

      {/* Brand */}
      <h1 className="mt-6 text-5xl font-serif tracking-[0.35em] text-[#0B3D3B] animate-[fadeUp_1s_ease-out]">
        VELORA
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg text-[#5F7A61] animate-[fadeUp_1.3s_ease-out]">
        Your AI Career Companion
      </p>

      {/* Loading */}
      <p className="mt-8 text-sm text-gray-500 transition-all duration-500">
        {loadingTexts[textIndex]}
      </p>

      {/* Animated Dots */}
      <div className="flex gap-3 mt-5">
        <span className="w-3 h-3 rounded-full bg-[#5F7A61] animate-bounce"></span>
        <span className="w-3 h-3 rounded-full bg-[#E8B7C8] animate-bounce delay-150"></span>
        <span className="w-3 h-3 rounded-full bg-[#0B3D3B] animate-bounce delay-300"></span>
      </div>
    </div>
  );
}