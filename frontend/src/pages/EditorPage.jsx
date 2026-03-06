import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download, Save, ArrowLeft, User, FileText, Code2, GraduationCap, Briefcase, Mail, Phone, Link2 } from 'lucide-react';
import api from '../api/client';
import { exportPortfolioProject } from '../utils/exportPortfolioProject';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function normalize(data) {
  return {
    name: data.name || '',
    about: data.about || '',
    skills: Array.isArray(data.skills) ? data.skills.join(', ') : '',
    technologies: Array.isArray(data.technologies) ? data.technologies.join(', ') : '',
    projects: Array.isArray(data.projects)
      ? data.projects.map((p) => `${p.title || ''}: ${p.description || ''}`).join('\n')
      : '',
    education: Array.isArray(data.education)
      ? data.education.map((e) => `${e.degree || ''}, ${e.institution || ''}`).join('\n')
      : '',
    work_experience: Array.isArray(data.work_experience)
      ? data.work_experience.map((w) => w.role || w.description || '').join('\n')
      : '',
    contact_email: data.contact?.email || '',
    contact_phone: data.contact?.phone || '',
    contact_links: Array.isArray(data.contact?.links) ? data.contact.links.join(', ') : '',
  };
}

function denormalize(form) {
  const projects = form.projects
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split(':');
      return { title: title.trim(), description: rest.join(':').trim() || title.trim() };
    });

  const education = form.education
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [degree, ...rest] = line.split(',');
      return { degree: degree.trim(), institution: rest.join(',').trim() };
    });

  return {
    name: form.name,
    about: form.about,
    skills: form.skills.split(',').map((item) => item.trim()).filter(Boolean),
    technologies: form.technologies.split(',').map((item) => item.trim()).filter(Boolean),
    projects,
    education,
    work_experience: form.work_experience
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => ({ role: line, description: line })),
    contact: {
      email: form.contact_email,
      phone: form.contact_phone,
      links: form.contact_links.split(',').map((item) => item.trim()).filter(Boolean),
    },
  };
}

export default function EditorPage() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [form, setForm] = useState(normalize({}));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setError('');
      try {
        const res = await api.get(`/portfolios/${id}/`);
        setPortfolio(res.data);
        setForm(normalize(res.data.portfolio_data_json || {}));
      } catch {
        setError('Failed to load portfolio.');
      }
    };
    load();
  }, [id]);

  const previewData = useMemo(() => denormalize(form), [form]);

  const save = async () => {
    if (!portfolio) return;
    setSaving(true);
    try {
      const payload = {
        portfolio_data_json: previewData,
        template_id: portfolio.template_id,
      };
      const res = await api.patch(`/portfolios/${id}/`, payload);
      setPortfolio(res.data);
      setSaving(false);
      return res.data;
    } catch {
      setError('Save failed.');
      setSaving(false);
      throw new Error('save failed');
    }
  };

  const downloadSource = async () => {
    try {
      setDownloading(true);
      const savedPortfolio = await save();
      const sourceBundle = exportPortfolioProject(savedPortfolio.template_id, previewData);

      const zip = new JSZip();
      Object.entries(sourceBundle.files).forEach(([path, content]) => {
        zip.file(path, content);
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, sourceBundle.fileName);

    } catch (err) {
      console.error(err);
      setError('Failed to generate portfolio download.');
    } finally {
      setDownloading(false);
    }
  };

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-[#080b12] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080b12] py-12 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-up">
          <div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-400 transition-colors font-bold uppercase text-xs tracking-widest mb-4">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black text-white tracking-tight">Portfolio Editor</h1>
            <p className="text-slate-400 mt-2 font-medium">Refine your details. The live preview is disabled for faster editing.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 !bg-[#0f1520] !text-teal-400 border border-teal-500/30 hover:bg-teal-500/10 px-6"
            >
              {saving ? 'Saving...' : <><Save size={18} /> Save</>}
            </button>
            <button
              className="flex items-center gap-2 !bg-teal-600 text-white hover:!bg-teal-500 shadow-xl shadow-teal-900/20 px-6 font-black"
              onClick={downloadSource}
              disabled={downloading}
            >
              {downloading ? 'Preparing...' : <><Download size={18} /> Download (.zip)</>}
            </button>
          </div>
        </div>

        {error && <p className="mb-8 bg-red-900/20 text-red-400 p-4 rounded-xl border border-red-900/30 text-center animate-fade-up">{error}</p>}

        {/* Editor Form */}
        <div className="grid gap-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>

          {/* Section: Basics */}
          <div className="bg-[#0f1520] border border-[#1e2d3d] rounded-3xl p-8 md:p-10">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 border-b border-[#1e2d3d] pb-4">
              <User size={20} className="text-teal-500" /> Basic Information
            </h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Display Name</label>
                <input placeholder="Ex: John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Short Bio</label>
                <textarea rows="4" placeholder="Ex: Senior Full Stack Engineer with 5 years experience..." value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Section: Skills & Tech */}
          <div className="bg-[#0f1520] border border-[#1e2d3d] rounded-3xl p-8 md:p-10">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 border-b border-[#1e2d3d] pb-4">
              <Code2 size={20} className="text-teal-500" /> Skills & Stack
            </h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Core Skills (Comma separated)</label>
                <input placeholder="Python, React, AWS, Docker" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Technologies</label>
                <input placeholder="TypeScript, Node.js, GraphQL" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Section: Projects */}
          <div className="bg-[#0f1520] border border-[#1e2d3d] rounded-3xl p-8 md:p-10">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 border-b border-[#1e2d3d] pb-4">
              <FileText size={20} className="text-teal-500" /> Featured Projects
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Format: "Title: Brief Description" (One per line)</label>
              <textarea rows="6" placeholder="Project AI: Built a custom LLM from scratch..." value={form.projects} onChange={(e) => setForm({ ...form, projects: e.target.value })} />
            </div>
          </div>

          {/* Section: Education & Work */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#0f1520] border border-[#1e2d3d] rounded-3xl p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <GraduationCap size={18} className="text-teal-500" /> Education
              </h2>
              <textarea rows="4" placeholder="BS Computer Science, MIT" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
            </div>
            <div className="bg-[#0f1520] border border-[#1e2d3d] rounded-3xl p-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <Briefcase size={18} className="text-teal-500" /> Work History
              </h2>
              <textarea rows="4" placeholder="Software Architect at Google" value={form.work_experience} onChange={(e) => setForm({ ...form, work_experience: e.target.value })} />
            </div>
          </div>

          {/* Section: Contact */}
          <div className="bg-[#0f1520] border border-[#1e2d3d] rounded-3xl p-8 md:p-10 mb-12">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 border-b border-[#1e2d3d] pb-4">
              <Mail size={20} className="text-teal-500" /> Contact Details
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Mail size={12} /> Email</label>
                <input placeholder="hello@world.com" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Phone size={12} /> Phone</label>
                <input placeholder="+1 234 567 890" value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Link2 size={12} /> Links</label>
                <input placeholder="github.com/user, linkedin.com/user" value={form.contact_links} onChange={(e) => setForm({ ...form, contact_links: e.target.value })} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
