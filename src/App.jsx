import React, { useState } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('EN'); // 'EN' or 'PT'
  const [selectedProject, setSelectedProject] = useState(null); // Para a janela modal

  // Text translations
  const t = {
    EN: {
      role: "Software Developer • Coding Academy",
      heroTitle: "Building robust & scalable web applications.",
      heroDesc: "Hello! I'm Diogo. A graduate from Coding Academy, I build robust solutions with a strong emphasis on backend architecture and modern user interfaces.",
      viewProjects: "View Projects (FleetWise & Game Closet)",
      githubBtn: "GitHub ↗",
      cvBtn: "Download CV 📄",
      featuredTitle: "Featured Projects",
      featuredDesc: "Click on any project to view architectural details, tech stack, and links.",
      otherTitle: "Other Works & Production",
      skillsTitle: "Tech Stack",
      footer: "© 2026 Diogo Pinto. Built with React & Tailwind CSS.",
      navProjects: "Projects",
      navAbout: "About",
      navContact: "Contact",
      closeModal: "Close Details",
      detailsTitle: "Technical Architecture & Details",
      viewRepo: "View Repository ↗",
      liveSite: "Live Site ↗"
    },
    PT: {
      role: "Software Developer • Academia de Código",
      heroTitle: "Construção de aplicações web robustas e escaláveis.",
      heroDesc: "Olá! Sou o Diogo. Formado na Academia de Código, construo soluções robustas com forte ênfase em arquitetura de backend e interfaces modernas.",
      viewProjects: "Ver Projetos (FleetWise & Game Closet)",
      githubBtn: "GitHub ↗",
      cvBtn: "Descarregar CV 📄",
      featuredTitle: "Projetos em Destaque",
      featuredDesc: "Clica em qualquer projeto para ver detalhes de arquitetura, stack tecnológica e ligações.",
      otherTitle: "Outros Trabalhos & Produção",
      skillsTitle: "Stack Tecnológica",
      footer: "© 2026 Diogo Pinto. Desenvolvido com React & Tailwind CSS.",
      navProjects: "Projetos",
      navAbout: "Sobre",
      navContact: "Contacto",
      closeModal: "Fechar Detalhes",
      detailsTitle: "Arquitetura Técnica & Detalhes",
      viewRepo: "Ver Repositório ↗",
      liveSite: "Ver Site ↗"
    }
  };

  const curr = t[language];

  const mainProjects = [
    {
      title: "FleetWise",
      subtitle: "Fleet Management & Optimization Platform",
      description: language === 'EN' 
        ? "Advanced fleet management and optimization platform. Developed with a focus on robust architecture, efficiency, and seamless user experience."
        : "Plataforma avançada de gestão e otimização de frotas. Desenvolvido com foco em arquitetura robusta, eficiência e experiência de utilização.",
      architecture: language === 'EN'
        ? "Built with a robust backend service structure, REST APIs, database integration, and efficient routing logic to handle high-demand fleet operations."
        : "Construído com uma estrutura de serviços backend robusta, APIs REST, integração com base de dados e lógica de routing eficiente para lidar com operações de frota de alta procura.",
      tags: ["Java", "Spring Boot", "REST APIs", "Fullstack", "Maven"],
      github: "https://github.com/diogompintoo/FleetWiseAI", // Podes ajustar o link exato
      live: "#"
    },
    {
      title: "Game Closet",
      subtitle: "Game Collection & Organization Manager",
      description: language === 'EN'
        ? "Interactive application focused on managing and organizing game collections, combining efficient backend logic with a fluid interface."
        : "Aplicação interativa direcionada à gestão e organização de coleções de jogos, combinando lógica de backend eficiente com uma interface fluida.",
      architecture: language === 'EN'
        ? "Features a dynamic user interface built with modern JavaScript/React components, structured data management, and clean UI/UX design principles."
        : "Apresenta uma interface de utilizador dinâmica construída com componentes modernos em JavaScript/React, gestão de dados estruturada e princípios de UI/UX limpos.",
      tags: ["JavaScript", "React", "Frontend", "UI/UX", "Tailwind CSS"],
      github: "https://github.com/diogompintoo",
      live: "#"
    }
  ];

  const otherProjects = [
    {
      title: "Parmigiano Website",
      description: language === 'EN' ? "Commercial website developed and deployed to production." : "Website comercial desenvolvido e implementado em produção.",
      link: "https://parmigiano.pt/"
    },
    {
      title: "QR Code Menu (Oh Petisco)",
      description: language === 'EN' ? "Interactive digital menu system optimized for restaurant business (Cloudflare Workers)." : "Sistema de menu digital interativo otimizado para restauração (Cloudflare Workers).",
      link: "https://hopetiscomenu.diogompintoo3.workers.dev/"
    }
  ];

  const skills = [
    "Java", "Spring Framework", "Maven", "JavaScript", "React", "Git & GitHub", "REST APIs", "HTML/CSS", "Tailwind CSS"
  ];

  return (
    <div className={darkMode ? "bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950 relative" : "bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-cyan-600 selection:text-white relative"}>
      
      {/* HEADER / NAVBAR */}
      <header className="flex justify-between items-center max-w-5xl mx-auto px-6 py-6 border-b border-slate-800/40">
        <span className="font-bold text-lg tracking-wider text-cyan-400">Diogo Pinto</span>
        <div className="flex items-center gap-3 md:gap-5">
          <a href="#projects" className="text-sm hover:text-cyan-400 transition-colors hidden sm:inline">{curr.navProjects}</a>
          <a href="#about" className="text-sm hover:text-cyan-400 transition-colors hidden sm:inline">{curr.navAbout}</a>
          <a href="#contact" className="text-sm hover:text-cyan-400 transition-colors hidden sm:inline">{curr.navContact}</a>
          
          {/* Download CV Button */}
          <a 
            href="/cv.pdf" 
            download 
            className="px-3 py-1.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 text-xs font-semibold transition-all"
          >
            {curr.cvBtn}
          </a>

          {/* Language Switcher */}
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'PT' : 'EN')}
            className="px-2.5 py-1.5 rounded-md border border-slate-700 hover:border-cyan-500 text-xs font-semibold transition-all"
          >
            {language === 'EN' ? '🇵🇹 PT' : '🇬🇧 EN'}
          </button>

          {/* Dark/Light Mode */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full border border-slate-700 hover:bg-slate-800 transition-all text-xs"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 flex flex-col items-start gap-6">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          {curr.role}
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          {curr.heroTitle.split('web')[0]}web <span className="text-cyan-400">scalable</span>{curr.heroTitle.split('web')[1] || ''}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          {curr.heroDesc}
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <a href="#projects" className="px-6 py-3 rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
            {curr.viewProjects}
          </a>
          <a href="https://github.com/diogompintoo" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all font-semibold">
            {curr.githubBtn}
          </a>
        </div>
      </section>

      {/* PROJECTS SECTION - FLEETWISE & GAME CLOSET */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-16 border-t border-slate-800/40">
        <h2 className="text-2xl font-bold mb-2">{curr.featuredTitle}</h2>
        <p className="text-slate-400 text-sm mb-8">{curr.featuredDesc}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {mainProjects.map((project, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedProject(project)}
              className="p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/80 to-slate-900/40 hover:border-cyan-400 cursor-pointer transition-all flex flex-col justify-between shadow-xl shadow-cyan-950/20 group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-cyan-300 group-hover:underline">{project.title}</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Featured</span>
                </div>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-cyan-200/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-xs font-semibold text-cyan-400 pt-4 border-t border-slate-800/80 flex items-center gap-1">
                {language === 'EN' ? 'Click to view technical details ↗' : 'Clica para ver detalhes técnicos ↗'}
              </div>
            </div>
          ))}
        </div>

        {/* OTHER PROJECTS */}
        <h3 className="text-xl font-bold mb-4 text-slate-300">{curr.otherTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherProjects.map((project, index) => (
            <div key={index} className="p-5 rounded-xl border border-slate-800 bg-slate-900/30 hover:border-slate-700 transition-all flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-slate-200">{project.title}</h4>
                <p className="text-slate-400 text-xs mt-1">{project.description}</p>
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-cyan-400 hover:underline shrink-0 ml-4">
                {language === 'EN' ? 'Live Site ↗' : 'Ver Site ↗'}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-16 border-t border-slate-800/40">
        <h2 className="text-2xl font-bold mb-6">{curr.skillsTitle}</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span key={index} className="px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/60 text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-800/40 text-center text-sm text-slate-500">
        <p>{curr.footer}</p>
      </footer>

      {/* MODAL POP-UP PARA DETALHES TÉCNICOS */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold p-2"
            >
              ✕
            </button>
            <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
              {curr.detailsTitle}
            </span>
            <h3 className="text-2xl font-bold text-cyan-300 mt-3 mb-1">{selectedProject.title}</h3>
            <p className="text-xs text-slate-400 mb-4">{selectedProject.subtitle}</p>
            
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {selectedProject.architecture}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-800">
              <a 
                href={selectedProject.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-sm hover:bg-cyan-400 transition-all flex-1 text-center"
              >
                {curr.viewRepo}
              </a>
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 text-sm font-semibold transition-all"
              >
                {curr.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}