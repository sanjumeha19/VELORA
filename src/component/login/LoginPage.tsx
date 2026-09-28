'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, FileText, Target, Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <>
      {/* Chrome Auto-fill Overrides */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          -webkit-text-fill-color: #FFFFFF !important;
          -webkit-box-shadow: 0 0 0px 1000px #1B4332 inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* PAGE CONTAINER */}
      <div className="w-screen h-screen bg-velora-bg text-velora-primary antialiased overflow-hidden flex flex-col p-4 sm:p-6 md:p-8 relative font-sans selection:bg-velora-accent selection:text-white">
        
        {/* AMBIENT GLOWS */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-velora-accent/15 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-velora-muted/20 rounded-full blur-[130px] pointer-events-none -z-10" />

        {/* BOTANICAL LEAF OVERLAY */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 z-0 w-[300px] sm:w-[380px] md:w-[460px]">
          <svg viewBox="0 0 350 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M-20,320 Q140,220 200,60" stroke="#1B4332" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M-20,320 Q160,340 240,500" stroke="#1B4332" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M140,220 C170,170 190,120 200,60 C150,100 110,150 140,220 Z" fill="#839958" opacity="0.6" />
            <path d="M90,260 C120,200 150,150 160,80 C120,130 70,190 90,260 Z" fill="#B87268" opacity="0.4" />
            <path d="M40,290 C90,230 120,180 130,110 C80,160 40,220 40,290 Z" fill="#1B4332" opacity="0.4" />
            <path d="M160,340 C190,390 220,450 240,500 C190,460 150,400 160,340 Z" fill="#839958" opacity="0.6" />
            <path d="M110,330 C150,380 180,430 190,490 C150,450 110,390 110,330 Z" fill="#B87268" opacity="0.4" />
          </svg>
        </div>

        {/* TOP NAVBAR */}
        <header className="w-full max-w-6xl mx-auto px-0 sm:px-2 flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center space-x-3">
            <img 
              src="logo.png" 
              alt="Velora Logo" 
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain" 
            />
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-semibold tracking-widest text-velora-primary uppercase leading-none font-serif">
                VELORA
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-extrabold tracking-[0.25em] text-velora-accent uppercase mt-0.5">
                AI CAREER ASSISTANT
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-5">
            <span className="text-sm font-semibold text-velora-primary hidden sm:inline tracking-wide">
              Don't have an account?
            </span>
            <button 
              onClick={() => router.push('/signup')}
              className="flex items-center space-x-2 bg-velora-accent hover:bg-velora-accent/90 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* MAIN DISPLAY AREA */}
        <main className="w-full max-w-6xl mx-auto px-0 sm:px-2 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 flex-grow z-10 my-auto py-2">
          
          {/* LEFT COLUMN: HERO TEXT & FEATURE CARDS */}
          <div className="w-full lg:w-6/12 flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-5xl sm:text-6xl md:text-[78px] font-normal text-velora-primary leading-[0.95] tracking-tight font-serif">
                Welcome <br />
                <span className="text-velora-accent italic font-normal">
                  Back.
                </span>
              </h1>
              
              <div className="flex items-center space-x-2.5 mt-3">
                <div className="h-[2px] w-12 bg-velora-accent" />
                <span className="text-velora-accent text-sm">✦</span>
              </div>
            </div>

            <div className="space-y-2 max-w-lg">
              <h3 className="text-xs font-extrabold text-velora-primary tracking-widest uppercase">
                Your AI Career Partner
              </h3>
              <p className="text-sm sm:text-base font-medium text-velora-primary/80 leading-relaxed">
                Velora helps you build smarter resumes, match better opportunities, improve ATS score and prepare with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="flex items-center space-x-2.5 bg-velora-surface border border-velora-primary/10 px-3.5 py-2.5 rounded-2xl shadow-sm hover:shadow-md hover:border-velora-accent/40 hover:-translate-y-1 transition-all duration-300">
                <div className="p-1.5 rounded-xl bg-velora-accent/15 text-velora-accent">
                  <FileText className="w-4 h-4 flex-shrink-0" />
                </div>
                <span className="text-[11px] font-extrabold text-velora-primary tracking-wide leading-tight">
                  Resume Builder
                </span>
              </div>

              <div className="flex items-center space-x-2.5 bg-velora-surface border border-velora-primary/10 px-3.5 py-2.5 rounded-2xl shadow-sm hover:shadow-md hover:border-velora-muted/40 hover:-translate-y-1 transition-all duration-300">
                <div className="p-1.5 rounded-lg bg-velora-muted/20 text-velora-muted">
                  <Target className="w-4 h-4 flex-shrink-0" />
                </div>
                <span className="text-[11px] font-extrabold text-velora-primary tracking-wide leading-tight">
                  ATS Scoring
                </span>
              </div>

              <div className="flex items-center space-x-2.5 bg-velora-surface border border-velora-primary/10 px-3.5 py-2.5 rounded-2xl shadow-sm hover:shadow-md hover:border-velora-accent/40 hover:-translate-y-1 transition-all duration-300">
                <div className="p-1.5 rounded-lg bg-velora-accent/15 text-velora-accent">
                  <Zap className="w-4 h-4 flex-shrink-0" />
                </div>
                <span className="text-[11px] font-extrabold text-velora-primary tracking-wide leading-tight">
                  AI Insights
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: LOGIN CARD */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            <div className="w-full max-w-[380px] bg-velora-primary border border-velora-muted/30 rounded-2xl p-6 sm:p-7 shadow-xl text-white relative">
              
              <div className="flex flex-col items-center justify-center mb-5">
                <div className="flex items-center space-x-2.5 mb-1">
                  <img 
                    src="logo.png" 
                    alt="Velora Lotus Logo" 
                    className="w-9 h-9 object-contain drop-shadow-lg" 
                  />
                  <span className="text-xl font-semibold tracking-[0.2em] text-velora-accent uppercase font-serif">
                    VELORA
                  </span>
                </div>
                
                <h2 className="text-xl font-medium tracking-wide text-white font-serif">
                  Login
                </h2>
              </div>

              <form className="space-y-3.5" onSubmit={handleLogin}>
                
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-velora-bg/90">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-velora-muted absolute left-3.5 pointer-events-none z-10" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-velora-primary/80 border border-white/20 focus:border-velora-accent focus:ring-1 focus:ring-velora-accent text-xs font-medium text-white placeholder:text-white/40 rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-velora-bg/90">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-velora-muted absolute left-3.5 pointer-events-none z-10" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-velora-primary/80 border border-white/20 focus:border-velora-accent focus:ring-1 focus:ring-velora-accent text-xs font-medium text-white placeholder:text-white/40 rounded-xl pl-10 pr-10 py-2.5 outline-none transition-all duration-200"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-velora-muted hover:text-white transition-colors z-10"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-0.5">
                  <label className="flex items-center space-x-2 cursor-pointer select-none text-white/80 hover:text-white transition-colors">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded bg-velora-primary border-white/20 accent-velora-accent cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>
                  
                  <a href="#forgot" className="text-velora-accent hover:underline font-semibold">
                    Forgot Password?
                  </a>
                </div>

                <div className="pt-1">
                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-velora-accent hover:bg-velora-accent/90 text-white py-2.5 rounded-xl text-xs font-bold tracking-wide shadow-md transition-all duration-300 transform active:scale-[0.98]"
                  >
                    <span>Log In</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </button>
                </div>

                <div className="relative flex items-center justify-center my-3">
                  <div className="border-t border-white/15 w-full" />
                  <span className="bg-velora-primary text-[9px] font-extrabold tracking-widest text-velora-muted uppercase px-2.5 py-0.5 rounded-full border border-white/15 absolute">
                    OR
                  </span>
                </div>

                <button 
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="w-full flex items-center justify-center space-x-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-semibold text-white py-2.5 rounded-xl transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

              </form>
            </div>
          </div>

        </main>

        <footer className="w-full text-center py-1 text-[9px] font-bold text-velora-primary/60 pointer-events-none flex-shrink-0 tracking-widest uppercase mt-auto">
          © 2026 VELORA AI CAREER ASSISTANT.
        </footer>
      </div>
    </>
  );
}