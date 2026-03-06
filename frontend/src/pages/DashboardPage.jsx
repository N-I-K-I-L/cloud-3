import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Clock } from 'lucide-react';
import api from '../api/client';

export default function DashboardPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const res = await api.get('/portfolios/');
      setItems(res.data);
    } catch {
      setError('Failed to load portfolios.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="animate-fade-up">
          <h1 className="text-4xl font-black text-white tracking-tight">Your Portfolios</h1>
          <p className="text-slate-400 mt-2 font-medium">Manage, customize and export your digital brand.</p>
        </div>
        <Link to="/upload-resume" className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <button className="flex items-center gap-2 !bg-teal-600 hover:!bg-teal-500 text-white shadow-xl shadow-teal-900/20 px-6 py-3">
            <Plus size={20} /> Create New Portfolio
          </button>
        </Link>
      </div>

      {error && <p className="mb-6 bg-red-900/20 text-red-400 p-4 rounded-xl border border-red-900/30 text-center">{error}</p>}

      <div className="grid gap-6">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-[#0f1520] p-6 border border-[#1e2d3d] hover:border-teal-500/50 hover:bg-[#141d2b] transition-all duration-300 animate-fade-up"
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-teal-950/30 text-teal-400 flex items-center justify-center font-black text-xl uppercase border border-teal-900/30 group-hover:border-teal-500/30 transition-colors">
                  {item.template_id.substring(0, 1)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white capitalize leading-tight mb-1 group-hover:text-teal-400 transition-colors">
                    {item.template_id} Theme
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-teal-600" /> Updated {new Date(item.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto">
                <Link to={`/editor/${item.id}`} className="flex-1 md:flex-none">
                  <button className="w-full md:w-auto flex items-center justify-center gap-2 !bg-[#1e2d3d] !text-slate-300 hover:!bg-[#2a3c4e] px-5">
                    <Edit2 size={16} /> Edit Details
                  </button>
                </Link>

              </div>
            </div>
          </div>
        ))}

        {!items.length && (
          <div className="text-center py-24 bg-[#0f1520] rounded-3xl border-2 border-dashed border-[#1e2d3d] animate-fade-up">
            <div className="w-20 h-20 bg-teal-950/20 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-900/30">
              <Plus size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No portfolios created</h3>
            <p className="text-slate-400 max-w-sm mx-auto mb-10 font-medium">Ready to ship? Start your developer journey by creating your first portfolio.</p>
            <Link to="/upload-resume">
              <button className="!bg-teal-600 text-white px-8 py-3 shadow-xl shadow-teal-900/30">Get Started Now</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
