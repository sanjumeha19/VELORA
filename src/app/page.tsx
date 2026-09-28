"use client";

import { useState } from "react";
import SplashScreen from "@/component/splash/splashscreen";
import Hero from "@/component/hero/hero";


export default function Home() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <SplashScreen onFinish={() => setLoading(false)} />
    );
  }

  return (
    <>
      
      <Hero />
    </>
  );
}