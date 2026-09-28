// src/app/career-map/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  Compass,
  Flower2,
  MapPinned,
  Moon,
  Route,
  Sparkles,
  Sun,
  Trees,
  Waves,
} from 'lucide-react';
import { useVeloraTheme } from '@/component/velora-theme-provider';

type Branch = { name: string; description: string; directions: string[]; concepts: string[] };
type Stage = { number: string; title: string; description: string; difficulty: string; concepts: string[]; branches?: Branch[] };
type CareerMap = { title: string; aliases: string[]; overview: string; stages: Stage[] };
type Profile = { name?: string; careerInterest?: string; specialization?: string; stream?: string; skills?: string[] };

const s = (number: string, title: string, description: string, difficulty: string, concepts: string[], branches?: Branch[]): Stage => ({ number, title, description, difficulty, concepts, ...(branches ? { branches } : {}) });

const maps: CareerMap[] = [
  {
    title: 'Frontend Development', aliases: ['Frontend Developer', 'Front End Development', 'Web Developer', 'UI Developer', 'React Developer'],
    overview: 'From understanding the web to building accessible, performant interfaces and choosing a deeper frontend direction.',
    stages: [
      s('01', 'Foundation', 'Understand how the web works and build the core language, layout and browser knowledge behind frontend work.', 'Beginner', ['HTML structure', 'CSS fundamentals', 'JavaScript fundamentals', 'Browser basics', 'Git', 'Responsive thinking']),
      s('02', 'Core', 'Learn how interfaces are assembled, connected to data and organized into reusable pieces.', 'Beginner → Intermediate', ['DOM & events', 'Component thinking', 'State management', 'APIs', 'Forms & validation', 'Responsive architecture']),
      s('03', 'Intermediate', 'Move from individual screens to production-oriented frontend engineering and stronger user experiences.', 'Intermediate', ['Testing', 'Accessibility', 'Performance', 'Reusable components', 'Error handling', 'Authentication-aware UI']),
      s('04', 'Advanced', 'Work with complex applications where architecture, rendering strategy and maintainability matter.', 'Advanced', ['Frontend architecture', 'Rendering strategies', 'Advanced performance', 'Design systems', 'Scalable state', 'Observability']),
      s('05', 'Specialization', 'Choose the direction in which you want to go deeper once the common frontend foundation is strong.', 'Advanced', ['Explore a focused frontend direction'], [
        { name: 'Product Frontend', description: 'Build complex product interfaces and interaction flows.', directions: ['Frontend Engineer', 'Product Engineer'], concepts: ['Product thinking', 'Complex UI', 'Interaction patterns'] },
        { name: 'Design Engineering', description: 'Blend visual design quality with high-quality frontend implementation.', directions: ['Design Engineer', 'UI Engineer'], concepts: ['Design systems', 'Motion', 'Design-to-code'] },
        { name: 'Frontend Platform', description: 'Focus on shared libraries, tooling and developer experience.', directions: ['Platform Engineer', 'UI Platform Engineer'], concepts: ['Shared libraries', 'Tooling', 'Standards'] },
        { name: 'Accessibility', description: 'Specialize in inclusive, accessible digital experiences.', directions: ['Accessibility Specialist', 'Inclusive UI Engineer'], concepts: ['Semantic UI', 'Keyboard access', 'Assistive technology'] },
      ]),
    ],
  },
  {
    title: 'Backend Development', aliases: ['Backend Developer', 'Back End Development', 'API Development', 'Server Side Development'],
    overview: 'From programming and data fundamentals to APIs, services, reliability and deeper backend architecture.',
    stages: [
      s('01', 'Foundation', 'Build programming, data and system fundamentals that make backend logic easier to reason about.', 'Beginner', ['Programming', 'Data structures', 'OOP', 'Databases', 'SQL basics', 'HTTP basics']),
      s('02', 'Core', 'Learn how backend applications receive requests, apply business logic, store data and return responses.', 'Beginner → Intermediate', ['REST', 'Routing', 'Database modeling', 'CRUD', 'Authentication', 'Validation']),
      s('03', 'Intermediate', 'Move into production concerns such as testing, security, caching and service reliability.', 'Intermediate', ['API security', 'Testing', 'Caching', 'Logging', 'Error handling', 'Transactions']),
      s('04', 'Advanced', 'Understand how larger backend systems handle scale, failures, concurrency and change.', 'Advanced', ['System design', 'Concurrency', 'Distributed systems', 'Queues & events', 'Scalability', 'Reliability']),
      s('05', 'Specialization', 'Choose the kind of backend engineering problem you want to explore more deeply.', 'Advanced', ['Explore a focused backend direction'], [
        { name: 'Backend Architecture', description: 'Design maintainable and scalable application services.', directions: ['Backend Engineer', 'Software Architect'], concepts: ['Architecture patterns', 'Service boundaries', 'Scalability'] },
        { name: 'Distributed Systems', description: 'Work with services that span multiple machines or components.', directions: ['Distributed Systems Engineer', 'Platform Engineer'], concepts: ['Consistency', 'Messaging', 'Failure handling'] },
        { name: 'Backend Security', description: 'Protect APIs, services, identities and sensitive data.', directions: ['Application Security Engineer', 'Backend Security Engineer'], concepts: ['Authorization', 'Threat modeling', 'Secure API design'] },
      ]),
    ],
  },
  {
    title: 'Full Stack Development', aliases: ['Full Stack Developer', 'Full-Stack Development', 'Fullstack Development', 'Web Application Development'],
    overview: 'Connect frontend, backend, databases and deployment into a complete product-building journey.',
    stages: [
      s('01', 'Foundation', 'Understand the roles of frontend, backend, databases and version control in a web product.', 'Beginner', ['HTML & CSS', 'JavaScript', 'Programming basics', 'Git', 'HTTP', 'Database basics']),
      s('02', 'Core', 'Build complete flows from interface to server logic and persistent data.', 'Beginner → Intermediate', ['Components', 'REST APIs', 'Database CRUD', 'Authentication', 'Forms', 'Client-server flow']),
      s('03', 'Intermediate', 'Strengthen the application as a real product with testing, security and deployment practices.', 'Intermediate', ['Testing', 'API security', 'State management', 'Deployment', 'Monitoring', 'Performance']),
      s('04', 'Advanced', 'Design applications that remain maintainable as features, traffic and teams grow.', 'Advanced', ['System design', 'Architecture', 'Caching', 'Scalability', 'Observability', 'CI/CD']),
      s('05', 'Specialization', 'Choose the side of full-stack work where you want deeper expertise.', 'Advanced', ['Explore a focused direction'], [
        { name: 'Product Engineering', description: 'Own end-to-end product experiences and delivery.', directions: ['Product Engineer', 'Full Stack Engineer'], concepts: ['Product thinking', 'End-to-end ownership', 'Iteration'] },
        { name: 'SaaS Engineering', description: 'Build multi-user products and scalable business workflows.', directions: ['SaaS Engineer', 'Full Stack Engineer'], concepts: ['Multi-tenancy', 'Permissions', 'Scalable APIs'] },
        { name: 'Cloud-Native Applications', description: 'Design applications around modern cloud infrastructure.', directions: ['Cloud Application Engineer', 'Full Stack Engineer'], concepts: ['Containers', 'Cloud architecture', 'Deployment'] },
      ]),
    ],
  },
  {
    title: 'Software Development', aliases: ['Software Developer', 'Software Engineer', 'Application Development'],
    overview: 'Build strong programming and engineering foundations, then move into software design, testing and complex systems.',
    stages: [
      s('01', 'Foundation', 'Develop programming habits and the structures used to solve software problems.', 'Beginner', ['Programming', 'OOP', 'Data structures', 'Algorithms basics', 'Git', 'Debugging']),
      s('02', 'Core', 'Learn to design, implement and test software features systematically.', 'Beginner → Intermediate', ['Problem solving', 'Collections', 'Exceptions', 'Databases', 'APIs', 'Unit testing']),
      s('03', 'Intermediate', 'Strengthen code quality, architecture and engineering discipline.', 'Intermediate', ['Design patterns', 'Testing strategy', 'Refactoring', 'Concurrency basics', 'Code quality', 'CI concepts']),
      s('04', 'Advanced', 'Handle larger systems, deeper architecture and engineering trade-offs.', 'Advanced', ['System design', 'Distributed systems', 'Performance', 'Reliability', 'Scalability', 'Architecture trade-offs']),
      s('05', 'Specialization', 'Choose the type of software engineering problem you want to solve more deeply.', 'Advanced', ['Explore a focused direction'], [
        { name: 'Application Engineering', description: 'Build user-facing business applications and services.', directions: ['Software Engineer', 'Application Engineer'], concepts: ['Feature design', 'Testing', 'Maintainability'] },
        { name: 'Systems Engineering', description: 'Work closer to operating systems, performance and low-level behavior.', directions: ['Systems Engineer', 'Software Systems Engineer'], concepts: ['Memory', 'Processes', 'Concurrency'] },
        { name: 'Platform Engineering', description: 'Create shared engineering foundations and internal platforms.', directions: ['Platform Engineer', 'Developer Infrastructure Engineer'], concepts: ['Automation', 'Standards', 'Developer experience'] },
      ]),
    ],
  },
  {
    title: 'Artificial Intelligence & Machine Learning', aliases: ['AI / ML Engineer', 'AI/ML', 'AI ML', 'Machine Learning', 'Artificial Intelligence', 'ML Engineer'],
    overview: 'Move from mathematics and data foundations into model building, evaluation, deployment and applied AI systems.',
    stages: [
      s('01', 'Foundation', 'Build the programming, mathematics and data understanding needed to reason about machine learning.', 'Beginner', ['Python', 'Statistics', 'Probability', 'Linear algebra basics', 'Data handling', 'Problem formulation']),
      s('02', 'Core', 'Understand how machine-learning models are trained, evaluated and used on structured problems.', 'Beginner → Intermediate', ['Supervised learning', 'Unsupervised learning', 'Feature engineering', 'Model evaluation', 'Preprocessing', 'Experimentation']),
      s('03', 'Intermediate', 'Move into deeper models and practical workflows for real-world datasets.', 'Intermediate', ['Neural networks', 'NLP basics', 'Computer vision basics', 'Model tuning', 'Data pipelines', 'Validation']),
      s('04', 'Advanced', 'Work with larger AI systems, deployment constraints and model behavior at scale.', 'Advanced', ['Deep learning systems', 'Model deployment', 'MLOps concepts', 'Retrieval & grounding', 'AI evaluation', 'AI system design']),
      s('05', 'Specialization', 'Choose the AI area where you want deeper technical or applied expertise.', 'Advanced', ['Explore a focused AI direction'], [
        { name: 'Generative AI', description: 'Build applications around foundation models, retrieval and evaluation.', directions: ['Generative AI Engineer', 'Applied AI Engineer'], concepts: ['RAG', 'Evaluation', 'AI application design'] },
        { name: 'Computer Vision', description: 'Build systems that interpret images, video or visual signals.', directions: ['Computer Vision Engineer', 'Vision ML Engineer'], concepts: ['Image processing', 'Detection', 'Segmentation'] },
        { name: 'NLP & Language', description: 'Focus on systems that understand and generate human language.', directions: ['NLP Engineer', 'Language AI Engineer'], concepts: ['Embeddings', 'Language models', 'Text processing'] },
      ]),
    ],
  },
  {
    title: 'Data Science', aliases: ['Data Scientist', 'Data Science', 'Applied Data Science'],
    overview: 'Develop from analytical foundations to statistical modeling, machine learning and decision-focused data work.',
    stages: [
      s('01', 'Foundation', 'Learn how to work with data and reason about uncertainty, distributions and patterns.', 'Beginner', ['Python', 'Statistics', 'Probability', 'SQL', 'Data cleaning', 'Visualization']),
      s('02', 'Core', 'Turn raw data into useful analysis and structured insights.', 'Beginner → Intermediate', ['EDA', 'Feature engineering', 'Statistical reasoning', 'Experiment design', 'Visualization', 'Data storytelling']),
      s('03', 'Intermediate', 'Build predictive models and judge whether their results are trustworthy.', 'Intermediate', ['Regression', 'Classification', 'Clustering', 'Model evaluation', 'Cross-validation', 'Feature selection']),
      s('04', 'Advanced', 'Work with complex modeling problems and production-oriented analytical systems.', 'Advanced', ['Advanced modeling', 'Forecasting', 'Causal thinking', 'Model deployment', 'Monitoring', 'Data architecture']),
      s('05', 'Specialization', 'Choose the analytical direction that best matches the problems you enjoy solving.', 'Advanced', ['Explore a focused data direction'], [
        { name: 'Applied ML', description: 'Focus on predictive systems and machine-learning applications.', directions: ['Data Scientist', 'Applied ML Engineer'], concepts: ['Predictive modeling', 'Feature engineering', 'Deployment'] },
        { name: 'Product Analytics', description: 'Use behavioral data to understand and improve products.', directions: ['Product Analyst', 'Product Data Scientist'], concepts: ['Funnels', 'Cohorts', 'Experiments'] },
        { name: 'Decision Science', description: 'Turn analysis into decisions for business and operations.', directions: ['Decision Scientist', 'Analytics Consultant'], concepts: ['Forecasting', 'Scenario analysis', 'Decision support'] },
      ]),
    ],
  },
  {
    title: 'Data Analytics', aliases: ['Data Analyst', 'Data Analytics', 'Analytics', 'Business Data Analytics'],
    overview: 'Learn to transform data into clear insights, dashboards and business-facing decisions.',
    stages: [
      s('01', 'Foundation', 'Build confidence with spreadsheets, SQL, data types and analytical thinking.', 'Beginner', ['Excel fundamentals', 'SQL basics', 'Data types', 'Data cleaning', 'Basic statistics', 'Charts']),
      s('02', 'Core', 'Turn business questions into structured analysis and understandable dashboards.', 'Beginner → Intermediate', ['SQL querying', 'Data modeling basics', 'Dashboard design', 'KPI thinking', 'Segmentation', 'Storytelling']),
      s('03', 'Intermediate', 'Move beyond reporting into deeper analysis and recurring decision support.', 'Intermediate', ['Advanced SQL', 'Trend analysis', 'Cohorts', 'Root-cause analysis', 'Experiment basics', 'Automation']),
      s('04', 'Advanced', 'Work with analytical systems, stronger statistical reasoning and cross-functional decisions.', 'Advanced', ['Metric design', 'Forecasting', 'Data governance', 'Analytical engineering', 'Decision frameworks', 'Advanced visualization']),
      s('05', 'Specialization', 'Choose the problem area where you want to use analytics more deeply.', 'Advanced', ['Explore a focused analytics direction'], [
        { name: 'Product Analytics', description: 'Analyze product behavior, engagement and experiments.', directions: ['Product Analyst', 'Product Analytics Specialist'], concepts: ['Retention', 'Experiments', 'Product metrics'] },
        { name: 'Business Intelligence', description: 'Build trusted reporting and decision dashboards.', directions: ['BI Analyst', 'BI Developer'], concepts: ['Data models', 'Dashboards', 'KPI systems'] },
        { name: 'Marketing Analytics', description: 'Use data to understand campaigns and customer behavior.', directions: ['Marketing Analyst', 'Growth Analyst'], concepts: ['Attribution', 'Segmentation', 'Growth metrics'] },
      ]),
    ],
  },
  {
    title: 'Cybersecurity', aliases: ['Cybersecurity Engineer', 'Cybersecurity', 'Cyber Security', 'Information Security', 'Security Engineering', 'SOC', 'Security Operations'],
    overview: 'Build from computing and networking fundamentals into defensive, offensive and specialized security practices.',
    stages: [
      s('01', 'Foundation', 'Understand computers, networks, operating systems and the basic language of security.', 'Beginner', ['Networking', 'Linux', 'Operating systems', 'Security principles', 'Authentication', 'Cryptography basics']),
      s('02', 'Core', 'Learn common security concepts used to analyze systems, applications and network activity.', 'Beginner → Intermediate', ['Network security', 'Web security', 'Vulnerabilities', 'Identity & access', 'Secure configuration', 'Monitoring']),
      s('03', 'Intermediate', 'Move into active investigation, testing and response.', 'Intermediate', ['Penetration testing concepts', 'Threat analysis', 'Incident response', 'Security assessment', 'Log analysis', 'Security tooling']),
      s('04', 'Advanced', 'Work with complex threats, investigations, architecture and security at scale.', 'Advanced', ['Threat hunting', 'Digital forensics', 'Malware analysis', 'Cloud security', 'Security architecture', 'Detection engineering']),
      s('05', 'Specialization', 'Choose the security direction in which you want to develop deeper expertise.', 'Advanced', ['Explore a focused security direction'], [
        { name: 'SOC & Detection', description: 'Focus on monitoring, detection and response to security events.', directions: ['SOC Analyst', 'Detection Engineer'], concepts: ['SIEM', 'Detection rules', 'Investigation'] },
        { name: 'Penetration Testing', description: 'Assess systems and applications through controlled security testing.', directions: ['Penetration Tester', 'Offensive Security Engineer'], concepts: ['Reconnaissance', 'Web testing', 'Reporting'] },
        { name: 'Application Security', description: 'Protect software throughout design, development and deployment.', directions: ['Application Security Engineer', 'Product Security Engineer'], concepts: ['Secure SDLC', 'Threat modeling', 'Code review'] },
        { name: 'Cloud Security', description: 'Protect cloud infrastructure, identities and workloads.', directions: ['Cloud Security Engineer', 'Cloud Security Analyst'], concepts: ['Cloud IAM', 'Workload security', 'Monitoring'] },
        { name: 'DFIR', description: 'Investigate incidents and reconstruct what happened after a security event.', directions: ['DFIR Analyst', 'Digital Forensics Analyst'], concepts: ['Evidence handling', 'Timeline analysis', 'Forensics'] },
      ]),
    ],
  },
  {
    title: 'Cloud & DevOps', aliases: ['Cloud Engineer', 'Cloud Computing', 'DevOps Engineer', 'DevOps', 'Cloud DevOps', 'Site Reliability', 'SRE', 'Platform Engineer'],
    overview: 'Move from operating systems and networking into automation, cloud infrastructure, deployment and reliability.',
    stages: [
      s('01', 'Foundation', 'Understand the systems underneath applications before automating and operating them.', 'Beginner', ['Linux', 'Networking', 'Shell basics', 'Processes', 'Git', 'Cloud concepts']),
      s('02', 'Core', 'Learn how applications are packaged, deployed and connected to infrastructure.', 'Beginner → Intermediate', ['Containers', 'CI/CD', 'Cloud services', 'Configuration', 'Infrastructure basics', 'Monitoring']),
      s('03', 'Intermediate', 'Build repeatable environments and safer deployment workflows.', 'Intermediate', ['Infrastructure as code', 'Orchestration', 'Secrets', 'Logging', 'Deployment strategies', 'Observability']),
      s('04', 'Advanced', 'Design resilient systems that remain reliable under change and failure.', 'Advanced', ['Cloud architecture', 'Scalability', 'Reliability engineering', 'Disaster recovery', 'Cost awareness', 'Advanced observability']),
      s('05', 'Specialization', 'Choose the infrastructure and reliability direction that interests you most.', 'Advanced', ['Explore a focused cloud direction'], [
        { name: 'DevOps Engineering', description: 'Focus on delivery automation and engineering workflows.', directions: ['DevOps Engineer', 'Release Engineer'], concepts: ['CI/CD', 'Automation', 'Deployment'] },
        { name: 'Site Reliability', description: 'Focus on reliable services, observability and operational engineering.', directions: ['SRE', 'Reliability Engineer'], concepts: ['SLIs/SLOs', 'Incidents', 'Capacity'] },
        { name: 'Cloud Architecture', description: 'Design cloud systems around scale, resilience and security.', directions: ['Cloud Architect', 'Cloud Engineer'], concepts: ['Networking', 'Identity', 'Resilience'] },
        { name: 'Platform Engineering', description: 'Build reusable internal platforms that improve developer productivity.', directions: ['Platform Engineer', 'Developer Platform Engineer'], concepts: ['Internal platforms', 'Automation', 'Self-service'] },
      ]),
    ],
  },
  {
    title: 'UI/UX Design', aliases: ['UI / UX Designer', 'UI/UX Design', 'UX/UI Designer', 'UX Design', 'User Experience Design', 'Product Design'],
    overview: 'Move from visual and UX fundamentals into research, interaction design, systems and deeper product design practice.',
    stages: [
      s('01', 'Foundation', 'Understand the visual and human principles that make interfaces clear, readable and useful.', 'Beginner', ['Visual hierarchy', 'Typography', 'Colour', 'Layout', 'Design principles', 'UX thinking']),
      s('02', 'Core', 'Learn to understand users and translate their needs into structured product experiences.', 'Beginner → Intermediate', ['User research', 'Personas', 'Information architecture', 'User flows', 'Wireframing', 'Usability']),
      s('03', 'Intermediate', 'Turn ideas into polished, testable interfaces and reusable systems.', 'Intermediate', ['Interaction design', 'Prototyping', 'Design systems', 'Accessibility', 'Usability testing', 'Responsive design']),
      s('04', 'Advanced', 'Work on complex products where systems thinking, strategy and collaboration matter.', 'Advanced', ['Product thinking', 'Design strategy', 'Complex workflows', 'Design operations', 'Collaboration', 'Systems architecture']),
      s('05', 'Specialization', 'Choose the type of design work you want to explore more deeply.', 'Advanced', ['Explore a focused design direction'], [
        { name: 'Product Design', description: 'Own end-to-end product experiences from problem framing to interface.', directions: ['Product Designer', 'UX Designer'], concepts: ['Problem framing', 'Interaction design', 'Prototyping'] },
        { name: 'UX Research', description: 'Go deeper into discovering user needs and evidence.', directions: ['UX Researcher', 'Design Researcher'], concepts: ['Interviews', 'Usability studies', 'Synthesis'] },
        { name: 'Interaction Design', description: 'Focus on behavior, flows and how digital products feel to use.', directions: ['Interaction Designer', 'UX Designer'], concepts: ['Interaction patterns', 'Motion', 'Feedback'] },
        { name: 'Design Systems', description: 'Build scalable visual and interaction foundations for products.', directions: ['Design Systems Designer', 'Design Systems Specialist'], concepts: ['Tokens', 'Components', 'Governance'] },
      ]),
    ],
  },
  {
    title: 'Mobile App Development', aliases: ['Mobile Development', 'Mobile App Development', 'Android Development', 'iOS Development', 'Flutter Development', 'React Native'],
    overview: 'Build from mobile fundamentals into app architecture, device capabilities, quality and specialized mobile experiences.',
    stages: [
      s('01', 'Foundation', 'Understand mobile application structure, programming basics and how users interact with apps.', 'Beginner', ['Programming', 'Mobile UI basics', 'App lifecycle', 'Navigation', 'State basics', 'Git']),
      s('02', 'Core', 'Build functional apps that manage data, screens and backend communication.', 'Beginner → Intermediate', ['State management', 'APIs', 'Local storage', 'Forms', 'Authentication', 'Notifications']),
      s('03', 'Intermediate', 'Strengthen app quality, responsiveness and device-aware behavior.', 'Intermediate', ['Testing', 'Offline behavior', 'Performance', 'Device APIs', 'Error handling', 'Accessibility']),
      s('04', 'Advanced', 'Design apps for scale, maintainability and richer device capabilities.', 'Advanced', ['Mobile architecture', 'Security', 'Deep links', 'Background processing', 'Performance', 'Release engineering']),
      s('05', 'Specialization', 'Choose the mobile direction you want to explore more deeply.', 'Advanced', ['Explore a focused mobile direction'], [
        { name: 'Consumer Apps', description: 'Focus on polished user-facing mobile experiences.', directions: ['Mobile App Engineer', 'Product Mobile Engineer'], concepts: ['UX flows', 'Performance', 'Engagement'] },
        { name: 'Cross-Platform', description: 'Build shared application experiences across platforms.', directions: ['Cross-Platform Developer', 'Flutter / React Native Developer'], concepts: ['Shared architecture', 'Platform differences', 'Native integration'] },
        { name: 'Mobile Platform', description: 'Go deeper into native systems and platform capabilities.', directions: ['Android Engineer', 'iOS Engineer'], concepts: ['Native APIs', 'Lifecycle', 'Performance'] },
      ]),
    ],
  },
  {
    title: 'Embedded Systems', aliases: ['Embedded Systems', 'Embedded Systems Engineer', 'Embedded Developer', 'Embedded Engineering', 'Firmware Engineer'],
    overview: 'Build from electronics and C programming fundamentals into firmware, real-time behavior and hardware-software integration.',
    stages: [
      s('01', 'Foundation', 'Understand programming, electronics and the physical systems controlled by embedded software.', 'Beginner', ['C fundamentals', 'Digital logic', 'Microcontrollers', 'Memory basics', 'Sensors', 'Debugging']),
      s('02', 'Core', 'Learn how firmware communicates with hardware and responds to inputs in real time.', 'Beginner → Intermediate', ['GPIO', 'UART', 'SPI', 'I2C', 'Interrupts', 'Timers']),
      s('03', 'Intermediate', 'Move into structured firmware, device drivers and real-time behavior.', 'Intermediate', ['RTOS concepts', 'Device drivers', 'Communication protocols', 'Power awareness', 'Testing', 'Hardware debugging']),
      s('04', 'Advanced', 'Design dependable embedded systems where timing, reliability and constraints matter.', 'Advanced', ['Real-time architecture', 'Embedded Linux', 'Performance', 'Safety concepts', 'Boot process', 'Systems integration']),
      s('05', 'Specialization', 'Choose a hardware-software direction for deeper embedded work.', 'Advanced', ['Explore a focused embedded direction'], [
        { name: 'Firmware Engineering', description: 'Focus on low-level software that controls devices.', directions: ['Firmware Engineer', 'Embedded Software Engineer'], concepts: ['Drivers', 'RTOS', 'Memory'] },
        { name: 'Embedded Linux', description: 'Work with richer embedded devices and Linux-based systems.', directions: ['Embedded Linux Engineer', 'Systems Engineer'], concepts: ['Linux', 'Drivers', 'Build systems'] },
        { name: 'IoT Edge Systems', description: 'Combine embedded devices with connectivity and cloud-facing systems.', directions: ['Edge Engineer', 'IoT Embedded Engineer'], concepts: ['Telemetry', 'Connectivity', 'Edge processing'] },
      ]),
    ],
  },
  {
    title: 'VLSI Design', aliases: ['VLSI', 'VLSI Design', 'VLSI Design Engineer', 'Digital VLSI', 'IC Design', 'Semiconductor Design'],
    overview: 'Move from digital electronics into RTL, verification, FPGA thinking and deeper hardware design paths.',
    stages: [
      s('01', 'Foundation', 'Build the digital logic and hardware fundamentals used to reason about chips and programmable hardware.', 'Beginner', ['Digital logic', 'Boolean algebra', 'Combinational circuits', 'Sequential circuits', 'Timing basics', 'HDL fundamentals']),
      s('02', 'Core', 'Learn how digital hardware is expressed, simulated and structured at RTL level.', 'Beginner → Intermediate', ['HDL concepts', 'RTL design', 'FSMs', 'Testbenches', 'Simulation', 'Synthesis basics']),
      s('03', 'Intermediate', 'Strengthen verification, timing awareness and FPGA-oriented implementation.', 'Intermediate', ['SystemVerilog concepts', 'Verification', 'Assertions', 'Timing analysis', 'FPGA flow', 'Debugging']),
      s('04', 'Advanced', 'Explore the constraints that shape high-performance and reliable semiconductor systems.', 'Advanced', ['Advanced verification', 'Physical design concepts', 'Low-power design', 'Clocking', 'Design for test', 'Hardware architecture']),
      s('05', 'Specialization', 'Choose design, verification or physical implementation as a deeper path.', 'Advanced', ['Explore a focused VLSI direction'], [
        { name: 'RTL Design', description: 'Translate hardware architecture into synthesizable logic.', directions: ['RTL Design Engineer', 'Digital Design Engineer'], concepts: ['RTL architecture', 'FSMs', 'Pipelining'] },
        { name: 'Verification', description: 'Find functional bugs and prove hardware behaves as intended.', directions: ['Verification Engineer', 'Design Verification Engineer'], concepts: ['Testbenches', 'Coverage', 'Assertions'] },
        { name: 'Physical Design', description: 'Explore how logical designs are mapped onto physical structures.', directions: ['Physical Design Engineer', 'ASIC Physical Design Engineer'], concepts: ['Floorplanning', 'Placement', 'Routing'] },
      ]),
    ],
  },
  {
    title: 'Internet of Things', aliases: ['IoT', 'Internet of Things', 'IoT Engineer', 'IoT Development'],
    overview: 'Connect sensing, embedded systems, communication and cloud-side processing into connected-device systems.',
    stages: [
      s('01', 'Foundation', 'Understand sensors, embedded programming and how connected devices collect information.', 'Beginner', ['Sensors', 'Microcontrollers', 'C / Python basics', 'Signals & data', 'Networking basics', 'Device communication']),
      s('02', 'Core', 'Learn how devices communicate with services and how collected data moves through a connected system.', 'Beginner → Intermediate', ['MQTT', 'Device communication', 'Data collection', 'APIs', 'Cloud concepts', 'Authentication']),
      s('03', 'Intermediate', 'Design more reliable connected systems with edge processing and device management.', 'Intermediate', ['Edge computing', 'Device management', 'Telemetry', 'Security', 'Data pipelines', 'Resilience']),
      s('04', 'Advanced', 'Work with large fleets of connected devices and end-to-end IoT architecture.', 'Advanced', ['IoT architecture', 'Fleet management', 'Cloud-edge coordination', 'Observability', 'Scalability', 'IoT security']),
      s('05', 'Specialization', 'Choose the kind of connected-device problem you want to explore deeply.', 'Advanced', ['Explore a focused IoT direction'], [
        { name: 'Industrial IoT', description: 'Apply connected systems to industrial monitoring and automation.', directions: ['IIoT Engineer', 'Industrial Automation Engineer'], concepts: ['Industrial sensors', 'Telemetry', 'Predictive monitoring'] },
        { name: 'Smart Devices', description: 'Build connected consumer or environment-aware products.', directions: ['IoT Product Engineer', 'Smart Device Engineer'], concepts: ['Connectivity', 'Device management', 'Telemetry'] },
        { name: 'Edge AI', description: 'Combine intelligent models with local device-side processing.', directions: ['Edge AI Engineer', 'Embedded AI Engineer'], concepts: ['On-device inference', 'Optimization', 'Sensors'] },
      ]),
    ],
  },
  {
    title: 'Robotics & Automation', aliases: ['Robotics', 'Robotics Engineer', 'Robotics Engineering', 'Automation', 'Robotics and Automation', 'Mechatronics'],
    overview: 'Build from programming, electronics and mechanics into perception, control, planning and autonomous systems.',
    stages: [
      s('01', 'Foundation', 'Understand programming, mathematics and hardware foundations behind robotic systems.', 'Beginner', ['Python / C++ basics', 'Electronics', 'Sensors', 'Actuators', 'Coordinate systems', 'Control basics']),
      s('02', 'Core', 'Learn how a robot senses its environment and turns commands into physical movement.', 'Beginner → Intermediate', ['ROS concepts', 'Kinematics', 'Motor control', 'Sensor integration', 'Path basics', 'Simulation']),
      s('03', 'Intermediate', 'Combine perception, planning and control into more capable robotic systems.', 'Intermediate', ['Computer vision', 'Localization', 'Path planning', 'Sensor fusion', 'Motion planning', 'Real-time systems']),
      s('04', 'Advanced', 'Explore autonomous behavior and complex robot systems operating under uncertainty.', 'Advanced', ['SLAM', 'Autonomous navigation', 'Manipulation', 'Planning', 'Robot learning', 'Safety']),
      s('05', 'Specialization', 'Choose the robotics area that matches your interests in hardware, autonomy or intelligence.', 'Advanced', ['Explore a focused robotics direction'], [
        { name: 'Autonomous Robotics', description: 'Focus on robots that perceive environments and navigate with limited human input.', directions: ['Robotics Engineer', 'Autonomy Engineer'], concepts: ['SLAM', 'Navigation', 'Planning'] },
        { name: 'Industrial Automation', description: 'Focus on repeatable robotic and control systems in production.', directions: ['Automation Engineer', 'Industrial Robotics Engineer'], concepts: ['PLC', 'Robot cells', 'Control'] },
        { name: 'Robot Perception', description: 'Help robots understand the physical world.', directions: ['Computer Vision Engineer', 'Robotics Perception Engineer'], concepts: ['Vision', 'Depth', 'Sensor fusion'] },
      ]),
    ],
  },
  {
    title: 'Product Management', aliases: ['Product Manager', 'Product Management', 'PM', 'Product Strategy'],
    overview: 'Develop from problem understanding into product decisions, prioritization, experimentation and cross-functional leadership.',
    stages: [
      s('01', 'Foundation', 'Understand products as solutions to user and business problems rather than lists of features.', 'Beginner', ['Problem framing', 'User needs', 'Business basics', 'Product lifecycle', 'Communication', 'Basic metrics']),
      s('02', 'Core', 'Learn to translate problems into requirements, priorities and clear product direction.', 'Beginner → Intermediate', ['User stories', 'Requirements', 'Prioritization', 'Roadmapping', 'Stakeholder alignment', 'Discovery']),
      s('03', 'Intermediate', 'Use data, experimentation and feedback to guide product decisions.', 'Intermediate', ['Product analytics', 'Experiments', 'Metrics', 'User feedback', 'Opportunity sizing', 'Product strategy']),
      s('04', 'Advanced', 'Operate at the level of product systems, portfolios and long-term strategy.', 'Advanced', ['Product strategy', 'Platform thinking', 'Portfolio decisions', 'Growth strategy', 'Go-to-market concepts', 'Leadership']),
      s('05', 'Specialization', 'Choose the product environment where you want to build deeper expertise.', 'Advanced', ['Explore a focused product direction'], [
        { name: 'Consumer Product', description: 'Focus on user growth, engagement and product experience.', directions: ['Product Manager', 'Growth Product Manager'], concepts: ['Activation', 'Retention', 'Experiments'] },
        { name: 'B2B / Enterprise', description: 'Work with complex workflows, stakeholders and business constraints.', directions: ['B2B Product Manager', 'Enterprise Product Manager'], concepts: ['Workflows', 'Stakeholders', 'Business value'] },
        { name: 'Technical Product', description: 'Bridge product decisions with APIs, systems and engineering constraints.', directions: ['Technical Product Manager', 'Platform Product Manager'], concepts: ['APIs', 'Architecture awareness', 'Trade-offs'] },
      ]),
    ],
  },
  {
    title: 'Marketing', aliases: ['Marketing', 'Digital Marketing', 'Growth Marketing', 'Marketing Management'],
    overview: 'Move from marketing fundamentals into channels, customer insight, analytics and deeper growth or brand directions.',
    stages: [
      s('01', 'Foundation', 'Understand customers, positioning and the main ways organizations communicate value.', 'Beginner', ['Customer understanding', 'Positioning', 'Brand basics', 'Content fundamentals', 'Marketing funnel', 'Communication']),
      s('02', 'Core', 'Learn how campaigns, channels and messaging work together.', 'Beginner → Intermediate', ['Content strategy', 'SEO basics', 'Paid media basics', 'Email', 'Social media', 'Campaign planning']),
      s('03', 'Intermediate', 'Use customer data and channel performance to improve marketing decisions.', 'Intermediate', ['Marketing analytics', 'Segmentation', 'Conversion', 'Attribution basics', 'Experimentation', 'CRM concepts']),
      s('04', 'Advanced', 'Build broader growth and brand systems across channels and audiences.', 'Advanced', ['Growth strategy', 'Lifecycle marketing', 'Brand strategy', 'Demand generation', 'Customer journeys', 'Marketing operations']),
      s('05', 'Specialization', 'Choose a marketing direction based on whether you prefer growth, brand, content or analytics.', 'Advanced', ['Explore a focused marketing direction'], [
        { name: 'Growth Marketing', description: 'Focus on acquisition, activation, conversion and retention.', directions: ['Growth Marketer', 'Growth Analyst'], concepts: ['Funnels', 'Experiments', 'Retention'] },
        { name: 'Brand & Content', description: 'Focus on positioning, storytelling and brand communication.', directions: ['Brand Strategist', 'Content Strategist'], concepts: ['Positioning', 'Storytelling', 'Brand systems'] },
        { name: 'Marketing Analytics', description: 'Use data to understand campaign and customer performance.', directions: ['Marketing Analyst', 'Performance Marketing Analyst'], concepts: ['Attribution', 'Campaign analytics', 'Segmentation'] },
      ]),
    ],
  },
  {
    title: 'Finance', aliases: ['Finance', 'Financial Analysis', 'Finance & Banking', 'Banking'],
    overview: 'Build from financial fundamentals into analysis, modeling, business decisions and specialized finance paths.',
    stages: [
      s('01', 'Foundation', 'Understand financial statements, basic business economics and the language of finance.', 'Beginner', ['Accounting basics', 'Financial statements', 'Time value of money', 'Excel fundamentals', 'Financial terminology', 'Business basics']),
      s('02', 'Core', 'Learn to analyze performance, cash flow and financial decisions using structured data.', 'Beginner → Intermediate', ['Ratio analysis', 'Cash flow', 'Budgeting', 'Forecasting basics', 'Modeling basics', 'Business analysis']),
      s('03', 'Intermediate', 'Build stronger models and evaluate scenarios, investments and risk.', 'Intermediate', ['Financial modeling', 'Valuation basics', 'Scenario analysis', 'Risk concepts', 'Investment analysis', 'Forecasting']),
      s('04', 'Advanced', 'Work with higher-level financial strategy, capital decisions and complex analysis.', 'Advanced', ['Corporate finance', 'Portfolio concepts', 'Advanced valuation', 'Risk management', 'Capital structure', 'Financial strategy']),
      s('05', 'Specialization', 'Choose the finance direction aligned with the problems you want to solve.', 'Advanced', ['Explore a focused finance direction'], [
        { name: 'Corporate Finance', description: 'Focus on planning, capital decisions and financial performance.', directions: ['Corporate Finance Analyst', 'FP&A Analyst'], concepts: ['Planning', 'Forecasting', 'Capital decisions'] },
        { name: 'Investment Analysis', description: 'Evaluate companies and opportunities using financial evidence.', directions: ['Investment Analyst', 'Equity Research Analyst'], concepts: ['Valuation', 'Industry analysis', 'Risk'] },
        { name: 'Banking & Risk', description: 'Focus on financial products, controls and risk.', directions: ['Banking Analyst', 'Risk Analyst'], concepts: ['Credit', 'Risk', 'Financial products'] },
      ]),
    ],
  },
  {
    title: 'Human Resources', aliases: ['Human Resources', 'HR', 'HR Management', 'People Operations'],
    overview: 'Move from people and organizational fundamentals into talent, analytics, employee experience and HR strategy.',
    stages: [
      s('01', 'Foundation', 'Understand how organizations work and the core activities involved in managing people at work.', 'Beginner', ['Organizational behavior', 'Communication', 'HR basics', 'Workplace policies', 'Employee lifecycle', 'Documentation']),
      s('02', 'Core', 'Learn the core HR processes that support hiring, development and employee operations.', 'Beginner → Intermediate', ['Recruitment', 'Onboarding', 'Performance basics', 'Learning & development', 'HR operations', 'Employee relations']),
      s('03', 'Intermediate', 'Use structured data and stronger people practices to improve organizational decisions.', 'Intermediate', ['HR analytics', 'Compensation basics', 'Engagement', 'Workforce planning', 'Talent management', 'People reporting']),
      s('04', 'Advanced', 'Work on organizational strategy, culture, workforce systems and people decisions at scale.', 'Advanced', ['People strategy', 'Organizational design', 'Change management', 'Succession planning', 'Workforce strategy', 'Governance']),
      s('05', 'Specialization', 'Choose the HR direction that matches your interests in people, analytics or organizational strategy.', 'Advanced', ['Explore a focused HR direction'], [
        { name: 'Talent Acquisition', description: 'Focus on attracting, assessing and hiring talent.', directions: ['Talent Acquisition Specialist', 'Recruiter'], concepts: ['Sourcing', 'Interviewing', 'Candidate experience'] },
        { name: 'People Analytics', description: 'Use workforce data to improve people decisions.', directions: ['People Analyst', 'HR Analytics Specialist'], concepts: ['Workforce metrics', 'Dashboards', 'Engagement'] },
        { name: 'People Strategy', description: 'Focus on organization-wide people systems and workforce planning.', directions: ['HR Business Partner', 'People Strategy Specialist'], concepts: ['Workforce planning', 'Org design', 'Culture'] },
      ]),
    ],
  },
  {
    title: 'Business Analytics', aliases: ['Business Analytics', 'Business Analyst', 'BI Analyst', 'Business Intelligence'],
    overview: 'Bridge business problems, data, requirements and decision-making from fundamentals to advanced analytics work.',
    stages: [
      s('01', 'Foundation', 'Learn how businesses operate and how structured data can support decisions.', 'Beginner', ['Business processes', 'Excel', 'Statistics basics', 'Data concepts', 'Communication', 'Problem framing']),
      s('02', 'Core', 'Translate business needs into analysis, requirements and understandable reporting.', 'Beginner → Intermediate', ['SQL basics', 'Requirements gathering', 'KPI design', 'Process mapping', 'Dashboarding', 'Stakeholder communication']),
      s('03', 'Intermediate', 'Combine analytical depth with better business diagnosis and decision support.', 'Intermediate', ['Advanced SQL', 'Root-cause analysis', 'Scenario analysis', 'Forecasting basics', 'Process improvement', 'Data storytelling']),
      s('04', 'Advanced', 'Work across business functions where analytics, systems and strategy intersect.', 'Advanced', ['BI architecture', 'Decision frameworks', 'Optimization concepts', 'Data governance', 'Strategic analytics', 'Cross-functional planning']),
      s('05', 'Specialization', 'Choose the business problem space in which you want to apply analytics more deeply.', 'Advanced', ['Explore a focused business direction'], [
        { name: 'Business Intelligence', description: 'Build trusted reporting and data systems for decision-makers.', directions: ['BI Analyst', 'BI Developer'], concepts: ['Data models', 'Dashboards', 'KPI systems'] },
        { name: 'Product / Process Analysis', description: 'Improve products and workflows using evidence and structured problem solving.', directions: ['Business Analyst', 'Product Analyst'], concepts: ['Requirements', 'Process mapping', 'Metrics'] },
        { name: 'Strategy Analytics', description: 'Use data to support broader business and strategic decisions.', directions: ['Strategy Analyst', 'Analytics Consultant'], concepts: ['Scenario analysis', 'Forecasting', 'Decision support'] },
      ]),
    ],
  },
];

const fallback: CareerMap = {
  title: 'Career Exploration', aliases: [],
  overview: 'A concept-first map for understanding a career direction before choosing a deeper specialization.',
  stages: [
    s('01', 'Foundation', 'Understand the vocabulary, fundamentals and problem types in the field.', 'Beginner', ['Core concepts', 'Terminology', 'Foundational skills', 'Problem types']),
    s('02', 'Core', 'Learn the main concepts and workflows that appear across roles in the field.', 'Beginner → Intermediate', ['Core concepts', 'Common workflows', 'Practical thinking', 'Communication']),
    s('03', 'Intermediate', 'Explore how professionals apply the core ideas to real problems.', 'Intermediate', ['Applied concepts', 'Problem solving', 'Project thinking', 'Quality practices']),
    s('04', 'Advanced', 'Understand deeper systems, trade-offs and complexity in mature work.', 'Advanced', ['Architecture', 'Advanced problem solving', 'Trade-offs', 'Systems thinking']),
    s('05', 'Specialization', 'Compare possible directions and choose the branch that matches your interests.', 'Advanced', ['Explore branches'], [{ name: 'Explore adjacent paths', description: 'Compare related roles before committing to one deeper direction.', directions: ['Adjacent career paths'], concepts: ['Role comparison', 'Skill transfer', 'Exploration'] }]),
  ],
};

const normalize = (value: string) => value.toLowerCase().replace(/&/g, 'and').replace(/[\/_-]+/g, ' ').replace(/[^\w\s+.#]/g, '').replace(/\s+/g, ' ').trim();

function getMap(interest?: string) {
  const q = normalize(interest || '');
  if (!q) return fallback;
  const exact = maps.find((m) => normalize(m.title) === q || m.aliases.some((a) => normalize(a) === q));
  if (exact) return exact;
  const partial = maps.find((m) => [m.title, ...m.aliases].map(normalize).some((x) => x.includes(q) || q.includes(x)));
  return partial || fallback;
}


function Difficulty({ value }: { value: string }) {
  const count = value.toLowerCase().includes('advanced')
    ? 5
    : value.toLowerCase().includes('intermediate')
      ? 3
      : 2;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[8px] font-black uppercase tracking-[0.16em] text-[#465566]/65">
        Depth
      </span>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`h-1.5 w-5 rounded-full ${index < count ? 'bg-[#E36B62]' : 'bg-[#506579]/15'}`}
          />
        ))}
      </div>
      <span className="text-[9px] font-bold text-[#4B5967]/80">{value}</span>
    </div>
  );
}

const stagePalette = [
  {
    node: '#E16A5E',
    card: 'from-[#FFE0D4] via-[#F7C7BF] to-[#F1AAA8]',
    border: '#F0A7A0',
    title: '#743844',
    chip: '#FFF0E5',
  },
  {
    node: '#2F89A4',
    card: 'from-[#D9F4F6] via-[#B9E4EF] to-[#96D2DF]',
    border: '#7CC7D7',
    title: '#204E63',
    chip: '#ECFBFD',
  },
  {
    node: '#5B9A69',
    card: 'from-[#E5F3C9] via-[#C8E39F] to-[#ABD181]',
    border: '#99C670',
    title: '#315A3D',
    chip: '#F1F8E2',
  },
  {
    node: '#7B68BD',
    card: 'from-[#EEE6FA] via-[#D7C9F1] to-[#C0AFE6]',
    border: '#B39CDD',
    title: '#433A69',
    chip: '#F7F2FF',
  },
  {
    node: '#D55B83',
    card: 'from-[#FDE0E9] via-[#F5BECF] to-[#E88FAB]',
    border: '#E58CAA',
    title: '#663348',
    chip: '#FFF0F5',
  },
];

function StageCard({
  stage,
  index,
  selected,
  onSelect,
}: {
  stage: Stage;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const palette = stagePalette[index];

  return (
    <article
      className={`relative w-full transition-all duration-500 ${selected ? 'z-20 scale-[1.02] -translate-y-1' : 'hover:-translate-y-1'}`}
    >
      <button type="button" onClick={onSelect} className="w-full text-left">
        <div
          className={`relative overflow-hidden rounded-[26px] border bg-gradient-to-br ${palette.card} p-4.5 shadow-[0_16px_35px_rgba(52,56,73,.13)] transition-all duration-500 ${selected ? 'ring-2 ring-white shadow-[0_22px_48px_rgba(52,56,73,.2)]' : ''}`}
          style={{ borderColor: palette.border }}
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-white/35 bg-white/20" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-28 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[10px] font-black text-white shadow-sm"
              style={{ background: palette.node }}
            >
              {stage.number}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full border px-2 py-1 text-[7px] font-black uppercase tracking-[0.16em]"
                  style={{ borderColor: `${palette.border}80`, background: palette.chip, color: palette.title }}
                >
                  Stage {stage.number}
                </span>
                {selected && (
                  <span className="rounded-full bg-[#FFF1BD] px-2 py-1 text-[7px] font-black text-[#654347]">
                    You are here
                  </span>
                )}
              </div>

              <h3 className="mt-1.5 font-serif text-[22px] font-bold leading-tight" style={{ color: palette.title }}>
                {stage.title}
              </h3>

              <p className="mt-1.5 text-[10.5px] font-semibold leading-5 text-[#314354]/78">
                {stage.description}
              </p>
            </div>

            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/18 text-[#3B4A5B]/65">
              {selected ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </span>
          </div>

          <div className="relative mt-3 flex flex-wrap gap-1.5 pl-14">
            {stage.concepts.slice(0, 6).map((concept, conceptIndex) => (
              <span
                key={concept}
                className={`rounded-full border px-2 py-1 text-[8px] font-bold ${
                  conceptIndex % 3 === 0
                    ? 'border-[#C98F58]/20 bg-[#FFF0D1]/60 text-[#5D4A3C]'
                    : conceptIndex % 3 === 1
                      ? 'border-[#5DA5AD]/20 bg-[#E7FAF7]/65 text-[#315961]'
                      : 'border-[#D27B9A]/20 bg-[#FFE8EF]/62 text-[#673C4D]'
                }`}
              >
                {concept}
              </span>
            ))}
          </div>

          <div className="relative mt-3 pl-14">
            <Difficulty value={stage.difficulty} />
          </div>
        </div>
      </button>
    </article>
  );
}

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <div className="rounded-[20px] border border-white/12 bg-white/7 p-3.5 shadow-sm">
      <div className="flex items-start gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FF8A65]/16 text-[#FFC1A7]">
          <Route className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <h4 className="text-[12px] font-black text-white">{branch.name}</h4>
          <p className="mt-1 text-[9.5px] font-medium leading-4.5 text-white/66">{branch.description}</p>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {branch.concepts.map((concept) => (
          <span key={concept} className="rounded-full bg-white/8 px-2 py-1 text-[8px] font-bold text-white/72">
            {concept}
          </span>
        ))}
      </div>

      <div className="mt-2.5 border-t border-white/8 pt-2.5">
        <p className="text-[7px] font-black uppercase tracking-[0.15em] text-[#FFD16B]/82">Possible directions</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {branch.directions.map((direction) => (
            <span key={direction} className="rounded-full bg-[#FF8A65] px-2 py-1 text-[8px] font-black text-[#4C2D39]">
              {direction}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CareerMapPage() {
  const router = useRouter();
  const { darkMode, toggleTheme } = useVeloraTheme();
  const [profile, setProfile] = useState<Profile>({});
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('veloraProfile');
      if (saved) setProfile(JSON.parse(saved) as Profile);
    } catch {
      setProfile({});
    }
  }, []);

  const interest = profile.careerInterest?.trim() || profile.specialization?.trim() || '';
  const careerMap = useMemo(() => getMap(interest), [interest]);
  const current = careerMap.stages[selected] || careerMap.stages[0];
  const next = careerMap.stages[selected + 1];

  return (
    <main className={darkMode ? 'min-h-screen bg-[#14253A] text-white' : 'min-h-screen bg-[#EED79F] text-[#263449]'}>
      <style jsx global>{`
        @keyframes drawJourneyFinal {
          from { stroke-dashoffset: 2300; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes floatFinal {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulseFinal {
          0%,100% { box-shadow: 0 0 0 0 rgba(225,106,94,0); }
          50% { box-shadow: 0 0 0 9px rgba(225,106,94,.16); }
        }
        .career-final-route { stroke-dasharray: 15 19; animation: drawJourneyFinal 9s ease-out both; }
        .career-final-float { animation: floatFinal 5s ease-in-out infinite; }
        .career-final-pulse { animation: pulseFinal 3s ease-in-out infinite; }
      `}</style>

      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        {/* Sidebar with real Velora logo */}
        <aside className="hidden w-[232px] shrink-0 flex-col bg-[#103F34] px-4 py-5 text-white lg:flex">
          <div className="flex items-center gap-3 px-2 pb-7">
            <img src="/logo.png" alt="Velora" className="h-11 w-11 rounded-xl object-contain" />
            <div>
              <div className="font-serif text-[21px] font-bold tracking-wide">Velora</div>
              <div className="text-[7px] font-black tracking-[0.2em] text-[#F2B19F]">AI CAREER COMPANION</div>
            </div>
          </div>

          <nav className="flex-1 space-y-1.5">
            {[
              ['Dashboard', '/dashboard'],
              ['Resume Builder', '/resume-builder'],
              ['ATS Checker', '/ats-checker'],
              ['Skill Gap', '/skill-gap'],
              ['Interview Prep', '/interview-prep'],
              ['Portfolio Builder', '/portfolio-builder'],
              ['Cover Letter', '/cover-letter'],
              ['My Documents', '/documents'],
              ['Settings', '/settings'],
            ].map(([label, path], index) => (
              <button
                type="button"
                key={label}
                onClick={() => router.push(path)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[11px] font-semibold text-white/78 transition hover:bg-white/8 hover:text-white"
              >
                <span className={`h-2 w-2 rounded-full ${index % 3 === 0 ? 'bg-[#FF8A65]' : index % 3 === 1 ? 'bg-[#75C9D0]' : 'bg-[#F6CF69]'}`} />
                {label}
              </button>
            ))}
          </nav>

          <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-[#F6CF69]" />
              <span className="text-[9px] font-black uppercase tracking-[0.14em] text-[#F6CF69]">Career journey</span>
            </div>
            <p className="mt-2 text-[10px] font-medium leading-5 text-white/62">
              See the field as connected stages, then explore the directions that interest you.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Top bar */}
          <header className={`sticky top-0 z-50 flex items-center justify-between border-b px-4 py-3 backdrop-blur-md sm:px-6 ${darkMode ? 'border-white/10 bg-[#172840]/94' : 'border-[#6B5460]/10 bg-[#F6E5B6]/94'}`}>
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${darkMode ? 'border-white/10 bg-white/7 text-white' : 'border-[#6C5360]/10 bg-white/60 text-[#3D3D4C]'}`}
                aria-label="Back to dashboard"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#B65769] dark:text-[#FFB5A0]">Career Map</p>
                <p className="text-[10px] font-bold text-[#5D5661]/75 dark:text-white/52">Explore the journey • choose your depth</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-2xl border border-[#6C5360]/10 bg-white/45 px-3 py-2 md:flex dark:border-white/10 dark:bg-white/6">
                <Route className="h-4 w-4 text-[#D85A85]" />
                <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[#4E4650] dark:text-white/72">Foundation → Core → Intermediate → Advanced → Specialization</span>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${darkMode ? 'border-white/10 bg-white/7 text-white' : 'border-[#6C5360]/10 bg-white/60 text-[#3D3D4C]'}`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </header>

          {/* Hero */}
          <section className={`relative overflow-hidden px-4 pb-5 pt-7 sm:px-6 lg:px-8 ${darkMode ? 'bg-[#203753]' : 'bg-gradient-to-br from-[#F7E2A8] via-[#F4CF91] to-[#C8D68F]'}`}>
            <div className="pointer-events-none absolute -left-16 top-10 h-48 w-72 rounded-[50%] bg-[#93BC73]/28" />
            <div className="pointer-events-none absolute right-[-30px] top-0 h-52 w-80 rounded-[50%] bg-[#EA988D]/25" />
            <div className="pointer-events-none absolute left-[39%] top-[-70px] h-48 w-96 rounded-[50%] bg-[#74C5D2]/22" />

            <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#6D5260]/10 bg-white/55 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.16em] text-[#554553] dark:border-white/10 dark:bg-white/7 dark:text-white/75">
                  <Sparkles className="h-3.5 w-3.5 text-[#E16A4C]" /> Discover the route
                </div>

                <div className="mt-3 flex items-start gap-4">
                  <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[20px] bg-[#103F34] shadow-[0_14px_32px_rgba(16,63,52,.22)]">
                    <img src="/logo.png" alt="" className="h-[48px] w-[48px] object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#A54E60] dark:text-[#FFB8A3]">
                      {profile.name ? `${profile.name}'s journey` : 'Your journey'}
                    </p>
                    <h1 className="mt-1 font-serif text-[36px] font-bold leading-[1.02] text-[#243146] dark:text-white sm:text-[46px]">
                      {careerMap.title}
                    </h1>
                    <p className="mt-2 max-w-3xl text-[14px] font-semibold leading-6 text-[#5A5864] dark:text-white/67">
                      Build the foundations. Understand the depth. Choose where you want to go deeper.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    ['Foundation', '#E16A4C'],
                    ['Core', '#4A9EB8'],
                    ['Intermediate', '#5B9A66'],
                    ['Advanced', '#7B68BD'],
                    ['Specialization', '#D55B83'],
                  ].map(([label, color]) => (
                    <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/48 px-3 py-1.5 text-[9px] font-black text-[#404855] dark:border-white/10 dark:bg-white/7 dark:text-white/75">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="career-final-float rounded-[28px] border border-white/18 bg-gradient-to-br from-[#173E59] via-[#2F6D79] to-[#74527D] p-5 text-white shadow-[0_20px_55px_rgba(35,48,65,.24)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFD16B]/14 text-[#FFD16B]">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#FFB8A3]">Career lens</p>
                    <p className="mt-0.5 text-[15px] font-black">{interest || 'Choose a career interest'}</p>
                  </div>
                </div>
                <p className="mt-4 text-[10px] font-semibold leading-5 text-white/68">
                  A connected view of the field — what comes first, what gets deeper and where the journey can branch.
                </p>
              </div>
            </div>
          </section>

          {/* Scenic map + details */}
          <div className="grid items-start gap-5 px-4 pb-10 pt-5 sm:px-6 lg:px-8 xl:grid-cols-[minmax(0,1fr)_380px]">
            <section className="relative overflow-hidden rounded-[36px] border border-white/25 bg-[#759B69] shadow-[0_24px_78px_rgba(35,43,56,.18)]">
              <div className="relative min-h-[2050px] overflow-hidden">
                {/* Terrain */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#A9C575] via-[#84AF6C] to-[#4D8067]" />
                <div className="absolute -left-20 top-24 h-72 w-[640px] rotate-[-8deg] rounded-[50%] bg-[#D9DC8C]/70" />
                <div className="absolute right-[-100px] top-48 h-80 w-[640px] rotate-[9deg] rounded-[50%] bg-[#568168]/70" />
                <div className="absolute left-[18%] top-[29%] h-80 w-[760px] rotate-[3deg] rounded-[50%] bg-[#9BC474]/54" />
                <div className="absolute -left-24 top-[49%] h-96 w-[700px] rotate-[-10deg] rounded-[50%] bg-[#638F66]/62" />
                <div className="absolute right-[-100px] top-[66%] h-[420px] w-[700px] rotate-[9deg] rounded-[50%] bg-[#6B956C]/62" />
                <div className="absolute left-[18%] bottom-[2%] h-80 w-[800px] rounded-[50%] bg-[#4D7E68]/76" />

                {/* River */}
                <svg className="pointer-events-none absolute left-0 top-[8%] h-[72%] w-full" viewBox="0 0 1200 1300" preserveAspectRatio="none">
                  <path d="M1090 0 C850 150 1110 300 900 430 C695 565 1005 705 760 860 C575 975 805 1120 520 1300 L1200 1300 L1200 0 Z" fill="#3CAAC3" opacity=".76" />
                  <path d="M1110 20 C880 165 1125 310 925 445 C735 580 1025 720 785 875 C610 990 825 1130 550 1287" fill="none" stroke="#C6EEF2" strokeWidth="24" strokeLinecap="round" opacity=".63" />
                </svg>

                {/* Decorative terrain */}
                <div className="pointer-events-none absolute left-[5%] top-[13%] text-[#456F5B]/70"><Trees className="h-16 w-16" strokeWidth={1.05} /></div>
                <div className="pointer-events-none absolute right-[7%] top-[28%] text-[#F4EDCE]/75"><Flower2 className="h-14 w-14" strokeWidth={1.05} /></div>
                <div className="pointer-events-none absolute left-[7%] top-[56%] text-[#E5D4AA]/58"><MountainIcon /></div>
                <div className="pointer-events-none absolute right-[8%] bottom-[18%] text-[#C5E7E1]/74"><Waves className="h-16 w-16" strokeWidth={1.05} /></div>

                {/* Winding route */}
                <svg className="pointer-events-none absolute left-1/2 top-16 h-[1900px] w-[430px] -translate-x-1/2" viewBox="0 0 430 1900" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M215 0 C55 130 380 245 215 390 C45 535 390 675 215 820 C50 965 380 1110 215 1250 C55 1390 350 1530 215 1900" fill="none" stroke="#F7E9BA" strokeWidth="82" strokeLinecap="round" opacity=".97" />
                  <path className="career-final-route" d="M215 0 C55 130 380 245 215 390 C45 535 390 675 215 820 C50 965 380 1110 215 1250 C55 1390 350 1530 215 1900" fill="none" stroke="#D85A85" strokeWidth="7" strokeLinecap="round" opacity=".92" />
                  <path d="M215 0 C55 130 380 245 215 390 C45 535 390 675 215 820 C50 965 380 1110 215 1250 C55 1390 350 1530 215 1900" fill="none" stroke="#68C6C6" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 23" opacity=".95" />
                </svg>

                <div className="relative z-10 px-4 pb-12 pt-8 sm:px-7">
                  <div className="mb-12 flex justify-center">
                    <div className="career-final-pulse rounded-full border border-white/22 bg-[#263F60]/88 px-5 py-2.5 shadow-xl backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-[#FFD16B]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white">Start here</span>
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto mb-14 max-w-[630px] rounded-[26px] border border-white/20 bg-[#24465D]/72 p-4.5 text-white shadow-[0_12px_32px_rgba(35,42,60,.15)] backdrop-blur-sm">
                    <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#FFD16B]">How to read your map</p>
                    <p className="mt-1.5 text-[10px] font-semibold leading-5 text-white/74">
                      Follow the shared journey first. The final stage opens into different specialization directions rather than one fixed destination.
                    </p>
                  </div>

                  <div className="space-y-20 md:space-y-32">
                    {careerMap.stages.map((stage, index) => (
                      <div key={`${stage.number}-${stage.title}`} className="relative">
                        {/* route marker */}
                        <div className={`absolute left-1/2 top-8 z-30 hidden -translate-x-1/2 md:block ${selected === index ? 'career-final-pulse' : ''}`}>
                          <div className="flex h-11 w-11 items-center justify-center rounded-full border-[5px] border-[#F7E9BA] shadow-[0_8px_24px_rgba(30,44,58,.25)]" style={{ background: stagePalette[index].node }}>
                            <span className="text-[9px] font-black text-white">{stage.number}</span>
                          </div>
                        </div>

                        <div className={index % 2 === 0 ? 'md:pr-[51%]' : 'md:pl-[51%]'}>
                          <StageCard stage={stage} index={index} selected={selected === index} onSelect={() => setSelected(index)} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 flex justify-center">
                    <div className="rounded-full border border-white/20 bg-[#263F60]/78 px-5 py-2.5 shadow-xl backdrop-blur-sm">
                      <span className="text-[9px] font-black uppercase tracking-[0.16em] text-[#FFE8B8]">Explore a direction that feels right for you</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Inspector */}
            <aside className="xl:sticky xl:top-[88px]">
              <div className="overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-b from-[#193F51] via-[#3D416E] to-[#5E416B] text-white shadow-[0_24px_70px_rgba(25,34,55,.29)]">
                <div className="border-b border-white/10 px-5 py-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-[0.17em] text-[#FFB69D]">Selected checkpoint</p>
                      <h2 className="mt-1 font-serif text-[28px] font-bold leading-tight">{current.number} · {current.title}</h2>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFD16B]/12 text-[#FFD16B]"><MapPinned className="h-5 w-5" /></div>
                  </div>
                  <p className="mt-3 text-[10.5px] font-semibold leading-5 text-white/70">{current.description}</p>
                </div>

                <div className="space-y-5 p-5">
                  <div className="rounded-[23px] border border-[#FFD16B]/15 bg-[#FFD16B]/8 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FF8A65]/18 text-[#FFC2A9]"><Sparkles className="h-4 w-4" /></div>
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#FFD16B]">Why this matters</p>
                        <p className="mt-1.5 text-[10px] font-semibold leading-5 text-white/70">This checkpoint gives you the conceptual base needed before the field becomes more specialized and complex.</p>
                      </div>
                    </div>
                  </div>

                  <Difficulty value={current.difficulty} />

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-white/48">Learn / Understand</p>
                      <span className="text-[8px] font-bold text-white/35">{current.concepts.length} concepts</span>
                    </div>
                    <div className="grid gap-2">
                      {current.concepts.map((concept, index) => (
                        <div key={concept} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/7 px-3 py-2.5">
                          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[8px] font-black ${index % 3 === 0 ? 'bg-[#2F8C82] text-white' : index % 3 === 1 ? 'bg-[#D85A85] text-white' : 'bg-[#FFB15C] text-[#4D2D3C]'}`}>{String(index + 1).padStart(2, '0')}</span>
                          <span className="text-[10px] font-bold text-white/84">{concept}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[23px] border border-white/9 bg-white/6 p-4">
                    <p className="text-[8px] font-black uppercase tracking-[0.15em] text-[#FFB69D]">Before going deeper</p>
                    <p className="mt-1.5 text-[10px] font-medium leading-5 text-white/65">Use the map to understand how the ideas connect. It is a career-navigation view, not a course sequence.</p>
                  </div>

                  {current.branches && (
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-white/48">Specialization branches</p>
                        <span className="text-[8px] font-bold text-white/35">{current.branches.length} directions</span>
                      </div>
                      <div className="mt-3 grid gap-2.5">
                        {current.branches.map((branch) => <BranchCard key={branch.name} branch={branch} />)}
                      </div>
                    </div>
                  )}

                  {next && (
                    <button
                      type="button"
                      onClick={() => setSelected((value) => Math.min(careerMap.stages.length - 1, value + 1))}
                      className="flex w-full items-center justify-between rounded-[23px] bg-gradient-to-r from-[#E16A4C] via-[#D85A85] to-[#7762B4] px-4 py-3.5 text-left text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      <span>
                        <span className="block text-[8px] font-black uppercase tracking-[0.14em] text-white/64">Next on the map</span>
                        <span className="mt-0.5 block text-[11px] font-black">{next.number} · {next.title}</span>
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}

                  {!next && (
                    <div className="rounded-[23px] border border-[#FFD16B]/15 bg-[#FFD16B]/8 p-4">
                      <p className="text-[8px] font-black uppercase tracking-[0.15em] text-[#FFD16B]">Your next decision</p>
                      <p className="mt-1.5 text-[10px] font-semibold leading-5 text-white/68">Compare the branches above and explore the kind of work you would like to go deeper into.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-[26px] border border-[#687080]/12 bg-[#FFF2CD]/92 p-4 text-[#485362] shadow-[0_12px_35px_rgba(42,43,64,.11)]">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#103F34] text-[#FFD16B]"><BriefcaseBusiness className="h-4 w-4" /></div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#7E5262]">Career map principle</p>
                    <p className="mt-1 text-[10px] font-medium leading-5 text-[#586473]">The map focuses on stable concepts and career depth. Changing tools and industry trends can be layered in later.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

function MountainIcon() {
  return (
    <svg viewBox="0 0 80 60" className="h-16 w-16" fill="none">
      <path d="M5 52L28 17L39 33L54 8L75 52Z" fill="currentColor" opacity=".42" />
      <path d="M28 17L39 33L34 27L54 8L61 25" stroke="currentColor" strokeWidth="1.5" opacity=".7" />
      <path d="M5 52H75" stroke="currentColor" strokeWidth="2" opacity=".5" />
    </svg>
  );
}
