"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Profile = {
  name: string;
  email: string;
  status: string;
  education: string;
  stream: string;
  specialization: string;
  careerInterest: string;
  skills: string[];
  industry: string;
  toolkit: string[];
  helpWith: string[];
};

const experienceOptions = [
  "Student",
  "Fresher",
  "0–1 year",
  "1–3 years",
  "3–5 years",
  "5+ years",
];

const careerInterestOptions = [
  "UI / UX Design",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "AI / ML",
  "Data Science",
  "Data Analytics",
  "Cybersecurity",
  "Cloud & DevOps",
  "Mobile App Development",
  "Embedded Systems",
  "VLSI",
  "IoT",
  "Robotics & Automation",
  "Product Management",
  "Digital Marketing",
  "Business Analytics",
  "Finance",
  "Human Resources",
  "Other",
];

const streams = [
  ["CSE", "Computer Science"],
  ["IT", "Information Technology"],
  ["ECE", "Electronics & Communication"],
  ["EEE", "Electrical & Electronics"],
  ["MECH", "Mechanical Engineering"],
  ["CIVIL", "Civil Engineering"],
  ["CHEM", "Chemical Engineering"],
  ["BIOTECH", "Biotechnology"],
  ["BCA", "Bachelor of Computer Applications"],
  ["MCA", "Master of Computer Applications"],
  ["MBA", "Master of Business Administration"],
  ["BBA", "Bachelor of Business Administration"],
  ["MTECH", "M.Tech"],
  ["MSC", "M.Sc"],
  ["MCOM", "M.Com"],
  ["OTHER", "Other"],
];

const streamData: Record<
  string,
  { roles: string[]; skills: Record<string, string[]> }
> = {
  CSE: {
    roles: [
      "Software Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "AI / ML Engineer",
      "Data Scientist",
      "Data Analyst",
      "Cloud Engineer",
      "DevOps Engineer",
      "Cybersecurity Engineer",
      "Software Tester / QA",
      "UI / UX Designer",
      "Robatics",
      
    ],
    skills: {
      "Software Developer": [
        "Java",
        "Python",
        "C++",
        "DSA",
        "Algorithms",
        "Git",
        "SQL",
        "OOP",
        "REST APIs",
      ],
      "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Git",
        "REST APIs",
      ],
      "Backend Developer": [
        "Node.js",
        "Java",
        "Python",
        "Spring Boot",
        "Express.js",
        "SQL",
        "MongoDB",
        "REST APIs",
        "Git",
      ],
      "Full Stack Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "SQL",
        "Git",
      ],
      "AI / ML Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "NumPy",
        "Pandas",
        "Scikit-learn",
      ],
      "Data Scientist": [
        "Python",
        "Statistics",
        "Pandas",
        "NumPy",
        "Machine Learning",
        "SQL",
        "Data Visualization",
      ],
      "Data Analyst": [
        "SQL",
        "Excel",
        "Power BI",
        "Tableau",
        "Python",
        "Pandas",
        "Statistics",
      ],
      "Cloud Engineer": [
        "AWS",
        "Azure",
        "GCP",
        "Linux",
        "Networking",
        "Docker",
        "Kubernetes",
        "Terraform",
      ],
      "DevOps Engineer": [
        "Linux",
        "Git",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "AWS",
        "CI/CD",
      ],
      "Cybersecurity Engineer": [
        "Networking",
        "Linux",
        "Ethical Hacking",
        "Cybersecurity",
        "Python",
        "Cryptography",
        "SIEM",
      ],
      "Software Tester / QA": [
        "Manual Testing",
        "Automation Testing",
        "Selenium",
        "Java",
        "API Testing",
        "SQL",
        "Jira",
      ],
      "UI / UX Designer": [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Wireframing",
        "Prototyping",
        "User Research",
        "Visual Design",
        "Design Systems",
        "Usability Testing",
      ],
      "Robotics Engineer": [
  "Robot Operating System (ROS)",
  "ROS 2",
  "Python",
  "C++",
  "Embedded C",
  "Arduino",
  "Raspberry Pi",
  "Microcontrollers",
  "Sensors",
  "Actuators",
  "Motor Control",
  "Kinematics",
  "Dynamics",
  "Control Systems",
  "Computer Vision",
  "OpenCV",
  "Machine Learning",
  "Deep Learning",
  "SLAM",
  "Path Planning",
  "Autonomous Navigation",
  "LiDAR",
  "Robotic Manipulation",
  "PLC",
  "MATLAB",
  "Simulink",
  "Gazebo",
  "CAD",
  "Git",
  "Embedded Systems",
]
    },
  },

  IT: {
    roles: [
      "Software Developer",
      "Web Developer",
      "Cloud Engineer",
      "DevOps Engineer",
      "Cybersecurity",
      "Data Analyst",
      "Database Administrator",
      "IT Support Engineer",
      "Network Engineer",
    ],
    skills: {
      "Software Developer": [
        "Java",
        "Python",
        "JavaScript",
        "SQL",
        "Git",
        "OOP",
        "DSA",
      ],
      "Web Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Next.js",
        "Node.js",
        "Git",
      ],
      "Cloud Engineer": [
        "AWS",
        "Azure",
        "Linux",
        "Docker",
        "Networking",
        "Kubernetes",
      ],
      "DevOps Engineer": [
        "Linux",
        "Docker",
        "Kubernetes",
        "Git",
        "Jenkins",
        "CI/CD",
        "AWS",
      ],
      Cybersecurity: [
        "Networking",
        "Linux",
        "Ethical Hacking",
        "Cybersecurity",
        "Python",
        "Cryptography",
      ],
      "Data Analyst": [
        "SQL",
        "Excel",
        "Power BI",
        "Python",
        "Statistics",
        "Tableau",
      ],
      "Database Administrator": [
        "SQL",
        "MySQL",
        "PostgreSQL",
        "Oracle",
        "Database Design",
        "Linux",
      ],
      "IT Support Engineer": [
        "Windows",
        "Linux",
        "Networking",
        "Troubleshooting",
        "Hardware",
        "IT Support",
      ],
      "Network Engineer": [
        "CCNA",
        "TCP/IP",
        "Routing",
        "Switching",
        "Linux",
        "Firewalls",
      ],
    },
  },

  ECE: {
    roles: [
      "Embedded Systems Engineer",
      "VLSI Design Engineer",
      "IoT Engineer",
      "Telecom Engineer",
      "RF Engineer",
      "FPGA Engineer",
      "Hardware Design Engineer",
      "Electronics Engineer",
    ],
    skills: {
      "Embedded Systems Engineer": [
        "C",
        "C++",
        "Embedded C",
        "Microcontrollers",
        "Arduino",
        "STM32",
        "RTOS",
      ],
      "VLSI Design Engineer": [
        "Verilog",
        "VHDL",
        "Digital Electronics",
        "RTL Design",
        "SystemVerilog",
        "FPGA",
      ],
      "IoT Engineer": [
        "IoT",
        "Arduino",
        "Raspberry Pi",
        "Python",
        "MQTT",
        "Sensors",
        "Embedded C",
      ],
      "Telecom Engineer": [
        "Telecommunications",
        "5G",
        "LTE",
        "Networking",
        "RF",
        "Signal Processing",
      ],
      "RF Engineer": [
        "RF Design",
        "Antennas",
        "Microwave",
        "MATLAB",
        "RF Testing",
      ],
      "FPGA Engineer": [
        "Verilog",
        "VHDL",
        "FPGA",
        "Digital Electronics",
        "SystemVerilog",
        "RTL",
      ],
      "Hardware Design Engineer": [
        "PCB Design",
        "Altium",
        "KiCad",
        "Digital Electronics",
        "Analog Electronics",
        "Circuit Design",
      ],
      "Electronics Engineer": [
        "Analog Electronics",
        "Digital Electronics",
        "Circuit Design",
        "Microcontrollers",
        "PCB Design",
        "MATLAB",
      ],
    },
  },

  EEE: {
    roles: [
      "Electrical Engineer",
      "Power Systems Engineer",
      "Control Systems Engineer",
      "Electrical Design Engineer",
      "Renewable Energy Engineer",
      "Embedded Engineer",
      "Automation Engineer",
      "Power Electronics Engineer",
    ],
    skills: {
      "Electrical Engineer": [
        "Electrical Machines",
        "Power Systems",
        "Circuit Analysis",
        "AutoCAD",
        "MATLAB",
        "Electrical Design",
      ],
      "Power Systems Engineer": [
        "Power Systems",
        "Electrical Machines",
        "ETAP",
        "MATLAB",
        "Protection Systems",
        "High Voltage",
      ],
      "Control Systems Engineer": [
        "Control Systems",
        "MATLAB",
        "Simulink",
        "PLC",
        "Automation",
        "Instrumentation",
      ],
      "Electrical Design Engineer": [
        "AutoCAD Electrical",
        "Electrical Design",
        "Circuit Design",
        "ETAP",
        "MATLAB",
      ],
      "Renewable Energy Engineer": [
        "Solar Energy",
        "Wind Energy",
        "Power Electronics",
        "MATLAB",
        "Energy Systems",
      ],
      "Embedded Engineer": [
        "Embedded C",
        "C++",
        "Microcontrollers",
        "Arduino",
        "STM32",
        "RTOS",
      ],
      "Automation Engineer": [
        "PLC",
        "SCADA",
        "Industrial Automation",
        "Instrumentation",
        "Control Systems",
      ],
      "Power Electronics Engineer": [
        "Power Electronics",
        "Converters",
        "Inverters",
        "MATLAB",
        "Motor Drives",
      ],
    },
  },

  MECH: {
    roles: [
      "Design Engineer",
      "Manufacturing Engineer",
      "Production Engineer",
      "Automotive Engineer",
      "CAD Engineer",
      "Quality Engineer",
      "Thermal Engineer",
      "Maintenance Engineer",
    ],
    skills: {
      "Design Engineer": [
        "AutoCAD",
        "SolidWorks",
        "CATIA",
        "CREO",
        "GD&T",
        "Engineering Drawing",
      ],
      "Manufacturing Engineer": [
        "CNC",
        "Manufacturing",
        "Lean Manufacturing",
        "Production Planning",
        "CAD",
        "Quality Control",
      ],
      "Production Engineer": [
        "Production Planning",
        "Lean Manufacturing",
        "Six Sigma",
        "Quality Control",
        "CNC",
      ],
      "Automotive Engineer": [
        "Automotive Design",
        "Vehicle Dynamics",
        "CAD",
        "Automotive Systems",
        "MATLAB",
      ],
      "CAD Engineer": [
        "AutoCAD",
        "SolidWorks",
        "CATIA",
        "CREO",
        "3D Modeling",
      ],
      "Quality Engineer": [
        "Quality Control",
        "Six Sigma",
        "Root Cause Analysis",
        "SPC",
        "ISO",
      ],
      "Thermal Engineer": [
        "Thermodynamics",
        "Heat Transfer",
        "ANSYS",
        "CFD",
        "MATLAB",
      ],
      "Maintenance Engineer": [
        "Maintenance Planning",
        "Mechanical Systems",
        "Preventive Maintenance",
        "Reliability",
      ],
    },
  },

  CIVIL: {
    roles: [
      "Structural Engineer",
      "Site Engineer",
      "Construction Engineer",
      "Transportation Engineer",
      "Geotechnical Engineer",
      "Environmental Engineer",
      "Quantity Surveyor",
    ],
    skills: {
      "Structural Engineer": [
        "Structural Analysis",
        "STAAD.Pro",
        "ETABS",
        "AutoCAD",
        "Revit",
        "Concrete Design",
      ],
      "Site Engineer": [
        "Site Management",
        "AutoCAD",
        "Construction",
        "Quantity Estimation",
        "Safety",
      ],
      "Construction Engineer": [
        "Construction Management",
        "Project Planning",
        "AutoCAD",
        "Quantity Surveying",
        "Primavera",
      ],
      "Transportation Engineer": [
        "Transportation Planning",
        "Highway Design",
        "AutoCAD",
        "GIS",
        "Traffic Engineering",
      ],
      "Geotechnical Engineer": [
        "Soil Mechanics",
        "Foundation Design",
        "Geotechnical Analysis",
        "PLAXIS",
      ],
      "Environmental Engineer": [
        "Environmental Engineering",
        "Water Treatment",
        "Waste Management",
        "Environmental Impact Assessment",
      ],
      "Quantity Surveyor": [
        "Quantity Estimation",
        "BOQ",
        "Cost Estimation",
        "AutoCAD",
        "Construction Contracts",
      ],
    },
  },

  CHEM: {
    roles: [
      "Process Engineer",
      "Chemical Engineer",
      "Production Engineer",
      "Plant Engineer",
      "Quality Engineer",
      "Process Safety Engineer",
    ],
    skills: {
      "Process Engineer": [
        "Process Design",
        "Aspen HYSYS",
        "Process Simulation",
        "Heat Transfer",
        "Fluid Mechanics",
      ],
      "Chemical Engineer": [
        "Chemical Process",
        "Thermodynamics",
        "Mass Transfer",
        "Heat Transfer",
        "Process Control",
      ],
      "Production Engineer": [
        "Production Planning",
        "Process Optimization",
        "Quality Control",
        "Lean Manufacturing",
      ],
      "Plant Engineer": [
        "Plant Operations",
        "Process Safety",
        "Maintenance",
        "Process Control",
      ],
      "Quality Engineer": [
        "Quality Control",
        "Six Sigma",
        "SPC",
        "Root Cause Analysis",
      ],
      "Process Safety Engineer": [
        "Process Safety",
        "HAZOP",
        "Risk Assessment",
        "Industrial Safety",
      ],
    },
  },

  BIOTECH: {
    roles: [
      "Biotechnologist",
      "Research Associate",
      "Clinical Research",
      "Bioinformatics",
      "Quality Control",
      "Biomedical Research",
    ],
    skills: {
      Biotechnologist: [
        "Molecular Biology",
        "Cell Culture",
        "PCR",
        "Biochemistry",
        "Laboratory Techniques",
      ],
      "Research Associate": [
        "Research Methods",
        "PCR",
        "Cell Culture",
        "Data Analysis",
        "Scientific Writing",
      ],
      "Clinical Research": [
        "Clinical Trials",
        "Clinical Data",
        "GCP",
        "Research Methods",
      ],
      Bioinformatics: [
        "Python",
        "R",
        "Bioinformatics",
        "Genomics",
        "Data Analysis",
      ],
      "Quality Control": [
        "Quality Control",
        "GLP",
        "Laboratory Techniques",
        "Documentation",
      ],
      "Biomedical Research": [
        "Biochemistry",
        "Molecular Biology",
        "Research Methods",
        "Laboratory Techniques",
      ],
    },
  },

  BCA: {
    roles: [
      "Software Developer",
      "Web Developer",
      "Data Analyst",
      "QA Tester",
      "UI / UX Designer",
      "IT Support",
    ],
    skills: {
      "Software Developer": [
        "Java",
        "Python",
        "JavaScript",
        "SQL",
        "Git",
        "DSA",
      ],
      "Web Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Git",
      ],
      "Data Analyst": [
        "Excel",
        "SQL",
        "Power BI",
        "Python",
        "Statistics",
      ],
      "QA Tester": [
        "Manual Testing",
        "Selenium",
        "API Testing",
        "SQL",
        "Jira",
      ],
      "UI / UX Designer": [
        "Figma",
        "Wireframing",
        "Prototyping",
        "Visual Design",
        "User Research",
      ],
      "IT Support": [
        "Networking",
        "Windows",
        "Linux",
        "Troubleshooting",
        "IT Support",
      ],
    },
  },

  MCA: {
    roles: [
      "Software Engineer",
      "Full Stack Developer",
      "Data Analyst",
      "AI / ML Engineer",
      "Cloud Engineer",
      "Cybersecurity Engineer",
      "Software Tester",
    ],
    skills: {
      "Software Engineer": [
        "Java",
        "Python",
        "C++",
        "DSA",
        "Algorithms",
        "SQL",
        "Git",
      ],
      "Full Stack Developer": [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "SQL",
        "MongoDB",
        "Git",
      ],
      "Data Analyst": [
        "SQL",
        "Excel",
        "Power BI",
        "Python",
        "Statistics",
      ],
      "AI / ML Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "Pandas",
      ],
      "Cloud Engineer": [
        "AWS",
        "Azure",
        "Linux",
        "Docker",
        "Kubernetes",
      ],
      "Cybersecurity Engineer": [
        "Networking",
        "Linux",
        "Cybersecurity",
        "Ethical Hacking",
        "Python",
      ],
      "Software Tester": [
        "Manual Testing",
        "Selenium",
        "API Testing",
        "SQL",
        "Jira",
      ],
    },
  },

  MBA: {
    roles: [
      "Marketing",
      "Finance",
      "Human Resources",
      "Business Analytics",
      "Operations",
      "Product Management",
      "Consulting",
    ],
    skills: {
      Marketing: [
        "Digital Marketing",
        "SEO",
        "Google Analytics",
        "Content Marketing",
        "Market Research",
        "CRM",
      ],
      Finance: [
        "Financial Analysis",
        "Excel",
        "Financial Modeling",
        "Accounting",
        "Investment Analysis",
      ],
      "Human Resources": [
        "Recruitment",
        "Talent Management",
        "HR Analytics",
        "Employee Relations",
        "HR Operations",
      ],
      "Business Analytics": [
        "Excel",
        "SQL",
        "Power BI",
        "Tableau",
        "Business Analytics",
        "Statistics",
      ],
      Operations: [
        "Supply Chain",
        "Operations Management",
        "Lean Management",
        "Project Management",
      ],
      "Product Management": [
        "Product Strategy",
        "Market Research",
        "Product Analytics",
        "Agile",
        "Roadmapping",
      ],
      Consulting: [
        "Business Analysis",
        "Problem Solving",
        "Market Research",
        "Financial Analysis",
        "Presentation",
      ],
    },
  },

  BBA: {
    roles: [
      "Marketing",
      "Finance",
      "Human Resources",
      "Business Development",
      "Operations",
      "Management",
    ],
    skills: {
      Marketing: [
        "Digital Marketing",
        "SEO",
        "Content Marketing",
        "Market Research",
        "CRM",
      ],
      Finance: [
        "Excel",
        "Financial Analysis",
        "Accounting",
        "Budgeting",
      ],
      "Human Resources": [
        "Recruitment",
        "HR Operations",
        "Employee Relations",
        "HR Analytics",
      ],
      "Business Development": [
        "Sales",
        "Lead Generation",
        "CRM",
        "Negotiation",
        "Communication",
      ],
      Operations: [
        "Operations Management",
        "Supply Chain",
        "Project Management",
        "Process Improvement",
      ],
      Management: [
        "Leadership",
        "Communication",
        "Project Management",
        "Problem Solving",
      ],
    },
  },

  MTECH: {
    roles: [
      "Advanced Software Engineering",
      "AI / ML",
      "Data Science",
      "VLSI",
      "Embedded Systems",
      "Cybersecurity",
      "Cloud Computing",
    ],
    skills: {
      "Advanced Software Engineering": [
        "System Design",
        "Algorithms",
        "Java",
        "Python",
        "Distributed Systems",
        "Git",
      ],
      "AI / ML": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "Statistics",
      ],
      "Data Science": [
        "Python",
        "Statistics",
        "SQL",
        "Pandas",
        "Machine Learning",
        "Data Visualization",
      ],
      VLSI: [
        "Verilog",
        "VHDL",
        "RTL Design",
        "SystemVerilog",
        "FPGA",
      ],
      "Embedded Systems": [
        "Embedded C",
        "C++",
        "Microcontrollers",
        "RTOS",
        "Embedded Linux",
      ],
      Cybersecurity: [
        "Cybersecurity",
        "Ethical Hacking",
        "Networking",
        "Cryptography",
        "Linux",
      ],
      "Cloud Computing": [
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "Cloud Architecture",
      ],
    },
  },

  MSC: {
    roles: [
      "Data Science",
      "Statistics",
      "Research",
      "Software Development",
      "Bioinformatics",
    ],
    skills: {
      "Data Science": [
        "Python",
        "Statistics",
        "SQL",
        "Pandas",
        "Machine Learning",
        "Data Visualization",
      ],
      Statistics: [
        "R",
        "Statistics",
        "SAS",
        "SPSS",
        "Data Analysis",
      ],
      Research: [
        "Research Methods",
        "Statistical Analysis",
        "Scientific Writing",
        "Data Analysis",
      ],
      "Software Development": [
        "Python",
        "Java",
        "SQL",
        "Git",
        "DSA",
      ],
      Bioinformatics: [
        "Python",
        "R",
        "Genomics",
        "Bioinformatics",
        "Data Analysis",
      ],
    },
  },

  MCOM: {
    roles: [
      "Accounting",
      "Finance",
      "Taxation",
      "Financial Analysis",
      "Banking",
    ],
    skills: {
      Accounting: [
        "Accounting",
        "Tally",
        "Excel",
        "Financial Reporting",
        "Bookkeeping",
      ],
      Finance: [
        "Financial Analysis",
        "Excel",
        "Financial Modeling",
        "Investment Analysis",
      ],
      Taxation: [
        "Taxation",
        "GST",
        "Income Tax",
        "Accounting",
        "Excel",
      ],
      "Financial Analysis": [
        "Financial Analysis",
        "Excel",
        "Financial Modeling",
        "Accounting",
      ],
      Banking: [
        "Banking Operations",
        "Financial Analysis",
        "Excel",
        "Customer Service",
      ],
    },
  },

  OTHER: {
    roles: [
      "General Professional",
      "Research",
      "Operations",
      "Design",
      "Business",
    ],
    skills: {
      "General Professional": [
        "Communication",
        "Problem Solving",
        "Microsoft Office",
        "Teamwork",
        "Project Management",
      ],
      Research: [
        "Research Methods",
        "Data Analysis",
        "Scientific Writing",
        "Presentation",
      ],
      Operations: [
        "Operations Management",
        "Project Management",
        "Process Improvement",
        "Excel",
      ],
      Design: [
        "Figma",
        "Visual Design",
        "Wireframing",
        "Prototyping",
      ],
      Business: [
        "Communication",
        "Business Analysis",
        "Excel",
        "Presentation",
        "Negotiation",
      ],
    },
  },
};

const industries = [
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Education",
  "Automotive",
  "Manufacturing",
  "Consulting",
  "Retail & E-commerce",
  "Telecommunications",
  "Government",
  "Research",
  "Other",
];

const toolkitOptions = [
  ["Resume", "📄"],
  ["CV", "📝"],
  ["Portfolio", "🗂️"],
  ["Projects", "💻"],
  ["Certifications", "🏆"],
  ["Cover Letter", "✉️"],
];

const helpOptions = [
  ["Resume Building", "📄"],
  ["ATS Optimization", "🎯"],
  ["Interview Preparation", "🎤"],
  ["Skill Development", "📚"],
  ["Portfolio Improvement", "✨"],
  ["Career Guidance", "🧭"],
];

export default function ProfilePage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    status: "",
    education: "",
    stream: "",
    specialization: "",
    careerInterest: "",
    skills: [],
    industry: "",
    toolkit: [],
    helpWith: [],
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("veloraSignup");

      if (!saved) return;

      const parsed = JSON.parse(saved);

      setProfile((current) => ({
        ...current,
        name: parsed.name || current.name,
        email: parsed.email || current.email,
      }));
    } catch {
      // Ignore invalid saved data.
    }
  }, []);

  const selectedStream = streamData[profile.stream];

  const roles = selectedStream?.roles ?? [];

  const availableSkills = useMemo(() => {
    if (!selectedStream || !profile.specialization) {
      return [];
    }

    return (
      selectedStream.skills[profile.specialization] ?? []
    );
  }, [
    selectedStream,
    profile.specialization,
  ]);

  const update = <K extends keyof Profile>(
    key: K,
    value: Profile[K]
  ) => {
    setProfile((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const selectStream = (stream: string) => {
    setProfile((current) => ({
      ...current,
      stream,
      specialization: "",
      skills: [],
    }));
  };

  const selectRole = (role: string) => {
    setProfile((current) => ({
      ...current,
      specialization: role,
      skills: [],
    }));
  };

  const toggleSkill = (skill: string) => {
    setProfile((current) => ({
      ...current,
      skills: current.skills.includes(skill)
        ? current.skills.filter((item) => item !== skill)
        : [...current.skills, skill],
    }));
  };

  const toggleListItem = (
    key: "toolkit" | "helpWith",
    value: string
  ) => {
    setProfile((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push("/signup");
    }
  };

  const completeProfile = () => {
    localStorage.setItem(
      "veloraProfile",
      JSON.stringify(profile)
    );

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3eee3] text-[#123f3a]">

      <div className="mx-auto flex h-screen max-w-[1450px] p-4 lg:p-5">

        <div className="grid h-full w-full grid-cols-1 overflow-hidden rounded-[30px] border border-white/70 bg-[#fffdf8] shadow-[0_25px_70px_rgba(25,55,45,0.10)] lg:grid-cols-[370px_1fr]">

          {/* LEFT PANEL */}

          <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#dceee2] via-[#cee4d6] to-[#e7dcd8] p-9 lg:flex lg:flex-col lg:justify-between">

            <div className="absolute -left-40 -top-40 h-[380px] w-[380px] rounded-full bg-white/20" />

            <div className="absolute -bottom-24 -right-24 h-[250px] w-[250px] rounded-full bg-[#df7c8d]/10" />

            <div className="relative z-10 flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Velora"
                className="h-14 w-14 object-contain"
              />

              <div>
                <div className="font-serif text-3xl font-semibold">
                  Velora
                </div>

                <div className="text-[10px] font-extrabold tracking-[0.14em] text-[#df7c8d]">
                  AI CAREER COMPANION
                </div>
              </div>
            </div>

            <div className="relative z-10 max-w-[320px]">

              <div className="inline-flex rounded-full border border-white/80 bg-white/65 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em]">
                ✦ Build your career profile
              </div>

              <h1 className="mt-5 font-serif text-[58px] font-semibold leading-[0.94] tracking-[-0.045em]">
                Your profile.
                <br />
                <span className="text-[#df7c8d]">
                  Your path.
                </span>
              </h1>

              <p className="mt-5 text-sm leading-7 text-[#58706a]">
                Tell Velora what you study, what you know,
                and what you already have. We&apos;ll use this
                information to personalize your career workspace.
              </p>

            </div>

            <div className="relative z-10 space-y-2">

              {[
                "Stream-aware career recommendations",
                "Skills personalized to your specialization",
                "Smarter resume, learning & career tools",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/55 px-3 py-3 text-[11px] font-semibold text-[#365d55]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#07584f] text-white">
                    {index === 0
                      ? "✦"
                      : index === 1
                        ? "⌁"
                        : "✓"}
                  </span>

                  {item}
                </div>
              ))}

            </div>
          </section>

          {/* RIGHT PANEL */}

          <section className="flex min-h-0 flex-col bg-[#fffdf8] px-6 py-6 sm:px-8 lg:px-10">

            {/* TOP */}

            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#71807a]">
                Step{" "}
                <span className="text-[#07584f]">
                  {step}
                </span>{" "}
                of 4
              </div>

              <button
                type="button"
                onClick={() =>
                  router.push("/dashboard")
                }
                className="text-xs font-semibold text-[#71807a] hover:text-[#07584f]"
              >
                Skip for now
              </button>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e5e5dc]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#07584f] to-[#579279] transition-all duration-300"
                style={{
                  width: `${step * 25}%`,
                }}
              />
            </div>

            {/* CONTENT */}

            <div className="mt-6 min-h-0 flex-1 overflow-auto pr-1">

              {/* STEP 1 */}

              {step === 1 && (
                <div>
                  <h2 className="font-serif text-4xl tracking-tight">
                    About you
                  </h2>

                  <p className="mt-2 text-sm text-[#71807a]">
                    Let&apos;s start with the basics.
                  </p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">

                    <Field
                      label="FULL NAME"
                      value={profile.name}
                      placeholder="Your full name"
                      onChange={(value) =>
                        update("name", value)
                      }
                    />

                    <Field
                      label="EMAIL"
                      value={profile.email}
                      placeholder="you@example.com"
                      type="email"
                      onChange={(value) =>
                        update("email", value)
                      }
                    />

                    <SelectField
                      label="CURRENT STATUS"
                      value={profile.status}
                      placeholder="Select your status"
                      options={experienceOptions}
                      onChange={(value) =>
                        update("status", value)
                      }
                    />

                    <Field
                      label="EDUCATION / DEGREE"
                      value={profile.education}
                      placeholder="e.g. B.Tech Computer Science"
                      onChange={(value) =>
                        update("education", value)
                      }
                    />

                  </div>

                  <InfoBox text="Your profile information can be updated later from Settings." />
                </div>
              )}

              {/* STEP 2 */}

              {step === 2 && (
                <div>
                  <h2 className="font-serif text-4xl tracking-tight">
                    Choose your stream
                  </h2>

                  <p className="mt-2 text-sm text-[#71807a]">
                    First choose your main academic or professional stream.
                  </p>

                  <div className="mt-6 text-[10px] font-extrabold">
                    MAIN STREAM
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">

                    {streams.map(([value, name]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          selectStream(value)
                        }
                        className={`min-h-[68px] rounded-2xl border p-2 transition ${
                          profile.stream === value
                            ? "border-[#07584f] bg-[#07584f] text-white shadow-lg"
                            : "border-[#ded9cc] bg-[#fffdf8] hover:-translate-y-0.5 hover:border-[#8caf99]"
                        }`}
                      >
                        <div className="text-sm font-extrabold">
                          {value}
                        </div>

                        <div className="mt-1 text-[9px] opacity-70">
                          {name}
                        </div>
                      </button>
                    ))}

                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    <SelectField
                      label="ROLE SPECIALIZATION"
                      value={profile.specialization}
                      placeholder={
                        profile.stream
                          ? "Select specialization"
                          : "Choose stream first"
                      }
                      options={roles}
                      disabled={!profile.stream}
                      onChange={selectRole}
                    />

                    <SelectField
                      label="TARGET INDUSTRY"
                      value={profile.industry}
                      placeholder="Select industry"
                      options={industries}
                      onChange={(value) =>
                        update("industry", value)
                      }
                    />

                  </div>

                  <div className="mt-4 max-w-full sm:max-w-[calc(50%-0.5rem)]">
                    <SelectField
                      label="CAREER YOU'RE INTERESTED IN"
                      value={profile.careerInterest}
                      placeholder="Select the career area you want to explore"
                      options={careerInterestOptions}
                      onChange={(value) =>
                        update("careerInterest", value)
                      }
                    />
                  </div>

                  <InfoBox
                    text={
                      profile.specialization
                        ? `${profile.specialization} selected. Your skill list will now be personalized.`
                        : "Select a specialization to continue to personalized skills."
                    }
                  />
                </div>
              )}

              {/* STEP 3 */}

              {step === 3 && (
                <div>
                  <h2 className="font-serif text-4xl tracking-tight">
                    Select your skills
                  </h2>

                  <p className="mt-2 text-sm text-[#71807a]">
                    Choose only the skills you actually know.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">

                    <span className="rounded-full bg-[#e5eee2] px-3 py-1.5 text-[10px] font-extrabold text-[#07584f]">
                      {profile.stream || "Stream"}
                    </span>

                    <span className="rounded-full bg-[#f7dfe2] px-3 py-1.5 text-[10px] font-extrabold text-[#bd5e6d]">
                      {profile.specialization || "Specialization"}
                    </span>

                  </div>

                  <div className="mt-6 text-[10px] font-extrabold">
                    SKILLS YOU KNOW
                  </div>

                  {!profile.specialization ? (
                    <InfoBox text="Go back to Step 2 and choose your stream and specialization." />
                  ) : (
                    <>
                      <div className="mt-3 flex flex-wrap gap-2">

                        {availableSkills.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() =>
                              toggleSkill(skill)
                            }
                            className={`rounded-full border px-3 py-2 text-[10px] font-semibold transition ${
                              profile.skills.includes(
                                skill
                              )
                                ? "border-[#07584f] bg-[#07584f] text-white"
                                : "border-[#dce3da] bg-[#fafcf7] text-[#48635c] hover:border-[#8caf99]"
                            }`}
                          >
                            {profile.skills.includes(skill)
                              ? "✓ "
                              : ""}
                            {skill}
                          </button>
                        ))}

                      </div>

                      <div className="mt-3 text-[10px] text-[#71807a]">
                        {profile.skills.length} skill
                        {profile.skills.length === 1
                          ? ""
                          : "s"}{" "}
                        selected
                      </div>
                    </>
                  )}

                  <InfoBox text="These skills will influence resume guidance, ATS analysis and your future learning recommendations." />
                </div>
              )}

              {/* STEP 4 */}

              {step === 4 && (
                <div>
                  <h2 className="font-serif text-4xl tracking-tight">
                    Career Update
                  </h2>

                  <p className="mt-2 text-sm text-[#71807a]">
                    Tell Velora what you already have and what you want help with.
                  </p>

                  <div className="mt-6 text-[10px] font-extrabold">
                    WHAT DO YOU ALREADY HAVE?
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">

                    {toolkitOptions.map(
                      ([name, icon]) => {
                        const selected =
                          profile.toolkit.includes(
                            name
                          );

                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() =>
                              toggleListItem(
                                "toolkit",
                                name
                              )
                            }
                            className={`min-h-[95px] rounded-2xl border p-3 text-left transition ${
                              selected
                                ? "border-[#07584f] bg-[#edf5ed] shadow-sm"
                                : "border-[#ded9cc] bg-[#fffdf8] hover:-translate-y-0.5"
                            }`}
                          >
                            <div className="text-xl">
                              {icon}
                            </div>

                            <div className="mt-2 text-xs font-bold">
                              {name}
                            </div>

                            <div className="mt-1 text-[9px] text-[#71807a]">
                              {selected
                                ? "Selected ✓"
                                : "Add to profile"}
                            </div>
                          </button>
                        );
                      }
                    )}

                  </div>

                  <div className="mt-6 text-[10px] font-extrabold">
                    WHAT SHOULD VELORA HELP WITH?
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">

                    {helpOptions.map(
                      ([name, icon]) => {
                        const selected =
                          profile.helpWith.includes(
                            name
                          );

                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() =>
                              toggleListItem(
                                "helpWith",
                                name
                              )
                            }
                            className={`flex min-h-[50px] items-center gap-3 rounded-2xl border px-3 text-left transition ${
                              selected
                                ? "border-[#df7c8d] bg-[#f8e1e4]"
                                : "border-[#ded9cc] bg-[#fffdf8] hover:border-[#91ae9b]"
                            }`}
                          >
                            <span className="text-lg">
                              {icon}
                            </span>

                            <span className="text-[10px] font-bold">
                              {name}
                            </span>

                            {selected && (
                              <span className="ml-auto text-[#bd5e6d]">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      }
                    )}

                  </div>

                  <InfoBox
                    text={`${profile.toolkit.length} existing item(s) selected • ${profile.helpWith.length} area(s) selected for support.`}
                  />
                </div>
              )}

            </div>

            {/* BOTTOM */}

            <div className="mt-4 flex items-center justify-between border-t border-[#e8e4d9] pt-4">

              <button
                type="button"
                onClick={previousStep}
                className="rounded-xl border border-[#d9dfd8] bg-white px-4 py-2.5 text-xs font-bold text-[#07584f] hover:bg-[#f1f4ed]"
              >
                ← Back
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-xl bg-[#07584f] px-5 py-3 text-xs font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#043f38]"
                >
                 Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={completeProfile}
                  className="rounded-xl bg-[#07584f] px-5 py-3 text-xs font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#043f38]"
                >
                  Complete Profile →
                </button>
              )}

            </div>

            <div className="mt-2 text-right text-[9px] text-[#71807a]">
              You can update your details later from Settings.
            </div>

          </section>
        </div>
      </div>
    </main>
  );
}


function Field({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-extrabold text-[#123f3a]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-12 w-full rounded-2xl border border-[#ded9cc] bg-[#fffdf8] px-4 text-xs text-[#123f3a] outline-none transition placeholder:text-[#9ba6a1] focus:border-[#7fa792] focus:ring-4 focus:ring-[#579279]/10"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  placeholder,
  options,
  disabled = false,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-extrabold text-[#123f3a]">
        {label}
      </label>

      <select
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-12 w-full rounded-2xl border border-[#ded9cc] bg-[#fffdf8] px-4 text-xs text-[#123f3a] outline-none transition focus:border-[#7fa792] focus:ring-4 focus:ring-[#579279]/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function InfoBox({
  text,
}: {
  text: string;
}) {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#dfe8dc] bg-gradient-to-r from-[#edf5eb] to-[#faf1ed] p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#07584f] text-sm text-white">
        ✦
      </div>

      <p className="text-[10px] leading-5 text-[#5f716b]">
        {text}
      </p>
    </div>
  );
}