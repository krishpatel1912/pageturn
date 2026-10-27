// Initial seeded reviews, coupons, demo users, and demo orders

export const INITIAL_COUPONS = [
  { code: "READ10", discountPercent: 10, minSpend: 300, description: "10% off on all independent titles" },
  { code: "WELCOME20", discountPercent: 20, minSpend: 600, description: "20% off for new literary explorers" },
  { code: "BOOKWORM15", discountPercent: 15, minSpend: 500, description: "15% off for dedicated readers" }
];

export const INITIAL_REVIEWS = {
  1: [
    {
      id: "rev-1",
      userName: "Rohan V.",
      rating: 5,
      date: "14 Oct 2026",
      title: "Profound and architecturally lucid",
      comment: "A magnificent meditation. The paper texture and typesetting of this book alone make it a joy to hold. Must-read for any contemplative mind."
    },
    {
      id: "rev-2",
      userName: "Sanya K.",
      rating: 5,
      date: "02 Oct 2026",
      title: "Arrived in gorgeous kraft packaging",
      comment: "PageTurn's packaging is plastic-free and smells like cedarwood. The book itself has become my bedside bible."
    },
    {
      id: "rev-3",
      userName: "Vikram Sen",
      rating: 4,
      date: "21 Sep 2026",
      title: "Deeply philosophical",
      comment: "Some chapters require slow re-reading, but the insights on spatial psychology are breathtaking."
    }
  ],
  2: [
    {
      id: "rev-4",
      userName: "Devika Roy",
      rating: 5,
      date: "18 Oct 2026",
      title: "Electric cyberpunk atmosphere",
      comment: "Feels like William Gibson meeting Haruki Murakami in a rain-drenched Shibuya back-alley."
    },
    {
      id: "rev-5",
      userName: "Nikhil Joshi",
      rating: 4,
      date: "09 Oct 2026",
      title: "Pacing is breakneck",
      comment: "Couldn't put it down. Finished in two sittings during a thunderstorm."
    }
  ],
  3: [
    {
      id: "rev-6",
      userName: "Maya Swaminathan",
      rating: 5,
      date: "11 Oct 2026",
      title: "Invaluable for design historians",
      comment: "High production value, exquisite typography reproductions, and crisp archival essays. Worth every rupee."
    }
  ],
  6: [
    {
      id: "rev-7",
      userName: "Aditi Rao",
      rating: 5,
      date: "19 Oct 2026",
      title: "My sourdough has never been better",
      comment: "Clear, poetic, and scientifically sound. Clara Hemlock makes fermentation feel like spiritual devotion."
    }
  ]
};

export const INITIAL_DEMO_USER = {
  id: "usr-aarav-01",
  name: "Aarav Mehta",
  email: "aarav.mehta@example.com",
  password: "Password@123",
  phone: "+91 98201 44521",
  membership: "Bibliophile Club Member",
  addresses: [
    {
      id: "addr-1",
      isDefault: true,
      fullName: "Aarav Mehta",
      phone: "+91 98201 44521",
      street: "Flat 402, Sea Green Apartments, Worli Hill Road",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400018",
      type: "Home"
    },
    {
      id: "addr-2",
      isDefault: false,
      fullName: "Aarav Mehta (Studio)",
      phone: "+91 98201 44521",
      street: "Unit 12B, Industrial Design Mill, Lower Parel",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400013",
      type: "Work"
    }
  ]
};

export const INITIAL_ORDERS = [
  {
    id: "ORD-9421-PT",
    invoiceNumber: "INV-2026-0842",
    date: "2026-10-22T14:32:00Z",
    formattedDate: "22 Oct 2026, 02:32 PM",
    customer: {
      name: "Aarav Mehta",
      email: "aarav.mehta@example.com",
      phone: "+91 98201 44521"
    },
    shippingAddress: {
      fullName: "Aarav Mehta",
      street: "Flat 402, Sea Green Apartments, Worli Hill Road",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400018"
    },
    deliveryMethod: "Express Courier (Tracked)",
    paymentMethod: "UPI (Google Pay / PhonePe)",
    paymentStatus: "Paid",
    items: [
      {
        id: 1,
        title: "The Architecture of Solitude",
        author: "Elena Rostova",
        price: 649,
        quantity: 1,
        coverStyle: "geometric",
        bgColor: "#E4472B",
        textColor: "#F4EDE0"
      },
      {
        id: 3,
        title: "The Bauhaus Manifesto & Legacy",
        author: "Walter Gropius & H. Bayer",
        price: 899,
        quantity: 1,
        coverStyle: "bauhaus",
        bgColor: "#E8B931",
        textColor: "#141414"
      }
    ],
    pricing: {
      subtotal: 1548,
      discount: 154.8,
      couponApplied: "READ10",
      shippingFee: 0,
      gst: 69.66,
      total: 1462.86
    },
    status: "Delivered",
    trackingTimeline: [
      { step: "Placed", time: "22 Oct 2026, 02:32 PM", done: true, desc: "Order confirmed and verified." },
      { step: "Packed", time: "22 Oct 2026, 05:10 PM", done: true, desc: "Hand-wrapped in eco-friendly kraft paper." },
      { step: "Shipped", time: "23 Oct 2026, 09:45 AM", done: true, desc: "Dispatched via Bluedart Air Cargo (AWB #BD-8821-PT)." },
      { step: "Delivered", time: "24 Oct 2026, 01:15 PM", done: true, desc: "Safely received and signed." }
    ]
  },
  {
    id: "ORD-9458-PT",
    invoiceNumber: "INV-2026-0899",
    date: "2026-10-25T11:15:00Z",
    formattedDate: "25 Oct 2026, 11:15 AM",
    customer: {
      name: "Aarav Mehta",
      email: "aarav.mehta@example.com",
      phone: "+91 98201 44521"
    },
    shippingAddress: {
      fullName: "Aarav Mehta",
      street: "Flat 402, Sea Green Apartments, Worli Hill Road",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400018"
    },
    deliveryMethod: "Standard Carbon-Neutral Delivery",
    paymentMethod: "Credit Card (HDFC Master)",
    paymentStatus: "Paid",
    items: [
      {
        id: 6,
        title: "Wild Fermentation & Earth Craft",
        author: "Clara Hemlock",
        price: 699,
        quantity: 1,
        coverStyle: "botanical",
        bgColor: "#D97736",
        textColor: "#1E1E1E"
      }
    ],
    pricing: {
      subtotal: 699,
      discount: 0,
      couponApplied: null,
      shippingFee: 0,
      gst: 34.95,
      total: 733.95
    },
    status: "Shipped",
    trackingTimeline: [
      { step: "Placed", time: "25 Oct 2026, 11:15 AM", done: true, desc: "Order confirmed and verified." },
      { step: "Packed", time: "25 Oct 2026, 03:40 PM", done: true, desc: "Hand-wrapped with bookplate sticker." },
      { step: "Shipped", time: "26 Oct 2026, 10:20 AM", done: true, desc: "In transit via Delhivery Express (AWB #DL-3391-PT)." },
      { step: "Delivered", time: "Estimated 28 Oct 2026", done: false, desc: "Out for delivery in Mumbai." }
    ]
  },
  {
    id: "ORD-9480-PT",
    invoiceNumber: "INV-2026-0925",
    date: "2026-10-26T18:05:00Z",
    formattedDate: "26 Oct 2026, 06:05 PM",
    customer: {
      name: "Pooja Sharma",
      email: "pooja.sharma@example.com",
      phone: "+91 99870 12345"
    },
    shippingAddress: {
      fullName: "Pooja Sharma",
      street: "Plot 88, Defence Colony",
      city: "New Delhi",
      state: "Delhi",
      pinCode: "110024"
    },
    deliveryMethod: "Express Courier",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending COD Verification",
    items: [
      {
        id: 4,
        title: "Monsoon Letters",
        author: "Ananya Deshmukh",
        price: 420,
        quantity: 2,
        coverStyle: "typographic",
        bgColor: "#2A4736",
        textColor: "#F4EDE0"
      }
    ],
    pricing: {
      subtotal: 840,
      discount: 84,
      couponApplied: "READ10",
      shippingFee: 0,
      gst: 37.8,
      total: 793.8
    },
    status: "Packed",
    trackingTimeline: [
      { step: "Placed", time: "26 Oct 2026, 06:05 PM", done: true, desc: "Order logged into ERP inventory queue." },
      { step: "Packed", time: "26 Oct 2026, 08:30 PM", done: true, desc: "Sealed and QA inspected." },
      { step: "Shipped", time: "Scheduled 27 Oct morning", done: false, desc: "Awaiting courier pickup." },
      { step: "Delivered", time: "Pending transit", done: false, desc: "Estimated delivery 29 Oct." }
    ]
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: "usr-aarav-01",
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    city: "Mumbai",
    ordersCount: 2,
    totalSpent: 2196.81,
    joined: "Aug 2026"
  },
  {
    id: "usr-pooja-02",
    name: "Pooja Sharma",
    email: "pooja.sharma@example.com",
    city: "New Delhi",
    ordersCount: 1,
    totalSpent: 793.8,
    joined: "Sep 2026"
  },
  {
    id: "usr-tarun-03",
    name: "Tarun Kapoor",
    email: "tarun.k@example.com",
    city: "Bengaluru",
    ordersCount: 3,
    totalSpent: 3410.0,
    joined: "Jul 2026"
  },
  {
    id: "usr-ananya-04",
    name: "Ananya Sen",
    email: "ananya.sen@example.com",
    city: "Kolkata",
    ordersCount: 1,
    totalSpent: 999.0,
    joined: "Oct 2026"
  }
];
