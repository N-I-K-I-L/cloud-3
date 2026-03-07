import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, ChevronDown, Download, Sparkles } from 'lucide-react';

export default function DarkTemplate({ data }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const experience = Array.isArray(data.work_experience) ? data.work_experience : [];

  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 font-sans selection:bg-blue-500/30">

      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-white uppercase italic">
            {data.name?.split(' ')[0]}<span className="text-blue-500">_</span>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link.toLowerCase())}
                className="text-slate-500 hover:text-white transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111827_0%,_#000000_100%)] z-0"></div>

        {/* Animated Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Sparkles size={14} /> Available for projects
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tight text-white leading-[0.9] uppercase italic">
            {data.name}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-slate-400 font-medium leading-relaxed italic">
            "{data.about}"
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-12 py-5 rounded-full bg-blue-600 text-white font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:scale-105"
            >
              The Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-12 py-5 rounded-full border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Get In Touch
            </button>
          </div>
        </div>


      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-32 space-y-48">

        {/* About Section */}
        <section id="about" className="scroll-mt-32">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <div className="w-full h-full flex items-center justify-center text-9xl font-black text-black bg-zinc-800">
                  {data.name?.charAt(0)}
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl -z-10"></div>
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">Behind The Identity</h2>
              <p className="text-xl text-slate-400 leading-relaxed font-light">
                {data.about}
              </p>
              <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/5">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-2">Location_</h3>
                  <p className="text-white font-bold">Earth / Remote</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-2">Experience_</h3>
                  <p className="text-white font-bold">{experience.length}+ Major Cycles</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-32">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white mb-16">Technical Mastery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-center font-bold uppercase tracking-widest text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-32">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white mb-16">The Portfolio</h2>
          <div className="space-y-32">
            {projects.map((project, idx) => {
              const parts = typeof project === 'string' ? project.split(':') : [project.title, project.description];
              const title = parts[0];
              const desc = parts.slice(1).join(':').trim();

              return (
                <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center group`}>
                  <div className="w-full md:w-1/2 aspect-video bg-zinc-900 rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-blue-600/[0.05] group-hover:bg-transparent transition-colors duration-500" />
                    <div className="w-full h-full flex items-center justify-center text-zinc-800 font-black text-6xl italic group-hover:scale-110 transition-transform duration-700 uppercase tracking-tighter">
                      Project_0{idx + 1}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 space-y-6">
                    <span className="text-blue-500 font-mono text-sm uppercase tracking-widest italic font-bold">Case Study 0{idx + 1}_</span>
                    <h3 className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors uppercase italic">{title}</h3>
                    <p className="text-lg text-slate-400 leading-relaxed font-light">
                      {desc || "A sophisticated architecture designed to push the boundaries of digital interaction and functional excellence."}
                    </p>
                    <button className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-[10px] mt-4 hover:text-blue-500 transition-colors group">
                      Explore Project <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-32 text-center space-y-12 py-32 bg-[radial-gradient(circle_at_center,_#111827_0%,_transparent_70%)] rounded-[100px]">
          <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none">
            Ready to initiate <br /> a collaboration?
          </h2>
          <p className="text-xl text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            I'm currently scouting for high-impact partnerships. Reach out if you're looking to build something extraordinary.
          </p>
          <div className="pt-8 flex flex-col items-center gap-8">
            <a href={`mailto:${data.contact?.email}`} className="text-3xl md:text-5xl font-black text-white hover:text-blue-500 transition-colors border-b-4 border-blue-600 pb-2">
              {data.contact?.email || "CONTACT@STUDIO.ID"}
            </a>
            <div className="flex gap-8">
              <a href="#" className="text-slate-500 hover:text-blue-400 font-black uppercase tracking-[0.2em] text-[10px]">LinkedIn_</a>
              <a href="#" className="text-slate-500 hover:text-blue-400 font-black uppercase tracking-[0.2em] text-[10px]">GitHub_</a>
              <a href="#" className="text-slate-500 hover:text-blue-400 font-black uppercase tracking-[0.2em] text-[10px]">Dribbble_</a>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          <p>© {new Date().getFullYear()} {data.name} Studio. All rights reserved.</p>
          <div className="flex gap-12">
            <span>Built with Precision</span>
            <span>Est. 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Minimal Arrow Icon Helper
const ArrowUpRight = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

