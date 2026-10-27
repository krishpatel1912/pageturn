import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import BookCover from '../components/BookCover';
import confetti from 'canvas-confetti';
import {
  Check,
  CreditCard,
  QrCode,
  Banknote,
  Truck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  MapPin,
  Lock
} from 'lucide-react';

// Luhn Algorithm Validation
function validateLuhn(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export default function CheckoutPage() {
  const {
    cart,
    user,
    cartSubtotal,
    cartDiscount,
    cartTax,
    freeShippingThreshold,
    appliedCoupon,
    placeOrder,
    navigateTo,
    showToast
  } = useStore();

  const [currentStep, setCurrentStep] = useState(1); // 1: Address, 2: Delivery, 3: Payment

  // STEP 1: Address State
  const defaultAddress = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress ? defaultAddress.id : 'new');

  const [addressForm, setAddressForm] = useState({
    fullName: defaultAddress?.fullName || user?.name || 'Aarav Mehta',
    phone: defaultAddress?.phone || user?.phone || '+91 98201 44521',
    street: defaultAddress?.street || 'Flat 402, Sea Green Apartments, Worli Hill Road',
    city: defaultAddress?.city || 'Mumbai',
    state: defaultAddress?.state || 'Maharashtra',
    pinCode: defaultAddress?.pinCode || '400018'
  });

  // STEP 2: Delivery Method State
  // 'standard' or 'express'
  const [deliveryMethod, setDeliveryMethod] = useState('standard');

  // STEP 3: Payment State
  const [paymentType, setPaymentType] = useState('card'); // 'upi', 'card', 'cod'
  const [upiId, setUpiId] = useState('aarav.mehta@okhdfcbank');

  // Card details
  const [cardNumber, setCardNumber] = useState('4532 0150 1234 5678');
  const [cardHolder, setCardHolder] = useState('Aarav Mehta');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('382');
  const [cardError, setCardError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>
          No items to checkout
        </h2>
        <button onClick={() => navigateTo('catalogue')} className="neo-btn neo-btn-primary">
          Return to Catalogue
        </button>
      </div>
    );
  }

  // Delivery fee calculation
  const standardFee = (cartSubtotal - cartDiscount) >= freeShippingThreshold ? 0 : 60;
  const expressFee = 120;
  const shippingCost = deliveryMethod === 'standard' ? standardFee : expressFee;
  const grandTotal = Number((cartSubtotal - cartDiscount + shippingCost + cartTax).toFixed(2));

  // Address validation
  const handleProceedToDelivery = (e) => {
    e.preventDefault();
    if (!addressForm.fullName || !addressForm.street || !addressForm.city || !addressForm.pinCode) {
      showToast('Please complete all shipping address fields', 'error');
      return;
    }
    if (addressForm.pinCode.replace(/\D/g, '').length !== 6) {
      showToast('Please enter a valid 6-digit postal PIN code', 'error');
      return;
    }
    setCurrentStep(2);
  };

  // Card formatting
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
    setCardError('');
  };

  // Final Order Submission
  const handleCompleteOrder = (e) => {
    e.preventDefault();

    // Card Luhn validation
    if (paymentType === 'card') {
      const isValid = validateLuhn(cardNumber);
      if (!isValid) {
        setCardError('Invalid card number. Luhn checksum verification failed.');
        showToast('Card verification failed: Invalid card number', 'error');
        return;
      }
      if (!cardExpiry.includes('/') || cardExpiry.length < 5) {
        setCardError('Please enter valid expiry in MM/YY format.');
        return;
      }
      if (cardCvv.length < 3) {
        setCardError('Please enter 3-digit CVV code.');
        return;
      }
    }

    if (paymentType === 'upi' && (!upiId.includes('@') || upiId.length < 4)) {
      showToast('Please enter a valid UPI Virtual Payment Address (e.g. name@bank)', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Fire celebration confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      let chosenPaymentLabel = '';
      if (paymentType === 'card') chosenPaymentLabel = `Card (•••• ${cardNumber.slice(-4)})`;
      else if (paymentType === 'upi') chosenPaymentLabel = `UPI (${upiId})`;
      else chosenPaymentLabel = 'Cash on Delivery (COD)';

      const newOrder = placeOrder({
        items: cart,
        shippingAddress: addressForm,
        deliveryMethod:
          deliveryMethod === 'standard'
            ? 'Standard Carbon-Neutral Delivery'
            : 'Express Priority Courier (Air Cargo)',
        paymentMethod: chosenPaymentLabel,
        pricing: {
          subtotal: cartSubtotal,
          discount: cartDiscount,
          couponApplied: appliedCoupon ? appliedCoupon.code : null,
          shippingFee: shippingCost,
          gst: cartTax,
          total: grandTotal
        }
      });

      setIsProcessing(false);
      showToast('Order confirmed! Generating printable invoice...');
      navigateTo('order-confirmation', { orderId: newOrder.id });
    }, 1200);
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Header with 3-Step Progress Indicators */}
        <div
          style={{
            borderBottom: 'var(--border-width) solid var(--border-color)',
            paddingBottom: '1.5rem',
            marginBottom: '2.5rem'
          }}
        >
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <span className="badge-sticker">CHECKOUT PIPELINE</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              100% SIMULATED SECURE PROTOCOL
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1.5rem' }}>
            Finalize Your Dispatch
          </h1>

          {/* Stepper Navigation */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              border: '2px solid var(--border-color)',
              boxShadow: '2px 2px 0 var(--border-color)',
              backgroundColor: 'var(--bg-paper)'
            }}
          >
            {[
              { num: 1, label: '1. Shipping Address' },
              { num: 2, label: '2. Courier Method' },
              { num: 3, label: '3. Payment Verification' }
            ].map((step) => (
              <div
                key={step.num}
                onClick={() => {
                  if (step.num < currentStep) setCurrentStep(step.num);
                }}
                style={{
                  padding: '0.75rem 1rem',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: step.num < currentStep ? 'pointer' : 'default',
                  backgroundColor:
                    currentStep === step.num
                      ? 'var(--accent-tomato)'
                      : step.num < currentStep
                      ? 'var(--accent-mustard)'
                      : 'transparent',
                  color:
                    currentStep === step.num
                      ? '#FFFDF9'
                      : step.num < currentStep
                      ? '#141414'
                      : 'var(--text-muted)',
                  borderRight: step.num !== 3 ? '2px solid var(--border-color)' : 'none',
                  transition: 'background-color 0.15s ease'
                }}
              >
                {step.label}
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Layout: Steps Form + Order Requisition Sticky Summary */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '2.5rem',
            alignItems: 'start'
          }}
          className="checkout-layout-grid"
        >
          {/* LEFT: STEP CONTENT */}
          <div>
            {/* ================= STEP 1: ADDRESS ================= */}
            {currentStep === 1 && (
              <div
                className="neo-box"
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <MapPin size={22} color="var(--accent-tomato)" />
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', margin: 0 }}>
                    Recipient & Delivery Destination
                  </h2>
                </div>

                {/* Saved addresses selector if user has saved addresses */}
                {user?.addresses && user.addresses.length > 0 && (
                  <div style={{ marginBottom: '1.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.65rem' }}>
                      Select Saved Address
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {user.addresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => {
                            setSelectedAddressId(addr.id);
                            setAddressForm({
                              fullName: addr.fullName,
                              phone: addr.phone,
                              street: addr.street,
                              city: addr.city,
                              state: addr.state,
                              pinCode: addr.pinCode
                            });
                          }}
                          style={{
                            padding: '0.85rem 1rem',
                            border: '2px solid var(--border-color)',
                            backgroundColor: selectedAddressId === addr.id ? 'var(--bg-subtle)' : 'var(--bg-paper)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                              {addr.fullName} <span className="badge-sticker" style={{ fontSize: '0.65rem' }}>{addr.type}</span>
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                              {addr.street}, {addr.city}, {addr.state} - {addr.pinCode}
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="addressSelect"
                            checked={selectedAddressId === addr.id}
                            onChange={() => {}}
                            style={{ accentColor: 'var(--accent-tomato)' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Address Form Inputs */}
                <form onSubmit={handleProceedToDelivery}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                        Full Name / Recipient
                      </label>
                      <input
                        type="text"
                        value={addressForm.fullName}
                        onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                        className="neo-input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                        Phone Number (for Courier SMS)
                      </label>
                      <input
                        type="tel"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        className="neo-input"
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Street Address & Studio / Apartment #
                    </label>
                    <input
                      type="text"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      className="neo-input"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                        City
                      </label>
                      <input
                        type="text"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
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
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        className="neo-input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                        Postal PIN Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={addressForm.pinCode}
                        onChange={(e) => setAddressForm({ ...addressForm, pinCode: e.target.value })}
                        className="neo-input"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="neo-btn neo-btn-primary"
                    style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
                  >
                    Continue to Delivery Method <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}

            {/* ================= STEP 2: DELIVERY METHOD ================= */}
            {currentStep === 2 && (
              <div
                className="neo-box"
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <Truck size={22} color="var(--accent-tomato)" />
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', margin: 0 }}>
                    Select Courier Delivery Speed
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {/* Standard Option */}
                  <div
                    onClick={() => setDeliveryMethod('standard')}
                    style={{
                      padding: '1.25rem',
                      border: '2px solid var(--border-color)',
                      backgroundColor: deliveryMethod === 'standard' ? 'var(--bg-subtle)' : 'var(--bg-paper)',
                      boxShadow: deliveryMethod === 'standard' ? 'var(--shadow-offset-sm)' : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 700 }}>
                          Standard Carbon-Neutral Delivery
                        </h4>
                        {standardFee === 0 && <span className="badge-sticker" style={{ background: 'var(--accent-sage)', color: '#FFF' }}>FREE</span>}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        Estimated transit: 3-5 business days. Shipped via surface courier in 100% recyclable kraft.
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700 }}>
                        {standardFee === 0 ? '₹0' : `₹${standardFee}`}
                      </span>
                    </div>
                  </div>

                  {/* Express Option */}
                  <div
                    onClick={() => setDeliveryMethod('express')}
                    style={{
                      padding: '1.25rem',
                      border: '2px solid var(--border-color)',
                      backgroundColor: deliveryMethod === 'express' ? 'var(--bg-subtle)' : 'var(--bg-paper)',
                      boxShadow: deliveryMethod === 'express' ? 'var(--shadow-offset-sm)' : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 700 }}>
                          Express Priority Courier (Air Cargo)
                        </h4>
                        <span className="badge-sticker red">FAST</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        Estimated transit: 1-2 business days. Dispatched via Bluedart Air with wax-sealed archival envelope.
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700 }}>
                        ₹{expressFee}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="neo-btn"
                    style={{ padding: '0.85rem 1.4rem' }}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="neo-btn neo-btn-primary"
                    style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
                  >
                    Proceed to Payment <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: PAYMENT ================= */}
            {currentStep === 3 && (
              <div
                className="neo-box"
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <Lock size={22} color="var(--accent-tomato)" />
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', margin: 0 }}>
                    Simulated Payment Processing
                  </h2>
                </div>

                {/* Payment Method Switcher Tabs */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    border: '2px solid var(--border-color)',
                    marginBottom: '1.75rem',
                    boxShadow: '2px 2px 0 var(--border-color)'
                  }}
                >
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI / QR Code', icon: QrCode },
                    { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
                  ].map((m) => {
                    const Icon = m.icon;
                    const isActive = paymentType === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setPaymentType(m.id);
                          setCardError('');
                        }}
                        style={{
                          padding: '0.85rem 0.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          backgroundColor: isActive ? 'var(--accent-tomato)' : 'var(--bg-paper)',
                          color: isActive ? '#FFFDF9' : 'var(--text-primary)',
                          borderRight: m.id !== 'cod' ? '1px solid var(--border-color)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Icon size={18} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* OPTION 1: CREDIT / DEBIT CARD WITH LUHN */}
                {paymentType === 'card' && (
                  <div>
                    {/* Live Credit Card Visualizer */}
                    <div
                      className="neo-box"
                      style={{
                        padding: '1.5rem',
                        backgroundColor: '#1E293B',
                        color: '#F8FAFC',
                        marginBottom: '1.5rem',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>
                          PAGETURN VIRTUAL GATEWAY
                        </span>
                        <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontStyle: 'italic', fontSize: '1.1rem' }}>
                          VISA / MASTER
                        </span>
                      </div>

                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '1.4rem',
                          letterSpacing: '0.12em',
                          marginBottom: '1.25rem',
                          color: '#38BDF8'
                        }}
                      >
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex-between">
                        <div>
                          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.6 }}>Cardholder</div>
                          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9rem' }}>
                            {cardHolder || 'CARDHOLDER NAME'}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.6 }}>Expires</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem' }}>
                            {cardExpiry || 'MM/YY'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {cardError && (
                      <div
                        style={{
                          padding: '0.65rem 0.85rem',
                          backgroundColor: '#FEE2E2',
                          border: '1.5px solid #EF4444',
                          color: '#B91C1C',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem'
                        }}
                      >
                        <AlertCircle size={16} />
                        <span>{cardError}</span>
                      </div>
                    )}

                    <form onSubmit={handleCompleteOrder}>
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                          Card Number (Luhn Validated)
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4532 0150 1234 5678"
                          className="neo-input"
                          maxLength={19}
                          required
                        />
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="neo-input"
                          required
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                            Expiration (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            maxLength={5}
                            className="neo-input"
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                            Security CVV
                          </label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.slice(0, 4))}
                            placeholder="•••"
                            maxLength={4}
                            className="neo-input"
                            required
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="neo-btn"
                          style={{ padding: '0.85rem 1.4rem' }}
                        >
                          <ArrowLeft size={16} /> Back
                        </button>
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="neo-btn neo-btn-primary"
                          style={{ flexGrow: 1, padding: '0.85rem' }}
                        >
                          {isProcessing ? 'Verifying Card with Bank...' : `Pay ₹${grandTotal} & Place Order`}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* OPTION 2: UPI / QR CODE */}
                {paymentType === 'upi' && (
                  <form onSubmit={handleCompleteOrder}>
                    <div
                      className="neo-box"
                      style={{
                        padding: '1.5rem',
                        backgroundColor: 'var(--bg-paper)',
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                      }}
                    >
                      <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, marginBottom: '0.5rem' }}>
                        Scan QR with Google Pay, PhonePe, or Paytm
                      </h4>
                      {/* SVG Simulated QR code */}
                      <div
                        style={{
                          width: '180px',
                          height: '180px',
                          margin: '0 auto 1rem',
                          padding: '10px',
                          backgroundColor: '#FFFFFF',
                          border: '2px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                          {/* Top-left position marker */}
                          <rect x="5" y="5" width="30" height="30" fill="#141414" />
                          <rect x="10" y="10" width="20" height="20" fill="#FFFFFF" />
                          <rect x="15" y="15" width="10" height="10" fill="#141414" />
                          {/* Top-right position marker */}
                          <rect x="65" y="5" width="30" height="30" fill="#141414" />
                          <rect x="70" y="10" width="20" height="20" fill="#FFFFFF" />
                          <rect x="75" y="15" width="10" height="10" fill="#141414" />
                          {/* Bottom-left position marker */}
                          <rect x="5" y="65" width="30" height="30" fill="#141414" />
                          <rect x="10" y="70" width="20" height="20" fill="#FFFFFF" />
                          <rect x="15" y="75" width="10" height="10" fill="#141414" />
                          {/* Random data dots */}
                          <rect x="42" y="12" width="6" height="6" fill="#E4472B" />
                          <rect x="52" y="24" width="6" height="6" fill="#141414" />
                          <rect x="42" y="45" width="16" height="16" fill="#141414" />
                          <rect x="65" y="45" width="8" height="8" fill="#141414" />
                          <rect x="78" y="55" width="12" height="12" fill="#E4472B" />
                          <rect x="45" y="75" width="12" height="12" fill="#141414" />
                          <rect x="65" y="75" width="14" height="14" fill="#141414" />
                        </svg>
                      </div>

                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        UPI Merchant ID: <strong>pageturn.press@hdfcbank</strong>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                        Or Enter Your Virtual Payment Address (VPA)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="neo-input"
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="neo-btn"
                        style={{ padding: '0.85rem 1.4rem' }}
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="neo-btn neo-btn-primary"
                        style={{ flexGrow: 1, padding: '0.85rem' }}
                      >
                        {isProcessing ? 'Waiting for UPI App Approval...' : `Confirm UPI Payment ₹${grandTotal}`}
                      </button>
                    </div>
                  </form>
                )}

                {/* OPTION 3: CASH ON DELIVERY */}
                {paymentType === 'cod' && (
                  <form onSubmit={handleCompleteOrder}>
                    <div
                      className="neo-box"
                      style={{
                        padding: '1.5rem',
                        backgroundColor: 'var(--bg-paper)',
                        marginBottom: '1.5rem'
                      }}
                    >
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        Cash / Doorstep Digital Payment
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        You can pay with exact currency notes or scan the delivery agent's handheld UPI QR code upon arrival.
                        Zero convenience surcharge applied.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="neo-btn"
                        style={{ padding: '0.85rem 1.4rem' }}
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="neo-btn neo-btn-primary"
                        style={{ flexGrow: 1, padding: '0.85rem' }}
                      >
                        {isProcessing ? 'Booking Order...' : `Confirm COD Order of ₹${grandTotal}`}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: REQUISITION SUMMARY STICKY SIDEBAR */}
          <aside
            className="neo-box"
            style={{
              backgroundColor: 'var(--bg-paper)',
              padding: '1.75rem',
              position: 'sticky',
              top: '95px'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                borderBottom: 'var(--border-width) solid var(--border-color)',
                paddingBottom: '0.75rem',
                marginBottom: '1rem'
              }}
            >
              Order Items ({cart.length})
            </h3>

            {/* Compact items list */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                maxHeight: '260px',
                overflowY: 'auto',
                marginBottom: '1.25rem',
                paddingRight: '0.25rem'
              }}
            >
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '42px', flexShrink: 0 }}>
                    <BookCover book={item} width="100%" aspectRatio="2 / 2.8" showSpine={false} />
                  </div>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} × ₹{item.price}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.88rem' }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations breakdown */}
            <div
              style={{
                borderTop: '1px dashed var(--border-color)',
                paddingTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                marginBottom: '1rem'
              }}
            >
              <div className="flex-between">
                <span style={{ color: 'var(--text-secondary)' }}>Books Subtotal</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{cartSubtotal}</span>
              </div>

              {appliedCoupon && (
                <div className="flex-between" style={{ color: 'var(--accent-tomato)', fontWeight: 600 }}>
                  <span>Discount ({appliedCoupon.code})</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>- ₹{cartDiscount}</span>
                </div>
              )}

              <div className="flex-between">
                <span style={{ color: 'var(--text-secondary)' }}>Delivery Fee</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>
                  {shippingCost === 0 ? <span style={{ color: 'var(--accent-sage)', fontWeight: 700 }}>FREE</span> : `₹${shippingCost}`}
                </span>
              </div>

              <div className="flex-between">
                <span style={{ color: 'var(--text-secondary)' }}>GST (5% Books)</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{cartTax}</span>
              </div>
            </div>

            {/* Total */}
            <div
              className="flex-between"
              style={{
                borderTop: 'var(--border-width) solid var(--border-color)',
                paddingTop: '0.85rem'
              }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700 }}>
                Total Payable
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--accent-tomato)' }}>
                ₹{grandTotal}
              </span>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-layout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
