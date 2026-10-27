import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '380px',
        width: 'calc(100% - 3rem)'
      }}
    >
      {toasts.map(toast => {
        let bg = 'var(--bg-card)';
        let accent = 'var(--accent-tomato)';
        let Icon = CheckCircle2;

        if (toast.type === 'error') {
          accent = '#EF4444';
          Icon = AlertCircle;
        } else if (toast.type === 'info') {
          accent = 'var(--accent-cyan)';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className="neo-box"
            style={{
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              borderLeft: `6px solid ${accent}`,
              background: bg,
              animation: 'slideInToast 0.25s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Icon size={18} color={accent} style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              >
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '0.2rem',
                display: 'flex'
              }}
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
