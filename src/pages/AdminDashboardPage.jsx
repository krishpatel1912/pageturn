import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import BookCover from '../components/BookCover';
import {
  ShieldCheck,
  TrendingUp,
  Package,
  Layers,
  Users,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  LogOut,
  RefreshCw,
  Search,
  DollarSign,
  BarChart3,
  PieChart
} from 'lucide-react';
import { GENRES } from '../data/initialBooks';
import { INITIAL_CUSTOMERS } from '../data/initialData';

export default function AdminDashboardPage() {
  const {
    isAdminLoggedIn,
    login,
    logout,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    orders,
    updateOrderStatus,
    navigateTo,
    showToast
  } = useStore();

  // Admin login credentials state
  const [adminEmail, setAdminEmail] = useState('admin@pageturn.com');
  const [adminPassword, setAdminPassword] = useState('admin123');

  // Active Admin Tab: 'analytics', 'inventory', 'orders', 'customers'
  const [activeTab, setActiveTab] = useState('analytics');

  // Product modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    price: 499,
    originalPrice: 599,
    stock: 10,
    isbn: '978-0-12345-678-9',
    pages: 280,
    badge: 'NEW',
    pattern: 'bauhaus-shapes',
    bgColor: '#E4472B',
    textColor: '#F4EDE0',
    description: '',
    quotes: ''
  });

  // Inventory search
  const [inventorySearch, setInventorySearch] = useState('');

  // Orders status filter
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // If not logged in as admin
  if (!isAdminLoggedIn) {
    return (
      <div style={{ padding: '4rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '440px' }}>
          <div
            className="neo-box"
            style={{
              padding: '2.5rem 2rem',
              backgroundColor: 'var(--bg-paper)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 1.25rem',
                backgroundColor: 'var(--accent-mustard)',
                border: '2px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={32} color="#141414" />
            </div>

            <span className="badge-sticker red" style={{ marginBottom: '0.5rem' }}>
              RESTRICTED CONSOLE
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: '0.4rem 0 0.5rem' }}>
              Admin ERP Dashboard
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              Inventory tracking, order fulfillment pipeline, and sales intelligence.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                login(adminEmail, adminPassword);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}
            >
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Admin ID
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="neo-input"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Master Key
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="neo-input"
                  required
                />
              </div>

              <button
                type="submit"
                className="neo-btn neo-btn-primary"
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
              >
                Access ERP Console
              </button>
            </form>

            <div
              style={{
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px dashed var(--border-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}
            >
              Credentials: <strong>admin@pageturn.com</strong> / <strong>admin123</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- STATS CALCULATIONS ---
  const totalRevenue = orders.reduce((acc, o) => acc + (o.pricing?.total || 0), 0);
  const totalBooksStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const totalOrdersCount = orders.length;

  // Handle open create product
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      author: '',
      genre: 'Fiction',
      price: 499,
      originalPrice: 599,
      stock: 12,
      isbn: '978-0-' + Math.floor(100000 + Math.random() * 900000) + '-0',
      pages: 320,
      badge: 'NEW',
      pattern: 'circles',
      bgColor: '#E4472B',
      textColor: '#F4EDE0',
      description: '',
      quotes: ''
    });
    setShowProductModal(true);
  };

  // Handle open edit product
  const handleOpenEditModal = (book) => {
    setEditingProduct(book);
    setProductForm({ ...book });
    setShowProductModal(true);
  };

  // Save Product (Create or Edit)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.author || !productForm.price) {
      showToast('Please complete required book details', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice || productForm.price),
        stock: Number(productForm.stock)
      });
    } else {
      addProduct(productForm);
    }
    setShowProductModal(false);
  };

  // Filtered Inventory
  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.author.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.genre.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  // Filtered Orders
  const filteredOrders = orderStatusFilter === 'All'
    ? orders
    : orders.filter((o) => o.status === orderStatusFilter);

  return (
    <div style={{ padding: '2.5rem 0 6rem' }}>
      <div className="container">
        {/* Top ERP Admin Navigation Bar */}
        <div
          className="neo-box"
          style={{
            padding: '1.5rem 2rem',
            backgroundColor: 'var(--bg-paper)',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: 'var(--accent-mustard)',
                border: '2px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={24} color="#141414" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', margin: 0 }}>
                  PageTurn ERP & Warehouse
                </h1>
                <span className="badge-sticker red" style={{ fontSize: '0.65rem' }}>
                  OPERATIONAL
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Authenticated as: <strong>admin@pageturn.com</strong>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => navigateTo('catalogue')}
              className="neo-btn"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}
            >
              Storefront View →
            </button>
            <button
              onClick={logout}
              className="neo-btn"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.82rem', color: '#EF4444' }}
            >
              <LogOut size={14} /> Exit Admin
            </button>
          </div>
        </div>

        {/* Executive KPI Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}
        >
          <div className="neo-box" style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                GROSS REVENUE
              </span>
              <DollarSign size={18} color="var(--accent-tomato)" />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 900 }}>
              ₹{totalRevenue.toFixed(2)}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-sage)', fontWeight: 600 }}>
              ↑ 18.4% this quarter
            </span>
          </div>

          <div className="neo-box" style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                TOTAL REQUISITIONS
              </span>
              <Package size={18} color="var(--accent-mustard)" />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 900 }}>
              {totalOrdersCount}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {orders.filter((o) => o.status === 'Placed' || o.status === 'Packed').length} in active transit
            </span>
          </div>

          <div className="neo-box" style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                ACTIVE PRESS TITLES
              </span>
              <Layers size={18} color="#38BDF8" />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 900 }}>
              {products.length}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {totalBooksStock} physical copies in stock
            </span>
          </div>

          <div className="neo-box" style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                LOW STOCK ALERTS
              </span>
              <AlertTriangle size={18} color={lowStockCount > 0 ? '#EF4444' : 'var(--accent-sage)'} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 900, color: lowStockCount > 0 ? '#EF4444' : 'inherit' }}>
              {lowStockCount}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Titles with &le; 5 units remaining
            </span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: 'var(--border-width) solid var(--border-color)',
            marginBottom: '2rem',
            gap: '0.5rem',
            overflowX: 'auto'
          }}
        >
          <button
            onClick={() => setActiveTab('analytics')}
            className="neo-btn"
            style={{
              backgroundColor: activeTab === 'analytics' ? 'var(--accent-tomato)' : 'var(--bg-card)',
              color: activeTab === 'analytics' ? '#FFFDF9' : 'var(--text-primary)',
              borderBottom: 'none'
            }}
          >
            <BarChart3 size={16} /> Sales & Category Analytics
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className="neo-btn"
            style={{
              backgroundColor: activeTab === 'inventory' ? 'var(--accent-tomato)' : 'var(--bg-card)',
              color: activeTab === 'inventory' ? '#FFFDF9' : 'var(--text-primary)',
              borderBottom: 'none'
            }}
          >
            <Layers size={16} /> Inventory & Stock Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className="neo-btn"
            style={{
              backgroundColor: activeTab === 'orders' ? 'var(--accent-tomato)' : 'var(--bg-card)',
              color: activeTab === 'orders' ? '#FFFDF9' : 'var(--text-primary)',
              borderBottom: 'none'
            }}
          >
            <Package size={16} /> Order Management ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className="neo-btn"
            style={{
              backgroundColor: activeTab === 'customers' ? 'var(--accent-tomato)' : 'var(--bg-card)',
              color: activeTab === 'customers' ? '#FFFDF9' : 'var(--text-primary)',
              borderBottom: 'none'
            }}
          >
            <Users size={16} /> Customers ({INITIAL_CUSTOMERS.length})
          </button>
        </div>

        {/* ================= TAB 1: ANALYTICS & CHARTS (PURE SVG) ================= */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Charts Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                gap: '2rem'
              }}
            >
              {/* Chart 1: Monthly Sales Revenue Bar Chart (Pure SVG) */}
              <div className="neo-box" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <span className="badge-sticker">MONTHLY RUN-RATE</span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginTop: '0.3rem' }}>
                      Revenue Breakdown (INR)
                    </h3>
                  </div>
                  <BarChart3 size={20} color="var(--accent-tomato)" />
                </div>

                {/* SVG Bar Chart */}
                <div style={{ width: '100%', height: '260px' }}>
                  <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%' }}>
                    {/* Y-axis guidelines */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="var(--border-color)" strokeDasharray="3 3" opacity="0.2" />
                    <text x="35" y="24" fill="var(--text-muted)" fontSize="10" textAnchor="end" fontFamily="monospace">₹40k</text>

                    <line x1="40" y1="80" x2="480" y2="80" stroke="var(--border-color)" strokeDasharray="3 3" opacity="0.2" />
                    <text x="35" y="84" fill="var(--text-muted)" fontSize="10" textAnchor="end" fontFamily="monospace">₹30k</text>

                    <line x1="40" y1="140" x2="480" y2="140" stroke="var(--border-color)" strokeDasharray="3 3" opacity="0.2" />
                    <text x="35" y="144" fill="var(--text-muted)" fontSize="10" textAnchor="end" fontFamily="monospace">₹15k</text>

                    <line x1="40" y1="200" x2="480" y2="200" stroke="var(--border-color)" strokeWidth="2" />
                    <text x="35" y="204" fill="var(--text-muted)" fontSize="10" textAnchor="end" fontFamily="monospace">₹0</text>

                    {/* Bars: Jun, Jul, Aug, Sep, Oct */}
                    {[
                      { month: 'Jun', val: 18500, h: 90, x: 75, color: '#E8B931' },
                      { month: 'Jul', val: 24200, h: 120, x: 155, color: '#E8B931' },
                      { month: 'Aug', val: 31000, h: 155, x: 235, color: '#E8B931' },
                      { month: 'Sep', val: 28400, h: 142, x: 315, color: '#E8B931' },
                      { month: 'Oct (Current)', val: 39850, h: 185, x: 395, color: '#E4472B' }
                    ].map((b) => (
                      <g key={b.month}>
                        <rect
                          x={b.x}
                          y={200 - b.h}
                          width="46"
                          height={b.h}
                          fill={b.color}
                          stroke="var(--border-color)"
                          strokeWidth="2"
                        />
                        <text
                          x={b.x + 23}
                          y={192 - b.h}
                          fill="var(--text-primary)"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          ₹{(b.val / 1000).toFixed(1)}k
                        </text>
                        <text
                          x={b.x + 23}
                          y="218"
                          fill="var(--text-primary)"
                          fontSize="11"
                          fontWeight="600"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                        >
                          {b.month}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Chart 2: Category Distribution Donut / Radial (Pure SVG) */}
              <div className="neo-box" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <span className="badge-sticker">CATALOG DIVERSITY</span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginTop: '0.3rem' }}>
                      Genre Sales Distribution
                    </h3>
                  </div>
                  <PieChart size={20} color="var(--accent-mustard)" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ width: '180px', height: '180px', flexShrink: 0 }}>
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      {/* Circumference = 2 * PI * 35 = 220 */}
                      {/* Segment 1: Philosophy (28%) = 61.6 */}
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#E4472B" strokeWidth="22" strokeDasharray="61.6 158.4" strokeDashoffset="0" />
                      {/* Segment 2: Design & Art (24%) = 52.8 */}
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#E8B931" strokeWidth="22" strokeDasharray="52.8 167.2" strokeDashoffset="-61.6" />
                      {/* Segment 3: Fiction (22%) = 48.4 */}
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#2A4736" strokeWidth="22" strokeDasharray="48.4 171.6" strokeDashoffset="-114.4" />
                      {/* Segment 4: Sci-Fi & Poetry (26%) = 57.2 */}
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#0E7490" strokeWidth="22" strokeDasharray="57.2 162.8" strokeDashoffset="-162.8" />
                    </svg>
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flexGrow: 1, fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '12px', height: '12px', backgroundColor: '#E4472B', border: '1px solid var(--border-color)' }} />
                      <span>Philosophy (28% • ₹42,100)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '12px', height: '12px', backgroundColor: '#E8B931', border: '1px solid var(--border-color)' }} />
                      <span>Design & Art (24% • ₹36,200)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '12px', height: '12px', backgroundColor: '#2A4736', border: '1px solid var(--border-color)' }} />
                      <span>Fiction & Epics (22% • ₹33,100)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '12px', height: '12px', backgroundColor: '#0E7490', border: '1px solid var(--border-color)' }} />
                      <span>Sci-Fi & Poetry (26% • ₹38,900)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Books Table */}
            <div className="neo-box" style={{ padding: '2rem', backgroundColor: 'var(--bg-paper)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '1.25rem' }}>
                Top Selling Titles & Inventory Velocity
              </h3>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', backgroundColor: 'var(--bg-subtle)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>RANK</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>TITLE</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>GENRE</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>PRICE</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>COPIES SOLD</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>REVENUE</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, title: 'The Architecture of Solitude', genre: 'Philosophy', price: 649, sold: 142, revenue: 92158 },
                    { rank: 2, title: 'The Bauhaus Manifesto & Legacy', genre: 'Design & Art', price: 899, sold: 98, revenue: 88102 },
                    { rank: 3, title: 'Wild Fermentation & Earth Craft', genre: 'Non-Fiction', price: 699, sold: 115, revenue: 80385 },
                    { rank: 4, title: 'Tokyo Neon Drift', genre: 'Sci-Fi', price: 499, sold: 130, revenue: 64870 },
                    { rank: 5, title: 'Monsoon Letters', genre: 'Fiction', price: 420, sold: 122, revenue: 51240 }
                  ].map((row) => (
                    <tr key={row.rank} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>#{row.rank}</td>
                      <td style={{ padding: '0.75rem', fontWeight: 600 }}>{row.title}</td>
                      <td style={{ padding: '0.75rem' }}><span className="badge-sticker">{row.genre}</span></td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>₹{row.price}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{row.sold}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-tomato)' }}>₹{row.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 2: INVENTORY MANAGEMENT ================= */}
        {activeTab === 'inventory' && (
          <div className="neo-box" style={{ padding: '2rem', backgroundColor: 'var(--bg-paper)' }}>
            <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: 0 }}>
                  Warehouse Inventory Control
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                  Adjust live physical stock quantities, add new editions, or edit catalog listings.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                    placeholder="Search titles / authors..."
                    className="neo-input"
                    style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem', width: '220px' }}
                  />
                </div>
                <button
                  onClick={handleOpenCreateModal}
                  className="neo-btn neo-btn-primary"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  <Plus size={16} /> Induct New Book
                </button>
              </div>
            </div>

            {/* Product Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>COVER</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>BOOK TITLE & AUTHOR</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>GENRE</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>PRICE</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>STOCK LEVEL</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>STATUS</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((book) => {
                    const isLow = book.stock <= 5;
                    const isOut = book.stock <= 0;

                    return (
                      <tr key={book.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.65rem 0.5rem', width: '42px' }}>
                          <div style={{ width: '36px' }}>
                            <BookCover book={book} width="100%" aspectRatio="2 / 2.8" showSpine={false} />
                          </div>
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem' }}>
                          <div style={{ fontWeight: 700, fontFamily: 'var(--font-serif)', fontSize: '0.95rem' }}>
                            {book.title}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                            by {book.author}
                          </div>
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem' }}>
                          <span className="badge-sticker">{book.genre}</span>
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          ₹{book.price}
                        </td>
                        {/* Quick Stock Controls */}
                        <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-color)' }}>
                            <button
                              onClick={() => adjustStock(book.id, -1)}
                              disabled={book.stock <= 0}
                              style={{ padding: '0.2rem 0.4rem', background: 'var(--bg-paper)' }}
                              title="Decrease stock"
                            >
                              -
                            </button>
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '0 0.5rem' }}>
                              {book.stock}
                            </span>
                            <button
                              onClick={() => adjustStock(book.id, 1)}
                              style={{ padding: '0.2rem 0.4rem', background: 'var(--bg-paper)' }}
                              title="Increase stock"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center' }}>
                          {isOut ? (
                            <span className="badge-sticker red" style={{ fontSize: '0.68rem' }}>OUT OF STOCK</span>
                          ) : isLow ? (
                            <span className="badge-sticker" style={{ background: '#F59E0B', color: '#FFF', fontSize: '0.68rem' }}>LOW: {book.stock}</span>
                          ) : (
                            <span className="badge-sticker" style={{ background: 'var(--accent-sage)', color: '#FFF', fontSize: '0.68rem' }}>OK</span>
                          )}
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => handleOpenEditModal(book)}
                              className="neo-btn"
                              style={{ padding: '0.3rem 0.55rem' }}
                              title="Edit Title"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => deleteProduct(book.id)}
                              className="neo-btn"
                              style={{ padding: '0.3rem 0.55rem', color: '#EF4444' }}
                              title="Delete Title"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDER MANAGEMENT ================= */}
        {activeTab === 'orders' && (
          <div className="neo-box" style={{ padding: '2rem', backgroundColor: 'var(--bg-paper)' }}>
            <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: 0 }}>
                  Order Fulfillment Pipeline (ERP)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                  Manage dispatch statuses, generate packaging waybills, and view customer manifests.
                </p>
              </div>

              {/* Status filter tabs */}
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['All', 'Placed', 'Packed', 'Shipped', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className="neo-btn"
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      backgroundColor: orderStatusFilter === st ? 'var(--accent-tomato)' : 'transparent',
                      color: orderStatusFilter === st ? '#FFFDF9' : 'var(--text-primary)'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>ORDER ID</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>CUSTOMER</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>DATE</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>TOTAL</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>PAYMENT</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>ERP STATUS</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>INVOICE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {ord.id}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <div style={{ fontWeight: 700 }}>{ord.customer?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ord.customer?.email}</div>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                        {ord.formattedDate}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        ₹{ord.pricing?.total}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.8rem' }}>
                        {ord.paymentMethod}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="neo-select"
                          style={{
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.78rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            width: 'auto'
                          }}
                        >
                          <option value="Placed">Placed</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                        <button
                          onClick={() => navigateTo('order-confirmation', { orderId: ord.id })}
                          className="neo-btn"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: CUSTOMERS ================= */}
        {activeTab === 'customers' && (
          <div className="neo-box" style={{ padding: '2rem', backgroundColor: 'var(--bg-paper)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>
              Registered Customer Directory (CRM)
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>CUSTOMER ID</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>NAME & EMAIL</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>CITY</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>ORDERS</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>TOTAL SPENT</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>MEMBER SINCE</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_CUSTOMERS.map((cust) => (
                  <tr key={cust.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{cust.id}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: 700 }}>{cust.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cust.email}</div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{cust.city}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{cust.ordersCount}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-tomato)' }}>₹{cust.totalSpent.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{cust.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT */}
        {showProductModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setShowProductModal(false)}
          >
            <div
              className="neo-box"
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: 'var(--bg-paper)',
                padding: '2rem'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.25rem' }}>
                {editingProduct ? 'Edit Book Edition' : 'Induct New Title to Press'}
              </h2>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Book Title
                    </label>
                    <input
                      type="text"
                      value={productForm.title}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      className="neo-input"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Author / Compiler
                    </label>
                    <input
                      type="text"
                      value={productForm.author}
                      onChange={(e) => setProductForm({ ...productForm, author: e.target.value })}
                      className="neo-input"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Genre
                    </label>
                    <select
                      value={productForm.genre}
                      onChange={(e) => setProductForm({ ...productForm, genre: e.target.value })}
                      className="neo-select"
                    >
                      {GENRES.filter((g) => g !== 'All').map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Selling Price (INR)
                    </label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="neo-input"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Warehouse Stock
                    </label>
                    <input
                      type="number"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className="neo-input"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Cover Geometric Pattern
                    </label>
                    <select
                      value={productForm.pattern}
                      onChange={(e) => setProductForm({ ...productForm, pattern: e.target.value })}
                      className="neo-select"
                    >
                      <option value="circles">Circles / Concentric</option>
                      <option value="bauhaus-shapes">Bauhaus Geometry</option>
                      <option value="grid">Cyberpunk Grid</option>
                      <option value="stripes">Retro Stripes</option>
                      <option value="diagonal">Diagonal Constructivist</option>
                      <option value="dots">Halftone Screen</option>
                      <option value="moon">Nocturne Moon</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Cover Color
                    </label>
                    <input
                      type="color"
                      value={productForm.bgColor}
                      onChange={(e) => setProductForm({ ...productForm, bgColor: e.target.value })}
                      style={{ width: '100%', height: '42px', border: '2px solid var(--border-color)', cursor: 'pointer' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={productForm.badge}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                      placeholder="e.g. NEW, RARE"
                      className="neo-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Critical Quote / Excerpt
                  </label>
                  <input
                    type="text"
                    value={productForm.quotes}
                    onChange={(e) => setProductForm({ ...productForm, quotes: e.target.value })}
                    placeholder="Short pull-quote..."
                    className="neo-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Synopsis & Archival Notes
                  </label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="neo-input"
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="neo-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="neo-btn neo-btn-primary"
                  >
                    {editingProduct ? 'Save Changes' : 'Confirm Book Induction'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
