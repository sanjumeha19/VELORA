import React from 'react';
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  Cpu, 
  Briefcase, 
  MessageSquare, 
  UserCheck, 
  FolderGit2, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Mic, 
  Lock, 
  ShieldCheck,
  Activity
} from 'lucide-react';

const UI_FONT = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";
const SERIF_FONT = "'Playfair Display', 'Georgia', serif";

export default function App() {
  return (
    <>
      {/* Inject Fonts and Keyframe Utilities */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
        .font-serif-custom { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans-custom { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
      `}</style>

      <div 
        className="w-screen h-screen bg-[#F4F1EA] text-[#111827] antialiased overflow-hidden flex flex-col p-4 sm:p-6 relative font-sans-custom"
        style={{ fontFamily: UI_FONT }}
      >
        
        {/* PREMIUM BACKGROUND BLUR GRADIENTS */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#FDE2E4]/30 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[650px] h-[450px] bg-[#E8F5E9]/40 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* NAVBAR - Enhanced Logo & Typography sizing */}
        <header className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between flex-shrink-0 mb-2 z-20">
          <div className="flex items-center space-x-3">
            <img 
              src="logo.png" 
              alt="Velora Lotus Logo" 
              className="w-12 h-12 object-contain" 
            />
            <span className="text-3xl font-bold tracking-tight text-[#072F1D]" style={{ fontFamily: SERIF_FONT }}>
              Velora
            </span>
          </div>
          
       <Link href="/login">
  <button className="rounded-2xl border border-[#0B3D3B] px-7 py-3 font-semibold text-[#0B3D3B] transition hover:bg-[#0B3D3B] hover:text-white">
    Login
  </button>
</Link>
        </header>

        {/* HERO VIEWPORT CONTENT SPLIT CONTAINER */}
        <main className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-grow overflow-hidden my-auto z-10">
          
          {/* LEFT COLUMN: HERO MARKETING CANVAS - Scaled Headline */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 py-2">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-[#E6F3EC] border border-[#CDE7DA] px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#0A3D24]" />
                <span className="text-[10px] font-extrabold text-[#0A3D24] tracking-wider uppercase">AI Career Platform</span>
              </div>
            </div>
            
            <h1 className="text-[48px] sm:text-[56px] font-semibold leading-[1.06] text-[#0A3D24] tracking-tight" style={{ fontFamily: SERIF_FONT }}>
              Land Your <br />
              <span className="italic font-normal text-[#0A3D24]">Dream Job</span> <br />
              <span className="text-[#E07A8B] font-sans-custom font-extrabold tracking-tighter" style={{ fontFamily: UI_FONT }}>with AI.</span>
            </h1>
            
            <p className="text-gray-700 text-xs sm:text-[13px] font-medium leading-relaxed max-w-sm opacity-95">
              Everything you need to build ATS-friendly resumes, practice interviews, discover better opportunities, and grow your career with AI.
            </p>
            
           <Link href="/signup">
  <button className="flex items-center space-x-3 bg-[#0A3D24] text-white px-7 py-3.5 rounded-xl text-xs font-bold hover:bg-[#0d4f2f] transition-all duration-300 transform hover:scale-[1.03] active:scale-98 group shadow-[0_4px_14px_rgba(10,61,36,0.18)] hover:shadow-[0_6px_20px_rgba(10,61,36,0.28)] tracking-tight">
    <span>Get Started</span>

    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
  </button>
</Link>
            {/* Micro-Value Badges Row */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-gray-300/60 max-w-sm">
              <div className="flex items-start space-x-2">
                <div className="p-1 bg-[#E6F3EC] text-[#0A3D24] rounded-md mt-0.5"><Sparkles className="w-3 h-3" /></div>
                <p className="text-[10px] leading-tight text-gray-600 font-semibold">
                  <strong className="text-gray-900 block font-bold tracking-tight">AI-Powered</strong> Career Growth
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="p-1 bg-[#E6F3EC] text-[#0A3D24] rounded-md mt-0.5"><ShieldCheck className="w-3 h-3" /></div>
                <p className="text-[10px] leading-tight text-gray-600 font-semibold">
                  <strong className="text-gray-900 block font-bold tracking-tight">ATS Optimized</strong> Resumes
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="p-1 bg-[#FDF2F4] text-[#E07A8B] rounded-md mt-0.5"><Lock className="w-3 h-3" /></div>
                <p className="text-[10px] leading-tight text-gray-600 font-semibold">
                  <strong className="text-gray-900 block font-bold tracking-tight">Secure &</strong> Trusted
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: HIGH-END APPLICATION INTERACTION FRAME */}
          <div className="lg:col-span-7 bg-white rounded-[24px] border border-gray-200/70 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden flex h-[480px] w-full max-h-[480px]">
            
            {/* SIDEBAR NAVIGATION MOCKUP */}
            <aside className="w-[190px] bg-[#F9F9F6] border-r border-gray-200/50 p-4 flex flex-col justify-between flex-shrink-0 h-full">
              <div className="space-y-4">
                {/* Simulated OS Control dots */}
                <div className="space-y-3">
                  <div className="flex space-x-1.5 px-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E07A8B]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex items-center space-x-2 px-1">
                    <div className="w-5 h-5 rounded-md bg-[#0A3D24] flex items-center justify-center text-white font-bold text-[11px]" style={{ fontFamily: SERIF_FONT }}>V</div>
                    <span className="font-extrabold text-xs tracking-tight text-gray-800">Velora</span>
                  </div>
                </div>

                {/* Main Menu Links */}
                <nav className="space-y-0.5">
                  <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-[11px] font-bold bg-[#E6F3EC] text-[#0A3D24] tracking-tight text-left">
                    <LayoutDashboard className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Dashboard</span>
                  </button>
                  {[
                    { icon: <FileText className="w-3.5 h-3.5" />, label: "Resume Builder" },
                    { icon: <Cpu className="w-3.5 h-3.5" />, label: "ATS Analyzer" },
                    { icon: <Briefcase className="w-3.5 h-3.5" />, label: "Job Matches" },
                    { icon: <MessageSquare className="w-3.5 h-3.5" />, label: "Interview Prep" },
                    { icon: <UserCheck className="w-3.5 h-3.5" />, label: "AI Career Coach" },
                    { icon: <FolderGit2 className="w-3.5 h-3.5" />, label: "Portfolio Review" }
                  ].map((item, idx) => (
                    <button key={idx} className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-[11px] font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all tracking-tight text-left">
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* DYNAMIC AI STATUS CARD */}
              <div className="bg-white border-2 border-emerald-100 rounded-xl p-3 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold tracking-wider text-emerald-800 uppercase flex items-center space-x-1">
                    <Activity className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
                    <span>AI Engine</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-800">
                    <span>Daily Credits</span>
                    <span>85 / 100</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div className="bg-[#0A3D24] h-full rounded-full w-[85%]" />
                  </div>
                </div>
                <p className="text-[8.5px] text-gray-600 font-semibold leading-tight">Refreshes automatically at midnight.</p>
              </div>
            </aside>

            {/* DASHBOARD INNER WORKSPACE FRAME */}
            <section className="flex-1 p-4 flex flex-col justify-between bg-white h-full overflow-hidden">
              
              {/* Profile Welcome Row */}
              <div className="flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-[14px] font-black tracking-tight text-gray-900 flex items-center space-x-1">
                    <span>Good Evening, Sanju</span>
                    <span>👋</span>
                  </h2>
                  <p className="text-[10px] font-bold text-gray-600">Let's make today a step closer to your dream job.</p>
                </div>
                <button className="bg-[#0A3D24] text-white text-[11px] px-3 py-2 rounded-xl font-bold hover:bg-[#072F1D] transition-all flex items-center space-x-1 shadow-sm tracking-tight">
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>New Resume</span>
                </button>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-[9px] text-gray-700 font-extrabold tracking-tight uppercase">Resume Score</p>
                    <h4 className="text-xl font-black text-gray-900 mt-0.5 leading-none tracking-tight">92%</h4>
                    <p className="text-[8.5px] text-emerald-700 font-extrabold mt-1 tracking-tight">↑ 12% <span className="text-gray-600 font-medium">this week</span></p>
                  </div>
                  <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="16" cy="16" r="12" stroke="#F3F4F6" strokeWidth="2" fill="transparent" />
                      <circle cx="16" cy="16" r="12" stroke="#10B981" strokeWidth="2.5" fill="transparent" strokeDasharray={2 * Math.PI * 12} strokeDashoffset={(2 * Math.PI * 12) * (1 - 0.92)} strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-[9px] text-gray-700 font-extrabold tracking-tight uppercase">ATS Score</p>
                    <h4 className="text-xl font-black text-gray-900 mt-0.5 leading-none tracking-tight">89%</h4>
                    <p className="text-[8.5px] text-emerald-700 font-extrabold mt-1 tracking-tight">↑ 8% <span className="text-gray-600 font-medium">this week</span></p>
                  </div>
                  <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="16" cy="16" r="12" stroke="#F3F4F6" strokeWidth="2" fill="transparent" />
                      <circle cx="16" cy="16" r="12" stroke="#E07A8B" strokeWidth="2.5" fill="transparent" strokeDasharray={2 * Math.PI * 12} strokeDashoffset={(2 * Math.PI * 12) * (1 - 0.89)} strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-[9px] text-gray-700 font-extrabold tracking-tight uppercase">Job Matches</p>
                    <h4 className="text-xl font-black text-gray-900 mt-0.5 leading-none tracking-tight">24</h4>
                    <p className="text-[8.5px] text-gray-600 font-bold mt-1 tracking-tight">New matches today</p>
                  </div>
                  <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Central Dynamic Section */}
              <div className="grid grid-cols-12 gap-3 flex-shrink-0">
                <div className="col-span-7 bg-[#F4FAF6] border-2 border-[#CDE7DA] p-3 rounded-xl flex items-center justify-between relative overflow-hidden">
                  <div className="space-y-2 z-10 max-w-[65%]">
                    <div className="flex items-center space-x-1 text-emerald-900 transform scale-105 origin-left text-[9.5px] font-extrabold tracking-wider uppercase">
                      <Sparkles className="w-3 h-3 text-emerald-700" />
                      <span>AI Suggestion</span>
                    </div>
                    <p className="text-[10px] text-gray-800 font-extrabold leading-tight tracking-tight">
                      Add more impact to your resume by improving your project descriptions.
                    </p>
                    <button className="bg-[#0A3D24] text-white text-[9.5px] font-bold px-3 py-1.5 rounded-lg hover:bg-[#072F1D] transition-all shadow-sm tracking-tight">
                      Improve Now
                    </button>
                  </div>
                  
                  {/* Floating AI Robot Drone SVG */}
                  <div className="w-[80px] h-[80px] flex items-center justify-center flex-shrink-0 mr-0.5 animate-[bounce_4.5s_ease-in-out_infinite]">
                    <svg viewBox="0 0 140 140" className="w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                      <defs>
                        <radialGradient id="pinkSphere" cx="45%" cy="35%" r="60%">
                          <stop offset="0%" stopColor="#FFAEC1" />
                          <stop offset="40%" stopColor="#F28EA4" />
                          <stop offset="85%" stopColor="#D66880" />
                          <stop offset="100%" stopColor="#A8445B" />
                        </radialGradient>
                        <linearGradient id="sageGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#A2BBAA" />
                          <stop offset="50%" stopColor="#7E9A87" />
                          <stop offset="100%" stopColor="#5A7463" />
                        </linearGradient>
                        <linearGradient id="screenGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#2A332F" />
                          <stop offset="100%" stopColor="#141A18" />
                        </linearGradient>
                        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="1.5" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <ellipse cx="70" cy="122" rx="22" ry="4" fill="#00E5FF" fillOpacity="0.2" className="animate-pulse" />
                      <path d="M 46,98 C 46,98 70,111 94,98 C 90,110 50,110 46,98 Z" fill="url(#sageGreen)" />
                      <ellipse cx="70" cy="98" rx="24" ry="5" fill="#4B6152" />
                      <circle cx="70" cy="64" r="45" fill="url(#pinkSphere)" />
                      <path d="M 36,38 A 45,45 0 0,1 104,38 Z" fill="url(#sageGreen)" />
                      <ellipse cx="70" cy="37" rx="34" ry="7" fill="#8FA494" opacity="0.4" />
                      <line x1="37" y1="41" x2="103" y2="41" stroke="#4B6152" strokeWidth="0.75" opacity="0.4" />
                      <g transform="translate(23, 64) rotate(-5)">
                        <ellipse cx="0" cy="0" rx="9" ry="18" fill="url(#sageGreen)" />
                        <ellipse cx="-2" cy="0" rx="5" ry="13" fill="#5A7463" />
                        <ellipse cx="3" cy="0" rx="4" ry="11" fill="#EA8198" />
                      </g>
                      <g transform="translate(117, 64) rotate(5)">
                        <ellipse cx="0" cy="0" rx="9" ry="18" fill="url(#sageGreen)" />
                        <ellipse cx="2" cy="0" rx="5" ry="13" fill="#5A7463" />
                        <ellipse cx="-3" cy="0" rx="4" ry="11" fill="#EA8198" />
                      </g>
                      <rect x="36" y="47" width="68" height="42" rx="19" fill="url(#screenGlass)" stroke="#4A5751" strokeWidth="2" />
                      <g filter="url(#neonGlow)">
                        <circle cx="53" cy="65" r="7" fill="#00F5FF" />
                        <circle cx="53" cy="65" r="5.5" fill="#00E5FF" />
                        <circle cx="87" cy="65" r="7" fill="#00F5FF" />
                        <circle cx="87" cy="65" r="5.5" fill="#00E5FF" />
                        <path d="M 63,76 Q 70,82 77,76" stroke="#00F5FF" strokeWidth="3" fill="none" strokeLinecap="round" />
                      </g>
                      <path d="M 40,54 A 24,24 0 0,1 100,54" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.25" strokeLinecap="round" />
                      <ellipse cx="44" cy="54" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.4" transform="rotate(-15 44 54)" />
                    </svg>
                  </div>
                </div>

                {/* Agenda list */}
                <div className="col-span-5 bg-white border border-gray-200 p-3 rounded-xl flex flex-col justify-between shadow-sm">
                  <div>
                    <h4 className="text-[11px] font-extrabold tracking-tight text-gray-900 mb-1.5">Today's Tasks</h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 text-[10px] font-bold text-gray-400 line-through tracking-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Improve Resume</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-[10px] font-bold text-gray-400 line-through tracking-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Run ATS Check</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-[10px] font-bold text-gray-800 tracking-tight">
                        <Circle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                        <span>Practice Interview</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-[9px] font-extrabold text-gray-700 hover:text-gray-900 flex items-center space-x-0.5 self-start tracking-tight pt-1">
                    <span>View All Tasks</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              {/* Lower Section Activities */}
              <div className="grid grid-cols-12 gap-3 flex-shrink-0">
                <div className="col-span-7 space-y-1">
                  <h4 className="text-[11px] font-extrabold tracking-tight text-gray-900 px-0.5">Recent Activity</h4>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between p-2 bg-gray-50/90 rounded-xl text-[9.5px] border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-gray-500 shadow-sm"><FileText className="w-3.5 h-3.5" /></div>
                        <div>
                          <p className="font-extrabold text-gray-900 leading-none tracking-tight">Resume updated</p>
                          <p className="text-[8.5px] text-gray-600 mt-0.5 font-semibold">Software Engineer Resume.pdf</p>
                        </div>
                      </div>
                      <span className="text-[8.5px] text-gray-600 font-bold">2h ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50/90 rounded-xl text-[9.5px] border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-emerald-700 shadow-sm"><Cpu className="w-3.5 h-3.5" /></div>
                        <div>
                          <p className="font-extrabold text-gray-900 leading-none tracking-tight">ATS check completed</p>
                          <p className="text-[8.5px] text-emerald-700 font-extrabold mt-0.5">Score improved by 12%</p>
                        </div>
                      </div>
                      <span className="text-[8.5px] text-gray-600 font-bold">5h ago</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 bg-[#FDF2F4]/60 border border-[#FAD2DA] p-3 rounded-xl flex flex-col justify-between shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-[11px] font-extrabold tracking-tight text-gray-900">Interview Prep</h4>
                      <p className="text-[9.5px] text-gray-700 font-semibold leading-tight">Mock setups with instant AI feedback.</p>
                    </div>
                    <div className="w-6.5 h-6.5 rounded-full bg-[#FCE4E8] flex items-center justify-center text-[#E07A8B] flex-shrink-0">
                      <Mic className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <button className="w-full bg-[#E07A8B] text-white text-[10px] font-bold py-2 rounded-xl hover:bg-[#D66880] transition-all shadow-sm mt-1">
                    Start Practice
                  </button>
                </div>
              </div>

            </section>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="w-full text-center py-1 text-[9px] font-semibold text-gray-500 pointer-events-none flex-shrink-0 tracking-tight mt-auto">
          © 2026 Velora AI Career Systems. All rights reserved.
        </footer>
      </div>
    </>
  );
}