import React, { useState, useEffect } from 'react';
import { Terminal, Command, ChevronRight } from 'lucide-react';

export default function TerminalTemplate({ data }) {
    const [typedLines, setTypedLines] = useState([]);
    const [isTyping, setIsTyping] = useState(true);

    const name = data.name || 'GUEST USER';
    const role = data.about?.split('.')[0] || 'SYSTEM OPERATOR';

    const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : []);
    const tech = Array.isArray(data.technologies) ? data.technologies : (data.technologies ? data.technologies.split(',') : []);
    const allSkills = [...new Set([...skills, ...tech])].map(s => s.trim()).filter(Boolean);

    const projects = Array.isArray(data.projects) ? data.projects : [];
    const experience = Array.isArray(data.work_experience) ? data.work_experience : [];

    const bootSequence = [
        `Initializing system for ${name}...`,
        'Loading kernel modules...',
        'Mounting file systems...',
        '[OK] Network interface eth0 up',
        '[OK] Authenticated user',
        `Welcome, ${role}. Type 'help' for commands.`,
    ];

    useEffect(() => {
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < bootSequence.length) {
                setTypedLines(prev => [...prev, bootSequence[currentLine]]);
                currentLine++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, 200);
        return () => clearInterval(interval);
    }, [name, role]);

    return (
        <div className="min-h-full bg-black text-green-500 font-mono p-4 sm:p-8 overflow-y-auto selection:bg-green-500 selection:text-black">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <header className="border-b border-green-500/30 pb-4 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2">~/{name.toLowerCase().replace(/\s+/g, '_')}</h1>
                        <p className="text-green-400/70 text-sm">OS: Portfolio v2.0 <br /> Uptime: {new Date().toLocaleTimeString()}</p>
                    </div>
                    <Terminal size={32} className="text-green-500 hidden sm:block opacity-50" />
                </header>

                {/* Boot Sequence */}
                <section className="space-y-1 opacity-70 text-sm">
                    {typedLines.map((line, i) => (
                        <div key={i} className="flex gap-2">
                            <span className="text-green-700">[{new Date().toISOString().split('T')[1].slice(0, 8)}]</span>
                            <span>{line}</span>
                        </div>
                    ))}
                    {isTyping && <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-2" />}
                </section>

                {!isTyping && (
                    <div className="space-y-10 animate-fade-in pt-4">

                        {/* About / System Info */}
                        <section>
                            <div className="flex items-center gap-2 text-green-400 mb-4">
                                <ChevronRight size={18} />
                                <span className="font-bold">cat about.txt</span>
                            </div>
                            <div className="pl-6 border-l-2 border-green-900 leading-relaxed text-green-300">
                                {data.about || 'No description found in system logs.'}
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <div className="flex items-center gap-2 text-green-400 mb-4">
                                <ChevronRight size={18} />
                                <span className="font-bold">ls /skills</span>
                            </div>
                            <div className="pl-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-green-300">
                                {allSkills.length > 0 ? allSkills.map((skill, i) => (
                                    <div key={i} className="flex items-center gap-2 before:content-['-'] before:text-green-700">
                                        {skill}
                                    </div>
                                )) : <p className="text-green-700">Directory empty.</p>}
                            </div>
                        </section>

                        {/* Projects */}
                        <section>
                            <div className="flex items-center gap-2 text-green-400 mb-4">
                                <ChevronRight size={18} />
                                <span className="font-bold">./run_projects.sh</span>
                            </div>
                            <div className="pl-6 space-y-6">
                                {projects.length > 0 ? projects.map((p, i) => {
                                    const title = typeof p === 'string' ? p.split(':')[0] : (p.title || 'Untitled');
                                    const desc = typeof p === 'string' ? p.split(':').slice(1).join(':') : (p.description || '');
                                    return (
                                        <div key={i} className="border border-green-900 bg-green-950/20 p-4">
                                            <h3 className="text-lg font-bold text-green-400 mb-2">[{title}]</h3>
                                            <p className="text-green-500/80 text-sm">{desc}</p>
                                        </div>
                                    );
                                }) : <p className="text-green-700">No executable projects found.</p>}
                            </div>
                        </section>

                        {/* Experience */}
                        <section>
                            <div className="flex items-center gap-2 text-green-400 mb-4">
                                <ChevronRight size={18} />
                                <span className="font-bold">tail -f /var/log/experience.log</span>
                            </div>
                            <div className="pl-6 space-y-2 font-mono text-sm opacity-90">
                                {experience.length > 0 ? experience.map((exp, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="text-green-700 shrink-0">ENTRY {String(i + 1).padStart(3, '0')} :</span>
                                        <span className="text-green-300">{typeof exp === 'string' ? exp : (exp.role || exp.description)}</span>
                                    </div>
                                )) : <p className="text-green-700">Log file empty.</p>}
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="pb-12">
                            <div className="flex items-center gap-2 text-green-400 mb-4">
                                <ChevronRight size={18} />
                                <span className="font-bold animate-pulse">ping contact...</span>
                            </div>
                            <div className="pl-6 border border-green-900 p-4">
                                <div className="grid gap-2 text-sm">
                                    {data.contact?.email ? <p className="flex gap-4"><span className="text-green-700 w-16">EMAIL:</span> <a href={`mailto:${data.contact.email}`} className="text-green-400 hover:underline">{data.contact.email}</a></p> : null}
                                    {data.contact?.phone ? <p className="flex gap-4"><span className="text-green-700 w-16">PHONE:</span> <span>{data.contact.phone}</span></p> : null}
                                    <p className="flex gap-4 mt-4 pt-4 border-t border-green-900"><span className="text-green-700">STATUS:</span> <span className="text-green-400 animate-pulse">LISTENING ON PORT 8080</span></p>
                                </div>
                            </div>
                        </section>

                    </div>
                )}
            </div>

            {/* Custom Styles for Animation */}
            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
