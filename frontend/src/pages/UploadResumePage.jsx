import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate, Monitor, CreditCard, ChevronRight, FileText, Edit3, ArrowLeft, Terminal, Cpu } from 'lucide-react';
import api from '../api/client';

export default function UploadResumePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [templateId, setTemplateId] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const templates = [
    { id: 'dark', name: 'Premium Dark', icon: <Monitor className="w-8 h-8 text-purple-400" />, desc: 'Modern, full-screen dark theme for developers.' },
    { id: 'minimal', name: 'Minimal clean', icon: <LayoutTemplate className="w-8 h-8 text-slate-600" />, desc: 'Simple, readable, and professional layout.' },
    { id: 'cards', name: 'Card Layout', icon: <CreditCard className="w-8 h-8 text-teal-500" />, desc: 'Colorful and vibrant card-based grid design.' },
    { id: 'terminal', name: 'Hacker CLI', icon: <Terminal className="w-8 h-8 text-green-500" />, desc: 'Green-on-black retro command line interface.' },
    { id: 'robotic', name: 'Cyberpunk Mode', icon: <Cpu className="w-8 h-8 text-cyan-500" />, desc: 'Futuristic, neon-grid sci-fi robotic blueprint.' }
  ];

  const handleTemplateSelect = (id) => {
    setTemplateId(id);
    setStep(2);
    setError('');
  };

  const handleManualCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/portfolios/manual/', { template_id: templateId });
      navigate(`/editor/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create manual portfolio.');
      setLoading(false);
    }
  };

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF resume first.');
      return;
    }
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('template_id', templateId);

    try {
      const response = await api.post('/portfolios/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/editor/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload and parsing failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b12] py-12 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Progress Bar */}
        <div className="mb-12 flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-widest animate-fade-up">
          <div className={`flex items-center gap-3 ${step >= 1 ? 'text-teal-400' : 'text-slate-600'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step >= 1 ? 'bg-teal-500/10 border border-teal-500/50 text-teal-400' : 'bg-slate-900 border border-slate-800'}`}>1</div>
            Template
          </div>
          <div className="w-16 h-px bg-slate-800">
            <div className={`h-full bg-teal-500 transition-all duration-300 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className={`flex items-center gap-3 ${step >= 2 ? 'text-teal-400' : 'text-slate-600'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step >= 2 ? 'bg-teal-500/10 border border-teal-500/50 text-teal-400' : 'bg-slate-900 border border-slate-800'}`}>2</div>
            Import
          </div>
          <div className="w-16 h-px bg-slate-800">
            <div className={`h-full bg-teal-500 transition-all duration-300 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className={`flex items-center gap-3 ${step >= 3 ? 'text-teal-400' : 'text-slate-600'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step >= 3 ? 'bg-teal-500/10 border border-teal-500/50 text-teal-400' : 'bg-slate-900 border border-slate-800'}`}>3</div>
            Generate
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl border border-red-900/30 bg-red-900/10 text-red-400 text-center animate-fade-up">
            {error}
          </div>
        )}

        {/* Step 1: Template Selection */}
        {step === 1 && (
          <div className="animate-fade-up">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Choose a Template</h1>
              <p className="text-slate-400 text-lg font-medium">Select the DNA of your future portfolio.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {templates.map((tpl, i) => (
                <button
                  key={tpl.id}
                  onClick={() => handleTemplateSelect(tpl.id)}
                  className="flex flex-col items-center text-center p-10 rounded-2xl bg-[#0f1520] border border-[#1e2d3d] hover:border-teal-500/50 hover:bg-[#141d2b] transition-all duration-300 group relative overflow-hidden"
                  style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-slate-900 group-hover:bg-teal-950/30 flex items-center justify-center mb-8 border border-slate-800 group-hover:border-teal-900/30 transition-all duration-500 group-hover:scale-110">
                    {tpl.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">{tpl.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{tpl.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: PDF or Manual Option */}
        {step === 2 && (
          <div className="animate-fade-up">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-500 hover:text-teal-400 mb-10 transition-colors font-bold uppercase text-xs tracking-widest">
              <ArrowLeft size={16} /> Back to Templates
            </button>

            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-white mb-3 tracking-tight">How do you want to start?</h2>
              <p className="text-slate-400 text-lg font-medium">Instantly extract data from PDF or start manually.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => { setStep(3); setError(''); }}
                className="flex flex-col items-center justify-center p-12 rounded-3xl bg-[#0f1520] border-2 border-[#1e2d3d] hover:border-teal-500/50 hover:bg-[#141d2b] transition-all group"
              >
                <div className="w-24 h-24 bg-teal-950/20 text-teal-400 rounded-2xl flex items-center justify-center mb-8 border border-teal-900/30 group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-500">
                  <FileText size={40} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Upload PDF Resume</h3>
                <p className="text-slate-500 text-center font-medium leading-relaxed">Our AI will scan your PDF and populate all details automatically.</p>
                <div className="mt-8 flex items-center gap-2 text-teal-400 font-bold uppercase text-xs tracking-[0.2em]">
                  Select File <ChevronRight size={16} />
                </div>
              </button>

              <button
                onClick={handleManualCreate}
                disabled={loading}
                className="flex flex-col items-center justify-center p-12 rounded-3xl bg-[#0f1520] border-2 border-[#1e2d3d] hover:border-teal-500/50 hover:bg-[#141d2b] transition-all group disabled:opacity-50"
              >
                <div className="w-24 h-24 bg-slate-900 text-slate-500 rounded-2xl flex items-center justify-center mb-8 border border-slate-800 group-hover:scale-110 group-hover:border-teal-500/50 group-hover:text-teal-400 transition-all duration-500">
                  <Edit3 size={40} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Enter Manually</h3>
                <p className="text-slate-500 text-center font-medium leading-relaxed">Start with a clean slate and build your sections one by one.</p>
                <div className="mt-8 flex items-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-[0.2em] group-hover:text-teal-400">
                  {loading ? 'Creating...' : <>Start Manual <ChevronRight size={16} /></>}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: PDF Upload */}
        {step === 3 && (
          <div className="max-w-3xl mx-auto animate-fade-up">
            <button onClick={() => setStep(2)} className="flex items-center gap-2 text-slate-500 hover:text-teal-400 mb-10 transition-colors font-bold uppercase text-xs tracking-widest">
              <ArrowLeft size={16} /> Back
            </button>

            <div className="p-10 md:p-14 bg-[#0f1520] border border-[#1e2d3d] rounded-3xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-white mb-3 tracking-tight">Upload Resume</h2>
                <p className="text-slate-400 text-lg font-medium">Standard PDF documents work best.</p>
              </div>

              <form onSubmit={handlePdfUpload} className="space-y-8">
                <div className="relative border-2 border-dashed border-[#1e2d3d] rounded-2xl p-16 text-center hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="pointer-events-none">
                    <div className="w-20 h-20 bg-slate-900 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800 group-hover:border-teal-500/30 group-hover:text-teal-400 transition-all">
                      <FileText size={32} />
                    </div>
                    <p className="text-xl font-bold text-white mb-2">
                      {file ? file.name : 'Click to select or drag and drop'}
                    </p>
                    <p className="text-slate-500 font-medium">PDF format only (Max 10MB)</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 px-6 rounded-xl font-bold bg-[#1e2d3d] text-slate-400 hover:bg-[#2a3c4e] transition-all order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !file}
                    className="flex-[2] py-4 px-6 rounded-xl font-extrabold text-white bg-teal-600 hover:bg-teal-500 shadow-xl shadow-teal-900/20 transition-all disabled:opacity-50 flex justify-center items-center gap-3 order-1 sm:order-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Extracting DNA...
                      </>
                    ) : (
                      'Generate Portfolio'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
