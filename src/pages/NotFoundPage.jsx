import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, BookOpen, AlertOctagon } from 'lucide-react';

export default function NotFoundPage() {
  const { navigateTo } = useStore();

  return (
    <div style={{ padding: '6rem 0 8rem', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        <div
          className="neo-box"
          style={{
            padding: '3.5rem 2rem',
            backgroundColor: 'var(--bg-paper)'
          }}
        >
          <span className="badge-sticker red" style={{ marginBottom: '1rem' }}>
            ERROR 404 • MISSING FOLIO
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              lineHeight: 1,
              margin: '0.5rem 0 1rem'
            }}
          >
            Page Not Found
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            The page or pamphlet you are searching for appears to have been excised from this edition.
            Check your URL or return to our central library archive.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('home')}
              className="neo-btn neo-btn-primary"
            >
              <ArrowLeft size={16} /> Return to Homepage
            </button>
            <button
              onClick={() => navigateTo('catalogue')}
              className="neo-btn"
            >
              Browse Catalogue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
