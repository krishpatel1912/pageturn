# PageTurn — Independent Bookstore & Literary Archive

PageTurn is an editorial-driven online bookstore and physical archive specializing in independent presses, typography monographs, radical philosophy, and speculative literature. Designed with an **"editorial magazine meets zine"** aesthetic—featuring warm paper-cream tones, thick borders, neo-brutalist offset shadows, custom geometric SVG book covers, and simulated ERP logistics.

---

## Key Features

1. **Editorial Magazine & Zine UI**:
   - Palette: Warm paper-cream (`#F4EDE0`), ink black (`#141414`), tomato red accent (`#E4472B`), mustard (`#E8B931`).
   - "Midnight Ink" dark mode toggle.
   - Neo-brutalist offset drop shadows, sticker badges, rotating circular text badge, and a marquee ticker strip.
   - Dynamic SVG/CSS book covers with geometric, Bauhaus, constructivist, and typographic motifs without any external image dependencies.
   - Responsive design tested on desktop (1440px) and mobile viewports (390px).

2. **Full E-Commerce Journey**:
   - **Catalogue**: Instant search with live suggestions dropdown, multi-criteria filtering (genre, price range slider, star rating, in-stock only toggle), and sorting.
   - **Product Detail**: Detailed specifications, stock status badges, interactive star reviews submission form, related recommendations.
   - **Reading Bag / Cart**: Slide-in drawer and full cart page, item quantity controls, promotional coupon system (`READ10`, `WELCOME20`), free shipping progress bar (threshold: ₹499), 5% book GST calculation.
   - **Reading Wishlist**: Persistent saved titles with quick transfer to shopping bag.
   - **User Accounts**: Registration and authentication, live 4-segment password strength analyzer, address book management with default selectors, order history.
   - **3-Step Checkout**:
     - Step 1: Address selection / entry with PIN code validation.
     - Step 2: Courier selection (Standard Carbon-Neutral vs Express Priority Air Cargo).
     - Step 3: Simulated payment gateway with Credit/Debit card (live Luhn algorithm validation), UPI QR & VPA simulator, and Cash on Delivery.
   - **Printable Tax Invoice**: Official PageTurn tax invoice with itemized line items, GST breakdown, and print styling (`window.print()`).
   - **Order Tracking**: Visual 4-stage logistics timeline (Placed → Packed → Shipped → Delivered) with live status simulation toggle.

3. **Admin ERP & Warehouse Console**:
   - Master credentials: `admin@pageturn.com` / `admin123`.
   - **Inventory Management**: Live stock adjustments (`+` / `-`), low-stock indicators, add new titles modal, edit/delete titles.
   - **Order Fulfillment**: Track all customer orders and update dispatch status in real time.
   - **Executive Analytics**: Pure SVG monthly revenue bar chart, category sales distribution chart, and inventory velocity ranking.
   - **Customer CRM Directory**: View registered customer directory, lifetime order counts, and total expenditure.

---

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with modern custom properties, neo-brutalist offset shadows, fluid typography
- **State & Storage**: React Context API with persistent `localStorage` synchronization
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti

---

## Getting Started

### Prerequisites

Ensure [Node.js](https://nodejs.org/) (v18 or higher) and `npm` are installed.

### Installation

1. Navigate to the project root directory:
   ```bash
   cd pageturn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local server URL (typically `http://localhost:5173`).

### Production Build

To test and bundle the optimized static production build:

```bash
npm run build
npm run preview
```

---

## Demo Credentials

- **Customer Demo Account**:
  - Email: `aarav.mehta@example.com`
  - Password: `Password@123`
  - Preloaded with saved addresses and past order history.
- **Admin ERP Console**:
  - Email: `admin@pageturn.com`
  - Password: `admin123`
  - Access via the **Admin Portal** link in the header dropdown or footer.

---

## Promotional Coupons

- `READ10`: 10% discount on all titles (minimum spend: ₹300)
- `WELCOME20`: 20% discount for new readers (minimum spend: ₹600)
- `BOOKWORM15`: 15% discount for dedicated collectors (minimum spend: ₹500)

---

## Project Structure

```
pageturn/
├── index.html              # HTML5 entry with Google Fonts & SVG favicon
├── package.json            # Project manifest & build scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.jsx            # React root mount
│   ├── App.jsx             # Top-level view router & layout controller
│   ├── index.css           # Neo-brutalist theme, variables, dark mode
│   ├── context/
│   │   └── StoreContext.jsx # State management (Cart, Wishlist, User, Orders, Products, Toasts)
│   ├── data/
│   │   ├── initialBooks.js # Seeded 26 curated books across 6 genres
│   │   └── initialData.js  # Seeded orders, reviews, coupons, demo users
│   ├── components/
│   │   ├── Header.jsx      # Navigation, marquee ticker, live search, theme toggle
│   │   ├── Footer.jsx      # Brand manifesto, quick links, newsletter
│   │   ├── BookCard.jsx    # Card with tilt effect, badge, quick-add
│   │   ├── BookCover.jsx   # Pure SVG geometric cover patterns & spine realism
│   │   ├── CartDrawer.jsx  # Slide-in cart with free delivery meter
│   │   ├── AuthModal.jsx   # Login, register, password strength meter
│   │   ├── ToastContainer.jsx # Neo-brutalist toast notifications
│   │   └── RotatingBadge.jsx # SVG circular rotating badge
│   └── pages/
│       ├── HomePage.jsx        # Editorial hero, manifesto, spotlight, bestsellers
│       ├── CataloguePage.jsx   # Live search, filters (price, genre, rating, stock), sorting
│       ├── ProductDetailPage.jsx # Full book specifications, reviews form, related items
│       ├── CartPage.jsx        # Order requisition, coupon apply, GST breakdown
│       ├── WishlistPage.jsx    # Saved titles management
│       ├── CheckoutPage.jsx    # 3-step checkout with Luhn card & UPI simulation
│       ├── OrderConfirmationPage.jsx # Order success with printable tax invoice
│       ├── OrderTrackingPage.jsx # Visual 4-step logistics timeline & simulation
│       ├── UserProfilePage.jsx # Saved addresses & order history
│       ├── AdminDashboardPage.jsx # ERP dashboard, stock manager, SVG analytics
│       ├── StaticPages.jsx     # About Manifesto, FAQ & returns, Contact
│       └── NotFoundPage.jsx    # 404 missing folio view
```

---

## License

© 2026 PageTurn Bookstore & Press. All rights reserved.
