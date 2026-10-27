import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ToastContainer from './components/ToastContainer';
import AuthModal from './components/AuthModal';

import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { AboutPage, FAQPage, ContactPage } from './pages/StaticPages';
import NotFoundPage from './pages/NotFoundPage';

function AppContent() {
  const { route } = useStore();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (route.page) {
      case 'home':
        return <HomePage />;
      case 'catalogue':
        return <CataloguePage />;
      case 'product':
        return <ProductDetailPage bookId={route.params.id} />;
      case 'cart':
        return <CartPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage orderId={route.params.orderId} />;
      case 'order-tracking':
        return <OrderTrackingPage orderId={route.params.orderId} />;
      case 'profile':
        return <UserProfilePage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        // Trigger modal and show home
        setTimeout(() => setAuthModalOpen(true), 50);
        return <HomePage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Header */}
      <Header onOpenAuth={() => setAuthModalOpen(true)} />

      {/* Main View Router */}
      <main style={{ flexGrow: 1 }}>
        {renderCurrentPage()}
      </main>

      {/* Global Slide-In Cart Drawer */}
      <CartDrawer />

      {/* Authentication Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Neo-brutalist Toast Notifications Container */}
      <ToastContainer />

      {/* Pure Brand Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
