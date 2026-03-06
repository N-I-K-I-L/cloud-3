import React from 'react';
import { Cpu, Zap, Activity, Grid } from 'lucide-react';

export function RoboticTemplate({ data }) {
    const name = data.name || 'CYBER_ENTITY';
    const role = data.about?.split('.')[0] || 'NEURAL_ARCHITECT';

    const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : []);
    const tech = Array.isArray(data.technologies) ? data.technologies : (data.technologies ? data.technologies.split(',') : []);
    const allSkills = [...new Set([...skills, ...tech])].map(s => s.trim()).filter(Boolean);

    const projects = Array.isArray(data.projects) ? data.projects : [];
    const experience = Array.isArray(data.work_experience) ? data.work_experience : [];

    return (
        <div className="min-h-full bg-slate-950 text-cyan-50 font-sans p-4 sm:p-8 overflow-y-auto selection:bg-cyan-500/30">

            {/* Background Grid Pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_#083344_0%,_transparent_70%)] pointer-events-none" />

            <div className="max-w-5xl mx-auto space-y-12 relative z-10">

                {/* Header Ribbon */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-cyan-500/50 pb-6 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />

                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-cyan-400 mb-2">
                            <Cpu size={20} className="animate-pulse" />
                            <span className="font-mono text-xs tracking-[0.2em] font-bold">SYSTEM_ONLINE</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase " style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}>
                            {name}
                        </h1>
                        <p className="text-cyan-400 font-mono tracking-widest text-sm py-1 px-3 bg-cyan-950/50 border border-cyan-500/30 inline-block">
              // {role}
                        </p>
                    </div>

                    <div className="flex items-end gap-6 text-sm font-mono text-cyan-600">
                        <div className="text-right">
                            <p>RAM_USAGE</p>
                            <p className="text-cyan-400 text-lg">7.2/16 TB</p>
                        </div>
                        <div className="text-right">
                            <p>CPU_TEMP</p>
                            <p className="text-cyan-400 text-lg animate-pulse">48°C</p>
                        </div>
                    </div>
                </header>

                {/* About Grid */}
                <section className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/50 border border-cyan-900/50 p-6 md:p-10 rounded-br-3xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />

                    <div>
                        <div className="flex items-center gap-2 text-cyan-400 mb-4 font-mono font-bold">
                            <Activity size={18} />
                            <span>CORE_DIRECTIVE</span>
                        </div>
                        <p className="text-cyan-100/80 leading-relaxed text-lg">
                            {data.about || 'Awaiting initial programming...'}
                        </p>
                    </div>

                    {/* Stats visualization */}
                    <div className="space-y-4 font-mono text-xs">
                        <div className="space-y-1">
                            <div className="flex justify-between text-cyan-500"><span>FRONTEND_SYNAPSE</span><span>92%</span></div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 w-[92%]" /></div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-cyan-500"><span>BACKEND_INFRA</span><span>85%</span></div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-fuchsia-500 w-[85%]" /></div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-cyan-500"><span>NEURAL_NET_AI</span><span>78%</span></div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[78%]" /></div>
                        </div>
                    </div>
                </section>

                {/* Modules Grid */}
                <div className="grid md:grid-cols-12 gap-8">

                    {/* Main Column */}
                    <div className="md:col-span-8 space-y-8">
                        {/* Experience / Chronology */}
                        <section className="bg-slate-900/40 border border-slate-800 p-6 sm:p-8 relative">
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50" />
                            <h2 className="text-xl font-mono font-bold text-cyan-400 mb-6 flex items-center gap-3">
                                <Grid size={18} /> &gt; EXECUTION_LOG
                            </h2>

                            <div className="space-y-6 relative before:absolute before:inset-0 before:left-2 before:w-px before:bg-cyan-900/50">
                                {experience.length > 0 ? experience.map((exp, i) => {
                                    const title = typeof exp === 'string' ? exp : (exp.role || exp.description);
                                    return (
                                        <div key={i} className="pl-8 relative">
                                            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center">
                                                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                                            </div>
                                            <h3 className="text-lg font-bold text-cyan-50">{title}</h3>
                                            <p className="text-cyan-600/60 font-mono mt-1 text-sm bg-slate-900 inline-block px-2">Cycle 0{i + 1}</p>
                                        </div>
                                    );
                                }) : <p className="text-cyan-700 font-mono">No historical data found.</p>}
                            </div>
                        </section>

                        {/* Projects */}
                        <section className="bg-slate-900/40 border border-slate-800 p-6 sm:p-8 relative">
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-fuchsia-500/50" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-fuchsia-500/50" />
                            <h2 className="text-xl font-mono font-bold text-fuchsia-400 mb-6 flex items-center gap-3">
                                <Zap size={18} /> &gt; CONSTRUCTS_DEPLOYED
                            </h2>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {projects.length > 0 ? projects.map((p, i) => {
                                    const title = typeof p === 'string' ? p.split(':')[0] : (p.title || 'Untitled');
                                    const desc = typeof p === 'string' ? p.split(':').slice(1).join(':') : (p.description || '');
                                    return (
                                        <div key={i} className="bg-slate-950 border border-fuchsia-900/30 p-5 hover:border-fuchsia-500/60 transition-colors group">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-fuchsia-300 font-bold group-hover:text-fuchsia-400 transition-colors">{title}</h3>
                                                <span className="text-xs font-mono text-fuchsia-700">v{parseInt(i) + 1}.0</span>
                                            </div>
                                            <p className="text-cyan-100/60 text-sm leading-relaxed">{desc}</p>
                                        </div>
                                    );
                                }) : <p className="text-fuchsia-700 font-mono">No constructs detected.</p>}
                            </div>
                        </section>
                    </div>

                    {/* Side Column */}
                    <div className="md:col-span-4 space-y-8">
                        {/* Skills Hex Grid */}
                        <section className="bg-slate-900/40 border border-slate-800 p-6 relative">
                            <h2 className="text-sm font-mono font-bold text-cyan-500 mb-4 uppercase tracking-widest border-b border-cyan-900/50 pb-2">
                // Hardware_Specs
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {allSkills.map((skill, i) => (
                                    <div key={i} className="bg-cyan-950/40 border border-cyan-800/50 text-cyan-200 text-xs font-mono px-3 py-1.5 hover:bg-cyan-900 transition-colors">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Comm Link */}
                        <section className="bg-cyan-950/20 border border-cyan-500/30 p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
                            <h2 className="text-sm font-mono font-bold text-cyan-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                Live_Comm_Link
                            </h2>

                            <div className="space-y-4 font-mono text-sm relative z-10">
                                {data.contact?.email && (
                                    <div className="flex flex-col">
                                        <span className="text-cyan-700 mb-1">DATA_STREAM:</span>
                                        <a href={`mailto:${data.contact.email}`} className="text-cyan-300 hover:text-cyan-100 underline decoration-cyan-900 underline-offset-4">{data.contact.email}</a>
                                    </div>
                                )}
                                {data.contact?.phone && (
                                    <div className="flex flex-col mt-4">
                                        <span className="text-cyan-700 mb-1">VOICE_PROTOCOL:</span>
                                        <span className="text-cyan-300">{data.contact.phone}</span>
                                    </div>
                                )}
                                <div className="mt-8 pt-4 border-t border-cyan-900/30">
                                    <button className="w-full bg-cyan-950/50 border border-cyan-500/50 text-cyan-400 py-3 uppercase tracking-widest text-xs hover:bg-cyan-900/80 transition-colors flex items-center justify-center gap-2">
                                        <Zap size={14} /> Establish Connection
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    );
}
