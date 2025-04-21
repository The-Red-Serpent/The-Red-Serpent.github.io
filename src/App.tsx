import React, { useState, useEffect, useCallback } from 'react';
import { Typewriter } from 'react-simple-typewriter';

import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaInstagram, 
  FaCode,
  FaPython,
  FaNetworkWired,
  FaShieldAlt,
  FaBug,
  FaGlobe,
  FaSearch,
  FaWindows,
  FaSpider,
  FaLock,
  FaEye,
  FaNetworkWired as FaNetwork,
  FaChartLine,
  FaUserNinja
} from 'react-icons/fa';
import { 
  SiC, 
  SiGnubash, 
  SiPowershell, 
  SiJavascript, 
  SiWireshark
} from 'react-icons/si';
import './styles.css';
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

interface Skill {
  name: string;
  proficiency: number;
  icon: React.ReactNode;
}

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const programmingSkills: Skill[] = [
    { name: 'Python', proficiency: 90, icon: <FaPython className="text-xl" /> },
    { name: 'C', proficiency: 85, icon: <SiC className="text-xl" /> },
    { name: 'Bash', proficiency: 88, icon: <SiGnubash className="text-xl" /> },
    { name: 'PowerShell', proficiency: 85, icon: <SiPowershell className="text-xl" /> },
    { name: 'JavaScript', proficiency: 75, icon: <SiJavascript className="text-xl" /> },
  ];

  const pentestingSkills: Skill[] = [
    { name: 'Web Penetration Testing', proficiency: 85, icon: <FaGlobe className="text-xl" /> },
    { name: 'API Penetration Testing', proficiency: 80, icon: <FaCode className="text-xl" /> },
    { name: 'Active Directory Pentesting', proficiency: 75, icon: <FaWindows className="text-xl" /> },
    { name: 'OSINT', proficiency: 90, icon: <FaSearch className="text-xl" /> },
    { name: 'Network Penetration Testing', proficiency: 82, icon: <FaNetworkWired className="text-xl" /> },
  ];

  const networkingSkills: Skill[] = [
    { name: 'Network Design & Architecture', proficiency: 90, icon: <FaNetworkWired className="text-xl" /> },
    { name: 'Routing & Switching', proficiency: 85, icon: <FaNetworkWired className="text-xl" /> },
    { name: 'VLANs & STP', proficiency: 85, icon: <FaNetworkWired className="text-xl" /> },
    { name: 'OSPF & Dynamic Routing', proficiency: 80, icon: <FaNetworkWired className="text-xl" /> },
    { name: 'Network Security', proficiency: 85, icon: <FaLock className="text-xl" /> },
    { name: 'Subnetting & IP Addressing', proficiency: 90, icon: <FaNetworkWired className="text-xl" /> },
    { name: 'WAN Technologies', proficiency: 75, icon: <FaNetworkWired className="text-xl" /> },
    { name: 'Network Troubleshooting', proficiency: 85, icon: <FaSearch className="text-xl" /> },
  ];


  const securityTools = [
    { name: 'Metasploit', icon: <FaBug className="text-2xl" />, category: 'Exploitation' },
    { name: 'Burp Suite', icon: <FaSpider className="text-2xl" />, category: 'Web Security' },
    { name: 'Nikto', icon: <FaSearch className="text-2xl" />, category: 'Web Security' },
    { name: 'OWASP ZAP', icon: <FaShieldAlt className="text-2xl" />, category: 'Web Security' },
    { name: 'Nessus', icon: <FaEye className="text-2xl" />, category: 'Vulnerability Scanner' },
    { name: 'Snort', icon: <FaNetworkWired className="text-2xl" />, category: 'Network Security' },
    { name: 'Splunk', icon: <FaChartLine className="text-2xl" />, category: 'SIEM' },
    { name: 'Bloodhound', icon: <FaNetworkWired className="text-2xl" />, category: 'Active Directory' },
    { name: 'SET', icon: <FaUserNinja className="text-2xl" />, category: 'Social Engineering' },
    { name: 'Ettercap', icon: <FaNetwork className="text-2xl" />, category: 'Network Security' },
    { name: 'Wireshark', icon: <SiWireshark className="text-2xl" />, category: 'Network Analysis' },
    { name: 'Mimikatz', icon: <FaLock className="text-2xl" />, category: 'Credential Dumping' }
  ];

  const projects = [
    {
      title: 'PhantomHop',
      description: 'Python-based Tor IP rotation tool for enhanced anonymity',
      githubUrl: 'https://github.com/The-Red-Serpent/PhantomHop',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
      tags: ['Python', 'Tor Network', 'Security']
    },
    {
      title: 'AGONY',
      description: 'Stealthy ARP-based network scanner for device discovery',
      githubUrl: 'https://github.com/The-Red-Serpent/AGONY',
      status: 'New',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
      tags: ['Python', 'ARP', 'Network Scanning']
    },
    {
      title: 'Wrath',
      description: 'Windows Privilege Escalation enumeration script',
      githubUrl: 'https://github.com/The-Red-Serpent/Wrath',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop',
      tags: ['PowerShell', 'Windows', 'Security']
    },
    {
      title: 'Keylogger-Using-CPP',
      description: 'Advanced keylogger with encryption capabilities',
      githubUrl: 'https://github.com/The-Red-Serpent/Keylogger-Using-CPP',
      status: 'In Progress',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
      tags: ['C++', 'Windows API', 'Security']
    }
  ];

  const certifications = [
    {
      title: "IBM Cybersecurity Fundamentals",
      issuer: "IBM",
      badgeUrl: "https://images.credly.com/size/680x680/images/50b96632-6cbb-40b7-ac0e-b83f49ff7f94/image.png"
    },
    {
      title: "Cisco Networking Basics",
      issuer: "Cisco Networking Academy",
      badgeUrl: "https://images.credly.com/size/680x680/images/5bdd6a39-3e03-4444-9510-ecff80c9ce79/image.png"
    },
    {
      title: "Cisco Ethical Hacker",
      issuer: "Cisco Networking Academy",
      badgeUrl: "https://images.credly.com/size/680x680/images/242902b5-f527-42ad-865e-977c9e1b5b58/image.png"
    },
    {
      title: "Fortinet Certified Associate - Cybersecurity",
      issuer: "Fortinet",
      badgeUrl: "https://images.credly.com/size/340x340/images/20082fc1-94af-4773-9df0-28856b566748/image.png"
    },
    {
      title: "API Penetration Testing",
      issuer: "APISEC University",
      badgeUrl: "https://images.credly.com/size/680x680/images/44a5fe44-52e6-45c2-ae9a-41fd9183c81d/image.png"
    }
  ];

  const aboutContent = {
    intro: "Hi, I'm The Red Serpent",
    role: "Cybersecurity and Network Engineer",
    description: "Passionate about ethical hacking and digital security, diving deep into Active Directory and Web Security. Armed with penetration testing tools and a hunger for knowledge, I'm on a mission to master the art of cybersecurity. Let's hack the planet! 🌐",
  };

  const SkillBar = ({ name, proficiency, icon }: Skill) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center space-x-2">
          <span className="text-red-500 hover-shake">{icon}</span>
          <span className="text-gray-300 glow-on-hover">{name}</span>
        </div>
        <span className="text-gray-400">{proficiency}%</span>
      </div>
      <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${proficiency}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-[#EE1C25] skill-bar-fill"
          style={{
            boxShadow: '0 0 10px rgba(238, 28, 37, 0.5)'
          }}
        />
      </div>
    </div>
  );

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of your fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'tools', 'projects', 'certification', 'contact'];
      const headerOffset = 80; // Same as above
      
      // Debounce scroll event
      if (!window.requestAnimationFrame) {
        return requestAnimationFrame(() => {
          handleScroll();
        });
      }

      const currentPos = window.scrollY + headerOffset + (window.innerHeight / 4);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (currentPos >= offsetTop && currentPos < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]); // Add activeSection as dependency

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#DC2626",
            },
            links: {
              color: "#DC2626",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1.5,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.3,
              }
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1.5, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="relative">
        {/* Navigation */}
        <nav className="fixed top-0 w-full glass-effect z-50">
          <div className="w-full px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left side - Logo and Title */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
                  <img 
                    src="/snake.png" 
                    alt="The Red Serpent Logo" 
                    className="w-8 h-8"
                  />
                </div>
                <span className="text-xl font-bold text-white">The Red Serpent</span>
              </motion.div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white p-2 focus:outline-none"
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
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-12">
                {['about', 'skills', 'tools', 'projects', 'certification', 'contact'].map((section) => (
                  <motion.button
                    key={section}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`capitalize transition-all duration-300 text-sm font-medium relative ${
                      activeSection === section ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                    }`}
                    onClick={() => scrollToSection(section)}
                  >
                    {section}
                    {activeSection === section && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 26,
                          mass: 0.5
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
            className={`md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-lg ${isMobileMenuOpen ? 'border-b border-gray-800' : ''}`}
          >
            <div className="px-4 py-2">
              {['about', 'skills', 'tools', 'projects', 'certification', 'contact'].map((section) => (
                <motion.button
                  key={section}
                  className={`w-full text-left py-3 px-2 capitalize ${
                    activeSection === section ? 'text-red-500' : 'text-gray-300'
                  }`}
                  onClick={() => {
                    scrollToSection(section);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </nav>

        <main className="pt-16">
          {/* Hero/About Section with Parallax */}
          <section id="about" className="min-h-[90vh] py-4 md:py-6">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20">
                {/* Left Column - Text Content with Parallax */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex-1 text-left max-w-2xl"
                >
                  <motion.h1 
                    className="text-3xl md:text-5xl font-bold mb-3 gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  >
                    {aboutContent.intro}
                  </motion.h1>
                 <motion.h2
                    className="text-xl md:text-3xl font-bold mb-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                  >
                  <Typewriter
                      words={['Cybersecurity Engineer', 'Pentester', 'Network Wizard','System Admin', 'Red Team Operator']}
                      loop={0}
                      cursor
                      cursorStyle="|"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1500}
                      />
            </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 text-justify max-w-2xl mx-auto tracking-wide"
                  >
                    {aboutContent.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto text-sm md:text-base bg-gradient-to-r from-red-600 to-red-700 px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => scrollToSection('projects')}
                    >
                      View Projects
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto text-sm md:text-base bg-transparent px-6 py-2.5 rounded-lg font-semibold border-2 border-red-600 hover:bg-red-500/10 transition-all duration-300"
                      onClick={() => scrollToSection('contact')}
                    >
                      Contact Me
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Right Column - Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="flex-1 flex justify-center md:justify-end"
                >
                  <motion.div 
                    className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden bg-black flex items-center justify-center relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img
                      src="/snake.png"
                      alt="The Red Serpent Profile"
                      className="w-full h-full"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Skills Section with Parallax */}
          <section id="skills" className="min-h-[90vh] py-4 md:py-6">
            <div className="max-w-6xl mx-auto px-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Skills
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass-effect p-8 rounded-lg card-hover-effect"
                >
                  <div className="flex items-center mb-6">
                    <FaCode className="text-2xl text-red-500 mr-3 pulse-effect" />
                    <h3 className="text-xl font-semibold">Programming Languages</h3>
                  </div>
                  {programmingSkills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass-effect p-8 rounded-lg card-hover-effect"
                >
                  <div className="flex items-center mb-6">
                    <FaShieldAlt className="text-2xl text-red-500 mr-3 pulse-effect" />
                    <h3 className="text-xl font-semibold">Penetration Testing</h3>
                  </div>
                  {pentestingSkills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="glass-effect p-8 rounded-lg card-hover-effect"
                >
                  <div className="flex items-center mb-6">
                    <FaNetworkWired className="text-2xl text-red-500 mr-3 pulse-effect" />
                    <h3 className="text-xl font-semibold">Networking Knowledge</h3>
                  </div>
                  {networkingSkills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Tools Section with Parallax */}
          <section id="tools" className="min-h-[90vh] py-6 md:py-8">
            <div className="max-w-6xl mx-auto px-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Security Arsenal
              </motion.h2>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {securityTools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.2,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      backgroundColor: 'rgba(238, 28, 37, 0.1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-effect p-6 rounded-xl cursor-pointer border border-transparent hover:border-red-500/20 transition-all duration-200"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="text-red-500 transform transition-transform duration-200 hover:rotate-12 text-3xl">
                        {tool.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-200 text-center">{tool.name}</h3>
                      <span className="text-xs text-gray-400 px-3 py-1 rounded-full bg-gray-800/50 backdrop-blur-sm">
                        {tool.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-[90vh] py-6 md:py-8">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {projects.map((project) => (
                  <motion.div
                    key={project.title}
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm"
                  >
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium z-10
                      ${project.status === 'Active' ? 'bg-blue-500/20 text-blue-400' : 
                        project.status === 'New' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-cyan-500/20 text-cyan-400'}`}
                    >
                      {project.status}
                    </div>

                    {/* Project Image */}
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-red-500 mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded-md text-xs bg-red-500/10 text-red-400 hover-shake">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Button */}
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center justify-center bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all duration-300 text-sm button-hover-effect"
                      >
                        <FaGithub className="mr-2" />
                        View Code
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Certification Section */}
          <section id="certification" className="min-h-[90vh] py-6 md:py-8 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">Professional Certifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className="mb-6 relative group"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="absolute inset-0 bg-red-500/20 rounded-full filter blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                          <img 
                            src={cert.badgeUrl} 
                            alt={`${cert.title} Badge`} 
                            className="w-28 h-28 object-contain relative z-10"
                          />
                        </motion.div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold text-red-500 mb-2">
                            {cert.title}
                          </h3>
                          <div className="text-gray-400 text-sm">
                            {cert.issuer}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-4">
        {/* Contact Section */}
        <section id="contact" className="min-h-[80vh] py-4 md:py-6">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Get in Touch
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Connect with me on various platforms
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-6 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.a
                href="https://github.com/The-Red-Serpent"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-300">
                  <FaGithub className="text-3xl text-white group-hover:text-red-500 transition-colors duration-300" />
                </div>
                <span className="mt-2 text-gray-300 group-hover:text-red-500 transition-colors duration-300">
                  GitHub
                </span>
              </motion.a>

              <motion.a
                href="https://instagram.com/the_red_serpent"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-300">
                  <FaInstagram className="text-3xl text-white group-hover:text-red-500 transition-colors duration-300" />
                </div>
                <span className="mt-2 text-gray-300 group-hover:text-red-500 transition-colors duration-300">
                  Instagram
                </span>
              </motion.a>

              <motion.a
                href="https://tryhackme.com/p/theredserpent"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                  <img
                    src="/THM.png"
                    alt="TryHackMe"
                    className="w-12 h-12 filter brightness-100"
                  />
                </div>
                <span className="mt-2 text-gray-300 group-hover:text-red-500 transition-colors duration-300">
                  TryHackMe
                </span>
              </motion.a>

              <motion.a
                href="https://app.hackthebox.com/profile/2230478"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-full bg-[#111927] flex items-center justify-center group-hover:bg-[#1A2332] transition-colors duration-300">
                  <img src="/htb.png" alt="HackTheBox" className="w-12 h-12" />
                </div>
                <span className="mt-2 text-gray-300 group-hover:text-red-500 transition-colors duration-300">
                  HackTheBox
                </span>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} The Red Serpent. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
