import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Compass,
  Mail,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  RotateCcw,
  Truck,
  Heart,
  Send,
  ArrowRight
} from 'lucide-react';

/* 1. ABOUT & MANIFESTO PAGE */
export function AboutPage() {
  const { navigateTo } = useStore();

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="badge-sticker red">FOUNDED 2026</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.08, margin: '0.5rem 0 1rem' }}>
            The PageTurn Press <br /><span style={{ fontStyle: 'italic', color: 'var(--accent-tomato)' }}>Manifesto</span>.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            COLOPHON NO. 1 • MUMBAI • AN INDEPENDENT LITERARY ARCHIVE
          </p>
        </div>

        <div className="neo-box" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-paper)', marginBottom: '3rem' }}>
          <blockquote
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              lineHeight: 1.5,
              borderLeft: '4px solid var(--accent-tomato)',
              paddingLeft: '1.5rem',
              marginBottom: '2rem',
              color: 'var(--text-primary)'
            }}
          >
            "A book is not a content delivery device. It is a sensory shelter—a physical anchor against the torrent of ephemeral digital ephemera."
          </blockquote>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            <p>
              In an era where algorithmic feeds dictate what we consume and multinational retailers squeeze independent presses to the brink of extinction, <strong>PageTurn</strong> was conceived as a sanctuary for the printed word.
            </p>
            <p>
              We curate and publish only 26 volumes per cycle. Each book is selected by human editorial discernment, printed on heavy chlorine-free Scandinavian rag or Indian recycled cotton paper, and bound with Smyth-sewn signatures that lay flat across your wooden desk.
            </p>
            <p>
              Our storefront operates on a 65% direct royalty model—ensuring that writers, illustrators, translators, and typographers earn an honest living from their craftsmanship. When you support PageTurn, you reject mass-market monoculture.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <div className="neo-box" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              01. 100% Plastic-Free
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Shipments wrapped exclusively in unbleached kraft paper, sealed with organic gummed tape and natural sealing wax.
            </p>
          </div>
          <div className="neo-box" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              02. Living Royalties
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Authors and indie presses receive more than 4x the industry average per copy sold on our platform.
            </p>
          </div>
          <div className="neo-box" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              03. Slow Reading
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              We reject high-velocity disposable paperbacks in favor of heirloom editions meant to outlast the century.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigateTo('catalogue')} className="neo-btn neo-btn-primary" style={{ padding: '0.9rem 2rem' }}>
            Browse The 26 Editions <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* 2. FAQ & RETURN POLICY PAGE */
export function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'What is PageTurn’s 7-Day Unconditional Replacement Policy?',
      a: 'If your book arrives with binding defects, torn deckle edges, misprinted pages, or postal damage, simply initiate a replacement request within 7 calendar days of delivery. We will courier a fresh archival copy at zero cost and arrange reverse collection of the damaged copy.'
    },
    {
      q: 'How does shipping calculation work?',
      a: 'All orders with a books subtotal of ₹499 or more receive FREE Carbon-Neutral Delivery anywhere in India. For orders below ₹499, a nominal freight fee of ₹60 is applied. If you select Express Priority Courier (Air Cargo), a flat rate of ₹120 applies regardless of cart value.'
    },
    {
      q: 'Are your books physical paper editions?',
      a: 'Yes. Every title listed in the PageTurn catalogue is a genuine physical print volume. We do not sell e-books or audio files. Our books are printed with vegetable-based inks on archival acid-free stock.'
    },
    {
      q: 'Which payment instruments do you support?',
      a: 'Our portal supports simulated UPI (Google Pay, PhonePe, Paytm, BHIM via QR or VPA), Credit/Debit Cards with live Luhn validation (Visa, MasterCard, RuPay), and Cash on Delivery (COD) across eligible PIN codes.'
    },
    {
      q: 'How can I redeem promotional discount coupons?',
      a: 'On either the slide-in reading bag or the dedicated Cart Page, type your promotional voucher (e.g. READ10 for 10% off or WELCOME20 for 20% off) into the coupon box and click "Apply". The discount is computed instantaneously.'
    },
    {
      q: 'Do you ship to academic libraries and public institutions?',
      a: 'Yes. We frequently supply university libraries, architecture ateliers, and design faculties with custom invoices that comply with 5% GST and institutional tax audits. Contact dispatch@pageturn.com for institutional purchase orders.'
    }
  ];

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="badge-sticker">CUSTOMER DISPATCH & RETURNS</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', margin: '0.5rem 0 0.8rem' }}>
            Frequently Asked Questions & Policy
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Details regarding packaging, reverse pickups, tax invoices, and courier timelines.
          </p>
        </div>

        {/* Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="neo-box"
                style={{
                  backgroundColor: 'var(--bg-paper)',
                  overflow: 'hidden'
                }}
              >
                <div
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    backgroundColor: isOpen ? 'var(--bg-subtle)' : 'var(--bg-paper)'
                  }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', margin: 0 }}>
                    {faq.q}
                  </h3>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {isOpen && (
                  <div
                    style={{
                      padding: '1.25rem 1.5rem',
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      color: 'var(--text-secondary)',
                      borderTop: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-card)'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* 3. CONTACT PAGE */
export function ContactPage() {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Manuscript Submission');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your dispatch has been received. Our editorial team will review it within 3 business days.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="badge-sticker red">EDITORIAL INBOX</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', margin: '0.5rem 0 0.8rem' }}>
            Dispatch a Letter to PageTurn
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Whether you are submitting an unpublished manuscript, inquiring about bulk orders, or seeking reader guidance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="neo-box" style={{ padding: '2.25rem', backgroundColor: 'var(--bg-paper)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Rostova"
                className="neo-input"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@example.com"
                className="neo-input"
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Subject of Inquiry
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="neo-select"
            >
              <option value="Manuscript Submission">Manuscript Submission / Zine Proposal</option>
              <option value="Order Logistics">Order Logistics & Courier Inquiries</option>
              <option value="Institutional Orders">Institutional & University Acquisitions</option>
              <option value="Press Inquiries">Media & Literary Review Desk</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Your Message
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your manuscript abstract or inquiry in detail..."
              className="neo-input"
              required
            />
          </div>

          <button type="submit" className="neo-btn neo-btn-primary" style={{ padding: '0.85rem 2rem' }}>
            Transmit Dispatch <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
