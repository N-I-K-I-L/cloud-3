import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/register/', form);
      const loginRes = await api.post('/auth/token/', { username: form.username, password: form.password });
      localStorage.setItem('access_token', loginRes.data.access);
      localStorage.setItem('refresh_token', loginRes.data.refresh);
      navigate('/dashboard');
    } catch (err) {
      const payload = err.response?.data;
      const parsed = typeof payload === 'string' ? payload : JSON.stringify(payload);
      setError(parsed || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#080b12', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(13,148,136,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 800, color: '#0d9488', letterSpacing: '-0.02em' }}>Portfolio Builder</span>
          </Link>
          <p style={{ marginTop: '6px', color: '#475569', fontSize: '0.875rem' }}>Create your free account</p>
        </div>

        <div style={{ background: '#0f1520', border: '1px solid #1e2d3d', borderRadius: '16px', padding: '36px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 24px' }}>Get started</h1>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', padding: '10px 14px', borderRadius: '8px', fontSize: '0.875rem', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
              <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} style={{ paddingLeft: '38px' }} autoComplete="username" required />
            </div>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
              <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ paddingLeft: '38px' }} autoComplete="email" required />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
              <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ paddingLeft: '38px' }} autoComplete="new-password" required />
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', width: '100%', background: 'linear-gradient(135deg, #0d9488, #0891b2)', boxShadow: '0 4px 20px rgba(13,148,136,0.3)' }}>
              {loading ? 'Creating account...' : <><UserPlus size={16} /> Create Account</>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.875rem', color: '#475569' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#0d9488', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
