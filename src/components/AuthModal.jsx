import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Lock, Mail, User as UserIcon, Phone, Check, ShieldCheck, KeyRound } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, navigateTo } = useStore();
  const [tab, setTab] = useState('login'); // 'login' or 'register'

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  if (!isOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(regPassword);
  const strengthLabels = ['Too Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#EF4444', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = login(loginEmail, loginPassword);
    if (res.success) {
      onClose();
      if (res.role === 'admin') {
        navigateTo('admin');
      }
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (strengthScore < 2) {
      alert('Please use a stronger password (at least 8 chars with numbers/symbols).');
      return;
    }
    const res = register({
      name: regName.trim(),
      email: regEmail.trim(),
      password: regPassword,
      phone: regPhone.trim()
    });
    if (res.success) {
      onClose();
    }
  };

  const handleFillDemoUser = () => {
    setLoginEmail('aarav.mehta@example.com');
    setLoginPassword('Password@123');
  };

  const handleFillAdmin = () => {
    setLoginEmail('admin@pageturn.com');
    setLoginPassword('admin123');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(3px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        className="neo-box"
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--bg-paper)',
          padding: '2rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: '2px solid var(--border-color)',
            padding: '0.3rem',
            cursor: 'pointer',
            display: 'flex'
          }}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Brand Stamp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1.25rem' }}>
          <span
            style={{
              backgroundColor: 'var(--accent-tomato)',
              color: '#FFFDF9',
              fontFamily: 'var(--font-serif)',
              fontWeight: 900,
              fontSize: '1rem',
              padding: '0.1rem 0.35rem',
              border: '1.5px solid var(--border-color)'
            }}
          >
            P
          </span>
          <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: '1.25rem' }}>
            PAGE<span style={{ fontStyle: 'italic', color: 'var(--accent-tomato)' }}>TURN</span>
          </span>
          <span className="badge-sticker" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>
            PORTAL ACCESS
          </span>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            border: '2px solid var(--border-color)',
            marginBottom: '1.75rem',
            boxShadow: '2px 2px 0 var(--border-color)'
          }}
        >
          <button
            onClick={() => setTab('login')}
            style={{
              padding: '0.65rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              backgroundColor: tab === 'login' ? 'var(--accent-tomato)' : 'var(--bg-card)',
              color: tab === 'login' ? '#FFFDF9' : 'var(--text-primary)',
              transition: 'all 0.15s ease'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            style={{
              padding: '0.65rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              backgroundColor: tab === 'register' ? 'var(--accent-tomato)' : 'var(--bg-card)',
              color: tab === 'register' ? '#FFFDF9' : 'var(--text-primary)',
              transition: 'all 0.15s ease'
            }}
          >
            Register
          </button>
        </div>

        {tab === 'login' ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '0.4rem'
                }}
              >
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="reader@example.com"
                  className="neo-input"
                  required
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '0.4rem'
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="neo-input"
                required
              />
            </div>

            <button
              type="submit"
              className="neo-btn neo-btn-primary"
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
            >
              Enter PageTurn Archive
            </button>

            {/* Quick Demo Fills for convenience */}
            <div
              style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px dashed var(--border-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem'
              }}
            >
              <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Quick Demo Autofill:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleFillDemoUser}
                  className="neo-btn"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.72rem' }}
                >
                  👤 Demo User (Aarav Mehta)
                </button>
                <button
                  type="button"
                  onClick={handleFillAdmin}
                  className="neo-btn neo-btn-secondary"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.72rem' }}
                >
                  🛡️ Admin (admin@pageturn.com)
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Full Name
              </label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Priya Nair"
                className="neo-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Email Address
              </label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="priya@example.com"
                className="neo-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="neo-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Create Password
              </label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="At least 8 chars, 1 uppercase, 1 symbol"
                className="neo-input"
                required
              />

              {/* Password Strength Indicator */}
              {regPassword && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '4px', height: '6px', marginBottom: '0.3rem' }}>
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        style={{
                          flex: 1,
                          backgroundColor:
                            step <= strengthScore ? strengthColors[strengthScore] : 'var(--bg-subtle)',
                          border: '1px solid var(--border-color)',
                          transition: 'background-color 0.2s ease'
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex-between" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                    <span>Strength: <strong style={{ color: strengthColors[strengthScore] }}>{strengthLabels[strengthScore]}</strong></span>
                    <span>8+ chars • Uppercase • Numbers</span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="neo-btn neo-btn-primary"
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
            >
              Join PageTurn Readers' Guild
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
