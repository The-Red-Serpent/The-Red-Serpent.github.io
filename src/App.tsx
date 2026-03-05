import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import {
  FaGithub, FaInstagram, FaCode, FaPython, FaShieldAlt,
  FaGlobe, FaSearch, FaWindows, FaMobile, FaLock, FaEye, FaWifi,
} from 'react-icons/fa';
import {
  SiGnubash, SiWireshark, SiTryhackme, SiBurpsuite, SiMetasploit,
  SiOwasp, SiMalwarebytes, SiHackthebox, SiPrimefaces,
} from 'react-icons/si';
import { TbBrandCpp, TbBrandPowershell } from 'react-icons/tb';
import { VscAzure } from 'react-icons/vsc';
import {
  GiHound, GiAngularSpider, GiEvilWings, GiSemiClosedEye, GiSwordsEmblem,
} from 'react-icons/gi';
import { RiComputerLine } from 'react-icons/ri';
import { MdPhishing } from 'react-icons/md';
import { Particles } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import './styles.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Skill { name: string; icon: React.ReactNode; }

// ─── Constants ────────────────────────────────────────────────────────────────
const SECTIONS = ['about', 'skills', 'tools', 'projects', 'certification', 'contact'] as const;
type Section = (typeof SECTIONS)[number];
const HEADER_OFFSET = 64;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: 'easeOut' },
  }),
};

// ─── SkillBar ─────────────────────────────────────────────────────────────────
const SkillBar = ({ name, icon }: Skill) => (
  <div className="mb-3 flex items-center gap-2.5">
    <span className="text-red-500 text-base shrink-0 hover-shake">{icon}</span>
    <span className="text-gray-300 text-sm sm:text-base glow-on-hover">{name}</span>
  </div>
);

// ─── SectionHeading ───────────────────────────────────────────────────────────
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 gradient-text text-center"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
  >
    {children}
  </motion.h2>
);

// ─── App ──────────────────────────────────────────────────────────────────────
const App = () => {
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Static data ─────────────────────────────────────────────────────────
  const programmingSkills: Skill[] = useMemo(() => [
    { name: 'Python',     icon: <FaPython /> },
    { name: 'Bash',       icon: <SiGnubash /> },
    { name: 'C++',        icon: <TbBrandCpp /> },
    { name: 'PowerShell', icon: <TbBrandPowershell /> },
  ], []);

  const pentestingSkills: Skill[] = useMemo(() => [
    { name: 'Active Directory', icon: <FaWindows /> },
    { name: 'Network',          icon: <FaGlobe /> },
    { name: 'Wi-Fi',            icon: <FaWifi /> },
    { name: 'OSINT',            icon: <FaSearch /> },
    { name: 'Web',              icon: <FaGlobe /> },
    { name: 'Mobile',           icon: <FaMobile /> },
    { name: 'Azure',            icon: <VscAzure /> },
  ], []);

  const redTeamSkills: Skill[] = useMemo(() => [
    { name: 'Phishing',             icon: <MdPhishing /> },
    { name: 'Windows Internals',    icon: <FaWindows /> },
    { name: 'Mal Dev',              icon: <SiMalwarebytes /> },
    { name: 'Physical Red Teaming', icon: <SiPrimefaces /> },
  ], []);

  const securityTools = useMemo(() => [
    { name: 'Cobalt Strike', icon: <RiComputerLine /> },
    { name: 'Bloodhound',    icon: <GiHound /> },
    { name: 'Mimikatz',      icon: <FaLock /> },
    { name: 'Netexec',       icon: <GiAngularSpider /> },
    { name: 'Evilgnix',      icon: <GiEvilWings /> },
    { name: 'Burp Suite',    icon: <SiBurpsuite /> },
    { name: 'Nessus',        icon: <FaEye /> },
    { name: 'Metasploit',    icon: <SiMetasploit /> },
    { name: 'OWASP ZAP',     icon: <SiOwasp /> },
    { name: 'Nmap',          icon: <GiSemiClosedEye /> },
    { name: 'Wireshark',     icon: <SiWireshark /> },
  ], []);

  const projects = useMemo(() => [
    {
      title: 'PhantomHop',
      description: 'Python-based Tor IP rotation tool for enhanced anonymity',
      githubUrl: 'https://github.com/The-Red-Serpent/PhantomHop',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      tags: ['Python', 'Tor Network', 'Security'],
    },
    {
      title: 'Envy',
      description: 'PowerShell script to enumerate Windows systems and Active Directory environments',
      githubUrl: 'https://github.com/The-Red-Serpent/Envy',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
      tags: ['Powershell', 'Active Directory', 'Enumeration'],
    },
    {
      title: 'Wrath',
      description: 'Windows Privilege Escalation enumeration script',
      githubUrl: 'https://github.com/The-Red-Serpent/Wrath',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&auto=format&fit=crop',
      tags: ['PowerShell', 'Windows', 'Security'],
    },
    {
      title: 'Keylogger-Using-CPP',
      description: 'Advanced keylogger with encryption capabilities',
      githubUrl: 'https://github.com/The-Red-Serpent/Keylogger-Using-CPP',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
      tags: ['C++', 'Windows API', 'Security'],
    },
  ], []);

  const certifications = useMemo(() => [
    { title: 'Certified Red Team Analyst',              issuer: 'Cyberwarfare Labs', badgeUrl: '/crta.webp' },
    { title: 'Certified Red Team Infra Dev',            issuer: 'Cyberwarfare Labs', badgeUrl: 'https://templates.images.credential.net/17043570231479652261133221341593.png' },
    { title: 'Certified Network Security Practitioner', issuer: 'The SecOps Group',  badgeUrl: '/cnsp.webp' },
    { title: 'Cyber Threat Intelligence 101',           issuer: 'arcx.io',           badgeUrl: '/arc.webp' },
    { title: 'Certified Red Team Operator',             issuer: 'Pursuing',          badgeUrl: '/CRTO.webp' },
    { title: 'Certified Red Team Lead',                 issuer: 'Pursuing',          badgeUrl: '/CRTL.webp' },
  ], []);

  const socialLinks = useMemo(() => [
    { href: 'https://github.com/The-Red-Serpent',         icon: <FaGithub />,    label: 'GitHub' },
    { href: 'https://instagram.com/the_red_serpent',      icon: <FaInstagram />, label: 'Instagram' },
    { href: 'https://tryhackme.com/p/theredserpent',      icon: <SiTryhackme />, label: 'TryHackMe' },
    { href: 'https://app.hackthebox.com/profile/2230478', icon: <SiHackthebox />,label: 'HackTheBox' },
  ], []);

  // ── Particles ────────────────────────────────────────────────────────────
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const isMobile = useMemo(() => window.innerWidth < 768, []);

  const particlesOptions = useMemo(() => ({
    background: { color: { value: 'transparent' } },
    fpsLimit: isMobile ? 20 : 30,
    interactivity: {
      events: { onClick: { enable: false }, onHover: { enable: false }, resize: true },
    },
    particles: {
      color: { value: '#DC2626' },
      links: { color: '#DC2626', distance: 150, enable: true, opacity: 0.4, width: 1.5 },
      collisions: { enable: !isMobile },
      move: {
        direction: 'none' as const,
        enable: true,
        outModes: { default: 'bounce' as const },
        random: false,
        speed: isMobile ? 0.6 : 1,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: isMobile ? 25 : 80,
      },
      opacity: { value: 0.5, animation: { enable: true, speed: 1, minimumValue: 0.3, sync: true } },
      shape: { type: 'circle' },
      size: { value: { min: 1.5, max: 3 } },
    },
    detectRetina: true,
  }), [isMobile]);

  // ── Scroll ───────────────────────────────────────────────────────────────
  const scrollToSection = useCallback((sectionId: Section) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentPos = window.scrollY + HEADER_OFFSET + window.innerHeight / 4;
        for (const section of SECTIONS) {
          const el = document.getElementById(section);
          if (el && currentPos >= el.offsetTop && currentPos < el.offsetTop + el.offsetHeight) {
            setActiveSection((prev) => (prev !== section ? section : prev));
            break;
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="fixed inset-0 pointer-events-none z-0"
        options={particlesOptions}
      />

      <div className="relative z-10">

        {/* ── NAV ──────────────────────────────────────────────────────────── */}
        <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">

              {/* Logo */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <img src="/snake.webp" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                <span className="text-base sm:text-xl font-bold rainbow-text whitespace-nowrap">
                  The Red Serpent
                </span>
              </div>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-5 lg:gap-9">
                {SECTIONS.map((section) => (
                  <motion.button
                    key={section}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`capitalize text-xs lg:text-sm font-medium relative transition-colors duration-200 ${
                      activeSection === section ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                    }`}
                    onClick={() => scrollToSection(section)}
                  >
                    {section}
                    {activeSection === section && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500"
                        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Hamburger */}
              <button
                className="md:hidden text-white p-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <motion.div
            initial={false}
            animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-gray-950/98 backdrop-blur-lg"
          >
            <div className="px-4 py-1 divide-y divide-white/5">
              {SECTIONS.map((section) => (
                <button
                  key={section}
                  className={`w-full text-left py-3 px-1 capitalize text-sm font-medium ${
                    activeSection === section ? 'text-red-500' : 'text-gray-400'
                  }`}
                  onClick={() => scrollToSection(section)}
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        </nav>

        {/* ── MAIN ─────────────────────────────────────────────────────────── */}
        <main className="pt-14 sm:pt-16">

          {/* ABOUT ──────────────────────────────────────────────────────────── */}
          <section
            id="about"
            className="min-h-[calc(100svh-56px)] sm:min-h-[calc(100svh-64px)] flex items-center px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-20 py-10 sm:py-16">

              {/* Text */}
              <motion.div
                className="flex-1 text-center md:text-left max-w-xl lg:max-w-2xl"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
              >
                <motion.h1
                  className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 gradient-text leading-tight"
                  variants={fadeUp} custom={0}
                >
                  Hi, I&apos;m Red Serpent
                </motion.h1>

                <motion.h2
                  className="text-lg sm:text-xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 text-white min-h-[1.8rem] sm:min-h-[2.5rem]"
                  variants={fadeUp} custom={0.15}
                >
                  <Typewriter
                    words={['Security Engineer', 'Pentester', 'Red Team Operator']}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </motion.h2>

                <motion.p
                  className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0"
                  variants={fadeUp} custom={0.30}
                >
                  Red Team Operator focused on adversary simulation and offensive security testing
                  to help organizations identify and improve security gaps.
                </motion.p>

                <motion.div
                  className="flex flex-row gap-3 sm:gap-4 justify-center md:justify-start"
                  variants={fadeUp} custom={0.45}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="text-xs sm:text-sm lg:text-base bg-gradient-to-r from-red-600 to-red-700 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-red-900/40 transition-shadow duration-300 whitespace-nowrap"
                    onClick={() => scrollToSection('projects')}
                  >
                    View Projects
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="text-xs sm:text-sm lg:text-base bg-transparent px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold border-2 border-red-600 hover:bg-red-500/10 transition-colors duration-300 whitespace-nowrap"
                    onClick={() => scrollToSection('contact')}
                  >
                    Contact Me
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Avatar */}
              <motion.div
                className="shrink-0 flex justify-center"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.div
                  className="w-36 h-36 xs:w-44 xs:h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden bg-black ring-2 ring-red-900/40"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <img
                    src="/snake.webp"
                    alt="The Red Serpent Profile"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </motion.div>
              </motion.div>

            </div>
          </section>

          {/* SKILLS ─────────────────────────────────────────────────────────── */}
          <section id="skills" className="py-14 sm:py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>Skills</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
                {([
                  { icon: <FaCode className="text-lg text-red-500 pulse-effect" />,        label: 'Programming Languages', skills: programmingSkills },
                  { icon: <FaShieldAlt className="text-lg text-red-500 pulse-effect" />,   label: 'Offensive Security',    skills: pentestingSkills },
                  { icon: <GiSwordsEmblem className="text-lg text-red-500 pulse-effect" />,label: 'Red Team',              skills: redTeamSkills },
                ] as const).map(({ icon, label, skills }, i) => (
                  <motion.div
                    key={label}
                    className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 sm:p-6 lg:p-8"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                  >
                    <div className="flex items-center gap-2.5 mb-5">
                      {icon}
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold">{label}</h3>
                    </div>
                    {skills.map((skill) => <SkillBar key={skill.name} {...skill} />)}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* TOOLS ──────────────────────────────────────────────────────────── */}
          <section id="tools" className="py-14 sm:py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>Security Arsenal</SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                {securityTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    className="bg-white/[0.03] border border-white/5 rounded-xl p-4 sm:p-5 cursor-default"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}
                    whileHover={{ scale: 1.04, backgroundColor: 'rgba(220,38,38,0.08)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="flex flex-col items-center gap-2 sm:gap-3">
                      <div className="text-red-500 text-2xl sm:text-3xl transition-transform duration-200 hover:rotate-12">
                        {tool.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-300 text-center leading-tight">
                        {tool.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PROJECTS ───────────────────────────────────────────────────────── */}
          <section id="projects" className="py-14 sm:py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>Projects</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.38, delay: i * 0.08, ease: 'easeOut' }}
                    whileHover={{ scale: 1.015 }}
                  >
                    {/* Status badge */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-0.5 rounded-full text-xs font-medium z-10 bg-blue-500/20 text-blue-400">
                      Active
                    </div>

                    {/* Image */}
                    <div className="h-36 sm:h-44 lg:h-48 overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 lg:p-6">
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-red-500 mb-1.5">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm mb-3 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-red-500/10 text-red-400 hover-shake">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-red-500/20 transition-colors duration-300 text-xs sm:text-sm font-medium"
                      >
                        <FaGithub />
                        View Code
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CERTIFICATIONS ─────────────────────────────────────────────────── */}
          <section id="certification" className="py-14 sm:py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>Certifications</SectionHeading>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    className="bg-white/[0.03] border border-white/5 rounded-2xl will-change-transform"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.35, delay: i * 0.07, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="p-4 sm:p-5 lg:p-6 flex flex-col items-center text-center">
                      <motion.div className="mb-3 sm:mb-4 relative group" whileHover={{ scale: 1.06 }}>
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                          src={cert.badgeUrl}
                          alt={`${cert.title} Badge`}
                          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 object-contain relative z-10"
                          loading="lazy"
                        />
                      </motion.div>
                      <h3 className="text-xs sm:text-sm lg:text-base font-bold text-red-500 mb-1 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-gray-500 text-xs">{cert.issuer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT ────────────────────────────────────────────────────────── */}
          <section id="contact" className="py-14 sm:py-20 lg:py-28">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
              <SectionHeading>Get in Touch</SectionHeading>
              <motion.p
                className="text-gray-400 text-sm sm:text-base lg:text-lg mb-10 sm:mb-14"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
              >
                Connect with me on various platforms
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                {socialLinks.map(({ href, icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -5 }}
                    whileTap={{ scale: 0.93 }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <span className="text-3xl sm:text-4xl text-white group-hover:text-red-500 transition-colors duration-300">
                      {icon}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 group-hover:text-red-500 transition-colors duration-300">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </section>

        </main>

        <footer className="text-center text-xs sm:text-sm text-gray-600 py-5 sm:py-6 border-t border-white/5">
          © {new Date().getFullYear()} The Red Serpent. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default App;
