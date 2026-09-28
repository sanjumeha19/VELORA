// src/data/career-taxonomy.ts
// Central career knowledge for Velora.
// UI pages should read from this file instead of keeping their own
// roleRecommendations objects.

export type CareerTrack = {
  id: string;
  stream: string;
  specialization: string;
  aliases: string[];
  roles: string[];
  tools: string[];
  skills: string[];
  focus: string[];
  resumeKeywords: string[];
  interviewTopics: string[];
  projectAreas: string[];
};

export type CareerDomain = {
  id: string;
  name: string;
  aliases: string[];
  specializations: CareerTrack[];
};

export type CareerProfileInput = {
  stream?: string | null;
  specialization?: string | null;
  skills?: string[] | null;
  status?: string | null;
  experience?: string | null;
  education?: string | null;
};

export type CareerRecommendationContext = {
  stream: string;
  specialization: string;
  roles: string[];
  tools: string[];
  skills: string[];
  focus: string[];
  resumeKeywords: string[];
  interviewTopics: string[];
  projectAreas: string[];
  matchedBy: "exact" | "alias" | "stream-fallback" | "specialization-fallback" | "general";
};

const uniq = <T,>(items: T[]): T[] => [...new Set(items)];

export const normalize = (value: string): string =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[\/_-]+/g, " ")
    .replace(/[^\w\s+.#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const makeTrack = (
  id: string,
  stream: string,
  specialization: string,
  data: Omit<CareerTrack, "id" | "stream" | "specialization">
): CareerTrack => ({ id, stream, specialization, ...data });

/* -------------------------------------------------------------------------- */
/* COMPUTING                                                                  */
/* -------------------------------------------------------------------------- */

const CSE_TRACKS: CareerTrack[] = [
  makeTrack("cse.software-engineering", "CSE", "Software Engineering", {
    aliases: ["Software Developer", "Software Development", "Software Engineer", "Application Development"],
    roles: ["Software Engineer", "Software Developer", "Application Developer"],
    tools: ["Java", "C++", "Python", "Git", "SQL", "Docker"],
    skills: ["Data Structures", "Algorithms", "Object-Oriented Programming", "Software Design", "Testing", "Debugging", "Problem Solving"],
    focus: ["reliable software development", "clean architecture", "maintainable production code"],
    resumeKeywords: ["software development", "object-oriented programming", "data structures", "algorithms", "unit testing", "debugging", "version control"],
    interviewTopics: ["Data Structures", "Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design"],
    projectAreas: ["production application", "backend service", "web application", "automation tool"],
  }),
  makeTrack("cse.frontend", "CSE", "Frontend Development", {
    aliases: ["Frontend Developer", "Front End Development", "Front-End Development", "React Developer", "UI Developer", "Web Frontend", "Web Development"],
    roles: ["Frontend Developer", "React Developer", "Web Developer", "UI Developer"],
    tools: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Git"],
    skills: ["Responsive Design", "Accessibility", "Component Architecture", "State Management", "Frontend Testing", "Web Performance", "API Integration", "Cross-Browser Compatibility"],
    focus: ["responsive interfaces", "component architecture", "performance-focused frontend development"],
    resumeKeywords: ["responsive web interfaces", "component development", "UI implementation", "API integration", "accessibility", "frontend performance"],
    interviewTopics: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "DOM", "Web Performance", "Accessibility"],
    projectAreas: ["responsive web application", "design-to-code project", "dashboard", "e-commerce interface", "AI-powered frontend"],
  }),
  makeTrack("cse.backend", "CSE", "Backend Development", {
    aliases: ["Backend Developer", "Back End Development", "Back-End Development", "Server Side Development", "API Development"],
    roles: ["Backend Developer", "Backend Engineer", "API Developer", "Server-Side Developer"],
    tools: ["Java", "Spring Boot", "Node.js", "Python", "Express", "PostgreSQL", "MongoDB", "Git"],
    skills: ["REST APIs", "Authentication", "Database Design", "Caching", "API Security", "Testing", "Logging", "Scalable Services"],
    focus: ["API development", "backend architecture", "scalable and reliable services"],
    resumeKeywords: ["REST API", "backend development", "database design", "authentication", "service architecture", "API integration"],
    interviewTopics: ["REST", "HTTP", "Databases", "Authentication", "Caching", "Concurrency", "API Design", "System Design"],
    projectAreas: ["REST API", "authentication service", "backend platform", "database-driven application"],
  }),
  makeTrack("cse.full-stack", "CSE", "Full Stack Development", {
    aliases: ["Full Stack Developer", "Full-Stack Development", "Fullstack Development", "MERN Stack", "MEAN Stack", "Web Application Development"],
    roles: ["Full Stack Developer", "Full Stack Engineer", "Web Application Developer"],
    tools: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "TypeScript", "Git"],
    skills: ["Frontend Development", "Backend Development", "REST APIs", "Database Design", "Authentication", "Deployment", "Testing", "System Integration"],
    focus: ["end-to-end product development", "frontend-backend integration", "scalable web applications"],
    resumeKeywords: ["full-stack development", "end-to-end development", "REST APIs", "database integration", "authentication", "deployment"],
    interviewTopics: ["JavaScript", "React", "Node.js", "Databases", "APIs", "Authentication", "Deployment", "System Design"],
    projectAreas: ["full-stack SaaS", "e-commerce platform", "management dashboard", "AI web application", "real-time application"],
  }),
  makeTrack("cse.ai-ml", "CSE", "Artificial Intelligence & Machine Learning", {
    aliases: ["AI/ML", "AI ML", "Artificial Intelligence", "Machine Learning", "AI Engineer", "ML Engineer", "Artificial Intelligence and Machine Learning"],
    roles: ["AI Engineer", "Machine Learning Engineer", "Applied AI Engineer", "ML Developer"],
    tools: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "Jupyter", "Git"],
    skills: ["Machine Learning", "Deep Learning", "Model Evaluation", "Feature Engineering", "Data Preprocessing", "NLP", "Computer Vision", "Model Deployment"],
    focus: ["applied machine learning", "model evaluation", "real-world AI systems"],
    resumeKeywords: ["machine learning", "model training", "model evaluation", "feature engineering", "data preprocessing", "deep learning", "AI deployment"],
    interviewTopics: ["Machine Learning", "Statistics", "Python", "Model Evaluation", "Neural Networks", "NLP", "Computer Vision", "ML System Design"],
    projectAreas: ["prediction system", "recommendation system", "NLP application", "computer vision application", "AI assistant"],
  }),
  makeTrack("cse.data-science", "CSE", "Data Science", {
    aliases: ["Data Scientist", "Applied Data Science"],
    roles: ["Data Scientist", "Junior Data Scientist", "Applied Data Scientist"],
    tools: ["Python", "Pandas", "NumPy", "scikit-learn", "SQL", "Jupyter", "Power BI"],
    skills: ["Statistics", "Data Cleaning", "Exploratory Data Analysis", "Feature Engineering", "Machine Learning", "Data Visualization", "Experimentation", "Storytelling with Data"],
    focus: ["data-driven decision making", "statistical analysis", "predictive modeling"],
    resumeKeywords: ["data analysis", "exploratory data analysis", "statistical modeling", "machine learning", "data visualization", "predictive analytics"],
    interviewTopics: ["Statistics", "Probability", "Python", "SQL", "Machine Learning", "EDA", "Model Evaluation", "Experiment Design"],
    projectAreas: ["predictive analytics", "business forecasting", "recommendation system", "customer analytics"],
  }),
  makeTrack("cse.data-analytics", "CSE", "Data Analytics", {
    aliases: ["Data Analyst", "Data Analytics", "Business Data Analytics", "Analytics"],
    roles: ["Data Analyst", "Business Analyst", "BI Analyst", "Reporting Analyst"],
    tools: ["SQL", "Excel", "Power BI", "Tableau", "Python", "Pandas"],
    skills: ["Data Cleaning", "Data Visualization", "SQL", "Dashboarding", "Statistics", "Business Analysis", "Requirements Gathering", "Storytelling with Data"],
    focus: ["business-focused analysis", "dashboarding", "data-backed decisions"],
    resumeKeywords: ["SQL analysis", "Power BI dashboards", "data visualization", "business insights", "KPI reporting", "data cleaning"],
    interviewTopics: ["SQL", "Excel", "Power BI", "Statistics", "Data Cleaning", "Business Cases", "Dashboard Design"],
    projectAreas: ["sales dashboard", "customer analytics", "financial dashboard", "operations analytics"],
  }),
  makeTrack("cse.cybersecurity", "CSE", "Cybersecurity", {
    aliases: ["Cyber Security", "Information Security", "Security Engineering", "SOC", "Security Operations"],
    roles: ["Cybersecurity Analyst", "Security Analyst", "SOC Analyst", "Security Engineer"],
    tools: ["Linux", "Wireshark", "Burp Suite", "Nmap", "SIEM", "Git", "Python"],
    skills: ["Network Security", "Vulnerability Assessment", "Security Monitoring", "Incident Response", "OWASP", "Threat Analysis", "Identity and Access Management"],
    focus: ["security monitoring", "vulnerability reduction", "secure systems"],
    resumeKeywords: ["vulnerability assessment", "security monitoring", "incident response", "network security", "OWASP", "SIEM", "threat analysis"],
    interviewTopics: ["Networking", "Linux", "OWASP", "Authentication", "Cryptography", "Threat Modeling", "Incident Response"],
    projectAreas: ["vulnerability scanner", "security dashboard", "secure authentication", "network monitoring"],
  }),
  makeTrack("cse.cloud-devops", "CSE", "Cloud & DevOps", {
    aliases: ["Cloud Computing", "Cloud Engineer", "DevOps", "DevOps Engineering", "Cloud DevOps", "Site Reliability", "SRE"],
    roles: ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer", "Platform Engineer"],
    tools: ["AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Linux", "Git"],
    skills: ["CI/CD", "Containerization", "Infrastructure as Code", "Monitoring", "Cloud Networking", "Deployment Automation", "Reliability"],
    focus: ["reliable deployments", "cloud infrastructure", "automation and observability"],
    resumeKeywords: ["CI/CD", "Docker", "Kubernetes", "AWS", "infrastructure as code", "deployment automation", "monitoring"],
    interviewTopics: ["Linux", "Networking", "Docker", "Kubernetes", "CI/CD", "Cloud Architecture", "Terraform"],
    projectAreas: ["CI/CD pipeline", "containerized application", "cloud deployment", "monitoring platform"],
  }),
  makeTrack("cse.mobile", "CSE", "Mobile App Development", {
    aliases: ["Mobile Development", "Android Development", "iOS Development", "Flutter Development", "React Native", "App Development"],
    roles: ["Mobile App Developer", "Android Developer", "Flutter Developer", "React Native Developer"],
    tools: ["Flutter", "Dart", "Kotlin", "Java", "React Native", "Firebase", "Git"],
    skills: ["Mobile UI", "State Management", "API Integration", "Local Storage", "Push Notifications", "Mobile Testing", "App Deployment"],
    focus: ["mobile user experiences", "stable app architecture", "cross-platform development"],
    resumeKeywords: ["mobile app development", "Flutter", "Android", "API integration", "Firebase", "state management"],
    interviewTopics: ["Dart/Kotlin", "Flutter", "Mobile Architecture", "State Management", "APIs", "Local Storage", "App Lifecycle"],
    projectAreas: ["student utility app", "personal finance app", "AI mobile assistant", "community app"],
  }),
];

const IT_TRACKS: CareerTrack[] = CSE_TRACKS.map((item) => ({ ...item, id: item.id.replace(/^cse\./, "it."), stream: "IT" }));
const MCA_TRACKS: CareerTrack[] = CSE_TRACKS.map((item) => ({ ...item, id: item.id.replace(/^cse\./, "mca."), stream: "MCA" }));

/* -------------------------------------------------------------------------- */
/* ELECTRONICS / ELECTRICAL                                                   */
/* -------------------------------------------------------------------------- */

const ECE_TRACKS: CareerTrack[] = [
  makeTrack("ece.embedded", "ECE", "Embedded Systems", {
    aliases: ["Embedded Systems", "Embedded Engineering", "Embedded Developer", "Embedded Engineer"],
    roles: ["Embedded Engineer", "Embedded Developer", "Firmware Engineer"],
    tools: ["C", "C++", "STM32", "Arduino", "ESP32", "Git", "Keil"],
    skills: ["Microcontrollers", "UART", "SPI", "I2C", "RTOS", "Firmware", "Debugging", "Device Drivers"],
    focus: ["hardware-software integration", "firmware development", "real-time systems"],
    resumeKeywords: ["embedded C", "microcontroller programming", "firmware development", "RTOS", "UART", "SPI", "I2C"],
    interviewTopics: ["C", "Microcontrollers", "Interrupts", "UART", "SPI", "I2C", "RTOS", "Memory"],
    projectAreas: ["IoT device", "sensor controller", "embedded automation", "smart monitoring device"],
  }),
  makeTrack("ece.vlsi", "ECE", "VLSI Design", {
    aliases: ["VLSI", "Digital VLSI", "IC Design", "Semiconductor Design"],
    roles: ["VLSI Design Engineer", "RTL Design Engineer", "Verification Engineer"],
    tools: ["Verilog", "SystemVerilog", "Vivado", "Cadence", "ModelSim"],
    skills: ["RTL Design", "Digital Logic", "Functional Verification", "FPGA", "Timing Analysis", "Testbenches"],
    focus: ["RTL design", "verification", "digital hardware implementation"],
    resumeKeywords: ["RTL design", "Verilog", "SystemVerilog", "FPGA", "functional verification", "digital design"],
    interviewTopics: ["Digital Logic", "Verilog", "SystemVerilog", "Timing", "FSM", "Verification", "FPGA"],
    projectAreas: ["processor module", "UART controller", "FPGA project", "digital signal block"],
  }),
  makeTrack("ece.iot", "ECE", "Internet of Things", {
    aliases: ["IoT", "Internet of Things", "IoT Engineering", "IoT Developer"],
    roles: ["IoT Engineer", "IoT Developer", "Embedded IoT Engineer"],
    tools: ["ESP32", "Arduino", "MQTT", "Python", "AWS IoT", "Firebase"],
    skills: ["Sensors", "Connectivity", "MQTT", "Embedded Programming", "Cloud Integration", "Edge Processing", "Data Collection"],
    focus: ["connected devices", "edge-to-cloud systems", "real-time sensor data"],
    resumeKeywords: ["IoT", "MQTT", "sensor integration", "edge computing", "cloud connectivity", "real-time monitoring"],
    interviewTopics: ["Sensors", "MQTT", "Embedded Systems", "Networking", "Cloud IoT", "Edge Computing"],
    projectAreas: ["smart home", "industrial monitoring", "wearable IoT", "environmental monitoring"],
  }),
  makeTrack("ece.robotics", "ECE", "Robotics & Automation", {
    aliases: ["Robotics", "Robotics Engineering", "Automation", "Robotics and Automation"],
    roles: ["Robotics Engineer", "Automation Engineer", "Robotics Software Engineer"],
    tools: ["ROS", "Python", "C++", "Arduino", "Raspberry Pi", "MATLAB"],
    skills: ["Control Systems", "Sensors", "Actuators", "ROS", "Computer Vision", "Path Planning", "Embedded Systems"],
    focus: ["robot perception and control", "automation", "hardware-software integration"],
    resumeKeywords: ["ROS", "robotics", "automation", "sensor fusion", "path planning", "computer vision", "control systems"],
    interviewTopics: ["ROS", "Kinematics", "Control", "Sensors", "Computer Vision", "Path Planning", "Embedded Systems"],
    projectAreas: ["mobile robot", "autonomous navigation", "industrial automation", "robot arm"],
  }),
  makeTrack("ece.communication", "ECE", "Communication Systems", {
    aliases: ["Communication Systems", "Telecommunications", "Wireless Communication", "RF", "Digital Communication"],
    roles: ["Communication Engineer", "RF Engineer", "Telecom Engineer", "Network Engineer"],
    tools: ["MATLAB", "Simulink", "LabVIEW", "Python", "GNU Radio"],
    skills: ["Signal Processing", "Digital Communication", "RF Fundamentals", "Modulation", "Wireless Systems", "Network Fundamentals"],
    focus: ["communication systems", "signal quality", "wireless technologies"],
    resumeKeywords: ["signal processing", "digital communication", "RF", "wireless communication", "MATLAB", "Simulink"],
    interviewTopics: ["Signals and Systems", "Communication", "Modulation", "RF", "Digital Signal Processing", "Wireless Networks"],
    projectAreas: ["wireless communication prototype", "signal analysis", "RF simulation", "communication model"],
  }),
];

const EEE_TRACKS: CareerTrack[] = [
  makeTrack("eee.power", "EEE", "Power Systems", {
    aliases: ["Power Systems", "Power Engineering"],
    roles: ["Power Systems Engineer", "Electrical Engineer"],
    tools: ["ETAP", "MATLAB", "Simulink", "AutoCAD"],
    skills: ["Power Distribution", "Load Flow", "Protection", "Electrical Machines", "Grid Fundamentals"],
    focus: ["power system analysis", "electrical safety", "reliable power distribution"],
    resumeKeywords: ["power systems", "load flow", "protection", "electrical machines", "power distribution"],
    interviewTopics: ["Power Systems", "Machines", "Protection", "Power Electronics", "Electrical Measurements"],
    projectAreas: ["power quality analysis", "distribution system", "load forecasting", "protection study"],
  }),
  makeTrack("eee.power-electronics", "EEE", "Power Electronics", {
    aliases: ["Power Electronics", "Power Converter Design"],
    roles: ["Power Electronics Engineer", "Electrical Design Engineer"],
    tools: ["MATLAB", "Simulink", "LTspice", "PLECS"],
    skills: ["Converters", "Inverters", "Switching Devices", "Control", "Circuit Analysis", "Power Semiconductor Devices"],
    focus: ["efficient power conversion", "converter design", "control of power electronics"],
    resumeKeywords: ["power converters", "inverter design", "power electronics", "MATLAB Simulink", "control systems"],
    interviewTopics: ["Converters", "Inverters", "MOSFET", "IGBT", "PWM", "Control", "Circuit Analysis"],
    projectAreas: ["solar inverter", "DC-DC converter", "motor drive", "battery charger"],
  }),
  makeTrack("eee.automation", "EEE", "Control Systems & Automation", {
    aliases: ["Control Systems", "Control Engineering", "Industrial Automation", "Automation Engineering"],
    roles: ["Control Systems Engineer", "Automation Engineer", "Controls Engineer"],
    tools: ["MATLAB", "Simulink", "PLC", "SCADA", "LabVIEW"],
    skills: ["PID Control", "PLC", "SCADA", "Industrial Automation", "Feedback Systems", "Instrumentation"],
    focus: ["automated control", "industrial systems", "closed-loop performance"],
    resumeKeywords: ["PLC", "SCADA", "PID control", "industrial automation", "control systems", "instrumentation"],
    interviewTopics: ["Control Systems", "PID", "PLC", "SCADA", "Sensors", "Industrial Automation"],
    projectAreas: ["automated process", "PLC control system", "smart factory", "motor control"],
  }),
  makeTrack("eee.renewable", "EEE", "Renewable Energy", {
    aliases: ["Renewable Energy", "Solar Energy", "Sustainable Energy", "Green Energy"],
    roles: ["Renewable Energy Engineer", "Solar Design Engineer", "Energy Analyst"],
    tools: ["MATLAB", "PVsyst", "HOMER", "AutoCAD"],
    skills: ["Solar PV", "Energy Systems", "Energy Storage", "Load Analysis", "Energy Efficiency", "Sustainability"],
    focus: ["clean energy systems", "energy efficiency", "sustainable electrical solutions"],
    resumeKeywords: ["solar PV", "renewable energy", "energy storage", "energy efficiency", "sustainability"],
    interviewTopics: ["Solar PV", "Batteries", "Energy Storage", "Power Systems", "Energy Efficiency"],
    projectAreas: ["solar monitoring", "energy management", "microgrid", "battery management"],
  }),
];

/* -------------------------------------------------------------------------- */
/* MECHANICAL / CIVIL                                                         */
/* -------------------------------------------------------------------------- */

const MECHANICAL_TRACKS: CareerTrack[] = [
  makeTrack("mechanical.design", "Mechanical", "Mechanical Design & CAD", {
    aliases: ["Mechanical Design", "CAD", "Computer Aided Design", "Product Design", "Design Engineering"],
    roles: ["Mechanical Design Engineer", "CAD Engineer", "Design Engineer"],
    tools: ["SolidWorks", "AutoCAD", "CATIA", "Creo", "Fusion 360"],
    skills: ["3D CAD", "Engineering Drawing", "GD&T", "Product Design", "DFM", "Tolerance Analysis"],
    focus: ["design for manufacturability", "accurate CAD design", "practical product engineering"],
    resumeKeywords: ["3D CAD", "SolidWorks", "AutoCAD", "GD&T", "product design", "DFM"],
    interviewTopics: ["CAD", "GD&T", "Manufacturing", "Materials", "Design for Manufacturing"],
    projectAreas: ["machine component", "consumer product", "automotive component", "mechanical assembly"],
  }),
  makeTrack("mechanical.manufacturing", "Mechanical", "Manufacturing & Production", {
    aliases: ["Manufacturing", "Production Engineering", "Manufacturing Engineering", "Production"],
    roles: ["Manufacturing Engineer", "Production Engineer", "Process Engineer"],
    tools: ["AutoCAD", "SolidWorks", "Minitab", "SAP"],
    skills: ["Lean Manufacturing", "Process Improvement", "Quality Control", "Six Sigma", "Production Planning", "Root Cause Analysis"],
    focus: ["process efficiency", "quality improvement", "manufacturing performance"],
    resumeKeywords: ["lean manufacturing", "process optimization", "quality control", "Six Sigma", "root cause analysis", "production planning"],
    interviewTopics: ["Lean", "Six Sigma", "Quality", "Production Planning", "Process Improvement", "Manufacturing"],
    projectAreas: ["process optimization", "quality improvement", "production planning", "waste reduction"],
  }),
  makeTrack("mechanical.automotive", "Mechanical", "Automotive Engineering", {
    aliases: ["Automotive", "Automobile Engineering", "Vehicle Engineering"],
    roles: ["Automotive Engineer", "Vehicle Engineer", "Automotive Design Engineer"],
    tools: ["CATIA", "SolidWorks", "ANSYS", "MATLAB", "Simulink"],
    skills: ["Vehicle Dynamics", "CAD", "Thermodynamics", "Automotive Design", "Simulation", "Materials"],
    focus: ["vehicle systems", "automotive design", "engineering simulation"],
    resumeKeywords: ["automotive design", "vehicle dynamics", "CAD", "simulation", "automotive systems"],
    interviewTopics: ["Vehicle Dynamics", "Thermodynamics", "Automotive Systems", "CAD", "Simulation"],
    projectAreas: ["electric vehicle subsystem", "vehicle component", "automotive simulation", "battery thermal study"],
  }),
  makeTrack("mechanical.mechatronics", "Mechanical", "Mechatronics", {
    aliases: ["Mechatronics", "Mechatronics Engineering", "Smart Manufacturing"],
    roles: ["Mechatronics Engineer", "Automation Engineer", "Controls Engineer"],
    tools: ["Arduino", "Raspberry Pi", "PLC", "MATLAB", "SolidWorks"],
    skills: ["Sensors", "Actuators", "Control Systems", "Embedded Systems", "CAD", "Automation"],
    focus: ["mechanical-electrical integration", "automation", "smart machines"],
    resumeKeywords: ["mechatronics", "automation", "control systems", "embedded systems", "sensors", "actuators"],
    interviewTopics: ["Control Systems", "Sensors", "Actuators", "Embedded Systems", "Automation", "CAD"],
    projectAreas: ["automated machine", "robotic mechanism", "smart manufacturing system", "sorting machine"],
  }),
];

const CIVIL_TRACKS: CareerTrack[] = [
  makeTrack("civil.structural", "Civil", "Structural Engineering", {
    aliases: ["Structural Engineering", "Structural Design", "Structures"],
    roles: ["Structural Engineer", "Structural Design Engineer"],
    tools: ["STAAD Pro", "ETABS", "SAP2000", "AutoCAD", "Revit"],
    skills: ["Structural Analysis", "Reinforced Concrete", "Steel Structures", "Load Calculations", "BIM", "Engineering Drawing"],
    focus: ["safe structural design", "structural analysis", "constructible engineering solutions"],
    resumeKeywords: ["structural analysis", "ETABS", "STAAD Pro", "RCC design", "steel design", "BIM"],
    interviewTopics: ["Structural Analysis", "RCC", "Steel Structures", "Loads", "Earthquake Engineering", "BIM"],
    projectAreas: ["building structure", "bridge analysis", "structural assessment", "earthquake-resistant design"],
  }),
  makeTrack("civil.construction", "Civil", "Construction Management", {
    aliases: ["Construction", "Construction Management", "Project Construction"],
    roles: ["Site Engineer", "Construction Engineer", "Project Engineer"],
    tools: ["AutoCAD", "Primavera P6", "MS Project", "Revit"],
    skills: ["Project Planning", "Cost Estimation", "Site Management", "Scheduling", "Quality Control", "Safety Management"],
    focus: ["project execution", "cost and schedule control", "construction quality"],
    resumeKeywords: ["construction management", "site execution", "project scheduling", "cost estimation", "quality control", "safety"],
    interviewTopics: ["Construction Planning", "Estimation", "Scheduling", "Contracts", "Quality", "Safety"],
    projectAreas: ["construction planning", "site productivity", "cost estimation", "project schedule"],
  }),
  makeTrack("civil.bim", "Civil", "BIM & Digital Construction", {
    aliases: ["BIM", "Building Information Modeling", "Digital Construction"],
    roles: ["BIM Engineer", "BIM Coordinator", "Digital Construction Engineer"],
    tools: ["Revit", "Navisworks", "AutoCAD", "Civil 3D"],
    skills: ["3D Modeling", "BIM Coordination", "Clash Detection", "Quantity Takeoff", "Digital Construction"],
    focus: ["digital building workflows", "BIM coordination", "construction information management"],
    resumeKeywords: ["BIM", "Revit", "clash detection", "3D modeling", "quantity takeoff"],
    interviewTopics: ["BIM", "Revit", "Clash Detection", "Quantity Takeoff", "Construction Coordination"],
    projectAreas: ["building BIM model", "clash detection study", "quantity takeoff", "digital twin concept"],
  }),
];

/* -------------------------------------------------------------------------- */
/* BUSINESS / DESIGN / OTHER                                                  */
/* -------------------------------------------------------------------------- */

const MBA_TRACKS: CareerTrack[] = [
  makeTrack("mba.finance", "MBA", "Finance", {
    aliases: ["MBA Finance", "Financial Management", "Corporate Finance"],
    roles: ["Financial Analyst", "Finance Analyst", "Corporate Finance Associate"],
    tools: ["Excel", "Power BI", "SQL", "Tableau"],
    skills: ["Financial Analysis", "Financial Modeling", "Budgeting", "Forecasting", "Valuation", "Business Analysis"],
    focus: ["financial decision support", "financial modeling", "business performance analysis"],
    resumeKeywords: ["financial analysis", "financial modeling", "forecasting", "budgeting", "valuation", "KPI analysis"],
    interviewTopics: ["Financial Statements", "Valuation", "Financial Ratios", "Budgeting", "Corporate Finance", "Case Studies"],
    projectAreas: ["financial model", "company valuation", "budget analysis", "financial dashboard"],
  }),
  makeTrack("mba.marketing", "MBA", "Marketing", {
    aliases: ["MBA Marketing", "Digital Marketing", "Brand Management", "Growth Marketing"],
    roles: ["Marketing Associate", "Digital Marketing Analyst", "Brand Associate"],
    tools: ["Google Analytics", "HubSpot", "Canva", "Excel", "Power BI"],
    skills: ["Market Research", "Digital Marketing", "Content Strategy", "Campaign Analysis", "Brand Strategy", "Customer Insights"],
    focus: ["customer-centric marketing", "campaign performance", "brand and growth strategy"],
    resumeKeywords: ["digital marketing", "campaign analysis", "market research", "customer insights", "brand strategy", "growth"],
    interviewTopics: ["Marketing Fundamentals", "Consumer Behavior", "Digital Marketing", "Marketing Analytics", "Case Studies"],
    projectAreas: ["marketing campaign", "brand strategy", "customer segmentation", "digital campaign dashboard"],
  }),
  makeTrack("mba.hr", "MBA", "Human Resources", {
    aliases: ["MBA HR", "HR Management", "People Operations", "Talent Management"],
    roles: ["HR Associate", "HR Analyst", "Talent Acquisition Associate", "People Operations Associate"],
    tools: ["Excel", "Power BI", "HRIS", "Google Workspace"],
    skills: ["Recruitment", "Employee Engagement", "People Analytics", "Performance Management", "HR Operations", "Communication"],
    focus: ["people operations", "evidence-based HR", "employee experience"],
    resumeKeywords: ["talent acquisition", "people analytics", "employee engagement", "HR operations", "performance management"],
    interviewTopics: ["Recruitment", "HR Operations", "Employee Relations", "People Analytics", "Behavioral Interviews"],
    projectAreas: ["employee engagement study", "recruitment dashboard", "attrition analysis", "HR process improvement"],
  }),
  makeTrack("mba.operations", "MBA", "Operations & Supply Chain", {
    aliases: ["MBA Operations", "Operations Management", "Supply Chain", "Supply Chain Management"],
    roles: ["Operations Analyst", "Supply Chain Analyst", "Operations Manager Trainee"],
    tools: ["Excel", "Power BI", "SAP", "SQL"],
    skills: ["Process Improvement", "Supply Chain", "Inventory Management", "Forecasting", "Operations Analytics", "Project Management"],
    focus: ["process efficiency", "operations analytics", "supply chain performance"],
    resumeKeywords: ["operations management", "supply chain", "inventory optimization", "process improvement", "operations analytics"],
    interviewTopics: ["Operations", "Supply Chain", "Inventory", "Forecasting", "Process Improvement", "Business Cases"],
    projectAreas: ["inventory optimization", "supply chain dashboard", "operations process improvement", "demand forecasting"],
  }),
  makeTrack("mba.business-analytics", "MBA", "Business Analytics", {
    aliases: ["MBA Business Analytics", "Management Analytics", "Analytics for Business"],
    roles: ["Business Analyst", "Business Intelligence Analyst", "Analytics Consultant"],
    tools: ["SQL", "Power BI", "Tableau", "Excel", "Python"],
    skills: ["Business Analysis", "Data Visualization", "SQL", "Statistics", "Dashboarding", "Requirements Gathering"],
    focus: ["business insights", "analytics-driven decisions", "stakeholder communication"],
    resumeKeywords: ["business analytics", "SQL", "Power BI", "business insights", "dashboarding", "KPI analysis"],
    interviewTopics: ["SQL", "Business Cases", "Statistics", "Power BI", "Requirements", "Data Interpretation"],
    projectAreas: ["business dashboard", "sales analytics", "customer segmentation", "KPI reporting"],
  }),
  makeTrack("mba.product", "MBA", "Product Management", {
    aliases: ["Product Management", "Product Manager", "Product Strategy", "Technical Product Management"],
    roles: ["Product Analyst", "Associate Product Manager", "Product Operations Associate"],
    tools: ["Figma", "Jira", "Confluence", "Excel", "Analytics Tools"],
    skills: ["Product Discovery", "Requirements", "Roadmapping", "Stakeholder Management", "User Research", "Product Analytics"],
    focus: ["customer-centered product decisions", "roadmapping", "cross-functional execution"],
    resumeKeywords: ["product management", "product discovery", "roadmapping", "user research", "product analytics", "stakeholder management"],
    interviewTopics: ["Product Sense", "Product Strategy", "Metrics", "User Research", "Roadmapping", "Case Interviews"],
    projectAreas: ["product case study", "feature roadmap", "user research project", "product analytics dashboard"],
  }),
];

const DESIGN_TRACKS: CareerTrack[] = [
  makeTrack("design.ui-ux", "Design", "UI/UX Design", {
    aliases: ["UI/UX Designer", "UI UX", "UX Design", "User Experience Design", "User Interface Design", "Product Design"],
    roles: ["UI/UX Designer", "Product Designer", "UX Designer", "UI Designer"],
    tools: ["Figma", "FigJam", "Framer", "Adobe XD"],
    skills: ["User Research", "Information Architecture", "Wireframing", "Prototyping", "Visual Design", "Usability Testing", "Design Systems"],
    focus: ["user-centered design", "clear interaction patterns", "high-fidelity product experiences"],
    resumeKeywords: ["user research", "wireframing", "prototyping", "usability testing", "design systems", "interaction design"],
    interviewTopics: ["Design Process", "User Research", "Usability", "Design Systems", "Interaction Design", "Portfolio Case Studies"],
    projectAreas: ["mobile app redesign", "SaaS dashboard", "e-commerce UX", "end-to-end case study"],
  }),
  makeTrack("design.graphic", "Design", "Graphic Design", {
    aliases: ["Graphic Design", "Visual Design", "Brand Design", "Communication Design"],
    roles: ["Graphic Designer", "Visual Designer", "Brand Designer"],
    tools: ["Figma", "Adobe Illustrator", "Photoshop", "Canva"],
    skills: ["Typography", "Layout", "Branding", "Visual Hierarchy", "Color", "Composition"],
    focus: ["strong visual communication", "brand consistency", "clear visual storytelling"],
    resumeKeywords: ["visual design", "branding", "typography", "layout", "visual communication"],
    interviewTopics: ["Design Principles", "Typography", "Color", "Branding", "Portfolio Presentation"],
    projectAreas: ["brand identity", "campaign visuals", "editorial design", "social media design"],
  }),
];

const COMMERCE_TRACKS: CareerTrack[] = [
  makeTrack("commerce.accounting", "Commerce", "Accounting & Finance", {
    aliases: ["Accounting", "B.Com Finance", "Accounts", "Finance and Accounts"],
    roles: ["Accounts Executive", "Junior Financial Analyst", "Audit Associate"],
    tools: ["Excel", "Tally", "Power BI", "SQL"],
    skills: ["Accounting", "Financial Reporting", "Tax Basics", "Excel", "Reconciliation", "Data Analysis"],
    focus: ["accurate financial reporting", "accounting processes", "financial analysis"],
    resumeKeywords: ["accounting", "financial reporting", "reconciliation", "Excel", "financial analysis"],
    interviewTopics: ["Accounting", "Financial Statements", "Excel", "Tax Basics", "Audit Basics"],
    projectAreas: ["financial dashboard", "expense analysis", "accounting automation", "budget tracker"],
  }),
  makeTrack("commerce.business", "Commerce", "Business & Management", {
    aliases: ["B.Com", "Business Management", "Business Administration", "Commerce Management"],
    roles: ["Business Analyst", "Operations Associate", "Business Operations Associate"],
    tools: ["Excel", "Power BI", "Google Workspace", "SQL"],
    skills: ["Business Analysis", "Data Analysis", "Communication", "Operations", "Reporting", "Problem Solving"],
    focus: ["business operations", "analysis", "clear stakeholder communication"],
    resumeKeywords: ["business analysis", "operations", "reporting", "data analysis", "stakeholder communication"],
    interviewTopics: ["Business Basics", "Excel", "Analytics", "Operations", "Case Questions"],
    projectAreas: ["business dashboard", "operations tracker", "sales analysis", "process improvement"],
  }),
];

const OTHER_ENGINEERING_TRACKS: CareerTrack[] = [
  makeTrack("aerospace.design", "Aerospace", "Aerospace Design & Analysis", {
    aliases: ["Aerospace Engineering", "Aerospace Design", "Aircraft Design", "Aeronautical Engineering"],
    roles: ["Aerospace Engineer", "Aircraft Design Engineer", "Aerospace Analyst"],
    tools: ["ANSYS", "CATIA", "SolidWorks", "MATLAB", "XFLR5"],
    skills: ["Aerodynamics", "Aircraft Structures", "CAD", "CFD", "Simulation", "Flight Mechanics"],
    focus: ["aircraft design", "aerodynamic analysis", "engineering simulation"],
    resumeKeywords: ["aerodynamics", "aircraft structures", "CFD", "CAD", "flight mechanics", "simulation"],
    interviewTopics: ["Aerodynamics", "Flight Mechanics", "Structures", "CFD", "Aircraft Design"],
    projectAreas: ["airfoil analysis", "drone design", "aircraft component", "CFD study"],
  }),
  makeTrack("biomedical.devices", "Biomedical", "Medical Devices & Bioinstrumentation", {
    aliases: ["Biomedical Engineering", "Medical Devices", "Bioinstrumentation", "Biomedical Instrumentation"],
    roles: ["Biomedical Engineer", "Medical Device Engineer", "Bioinstrumentation Engineer"],
    tools: ["MATLAB", "LabVIEW", "Python", "Arduino"],
    skills: ["Biomedical Signals", "Sensors", "Instrumentation", "Medical Device Design", "Signal Processing", "Data Analysis"],
    focus: ["medical device development", "biomedical signal analysis", "safe instrumentation"],
    resumeKeywords: ["biomedical instrumentation", "medical devices", "signal processing", "sensors", "biomedical signals"],
    interviewTopics: ["Biomedical Signals", "Sensors", "Instrumentation", "Signal Processing", "Medical Devices"],
    projectAreas: ["health monitoring device", "ECG analysis", "wearable medical device", "patient monitoring"],
  }),
  makeTrack("chemical.process", "Chemical Engineering", "Process Engineering", {
    aliases: ["Chemical Engineering", "Process Engineering", "Chemical Process", "Process Design"],
    roles: ["Process Engineer", "Chemical Engineer", "Process Design Engineer"],
    tools: ["Aspen HYSYS", "Aspen Plus", "MATLAB", "AutoCAD"],
    skills: ["Process Design", "Mass Transfer", "Heat Transfer", "Process Control", "Thermodynamics", "Safety"],
    focus: ["safe process design", "process optimization", "industrial efficiency"],
    resumeKeywords: ["process design", "process optimization", "process control", "thermodynamics", "process safety"],
    interviewTopics: ["Thermodynamics", "Heat Transfer", "Mass Transfer", "Process Control", "Process Safety"],
    projectAreas: ["process simulation", "heat exchanger analysis", "process optimization", "safety study"],
  }),
  makeTrack("biotech.biotechnology", "Biotechnology", "Biotechnology", {
    aliases: ["Biotechnology", "Biotech", "Biological Engineering"],
    roles: ["Biotechnology Research Assistant", "Bioprocess Associate", "Lab Analyst"],
    tools: ["Python", "R", "MATLAB", "Excel"],
    skills: ["Molecular Biology", "Cell Culture", "Bioprocessing", "Laboratory Techniques", "Data Analysis", "Scientific Documentation"],
    focus: ["laboratory research", "bioprocess development", "evidence-based scientific work"],
    resumeKeywords: ["biotechnology", "laboratory research", "bioprocessing", "data analysis", "scientific documentation"],
    interviewTopics: ["Biology", "Biochemistry", "Molecular Biology", "Bioprocessing", "Laboratory Methods"],
    projectAreas: ["bioprocess study", "bioinformatics analysis", "laboratory research", "biomedical data analysis"],
  }),
];

/* -------------------------------------------------------------------------- */
/* DOMAIN REGISTRY                                                             */
/* -------------------------------------------------------------------------- */

export const CAREER_DOMAINS: CareerDomain[] = [
  { id: "cse", name: "CSE", aliases: ["Computer Science", "Computer Science and Engineering", "CS"], specializations: CSE_TRACKS },
  { id: "it", name: "IT", aliases: ["Information Technology", "Information Tech"], specializations: IT_TRACKS },
  { id: "ece", name: "ECE", aliases: ["Electronics", "Electronics and Communication Engineering"], specializations: ECE_TRACKS },
  { id: "eee", name: "EEE", aliases: ["Electrical", "Electrical and Electronics Engineering"], specializations: EEE_TRACKS },
  { id: "mechanical", name: "Mechanical", aliases: ["Mechanical Engineering", "ME"], specializations: MECHANICAL_TRACKS },
  { id: "civil", name: "Civil", aliases: ["Civil Engineering", "CE"], specializations: CIVIL_TRACKS },
  { id: "chemical", name: "Chemical Engineering", aliases: ["Chemical", "ChemE"], specializations: OTHER_ENGINEERING_TRACKS.filter((x) => x.stream === "Chemical Engineering") },
  { id: "biotechnology", name: "Biotechnology", aliases: ["Biotech", "Biological Sciences"], specializations: OTHER_ENGINEERING_TRACKS.filter((x) => x.stream === "Biotechnology") },
  { id: "aerospace", name: "Aerospace", aliases: ["Aerospace Engineering", "Aeronautical Engineering"], specializations: OTHER_ENGINEERING_TRACKS.filter((x) => x.stream === "Aerospace") },
  { id: "biomedical", name: "Biomedical", aliases: ["Biomedical Engineering", "Bio-Medical"], specializations: OTHER_ENGINEERING_TRACKS.filter((x) => x.stream === "Biomedical") },
  { id: "mca", name: "MCA", aliases: ["Master of Computer Applications", "Computer Applications"], specializations: MCA_TRACKS },
  { id: "mba", name: "MBA", aliases: ["Master of Business Administration", "Business Administration"], specializations: MBA_TRACKS },
  { id: "commerce", name: "Commerce", aliases: ["B.Com", "Business Commerce", "Commerce Studies"], specializations: COMMERCE_TRACKS },
  { id: "design", name: "Design", aliases: ["Design Studies", "Communication Design"], specializations: DESIGN_TRACKS },
];

export const GENERAL_CAREER_TRACK: CareerTrack = makeTrack(
  "general.career",
  "General",
  "General Career Development",
  {
    aliases: ["General", "Other", "Other Specialization", "Career"],
    roles: ["Graduate", "Junior Professional", "Entry-Level Professional"],
    tools: ["Git", "Microsoft Excel", "Google Workspace"],
    skills: ["Communication", "Problem Solving", "Project Execution", "Professional Writing", "Teamwork"],
    focus: ["clear professional communication", "evidence-based achievements", "practical project experience"],
    resumeKeywords: ["project execution", "problem solving", "team collaboration", "communication", "measurable outcomes"],
    interviewTopics: ["Communication", "Problem Solving", "Projects", "Behavioral Questions"],
    projectAreas: ["practical student project", "process improvement", "portfolio project"],
  }
);

/* -------------------------------------------------------------------------- */
/* LOOKUP + RECOMMENDATION HELPERS                                            */
/* -------------------------------------------------------------------------- */

const findDomain = (stream?: string | null): CareerDomain | undefined => {
  if (!stream?.trim()) return undefined;
  const value = normalize(stream);
  return CAREER_DOMAINS.find((domain) =>
    [domain.name, domain.id, ...domain.aliases].some((item) => normalize(item) === value)
  );
};

const findTrackInDomain = (
  domain: CareerDomain,
  specialization?: string | null
): { track?: CareerTrack; matchedBy?: "exact" | "alias" } => {
  if (!specialization?.trim()) return {};
  const value = normalize(specialization);

  for (const item of domain.specializations) {
    if (normalize(item.specialization) === value || normalize(item.id) === value) {
      return { track: item, matchedBy: "exact" };
    }
  }

  for (const item of domain.specializations) {
    const aliases = [...item.aliases, ...item.roles];
    if (aliases.some((alias) => normalize(alias) === value)) {
      return { track: item, matchedBy: "alias" };
    }
  }

  return {};
};

export const findCareerTrackBySpecialization = (
  specialization?: string | null
): CareerTrack | undefined => {
  if (!specialization?.trim()) return undefined;
  const value = normalize(specialization);

  for (const domain of CAREER_DOMAINS) {
    for (const item of domain.specializations) {
      const candidates = [item.specialization, item.id, ...item.aliases, ...item.roles];
      if (candidates.some((candidate) => normalize(candidate) === value)) {
        return item;
      }
    }
  }

  return undefined;
};

export const getCareerTrack = (
  stream?: string | null,
  specialization?: string | null
): CareerTrack => {
  const domain = findDomain(stream);

  if (domain) {
    const match = findTrackInDomain(domain, specialization);
    if (match.track) return match.track;
    if (domain.specializations[0]) return domain.specializations[0];
  }

  return findCareerTrackBySpecialization(specialization) ?? GENERAL_CAREER_TRACK;
};

const removeKnownSkills = (recommendations: string[], known: string[]): string[] => {
  const normalizedKnown = known.filter(Boolean).map(normalize);
  return recommendations.filter((item) => {
    const value = normalize(item);
    return !normalizedKnown.some((known) => known === value || known.includes(value) || value.includes(known));
  });
};

export const getCareerRecommendationContext = (
  profile: CareerProfileInput
): CareerRecommendationContext => {
  const domain = findDomain(profile.stream);
  let selected: CareerTrack | undefined;
  let matchedBy: CareerRecommendationContext["matchedBy"] = "general";

  if (domain) {
    const match = findTrackInDomain(domain, profile.specialization);
    if (match.track) {
      selected = match.track;
      matchedBy = match.matchedBy ?? "exact";
    } else if (domain.specializations[0]) {
      selected = domain.specializations[0];
      matchedBy = "stream-fallback";
    }
  }

  if (!selected && profile.specialization) {
    selected = findCareerTrackBySpecialization(profile.specialization);
    if (selected) matchedBy = "specialization-fallback";
  }

  selected ??= GENERAL_CAREER_TRACK;
  const knownSkills = profile.skills?.filter(Boolean) ?? [];

  return {
    stream: selected.stream,
    specialization: selected.specialization,
    roles: [...selected.roles],
    tools: removeKnownSkills(selected.tools, knownSkills),
    skills: removeKnownSkills(selected.skills, knownSkills),
    focus: [...selected.focus],
    resumeKeywords: [...selected.resumeKeywords],
    interviewTopics: [...selected.interviewTopics],
    projectAreas: [...selected.projectAreas],
    matchedBy,
  };
};

export const getResumeRecommendations = (profile: CareerProfileInput) => {
  const context = getCareerRecommendationContext(profile);
  return {
    targetRoles: context.roles,
    recommendedTools: context.tools,
    recommendedSkills: context.skills,
    resumeKeywords: context.resumeKeywords,
    resumeFocus: context.focus,
    projectAreas: context.projectAreas,
  };
};

export const getCareerRecommendations = (profile: CareerProfileInput) => {
  const context = getCareerRecommendationContext(profile);
  return {
    ...context,
    missingSkills: context.skills,
  };
};

export const getSpecializationsForStream = (stream?: string | null): CareerTrack[] =>
  findDomain(stream)?.specializations ?? [];

export const getCareerDomains = (): CareerDomain[] => CAREER_DOMAINS;

export const searchCareerTracks = (query: string, limit = 20): CareerTrack[] => {
  const value = normalize(query);
  if (!value) return [];

  const results: CareerTrack[] = [];

  for (const domain of CAREER_DOMAINS) {
    for (const item of domain.specializations) {
      const searchable = [
        item.specialization,
        item.stream,
        ...item.aliases,
        ...item.roles,
        ...item.tools,
        ...item.skills,
      ].map(normalize).join(" ");

      if (searchable.includes(value)) results.push(item);
      if (results.length >= limit) return results;
    }
  }

  return results;
};

/**
 * Build a compact object for your future AI/API layer.
 * This does not call an AI provider. It only supplies grounded context.
 */
export const buildAiCareerContext = (
  profile: CareerProfileInput,
  currentResumeSkills: string[] = []
) => {
  const context = getCareerRecommendationContext(profile);
  const allKnownSkills = uniq([...(profile.skills ?? []), ...currentResumeSkills]);

  return {
    user: {
      stream: context.stream,
      specialization: context.specialization,
      status: profile.status ?? "",
      experience: profile.experience ?? "",
      education: profile.education ?? "",
      knownSkills: allKnownSkills,
    },
    careerContext: {
      targetRoles: context.roles,
      recommendedTools: context.tools,
      recommendedSkills: context.skills,
      resumeKeywords: context.resumeKeywords,
      resumeFocus: context.focus,
      interviewTopics: context.interviewTopics,
      projectAreas: context.projectAreas,
    },
    matching: {
      matchedBy: context.matchedBy,
      missingTools: removeKnownSkills(context.tools, currentResumeSkills),
      missingSkills: removeKnownSkills(context.skills, currentResumeSkills),
    },
    instructions: [
      "Personalize recommendations to the user's domain and specialization.",
      "Do not repeat skills the user already demonstrates unless deeper proficiency is relevant.",
      "Prioritize practical recommendations appropriate to the user's experience level.",
      "Use the career context as grounding; do not treat it as an inflexible answer.",
      "Explain why a recommendation matters when the UI asks for an explanation.",
    ],
  };
};

/* -------------------------------------------------------------------------- */
/* OPTIONAL: AI-PROMPT BUILDER                                                 */
/* -------------------------------------------------------------------------- */

export const buildCareerAiPrompt = (
  profile: CareerProfileInput,
  currentResumeText = ""
): string => {
  const context = buildAiCareerContext(profile);

  return `You are Velora, an AI career assistant.

USER PROFILE
- Domain: ${context.user.stream}
- Specialization: ${context.user.specialization}
- Status: ${context.user.status || "Not specified"}
- Experience: ${context.user.experience || "Not specified"}
- Education: ${context.user.education || "Not specified"}
- Known skills: ${context.user.knownSkills.join(", ") || "None provided"}

CAREER CONTEXT
- Target roles: ${context.careerContext.targetRoles.join(", ")}
- Recommended tools: ${context.careerContext.recommendedTools.join(", ")}
- Recommended skills: ${context.careerContext.recommendedSkills.join(", ")}
- Resume keywords: ${context.careerContext.resumeKeywords.join(", ")}
- Resume focus: ${context.careerContext.resumeFocus.join("; ")}
- Interview topics: ${context.careerContext.interviewTopics.join(", ")}
- Project areas: ${context.careerContext.projectAreas.join(", ")}

CURRENT RESUME
${currentResumeText || "No resume text provided yet."}

TASK
Provide practical, personalized career recommendations for the user's selected domain and specialization.
Do not recommend unrelated skills.
Do not repeat skills that are already clearly demonstrated in the profile or resume unless you are suggesting an advanced level.
Prioritize recommendations appropriate for the user's experience level.
When recommending a missing skill, explain briefly why it matters for the target role.
Return structured JSON when the calling API requests JSON.`;
};
