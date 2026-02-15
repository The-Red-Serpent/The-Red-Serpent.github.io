import React, { useState, useEffect, useCallback } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import {
  FaGithub, FaInstagram, FaCode, FaPython, FaShieldAlt, FaGlobe,
  FaSearch, FaWindows, FaBattleNet, FaMobile, FaLock, FaEye, FaWifi
} from 'react-icons/fa';
import { SiGnubash, SiWireshark, SiTryhackme, SiBurpsuite, SiMetasploit, SiOwasp, SiMalwarebytes, SiHackthebox, SiPrimefaces } from 'react-icons/si';
import { TbBrandCpp, TbBrandPowershell } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";
import { GiHound, GiAngularSpider, GiEvilWings, GiSemiClosedEye, GiSwordsEmblem } from "react-icons/gi";
import { RiComputerLine } from "react-icons/ri";
import { MdPhishing } from "react-icons/md";
import './styles.css';
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const SkillBar = ({ name, icon }: Skill) => (
  <div className="mb-4">
    <div className="flex items-center space-x-2">
      <span className="text-red-500 hover-shake">{icon}</span>
      <span className="text-gray-300 glow-on-hover">{name}</span>
    </div>
  </div>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const programmingSkills: Skill[] = [
    { name: 'Python', icon: <FaPython className="text-xl" /> },
    { name: 'Bash', icon: <SiGnubash className="text-xl" /> },
    { name: 'C++', icon: <TbBrandCpp className="text-xl" /> },
    { name: 'PowerShell', icon: <TbBrandPowershell className="text-xl" /> },
  ];

  const pentestingSkills: Skill[] = [
    { name: 'Active Directory', icon: <FaWindows className="text-xl" /> },
    { name: 'Network', icon: <FaBattleNet className="text-xl" /> },
    { name: 'Wi-Fi', icon: <FaWifi className="text-xl" /> },
    { name: 'OSINT', icon: <FaSearch className="text-xl" /> },
    { name: 'Web', icon: <FaGlobe className="text-xl" /> },
    { name: 'Mobile', icon: <FaMobile className="text-xl" /> },
    { name: 'Azure', icon: <VscAzure className="text-xl" /> },
  ];

  const networkingSkills: Skill[] = [
    { name: 'Phishing', icon: <MdPhishing className="text-xl"/> },
    { name: 'Windows Internals', icon: <FaWindows className="text-xl" /> },
    { name: 'Mal Dev', icon: <SiMalwarebytes className="text-xl" /> },
    { name: 'Physical Red Teaming', icon: <SiPrimefaces className="text-xl" /> },
  ];

  const securityTools = [
    { name: 'Cobalt Strike', icon: <RiComputerLine className="text-4xl" /> },
    { name: 'Bloodhound', icon: <GiHound className="text-4xl" />},
    { name: 'Mimikatz', icon: <FaLock className="text-4xl" />},
    { name: 'Netexec', icon: <GiAngularSpider className="text-4xl" />},
    { name: 'Evilgnix', icon: <GiEvilWings className="text-4xl" />},
    { name: 'Burp Suite', icon: <SiBurpsuite className="text-4xl" />},
    { name: 'Nessus', icon: <FaEye className="text-4xl" />},
    { name: 'Metasploit', icon: <SiMetasploit className="text-4xl" />},
    { name: 'OWASP ZAP', icon: <SiOwasp className="text-4xl" />},
    { name: 'Nmap', icon: <GiSemiClosedEye className="text-4xl" />},
    { name: 'Wireshark', icon: <SiWireshark className="text-4xl" />}
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
      title: 'Envy',
      description: 'PowerShell script designed to enumerate Windows systems and Active Directory environments',
      githubUrl: 'https://github.com/The-Red-Serpent/Envy',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
      tags: ['Powershell', 'Active Directory', 'Enumeration']
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
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
      tags: ['C++', 'Windows API', 'Security']
    }
  ];

  const certifications = [
    {
      title: "Certified Red Team Analyst",
      issuer: "Cyberwarfare Labs",
      badgeUrl: "/crta.webp"
    },
    {
      title: "Certified Red Team Infra Dev",
      issuer: "Cyberwarfare Labs",
      badgeUrl: "https://templates.images.credential.net/17043570231479652261133221341593.png"
    },
    {
      title: "Certified Network Security Practitioner",
      issuer: "The SecOps Group",
      badgeUrl: "/cnsp.webp"
    },
    {
      title: "Cyber Threat Intelligence 101",
      issuer: "arcx.io",
      badgeUrl: "/arc.webp"
    },
    {
      title: "Certified Red Team Operator",
      issuer: "Pursuing",
      badgeUrl: "/CRTO.webp"
    },
    {
      title: "Certified Lead",
      issuer: "Pursuing",
      badgeUrl: "/CRTL.webp"
    }
  ];

  const aboutContent = {
    intro: "Hi, I'm Red Serpent",
    role: "Red Team Operator",
    description: "Red Team Operator focused on adversary simulation and offensive security testing to help organizations identify and improve security gaps.",
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'tools', 'projects', 'certification', 'contact'];
      const headerOffset = 80;
      const currentPos = window.scrollY + headerOffset + (window.innerHeight / 4);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (currentPos >= offsetTop && currentPos < offsetTop + offsetHeight) {
            if (activeSection !== section) setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="bg-black text-white relative">
      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 30,
          interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
          particles: {
            number: { value: isMobile ? 30 : 80 },
            links: { enable: !isMobile, color: "#DC2626", distance: 150, opacity: 0.4, width: 1 },
            collisions: { enable: !isMobile },
            move: { speed: isMobile ? 0.5 : 1, outModes: { default: "bounce" } },
            opacity: { value: 0.5, animation: { enable: !isMobile, speed: 1, minimumValue: 0.3, sync: true } },
            shape: { type: "circle" },
            size: { value: { min: 1.5, max: 3 } },
            color: { value: "#DC2626" },
          },
          detectRetina: true,
        }}
      />

      {/* Rest of your app here: navigation, main, sections */}
      {/* ... (use your existing navigation, hero, skills, tools, projects, certifications, contact) */}
    </div>
  );
};

export default App;
