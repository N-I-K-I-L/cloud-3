function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(value = 'portfolio-project') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'portfolio-project';
}

function ensureArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (!value) {
    return [];
  }
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizePortfolioData(data = {}) {
  const name = data.name || 'Developer';
  const about = data.about || 'Portfolio website';
  const skills = ensureArray(data.skills);
  const technologies = ensureArray(data.technologies);
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const workExperience = Array.isArray(data.work_experience) ? data.work_experience : [];
  const education = Array.isArray(data.education) ? data.education : [];
  const contact = data.contact || {};

  return {
    name,
    initials: name.charAt(0).toUpperCase() || 'D',
    about,
    skills,
    technologies,
    allSkills: [...new Set([...skills, ...technologies])].filter(Boolean),
    projects: projects.map((project) => {
      if (typeof project === 'string') {
        const [title, ...rest] = project.split(':');
        return {
          title: title.trim() || 'Project',
          description: rest.join(':').trim() || title.trim() || 'Project details',
        };
      }
      return {
        title: project?.title || 'Project',
        description: project?.description || project?.title || 'Project details',
      };
    }),
    workExperience: workExperience.map((item) => {
      if (typeof item === 'string') {
        return { role: item, description: item };
      }
      return {
        role: item?.role || item?.description || 'Experience',
        description: item?.description || item?.role || '',
      };
    }),
    education: education.map((item) => {
      if (typeof item === 'string') {
        const [degree, ...rest] = item.split(',');
        return {
          degree: degree.trim() || 'Degree',
          institution: rest.join(',').trim() || 'Institution',
        };
      }
      return {
        degree: item?.degree || 'Degree',
        institution: item?.institution || 'Institution',
      };
    }),
    contact: {
      email: contact.email || data.contact_email || '',
      phone: contact.phone || data.contact_phone || '',
      links: Array.isArray(contact.links)
        ? contact.links.filter(Boolean)
        : ensureArray(data.contact_links),
    },
  };
}

function renderList(items, emptyMessage, renderer) {
  if (!items.length) {
    return `<p class="empty-state">${escapeHtml(emptyMessage)}</p>`;
  }
  return items.map(renderer).join('\n');
}

function themeConfig(templateId) {
  switch (templateId) {
    case 'dark':
      return {
        className: 'theme-dark',
        title: 'Dark Developer Portfolio',
        accent: '#5eead4',
        accentAlt: '#818cf8',
      };
    case 'cards':
      return {
        className: 'theme-cards',
        title: 'Cards Portfolio',
        accent: '#4f46e5',
        accentAlt: '#ec4899',
      };
    case 'terminal':
      return {
        className: 'theme-terminal',
        title: 'Terminal Portfolio',
        accent: '#22c55e',
        accentAlt: '#16a34a',
      };
    case 'robotic':
      return {
        className: 'theme-robotic',
        title: 'Robotic Portfolio',
        accent: '#06b6d4',
        accentAlt: '#d946ef',
      };
    case 'minimal':
    default:
      return {
        className: 'theme-minimal',
        title: 'Minimal Portfolio',
        accent: '#0f766e',
        accentAlt: '#0891b2',
      };
  }
}

function buildHtml(templateId, data) {
  const theme = themeConfig(templateId);
  const projectCards = renderList(
    data.projects,
    'Add projects from the editor to show them here.',
    (project) => `
      <article class="card project-card">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
      </article>
    `
  );

  const experienceItems = renderList(
    data.workExperience,
    'No work history added yet.',
    (item) => `
      <article class="timeline-item">
        <h3>${escapeHtml(item.role)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </article>
    `
  );

  const educationItems = renderList(
    data.education,
    'No education details added yet.',
    (item) => `
      <article class="card compact-card">
        <h3>${escapeHtml(item.degree)}</h3>
        <p>${escapeHtml(item.institution)}</p>
      </article>
    `
  );

  const skillItems = renderList(
    data.allSkills,
    'No skills added yet.',
    (skill) => `<li>${escapeHtml(skill)}</li>`
  );

  const contactLinks = [
    data.contact.email
      ? `<a href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a>`
      : '',
    data.contact.phone
      ? `<a href="tel:${escapeHtml(data.contact.phone)}">${escapeHtml(data.contact.phone)}</a>`
      : '',
    ...data.contact.links.map((link) => {
      const href = /^https?:\/\//i.test(link) ? link : `https://${link}`;
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(link)}</a>`;
    }),
  ].filter(Boolean).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="${theme.accent}" />
  <title>${escapeHtml(data.name)} | ${escapeHtml(theme.title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="./styles.css" />
</head>
<body class="${theme.className}">
  <div class="page-shell">
    <header class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${escapeHtml(theme.title)}</p>
        <h1>${escapeHtml(data.name)}</h1>
        <p class="lead">${escapeHtml(data.about)}</p>
        <div class="hero-actions">
          <a href="#projects">Projects</a>
          <a href="#contact" class="secondary">Contact</a>
        </div>
      </div>
      <div class="hero-badge">
        <span>${escapeHtml(data.initials)}</span>
      </div>
    </header>

    <main>
      <section class="section" id="skills">
        <div class="section-heading">
          <p>Core stack</p>
          <h2>Skills and technologies</h2>
        </div>
        <ul class="pill-grid">
          ${skillItems}
        </ul>
      </section>

      <section class="section" id="projects">
        <div class="section-heading">
          <p>Selected work</p>
          <h2>Projects</h2>
        </div>
        <div class="project-grid">
          ${projectCards}
        </div>
      </section>

      <section class="section split-section">
        <div>
          <div class="section-heading">
            <p>Experience</p>
            <h2>Work history</h2>
          </div>
          <div class="timeline">
            ${experienceItems}
          </div>
        </div>

        <div>
          <div class="section-heading">
            <p>Education</p>
            <h2>Academic background</h2>
          </div>
          <div class="stack">
            ${educationItems}
          </div>
        </div>
      </section>

      <section class="section contact-section" id="contact">
        <div class="section-heading">
          <p>Get in touch</p>
          <h2>Contact</h2>
        </div>
        <div class="contact-links">
          ${contactLinks || '<p class="empty-state">Add contact details in the editor to show them here.</p>'}
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <p>&copy; <span id="year"></span> ${escapeHtml(data.name)}</p>
      <p>Generated from Resume Portfolio Builder</p>
    </footer>
  </div>

  <script src="./script.js"></script>
</body>
</html>`;
}

function buildCss(templateId) {
  const theme = themeConfig(templateId);

  return `:root {
  --bg: #07111f;
  --surface: rgba(15, 23, 42, 0.78);
  --surface-strong: rgba(15, 23, 42, 0.96);
  --text: #e2e8f0;
  --muted: #94a3b8;
  --accent: ${theme.accent};
  --accent-alt: ${theme.accentAlt};
  --border: rgba(148, 163, 184, 0.18);
  --shadow: 0 24px 80px rgba(2, 6, 23, 0.35);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Space Grotesk", sans-serif;
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 22%, transparent), transparent 30%),
    radial-gradient(circle at top right, color-mix(in srgb, var(--accent-alt) 18%, transparent), transparent 28%),
    linear-gradient(180deg, #020617, var(--bg));
  color: var(--text);
}

a {
  color: inherit;
  text-decoration: none;
}

.page-shell {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 64px;
}

.hero,
.section,
.site-footer {
  border: 1px solid var(--border);
  background: var(--surface);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow);
}

.hero {
  display: grid;
  grid-template-columns: 1.6fr 0.9fr;
  gap: 24px;
  align-items: center;
  padding: 40px;
  border-radius: 32px;
  overflow: hidden;
  position: relative;
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 45%, color-mix(in srgb, var(--accent) 10%, transparent));
  pointer-events: none;
}

.eyebrow,
.section-heading p,
.site-footer p:last-child {
  font-family: "JetBrains Mono", monospace;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  color: var(--muted);
}

.hero h1,
.section-heading h2,
.project-card h3,
.timeline-item h3,
.compact-card h3 {
  margin: 0;
}

.hero h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 0.95;
}

.lead {
  max-width: 62ch;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--muted);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.hero-actions a {
  padding: 14px 20px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), var(--accent-alt));
  color: #020617;
  font-weight: 700;
}

.hero-actions a.secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}

.hero-badge {
  justify-self: end;
  width: 220px;
  aspect-ratio: 1;
  border-radius: 36px;
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--accent) 24%, transparent), transparent 52%),
    var(--surface-strong);
  position: relative;
}

.hero-badge span {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 700;
}

main {
  display: grid;
  gap: 24px;
  margin-top: 24px;
}

.section {
  border-radius: 28px;
  padding: 28px;
}

.section-heading {
  margin-bottom: 20px;
}

.pill-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.pill-grid li {
  padding: 10px 14px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 14%, rgba(255,255,255,0.02));
  border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--border));
  font-weight: 500;
}

.project-grid,
.stack,
.contact-links {
  display: grid;
  gap: 16px;
}

.project-grid {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.card,
.timeline-item {
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
}

.project-card p,
.timeline-item p,
.compact-card p {
  margin: 10px 0 0;
  color: var(--muted);
  line-height: 1.6;
}

.split-section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.timeline {
  display: grid;
  gap: 16px;
}

.contact-links a,
.contact-links p {
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 16px 18px;
  background: rgba(255, 255, 255, 0.03);
}

.site-footer {
  margin-top: 24px;
  border-radius: 22px;
  padding: 18px 22px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--muted);
}

.empty-state {
  color: var(--muted);
}

body.theme-minimal {
  --bg: #f8fafc;
  --surface: rgba(255, 255, 255, 0.82);
  --surface-strong: rgba(255, 255, 255, 0.98);
  --text: #0f172a;
  --muted: #475569;
  --border: rgba(15, 23, 42, 0.1);
  --shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
}

body.theme-minimal .hero-actions a {
  color: white;
}

body.theme-cards {
  --bg: #eef2ff;
  --surface: rgba(255, 255, 255, 0.92);
  --surface-strong: rgba(255, 255, 255, 1);
  --text: #1e1b4b;
  --muted: #4338ca;
  --border: rgba(79, 70, 229, 0.16);
  --shadow: 0 24px 70px rgba(79, 70, 229, 0.14);
}

body.theme-cards .card,
body.theme-cards .timeline-item,
body.theme-cards .contact-links a,
body.theme-cards .contact-links p {
  background: linear-gradient(180deg, rgba(238, 242, 255, 0.8), rgba(255, 255, 255, 0.98));
}

body.theme-terminal {
  --bg: #020617;
  --surface: rgba(1, 20, 10, 0.9);
  --surface-strong: rgba(1, 20, 10, 0.96);
  --text: #86efac;
  --muted: #4ade80;
  --border: rgba(34, 197, 94, 0.24);
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
}

body.theme-terminal,
body.theme-terminal .eyebrow,
body.theme-terminal .section-heading p,
body.theme-terminal .site-footer p:last-child {
  font-family: "JetBrains Mono", monospace;
}

body.theme-terminal .hero-actions a {
  color: #052e16;
}

body.theme-robotic .hero,
body.theme-robotic .section,
body.theme-robotic .site-footer {
  border-radius: 16px;
}

@media (max-width: 860px) {
  .hero,
  .split-section,
  .site-footer {
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .hero-badge {
    justify-self: start;
    width: 160px;
  }
}

@media (max-width: 640px) {
  .page-shell {
    width: min(100% - 20px, 1120px);
    padding-top: 16px;
  }

  .hero,
  .section {
    padding: 20px;
  }
}`;
}

function buildJs() {
  return `document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});`;
}

function buildReadme(projectName, templateId) {
  return `# ${projectName}

Static portfolio source exported from the portfolio editor.

## Files

- \`index.html\`: main page
- \`styles.css\`: styling for the exported ${templateId} template
- \`script.js\`: small client-side behavior
- \`data/portfolio.json\`: exported source data

## Run locally

1. Open this folder in VS Code or any IDE.
2. Quickest option: open \`index.html\` directly in the browser.
3. Better option in VS Code: run the Live Server extension from this folder.

No build step is required for this export.
`;
}

export function exportPortfolioProject(templateId, portfolioData) {
  const data = normalizePortfolioData(portfolioData);
  const projectName = `${data.name || 'Portfolio'} Portfolio`;
  const slug = slugify(projectName);

  return {
    projectName,
    fileName: `${slug}.zip`,
    files: {
      'index.html': buildHtml(templateId, data),
      'styles.css': buildCss(templateId),
      'script.js': buildJs(),
      'README.md': buildReadme(projectName, templateId),
      '.gitignore': '.DS_Store\nThumbs.db\n',
      'data/portfolio.json': `${JSON.stringify(portfolioData, null, 2)}\n`,
    },
  };
}
