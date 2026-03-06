import React from 'react';
import { Briefcase, GraduationCap, Code, Mail, ArrowUpRight } from 'lucide-react';

export default function CardTemplate({ data }) {
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const education = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="min-h-full bg-[#f4f4f5] text-[#18181b] font-sans p-6 sm:p-10 md:p-16 selection:bg-amber-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Profile Card */}
        <header className="md:col-span-4 bg-white rounded-[32px] p-8 sm:p-12 shadow-sm border border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-amber-200/50 transition-colors duration-500" />
          <div className="relative z-10 space-y-6 text-center md:text-left">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-[#18181b]">
              {data.name}
            </h1>
            <p className="text-xl text-[#71717a] max-w-2xl font-medium leading-relaxed">
              {data.about}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href={`mailto:${data.contact?.email}`} className="bg-[#18181b] text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform">
                <Mail size={18} /> Contact Me
              </a>
            </div>
          </div>
        </header>

        {/* Skills Bento */}
        <section className="md:col-span-2 bg-amber-500 text-white rounded-[32px] p-8 shadow-sm relative overflow-hidden group">
          <Code className="absolute bottom-4 right-4 text-white/20 w-32 h-32 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 italic uppercase tracking-tighter">
              <Code size={24} /> Toolbox
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Education Bento */}
        <section className="md:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-black/5 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 italic uppercase tracking-tighter text-amber-600">
              <GraduationCap size={24} /> Knowledge
            </h2>
            <div className="space-y-4">
              {education.map((edu, i) => {
                const parts = typeof edu === 'string' ? edu.split(',') : [edu.degree, edu.institution];
                return (
                  <div key={i} className="border-b border-zinc-100 pb-4 last:border-0">
                    <h3 className="font-bold text-lg">{parts[0]}</h3>
                    <p className="text-zinc-500 text-sm">{parts[1]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <h2 className="col-span-full text-4xl font-black italic uppercase tracking-tighter text-[#18181b] mt-8 mb-2">
            Recent Ventures
          </h2>
          {projects.map((project, i) => {
            const title = typeof project === 'string' ? project.split(':')[0] : (project.title || 'Untitled');
            const desc = typeof project === 'string' ? project.split(':').slice(1).join(':') : (project.description || '');
            return (
              <div key={i} className="group bg-white rounded-[32px] p-8 shadow-sm border border-black/5 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300 flex flex-col justify-between aspect-square">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                      <Briefcase size={24} />
                    </div>
                    <ArrowUpRight className="text-zinc-300 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-amber-600 transition-colors">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-4">
                    {desc}
                  </p>
                </div>
                <div className="pt-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Project_No. 0{i + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="md:col-span-4 py-16 text-center border-t border-zinc-200 mt-12">
          <p className="text-zinc-400 font-medium">© {new Date().getFullYear()} Manufactured by {data.name}</p>
        </footer>

      </div>
    </div>
  );
}

