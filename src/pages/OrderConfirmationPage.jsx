import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Printer, Compass, ArrowRight, Truck, Package, ShieldCheck } from 'lucide-react';

export default function OrderConfirmationPage({ orderId }) {
  const { orders, navigateTo } = useStore();

  const order = orders.find(o => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Order Not Found</h2>
        <button onClick={() => navigateTo('catalogue')} className="neo-btn neo-btn-primary" style={{ marginTop: '1rem' }}>
          Return to Catalogue
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '920px' }}>
        {/* Success Banner (Hidden during print) */}
        <div
          className="neo-box no-print"
          style={{
            padding: '2rem',
            backgroundColor: 'var(--accent-mustard)',
            color: '#141414',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                backgroundColor: 'var(--accent-tomato)',
                color: '#FFFDF9',
                border: '2px solid #141414',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckCircle2 size={30} />
            </div>
            <div>
              <span className="badge-sticker red" style={{ marginBottom: '0.3rem' }}>
                PAYMENT VERIFIED
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: '0.2rem 0' }}>
                Requisition Confirmed & Logged
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#141414', margin: 0 }}>
                Order #{order.id} has entered the packaging queue. An archival confirmation has been generated.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              onClick={handlePrint}
              className="neo-btn"
              style={{ backgroundColor: '#FFFDF9', color: '#141414' }}
            >
              <Printer size={16} /> Print Official Invoice
            </button>
            <button
              onClick={() => navigateTo('order-tracking', { orderId: order.id })}
              className="neo-btn neo-btn-primary"
            >
              <Truck size={16} /> Track Order Progress
            </button>
          </div>
        </div>

        {/* PRINTABLE INVOICE CARD */}
        <div
          className="neo-box invoice-printable"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#141414',
            padding: '3rem 2.5rem',
            border: '2px solid #141414'
          }}
        >
          {/* Invoice Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '2px solid #141414',
              paddingBottom: '1.75rem',
              marginBottom: '2rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <span
                  style={{
                    backgroundColor: '#E4472B',
                    color: '#FFFDF9',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 900,
                    fontSize: '1.3rem',
                    padding: '0.1rem 0.45rem',
                    border: '1.5px solid #141414'
                  }}
                >
                  P
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 900,
                    fontSize: '1.9rem',
                    letterSpacing: '-0.02em'
                  }}
                >
                  PAGE<span style={{ fontStyle: 'italic', color: '#E4472B' }}>TURN</span>
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#555', margin: '2px 0' }}>
                PageTurn Independent Press & Literary Archive
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#555', margin: '2px 0' }}>
                42 Fountain Chambers, Kala Ghoda Arts District, Mumbai 400001
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#555', margin: '2px 0' }}>
                GSTIN: 27AABCP1420K1Z9 • dispatch@pageturn.com
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#E4472B',
                  display: 'block',
                  marginBottom: '0.4rem'
                }}
              >
                TAX INVOICE
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                <strong>Invoice #:</strong> {order.invoiceNumber}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                <strong>Order #:</strong> {order.id}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                <strong>Date:</strong> {order.formattedDate}
              </div>
            </div>
          </div>

          {/* Billing & Shipping Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              marginBottom: '2rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#777',
                  display: 'block',
                  marginBottom: '0.4rem'
                }}
              >
                Consignee / Deliver To:
              </span>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>
                {order.shippingAddress.fullName}
              </div>
              <div style={{ color: '#444', lineHeight: 1.5 }}>
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}<br />
                Phone: {order.shippingAddress.phone}
              </div>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#777',
                  display: 'block',
                  marginBottom: '0.4rem'
                }}
              >
                Logistics & Payment Method:
              </span>
              <div style={{ color: '#444', lineHeight: 1.5 }}>
                <strong>Courier Service:</strong> {order.deliveryMethod}<br />
                <strong>Settlement:</strong> {order.paymentMethod}<br />
                <strong>Payment Status:</strong> <span style={{ color: '#047857', fontWeight: 700 }}>{order.paymentStatus}</span><br />
                <strong>Dispatch Status:</strong> <span style={{ color: '#E4472B', fontWeight: 700 }}>{order.status}</span>
              </div>
            </div>
          </div>

          {/* Purchased Items Table */}
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '2rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#F4EDE0', borderTop: '2px solid #141414', borderBottom: '2px solid #141414' }}>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>ITEM #</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>BOOK TITLE & AUTHOR</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>UNIT PRICE</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>QTY</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>AMOUNT (INR)</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '0.85rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                    0{idx + 1}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <div style={{ fontWeight: 700, fontFamily: 'var(--font-serif)' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#666' }}>{item.author}</div>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    ₹{item.price}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                    {item.quantity}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Invoice Financial Summary Box */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '2.5rem'
            }}
          >
            <div
              style={{
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            >
              <div className="flex-between">
                <span>Books Subtotal:</span>
                <span>₹{order.pricing.subtotal}</span>
              </div>
              {order.pricing.discount > 0 && (
                <div className="flex-between" style={{ color: '#E4472B' }}>
                  <span>Discount ({order.pricing.couponApplied}):</span>
                  <span>- ₹{order.pricing.discount}</span>
                </div>
              )}
              <div className="flex-between">
                <span>Freight & Handling:</span>
                <span>{order.pricing.shippingFee === 0 ? 'FREE' : `₹${order.pricing.shippingFee}`}</span>
              </div>
              <div className="flex-between">
                <span>GST (5% Books):</span>
                <span>₹{order.pricing.gst}</span>
              </div>
              <div
                className="flex-between"
                style={{
                  borderTop: '2px solid #141414',
                  paddingTop: '0.65rem',
                  fontSize: '1.2rem',
                  fontWeight: 900
                }}
              >
                <span>Total Received:</span>
                <span>₹{order.pricing.total}</span>
              </div>
            </div>
          </div>

          {/* Legal Stamp & Disclaimer */}
          <div
            style={{
              borderTop: '1px dashed #999',
              paddingTop: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#666'
            }}
          >
            <div>
              * Computer-generated official tax invoice for PageTurn Independent Books.<br />
              All books are certified physical print copies. 7-day unconditional replacement for damaged bindings.
            </div>
            <div
              style={{
                border: '2px solid #141414',
                padding: '0.35rem 0.75rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#141414',
                letterSpacing: '0.05em'
              }}
            >
              ★ AUTHENTIC PRESS ARCHIVE
            </div>
          </div>
        </div>

        {/* Post-Checkout Navigation Actions */}
        <div
          className="no-print"
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <button
            onClick={() => navigateTo('catalogue')}
            className="neo-btn"
          >
            ← Continue Browsing Catalogue
          </button>
          <button
            onClick={() => navigateTo('order-tracking', { orderId: order.id })}
            className="neo-btn neo-btn-primary"
          >
            Track Order In Real Time <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
