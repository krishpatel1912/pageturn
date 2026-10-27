import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import BookCover from '../components/BookCover';
import {
  User,
  MapPin,
  Package,
  Plus,
  Trash2,
  Check,
  Truck,
  FileText,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export default function UserProfilePage() {
  const {
    user,
    orders,
    logout,
    addAddress,
    setDefaultAddress,
    deleteAddress,
    navigateTo,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'addresses', 'details'

  // New address form
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: user ? user.name : '',
    phone: user ? user.phone : '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    type: 'Home'
  });

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>
          Please sign in to access your Reader Profile
        </h2>
        <button onClick={() => navigateTo('home')} className="neo-btn neo-btn-primary">
          Return to Home
        </button>
      </div>
    );
  }

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.pinCode) {
      showToast('Please fill all required address fields', 'error');
      return;
    }
    addAddress(newAddr);
    setShowAddAddr(false);
    setNewAddr({
      fullName: user.name,
      phone: user.phone,
      street: '',
      city: '',
      state: '',
      pinCode: '',
      type: 'Home'
    });
  };

  // Filter orders for this user
  const userOrders = orders.filter(
    (o) => o.customer.email.toLowerCase() === user.email.toLowerCase()
  );

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Profile Header Box */}
        <div
          className="neo-box"
          style={{
            padding: '2rem',
            backgroundColor: 'var(--bg-paper)',
            marginBottom: '2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'var(--accent-tomato)',
                color: '#FFFDF9',
                border: '2px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                fontWeight: 900
              }}
            >
              {user.name.charAt(0)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: 0 }}>
                  {user.name}
                </h1>
                <span className="badge-sticker" style={{ background: 'var(--accent-mustard)' }}>
                  {user.membership || 'Bibliophile Member'}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                {user.email} • {user.phone}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="neo-btn"
            style={{ color: '#EF4444', borderColor: '#EF4444' }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Tab Controls */}
        <div
          style={{
            display: 'flex',
            borderBottom: 'var(--border-width) solid var(--border-color)',
            marginBottom: '2rem',
            gap: '0.5rem'
          }}
        >
          <button
            onClick={() => setActiveTab('orders')}
            className="neo-btn"
            style={{
              borderBottom: 'none',
              backgroundColor: activeTab === 'orders' ? 'var(--accent-tomato)' : 'var(--bg-card)',
              color: activeTab === 'orders' ? '#FFFDF9' : 'var(--text-primary)'
            }}
          >
            <Package size={16} /> Order Requisitions ({userOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className="neo-btn"
            style={{
              borderBottom: 'none',
              backgroundColor: activeTab === 'addresses' ? 'var(--accent-tomato)' : 'var(--bg-card)',
              color: activeTab === 'addresses' ? '#FFFDF9' : 'var(--text-primary)'
            }}
          >
            <MapPin size={16} /> Address Book ({user.addresses?.length || 0})
          </button>
        </div>

        {/* TAB 1: ORDER REQUISITIONS HISTORY */}
        {activeTab === 'orders' && (
          <div>
            {userOrders.length === 0 ? (
              <div className="neo-box" style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--bg-card)' }}>
                <p>No orders logged in history yet.</p>
                <button onClick={() => navigateTo('catalogue')} className="neo-btn neo-btn-primary" style={{ marginTop: '1rem' }}>
                  Explore Catalogue
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {userOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="neo-box"
                    style={{
                      padding: '1.75rem',
                      backgroundColor: 'var(--bg-card)'
                    }}
                  >
                    {/* Header */}
                    <div
                      className="flex-between"
                      style={{
                        borderBottom: '1px solid var(--border-color)',
                        paddingBottom: '1rem',
                        marginBottom: '1rem',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1.05rem' }}>
                            {ord.id}
                          </span>
                          <span
                            className="badge-sticker"
                            style={{
                              backgroundColor:
                                ord.status === 'Delivered'
                                  ? 'var(--accent-sage)'
                                  : 'var(--accent-mustard)',
                              color: ord.status === 'Delivered' ? '#FFF' : '#141414'
                            }}
                          >
                            ● {ord.status}
                          </span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          Placed on {ord.formattedDate} • Payment: {ord.paymentMethod}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => navigateTo('order-tracking', { orderId: ord.id })}
                          className="neo-btn neo-btn-secondary"
                          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                        >
                          <Truck size={14} /> Live Tracking
                        </button>
                        <button
                          onClick={() => navigateTo('order-confirmation', { orderId: ord.id })}
                          className="neo-btn"
                          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                        >
                          <FileText size={14} /> Tax Invoice
                        </button>
                      </div>
                    </div>

                    {/* Order items row */}
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {ord.items.map((item) => (
                        <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <div style={{ width: '40px', flexShrink: 0 }}>
                            <BookCover book={item} width="100%" aspectRatio="2 / 2.8" showSpine={false} />
                          </div>
                          <div>
                            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.9rem' }}>
                              {item.title}
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                              Qty: {item.quantity} • ₹{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer total */}
                    <div
                      style={{
                        borderTop: '1px dashed var(--border-color)',
                        paddingTop: '0.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.88rem'
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>
                        Delivery Destination: {ord.shippingAddress.city}, {ord.shippingAddress.state}
                      </span>
                      <span>
                        Order Total: <strong>₹{ord.pricing.total}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADDRESS BOOK */}
        {activeTab === 'addresses' && (
          <div>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>
                Saved Shipping Destinations
              </h2>
              <button
                onClick={() => setShowAddAddr(!showAddAddr)}
                className="neo-btn neo-btn-primary"
                style={{ padding: '0.5rem 1rem' }}
              >
                <Plus size={16} /> {showAddAddr ? 'Cancel' : 'Add New Address'}
              </button>
            </div>

            {/* Add Address Form Modal/Box */}
            {showAddAddr && (
              <form
                onSubmit={handleCreateAddress}
                className="neo-box"
                style={{
                  padding: '1.75rem',
                  backgroundColor: 'var(--bg-paper)',
                  marginBottom: '2rem',
                  maxWidth: '640px'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1rem' }}>
                  Register New Delivery Destination
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="neo-input"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="neo-input"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Street Address, Flat / Studio No.
                  </label>
                  <input
                    type="text"
                    value={newAddr.street}
                    onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                    className="neo-input"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      City
                    </label>
                    <input
                      type="text"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="neo-input"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      State
                    </label>
                    <input
                      type="text"
                      value={newAddr.state}
                      onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                      className="neo-input"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      PIN Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={newAddr.pinCode}
                      onChange={(e) => setNewAddr({ ...newAddr, pinCode: e.target.value })}
                      className="neo-input"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="neo-btn neo-btn-primary">
                  Save Address
                </button>
              </form>
            )}

            {/* List of addresses */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {user.addresses?.map((addr) => (
                <div
                  key={addr.id}
                  className="neo-box"
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'var(--bg-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: addr.isDefault ? '2px solid var(--accent-tomato)' : 'var(--border-width) solid var(--border-color)'
                  }}
                >
                  <div>
                    <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                      <span className="badge-sticker">{addr.type}</span>
                      {addr.isDefault && (
                        <span className="badge-sticker" style={{ background: 'var(--accent-sage)', color: '#FFF' }}>
                          DEFAULT
                        </span>
                      )}
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: '0.3rem' }}>
                      {addr.fullName}
                    </h4>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {addr.street}<br />
                      {addr.city}, {addr.state} - {addr.pinCode}<br />
                      Phone: {addr.phone}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem' }}>
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="neo-btn"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                      >
                        Set as Default
                      </button>
                    )}
                    {user.addresses.length > 1 && (
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="neo-btn"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', color: '#EF4444' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
