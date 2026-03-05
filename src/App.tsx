import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaInstagram,
  FaCode,
  FaPython,
  FaShieldAlt,
  FaGlobe,
  FaSearch,
  FaWindows,
  FaMobile,
  FaLock,
  FaEye,
  FaWifi,
} from 'react-icons/fa';
import {
  SiGnubash,
  SiWireshark,
  SiTryhackme,
  SiBurpsuite,
  SiMetasploit,
  SiOwasp,
  SiMalwarebytes,
  SiHackthebox,
  SiPrimefaces,
} from 'react-icons/si';
import { TbBrandCpp, TbBrandPowershell } from 'react-icons/tb';
import { VscAzure } from 'react-icons/vsc';
import {
  GiHound,
  GiAngularSpider,
  GiEvilWings,
  GiSemiClosedEye,
  GiSwordsEmblem,
} from 'react-icons/gi';
import { RiComputerLine } from 'react-icons/ri';
import { MdPhishing } from 'react-icons/md';
import { Particles } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import './styles.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  icon: React.ReactNode;
}

// ─── Constants (defined outside component to avoid re-creation on render) ─────
const SECTIONS = ['about', 'skills', 'tools', 'projects', 'certification', 'contact'] as const;
type Section = (typeof SECTIONS)[number];

const HEADER_OFFSET = 80;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const SkillBar = ({ name, icon }: Skill) => (
  <div className="mb-4 flex items-center space-x-2">
    <span className="text-red-500 hover-shake">{icon}</span>
    <span className="text-gray-300 glow-on-hover">{name}</span>
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
const App = () => {
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Static data (memoised so they are never reconstructed) ──────────────
  const programmingSkills: Skill[] = useMemo(() => [
    { name: 'Python',     icon: <FaPython className="text-xl" /> },
    { name: 'Bash',       icon: <SiGnubash className="text-xl" /> },
    { name: 'C++',        icon: <TbBrandCpp className="text-xl" /> },
    { name: 'PowerShell', icon: <TbBrandPowershell className="text-xl" /> },
  ], []);

  const pentestingSkills: Skill[] = useMemo(() => [
    { name: 'Active Directory', icon: <FaWindows className="text-xl" /> },
    { name: 'Network',          icon: <FaGlobe className="text-xl" /> },
    { name: 'Wi-Fi',            icon: <FaWifi className="text-xl" /> },
    { name: 'OSINT',            icon: <FaSearch className="text-xl" /> },
    { name: 'Web',              icon: <FaGlobe className="text-xl" /> },
    { name: 'Mobile',           icon: <FaMobile className="text-xl" /> },
    { name: 'Azure',            icon: <VscAzure className="text-xl" /> },
  ], []);

  const redTeamSkills: Skill[] = useMemo(() => [
    { name: 'Phishing',           icon: <MdPhishing className="text-xl" /> },
    { name: 'Windows Internals',  icon: <FaWindows className="text-xl" /> },
    { name: 'Mal Dev',            icon: <SiMalwarebytes className="text-xl" /> },
    { name: 'Physical Red Teaming', icon: <SiPrimefaces className="text-xl" /> },
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
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      tags: ['Python', 'Tor Network', 'Security'],
    },
    {
      title: 'Envy',
      description: 'PowerShell script designed to enumerate Windows systems and Active Directory environments',
      githubUrl: 'https://github.com/The-Red-Serpent/Envy',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
      tags: ['Powershell', 'Active Directory', 'Enumeration'],
    },
    {
      title: 'Wrath',
      description: 'Windows Privilege Escalation enumeration script',
      githubUrl: 'https://github.com/The-Red-Serpent/Wrath',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&auto=format&fit=crop',
      tags: ['PowerShell', 'Windows', 'Security'],
    },
    {
      title: 'Keylogger-Using-CPP',
      description: 'Advanced keylogger with encryption capabilities',
      githubUrl: 'https://github.com/The-Red-Serpent/Keylogger-Using-CPP',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
      tags: ['C++', 'Windows API', 'Security'],
    },
  ], []);

  const certifications = useMemo(() => [
    { title: 'Certified Red Team Analyst',      issuer: 'Cyberwarfare Labs', badgeUrl: '/crta.webp' },
    { title: 'Certified Red Team Infra Dev',    issuer: 'Cyberwarfare Labs', badgeUrl: 'https://templates.images.credential.net/17043570231479652261133221341593.png' },
    { title: 'Certified Network Security Practitioner', issuer: 'The SecOps Group', badgeUrl: '/cnsp.webp' },
    { title: 'Cyber Threat Intelligence 101',   issuer: 'arcx.io',           badgeUrl: '/arc.webp' },
    { title: 'Certified Red Team Operator',     issuer: 'Pursuing',          badgeUrl: '/CRTO.webp' },
    { title: 'Certified Red Team Lead',         issuer: 'Pursuing',          badgeUrl: '/CRTL.webp' },
  ], []);

  // ── Particles ────────────────────────────────────────────────────────────
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Detect mobile once and reduce particle count for perf
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
        value: isMobile ? 30 : 80,
      },
      opacity: {
        value: 0.5,
        animation: { enable: true, speed: 1, minimumValue: 0.3, sync: true },
      },
      shape: { type: 'circle' },
      size: { value: { min: 1.5, max: 3 } },
    },
    detectRetina: true,
  }), [isMobile]);

  // ── Scroll helpers ───────────────────────────────────────────────────────
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []); // no deps – stable closure over SECTIONS & HEADER_OFFSET constants

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-black text-white relative">
      {/* Particles background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="fixed inset-0 pointer-events-none"
        options={particlesOptions}
      />

      <div className="relative">
        {/* ── Navigation ─────────────────────────────────────────────────── */}
        <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-sm z-50">
          <div className="w-full px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <img src="/snake.webp" alt="The Red Serpent Logo" className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold rainbow-text">The Red Serpent</span>
              </motion.div>

              {/* Hamburger – mobile only */}
              <button
                className="md:hidden text-white p-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center space-x-10">
                {SECTIONS.map((section) => (
                  <motion.button
                    key={section}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`capitalize text-sm font-medium relative transition-colors duration-200 ${
                      activeSection === section ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
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
            </div>
          </div>

          {/* Mobile dropdown */}
          <motion.div
            initial={false}
            animate={{
              height: isMobileMenuOpen ? 'auto' : 0,
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-lg"
          >
            <div className="px-4 py-2">
              {SECTIONS.map((section) => (
                <button
                  key={section}
                  className={`w-full text-left py-3 px-2 capitalize text-sm ${
                    activeSection === section ? 'text-red-500' : 'text-gray-300'
                  }`}
                  onClick={() => scrollToSection(section)}
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        </nav>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <main className="pt-16">
          {/* ABOUT */}
          <section id="about" className="min-h-screen flex items-center px-4 md:px-8">
            <div className="max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 py-16">
              {/* Text */}
              <motion.div
                className="flex-1 text-left max-w-2xl"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.18 } },
                }}
              >
                <motion.h1
                  className="text-3xl md:text-5xl font-bold mb-3 gradient-text"
                  variants={fadeUp}
                  custom={0}
                >
                  Hi, I&apos;m Red Serpent
                </motion.h1>

                <motion.h2
                  className="text-xl md:text-3xl font-bold mb-6 text-white"
                  variants={fadeUp}
                  custom={0.18}
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
                  className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 text-justify tracking-wide"
                  variants={fadeUp}
                  custom={0.36}
                >
                  Red Team Operator focused on adversary simulation and offensive security testing to help
                  organizations identify and improve security gaps.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  variants={fadeUp}
                  custom={0.54}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto text-sm md:text-base bg-gradient-to-r from-red-600 to-red-700 px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                    onClick={() => scrollToSection('projects')}
                  >
                    View Projects
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto text-sm md:text-base bg-transparent px-6 py-2.5 rounded-lg font-semibold border-2 border-red-600 hover:bg-red-500/10 transition-colors duration-300"
                    onClick={() => scrollToSection('contact')}
                  >
                    Contact Me
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Avatar */}
              <motion.div
                className="flex-1 flex justify-center md:justify-end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.div
                  className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden bg-black"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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

          {/* SKILLS */}
          <section id="skills" className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <SectionHeading>Skills</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <FaCode className="text-2xl text-red-500 pulse-effect" />, label: 'Programming Languages', skills: programmingSkills },
                  { icon: <FaShieldAlt className="text-2xl text-red-500 pulse-effect" />, label: 'Offensive Security', skills: pentestingSkills },
                  { icon: <GiSwordsEmblem className="text-2xl text-red-500 pulse-effect" />, label: 'Red Team', skills: redTeamSkills },
                ].map(({ icon, label, skills }, i) => (
                  <motion.div
                    key={label}
                    className="p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
                  >
                    <div className="flex items-center mb-6 space-x-3">
                      {icon}
                      <h3 className="text-xl font-semibold">{label}</h3>
                    </div>
                    {skills.map((skill) => (
                      <SkillBar key={skill.name} {...skill} />
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* TOOLS */}
          <section id="tools" className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <SectionHeading>Security Arsenal</SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {securityTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    className="p-6 rounded-xl cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.25, delay: i * 0.04, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, backgroundColor: 'rgba(238,28,37,0.1)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className="text-red-500 text-3xl hover:rotate-12 transition-transform duration-200">
                        {tool.icon}
                      </div>
                      <h3 className="text-base font-semibold text-gray-200 text-center">{tool.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <SectionHeading>Projects</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    className="relative overflow-hidden rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Status badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium z-10 bg-blue-500/20 text-blue-400">
                      {project.status}
                    </div>

                    {/* Image */}
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-red-500 mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded-md text-xs bg-red-500/10 text-red-400 hover-shake">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors duration-300 text-sm"
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

          {/* CERTIFICATIONS */}
          <section id="certification" className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <SectionHeading>Certifications</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    className="rounded-xl overflow-hidden will-change-transform"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="p-6 flex flex-col items-center text-center">
                      <motion.div className="mb-6 relative group" whileHover={{ scale: 1.05 }}>
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                          src={cert.badgeUrl}
                          alt={`${cert.title} Badge`}
                          className="w-28 h-28 object-contain relative z-10"
                          loading="lazy"
                        />
                      </motion.div>
                      <h3 className="text-lg font-bold text-red-500 mb-2">{cert.title}</h3>
                      <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <SectionHeading>Get in Touch</SectionHeading>
              <motion.p
                className="text-gray-300 text-lg mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Connect with me on various platforms
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { href: 'https://github.com/The-Red-Serpent',       icon: <FaGithub className="text-4xl" />,      label: 'GitHub' },
                  { href: 'https://instagram.com/the_red_serpent',    icon: <FaInstagram className="text-4xl" />,   label: 'Instagram' },
                  { href: 'https://tryhackme.com/p/theredserpent',    icon: <SiTryhackme className="text-4xl" />,   label: 'TryHackMe' },
                  { href: 'https://app.hackthebox.com/profile/2230478', icon: <SiHackthebox className="text-4xl" />, label: 'HackTheBox' },
                ].map(({ href, icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center group"
                  >
                    <span className="text-white group-hover:text-red-500 transition-colors duration-300">{icon}</span>
                    <span className="mt-2 text-gray-300 group-hover:text-red-500 transition-colors duration-300 text-sm">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="text-center text-sm text-gray-500 py-6">
          © {new Date().getFullYear()} The Red Serpent. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

// ─── Shared heading component ─────────────────────────────────────────────────
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.h2>
);

export default App;
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaInstagram,
  FaCode,
  FaPython,
  FaShieldAlt,
  FaGlobe,
  FaSearch,
  FaWindows,
  FaMobile,
  FaLock,
  FaEye,
  FaWifi,
} from 'react-icons/fa';
import {
  SiGnubash,
  SiWireshark,
  SiTryhackme,
  SiBurpsuite,
  SiMetasploit,
  SiOwasp,
  SiMalwarebytes,
  SiHackthebox,
  SiPrimefaces,
} from 'react-icons/si';
import { TbBrandCpp, TbBrandPowershell } from 'react-icons/tb';
import { VscAzure } from 'react-icons/vsc';
import {
  GiHound,
  GiAngularSpider,
  GiEvilWings,
  GiSemiClosedEye,
  GiSwordsEmblem,
} from 'react-icons/gi';
import { RiComputerLine } from 'react-icons/ri';
import { MdPhishing } from 'react-icons/md';
import { Particles } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import './styles.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  icon: React.ReactNode;
}

// ─── Constants (defined outside component to avoid re-creation on render) ─────
const SECTIONS = ['about', 'skills', 'tools', 'projects', 'certification', 'contact'] as const;
type Section = (typeof SECTIONS)[number];

const HEADER_OFFSET = 80;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const SkillBar = ({ name, icon }: Skill) => (
  <div className="mb-4 flex items-center space-x-2">
    <span className="text-red-500 hover-shake">{icon}</span>
    <span className="text-gray-300 glow-on-hover">{name}</span>
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
const App = () => {
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Static data (memoised so they are never reconstructed) ──────────────
  const programmingSkills: Skill[] = useMemo(() => [
    { name: 'Python',     icon: <FaPython className="text-xl" /> },
    { name: 'Bash',       icon: <SiGnubash className="text-xl" /> },
    { name: 'C++',        icon: <TbBrandCpp className="text-xl" /> },
    { name: 'PowerShell', icon: <TbBrandPowershell className="text-xl" /> },
  ], []);

  const pentestingSkills: Skill[] = useMemo(() => [
    { name: 'Active Directory', icon: <FaWindows className="text-xl" /> },
    { name: 'Network',          icon: <FaGlobe className="text-xl" /> },
    { name: 'Wi-Fi',            icon: <FaWifi className="text-xl" /> },
    { name: 'OSINT',            icon: <FaSearch className="text-xl" /> },
    { name: 'Web',              icon: <FaGlobe className="text-xl" /> },
    { name: 'Mobile',           icon: <FaMobile className="text-xl" /> },
    { name: 'Azure',            icon: <VscAzure className="text-xl" /> },
  ], []);

  const redTeamSkills: Skill[] = useMemo(() => [
    { name: 'Phishing',           icon: <MdPhishing className="text-xl" /> },
    { name: 'Windows Internals',  icon: <FaWindows className="text-xl" /> },
    { name: 'Mal Dev',            icon: <SiMalwarebytes className="text-xl" /> },
    { name: 'Physical Red Teaming', icon: <SiPrimefaces className="text-xl" /> },
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
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      tags: ['Python', 'Tor Network', 'Security'],
    },
    {
      title: 'Envy',
      description: 'PowerShell script designed to enumerate Windows systems and Active Directory environments',
      githubUrl: 'https://github.com/The-Red-Serpent/Envy',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
      tags: ['Powershell', 'Active Directory', 'Enumeration'],
    },
    {
      title: 'Wrath',
      description: 'Windows Privilege Escalation enumeration script',
      githubUrl: 'https://github.com/The-Red-Serpent/Wrath',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&auto=format&fit=crop',
      tags: ['PowerShell', 'Windows', 'Security'],
    },
    {
      title: 'Keylogger-Using-CPP',
      description: 'Advanced keylogger with encryption capabilities',
      githubUrl: 'https://github.com/The-Red-Serpent/Keylogger-Using-CPP',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
      tags: ['C++', 'Windows API', 'Security'],
    },
  ], []);

  const certifications = useMemo(() => [
    { title: 'Certified Red Team Analyst',      issuer: 'Cyberwarfare Labs', badgeUrl: '/crta.webp' },
    { title: 'Certified Red Team Infra Dev',    issuer: 'Cyberwarfare Labs', badgeUrl: 'https://templates.images.credential.net/17043570231479652261133221341593.png' },
    { title: 'Certified Network Security Practitioner', issuer: 'The SecOps Group', badgeUrl: '/cnsp.webp' },
    { title: 'Cyber Threat Intelligence 101',   issuer: 'arcx.io',           badgeUrl: '/arc.webp' },
    { title: 'Certified Red Team Operator',     issuer: 'Pursuing',          badgeUrl: '/CRTO.webp' },
    { title: 'Certified Red Team Lead',         issuer: 'Pursuing',          badgeUrl: '/CRTL.webp' },
  ], []);

  // ── Particles ────────────────────────────────────────────────────────────
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Detect mobile once and reduce particle count for perf
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
        value: isMobile ? 30 : 80,
      },
      opacity: {
        value: 0.5,
        animation: { enable: true, speed: 1, minimumValue: 0.3, sync: true },
      },
      shape: { type: 'circle' },
      size: { value: { min: 1.5, max: 3 } },
    },
    detectRetina: true,
  }), [isMobile]);

  // ── Scroll helpers ───────────────────────────────────────────────────────
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []); // no deps – stable closure over SECTIONS & HEADER_OFFSET constants

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-black text-white relative">
      {/* Particles background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="fixed inset-0 pointer-events-none"
        options={particlesOptions}
      />

      <div className="relative">
        {/* ── Navigation ─────────────────────────────────────────────────── */}
        <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-sm z-50">
          <div className="w-full px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <img src="/snake.webp" alt="The Red Serpent Logo" className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold rainbow-text">The Red Serpent</span>
              </motion.div>

              {/* Hamburger – mobile only */}
              <button
                className="md:hidden text-white p-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center space-x-10">
                {SECTIONS.map((section) => (
                  <motion.button
                    key={section}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`capitalize text-sm font-medium relative transition-colors duration-200 ${
                      activeSection === section ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
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
            </div>
          </div>

          {/* Mobile dropdown */}
          <motion.div
            initial={false}
            animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
            className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-lg"
          >
            <div className="px-4 py-2">
              {SECTIONS.map((section) => (
                <button
                  key={section}
                  className={`w-full text-left py-3 px-2 capitalize text-sm ${
                    activeSection === section ? 'text-red-500' : 'text-gray-300'
                  }`}
                  onClick={() => scrollToSection(section)}
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        </nav>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <main className="pt-16">
          {/* ABOUT */}
          <section id="about" className="min-h-screen flex items-center px-4 md:px-8">
            <div className="max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 py-16">
              {/* Text */}
              <motion.div
                className="flex-1 text-left max-w-2xl"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.18 } },
                }}
              >
                <motion.h1
                  className="text-3xl md:text-5xl font-bold mb-3 gradient-text"
                  variants={fadeUp}
                  custom={0}
                >
                  Hi, I&apos;m Red Serpent
                </motion.h1>

                <motion.h2
                  className="text-xl md:text-3xl font-bold mb-6 text-white"
                  variants={fadeUp}
                  custom={0.18}
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
                  className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 text-justify tracking-wide"
                  variants={fadeUp}
                  custom={0.36}
                >
                  Red Team Operator focused on adversary simulation and offensive security testing to help
                  organizations identify and improve security gaps.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  variants={fadeUp}
                  custom={0.54}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto text-sm md:text-base bg-gradient-to-r from-red-600 to-red-700 px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                    onClick={() => scrollToSection('projects')}
                  >
                    View Projects
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto text-sm md:text-base bg-transparent px-6 py-2.5 rounded-lg font-semibold border-2 border-red-600 hover:bg-red-500/10 transition-colors duration-300"
                    onClick={() => scrollToSection('contact')}
                  >
                    Contact Me
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Avatar */}
              <motion.div
                className="flex-1 flex justify-center md:justify-end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.div
                  className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden bg-black"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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

          {/* SKILLS */}
          <section id="skills" className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <SectionHeading>Skills</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <FaCode className="text-2xl text-red-500 pulse-effect" />, label: 'Programming Languages', skills: programmingSkills },
                  { icon: <FaShieldAlt className="text-2xl text-red-500 pulse-effect" />, label: 'Offensive Security', skills: pentestingSkills },
                  { icon: <GiSwordsEmblem className="text-2xl text-red-500 pulse-effect" />, label: 'Red Team', skills: redTeamSkills },
                ].map(({ icon, label, skills }, i) => (
                  <motion.div
                    key={label}
                    className="p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
                  >
                    <div className="flex items-center mb-6 space-x-3">
                      {icon}
                      <h3 className="text-xl font-semibold">{label}</h3>
                    </div>
                    {skills.map((skill) => (
                      <SkillBar key={skill.name} {...skill} />
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* TOOLS */}
          <section id="tools" className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <SectionHeading>Security Arsenal</SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {securityTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    className="p-6 rounded-xl cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.25, delay: i * 0.04, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, backgroundColor: 'rgba(238,28,37,0.1)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className="text-red-500 text-3xl hover:rotate-12 transition-transform duration-200">
                        {tool.icon}
                      </div>
                      <h3 className="text-base font-semibold text-gray-200 text-center">{tool.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <SectionHeading>Projects</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    className="relative overflow-hidden rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Status badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium z-10 bg-blue-500/20 text-blue-400">
                      {project.status}
                    </div>

                    {/* Image */}
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-red-500 mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded-md text-xs bg-red-500/10 text-red-400 hover-shake">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors duration-300 text-sm"
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

          {/* CERTIFICATIONS */}
          <section id="certification" className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <SectionHeading>Certifications</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    className="rounded-xl overflow-hidden will-change-transform"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="p-6 flex flex-col items-center text-center">
                      <motion.div className="mb-6 relative group" whileHover={{ scale: 1.05 }}>
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                          src={cert.badgeUrl}
                          alt={`${cert.title} Badge`}
                          className="w-28 h-28 object-contain relative z-10"
                          loading="lazy"
                        />
                      </motion.div>
                      <h3 className="text-lg font-bold text-red-500 mb-2">{cert.title}</h3>
                      <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <SectionHeading>Get in Touch</SectionHeading>
              <motion.p
                className="text-gray-300 text-lg mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Connect with me on various platforms
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { href: 'https://github.com/The-Red-Serpent',       icon: <FaGithub className="text-4xl" />,      label: 'GitHub' },
                  { href: 'https://instagram.com/the_red_serpent',    icon: <FaInstagram className="text-4xl" />,   label: 'Instagram' },
                  { href: 'https://tryhackme.com/p/theredserpent',    icon: <SiTryhackme className="text-4xl" />,   label: 'TryHackMe' },
                  { href: 'https://app.hackthebox.com/profile/2230478', icon: <SiHackthebox className="text-4xl" />, label: 'HackTheBox' },
                ].map(({ href, icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center group"
                  >
                    <span className="text-white group-hover:text-red-500 transition-colors duration-300">{icon}</span>
                    <span className="mt-2 text-gray-300 group-hover:text-red-500 transition-colors duration-300 text-sm">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="text-center text-sm text-gray-500 py-6">
          © {new Date().getFullYear()} The Red Serpent. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

// ─── Shared heading component ─────────────────────────────────────────────────
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.h2>
);

export default App;
