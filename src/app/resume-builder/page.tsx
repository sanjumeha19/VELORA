'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Target,
  FilePenLine,
  Layers,
  Mic,
  Folder,
  Settings,
  LogOut,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Save,
  Download,
  Sparkles,
  Eye,
  X,
  Check,
  Moon,
  Sun,
  Upload,
  FileUp,
  ShieldCheck,
  CircleHelp,
  RotateCcw,
  Pencil,
  RefreshCw,
  Lightbulb,
  MoreVertical,
  FileJson,
  Globe,
  Code2,
  WandSparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info,
  Link2,
  User,
  MapPin,
  Mail,
  Phone,
  BriefcaseBusiness,
  GraduationCap,
  Award,
} from 'lucide-react';
import { useVeloraTheme } from '@/component/velora-theme-provider';
import { getCareerRecommendationContext, buildAiCareerContext } from '@/data/career-taxonomy';

type StoredProfile = {
  name?: string;
  email?: string;
  status?: string;
  experience?: string;
  education?: string;
  stream?: string;
  specialization?: string;
  skills?: string[];
  certifications?: string;
  projects?: string;
};

type EducationItem = {
  id: number;
  degree: string;
  institution: string;
  year: string;
  score: string;
};

type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  duration: string;
  points: string[];
};

type ProjectItem = {
  id: number;
  name: string;
  tech: string;
  description: string;
  impact: string;
};

type ResumeDraft = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  title: string;
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: string[];
  certifications: string[];
  achievements: string[];
};

type ResumeVersion = {
  id: string;
  name: string;
  target: string;
  updatedAt: string;
  resume: ResumeDraft;
};

type RewriteState = {
  kind: string;
  source: string;
  improved: string;
  section: 'Summary' | 'Experience' | 'Projects';
  itemId?: number;
  pointIndex?: number;
};

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Resume Builder', path: '/resume-builder', icon: FileText },
  { label: 'ATS Checker', path: '/ats-checker', icon: Target },
  { label: 'Cover Letter Builder', path: '/cover-letter', icon: FilePenLine },
  { label: 'Skill Gap Analysis', path: '/skill-gap', icon: Layers },
  { label: 'Portfolio Builder', path: '/portfolio', icon: Folder },
  { label: 'Interview Prep', path: '/interview-prep', icon: Mic },
  { label: 'My Documents', path: '/documents', icon: Folder },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const sections = ['Personal', 'Summary', 'Education', 'Experience', 'Projects', 'Skills', 'Certifications', 'Additional'];


const defaultResume: ResumeDraft = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  portfolio: '',
  title: '',
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  achievements: [],
};

const newEducation = (): EducationItem => ({ id: Date.now() + Math.random(), degree: '', institution: '', year: '', score: '' });
const newExperience = (): ExperienceItem => ({ id: Date.now() + Math.random(), role: '', company: '', duration: '', points: [''] });
const newProject = (): ProjectItem => ({ id: Date.now() + Math.random(), name: '', tech: '', description: '', impact: '' });

const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, ' ').trim();

const hasSkill = (skills: string[], target: string) => {
  const t = normalize(target);
  return skills.some(skill => {
    const s = normalize(skill);
    return s === t || s.includes(t) || t.includes(s);
  });
};

const formatStamp = () =>
  new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const resumeToText = (resume: ResumeDraft) => {
  const lines: string[] = [];
  lines.push(resume.fullName || 'Your Name');
  lines.push(resume.title || 'Professional');
  lines.push([resume.email, resume.phone, resume.location, resume.linkedin, resume.github, resume.portfolio].filter(Boolean).join(' | '));
  lines.push('');
  if (resume.summary) lines.push('PROFESSIONAL SUMMARY', resume.summary, '');
  if (resume.skills.filter(Boolean).length) lines.push('SKILLS', resume.skills.filter(Boolean).join(', '), '');
  if (resume.experience.length) {
    lines.push('EXPERIENCE');
    resume.experience.forEach(item => {
      lines.push(`${item.role} — ${item.company} — ${item.duration}`);
      item.points.filter(Boolean).forEach(point => lines.push(`• ${point}`));
    });
    lines.push('');
  }
  if (resume.projects.length) {
    lines.push('PROJECTS');
    resume.projects.forEach(item => {
      lines.push(`${item.name} — ${item.tech}`);
      if (item.description) lines.push(item.description);
      if (item.impact) lines.push(`Impact: ${item.impact}`);
    });
    lines.push('');
  }
  if (resume.education.length) {
    lines.push('EDUCATION');
    resume.education.forEach(item => lines.push(`${item.degree} — ${item.institution} — ${item.year} — ${item.score}`));
    lines.push('');
  }
  if (resume.certifications.filter(Boolean).length) lines.push('CERTIFICATIONS', ...resume.certifications.filter(Boolean).map(item => `• ${item}`), '');
  if (resume.achievements.filter(Boolean).length) lines.push('ACHIEVEMENTS & ADDITIONAL', ...resume.achievements.filter(Boolean).map(item => `• ${item}`));
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
};

const resumeToMarkdown = (resume: ResumeDraft) => {
  const out = [`# ${resume.fullName || 'Your Name'}`, `**${resume.title || 'Professional'}**`, '', [resume.email, resume.phone, resume.location, resume.linkedin, resume.github, resume.portfolio].filter(Boolean).join(' · '), ''];
  if (resume.summary) out.push('## Professional Summary', '', resume.summary, '');
  if (resume.skills.filter(Boolean).length) out.push('## Skills', '', ...resume.skills.filter(Boolean).map(s => `- ${s}`), '');
  if (resume.experience.length) {
    out.push('## Experience', '');
    resume.experience.forEach(item => {
      out.push(`### ${item.role || 'Role'} — ${item.company || 'Company'}`);
      if (item.duration) out.push(`_${item.duration}_`);
      item.points.filter(Boolean).forEach(point => out.push(`- ${point}`));
      out.push('');
    });
  }
  if (resume.projects.length) {
    out.push('## Projects', '');
    resume.projects.forEach(item => {
      out.push(`### ${item.name || 'Project'}`);
      if (item.tech) out.push(`**Tech:** ${item.tech}`);
      if (item.description) out.push(item.description);
      if (item.impact) out.push(`**Impact:** ${item.impact}`);
      out.push('');
    });
  }
  if (resume.education.length) {
    out.push('## Education', '');
    resume.education.forEach(item => out.push(`- **${item.degree}** — ${item.institution} — ${item.year} — ${item.score}`));
    out.push('');
  }
  if (resume.certifications.filter(Boolean).length) out.push('## Certifications', '', ...resume.certifications.filter(Boolean).map(item => `- ${item}`), '');
  if (resume.achievements.filter(Boolean).length) out.push('## Achievements & Additional', '', ...resume.achievements.filter(Boolean).map(item => `- ${item}`));
  return out.join('\n').trim();
};

const resumeToHtml = (resume: ResumeDraft) => {
  const esc = escapeXml;
  const links = [resume.email, resume.phone, resume.location, resume.linkedin, resume.github, resume.portfolio].filter(Boolean).map(esc).join(' · ');
  const section = (title: string, body: string) => body ? `<section><h2>${title}</h2>${body}</section>` : '';
  const experience = resume.experience.map(item => `<article><div class="row"><strong>${esc(item.role || 'Role')}</strong><span>${esc(item.duration)}</span></div><div class="muted">${esc(item.company)}</div><ul>${item.points.filter(Boolean).map(point => `<li>${esc(point)}</li>`).join('')}</ul></article>`).join('');
  const projects = resume.projects.map(item => `<article><div class="row"><strong>${esc(item.name || 'Project')}</strong><span>${esc(item.tech)}</span></div><p>${esc(item.description)}</p>${item.impact ? `<p><strong>Impact:</strong> ${esc(item.impact)}</p>` : ''}</article>`).join('');
  const education = resume.education.map(item => `<article><div class="row"><strong>${esc(item.degree)}</strong><span>${esc(item.year)}</span></div><div class="muted">${esc(item.institution)}${item.score ? ` · ${esc(item.score)}` : ''}</div></article>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(resume.fullName || 'Velora Resume')}</title><style>body{font-family:Arial,sans-serif;color:#1a1a1a;max-width:900px;margin:auto;padding:42px;line-height:1.55}h1{font-size:34px;color:#0A3323;margin:0}.subtitle{color:#105666;font-weight:700}h2{font-size:14px;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid #d6ddd6;padding-bottom:6px;color:#0A3323;margin-top:24px}.meta,.muted{color:#666;font-size:12px}.row{display:flex;justify-content:space-between;gap:20px}article{margin:14px 0}li{margin:4px 0}</style></head><body><h1>${esc(resume.fullName || 'Your Name')}</h1><div class="subtitle">${esc(resume.title || 'Professional')}</div><div class="meta">${links}</div>${section('Professional Summary', resume.summary ? `<p>${esc(resume.summary)}</p>` : '')}${section('Skills', resume.skills.filter(Boolean).length ? `<p>${resume.skills.filter(Boolean).map(esc).join(' · ')}</p>` : '')}${section('Experience', experience)}${section('Projects', projects)}${section('Education', education)}${section('Certifications', resume.certifications.filter(Boolean).length ? `<ul>${resume.certifications.filter(Boolean).map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : '')}${section('Achievements & Additional', resume.achievements.filter(Boolean).length ? `<ul>${resume.achievements.filter(Boolean).map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : '')}</body></html>`;
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
};

const createDocxBlob = (resume: ResumeDraft) => {
  const paragraphs = resumeToText(resume).split('\n').map(line => `<w:p><w:r><w:t xml:space="preserve">${escapeXml(line)}</w:t></w:r></w:p>`).join('');
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${paragraphs}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720"/></w:sectPr></w:body></w:document>`;
  const files = [
    ['[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`],
    ['_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`],
    ['word/document.xml', documentXml],
  ] as const;

  const enc = new TextEncoder();
  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let j = 0; j < 8; j += 1) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crcTable[i] = c >>> 0;
  }
  const crc32 = (bytes: Uint8Array) => {
    let c = 0xffffffff;
    for (const byte of bytes) c = crcTable[(c ^ byte) & 255] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const u16 = (view: DataView, offset: number, value: number) => view.setUint16(offset, value, true);
  const u32 = (view: DataView, offset: number, value: number) => view.setUint32(offset, value >>> 0, true);

  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  const entries: { name: Uint8Array; data: Uint8Array; crc: number; offset: number }[] = [];
  let offset = 0;

  for (const [name, content] of files) {
    const nameBytes = enc.encode(name);
    const data = enc.encode(content);
    const crc = crc32(data);
    const local = new Uint8Array(30 + nameBytes.length + data.length);
    const v = new DataView(local.buffer);
    u32(v, 0, 0x04034b50); u16(v, 4, 20); u16(v, 6, 0); u16(v, 8, 0); u16(v, 10, 0); u16(v, 12, 0);
    u32(v, 14, crc); u32(v, 18, data.length); u32(v, 22, data.length); u16(v, 26, nameBytes.length); u16(v, 28, 0);
    local.set(nameBytes, 30); local.set(data, 30 + nameBytes.length);
    localParts.push(local);
    entries.push({ name: nameBytes, data, crc, offset });
    offset += local.length;
  }

  const centralStart = offset;
  for (const entry of entries) {
    const central = new Uint8Array(46 + entry.name.length);
    const v = new DataView(central.buffer);
    u32(v, 0, 0x02014b50); u16(v, 4, 20); u16(v, 6, 20); u16(v, 8, 0); u16(v, 10, 0); u16(v, 12, 0); u16(v, 14, 0);
    u32(v, 16, entry.crc); u32(v, 20, entry.data.length); u32(v, 24, entry.data.length); u16(v, 28, entry.name.length); u16(v, 30, 0); u16(v, 32, 0); u16(v, 34, 0); u16(v, 36, 0);
    u32(v, 38, 0); u32(v, 42, entry.offset); central.set(entry.name, 46);
    centralParts.push(central); offset += central.length;
  }

  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  u32(endView, 0, 0x06054b50); u16(endView, 4, 0); u16(endView, 6, 0); u16(endView, 8, entries.length); u16(endView, 10, entries.length);
  u32(endView, 12, offset - centralStart); u32(endView, 16, centralStart); u16(endView, 20, 0);

  const total = localParts.reduce((n, part) => n + part.length, 0) + centralParts.reduce((n, part) => n + part.length, 0) + end.length;
  const all = new Uint8Array(total);
  let cursor = 0;
  [...localParts, ...centralParts, end].forEach(part => { all.set(part, cursor); cursor += part.length; });
  return new Blob([all.buffer as ArrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
};

export default function ResumeBuilderPage() {
  const router = useRouter();
  const { darkMode, toggleTheme } = useVeloraTheme();

  const [profile, setProfile] = useState<StoredProfile>({});
  const [resume, setResume] = useState<ResumeDraft>(defaultResume);
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [activeVersionId, setActiveVersionId] = useState('');
  const [activeSection, setActiveSection] = useState('Personal');
  const [autosaveLabel, setAutosaveLabel] = useState('Ready to build');
  const [saveMessage, setSaveMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [showNewVersion, setShowNewVersion] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [rewrite, setRewrite] = useState<RewriteState | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'analyzing' | 'ready'>('idle');
  const [importReport, setImportReport] = useState<string[]>([]);
  const [importFileName, setImportFileName] = useState('');
  const [importSourceText, setImportSourceText] = useState('');
  const [newVersionName, setNewVersionName] = useState('');
  const [newVersionTarget, setNewVersionTarget] = useState('');

  const firstName = profile.name?.split(/\s+/)[0] || resume.fullName || 'there';
  const specialization = profile.specialization?.trim() || resume.title || 'Professional';
  const profileSkills = Array.isArray(profile.skills) ? profile.skills.filter(Boolean) : [];

  // Centralized career intelligence: domain + specialization + profile skills.
  // The taxonomy provides grounded role-specific context instead of a small
  // hardcoded list inside this page.
  const careerContext = useMemo(() => getCareerRecommendationContext({
    stream: profile.stream,
    specialization,
    skills: profileSkills,
    status: profile.status,
    experience: profile.experience,
    education: profile.education,
  }), [
    profile.stream,
    profile.status,
    profile.experience,
    profile.education,
    specialization,
    profileSkills,
  ]);

  const roleData = careerContext;

  const recommendationSkills = useMemo(() => {
    const current = resume.skills.filter(Boolean);
    return [...roleData.tools, ...roleData.skills]
      .filter((item, i, arr) => arr.findIndex(x => normalize(x) === normalize(item)) === i)
      .filter(item => !hasSkill(current, item))
      .slice(0, 6);
  }, [resume.skills, roleData.tools, roleData.skills]);

  const aiCareerContext = useMemo(() => buildAiCareerContext(
    {
      stream: profile.stream,
      specialization,
      skills: profileSkills,
      status: profile.status,
      experience: profile.experience,
      education: profile.education,
    },
    resume.skills.filter(Boolean),
  ), [
    profile.stream,
    profile.status,
    profile.experience,
    profile.education,
    specialization,
    profileSkills,
    resume.skills,
  ]);

  const sectionCompletion = useMemo(() => ({
    Personal: resume.fullName && resume.email && resume.title ? 100 : Math.round(([resume.fullName, resume.email, resume.title].filter(Boolean).length / 3) * 100),
    Summary: resume.summary ? Math.min(100, resume.summary.length >= 160 ? 100 : 75) : 0,
    Education: resume.education.length ? 100 : 0,
    Experience: resume.experience.length ? 100 : 0,
    Projects: resume.projects.length ? 100 : 0,
    Skills: resume.skills.filter(Boolean).length ? 100 : 0,
    Certifications: resume.certifications.filter(Boolean).length ? 100 : 0,
    Additional: resume.achievements.filter(Boolean).length ? 100 : 0,
  } as Record<string, number>), [resume]);

  const completedSections = Object.values(sectionCompletion).filter(v => v === 100).length;
  const sectionProgress = Math.round((completedSections / sections.length) * 100);

  const health = useMemo(() => {
    const content = Math.round(([resume.fullName && resume.email, resume.summary, resume.education.length, resume.experience.length || resume.projects.length, resume.skills.filter(Boolean).length].filter(Boolean).length / 5) * 100);
    const clarity = Math.min(100, 55 + (resume.summary.length >= 160 ? 15 : 0) + (resume.title ? 10 : 0) + (resume.experience.some(x => x.points.some(p => p.length > 60)) ? 20 : 0));
    const impact = resume.experience.some(x => x.points.some(p => /%|improv|reduc|increas|built|launched|saved|grew|users/i.test(p))) || resume.projects.some(x => /%|improv|reduc|increas|users|performance|speed/i.test(x.impact)) ? 88 : Math.min(74, 44 + resume.experience.length * 8 + resume.projects.length * 7);
    const completeness = Math.round((Object.values(sectionCompletion).filter(v => v === 100).length / sections.length) * 100);
    return { overall: Math.round((content + clarity + impact + completeness) / 4), content, clarity, impact, completeness };
  }, [resume, sectionCompletion]);

  const updateResume = <K extends keyof ResumeDraft>(key: K, value: ResumeDraft[K]) => setResume(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
    try {
      const savedProfile = window.localStorage.getItem('veloraProfile');
      const savedResume = window.localStorage.getItem('veloraResumeDraft');
      const savedVersions = window.localStorage.getItem('veloraResumeVersions');
      const savedActive = window.localStorage.getItem('veloraActiveResumeVersion');
      const parsedProfile = savedProfile ? JSON.parse(savedProfile) as StoredProfile : {};
      setProfile(parsedProfile);

      if (savedResume) {
        const parsed = JSON.parse(savedResume) as Partial<ResumeDraft>;
        setResume({
          ...defaultResume,
          ...parsed,
          fullName: parsed.fullName || parsedProfile.name || '',
          email: parsed.email || parsedProfile.email || '',
          title: parsed.title || parsedProfile.specialization || '',
          skills: Array.isArray(parsed.skills) && parsed.skills.length ? parsed.skills : (parsedProfile.skills || []),
          education: Array.isArray(parsed.education) ? parsed.education : [],
          experience: Array.isArray(parsed.experience) ? parsed.experience : [],
          projects: Array.isArray(parsed.projects) ? parsed.projects : [],
          certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
          achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
        });
        setAutosaveLabel('Loaded from your last save');
      } else {
        setResume(prev => ({ ...prev, fullName: parsedProfile.name || '', email: parsedProfile.email || '', title: parsedProfile.specialization || '', skills: parsedProfile.skills || [] }));
      }

      if (savedVersions) {
        const parsedVersions = JSON.parse(savedVersions) as ResumeVersion[];
        setVersions(Array.isArray(parsedVersions) ? parsedVersions : []);
        const active = savedActive || parsedVersions[0]?.id || '';
        setActiveVersionId(active);
      }
    } catch {
      setResume(defaultResume);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem('veloraResumeDraft', JSON.stringify(resume));
        setAutosaveLabel(`Autosaved ${formatStamp()}`);
      } catch {
        setAutosaveLabel('Autosave unavailable');
      }
    }, 900);
    return () => window.clearTimeout(timer);
  }, [resume]);

  useEffect(() => {
    window.localStorage.setItem('veloraResumeVersions', JSON.stringify(versions));
    if (activeVersionId) window.localStorage.setItem('veloraActiveResumeVersion', activeVersionId);
  }, [versions, activeVersionId]);

  const saveResume = () => {
    window.localStorage.setItem('veloraResumeDraft', JSON.stringify(resume));
    setSaveMessage('Saved');
    setAutosaveLabel(`Saved ${formatStamp()}`);
    setTimeout(() => setSaveMessage(''), 1600);
  };

  const generateSummary = () => {
    const role = resume.title || roleData.roles[0] || specialization;
    const chosen = resume.skills.filter(Boolean).slice(0, 5);
    const focus = roleData.focus.slice(0, 2).join(' and ');
    updateResume('summary', chosen.length
      ? `${role} with hands-on experience in ${chosen.join(', ')}. Focused on ${focus}, building practical solutions and turning ideas into measurable outcomes.`
      : `${role} focused on ${focus}. Strong foundation in ${profile.stream || 'technology'}, with an interest in practical projects, continuous learning, and measurable problem solving.`);
  };

  const runRewrite = () => {
    const experience = resume.experience.find(x => x.points.some(Boolean));
    if (experience) {
      const index = experience.points.findIndex(Boolean);
      const source = experience.points[index] || 'Worked on a project.';
      const improved = source.length > 80
        ? `${source.replace(/[.]+$/, '')}, highlighting ownership, measurable delivery, and stronger role impact.`
        : `Developed ${source.replace(/^worked on\s+/i, '').replace(/[.]+$/, '').toLowerCase() || 'a production-ready solution'} using a structured user-focused approach, improving usability and delivery quality.`;
      setRewrite({ kind: 'Experience bullet', source, improved, section: 'Experience', itemId: experience.id, pointIndex: index });
      return;
    }
    const project = resume.projects.find(x => x.description || x.impact);
    if (project) {
      const source = project.description || project.impact;
      const improved = `${source.replace(/[.]+$/, '')}, emphasizing ownership, technical execution, and measurable product value.`;
      setRewrite({ kind: 'Project description', source, improved, section: 'Projects', itemId: project.id });
      return;
    }
    const source = resume.summary || 'Built projects related to my target role.';
    const improved = `${source.replace(/[.]+$/, '')}, emphasizing problem solving, ownership, and role-relevant impact.`;
    setRewrite({ kind: 'Summary upgrade', source, improved, section: 'Summary' });
  };

  const applyRewrite = () => {
    if (!rewrite) return;
    if (rewrite.section === 'Summary') updateResume('summary', rewrite.improved);
    if (rewrite.section === 'Experience' && rewrite.itemId !== undefined && rewrite.pointIndex !== undefined) {
      setResume(prev => ({ ...prev, experience: prev.experience.map(item => item.id === rewrite.itemId ? { ...item, points: item.points.map((p, i) => i === rewrite.pointIndex ? rewrite.improved : p) } : item) }));
    }
    if (rewrite.section === 'Projects' && rewrite.itemId !== undefined) {
      setResume(prev => ({ ...prev, projects: prev.projects.map(item => item.id === rewrite.itemId ? { ...item, description: rewrite.improved } : item) }));
    }
    setSaveMessage('AI change applied');
    setTimeout(() => setSaveMessage(''), 1600);
  };

  const undoRewrite = () => {
    if (!rewrite) return;
    if (rewrite.section === 'Summary') updateResume('summary', rewrite.source);
    if (rewrite.section === 'Experience' && rewrite.itemId !== undefined && rewrite.pointIndex !== undefined) {
      setResume(prev => ({ ...prev, experience: prev.experience.map(item => item.id === rewrite.itemId ? { ...item, points: item.points.map((p, i) => i === rewrite.pointIndex ? rewrite.source : p) } : item) }));
    }
    if (rewrite.section === 'Projects' && rewrite.itemId !== undefined) setResume(prev => ({ ...prev, projects: prev.projects.map(item => item.id === rewrite.itemId ? { ...item, description: rewrite.source } : item) }));
  };

  const addRecommendedSkill = (skill: string) => {
    if (!hasSkill(resume.skills, skill)) setResume(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  };

  const createVersion = () => {
    const name = newVersionName.trim() || `${specialization} Resume`;
    const id = makeId();
    setVersions(prev => [{ id, name, target: newVersionTarget.trim() || specialization, updatedAt: formatStamp(), resume: structuredClone(resume) }, ...prev]);
    setActiveVersionId(id);
    setShowNewVersion(false);
    setNewVersionName('');
    setNewVersionTarget('');
  };

  const switchVersion = (id: string) => {
    const target = versions.find(version => version.id === id);
    if (!target) return;
    setResume(target.resume);
    setActiveVersionId(id);
    setShowVersions(false);
    setAutosaveLabel(`Loaded ${target.name}`);
  };

  const handleImport = async (file: File) => {
    setImportFileName(file.name);
    setImportStatus('analyzing');
    setImportReport([]);
    try {
      const lower = file.name.toLowerCase();
      let text = '';
      if (lower.endsWith('.txt') || lower.endsWith('.md') || lower.endsWith('.json')) {
        text = await file.text();
      }
      if (text) {
        setImportSourceText(text.slice(0, 15000));
        const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        setResume(prev => ({
          ...prev,
          fullName: prev.fullName || lines[0] || '',
          summary: prev.summary || lines.find(line => /summary|profile|about/i.test(line)) || '',
        }));
        setImportReport(['Basic text extracted', 'Profile fields checked', 'Existing content kept editable', 'AI upgrade suggestions ready']);
      } else {
        setImportSourceText('');
        setImportReport(['File selected successfully', 'PDF/DOCX extraction is reserved for the resume parser service', 'Import workspace is ready for backend extraction', 'No existing content was overwritten']);
      }
      setImportStatus('ready');
    } catch {
      setImportStatus('ready');
      setImportReport(['Could not read this file in the browser', 'You can still continue with manual editing']);
    }
  };

  const exportResume = (format: string) => {
    const filenameBase = `${(resume.fullName || 'velora-resume').replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'velora-resume'}`;
    if (format === 'PDF') {
      setShowExport(false);
      setShowPreview(true);
      setTimeout(() => window.print(), 250);
      return;
    }
    if (format === 'DOCX') downloadBlob(createDocxBlob(resume), `${filenameBase}.docx`);
    if (format === 'TXT') downloadBlob(new Blob([resumeToText(resume)], { type: 'text/plain;charset=utf-8' }), `${filenameBase}.txt`);
    if (format === 'HTML') downloadBlob(new Blob([resumeToHtml(resume)], { type: 'text/html;charset=utf-8' }), `${filenameBase}.html`);
    if (format === 'Markdown') downloadBlob(new Blob([resumeToMarkdown(resume)], { type: 'text/markdown;charset=utf-8' }), `${filenameBase}.markdown`);
    if (format === 'JSON') downloadBlob(new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json;charset=utf-8' }), `${filenameBase}.json`);
    setShowExport(false);
  };

  const sectionTitle = activeSection === 'Personal' ? 'Personal Details' : activeSection;

  return (
    <div className={`h-screen overflow-hidden p-3 flex gap-3 font-sans ${darkMode ? 'bg-[#071F15] text-white' : 'bg-[#FAF8F2] text-[#0A3323]'}`}>
      <style jsx global>{`
        .velora-scroll::-webkit-scrollbar{width:5px}.velora-scroll::-webkit-scrollbar-thumb{background:${darkMode ? 'rgba(247,244,213,.18)' : 'rgba(10,51,35,.16)'};border-radius:999px}
        @media print{body *{visibility:hidden!important}.print-resume,.print-resume *{visibility:visible!important}.print-resume{position:absolute!important;left:0!important;top:0!important;width:100%!important;background:#fff!important;color:#111!important;box-shadow:none!important}}
      `}</style>

      {/* LEFT: exact OG Dashboard-style Velora navigation */}
      <aside
        className={`w-52 shrink-0 rounded-[24px] p-3 flex flex-col justify-between border mr-0 shadow-xs self-start ${
          darkMode
            ? 'bg-[#0D2D22] border-white/15'
            : 'bg-[#F2EDE2] border-[#0A3323]/15'
        }`}
      >
        <div className="space-y-4 flex-1 flex flex-col">
          <div className="bg-[#0A3323] text-[#F7F4D5] p-3 rounded-2xl flex flex-col items-center text-center shadow-md border border-[#839958]/30">
            <div className="w-8 h-7 mb-1 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Velora Logo"
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
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
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const active = item.label === 'Resume Builder';
              return (
                <button
                  key={`${item.label}-${idx}`}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? darkMode
                        ? 'bg-[#839958] text-white shadow-2xs font-bold'
                        : 'bg-[#F7F4D5] text-[#0A3323] shadow-2xs font-bold'
                      : darkMode
                        ? 'text-white/80 hover:bg-[#163A2E] hover:text-white hover:font-bold'
                        : 'text-[#0A3323]/80 hover:bg-[#0A3323]/10 hover:text-[#0A3323] hover:font-bold'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      active
                        ? darkMode ? 'text-white' : 'text-[#105666]'
                        : item.label === 'ATS Checker'
                          ? 'text-[#D3968C]'
                          : item.label === 'Settings'
                            ? darkMode ? 'text-white/90' : 'text-[#0A3323]'
                            : 'text-[#839958]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-2 pt-3 border-t border-current/15">
          <button
            onClick={() => router.push('/profile')}
            className="w-full flex items-center justify-between bg-[#105666] text-white p-2.5 rounded-xl cursor-pointer hover:bg-[#105666]/90 transition-all border border-white/15"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#839958] flex items-center justify-center text-xs font-bold overflow-hidden border border-white/20 shrink-0">
                👨‍💻
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-xs font-bold leading-none truncate">{firstName}</span>
                <span className="text-[9px] text-[#F7F4D5]/90 mt-0.5 truncate">View Profile</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#F7F4D5]/90 shrink-0" />
          </button>

          <button
            onClick={() => router.push('/login')}
            className={`w-full flex items-center space-x-2 px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              darkMode
                ? 'text-white/80 hover:text-[#D3968C]'
                : 'text-[#0A3323]/80 hover:text-[#D3968C]'
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="truncate">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="min-w-0 flex-1 flex flex-col overflow-hidden" data-career-context={specialization}>
        {/* HEADER */}
        <header className="h-[34px] shrink-0 flex items-center justify-end px-1 mb-1.5">
          <div className="flex items-center gap-2">
            {saveMessage && (
              <span className="text-[8px] font-bold text-[#839958] flex items-center gap-1">
                <Check className="w-3 h-3" />
                {saveMessage}
              </span>
            )}
            <button
              onClick={toggleTheme}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition ${
                darkMode
                  ? 'bg-[#0D2D22] border-white/10 text-[#F7F4D5] hover:bg-[#163A2E]'
                  : 'bg-white border-[#0A3323]/10 text-[#0A3323] hover:bg-[#F7F4D5]'
              }`}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </header>

        {/* HERO */}
        <section className={`shrink-0 rounded-[22px] border-2 overflow-hidden mb-2.5 ${darkMode ? 'bg-[linear-gradient(110deg,#0D2D22,#163A2E,#0D2D22)] border-[#839958]/35' : 'bg-[linear-gradient(110deg,rgba(211,150,140,.16),rgba(247,244,213,.58),rgba(16,86,102,.08))] border-[#D3968C]/20'}`}>
          <div className="px-4 py-3 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[8px] uppercase tracking-[.2em] font-bold ${darkMode ? 'text-[#B9C98D]' : 'text-[#105666]'}`}>Resume Builder</span>
                <span className={`rounded-full px-2 py-0.5 text-[7px] font-bold ${darkMode ? 'bg-[#D3968C]/20 text-[#F7F4D5]' : 'bg-[#D3968C]/25 text-[#8a4e47]'}`}>AI Powered</span>
              </div>
              <h1 className="text-[22px] font-serif font-bold leading-tight mt-1 truncate">Build your {specialization} resume.</h1>
              <p className={`text-[8.5px] mt-1 truncate ${darkMode ? 'text-[#F7F4D5]/75' : 'text-[#0A3323]/60'}`}>Create, improve, save versions, and export your resume from one workspace.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
              <button onClick={() => setShowImport(true)} className={`rounded-xl border px-3 py-2 text-[9px] font-bold cursor-pointer flex items-center gap-1.5 ${darkMode ? 'bg-[#163A2E] border-white/15 text-[#F7F4D5] hover:bg-[#105666]' : 'bg-white/85 border-[#105666]/20 text-[#105666] hover:bg-white'}`}><Upload className="w-3.5 h-3.5" />Import Resume</button>
              <button onClick={() => setShowPreview(true)} className={`rounded-xl border px-3 py-2 text-[9px] font-bold cursor-pointer ${darkMode ? 'bg-[#0D2D22] border-white/15 text-[#F7F4D5] hover:bg-[#163A2E]' : 'bg-white/85 border-[#0A3323]/15 text-[#0A3323] hover:bg-white'}`}><Eye className="w-3.5 h-3.5 inline mr-1" />Preview</button>
              <button onClick={saveResume} className={`rounded-xl px-3 py-2 text-[9px] font-bold cursor-pointer border ${darkMode ? 'bg-[#839958] border-[#B9C98D]/40 text-[#071F15] hover:bg-[#95AA68]' : 'bg-[#F7F4D5] border-[#839958]/35 text-[#0A3323] hover:bg-[#f4efbd]'}`}><Save className="w-3.5 h-3.5 inline mr-1" />Save</button>
              <button onClick={() => setShowExport(true)} className={`rounded-xl px-3.5 py-2 text-[9px] font-bold cursor-pointer ${darkMode ? 'bg-[#105666] text-[#F7F4D5] hover:bg-[#176d80]' : 'bg-[#0A3323] text-[#F7F4D5] hover:bg-[#105666]'}`}><Download className="w-3.5 h-3.5 inline mr-1" />Export</button>
            </div>
          </div>
          <div className="px-4 pb-2.5 flex items-center justify-between text-[7.5px]"><span className={`font-bold truncate ${darkMode ? 'text-[#F7F4D5]/80' : 'text-[#0A3323]/65'}`}>{activeVersionId ? `Active version: ${versions.find(v => v.id === activeVersionId)?.name || 'Current Resume'}` : 'Active version: Current Resume'}</span><span className="font-semibold text-[#839958] shrink-0">● {autosaveLabel}</span></div>
        </section>

        {/* 3-COLUMN BODY: Fixed grid columns and min-w-0 applied to prevent cut-offs */}
        <div className="min-w-0 min-h-0 flex-1 grid grid-cols-[210px_minmax(320px,1fr)_320px] gap-3 overflow-hidden">
          {/* LEFT CONTENT COLUMN */}
          <aside className={`min-w-0 min-h-0 overflow-y-auto velora-scroll rounded-[24px] border p-3 ${darkMode ? 'bg-[#0D2D22] border-white/10' : 'bg-white/90 border-[#0A3323]/10'}`}>
            <div className="rounded-2xl bg-[#0A3323] text-[#F7F4D5] p-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[9px] uppercase tracking-[.16em] text-[#D3968C] font-bold">AI Resume Health</div>
                  <div className="text-4xl font-serif font-bold mt-1">{health.overall}%</div>
                </div>
                <div className="w-14 h-14 rounded-full border-[7px] border-[#163A2E] flex items-center justify-center shrink-0" style={{ background: `conic-gradient(#D3968C ${health.overall * 3.6}deg, transparent 0)` }}>
                  <div className="w-10 h-10 bg-[#0A3323] rounded-full flex items-center justify-center text-[10px] font-bold">{health.overall}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {[['Content', health.content, '#839958'], ['Clarity', health.clarity, '#D3968C'], ['Impact', health.impact, '#105666'], ['Complete', health.completeness, '#F7F4D5']].map(([label, value, color]) => (
                  <div key={label as string} className="rounded-xl bg-white/7 border border-white/10 px-2.5 py-2 min-w-0">
                    <div className="flex justify-between text-[8px] font-bold truncate"><span>{label as string}</span><span>{value as number}%</span></div>
                    <div className="h-1 mt-1 rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${value}%`, background: color as string }} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[8px] text-white/70 flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-[#839958] shrink-0" /><span className="truncate">Live quality signals update as you edit.</span></div>
            </div>

            <div className="mt-4 flex items-center justify-between"><div className="text-[10px] font-bold truncate">Sections</div><span className="text-[8px] font-bold text-[#839958] shrink-0">{completedSections}/{sections.length} completed</span></div>
            <div className="h-1.5 rounded-full bg-current/10 mt-2 mb-2"><div className="h-full rounded-full bg-[#105666]" style={{ width: `${sectionProgress}%` }} /></div>
            <div className="space-y-1.5">
              {sections.map((section, index) => (
                <button key={section} onClick={() => setActiveSection(section)} className={`w-full rounded-xl px-2.5 py-2 flex items-center gap-2 text-left cursor-pointer min-w-0 ${activeSection === section ? 'bg-[#0A3323] text-[#F7F4D5]' : darkMode ? 'hover:bg-[#163A2E]' : 'hover:bg-[#FAF8F2]'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 ${activeSection === section ? 'bg-[#839958] text-white' : 'bg-[#839958]/15 text-[#839958]'}`}>{index + 1}</span>
                  <span className="text-[9px] font-bold flex-1 truncate">{section}</span>
                  {sectionCompletion[section] === 100 ? <CheckCircle2 className="w-3.5 h-3.5 text-[#839958] shrink-0" /> : <span className="text-[8px] opacity-45 shrink-0">{sectionCompletion[section]}%</span>}
                </button>
              ))}
            </div>

            <div className={`mt-4 rounded-2xl p-3 border ${darkMode ? 'bg-[#163A2E] border-white/10' : 'bg-[#F7F4D5]/60 border-[#839958]/20'}`}>
              <div className="flex items-center justify-between"><div className="text-[9px] font-bold flex items-center gap-1.5 truncate"><Sparkles className="w-3.5 h-3.5 text-[#D3968C] shrink-0" /><span className="truncate">Your Profile Skills</span></div><button onClick={() => setActiveSection('Skills')} className={`text-[8px] font-bold cursor-pointer shrink-0 ${darkMode ? 'text-[#B9C98D] hover:text-[#F7F4D5]' : 'text-[#105666] hover:text-[#0A3323]'}`}>View all</button></div>
              <div className="flex flex-wrap gap-1.5 mt-2">{profileSkills.slice(0, 8).map(skill => <span key={skill} className={`rounded-full px-2 py-1 text-[7.5px] font-bold truncate max-w-full ${darkMode ? 'bg-[#105666]/30 text-[#F7F4D5] border border-[#9EC6CC]/15' : 'bg-[#105666]/10 text-[#105666]'}`}>{skill}</span>)}</div>
              {!profileSkills.length && <div className="text-[8px] opacity-50 mt-1">Profile skills will appear here automatically.</div>}
            </div>
          </aside>

          {/* CENTER EDITOR */}
          <section className={`min-w-0 min-h-0 overflow-y-auto velora-scroll rounded-[24px] border p-4 ${darkMode ? 'bg-[#0D2D22] border-white/10' : 'bg-white/90 border-[#0A3323]/10'}`}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-[#839958] text-white flex items-center justify-center text-[10px] font-bold shrink-0">{sections.indexOf(activeSection) + 1}</span>
                  <div className="min-w-0">
                    <h2 className={`text-lg font-serif font-bold truncate ${darkMode ? 'text-[#F7F4D5]' : 'text-[#0A3323]'}`}>{sectionTitle}</h2>
                    <p className="text-[8.5px] opacity-55 mt-0.5 truncate">{activeSection === 'Personal' ? 'These details appear at the top of your resume.' : `Build a stronger ${specialization} story in this section.`}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="rounded-full bg-[#D3968C]/15 text-[#8a4e47] text-[8px] font-bold px-2 py-1">Section {sections.indexOf(activeSection) + 1} of {sections.length}</span>
                {activeSection === 'Summary' && <button onClick={generateSummary} className="rounded-xl bg-[#105666] text-white px-2.5 py-2 text-[8px] font-bold cursor-pointer shrink-0"><Sparkles className="w-3.5 h-3.5 inline mr-1" />AI Draft</button>}
              </div>
            </div>

            {activeSection === 'Personal' && <SectionCard darkMode={darkMode}>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Full Name *" value={resume.fullName} onChange={v => updateResume('fullName', v)} placeholder={profile.name || 'Your full name'} darkMode={darkMode} icon={<User className="w-3.5 h-3.5" />} />
                <Input label="Email *" value={resume.email} onChange={v => updateResume('email', v)} placeholder={profile.email || 'you@example.com'} darkMode={darkMode} icon={<Mail className="w-3.5 h-3.5" />} />
                <Input label="Phone" value={resume.phone} onChange={v => updateResume('phone', v)} placeholder="+91 XXXXX XXXXX" darkMode={darkMode} icon={<Phone className="w-3.5 h-3.5" />} />
                <Input label="Location" value={resume.location} onChange={v => updateResume('location', v)} placeholder="Chennai, India" darkMode={darkMode} icon={<MapPin className="w-3.5 h-3.5" />} />
                <Input label="LinkedIn" value={resume.linkedin} onChange={v => updateResume('linkedin', v)} placeholder="linkedin.com/in/yourname" darkMode={darkMode} icon={<span className="font-black text-[7px]">in</span>} />
                <Input label="GitHub" value={resume.github} onChange={v => updateResume('github', v)} placeholder="github.com/yourusername" darkMode={darkMode} icon={<span className="font-black text-[7px]">GH</span>} />
                <Input label="Portfolio" value={resume.portfolio} onChange={v => updateResume('portfolio', v)} placeholder="yourportfolio.com" darkMode={darkMode} icon={<Globe className="w-3.5 h-3.5" />} />
                <Input label="Target Title *" value={resume.title} onChange={v => updateResume('title', v)} placeholder={specialization} darkMode={darkMode} icon={<BriefcaseBusiness className="w-3.5 h-3.5" />} />
              </div>
              <div className={`mt-4 rounded-2xl border p-3.5 ${darkMode ? 'bg-[#163A2E] border-[#839958]/35' : 'bg-[#F7F4D5] border-[#839958]/35'}`}>
                <div className="flex gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-[#D3968C]/22' : 'bg-[#D3968C]/25'}`}><Lightbulb className="w-4 h-4 text-[#D3968C]" /></div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-[9px] font-bold ${darkMode ? 'text-[#F7F4D5]' : 'text-[#0A3323]'}`}>AI Suggestion</div>
                    <div className={`text-[8.5px] mt-1 leading-[1.55] font-medium ${darkMode ? 'text-[#F7F4D5]/90' : 'text-[#0A3323]/90'}`}>Use clean, clickable links for LinkedIn, GitHub and your portfolio. Keep the target title aligned with the role you want.</div>
                    <button onClick={() => setShowWhy(true)} className={`mt-2 text-[8.5px] font-bold cursor-pointer ${darkMode ? 'text-[#B9C98D] hover:text-[#F7F4D5]' : 'text-[#105666] hover:text-[#0A3323]'}`}>Show me why →</button>
                  </div>
                </div>
              </div>
            </SectionCard>}

            {activeSection === 'Summary' && <SectionCard darkMode={darkMode}><TextArea label="Professional Summary" value={resume.summary} onChange={v => updateResume('summary', v)} placeholder="Write a concise 3–4 line summary focused on role, strengths and impact..." rows={10} darkMode={darkMode} /><div className={`mt-3 rounded-xl p-3 border text-[8px] ${darkMode ? 'bg-[#105666]/20 border-[#9EC6CC]/15 text-[#F7F4D5]/80' : 'bg-[#105666]/8 border-[#105666]/12 text-[#0A3323]/70'}`}><span className={`font-bold ${darkMode ? 'text-[#B9C98D]' : 'text-[#105666]'}`}>Role focus:</span> {roleData.focus.join(' · ')}</div></SectionCard>}

            {activeSection === 'Education' && <CollectionSection darkMode={darkMode} title="Education" helper="Add degrees, institutions, dates and scores." button="Add Education" onAdd={() => setResume(prev => ({ ...prev, education: [...prev.education, newEducation()] }))} empty="No education added yet.">{resume.education.map(item => <Card key={item.id} darkMode={darkMode}><div className="flex gap-3 min-w-0"><div className="grid grid-cols-2 gap-3 flex-1 min-w-0"><Input label="Degree / Program" value={item.degree} onChange={v => setResume(p => ({ ...p, education: p.education.map(x => x.id === item.id ? { ...x, degree: v } : x) }))} placeholder="B.E. Computer Science" darkMode={darkMode} icon={<GraduationCap className="w-3.5 h-3.5" />} /><Input label="Institution" value={item.institution} onChange={v => setResume(p => ({ ...p, education: p.education.map(x => x.id === item.id ? { ...x, institution: v } : x) }))} placeholder="College / University" darkMode={darkMode} /><Input label="Year" value={item.year} onChange={v => setResume(p => ({ ...p, education: p.education.map(x => x.id === item.id ? { ...x, year: v } : x) }))} placeholder="2023 – 2027" darkMode={darkMode} /><Input label="CGPA / Score" value={item.score} onChange={v => setResume(p => ({ ...p, education: p.education.map(x => x.id === item.id ? { ...x, score: v } : x) }))} placeholder="8.60 / 10" darkMode={darkMode} /></div><IconButton onClick={() => setResume(p => ({ ...p, education: p.education.filter(x => x.id !== item.id) }))}><Trash2 className="w-3.5 h-3.5" /></IconButton></div></Card>)}</CollectionSection>}

            {activeSection === 'Experience' && <CollectionSection darkMode={darkMode} title="Experience" helper="Internships, jobs, freelance and relevant practical roles." button="Add Experience" onAdd={() => setResume(prev => ({ ...prev, experience: [...prev.experience, newExperience()] }))} empty="No experience added yet.">{resume.experience.map(item => <Card key={item.id} darkMode={darkMode}><div className="flex gap-3 min-w-0"><div className="flex-1 space-y-3 min-w-0"><div className="grid grid-cols-2 gap-3"><Input label="Role" value={item.role} onChange={v => setResume(p => ({ ...p, experience: p.experience.map(x => x.id === item.id ? { ...x, role: v } : x) }))} placeholder="Frontend Intern" darkMode={darkMode} /><Input label="Company" value={item.company} onChange={v => setResume(p => ({ ...p, experience: p.experience.map(x => x.id === item.id ? { ...x, company: v } : x) }))} placeholder="Company name" darkMode={darkMode} /><Input label="Duration" value={item.duration} onChange={v => setResume(p => ({ ...p, experience: p.experience.map(x => x.id === item.id ? { ...x, duration: v } : x) }))} placeholder="Jun 2026 – Aug 2026" darkMode={darkMode} /></div><div><div className="flex items-center justify-between mb-2"><span className="text-[8px] uppercase tracking-[.12em] font-bold opacity-45">Achievement bullets</span><button onClick={() => setResume(p => ({ ...p, experience: p.experience.map(x => x.id === item.id ? { ...x, points: [...x.points, ''] } : x) }))} className="text-[8px] text-[#105666] font-bold cursor-pointer">+ Add bullet</button></div>{item.points.map((point,index)=><div key={index} className="flex gap-2 mb-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D3968C] mt-2.5 shrink-0"/><input value={point} onChange={e => setResume(p => ({ ...p, experience: p.experience.map(x => x.id === item.id ? { ...x, points: x.points.map((pt,i) => i===index ? e.target.value : pt) } : x) }))} placeholder="Built a responsive dashboard used by..." className={`flex-1 rounded-xl border px-3 py-2 text-[9px] outline-none ${darkMode ? 'bg-[#0D2D22] border-white/10 text-white' : 'bg-white border-[#0A3323]/10'}`} /></div>)}</div></div><IconButton onClick={() => setResume(p => ({ ...p, experience: p.experience.filter(x => x.id !== item.id) }))}><Trash2 className="w-3.5 h-3.5" /></IconButton></div></Card>)}</CollectionSection>}

            {activeSection === 'Projects' && <CollectionSection darkMode={darkMode} title="Projects" helper={`Highlight projects relevant to ${roleData.roles[0] || specialization}.`} button="Add Project" onAdd={() => setResume(prev => ({ ...prev, projects: [...prev.projects, newProject()] }))} empty="No projects added yet.">{resume.projects.map(item => <Card key={item.id} darkMode={darkMode}><div className="flex gap-3 min-w-0"><div className="grid grid-cols-2 gap-3 flex-1 min-w-0"><Input label="Project name" value={item.name} onChange={v => setResume(p => ({ ...p, projects: p.projects.map(x => x.id===item.id ? { ...x, name:v } : x) }))} placeholder="Project title" darkMode={darkMode} /><Input label="Technologies" value={item.tech} onChange={v => setResume(p => ({ ...p, projects: p.projects.map(x => x.id===item.id ? { ...x, tech:v } : x) }))} placeholder="React, TypeScript, Next.js" darkMode={darkMode} /><div className="col-span-2"><TextArea label="Description" value={item.description} onChange={v => setResume(p => ({ ...p, projects: p.projects.map(x => x.id===item.id ? { ...x, description:v } : x) }))} placeholder="What did you build?" rows={4} darkMode={darkMode} /></div><div className="col-span-2"><TextArea label="Impact / result" value={item.impact} onChange={v => setResume(p => ({ ...p, projects: p.projects.map(x => x.id===item.id ? { ...x, impact:v } : x) }))} placeholder="Improved loading time by 30%..." rows={3} darkMode={darkMode} /></div></div><IconButton onClick={() => setResume(p => ({ ...p, projects:p.projects.filter(x => x.id!==item.id) }))}><Trash2 className="w-3.5 h-3.5" /></IconButton></div></Card>)}</CollectionSection>}

            {activeSection === 'Skills' && <SectionCard darkMode={darkMode}><div className="flex items-center justify-between mb-3"><div><h3 className="text-sm font-bold">Skills</h3><p className="text-[8px] opacity-55 mt-1">Profile skills are imported automatically. Add role-specific skills without duplicating existing ones.</p></div><PrimaryButton label="Add Skill" onClick={() => setResume(p => ({ ...p, skills: [...p.skills, ''] }))} icon={<Plus className="w-3.5 h-3.5" />} darkMode={darkMode} /></div><div className="grid grid-cols-2 gap-2">{resume.skills.map((skill,index)=><div key={index} className="flex gap-2 min-w-0"><input value={skill} onChange={e => setResume(p => ({ ...p, skills:p.skills.map((x,i)=>i===index?e.target.value:x) }))} className={`flex-1 rounded-xl border px-3 py-2.5 text-[9px] outline-none ${darkMode ? 'bg-[#0D2D22] border-white/10' : 'bg-white border-[#0A3323]/10'}`} placeholder="e.g. React" /><IconButton onClick={() => setResume(p => ({ ...p, skills:p.skills.filter((_,i)=>i!==index) }))}><X className="w-3.5 h-3.5" /></IconButton></div>)}</div>{recommendationSkills.length > 0 && <div className={`mt-4 rounded-2xl p-3 border ${darkMode ? 'border-[#839958]/30 bg-[#163A2E]' : 'border-[#839958]/20 bg-[#839958]/8'}`}><div className="text-[9px] font-bold flex items-center gap-1.5"><WandSparkles className="w-3.5 h-3.5 text-[#D3968C]" />Velora suggests next</div><div className="flex flex-wrap gap-1.5 mt-2">{recommendationSkills.map(skill => <button key={skill} onClick={() => addRecommendedSkill(skill)} className={`px-2 py-1.5 rounded-full border text-[7.5px] font-bold cursor-pointer ${darkMode ? 'bg-[#163A2E] border-[#B9C98D]/25 text-[#F7F4D5] hover:bg-[#105666]' : 'bg-white border-[#839958]/20 text-[#0A3323] hover:bg-[#F7F4D5]'}`}>+ {skill}</button>)}</div></div>}</SectionCard>}

            {activeSection === 'Certifications' && <CollectionSection darkMode={darkMode} title="Certifications" helper="Keep credentials that reinforce your target role." button="Add Certification" onAdd={() => setResume(p => ({ ...p, certifications:[...p.certifications,''] }))} empty="No certifications added yet.">{resume.certifications.map((item,index)=><div key={index} className="flex gap-2 min-w-0"><input value={item} onChange={e => setResume(p => ({ ...p, certifications:p.certifications.map((x,i)=>i===index?e.target.value:x) }))} placeholder="Certification — Issuer — Year" className={`flex-1 rounded-xl border px-3 py-2.5 text-[9px] outline-none ${darkMode ? 'bg-[#0D2D22] border-white/10' : 'bg-white border-[#0A3323]/10'}`} /><IconButton onClick={() => setResume(p => ({ ...p, certifications:p.certifications.filter((_,i)=>i!==index) }))}><X className="w-3.5 h-3.5" /></IconButton></div>)}</CollectionSection>}

            {activeSection === 'Additional' && <CollectionSection darkMode={darkMode} title="Achievements & Additional" helper="Add achievements, awards, leadership, links, or other relevant proof." button="Add Achievement" onAdd={() => setResume(p => ({ ...p, achievements:[...p.achievements,''] }))} empty="No additional achievements yet.">{resume.achievements.map((item,index)=><div key={index} className="flex gap-2 min-w-0"><input value={item} onChange={e => setResume(p => ({ ...p, achievements:p.achievements.map((x,i)=>i===index?e.target.value:x) }))} placeholder="Award, leadership, achievement..." className={`flex-1 rounded-xl border px-3 py-2.5 text-[9px] outline-none ${darkMode ? 'bg-[#0D2D22] border-white/10' : 'bg-white border-[#0A3323]/10'}`} /><IconButton onClick={() => setResume(p => ({ ...p, achievements:p.achievements.filter((_,i)=>i!==index) }))}><X className="w-3.5 h-3.5" /></IconButton></div>)}</CollectionSection>}

            <div className="mt-5 flex items-center justify-between border-t border-current/10 pt-3"><button onClick={() => setActiveSection(sections[Math.max(0, sections.indexOf(activeSection)-1)])} className={`text-[9px] font-bold flex items-center gap-1 cursor-pointer ${darkMode ? 'text-[#F7F4D5]/75 hover:text-[#F7F4D5]' : 'text-[#0A3323]/65 hover:text-[#0A3323]'}`}><ChevronLeft className="w-3.5 h-3.5" />Previous</button><button onClick={() => setActiveSection(sections[Math.min(sections.length-1, sections.indexOf(activeSection)+1)])} className={`rounded-full px-4 py-2 text-[9px] font-bold cursor-pointer flex items-center gap-1 ${darkMode ? 'bg-[#839958] text-[#071F15] hover:bg-[#95AA68]' : 'bg-[#105666] text-white hover:bg-[#0d4a59]'}`}>Next Section<ArrowRight className="w-3.5 h-3.5" /></button></div>
          </section>

          {/* RIGHT INTELLIGENCE COLUMN: Strict width and min-w-0 safety to stop cut-offs */}
          <aside className="min-w-0 min-h-0 overflow-y-auto velora-scroll space-y-3 pr-1 pb-1">
            <section className={`w-full rounded-[22px] border p-3.5 overflow-hidden min-w-0 ${darkMode ? 'bg-[#0D2D22] border-white/10' : 'bg-[#FFFDF8] border-[#0A3323]/10'}`}>
              <div className="flex items-center justify-between gap-3 min-w-0">
                <div className={`text-[10.5px] font-bold flex items-center gap-1.5 min-w-0 ${darkMode ? 'text-[#F7F4D5]' : 'text-[#0A3323]'}`}>
                  <WandSparkles className="w-4 h-4 text-[#D3968C] shrink-0" />
                  <span className="truncate">AI Impact Rewrite</span>
                </div>
                <span className={`text-[7.5px] rounded-full px-2 py-1 font-bold shrink-0 ${darkMode ? 'bg-[#D3968C]/20 text-[#F7F4D5]' : 'bg-[#D3968C]/20 text-[#8a4e47]'}`}>AI</span>
              </div>
              <div className={`rounded-2xl border mt-3 p-3.5 min-w-0 ${darkMode ? 'bg-[#163A2E] border-white/10' : 'bg-[#F7F4D5] border-[#839958]/25'}`}>
                <div className={`text-[8.5px] leading-[1.55] font-medium ${darkMode ? 'text-[#F7F4D5]/90' : 'text-[#0A3323]/90'}`}>Turn a weak bullet, project description, or summary into clearer, impact-focused writing.</div>
                {rewrite ? (
                  <div className="mt-3 space-y-2 min-w-0">
                    <div className={`text-[7.5px] font-bold uppercase tracking-[.08em] ${darkMode ? 'text-[#F7F4D5]/70' : 'text-[#0A3323]/55'}`}>Current</div>
                    <div className={`text-[8.5px] p-2.5 rounded-xl border break-words leading-relaxed min-w-0 ${darkMode ? 'bg-[#0D2D22] border-white/10 text-[#F7F4D5]' : 'bg-white border-[#0A3323]/10 text-[#0A3323]'}`}>{rewrite.source}</div>
                    <div className={`text-[7.5px] font-bold uppercase tracking-[.08em] ${darkMode ? 'text-[#B9C98D]' : 'text-[#105666]'}`}>Velora upgrade</div>
                    <div className={`text-[8.5px] p-2.5 rounded-xl border leading-relaxed break-words min-w-0 ${darkMode ? 'bg-[#F7F4D5] text-[#071F15] border-[#B9C98D]/30' : 'bg-[#F7F4D5] text-[#0A3323] border-[#839958]/25'}`}>{rewrite.improved}</div>
                    <div className="grid grid-cols-[1fr_auto_auto] gap-2 mt-2 min-w-0">
                      <button onClick={applyRewrite} className={`min-w-0 rounded-xl py-2 text-[8px] font-bold cursor-pointer flex items-center justify-center gap-1 px-2 ${darkMode ? 'bg-[#839958] text-[#071F15] hover:bg-[#95AA68]' : 'bg-[#0A3323] text-[#F7F4D5] hover:bg-[#105666]'}`}><Check className="w-3 h-3 shrink-0" /><span className="truncate">Accept</span></button>
                      <button onClick={() => setShowWhy(true)} className={`rounded-xl border px-2 py-2 text-[8px] font-bold cursor-pointer shrink-0 ${darkMode ? 'border-white/15 text-[#F7F4D5] hover:bg-white/5' : 'border-[#0A3323]/12 text-[#0A3323] hover:bg-[#FAF8F2]'}`}><CircleHelp className="w-3 h-3 inline mr-1" />Why?</button>
                      <button onClick={undoRewrite} className={`rounded-xl border px-2 py-2 text-[8px] font-bold cursor-pointer shrink-0 ${darkMode ? 'border-white/15 text-[#F7F4D5] hover:bg-white/5' : 'border-[#0A3323]/12 text-[#0A3323] hover:bg-[#FAF8F2]'}`}><RotateCcw className="w-3 h-3 inline mr-1" />Undo</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={runRewrite} className="mt-3 rounded-xl bg-[#D3968C] hover:bg-[#c9877d] text-[#0A3323] px-3 py-2 text-[8px] font-bold cursor-pointer transition flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 shrink-0" /><span>Generate upgrade</span></button>
                )}
              </div>
            </section>

            <section className={`w-full rounded-[22px] border p-3.5 overflow-hidden min-w-0 ${darkMode ? 'bg-[#0D2D22] border-white/10' : 'bg-[#F6F2E8] border-[#839958]/25'}`}>
              <div className="flex items-start justify-between gap-3 min-w-0">
                <div className="min-w-0 flex-1">
                  <div className={`text-[10.5px] font-bold flex items-center gap-1.5 min-w-0 ${darkMode ? 'text-[#F7F4D5]' : 'text-[#0A3323]'}`}><FileText className={`w-4 h-4 shrink-0 ${darkMode ? 'text-[#9EC6CC]' : 'text-[#105666]'}`} /><span className="truncate">Resume Versions</span></div>
                  <p className={`text-[8px] mt-1.5 leading-relaxed font-medium truncate ${darkMode ? 'text-[#F7F4D5]/80' : 'text-[#0A3323]/80'}`}>Keep different copies for different target roles.</p>
                </div>
                <button onClick={() => setShowNewVersion(true)} aria-label="Create resume version" className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer shrink-0 ${darkMode ? 'bg-[#105666] text-[#F7F4D5] hover:bg-[#176d80]' : 'bg-[#105666] text-white hover:bg-[#0d4a59]'}`}><Plus className="w-4 h-4" /></button>
              </div>

              <div className="mt-3 space-y-2 min-w-0">
                {versions.length ? versions.slice(0, 4).map((version, index) => (
                  <button key={version.id} onClick={() => switchVersion(version.id)} className={`w-full min-w-0 rounded-2xl p-2.5 flex items-center gap-2.5 text-left border cursor-pointer transition ${version.id === activeVersionId ? (darkMode ? 'border-[#B9C98D]/45 bg-[#839958] text-[#071F15] shadow-sm' : 'border-[#839958]/45 bg-[#E8EED7] text-[#0A3323] shadow-sm') : darkMode ? 'border-white/10 bg-[#163A2E] text-[#F7F4D5] hover:border-[#B9C98D]/35 hover:bg-[#1B4537]' : 'border-[#0A3323]/10 bg-white/85 text-[#0A3323] hover:bg-[#FFFDF8] hover:border-[#839958]/30'}`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${index === 0 ? (darkMode ? 'bg-[#105666] text-[#F7F4D5]' : 'bg-[#0A3323] text-[#F7F4D5]') : index === 1 ? (darkMode ? 'bg-[#D3968C]/25 text-[#F7F4D5]' : 'bg-[#D3968C]/20 text-[#8a4e47]') : (darkMode ? 'bg-[#839958]/20 text-[#B9C98D]' : 'bg-[#105666]/12 text-[#105666]')}`}><FileText className="w-3.5 h-3.5" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[8.8px] font-bold truncate leading-tight">{version.name}</div>
                      <div className={`text-[7.8px] mt-0.5 truncate leading-relaxed font-medium ${darkMode ? 'text-[#F7F4D5]/75' : 'text-[#0A3323]/65'}`}>{version.target} · {version.updatedAt}</div>
                    </div>
                    {version.id === activeVersionId && <span className={`text-[7px] rounded-full px-2 py-0.5 font-bold shrink-0 ${darkMode ? 'bg-[#071F15]/15 text-[#071F15]' : 'bg-[#839958]/20 text-[#607b31]'}`}>Current</span>}
                  </button>
                )) : (
                  <div className={`rounded-2xl border border-dashed border-[#839958]/35 p-3 min-w-0 ${darkMode ? 'bg-[#163A2E]' : 'bg-[#FFFDF8]'}`}>
                    <div className="grid grid-cols-2 gap-2 min-w-0">
                      <div className={`min-w-0 rounded-xl p-2 ${darkMode ? 'bg-[#105666] text-[#F7F4D5]' : 'bg-[#0A3323] text-[#F7F4D5]'}`}><div className="text-[8.5px] font-bold truncate">Frontend</div><div className="text-[7px] mt-0.5 font-medium text-white/80 truncate">React · Next.js</div></div>
                      <div className={`min-w-0 rounded-xl p-2 ${darkMode ? 'bg-[#D3968C]/20 text-[#F7F4D5]' : 'bg-[#FCEEEB] text-[#7D453F]'}`}><div className="text-[8.5px] font-bold truncate">UI / UX</div><div className={`text-[7px] mt-0.5 font-medium truncate ${darkMode ? 'text-[#F7F4D5]/85' : 'text-[#6D4945]'}`}>Figma</div></div>
                    </div>
                    <button onClick={() => setShowNewVersion(true)} className={`w-full mt-2.5 rounded-xl border py-2 text-[8px] font-bold cursor-pointer truncate ${darkMode ? 'border-[#9EC6CC]/25 bg-[#0D2D22] text-[#B9C98D] hover:bg-[#105666]/20' : 'border-[#105666]/22 bg-white text-[#105666] hover:bg-[#F7F4D5]'}`}>+ Create version</button>
                  </div>
                )}
              </div>

              {versions.length > 0 && <button onClick={() => setShowVersions(true)} className={`w-full mt-2.5 rounded-xl border py-2 text-[8.5px] font-bold cursor-pointer truncate ${darkMode ? 'border-[#9EC6CC]/25 bg-[#0D2D22] text-[#B9C98D] hover:bg-[#105666]/20' : 'border-[#105666]/20 bg-white text-[#105666] hover:bg-[#F7F4D5]'}`}>Manage all versions</button>}
            </section>

            <section className={`w-full rounded-[22px] border p-3.5 overflow-hidden min-w-0 ${darkMode ? 'bg-[#0D2D22] border-white/10' : 'bg-[#FFFDF8] border-[#0A3323]/10'}`}>
              <div className="flex items-start justify-between gap-3 min-w-0">
                <div className={`text-[10.5px] font-bold flex items-center gap-1.5 min-w-0 ${darkMode ? 'text-[#F7F4D5]' : 'text-[#0A3323]'}`}><Lightbulb className="w-4 h-4 text-[#D3968C] shrink-0" /><span className="truncate">Quick Tips</span></div>
                <button onClick={() => setShowWhy(true)} className={`text-[8px] font-bold cursor-pointer shrink-0 whitespace-nowrap ${darkMode ? 'text-[#B9C98D] hover:text-[#F7F4D5]' : 'text-[#105666] hover:text-[#0A3323]'}`}>Why this tip?</button>
              </div>
              <div className="mt-2.5 grid gap-2 min-w-0">
                <div className={`rounded-xl p-3 border-l-2 border-[#D3968C] min-w-0 ${darkMode ? 'bg-[#163A2E]' : 'bg-[#FFF3EF]'}`}>
                  <div className={`text-[8.8px] font-bold truncate ${darkMode ? 'text-[#F7F4D5]' : 'text-[#0A3323]'}`}>Use action verbs</div>
                  <div className={`text-[7.8px] mt-1 leading-[1.55] font-medium ${darkMode ? 'text-[#F7F4D5]/82' : 'text-[#0A3323]/78'}`}>Start bullets with words such as Built, Designed, Improved, or Led.</div>
                </div>
                <div className={`rounded-xl p-3 border-l-2 border-[#839958] min-w-0 ${darkMode ? 'bg-[#163A2E]' : 'bg-[#F7F4D5]'}`}>
                  <div className={`text-[8.8px] font-bold truncate ${darkMode ? 'text-[#F7F4D5]' : 'text-[#0A3323]'}`}>Show measurable impact</div>
                  <div className={`text-[7.8px] mt-1 leading-[1.55] font-medium ${darkMode ? 'text-[#F7F4D5]/82' : 'text-[#0A3323]/78'}`}>Add numbers, time saved, users reached, or performance improved when available.</div>
                </div>
              </div>
            </section>

            <section className={`w-full rounded-[22px] p-3.5 border overflow-hidden min-w-0 ${darkMode ? 'bg-gradient-to-br from-[#0A3323] via-[#105666] to-[#0A3323] text-[#F7F4D5] border-[#839958]/45' : 'bg-gradient-to-br from-[#E7F0EC] via-[#DDECEF] to-[#F7F4D5] text-[#0A3323] border-[#105666]/20'}`}>
              <div className="flex items-start gap-2.5 min-w-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-[#D3968C]/20' : 'bg-[#D3968C]/25'}`}><Sparkles className="w-4 h-4 text-[#D3968C]" /></div>
                <div className="min-w-0 flex-1">
                  <div className={`text-[10.5px] font-bold truncate ${darkMode ? 'text-[#F7F4D5]' : 'text-[#0A3323]'}`}>Profile Skills</div>
                  <div className={`text-[8.2px] mt-1 leading-[1.55] font-medium ${darkMode ? 'text-[#F7F4D5]/90' : 'text-[#0A3323]/85'}`}>Skills from your Velora profile that are not yet represented.</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {profileSkills.length ? profileSkills.slice(0, 6).map(skill => (
                  <span key={skill} className={`text-[7.8px] font-bold rounded-full px-2.5 py-1.5 truncate max-w-full ${hasSkill(resume.skills, skill) ? (darkMode ? 'bg-[#839958]/35 text-[#F7F4D5] border border-[#B9C98D]/25' : 'bg-[#839958]/20 text-[#0A3323] border border-[#839958]/30') : (darkMode ? 'bg-white/10 text-[#F7F4D5] border border-white/15' : 'bg-white/75 text-[#105666] border border-[#105666]/18')}`}>
                    {hasSkill(resume.skills, skill) ? '✓ ' : '+ '}{skill}
                  </span>
                )) : <span className={`text-[8.2px] font-medium ${darkMode ? 'text-[#F7F4D5]/75' : 'text-[#0A3323]/65'}`}>No profile skills saved yet.</span>}
              </div>
            </section>
          </aside>
        </div>
      </main>

      {/* IMPORT MODAL */}
      {showImport && <Overlay darkMode={darkMode} onClose={() => setShowImport(false)}><div className={`w-full max-w-lg rounded-[24px] p-5 border ${darkMode ? 'bg-[#0D2D22] border-white/10 text-[#F7F4D5]' : 'bg-white border-[#0A3323]/10 text-[#0A3323]'}`}><div className="flex items-center justify-between"><div><div className="text-[12px] font-bold flex items-center gap-2"><FileUp className="w-5 h-5 text-[#105666]" />Import Existing Resume</div><div className={`text-[8px] mt-1 ${darkMode ? 'text-[#F7F4D5]/65' : 'text-[#0A3323]/55'}`}>Bring your existing resume into the same builder and upgrade it.</div></div><button onClick={() => setShowImport(false)} className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${darkMode ? 'bg-[#163A2E] text-[#F7F4D5] hover:bg-[#105666]' : 'bg-[#FAF8F2] text-[#0A3323] hover:bg-[#F7F4D5]'}`}><X className="w-4 h-4" /></button></div><label className={`mt-5 rounded-2xl border-2 border-dashed border-[#839958]/35 p-6 block text-center cursor-pointer ${darkMode ? 'bg-[#163A2E] text-[#F7F4D5] hover:bg-[#1B4537]' : 'bg-[#F7F4D5]/50 text-[#0A3323] hover:bg-[#F7F4D5]/75'}`}><Upload className="w-8 h-8 mx-auto text-[#105666]" /><div className="text-[10px] font-bold mt-2">Upload PDF, DOCX, TXT, MD or JSON</div><div className={`text-[8px] mt-1 ${darkMode ? 'text-[#F7F4D5]/60' : 'text-[#0A3323]/50'}`}>Your original content stays editable. Velora does not overwrite it automatically.</div><input type="file" accept=".pdf,.docx,.txt,.md,.json" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) void handleImport(file); }} /></label>{importFileName && <div className={`mt-3 rounded-xl border p-3 ${darkMode ? 'border-white/10 bg-[#163A2E]' : 'border-[#0A3323]/10 bg-white'}`}><div className="text-[8px] font-bold">{importFileName}</div><div className="text-[7.5px] mt-1 text-[#839958]">{importStatus === 'analyzing' ? 'Analyzing...' : 'Ready'}</div></div>}{importReport.length > 0 && <div className="mt-3 space-y-1.5">{importReport.map(item => <div key={item} className="flex items-center gap-2 text-[8px]"><CheckCircle2 className="w-3.5 h-3.5 text-[#839958]" />{item}</div>)}</div>}{importSourceText && <div className={`mt-3 rounded-xl p-3 max-h-28 overflow-auto text-[7.5px] whitespace-pre-wrap ${darkMode ? 'bg-[#163A2E] text-[#F7F4D5]/80' : 'bg-[#FAF8F2] text-[#0A3323]/75'}`}>{importSourceText.slice(0, 1600)}</div>}<button onClick={() => { setShowImport(false); setImportStatus('idle'); }} className={`mt-4 w-full rounded-xl py-2.5 text-[9px] font-bold cursor-pointer ${darkMode ? 'bg-[#839958] text-[#071F15] hover:bg-[#95AA68]' : 'bg-[#0A3323] text-white hover:bg-[#105666]'}`}>Continue with Imported Resume</button></div></Overlay>}

      {/* EXPORT MODAL */}
      {showExport && <Overlay darkMode={darkMode} onClose={() => setShowExport(false)}><div className={`w-full max-w-md rounded-[24px] p-4 border ${darkMode ? 'bg-[#0D2D22] border-white/10 text-white' : 'bg-white border-[#0A3323]/10 text-[#0A3323]'}`}><div className="flex items-center justify-between"><div><div className="text-[12px] font-bold">Export your preference</div><div className="text-[8px] opacity-50 mt-1">Current version: {versions.find(v => v.id === activeVersionId)?.name || 'Current Resume'}</div></div><button onClick={() => setShowExport(false)} className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer"><X className="w-4 h-4" /></button></div><div className="space-y-1.5 mt-4">{[['PDF','Print-ready / recommended',FileText],['DOCX','Editable Word document',FileText],['TXT','Plain text / ATS-friendly',FileText],['HTML','Web-ready resume',Globe],['Markdown','Developer-friendly',Code2],['JSON','Structured backup',FileJson]].map(([label,meta,Icon]) => { const I=Icon as React.ComponentType<{className?:string}>; return <button key={label as string} onClick={() => exportResume(label as string)} className={`w-full rounded-2xl border p-3 flex items-center gap-3 text-left cursor-pointer ${darkMode ? 'border-white/10 hover:bg-[#163A2E]' : 'border-[#0A3323]/8 hover:bg-[#F7F4D5]'}`}><div className={`w-9 h-9 rounded-xl flex items-center justify-center ${label==='PDF'?'bg-[#0A3323] text-[#F7F4D5]':label==='DOCX'?'bg-[#105666]/12 text-[#105666]':label==='JSON'?'bg-[#D3968C]/18 text-[#D3968C]':'bg-[#839958]/12 text-[#839958]'}`}><I className="w-4 h-4" /></div><div><div className="text-[9px] font-bold">{label as string}</div><div className="text-[7.5px] opacity-50 mt-0.5">{meta as string}</div></div></button>; })}</div></div></Overlay>}

      {/* VERSION MODALS */}
      {showNewVersion && <Overlay darkMode={darkMode} onClose={() => setShowNewVersion(false)}><div className={`w-full max-w-md rounded-[24px] p-5 border ${darkMode ? 'bg-[#0D2D22] border-white/10 text-white' : 'bg-white border-[#0A3323]/10 text-[#0A3323]'}`}><div className="text-[12px] font-bold">Create Resume Version</div><div className="text-[8px] opacity-55 mt-1">Keep a separate target-role version without losing your current resume.</div><div className="space-y-3 mt-4"><Input label="Version name" value={newVersionName} onChange={setNewVersionName} placeholder="Frontend Developer Resume" darkMode={darkMode} /><Input label="Target role" value={newVersionTarget} onChange={setNewVersionTarget} placeholder={specialization} darkMode={darkMode} /></div><div className="flex gap-2 mt-4"><button onClick={() => setShowNewVersion(false)} className={`flex-1 rounded-xl border py-2 text-[9px] font-bold cursor-pointer ${darkMode ? 'border-white/15 text-[#F7F4D5] hover:bg-white/5' : 'border-[#0A3323]/12 text-[#0A3323] hover:bg-[#FAF8F2]'}`}>Cancel</button><button onClick={createVersion} className={`flex-1 rounded-xl py-2 text-[9px] font-bold cursor-pointer ${darkMode ? 'bg-[#839958] text-[#071F15] hover:bg-[#95AA68]' : 'bg-[#0A3323] text-white hover:bg-[#105666]'}`}>Create Version</button></div></div></Overlay>}

      {showVersions && <Overlay darkMode={darkMode} onClose={() => setShowVersions(false)}><div className={`w-full max-w-lg rounded-[24px] p-5 border ${darkMode ? 'bg-[#0D2D22] border-white/10 text-white' : 'bg-white border-[#0A3323]/10 text-[#0A3323]'}`}><div className="flex items-center justify-between"><div><div className="text-[12px] font-bold">Resume Versions</div><div className="text-[8px] opacity-50 mt-1">Switch, review or create targeted versions.</div></div><button onClick={() => setShowVersions(false)} className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer ${darkMode ? 'border-white/15 text-[#F7F4D5] hover:bg-white/5' : 'border-[#0A3323]/10 text-[#0A3323] hover:bg-[#FAF8F2]'}`}><X className="w-4 h-4" /></button></div><div className="mt-4 space-y-2">{versions.map(version => <button key={version.id} onClick={() => switchVersion(version.id)} className={`w-full rounded-2xl border p-3 flex items-center gap-3 text-left cursor-pointer ${version.id===activeVersionId?'border-[#839958]/35 bg-[#839958]/8':darkMode?'border-white/10':'border-[#0A3323]/8'}`}><div className="w-9 h-9 rounded-xl bg-[#105666]/10 text-[#105666] flex items-center justify-center"><FileText className="w-4 h-4" /></div><div className="flex-1"><div className="text-[9px] font-bold">{version.name}</div><div className="text-[8px] opacity-50 mt-0.5">{version.target} · Updated {version.updatedAt}</div></div>{version.id===activeVersionId && <span className="text-[7px] rounded-full bg-[#839958]/15 text-[#839958] px-2 py-1 font-bold">Active</span>}</button>)}</div><button onClick={() => { setShowVersions(false); setShowNewVersion(true); }} className={`w-full mt-4 rounded-xl py-2.5 text-[9px] font-bold cursor-pointer ${darkMode ? 'bg-[#839958] text-[#071F15] hover:bg-[#95AA68]' : 'bg-[#0A3323] text-white hover:bg-[#105666]'}`}><Plus className="w-3.5 h-3.5 inline mr-1" />New Version</button></div></Overlay>}

      {/* WHY MODAL */}
      {showWhy && <Overlay darkMode={darkMode} onClose={() => setShowWhy(false)}><div className={`w-full max-w-md rounded-[24px] p-5 border ${darkMode ? 'bg-[#0D2D22] border-white/10 text-white' : 'bg-white border-[#0A3323]/10 text-[#0A3323]'}`}><div className="text-[12px] font-bold flex items-center gap-2"><Info className={`w-5 h-5 ${darkMode ? 'text-[#9EC6CC]' : 'text-[#105666]'}`} />Why Velora recommends this</div><div className="text-[9px] opacity-65 mt-2 leading-relaxed">Velora uses your target role, profile skills, resume completeness and the content already present in your resume to suggest changes. The goal is to make the resume clearer, more role-relevant and more evidence-based without silently replacing your original content.</div><div className={`mt-4 rounded-2xl p-3 text-[8px] leading-relaxed ${darkMode ? 'bg-[#163A2E] text-[#F7F4D5]' : 'bg-[#F7F4D5] text-[#0A3323]'}`}><strong>Current focus:</strong> {specialization}. Suggestions are designed around your current resume context.</div><button onClick={() => setShowWhy(false)} className={`mt-4 w-full rounded-xl py-2.5 text-[9px] font-bold cursor-pointer ${darkMode ? 'bg-[#839958] text-[#071F15] hover:bg-[#95AA68]' : 'bg-[#0A3323] text-white hover:bg-[#105666]'}`}>Got it</button></div></Overlay>}

      {/* PREVIEW */}
      {showPreview && <Overlay darkMode={darkMode} onClose={() => setShowPreview(false)}><div className="w-full max-w-6xl h-[94vh] rounded-[24px] bg-[#EDE9E2] p-4 flex flex-col overflow-hidden"><div className="flex items-center justify-between pb-3 print:hidden"><div><div className="text-[11px] font-bold text-[#0A3323]">Resume Preview</div><div className="text-[8px] text-[#0A3323]/55">Preview your current version before exporting.</div></div><div className="flex gap-2"><button onClick={() => setShowExport(true)} className="rounded-xl bg-[#0A3323] text-[#F7F4D5] px-3 py-2 text-[8px] font-bold cursor-pointer"><Download className="w-3.5 h-3.5 inline mr-1" />Export</button><button onClick={() => setShowPreview(false)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer"><X className="w-4 h-4" /></button></div></div><div className="flex-1 overflow-auto velora-scroll flex justify-center"><div className="print-resume w-[820px] min-h-[1120px] bg-white shadow-2xl text-[#181818] p-12 my-2"><div className="border-b-2 border-[#0A3323] pb-5"><h1 className="text-4xl font-serif font-bold text-[#0A3323]">{resume.fullName || 'Your Name'}</h1><div className="text-sm font-bold text-[#105666] mt-1">{resume.title || specialization}</div><div className="text-[10px] text-[#555] mt-3 flex flex-wrap gap-x-4 gap-y-1">{[resume.email,resume.phone,resume.location,resume.linkedin,resume.github,resume.portfolio].filter(Boolean).map((x,i)=><span key={`${x}-${i}`}>{x}</span>)}</div></div>{resume.summary && <PreviewSection title="Professional Summary"><p className="text-[11px] leading-relaxed">{resume.summary}</p></PreviewSection>}{resume.skills.filter(Boolean).length > 0 && <PreviewSection title="Skills"><p className="text-[11px] leading-relaxed">{resume.skills.filter(Boolean).join(' • ')}</p></PreviewSection>}{resume.experience.length > 0 && <PreviewSection title="Experience"><div className="space-y-4">{resume.experience.map(item=><div key={item.id}><div className="flex justify-between"><div><p className="text-[12px] font-bold">{item.role||'Role'}</p><p className="text-[10px] text-[#555]">{item.company}</p></div><p className="text-[10px] text-[#555]">{item.duration}</p></div><ul className="list-disc pl-4 mt-1">{item.points.filter(Boolean).map((point,i)=><li key={i} className="text-[10px]">{point}</li>)}</ul></div>)}</div></PreviewSection>}{resume.projects.length > 0 && <PreviewSection title="Projects"><div className="space-y-4">{resume.projects.map(item=><div key={item.id}><div className="flex justify-between"><p className="text-[12px] font-bold">{item.name||'Project'}</p><p className="text-[9px] text-[#555]">{item.tech}</p></div><p className="text-[10px] mt-1">{item.description}</p>{item.impact && <p className="text-[10px] mt-1"><strong>Impact:</strong> {item.impact}</p>}</div>)}</div></PreviewSection>}{resume.education.length > 0 && <PreviewSection title="Education"><div className="space-y-3">{resume.education.map(item=><div key={item.id} className="flex justify-between"><div><p className="text-[11px] font-bold">{item.degree}</p><p className="text-[10px] text-[#555]">{item.institution}</p></div><div className="text-[10px] text-[#555] text-right"><div>{item.year}</div><div>{item.score}</div></div></div>)}</div></PreviewSection>}{resume.certifications.filter(Boolean).length > 0 && <PreviewSection title="Certifications"><ul className="list-disc pl-4">{resume.certifications.filter(Boolean).map((x,i)=><li className="text-[10px]" key={i}>{x}</li>)}</ul></PreviewSection>}{resume.achievements.filter(Boolean).length > 0 && <PreviewSection title="Achievements & Additional"><ul className="list-disc pl-4">{resume.achievements.filter(Boolean).map((x,i)=><li className="text-[10px]" key={i}>{x}</li>)}</ul></PreviewSection>}</div></div></div></Overlay>}
    </div>
  );
}

function SectionCard({ children, darkMode }: { children: React.ReactNode; darkMode: boolean }) {
  return <div className={`rounded-[20px] border p-4 ${darkMode ? 'bg-[#163A2E] border-white/10' : 'bg-[#FAF8F2] border-[#0A3323]/8'}`}>{children}</div>;
}

function Card({ children, darkMode }: { children: React.ReactNode; darkMode: boolean }) {
  return <div className={`rounded-2xl border p-3.5 ${darkMode ? 'bg-[#163A2E] border-white/10' : 'bg-white border-[#0A3323]/8'}`}>{children}</div>;
}

function Input({ label, value, onChange, placeholder, darkMode, icon }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; darkMode: boolean; icon?: React.ReactNode }) {
  return <label className="space-y-1.5 block min-w-0"><span className="text-[8px] uppercase tracking-[.12em] font-bold opacity-50 flex items-center gap-1 truncate">{icon}{label}</span><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`w-full rounded-xl border px-3 py-2.5 text-[9px] outline-none focus:ring-1 focus:ring-[#105666] ${darkMode ? 'bg-[#0D2D22] border-white/10 text-white placeholder:text-white/30' : 'bg-white border-[#0A3323]/9 text-[#0A3323] placeholder:text-[#0A3323]/30'}`} /></label>;
}

function TextArea({ label, value, onChange, placeholder, rows, darkMode }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; rows: number; darkMode: boolean }) {
  return <label className="space-y-1.5 block min-w-0"><span className="text-[8px] uppercase tracking-[.12em] font-bold opacity-50 truncate">{label}</span><textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} className={`w-full rounded-xl border px-3 py-3 text-[9px] leading-relaxed outline-none resize-none focus:ring-1 focus:ring-[#105666] ${darkMode ? 'bg-[#0D2D22] border-white/10 text-white placeholder:text-white/30' : 'bg-white border-[#0A3323]/9 text-[#0A3323] placeholder:text-[#0A3323]/30'}`} /></label>;
}

function IconButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className="w-8 h-8 rounded-xl border border-[#D3968C]/20 text-[#D3968C] flex items-center justify-center cursor-pointer hover:bg-[#D3968C]/10 shrink-0">{children}</button>;
}

function PrimaryButton({ onClick, label, icon, darkMode = false }: { onClick: () => void; label: string; icon: React.ReactNode; darkMode?: boolean }) {
  return <button onClick={onClick} className={`rounded-xl px-3 py-2 text-[8px] font-bold flex items-center gap-1.5 cursor-pointer shrink-0 ${darkMode ? 'bg-[#839958] text-[#071F15] hover:bg-[#95AA68]' : 'bg-[#0A3323] text-white hover:bg-[#105666]'}`}>{icon}{label}</button>;
}

function CollectionSection({ darkMode, title, helper, button, onAdd, empty, children }: { darkMode: boolean; title: string; helper: string; button: string; onAdd: () => void; empty: string; children: React.ReactNode }) {
  const hasChildren = React.Children.count(children) > 0;
  return <div className="space-y-4"><div className="flex items-center justify-between min-w-0 gap-2"><div className="min-w-0"><h3 className="text-sm font-bold truncate">{title}</h3><p className="text-[8px] opacity-55 mt-1 truncate">{helper}</p></div><PrimaryButton onClick={onAdd} label={button} icon={<Plus className="w-3.5 h-3.5" />} darkMode={darkMode} /></div>{hasChildren ? <div className="space-y-3">{children}</div> : <div className={`rounded-2xl border-2 border-dashed border-[#839958]/25 p-8 text-center ${darkMode ? 'bg-[#163A2E] text-[#F7F4D5]' : 'bg-[#F7F4D5]/45 text-[#0A3323]'}`}><FileText className="w-6 h-6 mx-auto text-[#839958]" /><div className="text-[9px] font-bold mt-2">{empty}</div><div className="text-[7.5px] opacity-65 mt-1">Use the action above to add your first item.</div></div>}</div>;
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void; darkMode?: boolean }) {
  return <div className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm p-4 flex items-center justify-center" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>{children}</div>;
}

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-6"><h2 className="text-[12px] font-bold uppercase tracking-[.12em] text-[#0A3323] border-b border-[#0A3323]/15 pb-1.5 mb-2.5">{title}</h2>{children}</section>;
}