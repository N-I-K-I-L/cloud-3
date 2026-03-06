export function generateDarkHtml(data) {
    const name = data.name || 'Developer';
    const firstName = name.split(' ')[0];
    const about = data.about || 'Welcome to my portfolio';

    const email = data.contact?.email || data.contact_email || '';
    const phone = data.contact?.phone || data.contact_phone || '';

    // Safe extraction for arrays
    const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',').map(s => s.trim()) : []);
    const technologies = Array.isArray(data.technologies) ? data.technologies : (data.technologies ? data.technologies.split(',').map(s => s.trim()) : []);
    const allSkills = [...new Set([...skills, ...technologies])].filter(Boolean);

    let projectsHtml = '';
    const projects = Array.isArray(data.projects) ? data.projects : [];
    projects.forEach((proj) => {
        let title = proj.title || '';
        let desc = proj.description || '';
        if (typeof proj === 'string') {
            const parts = proj.split(':');
            title = parts[0];
            desc = parts.slice(1).join(':').trim();
        }

        let tagsHtml = '';
        allSkills.slice(0, 3).forEach(tech => {
            tagsHtml += `<span class="text-xs font-mono text-purple-400/80 bg-purple-500/10 px-2 py-1 rounded">${tech}</span>`;
        });

        projectsHtml += `
      <div class="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col h-full">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="flex justify-between items-start mb-6">
          <div class="p-3 bg-white/5 rounded-lg text-purple-400">
            <i data-lucide="github" class="w-6 h-6"></i>
          </div>
          <div class="flex gap-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="hover:text-white"><i data-lucide="github" class="w-5 h-5"></i></button>
            <button class="hover:text-white"><i data-lucide="external-link" class="w-5 h-5"></i></button>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">${title}</h3>
        <p class="text-slate-400 mb-6 flex-grow">${desc || 'A comprehensive application built to solve advanced workflow challenges.'}</p>
        <div class="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
          ${tagsHtml}
        </div>
      </div>
    `;
    });

    let experienceHtml = '';
    const experience = Array.isArray(data.work_experience) ? data.work_experience : [];
    experience.forEach((exp) => {
        const role = typeof exp === 'string' ? exp : (exp.role || exp.description);
        experienceHtml += `
      <div class="relative pl-8 md:pl-0">
        <div class="md:hidden absolute left-5 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-950 border-2 border-purple-500"></div>
        <div class="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
          <h3 class="text-xl font-bold text-white">${role}</h3>
          <p class="text-purple-400 text-sm font-medium mt-1">Company / Organization</p>
          <p class="text-slate-400 mt-4 text-sm leading-relaxed">
            Demonstrated expertise in software development lifecycles and modern architecture. Delivered high-quality solutions while collaborating with cross-functional teams.
          </p>
        </div>
      </div>
    `;
    });

    let educationHtml = '';
    const eduArr = Array.isArray(data.education) ? data.education : [];
    eduArr.forEach((edu) => {
        let degree = edu.degree || '';
        let inst = edu.institution || '';
        if (typeof edu === 'string') {
            const parts = edu.split(',');
            degree = parts[0];
            inst = parts.slice(1).join(',').trim();
        }
        educationHtml += `
      <div class="group flex gap-5 p-6 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all">
        <div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
          🎓
        </div>
        <div>
          <h3 class="text-xl font-bold text-white">${degree}</h3>
          <p class="text-slate-400 mt-1">${inst || 'University / Institution'}</p>
          <p class="text-slate-500 text-sm mt-3 border-l-2 border-white/10 pl-3">
            Focused on computer science fundamentals, algorithms, and full-stack development.
          </p>
        </div>
      </div>
    `;
    });

    let skillsHtml = '';
    allSkills.forEach(skill => {
        skillsHtml += `<div class="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-default">${skill}</div>`;
    });

    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30">

    <!-- Sticky Navigation -->
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-6">
        <div class="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <div class="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ${firstName}<span class="text-white">.</span>
            </div>
            <div class="hidden md:flex gap-8 text-sm font-medium tracking-wide">
                <a href="#about" class="text-slate-400 hover:text-white transition-colors">About</a>
                <a href="#skills" class="text-slate-400 hover:text-white transition-colors">Skills</a>
                <a href="#projects" class="text-slate-400 hover:text-white transition-colors">Projects</a>
                <a href="#experience" class="text-slate-400 hover:text-white transition-colors">Experience</a>
                <a href="#contact" class="text-slate-400 hover:text-white transition-colors">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 z-0"></div>
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div class="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-[fade-in-up_1s_ease-out]">
            <h2 class="text-blue-400 font-medium tracking-widest uppercase text-sm md:text-base">
                ${about.split('.')[0] || 'Welcome to my portfolio'}
            </h2>
            <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <br class="md:hidden" />
                <span class="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                    ${name}
                </span>
            </h1>
            <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
                ${about}
            </p>

            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <a href="#projects" class="px-8 py-3 rounded-full bg-white text-slate-950 font-semibold hover:scale-105 transition-transform duration-300">
                    View Projects
                </a>
                <a href="#contact" class="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-white/40 transition-all duration-300 flex items-center gap-2">
                    <i data-lucide="mail" class="w-5 h-5"></i>
                    Contact Me
                </a>
            </div>
        </div>

        <a href="#about" class="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors animate-bounce">
            <i data-lucide="chevron-down" class="w-8 h-8"></i>
        </a>
    </section>

    <!-- Main Content Wrapper -->
    <div class="max-w-5xl mx-auto px-6 py-24 space-y-32">

        <!-- About Section -->
        <section id="about" class="scroll-mt-24">
            <div class="grid md:grid-cols-12 gap-12 items-center">
                <div class="md:col-span-5 relative group">
                    <div class="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div class="relative aspect-square backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center">
                        <div class="text-9xl font-bold text-slate-800">${name.charAt(0)}</div>
                    </div>
                </div>
                <div class="md:col-span-7 space-y-6">
                    <h2 class="text-3xl md:text-4xl font-bold text-white">About Me</h2>
                    <div class="w-12 h-1 bg-purple-500 rounded"></div>
                    <p class="text-lg text-slate-400 leading-relaxed">${about}</p>
                    <div class="grid grid-cols-2 gap-6 pt-4">
                        <div>
                            <h3 class="text-slate-300 font-medium mb-1">Location</h3>
                            <p class="text-slate-500 flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4"></i> Remote / Global</p>
                        </div>
                        <div>
                            <h3 class="text-slate-300 font-medium mb-1">Email</h3>
                            <p class="text-slate-500 flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4"></i> ${email || 'contact@example.com'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="scroll-mt-24">
            <div class="mb-12">
                <h2 class="text-3xl font-bold text-white">Technical Arsenal</h2>
                <div class="w-12 h-1 bg-purple-500 rounded mt-6"></div>
            </div>
            <div class="flex flex-wrap gap-3">
                ${skillsHtml}
            </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="scroll-mt-24">
            <div class="mb-12">
                <h2 class="text-3xl font-bold text-white">Featured Work</h2>
                <div class="w-12 h-1 bg-purple-500 rounded mt-6"></div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                ${projectsHtml}
            </div>
        </section>

        <!-- Experience & Education Grid -->
        <section id="experience" class="scroll-mt-24">
            <div class="grid md:grid-cols-2 gap-16">
                <!-- Experience -->
                <div>
                    <div class="mb-10">
                        <h2 class="text-3xl font-bold text-white">Experience</h2>
                        <div class="w-12 h-1 bg-purple-500 rounded mt-6"></div>
                    </div>
                    <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                        ${experienceHtml}
                    </div>
                </div>
                <!-- Education -->
                <div>
                    <div class="mb-10">
                        <h2 class="text-3xl font-bold text-white">Education</h2>
                        <div class="w-12 h-1 bg-purple-500 rounded mt-6"></div>
                    </div>
                    <div class="space-y-6">
                        ${educationHtml}
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="scroll-mt-24 pt-12 pb-24 border-t border-white/5">
            <div class="grid md:grid-cols-2 gap-16 items-start">
                <div>
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Let's work <br class="hidden md:block" />together.</h2>
                    <p class="text-slate-400 text-lg mb-10 max-w-md">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <div class="space-y-6">
                        ${email ? '<a href="mailto:' + email + '" class="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">' +
            '<div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">' +
            '<i data-lucide="mail" class="w-5 h-5"></i>' +
            '</div>' +
            '<div>' +
            '<p class="text-sm text-slate-500 mb-0.5">Email</p>' +
            '<p class="font-medium">' + email + '</p>' +
            '</div>' +
            '</a>' : ''}
                        
                        ${phone ? '<a href="tel:' + phone + '" class="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">' +
            '<div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">' +
            '<i data-lucide="phone" class="w-5 h-5"></i>' +
            '</div>' +
            '<div>' +
            '<p class="text-sm text-slate-500 mb-0.5">Phone</p>' +
            '<p class="font-medium">' + phone + '</p>' +
            '</div>' +
            '</a>' : ''}
                    </div>
                </div>
                <div class="bg-white/5 border border-white/10 p-8 rounded-2xl">
                    <form class="space-y-6" onsubmit="event.preventDefault(); alert('Form submitted! (Demo only, connect to backend for real functionality)');">
                        <div>
                            <label class="block text-sm font-medium text-slate-400 mb-2">Name</label>
                            <input type="text" class="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="John Doe" autocomplete="off" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-400 mb-2">Email</label>
                            <input type="email" class="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="john@example.com" autocomplete="off" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-400 mb-2">Message</label>
                            <textarea rows="4" class="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none" placeholder="Hello, I'd like to discuss..."></textarea>
                        </div>
                        <button type="submit" class="w-full bg-white text-slate-950 font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </div>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-10 px-6">
        <div class="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p class="text-slate-500 text-sm">
                © <script>document.write(new Date().getFullYear())</script> ${name}. All rights reserved.
            </p>
            <div class="flex gap-4">
                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"><i data-lucide="github" class="w-4 h-4"></i></a>
                <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"><i data-lucide="linkedin" class="w-4 h-4"></i></a>
                ${email ? '<a href="mailto:' + email + '" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"><i data-lucide="mail" class="w-4 h-4"></i></a>' : ''}
            </div>
        </div>
    </footer>

    <script>
        // Initialize Lucide icons
        lucide.createIcons();
        
        // Sticky Header functionality
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-white/5');
            } else {
                navbar.classList.remove('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-white/5');
            }
        });
    </script>
</body>
</html>`;
}

export function generateMinimalHtml(data) {
    const name = data.name || 'Developer';
    const about = data.about || '';

    let skillsHtml = '';
    const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',').map(s => s.trim()) : []);
    skills.forEach(skill => {
        skillsHtml += '<span class="mr-2 mb-2 inline-block rounded bg-indigo-50 px-2 py-1 text-sm text-indigo-700">' + skill + '</span>';
    });

    let projectsHtml = '';
    const projects = Array.isArray(data.projects) ? data.projects : [];
    projects.forEach(proj => {
        const title = proj.title || (typeof proj === 'string' ? proj.split(':')[0] : '');
        const desc = proj.description || (typeof proj === 'string' ? proj.split(':').slice(1).join(':') : '');
        projectsHtml += `
            <div class="border-l-2 border-indigo-200 pl-4 py-2 mt-4">
                <h3 class="font-bold text-lg text-slate-800">${title}</h3>
                <p class="text-slate-600 mt-1">${desc}</p>
            </div>
        `;
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | Minimal Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-slate-800 font-sans">
    <div class="mx-auto max-w-4xl px-6 py-10 mt-10 bg-white rounded-xl shadow-lg border border-slate-100">
        <header class="border-b pb-6 mb-6">
            <h1 class="text-4xl font-extrabold tracking-tight text-slate-900">${name}</h1>
            <p class="mt-4 text-lg text-slate-600 max-w-2xl">${about}</p>
        </header>

        <section class="mt-8">
            <h2 class="text-2xl font-bold mb-4">Skills & Technologies</h2>
            <div class="flex flex-wrap">${skillsHtml}</div>
        </section>

        <section class="mt-10">
            <h2 class="text-2xl font-bold mb-2">Projects</h2>
            ${projectsHtml}
        </section>
    </div>
</body>
</html>`;
}

export function generateCardsHtml(data) {
    const name = data.name || 'Developer';

    let experienceHtml = '';
    const workExperience = Array.isArray(data.work_experience) ? data.work_experience : [];
    workExperience.forEach(w => {
        const role = typeof w === 'string' ? w : w.role;
        experienceHtml += '<p class="text-slate-700 py-2 border-b border-gray-100 last:border-0">' + role + '</p>';
    });

    let projectsHtml = '';
    const projects = Array.isArray(data.projects) ? data.projects : [];
    projects.forEach(p => {
        const title = typeof p === 'string' ? p.split(':')[0] : p.title;
        const desc = typeof p === 'string' ? p.split(':').slice(1).join(':') : p.description;
        projectsHtml += '<div class="bg-indigo-50 p-4 rounded-xl">' +
            '<h3 class="font-bold text-slate-800">' + title + '</h3>' +
            '<p class="text-sm text-slate-600 mt-1 line-clamp-2">' + desc + '</p>' +
            '</div>';
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | Cards Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-indigo-50 text-slate-800 font-sans px-4 py-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div class="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex flex-col items-center text-center">
            <div class="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold mb-4">${name.charAt(0)}</div>
            <h1 class="text-2xl font-bold">${name}</h1>
            <p class="text-slate-500 mt-2">${data.about || ''}</p>
        </div>
        <div class="md:col-span-2 space-y-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
                <h2 class="text-xl font-bold mb-4 text-indigo-600">Experience</h2>
                <div class="space-y-2">${experienceHtml}</div>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
                <h2 class="text-xl font-bold mb-4 text-indigo-600">Projects</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    ${projectsHtml}
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

export function generateTerminalHtml(data) {
    const name = data.name || 'GUEST USER';
    const firstLineAbout = data.about ? data.about.split('.')[0] : 'SYSTEM OPERATOR';

    let skillsHtml = '';
    const allSkills = [...new Set([
        ...(Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : [])),
        ...(Array.isArray(data.technologies) ? data.technologies : (data.technologies ? data.technologies.split(',') : []))
    ])].map(s => s.trim()).filter(Boolean);

    if (allSkills.length > 0) {
        allSkills.forEach(skill => {
            skillsHtml += '<div class="flex items-center gap-2 before:content-[\'-\'] before:text-green-700">' + skill + '</div>';
        });
    } else {
        skillsHtml += '<p class="text-green-700">Directory empty.</p>';
    }

    let projectsHtml = '';
    const projects = Array.isArray(data.projects) ? data.projects : [];
    if (projects.length > 0) {
        projects.forEach(p => {
            const title = typeof p === 'string' ? p.split(':')[0] : (p.title || 'Untitled');
            const desc = typeof p === 'string' ? p.split(':').slice(1).join(':') : (p.description || '');
            projectsHtml += '<div class="border border-green-900 bg-green-950/20 p-4">' +
                '<h3 class="text-lg font-bold text-green-400 mb-2">[' + title + ']</h3>' +
                '<p class="text-green-500/80 text-sm">' + desc + '</p>' +
                '</div>';
        });
    } else {
        projectsHtml += '<p class="text-green-700">No executable projects found.</p>';
    }

    let experienceHtml = '';
    const experience = Array.isArray(data.work_experience) ? data.work_experience : [];
    if (experience.length > 0) {
        experience.forEach((exp, i) => {
            const role = typeof exp === 'string' ? exp : (exp.role || exp.description);
            experienceHtml += '<div class="flex gap-4">' +
                '<span class="text-green-700 shrink-0">ENTRY ' + String(i + 1).padStart(3, '0') + ' :</span>' +
                '<span class="text-green-300">' + role + '</span>' +
                '</div>';
        });
    } else {
        experienceHtml += '<p class="text-green-700">Log file empty.</p>';
    }

    const emailHtml = data.contact?.email ? '<p class="flex gap-4"><span class="text-green-700 w-16">EMAIL:</span> <a href="mailto:' + data.contact.email + '" class="text-green-400 hover:underline">' + data.contact.email + '</a></p>' : '';
    const phoneHtml = data.contact?.phone ? '<p class="flex gap-4"><span class="text-green-700 w-16">PHONE:</span> <span>' + data.contact.phone + '</span></p>' : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | Terminal Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
    </style>
</head>
<body class="bg-black text-green-500 font-mono selection:bg-green-500 selection:text-black">
    <div class="min-h-screen p-4 sm:p-8 overflow-y-auto">
        <div class="max-w-4xl mx-auto space-y-8">
            <header class="border-b border-green-500/30 pb-4 flex justify-between items-end">
                <div>
                    <h1 class="text-2xl sm:text-4xl font-bold tracking-tight mb-2">~/${name.toLowerCase().replace(/\s+/g, '_')}</h1>
                    <p class="text-green-400/70 text-sm">OS: Portfolio v2.0</p>
                </div>
            </header>

            <div class="space-y-10 animate-fade-in pt-4">
                <section>
                    <div class="flex items-center gap-2 text-green-400 mb-4">
                        <span class="font-bold">> cat about.txt</span>
                    </div>
                    <div class="pl-6 border-l-2 border-green-900 leading-relaxed text-green-300">
                        ${data.about || 'No description found in system logs.'}
                    </div>
                </section>

                <section>
                    <div class="flex items-center gap-2 text-green-400 mb-4">
                        <span class="font-bold">> ls /skills</span>
                    </div>
                    <div class="pl-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-green-300">
                        ${skillsHtml}
                    </div>
                </section>

                <section>
                    <div class="flex items-center gap-2 text-green-400 mb-4">
                        <span class="font-bold">> ./run_projects.sh</span>
                    </div>
                    <div class="pl-6 space-y-6">
                        ${projectsHtml}
                    </div>
                </section>

                <section>
                    <div class="flex items-center gap-2 text-green-400 mb-4">
                        <span class="font-bold">> tail -f /var/log/experience.log</span>
                    </div>
                    <div class="pl-6 space-y-2 font-mono text-sm opacity-90">
                        ${experienceHtml}
                    </div>
                </section>

                <section class="pb-12">
                    <div class="flex items-center gap-2 text-green-400 mb-4">
                        <span class="font-bold animate-pulse">> ping contact...</span>
                    </div>
                    <div class="pl-6 border border-green-900 p-4">
                        <div class="grid gap-2 text-sm">
                            ${emailHtml}
                            ${phoneHtml}
                            <p class="flex gap-4 mt-4 pt-4 border-t border-green-900"><span class="text-green-700">STATUS:</span> <span class="text-green-400 animate-pulse">LISTENING ON PORT 8080</span></p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</body>
</html>`;
}

export function generateRoboticHtml(data) {
    const name = data.name || 'CYBER_ENTITY';
    const role = data.about ? data.about.split('.')[0] : 'NEURAL_ARCHITECT';

    let skillsHtml = '';
    const allSkills = [...new Set([
        ...(Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : [])),
        ...(Array.isArray(data.technologies) ? data.technologies : (data.technologies ? data.technologies.split(',') : []))
    ])].map(s => s.trim()).filter(Boolean);
    allSkills.forEach(skill => {
        skillsHtml += '<div class="bg-cyan-950/40 border border-cyan-800/50 text-cyan-200 text-xs font-mono px-3 py-1.5 hover:bg-cyan-900 transition-colors">' + skill + '</div>';
    });

    let experienceHtml = '';
    const experience = Array.isArray(data.work_experience) ? data.work_experience : [];
    if (experience.length > 0) {
        experience.forEach((exp, i) => {
            const expTitle = typeof exp === 'string' ? exp : (exp.role || exp.description);
            experienceHtml += '<div class="pl-8 relative">' +
                '<div class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center">' +
                '<div class="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>' +
                '</div>' +
                '<h3 class="text-lg font-bold text-cyan-50">' + expTitle + '</h3>' +
                '<p class="text-cyan-600/60 font-mono mt-1 text-sm bg-slate-900 inline-block px-2">Cycle 0' + (i + 1) + '</p>' +
                '</div>';
        });
    } else {
        experienceHtml += '<p class="text-cyan-700 font-mono">No historical data found.</p>';
    }

    let projectsHtml = '';
    const projects = Array.isArray(data.projects) ? data.projects : [];
    if (projects.length > 0) {
        projects.forEach((p, i) => {
            const title = typeof p === 'string' ? p.split(':')[0] : (p.title || 'Untitled');
            const desc = typeof p === 'string' ? p.split(':').slice(1).join(':') : (p.description || '');
            projectsHtml += '<div class="bg-slate-950 border border-fuchsia-900/30 p-5 hover:border-fuchsia-500/60 transition-colors group">' +
                '<div class="flex justify-between items-start mb-3">' +
                '<h3 class="text-fuchsia-300 font-bold group-hover:text-fuchsia-400 transition-colors">' + title + '</h3>' +
                '<span class="text-xs font-mono text-fuchsia-700">v' + (i + 1) + '.0</span>' +
                '</div>' +
                '<p class="text-cyan-100/60 text-sm leading-relaxed">' + desc + '</p>' +
                '</div>';
        });
    } else {
        projectsHtml += '<p class="text-fuchsia-700 font-mono">No constructs detected.</p>';
    }

    const emailHtml = data.contact?.email ? '<div class="flex flex-col"><span class="text-cyan-700 mb-1">DATA_STREAM:</span><a href="mailto:' + data.contact.email + '" class="text-cyan-300 hover:text-cyan-100 underline decoration-cyan-900 underline-offset-4">' + data.contact.email + '</a></div>' : '';
    const phoneHtml = data.contact?.phone ? '<div class="flex flex-col mt-4"><span class="text-cyan-700 mb-1">VOICE_PROTOCOL:</span><span class="text-cyan-300">' + data.contact.phone + '</span></div>' : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | Robotic Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .animate-ping { animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
    </style>
</head>
<body class="bg-slate-950 text-cyan-50 font-sans selection:bg-cyan-500/30 min-h-screen">
    <div class="fixed inset-0 pointer-events-none opacity-20" style="background-image: linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px); background-size: 40px 40px;"></div>
    <div class="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_#083344_0%,_transparent_70%)] pointer-events-none"></div>

    <div class="max-w-5xl mx-auto space-y-12 relative z-10 p-4 sm:p-8">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-cyan-500/50 pb-6 relative">
            <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div class="space-y-2">
                <div class="flex items-center gap-3 text-cyan-400 mb-2">
                    <span class="font-mono text-xs tracking-[0.2em] font-bold">SYSTEM_ONLINE</span>
                </div>
                <h1 class="text-4xl sm:text-6xl font-black tracking-tighter uppercase" style="text-shadow: 0 0 20px rgba(6, 182, 212, 0.5)">${name}</h1>
                <p class="text-cyan-400 font-mono tracking-widest text-sm py-1 px-3 bg-cyan-950/50 border border-cyan-500/30 inline-block">// ${role}</p>
            </div>
            <div class="flex items-end gap-6 text-sm font-mono text-cyan-600">
                <div class="text-right"><p>RAM_USAGE</p><p class="text-cyan-400 text-lg">7.2/16 TB</p></div>
                <div class="text-right"><p>CPU_TEMP</p><p class="text-cyan-400 text-lg animate-pulse">48&deg;C</p></div>
            </div>
        </header>

        <section class="grid md:grid-cols-2 gap-8 items-center bg-slate-900/50 border border-cyan-900/50 p-6 md:p-10 rounded-br-3xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"></div>
            <div>
                <div class="flex items-center gap-2 text-cyan-400 mb-4 font-mono font-bold"><span>CORE_DIRECTIVE</span></div>
                <p class="text-cyan-100/80 leading-relaxed text-lg">${data.about || 'Awaiting initial programming...'}</p>
            </div>
            <div class="space-y-4 font-mono text-xs">
                <div class="space-y-1"><div class="flex justify-between text-cyan-500"><span>FRONTEND_SYNAPSE</span><span>92%</span></div><div class="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-cyan-500 w-[92%]"></div></div></div>
                <div class="space-y-1"><div class="flex justify-between text-cyan-500"><span>BACKEND_INFRA</span><span>85%</span></div><div class="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-fuchsia-500 w-[85%]"></div></div></div>
                <div class="space-y-1"><div class="flex justify-between text-cyan-500"><span>NEURAL_NET_AI</span><span>78%</span></div><div class="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-blue-500 w-[78%]"></div></div></div>
            </div>
        </section>

        <div class="grid md:grid-cols-12 gap-8 pb-12">
            <div class="md:col-span-8 space-y-8">
                <section class="bg-slate-900/40 border border-slate-800 p-6 sm:p-8 relative">
                    <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50"></div>
                    <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50"></div>
                    <h2 class="text-xl font-mono font-bold text-cyan-400 mb-6 flex items-center gap-3">&gt; EXECUTION_LOG</h2>
                    <div class="space-y-6 relative before:absolute before:inset-0 before:left-2 before:w-px before:bg-cyan-900/50">
                        ${experienceHtml}
                    </div>
                </section>
                <section class="bg-slate-900/40 border border-slate-800 p-6 sm:p-8 relative">
                    <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-fuchsia-500/50"></div>
                    <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-fuchsia-500/50"></div>
                    <h2 class="text-xl font-mono font-bold text-fuchsia-400 mb-6 flex items-center gap-3">&gt; CONSTRUCTS_DEPLOYED</h2>
                    <div class="grid sm:grid-cols-2 gap-4">
                        ${projectsHtml}
                    </div>
                </section>
            </div>
            <div class="md:col-span-4 space-y-8">
                <section class="bg-slate-900/40 border border-slate-800 p-6 relative">
                    <h2 class="text-sm font-mono font-bold text-cyan-500 mb-4 uppercase tracking-widest border-b border-cyan-900/50 pb-2">// Hardware_Specs</h2>
                    <div class="flex flex-wrap gap-2">
                        ${skillsHtml}
                    </div>
                </section>
                <section class="bg-cyan-950/20 border border-cyan-500/30 p-6 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl transition-colors"></div>
                    <h2 class="text-sm font-mono font-bold text-cyan-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                        <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Live_Comm_Link
                    </h2>
                    <div class="space-y-4 font-mono text-sm relative z-10">
                        ${emailHtml}
                        ${phoneHtml}
                        <div class="mt-8 pt-4 border-t border-cyan-900/30">
                            <button class="w-full bg-cyan-950/50 border border-cyan-500/50 text-cyan-400 py-3 uppercase tracking-widest text-xs hover:bg-cyan-900/80 transition-colors flex items-center justify-center gap-2">
                                Establish Connection
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</body>
</html>`;
}

export function exportPortfolioHtml(templateId, data) {
    switch (templateId) {
        case 'dark':
            return generateDarkHtml(data);
        case 'cards':
            return generateCardsHtml(data);
        case 'terminal':
            return generateTerminalHtml(data);
        case 'robotic':
            return generateRoboticHtml(data);
        case 'minimal':
        default:
            return generateMinimalHtml(data);
    }
}
