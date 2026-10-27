import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_BOOKS } from '../data/initialBooks';
import {
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_DEMO_USER,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS
} from '../data/initialData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // --- 1. Theme State ---
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pt_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pt_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // --- 2. Toast Notifications ---
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- 3. Products & Inventory ---
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('pt_products');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  useEffect(() => {
    localStorage.setItem('pt_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: Date.now(),
      rating: 5.0,
      reviewsCount: 0,
      year: new Date().getFullYear(),
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price),
      stock: Number(newProduct.stock)
    };
    setProducts(prev => [product, ...prev]);
    showToast(`Added "${product.title}" to catalogue`);
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product catalogue updated');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Book removed from catalogue', 'info');
  };

  const adjustStock = (id, delta) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const newStock = Math.max(0, p.stock + delta);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  // --- 4. Reviews State ---
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('pt_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem('pt_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (bookId, reviewData) => {
    const newRev = {
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      ...reviewData
    };
    setReviews(prev => {
      const bookReviews = prev[bookId] || [];
      return { ...prev, [bookId]: [newRev, ...bookReviews] };
    });
    // Update book rating
    setProducts(prev =>
      prev.map(b => {
        if (b.id === Number(bookId)) {
          const currentCount = b.reviewsCount || 0;
          const currentRating = b.rating || 5;
          const newCount = currentCount + 1;
          const newAvg = Number(((currentRating * currentCount + reviewData.rating) / newCount).toFixed(1));
          return { ...b, reviewsCount: newCount, rating: newAvg };
        }
        return b;
      })
    );
    showToast('Review submitted for editorial review');
  };

  // --- 5. Cart & Drawer State ---
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('pt_cart');
    return saved ? JSON.parse(saved) : [
      { ...INITIAL_BOOKS[0], quantity: 1 },
      { ...INITIAL_BOOKS[2], quantity: 1 }
    ];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('READ10');
  const [appliedCoupon, setAppliedCoupon] = useState(INITIAL_COUPONS[0]);

  useEffect(() => {
    localStorage.setItem('pt_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book, quantity = 1) => {
    if (book.stock <= 0) {
      showToast('Item is currently out of stock', 'error');
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        const updatedQty = Math.min(existing.quantity + quantity, book.stock);
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: updatedQty } : item
        );
      }
      return [...prev, { ...book, quantity: Math.min(quantity, book.stock) }];
    });
    showToast(`Added "${book.title}" to cart`);
    setIsDrawerOpen(true);
  };

  const updateQuantity = (bookId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(bookId);
      return;
    }
    const book = products.find(p => p.id === bookId);
    const maxStock = book ? book.stock : 99;
    const finalQty = Math.min(newQty, maxStock);
    setCart(prev =>
      prev.map(item => (item.id === bookId ? { ...item, quantity: finalQty } : item))
    );
  };

  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
    showToast('Removed item from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code) => {
    const normalized = (code || '').trim().toUpperCase();
    const found = INITIAL_COUPONS.find(c => c.code === normalized);
    if (!found) {
      showToast(`Coupon "${normalized}" is invalid`, 'error');
      return false;
    }
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (subtotal < found.minSpend) {
      showToast(`Coupon requires minimum spend of ₹${found.minSpend}`, 'error');
      return false;
    }
    setAppliedCoupon(found);
    setCouponCode(found.code);
    showToast(`Coupon "${found.code}" applied: ${found.discountPercent}% OFF!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    showToast('Coupon removed', 'info');
  };

  // Cart financial calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartDiscount = appliedCoupon
    ? Number(((cartSubtotal * appliedCoupon.discountPercent) / 100).toFixed(2))
    : 0;
  const freeShippingThreshold = 499;
  const cartShipping = cart.length === 0 ? 0 : (cartSubtotal - cartDiscount >= freeShippingThreshold ? 0 : 60);
  // GST 5% on books
  const cartTax = Number(((cartSubtotal - cartDiscount) * 0.05).toFixed(2));
  const cartGrandTotal = Number((cartSubtotal - cartDiscount + cartShipping + cartTax).toFixed(2));
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // --- 6. Wishlist State ---
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('pt_wishlist');
    return saved ? JSON.parse(saved) : [INITIAL_BOOKS[1], INITIAL_BOOKS[4]];
  });

  useEffect(() => {
    localStorage.setItem('pt_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (book) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === book.id);
      if (exists) {
        showToast(`Removed "${book.title}" from wishlist`, 'info');
        return prev.filter(item => item.id !== book.id);
      } else {
        showToast(`Saved "${book.title}" to wishlist`);
        return [...prev, book];
      }
    });
  };

  const isInWishlist = (bookId) => {
    return wishlist.some(item => item.id === bookId);
  };

  // --- 7. User Authentication & Profile ---
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pt_active_user');
    return saved ? JSON.parse(saved) : INITIAL_DEMO_USER;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('pt_is_admin') === 'true';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pt_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pt_active_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pt_is_admin', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  const login = (email, password) => {
    // Admin check
    if (email.trim().toLowerCase() === 'admin@pageturn.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      showToast('Welcome, Administrator');
      return { success: true, role: 'admin' };
    }

    // Customer check: registered or demo user
    const savedUsers = JSON.parse(localStorage.getItem('pt_registered_users') || '[]');
    const allUsers = [INITIAL_DEMO_USER, ...savedUsers];
    const matched = allUsers.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (matched) {
      setUser(matched);
      showToast(`Welcome back, ${matched.name.split(' ')[0]}!`);
      return { success: true, role: 'customer' };
    }

    showToast('Invalid email or password', 'error');
    return { success: false, message: 'Invalid credentials' };
  };

  const register = ({ name, email, password, phone }) => {
    const savedUsers = JSON.parse(localStorage.getItem('pt_registered_users') || '[]');
    if ([INITIAL_DEMO_USER, ...savedUsers].some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
      showToast('An account with this email already exists', 'error');
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email: email.trim().toLowerCase(),
      password,
      phone: phone || '+91 98000 00000',
      membership: 'New Bibliophile Member',
      addresses: [
        {
          id: 'addr-' + Date.now(),
          isDefault: true,
          fullName: name,
          phone: phone || '+91 98000 00000',
          street: '12 Heritage Boulevard, Bandra West',
          city: 'Mumbai',
          state: 'Maharashtra',
          pinCode: '400050',
          type: 'Home'
        }
      ]
    };

    localStorage.setItem('pt_registered_users', JSON.stringify([...savedUsers, newUser]));
    setUser(newUser);
    showToast(`Account created! Welcome to PageTurn, ${name}`);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setIsAdminLoggedIn(false);
    showToast('Signed out successfully', 'info');
  };

  const addAddress = (newAddress) => {
    if (!user) return;
    const addr = {
      ...newAddress,
      id: 'addr-' + Date.now(),
      isDefault: user.addresses.length === 0
    };
    const updated = {
      ...user,
      addresses: [...user.addresses, addr]
    };
    setUser(updated);
    showToast('New shipping address saved');
  };

  const setDefaultAddress = (addrId) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.map(a => ({
        ...a,
        isDefault: a.id === addrId
      }))
    };
    setUser(updated);
    showToast('Default address updated');
  };

  const deleteAddress = (addrId) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.filter(a => a.id !== addrId)
    };
    setUser(updated);
    showToast('Address removed', 'info');
  };

  // --- 8. Orders State ---
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('pt_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('pt_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = ({ items, shippingAddress, deliveryMethod, paymentMethod, pricing }) => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const invoiceNum = Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: `ORD-${orderNumber}-PT`,
      invoiceNumber: `INV-2026-${invoiceNum}`,
      date: now.toISOString(),
      formattedDate,
      customer: {
        name: user ? user.name : shippingAddress.fullName,
        email: user ? user.email : 'customer@example.com',
        phone: shippingAddress.phone || '+91 98000 00000'
      },
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      paymentStatus: paymentMethod.toLowerCase().includes('cash') ? 'Pending COD' : 'Paid & Verified',
      items: [...items],
      pricing,
      status: 'Placed',
      trackingTimeline: [
        { step: 'Placed', time: formattedDate, done: true, desc: 'Order received and logged in system.' },
        { step: 'Packed', time: 'Estimated within 4 hours', done: false, desc: 'Eco-friendly kraft wrap and wax seal.' },
        { step: 'Shipped', time: 'Scheduled for next courier pickup', done: false, desc: 'Dispatched via premium carbon-neutral air.' },
        { step: 'Delivered', time: 'Estimated in 2-3 business days', done: false, desc: 'Doorstep contactless delivery.' }
      ]
    };

    // Deduct stock
    items.forEach(item => {
      adjustStock(item.id, -item.quantity);
    });

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const steps = ['Placed', 'Packed', 'Shipped', 'Delivered'];
          const newIndex = steps.indexOf(newStatus);
          const updatedTimeline = ord.trackingTimeline.map((t, idx) => {
            const stepIdx = steps.indexOf(t.step);
            return {
              ...t,
              done: stepIdx <= newIndex
            };
          });
          return {
            ...ord,
            status: newStatus,
            trackingTimeline: updatedTimeline
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} status changed to ${newStatus}`);
  };

  // --- 9. Router / View Navigation ---
  const parseHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return { page: 'home', params: {} };
    const parts = hash.split('/');
    const page = parts[0];
    const param = parts[1];
    if (page === 'product' && param) return { page: 'product', params: { id: Number(param) } };
    if (page === 'order-confirmation' && param) return { page: 'order-confirmation', params: { orderId: param } };
    if (page === 'order-tracking' && param) return { page: 'order-tracking', params: { orderId: param } };
    return { page, params: { id: param } };
  };

  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, params = {}) => {
    let newHash = page;
    if (params.id) newHash += `/${params.id}`;
    if (params.orderId) newHash += `/${params.orderId}`;
    window.location.hash = newHash;
    setRoute({ page, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- 10. Search Query ---
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        toasts,
        showToast,
        removeToast,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        reviews,
        addReview,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
        couponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartGrandTotal,
        cartCount,
        freeShippingThreshold,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        isAdminLoggedIn,
        login,
        register,
        logout,
        addAddress,
        setDefaultAddress,
        deleteAddress,
        orders,
        placeOrder,
        updateOrderStatus,
        route,
        navigateTo,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
