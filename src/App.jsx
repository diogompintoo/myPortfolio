import { useEffect, useState } from 'react';
import PixelGrid from './PixelGrid.jsx';

/* ---------- DADOS (separados do visual) ---------- */


const EMAIL = 'diogomartinsp1992@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/diogopintoo92/';
const GITHUB = 'https://github.com/diogompintoo';

const ui = {
  en: {
    navProjects: 'Projects',
    navAbout: 'Stack',
    navContact: 'Contact',
    cv: 'Download CV',
    heroTitle: 'Robust, scalable web applications.',
    heroDesc:
      "I'm Diogo, a Coding Academy graduate. I build with a strong focus on backend architecture and modern interfaces.",
    seeProjects: 'See my projects',
    projectsTitle: 'Projects',
    projectsDesc: 'Select a project to see its architecture, stack and repository.',
    otherTitle: 'Other work in production',
    liveSite: 'Open site',
    stackTitle: 'Stack',
    contactTitle: 'Contact',
    contactDesc: 'Open to junior software roles and freelance web projects.',
    architecture: 'Architecture',
    stackLabel: 'Stack',
    repo: 'View repository',
    close: 'Close',
    footer: '© 2026 Diogo Pinto. Built with React and Tailwind CSS.',
  },
  pt: {
    navProjects: 'Projetos',
    navAbout: 'Stack',
    navContact: 'Contacto',
    cv: 'Descarregar CV',
    heroTitle: 'Aplicações web robustas e escaláveis.',
    heroDesc:
      'Sou o Diogo, formado na Academia de Código. Construo soluções com forte ênfase em arquitetura de backend e interfaces modernas.',
    seeProjects: 'Ver projetos',
    projectsTitle: 'Projetos',
    projectsDesc: 'Escolhe um projeto para ver a arquitetura, a stack e o repositório.',
    otherTitle: 'Outros trabalhos em produção',
    liveSite: 'Abrir site',
    stackTitle: 'Stack',
    contactTitle: 'Contacto',
    contactDesc: 'Disponível para funções júnior em software e projetos web freelance.',
    architecture: 'Arquitetura',
    stackLabel: 'Stack',
    repo: 'Ver repositório',
    close: 'Fechar',
    footer: '© 2026 Diogo Pinto. Desenvolvido com React e Tailwind CSS.',
  },
};

const projects = [
  {
    id: 'fleetwise',
    title: 'FleetWise AI',
    subtitle: { en: 'Fleet management and optimization platform', pt: 'Plataforma de gestão e otimização de frotas' },
    description: {
      en: 'Advanced fleet management and optimization platform, built around robust architecture, efficiency and a smooth user experience.',
      pt: 'Plataforma avançada de gestão e otimização de frotas, construída em torno de arquitetura robusta, eficiência e boa experiência de utilização.',
    },
    architecture: {
      en: 'A robust backend service structure with REST APIs, database integration and efficient routing logic for high-demand fleet operations.',
      pt: 'Estrutura de serviços backend robusta, com APIs REST, integração com base de dados e lógica de routing eficiente para operações de frota de alta procura.',
    },
    tags: ['Java', 'Spring Boot', 'REST APIs', 'Fullstack', 'Maven'],
    repo: 'https://github.com/diogompintoo/FleetWiseAI',
  },
  {
    id: 'game-closet',
    title: 'Game Closet',
    subtitle: { en: 'Game collection manager', pt: 'Gestor de coleções de jogos' },
    description: {
      en: 'Interactive application for managing and organizing game collections, pairing efficient backend logic with a fluid interface.',
      pt: 'Aplicação interativa para gerir e organizar coleções de jogos, juntando lógica de backend eficiente a uma interface fluida.',
    },
    architecture: {
      en: 'A dynamic interface built with modern JavaScript and React components, structured data management and a clean UI.',
      pt: 'Interface dinâmica construída com componentes modernos em JavaScript e React, gestão de dados estruturada e UI limpa.',
    },
    tags: ['JavaScript', 'React', 'Frontend', 'UI/UX', 'Tailwind CSS'],
    repo: 'https://github.com/diogompintoo/GameCloset',
  },
  {
    id: 'game-closet',
    title: 'Game Closet',
    subtitle: { en: 'Game collection manager', pt: 'Gestor de coleções de jogos' },
    description: {
      en: 'Interactive application for managing and organizing game collections, pairing efficient backend logic with a fluid interface.',
      pt: 'Aplicação interativa para gerir e organizar coleções de jogos, juntando lógica de backend eficiente a uma interface fluida.',
    },
    architecture: {
      en: 'A dynamic interface built with modern JavaScript and React components, structured data management and a clean UI.',
      pt: 'Interface dinâmica construída com componentes modernos em JavaScript e React, gestão de dados estruturada e UI limpa.',
    },
    tags: ['JavaScript', 'React', 'Frontend', 'UI/UX', 'Tailwind CSS'],
    repo: 'https://github.com/diogompintoo/GameCloset',
  },
];

const otherWork = [
  {
    title: 'Parmigiano',
    description: { en: 'Commercial website, built and deployed to production.', pt: 'Website comercial, desenvolvido e em produção.' },
    link: 'https://parmigiano.pt/',
  },
  {
    title: 'Oh Petisco — QR menu',
    description: {
      en: 'Digital menu for a restaurant, served from Cloudflare Workers.',
      pt: 'Menu digital para restauração, servido a partir de Cloudflare Workers.',
    },
    link: 'https://hopetiscomenu.diogompintoo3.workers.dev/',
  },
];

const stack = [
  { group: 'Backend', items: ['Java', 'Spring Framework', 'Maven', 'REST APIs'] },
  { group: 'Frontend', items: ['JavaScript', 'React', 'HTML/CSS', 'Tailwind CSS'] },
  { group: 'Tools', items: ['Git & GitHub'] },
];

/* ---------- Small componentts ---------- */

// Um componente recebe "props" (os argumentos) e devolve JSX.
function Section({ id, title, description, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-20 border-t border-line px-6 py-16">
      <h2 className="font-display text-3xl font-semibold">{title}</h2>
      {description && <p className="mt-2 max-w-xl text-muted">{description}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Tag({ children }) {
  return <li className="rounded-full border border-line px-3 py-1 text-sm text-muted">{children}</li>;
}

/* ---------- APP ---------- */

export default function App() {
  const [lang, setLang] = useState('pt');
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState(null);

  const t = ui[lang];

  // useEffect corre "efeitos secundários" depois de o React desenhar
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-gold selection:text-on-gold">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-line bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-lg font-semibold">
            Diogo Pinto
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#projects" className="hidden hover:text-gold-ink sm:inline">{t.navProjects}</a>
            <a href="#about" className="hidden hover:text-gold-ink sm:inline">{t.navAbout}</a>
            <a href="#contact" className="hidden hover:text-gold-ink sm:inline">{t.navContact}</a>
            <a
              href="/cv.pdf"
              download
              className="rounded-md bg-gold px-3 py-1.5 font-semibold text-on-gold transition-colors hover:brightness-110"
            >
              {t.cv}
            </a>
            <button
              onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
              className="rounded-md border border-line px-2.5 py-1.5 font-semibold transition-colors hover:border-gold"
              aria-label={lang === 'en' ? 'Mudar para português' : 'Switch to English'}
            >
              {lang === 'en' ? 'PT' : 'EN'}
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="rounded-md border border-line px-2.5 py-1.5 transition-colors hover:border-gold"
              aria-label={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark ? '☀' : '☾'}
            </button>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <PixelGrid />
          <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-36">
            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.heroDesc}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-lg bg-gold px-6 py-3 font-semibold text-on-gold transition-colors hover:brightness-110"
              >
                {t.seeProjects}
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-ink/30 px-6 py-3 font-semibold transition-colors hover:border-gold"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* PROJETOS */}
        <Section id="projects" title={t.projectsTitle} description={t.projectsDesc}>
          <ul className="divide-y divide-line border-y border-line">
            {projects.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => setSelected(p)}
                  aria-haspopup="dialog"
                  className="group grid w-full gap-4 border-l-4 border-transparent py-8 pl-4 text-left transition-colors hover:border-gold hover:bg-surface/60 md:grid-cols-[1fr_2fr] md:gap-10"
                >
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted">{p.subtitle[lang]}</p>
                  </div>
                  <div>
                    <p className="leading-relaxed">{p.description[lang]}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </ul>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          <h3 className="mt-14 font-display text-xl font-semibold">{t.otherTitle}</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {otherWork.map((w) => (
              <li key={w.title} className="flex items-center justify-between gap-6 py-4">
                <div>
                  <p className="font-semibold">{w.title}</p>
                  <p className="text-sm text-muted">{w.description[lang]}</p>
                </div>
                <a
                  href={w.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 font-semibold text-gold-ink underline underline-offset-4 hover:no-underline"
                >
                  {t.liveSite}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        {/* STACK */}
        <Section id="about" title={t.stackTitle}>
          <dl className="grid gap-6 sm:grid-cols-3">
            {stack.map((s) => (
              <div key={s.group} className="border-l-2 border-gold pl-4">
                <dt className="font-display text-lg font-semibold">{s.group}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{s.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* CONTACTO */}
        <Section id="contact" title={t.contactTitle} description={t.contactDesc}>
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-semibold">
            {EMAIL && (
              <a href={`mailto:${EMAIL}`} className="text-gold-ink underline underline-offset-4 hover:no-underline">
                {EMAIL}
              </a>
            )}
            {LINKEDIN && (
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-gold-ink underline underline-offset-4 hover:no-underline">
                LinkedIn
              </a>
            )}
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-gold-ink underline underline-offset-4 hover:no-underline">
              GitHub
            </a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line px-6 py-10 text-center text-sm text-muted">{t.footer}</footer>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl border border-line bg-paper p-6 shadow-2xl md:p-8"
          >
            <h3 id="modal-title" className="font-display text-3xl font-semibold">{selected.title}</h3>
            <p className="mt-1 text-sm text-muted">{selected.subtitle[lang]}</p>

            <h4 className="mt-6 font-semibold">{t.architecture}</h4>
            <p className="mt-1 leading-relaxed text-muted">{selected.architecture[lang]}</p>

            <h4 className="mt-6 font-semibold">{t.stackLabel}</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </ul>

            <div className="mt-8 flex gap-3">
              <a
                href={selected.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-gold px-4 py-2 text-center font-semibold text-on-gold transition-colors hover:brightness-110"
              >
                {t.repo}
              </a>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-line px-4 py-2 font-semibold transition-colors hover:border-gold"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}