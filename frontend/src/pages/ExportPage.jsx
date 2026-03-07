import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, CheckCircle2, ArrowLeft, Terminal } from 'lucide-react';
import api from '../api/client';
import TemplateRenderer from '../components/TemplateRenderer';
import { exportPortfolioProject } from '../utils/exportPortfolioProject';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function ExportPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get(`/portfolios/${id}/`);
                setPortfolio(res.data);
            } catch (err) {
                setError('Failed to load portfolio for export.');
                console.error(err);
            }
        };
        load();
    }, [id]);

    const handleDownload = async () => {
        if (!portfolio || !portfolio.portfolio_data_json) return;
        setDownloading(true);
        try {
            const data = portfolio.portfolio_data_json;
            const bundle = exportPortfolioProject(portfolio.template_id, data);

            const zip = new JSZip();
            Object.entries(bundle.files).forEach(([path, content]) => {
                zip.file(path, content);
            });

            const blob = await zip.generateAsync({ type: 'blob' });
            saveAs(blob, bundle.fileName);
        } catch (err) {
            console.error(err);
            setError('Generation failed. Please try again.');
        } finally {
            setDownloading(false);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-[#080b12] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6 font-bold text-2xl">!</div>
                <h1 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">System Error</h1>
                <p className="text-slate-500 mb-8 max-w-md">{error}</p>
                <button onClick={() => navigate('/dashboard')} className="!bg-[#0f1520] border border-white/10 px-8 py-3 rounded-xl text-white font-bold uppercase tracking-widest hover:bg-white/5">Return to Dashboard</button>
            </div>
        );
    }

    if (!portfolio) {
        return (
            <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center space-y-4">
                <Terminal className="text-blue-500 animate-pulse" size={32} />
                <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Initializing Export Engine_</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-black flex flex-col">

            {/* Verification Preview */}
            <div className="flex-grow overflow-y-auto">
                <TemplateRenderer
                    templateId={portfolio.template_id}
                    data={portfolio.portfolio_data_json}
                />
            </div>

            {/* Control Bar - Premium Review Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-2xl border-t border-white/5 py-6 px-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                            <CheckCircle2 size={24} />
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-white font-black uppercase italic tracking-tighter text-lg leading-none">Portfolio Ready</p>
                            <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] mt-1">Status: Verified & Validated</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={() => navigate(`/editor/${id}`)}
                            className="flex-1 md:flex-none px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={14} /> Back to Editor
                        </button>
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="flex-1 md:flex-none px-12 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-500 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
                        >
                            {downloading ? (
                                <>Generating ZIP...</>
                            ) : (
                                <><Download size={16} /> Download .zip</>
                            )}
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}
