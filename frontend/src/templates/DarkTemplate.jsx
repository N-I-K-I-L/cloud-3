import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, ChevronDown, Download } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30">

      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {data.name?.split(' ')[0]}<span className="text-white">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link.toLowerCase())}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h2 className="text-blue-400 font-medium tracking-widest uppercase text-sm md:text-base">
            {data.about?.split('.')[0] || 'Welcome to my portfolio'}
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I'm <br className="md:hidden" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {data.name}
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
            {data.about}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 rounded-full bg-white text-slate-950 font-semibold hover:scale-105 transition-transform duration-300"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-white/40 transition-all duration-300 flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Main Content Wrapper */}
      <div className="max-w-5xl mx-auto px-6 py-24 space-y-32">

        {/* About Section */}
        <section id="about" className="scroll-mt-24">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative aspect-square backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center">
                {/* Fallback avatar if no image provided */}
                <div className="text-9xl font-bold text-slate-800">
                  {data.name?.charAt(0)}
                </div>
              </div>
            </div>
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
              <div className="w-12 h-1 bg-purple-500 rounded"></div>
              <p className="text-lg text-slate-400 leading-relaxed">
                {data.about}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h3 className="text-slate-300 font-medium mb-1">Location</h3>
                  <p className="text-slate-500 flex items-center gap-2"><MapPin size={16} /> Remote / Global</p>
                </div>
                <div>
                  <h3 className="text-slate-300 font-medium mb-1">Email</h3>
                  <p className="text-slate-500 flex items-center gap-2"><Mail size={16} /> {data.contact_email?.split('@')[0]}@...</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-24">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white">Technical Arsenal</h2>
            <div className="w-12 h-1 bg-purple-500 rounded mt-6"></div>
          </div>

          <div className="flex flex-wrap gap-3">
            {(data.technologies || data.skills || []).map((skill, idx) => (
              <div
                key={idx}
                className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Work</h2>
            <div className="w-12 h-1 bg-purple-500 rounded mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {(data.projects || []).map((project, idx) => {
              const parts = project.split(':');
              const title = parts[0];
              const desc = parts.slice(1).join(':').trim();

              return (
                <div
                  key={idx}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col h-full"
                >
                  {/* Subtle top gradient on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-lg text-purple-400">
                      <Github size={24} />
                    </div>
                    <div className="flex gap-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="hover:text-white"><Github size={20} /></button>
                      <button className="hover:text-white"><ExternalLink size={20} /></button>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-400 mb-6 flex-grow">
                    {desc || 'A comprehensive application built to solve advanced workflow challenges.'}
                  </p>

                  {/* Fake tech tags for visual flair based on global skills */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                    {(data.technologies || data.skills || []).slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs font-mono text-purple-400/80 bg-purple-500/10 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Experience & Education Grid */}
        <section id="experience" className="scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Experience */}
            <div>
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white">Experience</h2>
                <div className="w-12 h-1 bg-purple-500 rounded mt-6"></div>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {(data.work_experience || []).map((exp, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-0">
                    <div className="md:hidden absolute left-5 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-950 border-2 border-purple-500"></div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-bold text-white">{exp.role || exp.description || exp}</h3>
                      <p className="text-purple-400 text-sm font-medium mt-1">Company / Organization</p>
                      <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                        Demonstrated expertise in software development lifecycles and modern architecture. Delivered high-quality solutions while collaborating with cross-functional teams.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white">Education</h2>
                <div className="w-12 h-1 bg-purple-500 rounded mt-6"></div>
              </div>

              <div className="space-y-6">
                {(data.education || []).map((edu, idx) => {
                  const parts = typeof edu === 'string' ? edu.split(',') : [edu.degree, edu.institution];
                  return (
                    <div key={idx} className="group flex gap-5 p-6 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        🎓
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{parts[0]}</h3>
                        <p className="text-slate-400 mt-1">{parts[1] || 'University / Institution'}</p>
                        <p className="text-slate-500 text-sm mt-3 border-l-2 border-white/10 pl-3">
                          Focused on computer science fundamentals, algorithms, and full-stack development.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24 pt-12 pb-24 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's work <br className="hidden md:block" />together.</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-md">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="space-y-6">
                {data.contact_email && (
                  <a href={`mailto:${data.contact_email}`} className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-0.5">Email</p>
                      <p className="font-medium">{data.contact_email}</p>
                    </div>
                  </a>
                )}

                {data.contact_phone && (
                  <a href={`tel:${data.contact_phone}`} className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-0.5">Phone</p>
                      <p className="font-medium">{data.contact_phone}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Simple Contact Form UI */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                  <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                  <textarea rows="4" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none" placeholder="Hello, I'd like to discuss..."></textarea>
                </div>
                <button type="submit" className="w-full bg-white text-slate-950 font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${data.contact_email}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
