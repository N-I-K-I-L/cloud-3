import React from 'react';
import { Cpu, Zap, Activity, Grid, Terminal } from 'lucide-react';

export default function RoboticTemplate({ data }) {
    const name = data.name || 'CYBER_ENTITY';
    const role = data.about?.split('.')[0] || 'NEURAL_ARCHITECT';

    const skills = Array.isArray(data.skills) ? data.skills : [];
    const projects = Array.isArray(data.projects) ? data.projects : [];
    const experience = Array.isArray(data.work_experience) ? data.work_experience : [];

    return (
        <div className="min-h-full bg-[#020617] text-cyan-50 font-mono p-4 sm:p-12 overflow-y-auto selection:bg-cyan-500/30 relative">

            {/* Background Grid Pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.1)_0%,_transparent_70%)] pointer-events-none" />

            <div className="max-w-5xl mx-auto space-y-16 relative z-10">

                {/* Top Status Bar */}
                <div className="flex justify-between items-center text-[10px] tracking-[0.3em] text-cyan-500/50 border-b border-cyan-500/10 pb-4">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> SYSTEM_ACTIVE</span>
                        <span>SECURE_LINK_ESTABLISHED</span>
                    </div>
                    <div className="hidden sm:block">LOCAL_TIME: {new Date().toLocaleTimeString()}</div>
                </div>

                {/* Hero Section */}
                <header className="space-y-8 relative">
                    <div className="space-y-2">
                        <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
              // IDENT_CONFIRMED
                        </div>
                        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter uppercase leading-[0.8] mix-blend-screen"
                            style={{ textShadow: '0 0 30px rgba(34,211,238,0.4)' }}>
                            {name}
                        </h1>
                        <p className="text-xl sm:text-2xl text-cyan-400/80 font-bold max-w-2xl">
                            &gt; {role}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="h-1 w-24 bg-cyan-500 shadow-[0_0_15px_#22d3ee]" />
                        <div className="h-1 w-12 bg-pink-500 shadow-[0_0_15px_#f472b6]" />
                    </div>
                </header>

                {/* Narrative Module */}
                <section className="bg-slate-900/40 border border-cyan-500/10 p-8 rounded-tr-3xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30" />
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-xs font-bold text-cyan-500 uppercase tracking-widest">
                            <Activity size={14} /> Neural_Narrative
                        </div>
                        <p className="text-lg text-cyan-100/70 leading-relaxed italic">
                            "{data.about}"
                        </p>
                    </div>
                </section>

                {/* Content Lattice */}
                <div className="grid md:grid-cols-12 gap-8">

                    {/* Main Column */}
                    <div className="md:col-span-8 space-y-12">

                        {/* Project Nodes */}
                        <section className="space-y-8">
                            <h2 className="text-sm font-bold text-cyan-500 uppercase tracking-[0.4em] flex items-center gap-3">
                                <Grid size={16} /> Constructs_Database
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {projects.map((p, i) => {
                                    const title = typeof p === 'string' ? p.split(':')[0] : (p.title || 'Untitled');
                                    const desc = typeof p === 'string' ? p.split(':').slice(1).join(':') : (p.description || '');
                                    return (
                                        <div key={i} className="bg-slate-950 border-l border-cyan-500/20 p-6 space-y-4 hover:bg-cyan-500/[0.02] hover:border-cyan-500/50 transition-all group">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-bold text-cyan-100 group-hover:text-cyan-400 transition-colors uppercase">{title}</h3>
                                                <Zap size={14} className="text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <p className="text-xs text-cyan-100/50 leading-relaxed">
                                                {desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Exp Log */}
                        <section className="space-y-8">
                            <h2 className="text-sm font-bold text-cyan-500 uppercase tracking-[0.4em] flex items-center gap-3">
                                <Terminal size={16} /> Operational_History
                            </h2>
                            <div className="space-y-4">
                                {experience.map((exp, i) => {
                                    const title = typeof exp === 'string' ? exp : (exp.role || exp.description);
                                    return (
                                        <div key={i} className="flex gap-6 items-center bg-cyan-500/[0.03] border border-cyan-500/5 p-4 group">
                                            <div className="w-10 h-10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 group-hover:border-cyan-500 transition-colors">
                                                0{i + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-cyan-50 uppercase tracking-wider">{title}</h3>
                                                <p className="text-[10px] text-cyan-700 font-bold tracking-widest mt-1">STATUS: COMPLETED</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <sidebar className="md:col-span-4 space-y-12">

                        {/* Tech Specs */}
                        <section className="space-y-6">
                            <h2 className="text-sm font-bold text-cyan-500 uppercase tracking-[0.4em]">Tech_Specs</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-slate-900 border border-cyan-500/20 text-[10px] text-cyan-400 uppercase font-bold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all cursor-crosshair">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Comm Link */}
                        <section className="bg-cyan-500/5 border border-cyan-500/20 p-6 space-y-6 relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-cyan-400/10 blur-3xl rounded-full" />
                            <div className="space-y-2 relative z-10">
                                <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Connect_Link</p>
                                <a href={`mailto:${data.contact?.email}`} className="block text-sm font-bold text-cyan-100 hover:text-cyan-400 transition-colors truncate">
                                    {data.contact?.email || 'OFFLINE'}
                                </a>
                            </div>
                            <button className="w-full py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-cyan-500 hover:text-[#020617] transition-all">
                // EXECUTE_CONTACT
                            </button>
                        </section>

                    </sidebar>
                </div>

                {/* Footer */}
                <footer className="pt-12 border-t border-cyan-500/10 text-[10px] font-bold text-cyan-700 tracking-[0.5em] text-center uppercase">
                    © {new Date().getFullYear()} {name} // ALL_RIGHTS_RESERVED
                </footer>

            </div>
        </div>
    );
}

