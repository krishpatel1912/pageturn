import React from 'react';
import { useStore } from '../context/StoreContext';
import BookCard from '../components/BookCard';
import BookCover from '../components/BookCover';
import RotatingBadge from '../components/RotatingBadge';
import { ArrowRight, Sparkles, BookOpen, Layers, Feather, ShieldAlert, Award } from 'lucide-react';

export default function HomePage() {
  const { products, navigateTo, GENRES } = useStore();

  const featuredBooks = products.filter(b => b.featured).slice(0, 4);
  const bestsellers = products.filter(b => b.badge === 'BESTSELLER' || b.rating >= 4.8).slice(0, 4);
  const spotlightBook = products[0]; // The Architecture of Solitude

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* 1. HERO SECTION: Editorial Zine Aesthetic */}
      <section
        style={{
          borderBottom: 'var(--border-width) solid var(--border-color)',
          backgroundColor: 'var(--bg-paper)',
          padding: '4rem 0 3.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left 7 cols: Oversized headlines & manifesto */}
            <div style={{ gridColumn: 'span 7' }} className="hero-text-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <span className="badge-sticker red">ISSUE NO. 14 / AUTUMN 2026</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                  Curated Bookazine & Archive
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.6rem, 5.2vw, 4.6rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.5rem',
                  color: 'var(--text-primary)'
                }}
              >
                Books that resist <span style={{ fontStyle: 'italic', color: 'var(--accent-tomato)', textDecoration: 'underline' }}>algorithms</span> and kindle dissent.
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.15rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  maxWidth: '560px',
                  marginBottom: '2rem'
                }}
              >
                PageTurn is an independent bookstore, micro-press, and physical archive.
                We champion hand-stitched bindings, Risograph zines, radical philosophy,
                and speculative fiction that never sold its soul to mass-market conveyor belts.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <button
                  onClick={() => navigateTo('catalogue')}
                  className="neo-btn neo-btn-primary"
                  style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
                >
                  Explore Complete Catalogue <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className="neo-btn"
                  style={{ padding: '0.9rem 1.6rem', fontSize: '1rem' }}
                >
                  Read Our Manifesto
                </button>
              </div>

              {/* Badges strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginTop: '2.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px dashed var(--border-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)'
                }}
              >
                <div>✓ 26+ Curated Volumes</div>
                <div>✓ 100% Recycled Kraft Paper</div>
                <div>✓ Direct Press Royalties</div>
              </div>
            </div>

            {/* Right 5 cols: Hero Composition with Rotating Badge & Overlapping Book Covers */}
            <div
              style={{
                gridColumn: 'span 5',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              className="hero-image-col"
            >
              {/* Rotating Circular Text Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '10px',
                  zIndex: 20
                }}
              >
                <RotatingBadge diameter={120} />
              </div>

              {/* Overlapping Neo-Brutalist Book Cards */}
              <div style={{ position: 'relative', width: '310px', height: '420px' }}>
                {/* Background Book tilted */}
                <div
                  style={{
                    position: 'absolute',
                    top: '25px',
                    left: '-20px',
                    width: '240px',
                    transform: 'rotate(-8deg)',
                    boxShadow: '8px 8px 0px var(--border-color)',
                    zIndex: 2
                  }}
                >
                  <BookCover book={products[2]} width="100%" aspectRatio="2 / 2.9" />
                </div>

                {/* Foreground Book tilted */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '-10px',
                    width: '250px',
                    transform: 'rotate(4deg)',
                    boxShadow: '10px 10px 0px var(--border-color)',
                    zIndex: 5
                  }}
                  onClick={() => navigateTo('product', { id: products[0].id })}
                >
                  <BookCover book={products[0]} width="100%" aspectRatio="2 / 2.9" />
                </div>

                {/* Floating Sticker Stamp */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-15px',
                    left: '20px',
                    zIndex: 25,
                    backgroundColor: 'var(--accent-mustard)',
                    color: '#141414',
                    border: '2px solid var(--border-color)',
                    padding: '0.5rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    boxShadow: '3px 3px 0 var(--border-color)',
                    transform: 'rotate(-4deg)'
                  }}
                >
                  ★ 100% INDIE EDITORIAL PICK
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION STRIP */}
      <section
        style={{
          borderBottom: 'var(--border-width) solid var(--border-color)',
          backgroundColor: 'var(--bg-subtle)',
          padding: '1.25rem 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--accent-tomato)',
                  color: '#FFFDF9',
                  border: '2px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <BookOpen size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  Curated Catalog
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Only 26 titles inducted per seasonal cycle.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--accent-mustard)',
                  color: '#141414',
                  border: '2px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  Plastic-Free Shipments
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Sealed with biodegradable wax and twine.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--accent-sage)',
                  color: '#FFFDF9',
                  border: '2px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Feather size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  Direct Author Support
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Generous 65% revenue share to creators.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#38BDF8',
                  color: '#141414',
                  border: '2px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Layers size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                  Free Shipping &gt; ₹499
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Carbon-neutral air courier throughout India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CURATOR'S SELECTION */}
      <section style={{ padding: '4rem 0 3rem' }}>
        <div className="container">
          <div className="flex-between" style={{ marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge-sticker">CURATOR'S CHOICE</span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                  marginTop: '0.5rem'
                }}
              >
                Seasonal Highlights
              </h2>
            </div>
            <button
              onClick={() => navigateTo('catalogue')}
              className="neo-btn"
              style={{ padding: '0.65rem 1.25rem' }}
            >
              View All 26 Books <ArrowRight size={16} />
            </button>
          </div>

          <div className="books-grid">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. GENRE TILES: Asymmetric Magazine Layout */}
      <section
        style={{
          backgroundColor: 'var(--bg-paper)',
          borderTop: 'var(--border-width) solid var(--border-color)',
          borderBottom: 'var(--border-width) solid var(--border-color)',
          padding: '4rem 0'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
            <span className="badge-sticker red">EXPLORE ARCHIVE</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', marginTop: '0.5rem' }}>
              Curated by Literary Discipline
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              From post-war continental metaphysics to hand-pulled screenprinted zines.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {[
              { genre: 'Philosophy', count: '5 Titles', bg: '#5C3A68', text: '#F4EDE0', desc: 'Ontology, ethics of technology, spatial thought.' },
              { genre: 'Design & Art', count: '6 Titles', bg: '#E8B931', text: '#141414', desc: 'Bauhaus theory, typography as protest, brutalist concrete.' },
              { genre: 'Fiction', count: '6 Titles', bg: '#2A4736', text: '#F4EDE0', desc: 'Subcontinental coastlines, generational epics, silent stations.' },
              { genre: 'Sci-Fi', count: '4 Titles', bg: '#141416', text: '#00E5FF', desc: 'Quantum probability, solar state noir, synthetic consciousness.' },
              { genre: 'Poetry', count: '3 Titles', bg: '#78350F', text: '#FEF3C7', desc: 'Ghazals, concrete verse, night shift soliloquies.' },
              { genre: 'Non-Fiction', count: '4 Titles', bg: '#C2593F', text: '#FFF7ED', desc: 'Wild fermentation, algorithmic commons, Mediterranean memoirs.' }
            ].map(cat => (
              <div
                key={cat.genre}
                className="neo-box"
                onClick={() => navigateTo('catalogue')}
                style={{
                  backgroundColor: cat.bg,
                  color: cat.text,
                  padding: '2rem 1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '200px'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      opacity: 0.85,
                      marginBottom: '0.5rem'
                    }}
                  >
                    {cat.count}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.75rem',
                      lineHeight: 1.15,
                      marginBottom: '0.65rem'
                    }}
                  >
                    {cat.genre}
                  </h3>
                  <p style={{ color: cat.text, opacity: 0.85, fontSize: '0.85rem' }}>
                    {cat.desc}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    marginTop: '1.5rem'
                  }}
                >
                  Browse Category <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SPOTLIGHT WORK OF THE WEEK */}
      {spotlightBook && (
        <section style={{ padding: '4.5rem 0' }}>
          <div className="container">
            <div
              className="neo-box"
              style={{
                backgroundColor: 'var(--bg-card)',
                padding: '3rem 2.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '2.5rem',
                alignItems: 'center'
              }}
            >
              <div style={{ gridColumn: 'span 4' }} className="spotlight-cover-col">
                <BookCover book={spotlightBook} width="100%" aspectRatio="2 / 2.9" />
              </div>

              <div style={{ gridColumn: 'span 8' }} className="spotlight-text-col">
                <span className="badge-sticker red" style={{ marginBottom: '1rem' }}>
                  BOOK OF THE MONTH
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                    marginBottom: '0.75rem'
                  }}
                >
                  {spotlightBook.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: 'var(--accent-tomato)',
                    marginBottom: '1rem'
                  }}
                >
                  by {spotlightBook.author} • {spotlightBook.pages} pages • Hardcover Thread-Bound
                </p>

                <blockquote
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '1.25rem',
                    lineHeight: 1.5,
                    borderLeft: '4px solid var(--accent-mustard)',
                    paddingLeft: '1.25rem',
                    margin: '1.5rem 0',
                    color: 'var(--text-primary)'
                  }}
                >
                  "{spotlightBook.quotes}"
                </blockquote>

                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                    marginBottom: '1.8rem'
                  }}
                >
                  {spotlightBook.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)'
                    }}
                  >
                    ₹{spotlightBook.price}
                  </span>
                  <button
                    onClick={() => navigateTo('product', { id: spotlightBook.id })}
                    className="neo-btn neo-btn-primary"
                    style={{ padding: '0.85rem 1.6rem' }}
                  >
                    View Details & Read Sample <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. BESTSELLERS CAROUSEL / GRID */}
      <section
        style={{
          backgroundColor: 'var(--bg-paper)',
          borderTop: 'var(--border-width) solid var(--border-color)',
          padding: '4rem 0'
        }}
      >
        <div className="container">
          <div className="flex-between" style={{ marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge-sticker">READERS' FAVORITES</span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                  marginTop: '0.5rem'
                }}
              >
                Highest Rated & Bestselling
              </h2>
            </div>
            <button
              onClick={() => navigateTo('catalogue')}
              className="neo-btn"
              style={{ padding: '0.65rem 1.25rem' }}
            >
              See All Bestsellers <ArrowRight size={16} />
            </button>
          </div>

          <div className="books-grid">
            {bestsellers.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-text-col { grid-column: span 12 !important; }
          .hero-image-col { grid-column: span 12 !important; margin-top: 2rem; }
          .spotlight-cover-col { grid-column: span 12 !important; max-width: 300px; margin: 0 auto; }
          .spotlight-text-col { grid-column: span 12 !important; }
        }
      `}</style>
    </div>
  );
}
