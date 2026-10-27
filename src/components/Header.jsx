import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Moon,
  Sun,
  User,
  Menu,
  X,
  Compass,
  Package,
  BookOpen,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Header({ onOpenAuth }) {
  const {
    theme,
    toggleTheme,
    cartCount,
    wishlist,
    setIsDrawerOpen,
    user,
    isAdminLoggedIn,
    logout,
    products,
    navigateTo,
    route,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter live search suggestions
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.genre.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  // Close search/user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectBook = (bookId) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigateTo('product', { id: bookId });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigateTo('catalogue');
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: 'var(--bg-primary)',
        borderBottom: 'var(--border-width) solid var(--border-color)',
        transition: 'background-color 0.2s ease'
      }}
    >
      {/* 1. Top Ticker Marquee Strip */}
      <div className="ticker-strip">
        <div className="ticker-content">
          <span>
            ★ FREE SHIPPING OVER ₹499 &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; NEW INDIE ARRIVALS EVERY FRIDAY &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; 100% PLASTIC-FREE KRAFT PACKAGING &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; USE CODE <strong>READ10</strong> FOR 10% OFF &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; INDEPENDENT PRESSES ONLY &nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span>
            ★ FREE SHIPPING OVER ₹499 &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; NEW INDIE ARRIVALS EVERY FRIDAY &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; 100% PLASTIC-FREE KRAFT PACKAGING &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; USE CODE <strong>READ10</strong> FOR 10% OFF &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; INDEPENDENT PRESSES ONLY &nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="container" style={{ padding: '0.85rem 1.5rem' }}>
        <div className="flex-between" style={{ gap: '1rem' }}>
          {/* Left: Mobile hamburger & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            {/* Hamburger button on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="neo-btn"
              style={{
                display: 'none',
                padding: '0.45rem',
                border: '2px solid var(--border-color)'
              }}
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Brand Logo */}
            <div
              onClick={() => navigateTo('home')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                userSelect: 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span
                  style={{
                    backgroundColor: 'var(--accent-tomato)',
                    color: '#FFFDF9',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 900,
                    fontSize: '1.25rem',
                    padding: '0.1rem 0.45rem',
                    border: '2px solid var(--border-color)',
                    boxShadow: '2px 2px 0 var(--border-color)'
                  }}
                >
                  P
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 900,
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)'
                  }}
                >
                  PAGE<span style={{ fontStyle: 'italic', color: 'var(--accent-tomato)' }}>TURN</span>
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: 'var(--text-muted)',
                  marginTop: '-2px'
                }}
              >
                Independent Press & Archive
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '0.92rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
            className="desktop-nav"
          >
            <button
              onClick={() => navigateTo('catalogue')}
              style={{
                color: route.page === 'catalogue' ? 'var(--accent-tomato)' : 'var(--text-primary)',
                borderBottom: route.page === 'catalogue' ? '2px solid var(--accent-tomato)' : 'none',
                paddingBottom: '2px'
              }}
            >
              Catalogue
            </button>
            <button
              onClick={() => navigateTo('about')}
              style={{
                color: route.page === 'about' ? 'var(--accent-tomato)' : 'var(--text-primary)',
                borderBottom: route.page === 'about' ? '2px solid var(--accent-tomato)' : 'none',
                paddingBottom: '2px'
              }}
            >
              Manifesto
            </button>
            <button
              onClick={() => navigateTo('order-tracking')}
              style={{
                color: route.page === 'order-tracking' ? 'var(--accent-tomato)' : 'var(--text-primary)',
                borderBottom: route.page === 'order-tracking' ? '2px solid var(--accent-tomato)' : 'none',
                paddingBottom: '2px'
              }}
            >
              Track Order
            </button>
            <button
              onClick={() => navigateTo('faq')}
              style={{
                color: route.page === 'faq' ? 'var(--accent-tomato)' : 'var(--text-primary)',
                borderBottom: route.page === 'faq' ? '2px solid var(--accent-tomato)' : 'none',
                paddingBottom: '2px'
              }}
            >
              FAQ / Policy
            </button>
          </nav>

          {/* Right: Search Bar with Live Suggestions & Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Live Search Input & Dropdown */}
            <div ref={searchRef} style={{ position: 'relative' }} className="header-search-wrapper">
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search books, authors, genres..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    style={{
                      width: '230px',
                      padding: '0.45rem 2.2rem 0.45rem 0.85rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      border: '2px solid var(--border-color)',
                      background: 'var(--bg-paper)',
                      color: 'var(--text-primary)',
                      boxShadow: '2px 2px 0 var(--border-color)',
                      outline: 'none'
                    }}
                    className="header-search-input"
                  />
                  <button
                    type="submit"
                    style={{
                      position: 'absolute',
                      right: '6px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                      display: 'flex'
                    }}
                    aria-label="Search"
                  >
                    <Search size={16} />
                  </button>
                </div>
              </form>

              {/* Live Search Suggestions Dropdown */}
              {isSearchOpen && searchQuery.trim() && (
                <div
                  className="neo-box"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    width: '320px',
                    maxHeight: '380px',
                    overflowY: 'auto',
                    backgroundColor: 'var(--bg-card)',
                    zIndex: 999,
                    padding: '0.5rem 0'
                  }}
                >
                  <div
                    style={{
                      padding: '0.4rem 0.85rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--border-color)'
                    }}
                  >
                    Matching Books ({searchResults.length})
                  </div>

                  {searchResults.length === 0 ? (
                    <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      No titles found for "{searchQuery}"
                    </div>
                  ) : (
                    searchResults.map(b => (
                      <div
                        key={b.id}
                        onClick={() => handleSelectBook(b.id)}
                        style={{
                          padding: '0.65rem 0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          cursor: 'pointer',
                          borderBottom: '1px solid var(--border-color)',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '38px',
                            backgroundColor: b.bgColor,
                            border: '1px solid var(--border-color)',
                            flexShrink: 0
                          }}
                        />
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontWeight: 700,
                              fontSize: '0.88rem',
                              lineHeight: 1.2,
                              color: 'var(--text-primary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {b.title}
                          </p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{b.author}</p>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: 'var(--accent-tomato)',
                            flexShrink: 0
                          }}
                        >
                          ₹{b.price}
                        </span>
                      </div>
                    ))
                  )}

                  <div
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('catalogue');
                    }}
                    style={{
                      padding: '0.6rem 0.85rem',
                      textAlign: 'center',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--accent-tomato)',
                      cursor: 'pointer',
                      background: 'var(--bg-paper)'
                    }}
                  >
                    View All Catalogue Results →
                  </div>
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="neo-btn"
              style={{
                padding: '0.45rem',
                border: '2px solid var(--border-color)',
                width: '38px',
                height: '38px'
              }}
              title={theme === 'dark' ? 'Switch to Paper Cream' : 'Switch to Midnight Ink'}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun size={18} color="var(--accent-mustard)" /> : <Moon size={18} />}
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="neo-btn"
              style={{
                padding: '0.45rem',
                position: 'relative',
                border: '2px solid var(--border-color)',
                width: '38px',
                height: '38px'
              }}
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-7px',
                    right: '-7px',
                    background: 'var(--accent-mustard)',
                    color: '#141414',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid var(--border-color)'
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Toggle */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="neo-btn neo-btn-primary"
              style={{
                padding: '0.45rem 0.85rem',
                position: 'relative',
                height: '38px',
                gap: '0.45rem'
              }}
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {cartCount}
              </span>
            </button>

            {/* User Profile / Admin Menu */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              {user || isAdminLoggedIn ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="neo-btn"
                  style={{
                    padding: '0.45rem 0.75rem',
                    height: '38px',
                    border: '2px solid var(--border-color)',
                    background: isAdminLoggedIn ? 'var(--accent-mustard)' : 'var(--bg-paper)'
                  }}
                  aria-label="User Account"
                >
                  <User size={18} />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      maxWidth: '90px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                    className="desktop-username"
                  >
                    {isAdminLoggedIn ? 'Admin' : user.name.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="neo-btn neo-btn-secondary"
                  style={{
                    padding: '0.45rem 0.85rem',
                    height: '38px',
                    fontSize: '0.82rem'
                  }}
                >
                  Sign In
                </button>
              )}

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div
                  className="neo-box"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    width: '210px',
                    backgroundColor: 'var(--bg-card)',
                    zIndex: 999,
                    padding: '0.4rem 0'
                  }}
                >
                  {isAdminLoggedIn ? (
                    <>
                      <div
                        style={{
                          padding: '0.5rem 0.85rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--accent-tomato)',
                          fontWeight: 700,
                          borderBottom: '1px solid var(--border-color)'
                        }}
                      >
                        ADMINISTRATOR
                      </div>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('admin');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.6rem 0.85rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <ShieldCheck size={16} /> Admin ERP Panel
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          padding: '0.5rem 0.85rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--text-muted)',
                          borderBottom: '1px solid var(--border-color)'
                        }}
                      >
                        {user.email}
                      </div>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('profile');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.6rem 0.85rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <User size={16} /> Account & Addresses
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('profile');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.6rem 0.85rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <Package size={16} /> Order History
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('admin');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.6rem 0.85rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: 'var(--accent-tomato)'
                        }}
                      >
                        <ShieldCheck size={16} /> Admin Portal
                      </button>
                    </>
                  )}

                  <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.3rem 0' }} />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.6rem 0.85rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#EF4444'
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div
            className="neo-box"
            style={{
              marginTop: '0.85rem',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              backgroundColor: 'var(--bg-paper)'
            }}
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('catalogue');
              }}
              style={{ textAlign: 'left', fontWeight: 700, padding: '0.4rem 0' }}
            >
              Browse Catalogue
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('about');
              }}
              style={{ textAlign: 'left', fontWeight: 700, padding: '0.4rem 0' }}
            >
              Zine Manifesto
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('order-tracking');
              }}
              style={{ textAlign: 'left', fontWeight: 700, padding: '0.4rem 0' }}
            >
              Track Order
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('faq');
              }}
              style={{ textAlign: 'left', fontWeight: 700, padding: '0.4rem 0' }}
            >
              FAQ & Returns
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('admin');
              }}
              style={{ textAlign: 'left', fontWeight: 700, padding: '0.4rem 0', color: 'var(--accent-tomato)' }}
            >
              Admin Dashboard
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          #mobile-menu-toggle { display: inline-flex !important; }
          .header-search-input { width: 150px !important; }
          .desktop-username { display: none !important; }
        }
        @media (max-width: 480px) {
          .header-search-wrapper { display: none !important; }
        }
      `}</style>
    </header>
  );
}
