import React from 'react';

export default function MinimalTemplate({ data }) {
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const experience = Array.isArray(data.work_experience) ? data.work_experience : [];

  return (
    <div className="min-h-full bg-[#fcfcfc] text-[#09090b] font-sans px-8 py-20 sm:px-16 md:px-24">
      <div className="max-w-3xl mx-auto space-y-24">

        {/* Header */}
        <header className="space-y-6">
          <h1 className="text-6xl sm:text-7xl font-serif tracking-tight leading-tight">
            {data.name}
          </h1>
          <p className="text-xl sm:text-2xl text-[#71717a] font-light leading-relaxed max-w-2xl">
            {data.about}
          </p>
        </header>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-sm uppercase tracking-widest text-[#a1a1aa] font-bold">Expertise</h2>
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              {skills.map((skill, i) => (
                <span key={i} className="text-lg font-medium border-b border-[#e4e4e7] pb-1">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="space-y-12">
            <h2 className="text-sm uppercase tracking-widest text-[#a1a1aa] font-bold">Selected Work</h2>
            <div className="space-y-16">
              {projects.map((project, i) => {
                const title = typeof project === 'string' ? project.split(':')[0] : (project.title || 'Untitled');
                const desc = typeof project === 'string' ? project.split(':').slice(1).join(':') : (project.description || '');
                return (
                  <div key={i} className="group space-y-3">
                    <h3 className="text-3xl font-serif border-l-2 border-transparent group-hover:border-indigo-600 pl-0 group-hover:pl-6 transition-all duration-300">
                      {title}
                    </h3>
                    <p className="text-[#52525b] text-lg leading-relaxed max-w-2xl">
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="space-y-12">
            <h2 className="text-sm uppercase tracking-widest text-[#a1a1aa] font-bold">Chronology</h2>
            <div className="space-y-8">
              {experience.map((exp, i) => {
                const title = typeof exp === 'string' ? exp : (exp.role || exp.description);
                return (
                  <div key={i} className="flex justify-between items-baseline border-b border-[#f4f4f5] pb-6">
                    <h3 className="text-xl font-medium text-[#18181b]">{title}</h3>
                    <span className="text-sm font-mono text-[#a1a1aa]">0{i + 1}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact */}
        <footer className="pt-24 border-t border-[#e4e4e7] flex flex-col sm:flex-row justify-between items-start gap-8">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-widest text-[#a1a1aa] font-bold">Get in touch</p>
            <a href={`mailto:${data.contact?.email}`} className="text-2xl font-serif hover:text-indigo-600 transition-colors">
              {data.contact?.email || 'hello@example.com'}
            </a>
          </div>
          <p className="text-sm text-[#a1a1aa] font-mono">© {new Date().getFullYear()} {data.name}</p>
        </footer>

      </div>
    </div>
  );
}

