import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import BookCover from '../components/BookCover';
import {
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Search,
  MapPin,
  Calendar,
  FastForward,
  RotateCcw
} from 'lucide-react';

export default function OrderTrackingPage({ orderId }) {
  const { orders, updateOrderStatus, navigateTo, showToast } = useStore();

  // Selected order or search
  const [searchId, setSearchId] = useState(orderId || (orders[0] ? orders[0].id : 'ORD-9421-PT'));
  const order = orders.find(o => o.id === searchId) || orders[0];

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find(o => o.id.trim().toUpperCase() === searchId.trim().toUpperCase());
    if (!found) {
      showToast(`Order "${searchId}" not found`, 'error');
    }
  };

  const stepsList = ['Placed', 'Packed', 'Shipped', 'Delivered'];
  const currentStepIndex = order ? stepsList.indexOf(order.status) : 0;

  // Simulator helper: advance to next stage
  const handleAdvanceStatus = () => {
    if (!order) return;
    if (currentStepIndex < stepsList.length - 1) {
      const nextStatus = stepsList[currentStepIndex + 1];
      updateOrderStatus(order.id, nextStatus);
    } else {
      updateOrderStatus(order.id, 'Placed');
      showToast('Status cycled back to "Placed" for simulation testing', 'info');
    }
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div
          style={{
            borderBottom: 'var(--border-width) solid var(--border-color)',
            paddingBottom: '1.25rem',
            marginBottom: '2.5rem'
          }}
        >
          <span className="badge-sticker">REAL-TIME LOGISTICS</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3rem)', marginTop: '0.4rem' }}>
            Package Timeline & Courier Manifest
          </h1>
        </div>

        {/* Search Order ID Bar */}
        <div
          className="neo-box"
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-paper)',
            marginBottom: '2rem'
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ flexGrow: 1, position: 'relative' }}>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                placeholder="Enter Order ID (e.g. ORD-9421-PT)..."
                className="neo-input"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}
              />
            </div>
            <button type="submit" className="neo-btn neo-btn-primary">
              <Search size={16} /> Track Order
            </button>
          </form>

          {/* Quick Order Switcher if multiple orders exist */}
          {orders.length > 1 && (
            <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Demo Orders in System:
              </span>
              {orders.slice(0, 4).map(ord => (
                <button
                  key={ord.id}
                  onClick={() => setSearchId(ord.id)}
                  className="neo-btn"
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.7rem',
                    backgroundColor: searchId === ord.id ? 'var(--accent-mustard)' : 'transparent'
                  }}
                >
                  {ord.id} ({ord.status})
                </button>
              ))}
            </div>
          )}
        </div>

        {!order ? (
          <div className="neo-box" style={{ padding: '3rem', textAlign: 'center' }}>
            <h3>No order found matching "{searchId}".</h3>
          </div>
        ) : (
          <div>
            {/* Visual Timeline Card */}
            <div
              className="neo-box"
              style={{
                backgroundColor: 'var(--bg-card)',
                padding: '2.5rem 2rem',
                marginBottom: '2rem'
              }}
            >
              <div className="flex-between" style={{ marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    TRACKING WAYBILL NUMBER: <strong>AWB-PT-{order.id.replace('ORD-', '')}</strong>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: 0 }}>
                    Order Status: <span style={{ color: 'var(--accent-tomato)' }}>{order.status}</span>
                  </h2>
                </div>

                {/* Simulation Button to advance status */}
                <button
                  onClick={handleAdvanceStatus}
                  className="neo-btn neo-btn-secondary"
                  title="Simulate courier advancing status"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}
                >
                  <FastForward size={16} /> Simulate Next Status Step
                </button>
              </div>

              {/* Step Timeline Graphic */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  position: 'relative',
                  marginBottom: '2.5rem'
                }}
                className="timeline-steps-grid"
              >
                {/* Horizontal connector line */}
                <div
                  style={{
                    position: 'absolute',
                    top: '22px',
                    left: '12%',
                    right: '12%',
                    height: '4px',
                    backgroundColor: 'var(--border-color)',
                    zIndex: 1
                  }}
                  className="timeline-connector"
                />

                {stepsList.map((step, idx) => {
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  const timelineInfo = order.trackingTimeline?.[idx];

                  return (
                    <div
                      key={step}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      {/* Step Circle */}
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          border: '2px solid var(--border-color)',
                          backgroundColor: isDone
                            ? isCurrent
                              ? 'var(--accent-tomato)'
                              : 'var(--accent-mustard)'
                            : 'var(--bg-paper)',
                          color: isDone ? (isCurrent ? '#FFFDF9' : '#141414') : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '2px 2px 0 var(--border-color)',
                          marginBottom: '0.75rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isDone ? <CheckCircle2 size={22} /> : <Clock size={20} />}
                      </div>

                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          fontSize: '1rem',
                          color: isDone ? 'var(--text-primary)' : 'var(--text-muted)',
                          marginBottom: '0.2rem'
                        }}
                      >
                        {step}
                      </div>

                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.3
                        }}
                      >
                        {timelineInfo?.time || 'Pending'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Current status description */}
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-paper)',
                  border: '1.5px solid var(--border-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <Truck size={20} color="var(--accent-tomato)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Courier Dispatch Note:</strong>{' '}
                  {order.trackingTimeline?.[currentStepIndex]?.desc ||
                    'In transit with carbon-neutral logistics carrier.'}
                </div>
              </div>
            </div>

            {/* Order Details & Summary Breakdown */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '2rem'
              }}
              className="tracking-details-grid"
            >
              {/* Order Items */}
              <div
                className="neo-box"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  padding: '1.75rem'
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem',
                    borderBottom: 'var(--border-width) solid var(--border-color)',
                    paddingBottom: '0.75rem',
                    marginBottom: '1.25rem'
                  }}
                >
                  Articles in Consignment ({order.items.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {order.items.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        paddingBottom: '1rem',
                        borderBottom: '1px dashed var(--border-color)'
                      }}
                    >
                      <div style={{ width: '45px', flexShrink: 0 }}>
                        <BookCover book={item} width="100%" aspectRatio="2 / 2.8" showSpine={false} />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.95rem' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          by {item.author}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-tomato)', fontWeight: 700, marginTop: '2px' }}>
                          Qty: {item.quantity} × ₹{item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Info & Invoice Link */}
              <div
                className="neo-box"
                style={{
                  backgroundColor: 'var(--bg-paper)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      borderBottom: 'var(--border-width) solid var(--border-color)',
                      paddingBottom: '0.75rem',
                      marginBottom: '1rem'
                    }}
                  >
                    Destination
                  </h3>

                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: 700 }}>{order.shippingAddress.fullName}</div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}<br />
                      Phone: {order.shippingAddress.phone}
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      padding: '0.75rem',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-color)',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div>Method: <strong>{order.deliveryMethod}</strong></div>
                    <div>Paid via: <strong>{order.paymentMethod}</strong></div>
                    <div>Total: <strong>₹{order.pricing.total}</strong></div>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('order-confirmation', { orderId: order.id })}
                  className="neo-btn neo-btn-primary"
                  style={{ width: '100%' }}
                >
                  View & Print Tax Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-connector { display: none !important; }
          .timeline-steps-grid { grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; }
          .tracking-details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
