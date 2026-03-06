import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{ background: '#080b12', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 24px 80px' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(13,148,136,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '-100px', width: '300px', height: '300px', background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '-80px', width: '300px', height: '300px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 28px', letterSpacing: '-0.03em', color: '#e2e8f0' }}>
            Turn Your Resume Into a<br />
            <span style={{ background: 'linear-gradient(135deg, #0d9488, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Portfolio </span>
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Upload your PDF resume, pick a stunning template, and download a fully self-contained HTML portfolio — ready to deploy anywhere in minutes.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button style={{ padding: '14px 32px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #0d9488, #0891b2)', boxShadow: '0 8px 32px rgba(13,148,136,0.4)' }}>
                Get Started Free <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/login">
              <button style={{ padding: '14px 32px', fontSize: '1rem', background: 'transparent', border: '1px solid #1e2d3d', color: '#cbd5e1' }}>
                Login to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


