'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVeloraTheme } from '@/component/velora-theme-provider';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  Briefcase, 
  Mic, 
  Bot, 
  Folder, 
  Send, 
  Settings, 
  LogOut, 
  Bell, 
  Sparkles, 
  Plus, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft,
  X,
  Play,
  Trash2,
  Cpu,
  Sun,
  Moon,
  PieChart,
  Layers,
  Compass,
  CalendarDays
} from 'lucide-react';

type StoredProfile = {
  name?: string;
  email?: string;
  status?: string;
  education?: string;
  stream?: string;
  specialization?: string;
  skills?: string[];
  industry?: string;
  toolkit?: string[];
  helpWith?: string[];
};

const defaultProfile: StoredProfile = {
  name: 'Sanju',
  specialization: 'Career Professional',
  stream: 'CSE',
  skills: []
};

type RoleProfile = {
  title: string;
  description: string;
  action: string;
  route: string;
  tags: [string, string];
  tools: string[];
  skills: string[];
};

const roleProfiles: Record<string, RoleProfile> = {
  'Frontend Developer': {
    title: 'Learn your next frontend skill.',
    description: 'Velora found the next useful technology based on your current stack.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Frontend', 'Web Development'],
    tools: ['TypeScript', 'Next.js', 'React', 'Git'],
    skills: ['Accessibility', 'Testing', 'State Management']
  },
  'Backend Developer': {
    title: 'Strengthen your backend stack.',
    description: 'Velora identified the next backend technologies that fit your current skills.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Backend', 'APIs'],
    tools: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    skills: ['REST APIs', 'Authentication', 'System Design']
  },
  'Full Stack Developer': {
    title: 'Upgrade your full stack skills.',
    description: 'Velora is prioritizing the technologies that complete your current full stack profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Full Stack', 'Development'],
    tools: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
    skills: ['REST APIs', 'Authentication', 'Deployment']
  },
  'Software Developer': {
    title: 'Strengthen your core software skills.',
    description: 'Velora is prioritizing the engineering skills that complement your current profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Software', 'Engineering'],
    tools: ['Java', 'Git', 'SQL'],
    skills: ['DSA', 'OOP', 'System Design']
  },
  'AI / ML Engineer': {
    title: 'Build stronger ML skills next.',
    description: 'Velora is prioritizing the next ML tools and skills based on what you already know.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['AI / ML', 'Machine Learning'],
    tools: ['Python', 'TensorFlow', 'Scikit-learn'],
    skills: ['Model Evaluation', 'Feature Engineering', 'MLOps']
  },
  'Data Scientist': {
    title: 'Strengthen your data science stack.',
    description: 'Velora is prioritizing data tools and analytical skills that complement your profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Data Science', 'Analytics'],
    tools: ['Python', 'Pandas', 'Scikit-learn'],
    skills: ['Statistics', 'Data Visualization', 'SQL']
  },
  'Data Analyst': {
    title: 'Upgrade your analytics toolkit.',
    description: 'Velora is prioritizing the next analytics tools based on your current skills.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Analytics', 'Business'],
    tools: ['SQL', 'Power BI', 'Excel', 'Python'],
    skills: ['Data Visualization', 'Statistics', 'Business Analysis']
  },
  'UI / UX Designer': {
    title: 'Strengthen your UX toolkit.',
    description: 'Velora is prioritizing the design tools and skills that fit your current UX profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['UI / UX', 'Design'],
    tools: ['Figma', 'FigJam', 'Maze'],
    skills: ['User Research', 'Usability Testing', 'Design Systems']
  },
  'Robotics Engineer': {
    title: 'Build stronger robotics skills.',
    description: 'Velora is prioritizing robotics technologies that complement your current engineering skills.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Robotics', 'Automation'],
    tools: ['Python', 'ROS', 'C++'],
    skills: ['Computer Vision', 'Control Systems', 'Sensors']
  },
  'Embedded Systems Engineer': {
    title: 'Strengthen your embedded stack.',
    description: 'Velora is prioritizing the next embedded tools based on your selected skills.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Embedded', 'Hardware'],
    tools: ['C', 'C++', 'STM32'],
    skills: ['UART / SPI / I2C', 'Microcontrollers', 'RTOS']
  },
  'IoT Engineer': {
    title: 'Upgrade your IoT foundation.',
    description: 'Velora is prioritizing connectivity and cloud skills for your current IoT path.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['IoT', 'Connected Systems'],
    tools: ['Python', 'MQTT', 'Arduino'],
    skills: ['Cloud Integration', 'Sensors', 'Edge Computing']
  },
  'Cybersecurity Engineer': {
    title: 'Strengthen your security toolkit.',
    description: 'Velora is prioritizing security technologies based on your current profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Cybersecurity', 'Security'],
    tools: ['Linux', 'Wireshark', 'Python'],
    skills: ['Network Security', 'OWASP', 'Threat Analysis']
  },
  'VLSI Design Engineer': {
    title: 'Strengthen your VLSI foundation.',
    description: 'Velora is prioritizing RTL and verification skills for your VLSI profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['VLSI', 'RTL'],
    tools: ['Verilog', 'SystemVerilog', 'Vivado'],
    skills: ['RTL Design', 'Verification', 'Digital Logic']
  },
  'Mechatronics Engineer': {
    title: 'Upgrade your automation skills.',
    description: 'Velora is prioritizing controls, CAD and automation skills for your profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Mechatronics', 'Automation'],
    tools: ['Arduino', 'MATLAB', 'SolidWorks'],
    skills: ['Control Systems', 'CAD', 'Automation']
  },
  'Marketing': {
    title: 'Strengthen your marketing toolkit.',
    description: 'Velora is prioritizing the marketing tools and skills that fit your current profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Marketing', 'Growth'],
    tools: ['Google Analytics', 'Canva', 'HubSpot'],
    skills: ['SEO', 'Content Strategy', 'Analytics']
  },
  'Finance': {
    title: 'Upgrade your finance toolkit.',
    description: 'Velora is prioritizing tools and skills that strengthen your finance profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Finance', 'Analysis'],
    tools: ['Excel', 'Power BI', 'SQL'],
    skills: ['Financial Modeling', 'Forecasting', 'Data Analysis']
  },
  'Business Analytics': {
    title: 'Strengthen your business analytics stack.',
    description: 'Velora is prioritizing analytics tools and business skills based on your profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['Analytics', 'Business'],
    tools: ['SQL', 'Power BI', 'Excel'],
    skills: ['Data Visualization', 'Statistics', 'Business Intelligence']
  },
  'Human Resources': {
    title: 'Strengthen your HR analytics skills.',
    description: 'Velora is prioritizing HR and people-analytics skills for your current profile.',
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: ['HR', 'People Analytics'],
    tools: ['Excel', 'Power BI', 'Workday'],
    skills: ['Recruitment', 'People Analytics', 'HR Analytics']
  }
};

const roleAliases: Record<string, string> = {
  'UI/UX Designer': 'UI / UX Designer',
  'UI UX Designer': 'UI / UX Designer',
  'UX/UI Designer': 'UI / UX Designer',
  'AI/ML Engineer': 'AI / ML Engineer',
  'ML Engineer': 'AI / ML Engineer',
  'Machine Learning Engineer': 'AI / ML Engineer',
  'Software Engineer': 'Software Developer',
  'Embedded Engineer': 'Embedded Systems Engineer',
  'IoT Developer': 'IoT Engineer',
  'Data Analytics': 'Data Analyst',
  'HR': 'Human Resources'
};

const domainFallbacks: Record<string, { tools: string[]; skills: string[] }> = {
  CSE: {
    tools: ['Git', 'SQL', 'Python'],
    skills: ['DSA', 'System Design', 'Problem Solving']
  },
  IT: {
    tools: ['Git', 'SQL', 'Cloud'],
    skills: ['APIs', 'Cybersecurity', 'System Design']
  },
  ECE: {
    tools: ['C', 'C++', 'MATLAB'],
    skills: ['Embedded Systems', 'Communication Protocols', 'Digital Logic']
  },
  EEE: {
    tools: ['MATLAB', 'PLC', 'C'],
    skills: ['Control Systems', 'Embedded Systems', 'Power Systems']
  },
  Mechanical: {
    tools: ['SolidWorks', 'MATLAB', 'AutoCAD'],
    skills: ['CAD', 'Manufacturing', 'Automation']
  },
  Civil: {
    tools: ['AutoCAD', 'Revit', 'STAAD.Pro'],
    skills: ['Structural Design', 'Project Planning', 'Quantity Estimation']
  },
  MBA: {
    tools: ['Excel', 'Power BI', 'SQL'],
    skills: ['Business Analysis', 'Communication', 'Decision Making']
  },
  MCA: {
    tools: ['Java', 'SQL', 'Git'],
    skills: ['DSA', 'Software Development', 'System Design']
  }
};

const normalizeSkill = (value: string) =>
  value.toLowerCase().replace(/\s+/g, ' ').trim();

const hasSkill = (skills: string[], target: string) => {
  const t = normalizeSkill(target);
  return skills.some(skill => {
    const s = normalizeSkill(skill);
    return s === t || s.includes(t) || t.includes(s);
  });
};

const resolveRole = (specialization: string) => {
  if (roleProfiles[specialization]) return specialization;
  if (roleAliases[specialization]) return roleAliases[specialization];

  const normalized = normalizeSkill(specialization);
  return Object.keys(roleProfiles).find(role => {
    const candidate = normalizeSkill(role);
    return candidate === normalized || candidate.includes(normalized) || normalized.includes(candidate);
  }) || null;
};

type RecommendationItem = {
  name: string;
  type: 'Tool / Language' | 'Skill';
  status: 'High Priority' | 'Next Skill';
};

const resolveDomainData = (stream: string) => {
  if (domainFallbacks[stream]) {
    return domainFallbacks[stream];
  }

  const normalized = normalizeSkill(stream);

  const aliases: Record<string, keyof typeof domainFallbacks> = {
    'computer science': 'CSE',
    'computer science engineering': 'CSE',
    'information technology': 'IT',
    'information technology engineering': 'IT',
    'electronics and communication engineering': 'ECE',
    'electronics communication engineering': 'ECE',
    'electrical and electronics engineering': 'EEE',
    'mechanical engineering': 'Mechanical',
    'civil engineering': 'Civil',
    'master of business administration': 'MBA',
    'master of computer applications': 'MCA'
  };

  for (const [key, domainKey] of Object.entries(aliases)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return domainFallbacks[domainKey];
    }
  }

  return domainFallbacks.CSE;
};

const analyzeProfile = (
  stream: string,
  specialization: string,
  skills: string[]
) => {
  const resolvedRole = resolveRole(specialization);
  const roleData = resolvedRole ? roleProfiles[resolvedRole] : null;
  const domainData = resolveDomainData(stream);

  const toolCandidates = roleData?.tools || domainData.tools;
  const skillCandidates = roleData?.skills || domainData.skills;

  const recommendations: RecommendationItem[] = [];

  for (const tool of toolCandidates) {
    if (!hasSkill(skills, tool) && !recommendations.some(item => normalizeSkill(item.name) === normalizeSkill(tool))) {
      recommendations.push({
        name: tool,
        type: 'Tool / Language',
        status: recommendations.length < 2 ? 'High Priority' : 'Next Skill'
      });
    }
  }

  for (const skill of skillCandidates) {
    if (!hasSkill(skills, skill) && !recommendations.some(item => normalizeSkill(item.name) === normalizeSkill(skill))) {
      recommendations.push({
        name: skill,
        type: 'Skill',
        status: recommendations.length < 2 ? 'High Priority' : 'Next Skill'
      });
    }
  }

  const priorities = recommendations.slice(0, 3);
  const first = priorities[0]?.name || toolCandidates[0] || 'Your next skill';

  return {
    resolvedRole,
    roleData,
    priorities,
    nextPriority: first,
    title: `Learn ${first} next.`,
    description: roleData?.description || `Velora is using your ${stream} domain, ${specialization} specialization and selected skills to identify your next focus.`,
    action: 'View Skill Gap',
    route: '/skill-gap',
    tags: roleData?.tags || [stream, specialization] as [string, string]
  };
};

export default function DashboardPage() {
  const router = useRouter();

  const { darkMode, toggleTheme } = useVeloraTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [activeChartModal, setActiveChartModal] = useState<string | null>(null);
  const [profile, setProfile] = useState<StoredProfile>(defaultProfile);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('veloraProfile');
      if (!saved) return;
      const parsed = JSON.parse(saved) as StoredProfile;
      setProfile({
        ...defaultProfile,
        ...parsed,
        name: parsed.name?.trim() || defaultProfile.name,
        specialization: parsed.specialization?.trim() || defaultProfile.specialization,
        skills: Array.isArray(parsed.skills) ? parsed.skills : []
      });
    } catch {
      setProfile(defaultProfile);
    }
  }, []);

  const firstName = profile.name?.trim()?.split(/\s+/)[0] || 'Sanju';
  const specialization = profile.specialization?.trim() || 'Career Professional';
  const stream = profile.stream?.trim() || 'CSE';
  const selectedSkills = Array.isArray(profile.skills) ? profile.skills : [];

  const analysis = analyzeProfile(
    stream,
    specialization,
    selectedSkills
  );

  const currentInsight = {
    title: analysis.title,
    description: analysis.description,
    action: analysis.action,
    route: analysis.route,
    tags: analysis.tags
  };

  const prioritySkills = analysis.priorities.map(item => item.name);
  const nextPriority = analysis.nextPriority;

  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const [reminders, setReminders] = useState<
    { id: number; date: string; text: string }[]
  >([]);


  const [chatInput, setChatInput] = useState('');

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello ${firstName}! I'm Velora AI. What would you like to improve today?`
    }
  ]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const handlePrevMonth = () => {
    const nextMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    const nextYear =
      selectedMonth === 0 ? selectedYear - 1 : selectedYear;

    const maxDay = new Date(
      nextYear,
      nextMonth + 1,
      0
    ).getDate();

    setSelectedMonth(nextMonth);
    setSelectedYear(nextYear);
    setSelectedDay(prev => Math.min(prev, maxDay));
  };

  const handleNextMonth = () => {
    const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const nextYear =
      selectedMonth === 11 ? selectedYear + 1 : selectedYear;

    const maxDay = new Date(
      nextYear,
      nextMonth + 1,
      0
    ).getDate();

    setSelectedMonth(nextMonth);
    setSelectedYear(nextYear);
    setSelectedDay(prev => Math.min(prev, maxDay));
  };

  const getDateKey = (
    year: number,
    month: number,
    day: number
  ) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const daysInSelectedMonth = new Date(
    selectedYear,
    selectedMonth + 1,
    0
  ).getDate();

  const firstDayMondayIndex =
    (new Date(
      selectedYear,
      selectedMonth,
      1
    ).getDay() + 6) % 7;

  const calendarCells = Array.from(
    {
      length:
        firstDayMondayIndex +
        daysInSelectedMonth
    },
    (_, index) =>
      index < firstDayMondayIndex
        ? null
        : index - firstDayMondayIndex + 1
  );

  const selectedDateKey = getDateKey(
    selectedYear,
    selectedMonth,
    selectedDay
  );

  const selectedDateReminders = reminders.filter(
    reminder => reminder.date === selectedDateKey
  );

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
  };

  const handleAddReminder = () => {
    const newRem = prompt(
      `Add a reminder for ${months[selectedMonth]} ${selectedDay}, ${selectedYear}:`
    );

    if (!newRem?.trim()) return;

    setReminders(prev => [
      ...prev,
      {
        id: Date.now(),
        date: selectedDateKey,
        text: newRem.trim()
      }
    ]);
  };

  const handleDeleteReminder = (
    idToDelete: number
  ) => {
    setReminders(prev =>
      prev.filter(
        reminder => reminder.id !== idToDelete
      )
    );
  };

  const handleSendChat = (
    textToSend?: string
  ) => {
    const text = textToSend || chatInput;

    if (!text.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text
      }
    ]);

    if (!textToSend) {
      setChatInput('');
    }

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `For your ${specialization} path, your next priority is ${nextPriority}.`
        }
      ]);
    }, 600);
  };

  const handleNavigation = (path: string) => {
    try {
      router.push(path);
    } catch (error) {
      console.log(
        `Navigation placeholder to: ${path}`
      );
    }
  };

  const learningTopics = analysis.priorities.map((item, index) => ({
    id: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: item.name,
    statusText: item.status,
    statusColor:
      index === 0
        ? 'text-[#D3968C]'
        : index === 1
          ? 'text-[#839958]'
          : 'text-[#105666]',
    statusBg:
      index === 0
        ? 'bg-[#D3968C]/20'
        : index === 1
          ? 'bg-[#839958]/20'
          : 'bg-[#105666]/20',
    icon:
      index === 0
        ? Cpu
        : index === 1
          ? Layers
          : Compass,
    iconColor:
      index === 0
        ? 'text-[#D3968C] bg-[#D3968C]/20'
        : index === 1
          ? 'text-[#839958] bg-[#839958]/20'
          : 'text-[#105666] bg-[#105666]/20'
  }));


  return (
    <div
      className={`w-full h-screen overflow-hidden ${
        darkMode
          ? 'bg-[#071F15] text-[#F7F4D5]'
          : 'bg-[#FAF8F2] text-[#0A3323]'
      } flex font-sans p-3 select-none relative transition-colors duration-300`}
    >

      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(10, 51, 35, 0.22) transparent;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(10, 51, 35, 0.22);
          border-radius: 999px;
        }
      `}</style>

      {/* ================= LEFT SIDEBAR ================= */}

      <aside
        className={`w-56 ${
          darkMode
            ? 'bg-[#0D2D22] border-white/15'
            : 'bg-[#F2EDE2] border-[#0A3323]/15'
        } rounded-[24px] p-3 flex flex-col justify-between flex-shrink-0 border mr-3 shadow-xs self-start sticky top-3`}
      >
        <div className="space-y-4 flex-1 flex flex-col">

          <div className="bg-[#0A3323] text-[#F7F4D5] p-3 rounded-2xl flex flex-col items-center text-center shadow-md border border-[#839958]/30">

            <div className="w-8 h-7 mb-1 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Velora Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display =
                    'none';
                }}
              />
            </div>

            <h1 className="text-base font-serif font-bold tracking-widest uppercase leading-none text-[#F7F4D5]">
              Velora
            </h1>

            <p className="text-[8px] font-bold text-[#D3968C] uppercase tracking-[0.2em] mt-1">
              AI CAREER COMPANION
            </p>
          </div>

          <nav className="space-y-1.5 flex-1 flex flex-col justify-between py-1">

            <button
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold text-xs cursor-pointer shadow-2xs ${
                darkMode
                  ? 'bg-[#839958] text-white'
                  : 'bg-[#F7F4D5] text-[#0A3323]'
              }`}
            >
              <LayoutDashboard
                className={`w-4 h-4 ${
                  darkMode
                    ? 'text-white'
                    : 'text-[#105666]'
                }`}
              />
              <span>Dashboard</span>
            </button>

            {[
              {
                label: 'Resume Builder',
                icon: FileText,
                color: 'text-[#839958]',
                path: '/resume-builder'
              },
              {
                label: 'ATS Checker',
                icon: Target,
                color: 'text-[#D3968C]'
              },
              {
                label: 'Cover Letter Builder',
                icon: FileText,
                color: 'text-[#105666]'
              },
              {
                label: 'Skill Gap Analysis',
                icon: Briefcase,
                color: 'text-[#105666]'
              },
               {
                label: 'Portfolio Builder',
                icon: FileText,
                color: 'text-[#105666]'
              },
              {
                label: 'Interview Prep',
                icon: Mic,
                color: 'text-[#839958]'
              },
          
              {
                label: 'My Documents',
                icon: Folder,
                color: 'text-[#105666]'
              },
              {
                label: 'Settings',
                icon: Settings,
                color: darkMode
                  ? 'text-white/90'
                  : 'text-[#0A3323]'
              }
            ].map((item, idx) => (
              <button
                key={idx}
                 onClick={() => item.path && handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  darkMode
                    ? 'text-white/80 hover:bg-[#163A2E] hover:text-white hover:font-bold'
                    : 'text-[#0A3323]/80 hover:bg-[#0A3323]/10 hover:text-[#0A3323] hover:font-bold'
                }`}
              >
                <item.icon
                  className={`w-4 h-4 ${item.color}`}
                />
                <span>{item.label}</span>
              </button>
            ))}

          </nav>
        </div>

        <div className="space-y-2 pt-3 border-t border-current/15">

          <div className="flex items-center justify-between bg-[#105666] text-white p-2.5 rounded-xl cursor-pointer hover:bg-[#105666]/90 transition-all border border-white/15">

            <div className="flex items-center space-x-2.5">

              <div className="w-7 h-7 rounded-lg bg-[#839958] flex items-center justify-center text-xs font-bold overflow-hidden border border-white/20">
                👨‍💻
              </div>

              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-none">
                  {firstName}
                </span>
                <span className="text-[9px] text-[#F7F4D5]/90 mt-0.5">
                  View Profile
                </span>
              </div>

            </div>

            <ChevronRight className="w-4 h-4 text-[#F7F4D5]/90" />

          </div>

          <button
            onClick={() =>
              router.push('/login')
            }
            className={`w-full flex items-center space-x-2 px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              darkMode
                ? 'text-white/80 hover:text-[#D3968C]'
                : 'text-[#0A3323]/80 hover:text-[#D3968C]'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>

        </div>
      </aside>

      {/* ================= CENTER CONTENT ================= */}

      <main className="flex-1 flex flex-col space-y-2 mr-3 min-w-0 min-h-0 overflow-hidden">

        <header className="flex items-center justify-between flex-shrink-0 pt-1 pb-1 gap-5 min-h-[48px]">

          <div className="flex items-center space-x-4 min-w-0">

            <h2
              className={`text-xl font-serif font-bold ${
                darkMode
                  ? 'text-white'
                  : 'text-[#0A3323]'
              } whitespace-nowrap`}
            >
              Good Morning, {firstName}
            </h2>

            <span
              className={`text-xs font-medium border-l pl-3 hidden lg:inline-block ${
                darkMode
                  ? 'text-white/70 border-white/25'
                  : 'text-[#0A3323]/70 border-[#0A3323]/25'
              }`}
            >
             Let's build your career path with Velora AI.
            </span>

          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">

            <button
              onClick={() =>
                handleNavigation(
                  '/career-map'
                )
              }
              className={`flex items-center space-x-2 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer whitespace-nowrap border ${
                darkMode
                  ? 'bg-[#105666] hover:bg-[#105666]/90 text-white border-[#839958]/60'
                  : 'bg-[#105666] hover:bg-[#105666]/90 text-white border-[#839958]/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Career Map</span>
            </button>

            <button
              onClick={() =>
                handleNavigation(
                  '/resume-builder'
                )
              }
              className="flex items-center space-x-2 bg-[#0A3323] hover:bg-[#0A3323]/80 text-[#F7F4D5] border border-[#839958]/60 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Resume</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`p-1.5 border rounded-full transition-all shadow-2xs cursor-pointer ${
                darkMode
                  ? 'bg-[#0D2D22] border-white/25 text-[#F7F4D5] hover:bg-white/15'
                  : 'bg-white/90 border-[#0A3323]/20 text-[#0A3323] hover:bg-white'
              }`}
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-[#F7F4D5]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#0A3323]" />
              )}
            </button>

            <div className="relative">

              <button
                onClick={() =>
                  setShowNotifications(
                    !showNotifications
                  )
                }
                className={`p-1.5 border rounded-full transition-all shadow-2xs relative cursor-pointer ${
                  darkMode
                    ? 'bg-[#0D2D22] border-white/25 text-white hover:bg-white/15'
                    : 'bg-white/90 border-[#0A3323]/20 text-[#0A3323] hover:bg-white'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="w-1.5 h-1.5 bg-[#D3968C] rounded-full absolute top-0.5 right-0.5" />
              </button>

              {showNotifications && (
                <div
                  className={`absolute right-0 mt-2 w-56 border rounded-2xl p-2.5 shadow-xl z-50 text-xs space-y-1.5 ${
                    darkMode
                      ? 'bg-[#0D2D22] border-white/25 text-white'
                      : 'bg-white border-[#0A3323]/15 text-[#0A3323]'
                  }`}
                >
                  <p className="font-bold border-b border-current/15 pb-1">
                    Notifications
                  </p>

                  <p className="opacity-90 text-[11px]">
                    📌 Your {specialization} skill analysis is ready.
                  </p>
                </div>
              )}

            </div>

            <button
              onClick={() =>
                setShowChatDrawer(true)
              }
              className={`p-1.5 border rounded-full transition-all shadow-2xs cursor-pointer ${
                darkMode
                  ? 'bg-[#0D2D22] border-white/25 text-[#F7F4D5]'
                  : 'bg-[#105666] text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>

          </div>
        </header>

        {/* ================= AI BANNER ================= */}

        <div
          className={`relative overflow-hidden flex-shrink-0 min-h-[112px] p-3.5 sm:p-4 rounded-[20px] border-2 shadow-xs ${
            darkMode
              ? 'bg-[#0D2D22] border-[#839958]/70 text-white'
              : 'bg-[#F7F4D5] border-[#839958]/60 text-[#0A3323]'
          }`}
        >

          <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/30 blur-2xl pointer-events-none" />

          <div className="absolute right-28 bottom-0 w-24 h-10 rounded-full bg-[#839958]/10 blur-xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-4 h-full">

            <div className="min-w-0 flex-1 max-w-[72%]">

              <div className="flex items-center gap-2 mb-1.5">

                <div className="w-6 h-6 rounded-full bg-[#0A3323] flex items-center justify-center shadow-xs flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-[#D3968C]" />
                </div>

                <div>

                  <p className="text-[11px] font-bold tracking-wide uppercase leading-none">
                    Velora AI Insight ✨
                  </p>

                  <span className="inline-flex items-center gap-1 mt-1 text-[8px] font-semibold px-2 py-0.5 rounded-full bg-white/45 border border-[#839958]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D3968C]" />
                    Personalized for {specialization}
                  </span>

                </div>

              </div>

              <h3 className="text-[15px] sm:text-base font-serif font-bold leading-tight">
                {currentInsight.title}
              </h3>

              <p className="text-[10px] sm:text-[11px] leading-relaxed opacity-80 mt-1 max-w-xl whitespace-nowrap overflow-hidden text-ellipsis">
  Your next focus is {nextPriority}.
</p>

              <div className="flex items-center gap-2.5 mt-2">

                <button
                  onClick={() =>
                    handleNavigation(
                      currentInsight.route
                    )
                  }
                  className="inline-flex items-center gap-1.5 bg-[#0A3323] hover:bg-[#0A3323]/90 text-[#F7F4D5] border border-[#839958]/50 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
                >
                  {currentInsight.action}
                  <ChevronRight className="w-3 h-3" />
                </button>

                <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-semibold opacity-70">
                  <Compass className="w-3 h-3 text-[#839958]" />
                  {prioritySkills.slice(0, 2).join(' • ')}
                </span>

              </div>
            </div>

            <div className="relative w-24 h-24 sm:w-28 sm:h-24 flex-shrink-0 pointer-events-none -mr-1">

              <div className="absolute inset-2 rounded-full bg-white/35 blur-md" />

              <svg
                viewBox="0 0 120 110"
                className="relative w-full h-full"
              >
                <path
                  d="M60 101 Q57 72 60 39"
                  stroke="#839958"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />

                <path
                  d="M59 73 Q38 57 22 63 Q37 78 59 77"
                  fill="#839958"
                />

                <path
                  d="M60 57 Q82 42 98 49 Q83 65 60 62"
                  fill="#6F8B49"
                />

                <path
                  d="M60 42 C50 33 48 22 57 15 C64 23 64 33 60 42Z"
                  fill="#D3968C"
                />

                <path
                  d="M61 41 C64 27 73 18 82 22 C82 34 73 42 61 45Z"
                  fill="#E0A097"
                />

                <path
                  d="M58 41 C48 32 39 29 35 37 C40 48 50 49 58 45Z"
                  fill="#D3968C"
                />

                <circle
                  cx="61"
                  cy="38"
                  r="4"
                  fill="#F2C6A8"
                />
              </svg>

            </div>

          </div>
        </div>

        {/* ================= METRICS ================= */}

        <div className="grid grid-cols-3 gap-3 flex-shrink-0">

          <div
            onClick={() =>
              setActiveChartModal(
                'Resume Score Analysis'
              )
            }
            className={`p-3.5 rounded-xl shadow-xs flex items-center justify-between border-2 transition-transform hover:scale-[1.01] cursor-pointer ${
              darkMode
                ? 'bg-[#143B2C] border-[#839958]'
                : 'bg-[#839958]/15 border-[#839958]/50'
            }`}
          >
            <div>

              <div className="flex items-center space-x-1 text-[11px] font-bold opacity-90 mb-0.5">
                <FileText className="w-3.5 h-3.5 text-[#839958]" />
                <span>Resume Score</span>
              </div>

              <div className="text-xl font-bold">
                92%
              </div>

              <span className="text-[9px] font-bold text-[#839958]">
                Click for Pie Breakdown
              </span>

            </div>

            <div className="p-2 rounded-full bg-[#839958]/25 border border-[#839958]/50">
              <PieChart className="w-5 h-5 text-[#839958]" />
            </div>

          </div>

          <div
            onClick={() =>
              setActiveChartModal(
                'ATS Score Breakdown'
              )
            }
            className={`p-3.5 rounded-xl shadow-xs flex items-center justify-between border-2 transition-transform hover:scale-[1.01] cursor-pointer ${
              darkMode
                ? 'bg-[#103D47] border-[#105666]'
                : 'bg-[#105666]/15 border-[#105666]/50'
            }`}
          >
            <div>

              <div className="flex items-center space-x-1 text-[11px] font-bold opacity-90 mb-0.5">
                <Target className="w-3.5 h-3.5 text-[#105666]" />
                <span>ATS Score</span>
              </div>

              <div className="text-xl font-bold">
                89%
              </div>

              <span className="text-[9px] font-bold text-[#105666]">
                Click for Pie Breakdown
              </span>

            </div>

            <div className="p-2 rounded-full bg-[#105666]/25 border border-[#105666]/50">
              <PieChart className="w-5 h-5 text-[#105666]" />
            </div>

          </div>

          <div
            onClick={() =>
              setActiveChartModal(
                'Profile Match Analysis'
              )
            }
            className={`p-3.5 rounded-xl shadow-xs flex items-center justify-between border-2 transition-transform hover:scale-[1.01] cursor-pointer ${
              darkMode
                ? 'bg-[#422221] border-[#D3968C]'
                : 'bg-[#D3968C]/20 border-[#D3968C]/60'
            }`}
          >
            <div>

              <div className="flex items-center space-x-1 text-[11px] font-bold opacity-90 mb-0.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#D3968C]" />
                <span>Profile Match</span>
              </div>

              <div className="text-xl font-bold">
                {Math.min(96, 72 + (profile.specialization ? 7 : 0) + (profile.stream ? 4 : 0) + (selectedSkills.length >= 3 ? 2 : 0) + (selectedSkills.length >= 6 ? 4 : 0))}%
              </div>

              <span className="text-[9px] font-bold text-[#D3968C]">
                Strong fit for {specialization}
              </span>

            </div>

            <div className="p-2 rounded-full bg-[#D3968C]/25 border border-[#D3968C]/50">
              <TrendingUp className="w-5 h-5 text-[#D3968C]" />
            </div>

          </div>

        </div>

        {/* ================= BOTTOM MODULES ================= */}

        <div className="flex-1 min-h-0 grid grid-cols-2 gap-3 pb-1 mt-2 overflow-hidden">

          <div
            className={`min-h-0 overflow-hidden p-3.5 rounded-[20px] shadow-2xs flex flex-col border-2 ${
              darkMode
                ? 'bg-[#0D2D22] border-white/15'
                : 'bg-white/90 border-[#0A3323]/20'
            }`}
          >

            <h4 className="text-xs font-bold mb-3 flex-shrink-0">
              Continue Working
            </h4>

            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 flex flex-col gap-2.5 scrollbar-thin">

              {[
                {
                  title: 'Resume Builder',
                  sub: 'Continue where you left off',
                  pct: '75%',
                  color: 'bg-[#839958]',
                  icon: FileText,
                  iconColor:
                    'text-[#839958] bg-[#839958]/20',
                  path: '/resume-builder'
                    
                },
                {
                  title: 'Domain-Wise Mock Interview',
                  sub: `Continue ${specialization} session`,
                  pct: '40%',
                  color: 'bg-[#D3968C]',
                  icon: Mic,
                  iconColor:
                    'text-[#D3968C] bg-[#D3968C]/20'
                },
                {
                  title: 'Portfolio Builder',
                  sub: 'Add your case studies',
                  pct: '60%',
                  color: 'bg-[#105666]',
                  icon: Folder,
                  iconColor:
                    'text-[#105666] bg-[#105666]/20'
                },
                {
                  title: 'Cover Letter',
                  sub: 'Create a new cover letter',
                  pct: '20%',
                  color: 'bg-[#839958]',
                  icon: FileText,
                  iconColor:
                    'text-[#839958] bg-[#839958]/20'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => item.path && handleNavigation(item.path)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                    darkMode
                      ? 'bg-[#163A2E] border-white/15 hover:border-[#839958]'
                      : 'bg-[#FAF8F2] border-[#0A3323]/15 hover:border-[#0A3323]/40 shadow-2xs'
                  }`}
                >

                  <div className="flex items-center space-x-2.5">

                    <div
                      className={`p-1.5 rounded-lg ${item.iconColor}`}
                    >
                      <item.icon className="w-3.5 h-3.5" />
                    </div>

                    <div>
                      <p className="text-xs font-bold leading-tight">
                        {item.title}
                      </p>

                      <p className="text-[9.5px] opacity-70 mt-0.5">
                        {item.sub}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center space-x-2">

                    <span className="text-[10px] font-bold opacity-80">
                      {item.pct}
                    </span>

                    <div className="w-8 bg-current/15 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`${item.color} h-full`}
                        style={{
                          width: item.pct
                        }}
                      />
                    </div>

                  </div>

                </div>
              ))}

            </div>
          </div>

          <div
            className={`min-h-0 overflow-hidden p-3.5 rounded-[20px] shadow-2xs flex flex-col border-2 ${
              darkMode
                ? 'bg-[#0D2D22] border-white/15'
                : 'bg-white/90 border-[#0A3323]/20'
            }`}
          >

            <div className="flex items-center justify-between mb-3 flex-shrink-0">

              <div className="min-w-0">
                <h4 className="text-xs font-bold">
                  What to Learn to Upgrade Yourself
                </h4>
                <p className="text-[8px] opacity-60 mt-0.5 truncate">
                  Based on {stream} • {specialization} • {selectedSkills.length} selected skill{selectedSkills.length === 1 ? '' : 's'}
                </p>
              </div>

              <button
                onClick={() =>
                  handleNavigation('/skill-gap')
                }
                className="flex items-center text-[10px] font-bold text-[#105666] hover:underline cursor-pointer"
              >
                View All
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </button>

            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 flex flex-col gap-2.5 scrollbar-thin">

              {learningTopics.map(
                (item, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      handleNavigation('/skill-gap')
                    }
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      darkMode
                        ? 'bg-[#163A2E] border-white/15 hover:border-[#105666]'
                        : 'bg-[#FAF8F2] border-[#0A3323]/15 hover:border-[#0A3323]/40 shadow-2xs'
                    }`}
                  >

                    <div className="flex items-center space-x-2.5 w-full">

                      <div
                        className={`p-1.5 rounded-lg flex-shrink-0 ${item.iconColor}`}
                      >
                        <item.icon className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="flex items-center justify-between">

                          <p className="text-xs font-bold leading-tight truncate pr-2">
                            {item.title}
                          </p>

                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${item.statusBg} ${item.statusColor}`}
                          >
                            {item.statusText}
                          </span>

                        </div>

                        <div className="flex items-center justify-between mt-1.5">
                          <p className="text-[9.5px] opacity-70 font-medium">
                            {analysis.priorities.find(priority => priority.name === item.title)?.type || 'Priority Skill'}
                          </p>

                          <ChevronRight className="w-3.5 h-3.5 opacity-50 ml-0.5" />
                        </div>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          </div>

        </div>
      </main>

      {/* ================= RIGHT SIDEBAR ================= */}

      <aside className="w-64 h-[calc(100vh-24px)] flex flex-col gap-3 flex-shrink-0 self-start sticky top-3 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain pr-1">

        {/* =====================================================
            COMPACT UPGRADED CALENDAR
            ===================================================== */}

        <div
          className={`p-2.5 rounded-[22px] shadow-2xs flex-shrink-0 border-2 overflow-hidden ${
            darkMode
              ? 'bg-[#0D2D22] border-white/15'
              : 'bg-white border-[#0A3323]/20'
          }`}
        >

          {/* CALENDAR HEADER */}

          <div
            className={`relative rounded-[16px] px-2 py-1.5 border ${
              darkMode
                ? 'bg-[#163A2E] border-white/10'
                : 'bg-[#FAF8F2] border-[#0A3323]/10'
            }`}
          >

            <div className="relative flex items-center justify-between">

              <button
                onClick={handlePrevMonth}
                aria-label="Previous month"
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#839958]/15 hover:text-[#D3968C] cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex flex-col items-center">

                <span className="font-serif tracking-wide text-[13px] font-bold">
                  {months[selectedMonth]} {selectedYear}
                </span>

                <span className="w-6 h-0.5 rounded-full bg-[#D3968C] mt-0.5 opacity-70" />

              </div>

              <div className="flex items-center gap-0.5">

                <button
                  onClick={handleNextMonth}
                  aria-label="Next month"
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#839958]/15 hover:text-[#D3968C] cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="w-6 h-6 rounded-full bg-[#839958]/15 flex items-center justify-center">
                  <CalendarDays className="w-3 h-3 text-[#0A3323]" />
                </div>

              </div>

            </div>
          </div>

          {/* WEEK DAYS */}

          <div className="grid grid-cols-7 gap-0 text-center text-[7px] font-bold opacity-60 mt-2 mb-0.5">

            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>

            <span className="text-[#105666]">
              Sat
            </span>

            <span className="text-[#D3968C]">
              Sun
            </span>

          </div>

          {/* DATE GRID */}

          <div className="grid grid-cols-7 gap-y-0 text-center text-[9px] font-medium">

            {calendarCells.map(
              (day, idx) => {

                if (!day) {
                  return (
                    <span
                      key={`empty-${idx}`}
                      className="h-6"
                    />
                  );
                }

                const dateKey =
                  getDateKey(
                    selectedYear,
                    selectedMonth,
                    day
                  );

                const hasReminder =
                  reminders.some(
                    reminder =>
                      reminder.date ===
                      dateKey
                  );

                const isSelected =
                  day === selectedDay;

                const isToday =
                  day === today.getDate() &&
                  selectedMonth ===
                    today.getMonth() &&
                  selectedYear ===
                    today.getFullYear();

                return (
                  <button
                    key={dateKey}
                    type="button"
                    onClick={() =>
                      handleSelectDay(day)
                    }
                    className={`relative h-6 w-6 mx-auto rounded-full flex items-center justify-center text-[8.5px] transition-all cursor-pointer font-semibold ${
                      isSelected
                        ? 'bg-[#0A3323] text-white font-bold shadow-sm scale-105'
                        : 'hover:bg-[#839958]/20'
                    } ${
                      isToday &&
                      !isSelected
                        ? 'ring-1 ring-[#D3968C] font-bold'
                        : ''
                    }`}
                  >

                    {day}

                    {hasReminder &&
                      !isSelected && (
                        <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#839958]" />
                      )}

                    {hasReminder &&
                      isSelected && (
                        <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#D3968C]" />
                      )}

                  </button>
                );
              }
            )}

          </div>

          {/* LEGEND */}

          <div className="flex items-center gap-3 text-[7px] font-semibold opacity-70 mt-1.5 px-1">

            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#839958]" />
              Event
            </span>

            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D3968C]" />
              Selected
            </span>

          </div>

          {/* SELECTED DATE / EVENTS */}

          <div
            className={`mt-1.5 rounded-[13px] border p-2 ${
              darkMode
                ? 'bg-[#163A2E] border-white/15'
                : 'bg-[#FAF8F2] border-[#0A3323]/12'
            }`}
          >

            <div className="flex items-center justify-between mb-1.5">

              <div className="flex items-center gap-1.5 min-w-0">

                <div className="w-5 h-5 rounded-md bg-[#839958]/15 flex items-center justify-center flex-shrink-0">
                  <CalendarDays className="w-3 h-3 text-[#839958]" />
                </div>

                <p className="text-[8px] font-bold truncate">
                  {months[selectedMonth]} {selectedDay}, {selectedYear}
                </p>

              </div>

              <span className="text-[7px] text-[#105666] bg-[#105666]/10 px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap">
                {selectedDateReminders.length}{' '}
                event
                {selectedDateReminders.length ===
                1
                  ? ''
                  : 's'}
              </span>

            </div>

            {selectedDateReminders.length >
            0 ? (

              <div className="space-y-1 max-h-14 overflow-y-auto pr-0.5 scrollbar-thin">

                {selectedDateReminders.map(
                  reminder => (
                    <div
                      key={reminder.id}
                      className="flex items-center justify-between gap-1.5 text-[7.5px] p-1.5 rounded-lg bg-white/70 border border-[#0A3323]/10"
                    >

                      <div className="flex items-center gap-1 min-w-0">

                        <span className="w-1.5 h-1.5 rounded-full bg-[#D3968C] flex-shrink-0" />

                        <span className="truncate font-semibold">
                          {reminder.text}
                        </span>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteReminder(
                            reminder.id
                          )
                        }
                        className="text-[#D3968C] hover:scale-110 flex-shrink-0 cursor-pointer transition-transform"
                        aria-label="Delete reminder"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                    </div>
                  )
                )}

              </div>

            ) : (

              <p className="text-[7.5px] opacity-60 italic">
                No scheduled reminders.
              </p>

            )}

          </div>

          {/* ADD EVENT BUTTON */}

          <button
            onClick={handleAddReminder}
            className="w-full flex items-center justify-center gap-1.5 bg-[#0A3323] hover:bg-[#0A3323]/90 text-[#F7F4D5] text-[9px] font-bold py-2 rounded-lg mt-1.5 transition-all shadow-2xs cursor-pointer border border-[#839958]/50"
          >
            <Plus className="w-3 h-3" />
            <span>Add Event / Reminder</span>
          </button>

        </div>

        {/* ================= AI CAREER COACH ================= */}

        <div
          className={`p-3.5 rounded-[20px] shadow-2xs space-y-2.5 border-2 ${
            darkMode
              ? 'bg-[#0D2D22] border-white/15'
              : 'bg-[#F2EDE2] border-[#0A3323]/20'
          }`}
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center space-x-1.5 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-[#839958]" />
              <span>AI Career Coach</span>
            </div>

            <span className="text-[8.5px] font-bold text-[#D3968C] bg-[#D3968C]/25 px-2 py-0.5 rounded-full">
              Active Assistant
            </span>

          </div>

          <div
            className={`p-2.5 rounded-xl border flex items-start space-x-2 ${
              darkMode
                ? 'bg-[#163A2E] border-white/15'
                : 'bg-white border-[#0A3323]/15'
            }`}
          >

            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#0A3323] text-white text-[11px] shadow-xs">
              🤖
            </div>

            <div className="text-[10px] space-y-0.5">

              <p className="font-bold">
                Hello {firstName}!
              </p>

              <p className="opacity-85 leading-relaxed">
                Your {specialization} path is being guided by your domain, specialization and selected skills.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[9.5px] font-bold">

            <button
              onClick={() =>
                handleSendChat(
                  'Improve Resume'
                )
              }
              className={`p-2 rounded-xl text-center transition-all cursor-pointer shadow-2xs border ${
                darkMode
                  ? 'bg-[#163A2E] hover:bg-[#839958] border-white/15 text-white'
                  : 'bg-white hover:bg-[#105666] hover:text-white border-[#0A3323]/15 text-[#0A3323]'
              }`}
            >
              Improve Resume
            </button>

            <button
              onClick={() =>
                handleSendChat(
                  'ATS - Checker'
                )
              }
              className={`p-2 rounded-xl text-center transition-all cursor-pointer shadow-2xs border ${
                darkMode
                  ? 'bg-[#163A2E] hover:bg-[#839958] border-white/15 text-white'
                  : 'bg-white hover:bg-[#105666] hover:text-white border-[#0A3323]/15 text-[#0A3323]'
              }`}
            >
              ATS - Checker
            </button>

            <button
              onClick={() =>
                handleSendChat(
                  'Skill - Gap'
                )
              }
              className={`p-2 rounded-xl text-center transition-all cursor-pointer shadow-2xs border ${
                darkMode
                  ? 'bg-[#163A2E] hover:bg-[#839958] border-white/15 text-white'
                  : 'bg-white hover:bg-[#105666] hover:text-white border-[#0A3323]/15 text-[#0A3323]'
              }`}
            >
              Skill - Gap
            </button>

            <button
              onClick={() =>
                handleSendChat(
                  'Cover Letter - Builder'
                )
              }
              className={`p-2 rounded-xl text-center transition-all cursor-pointer shadow-2xs border ${
                darkMode
                  ? 'bg-[#163A2E] hover:bg-[#839958] border-white/15 text-white'
                  : 'bg-white hover:bg-[#105666] hover:text-white border-[#0A3323]/15 text-[#0A3323]'
              }`}
            >
             Cover Letter
            </button>

          </div>

        </div>

        {/* ================= AI MOCK TOOL ================= */}

        <div className="bg-gradient-to-br from-[#0A3323] via-[#105666] to-[#0A3323] text-white p-3.5 rounded-[20px] shadow-2xs border border-[#839958]/50 space-y-2.5">

          <div className="flex items-center space-x-2.5">

            <div className="p-2 bg-[#D3968C]/25 border border-[#D3968C]/50 rounded-xl text-[#F7F4D5]">
              <Cpu className="w-4 h-4 text-[#D3968C]" />
            </div>

            <div>

              <div className="flex items-center space-x-1">

                <h4 className="text-xs font-bold text-[#F7F4D5]">
                  {specialization} AI Mock Tool
                </h4>

                <span className="text-[7.5px] bg-[#839958] text-white px-1.5 py-0.5 rounded uppercase font-bold">
                  Interactive
                </span>

              </div>

              <p className="text-[8.5px] text-[#F7F4D5]/90 mt-0.5">
                Questions tailored to your role and priority skill: {nextPriority}.
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              handleNavigation(
                '/interview-prep'
              )
            }
            className="w-full flex items-center justify-center space-x-1.5 bg-[#839958] hover:bg-[#839958]/90 text-white text-[10px] font-bold py-2 rounded-xl transition-all cursor-pointer shadow-2xs border border-white/25"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>
              Start AI Practice Session
            </span>
          </button>

        </div>

        {/* ================= CAREER PROGRESS ================= */}

        <div
          className={`p-3.5 rounded-[20px] shadow-2xs flex flex-col justify-between border-2 ${
            darkMode
              ? 'bg-[#0D2D22] border-white/15'
              : 'bg-white border-[#0A3323]/20'
          }`}
        >

          <div className="flex items-center justify-between text-xs font-bold">

            <span>Profile Progress</span>

            <TrendingUp className="w-3.5 h-3.5 text-[#839958]" />

          </div>

          <div className="flex items-baseline justify-between my-1.5">

            <div className="text-xl font-bold">
              {Math.min(100, 60 + selectedSkills.length * 5)}%
            </div>

            <span className="text-[8.5px] font-bold text-[#839958] bg-[#839958]/20 px-1.5 py-0.5 rounded">
              {selectedSkills.length >= 5 ? 'Strong' : 'Growing'}
            </span>

          </div>

          <div className="w-full bg-current/15 h-1.5 rounded-full overflow-hidden mb-1.5">

            <div className="bg-[#105666] h-full transition-all" style={{ width: `${Math.min(100, 60 + selectedSkills.length * 5)}%` }} />

          </div>

          <p className="text-[8.5px] opacity-80 font-semibold">
            Add skills from your personalized recommendations to strengthen your profile.
          </p>

        </div>

      </aside>

      {/* ================= FLOATING CHAT ================= */}

      <div
        onClick={() =>
          setShowChatDrawer(true)
        }
        className="fixed bottom-5 right-6 cursor-pointer hover:scale-105 transition-all z-50 flex items-center space-x-2.5 py-2.5 px-4 rounded-full shadow-2xl border-2 border-[#839958] bg-[#0A3323] text-white"
      >

        <span className="text-base">
          🤖
        </span>

        <div className="flex flex-col text-left">

          <span className="text-xs font-bold text-[#F7F4D5] leading-tight">
            Velora AI Assistant
          </span>

        </div>

      </div>

      {/* ================= CHART MODAL ================= */}

      {activeChartModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">

          <div
            className={`w-full max-w-md p-5 rounded-2xl shadow-2xl border-2 ${
              darkMode
                ? 'bg-[#0D2D22] border-[#839958] text-white'
                : 'bg-white border-[#0A3323]/20 text-[#0A3323]'
            }`}
          >

            <div className="flex items-center justify-between pb-3 border-b border-current/15 mb-4">

              <div className="flex items-center space-x-2">

                <PieChart className="w-5 h-5 text-[#839958]" />

                <h3 className="text-sm font-bold font-serif">
                  {activeChartModal} Breakdown
                </h3>

              </div>

              <button
                onClick={() =>
                  setActiveChartModal(null)
                }
                className="p-1 rounded-full hover:bg-current/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

            </div>

            <div className="space-y-3 text-xs">

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-current/5 border border-current/10">

                <span className="font-semibold">
                  Keywords Optimization
                </span>

                <span className="font-bold text-[#839958]">
                  95% Match
                </span>

              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-current/5 border border-current/10">

                <span className="font-semibold">
                  Formatting & Structure
                </span>

                <span className="font-bold text-[#105666]">
                  90% Optimal
                </span>

              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-current/5 border border-current/10">

                <span className="font-semibold">
                  Impact & Metrics Score
                </span>

                <span className="font-bold text-[#D3968C]">
                  88% Strong
                </span>

              </div>

            </div>

            <div className="mt-5 pt-3 border-t border-current/15 flex justify-end">

              <button
                onClick={() =>
                  setActiveChartModal(null)
                }
                className="bg-[#0A3323] hover:bg-[#0A3323]/90 text-[#F7F4D5] px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Breakdown
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= CHAT DRAWER ================= */}

      {showChatDrawer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-end z-50">

          <div
            className={`w-full max-w-sm h-full flex flex-col shadow-2xl border-l-2 ${
              darkMode
                ? 'bg-[#0D2D22] border-white/15 text-white'
                : 'bg-white border-[#0A3323]/20 text-[#0A3323]'
            }`}
          >

            <div className="p-4 border-b border-current/15 flex items-center justify-between bg-[#0A3323] text-white">

              <div className="flex items-center space-x-2">

                <Bot className="w-5 h-5 text-[#D3968C]" />

                <div>

                  <h3 className="text-xs font-bold">
                    Velora AI Assistant
                  </h3>

                  <p className="text-[8.5px] text-[#F7F4D5]/80">
                    Your Career & Resume Companion
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setShowChatDrawer(false)
                }
                className="p-1 rounded-full hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">

              {messages.map(
                (msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >

                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#0A3323] text-[#F7F4D5]'
                          : darkMode
                            ? 'bg-[#163A2E] border border-white/15 text-white'
                            : 'bg-[#FAF8F2] border border-[#0A3323]/15 text-[#0A3323]'
                      }`}
                    >
                      {msg.text}
                    </div>

                  </div>
                )
              )}

            </div>

            <div className="p-3 border-t border-current/15 bg-current/5">

              <div className="flex items-center space-x-2">

                <input
                  type="text"
                  value={chatInput}
                  onChange={e =>
                    setChatInput(
                      e.target.value
                    )
                  }
                  onKeyDown={e =>
                    e.key === 'Enter' &&
                    handleSendChat()
                  }
                  placeholder="Ask anything about your career..."
                  className={`flex-1 text-xs border rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-[#105666] ${
                    darkMode
                      ? 'bg-[#0D2D22] border-white/25 text-white placeholder:text-white/50'
                      : 'bg-white border-[#0A3323]/20 text-[#0A3323] placeholder:text-[#0A3323]/50'
                  }`}
                />

                <button
                  onClick={() =>
                    handleSendChat()
                  }
                  className="bg-[#0A3323] hover:bg-[#0A3323]/90 text-white p-2 rounded-xl cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}