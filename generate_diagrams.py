import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('/Users/krish/Desktop/report/screenshots', exist_ok=True)
os.makedirs('/Users/krish/Desktop/pageturn/report/screenshots', exist_ok=True)

# 1. GENERATE USER FLOW DIAGRAM
w, h = 1200, 680
img_flow = Image.new('RGB', (w, h), color='#FFFDF9')
draw = ImageDraw.Draw(img_flow)

# Outer border
draw.rectangle([(10, 10), (w-10, h-10)], outline='#141414', width=3)

# Header banner
draw.rectangle([(10, 10), (w-10, 70)], fill='#E4472B', outline='#141414', width=2)
draw.text((w/2, 40), "PAGETURN E-COMMERCE & ERP END-TO-END USER JOURNEY FLOW", fill='#FFFFFF', anchor='mm')

# Steps boxes
steps = [
  {"id": "1. Discovery", "sub": "Landing Hero / Ticker\nSeasonal Curation", "x": 60, "y": 120, "w": 200, "h": 100, "bg": "#F4EDE0"},
  {"id": "2. Search & Filter", "sub": "Live Search Dropdown\nGenre / Price / Stock", "x": 310, "y": 120, "w": 200, "h": 100, "bg": "#F4EDE0"},
  {"id": "3. Book Detail", "sub": "Oversized Cover\nReviews & Stock Check", "x": 560, "y": 120, "w": 200, "h": 100, "bg": "#F4EDE0"},
  {"id": "4. Reading Bag", "sub": "Slide Drawer / Cart\nCoupon: READ10 (10%)", "x": 810, "y": 120, "w": 200, "h": 100, "bg": "#E8B931"},
  
  {"id": "8. ERP Fulfillment", "sub": "Admin Dashboard Queue\nPlaced -> Shipped", "x": 60, "y": 380, "w": 200, "h": 100, "bg": "#2A4736", "fg": "#FFFFFF"},
  {"id": "7. Live Tracking", "sub": "4-Stage Timeline\nAWB Logistics Sync", "x": 310, "y": 380, "w": 200, "h": 100, "bg": "#F4EDE0"},
  {"id": "6. Order Confirmation", "sub": "Printable Tax Invoice\nGST & Consignee Spec", "x": 560, "y": 380, "w": 200, "h": 100, "bg": "#F4EDE0"},
  {"id": "5. 3-Step Checkout", "sub": "Address -> Courier\nPayment (Luhn / UPI / COD)", "x": 810, "y": 380, "w": 200, "h": 100, "bg": "#E4472B", "fg": "#FFFFFF"}
]

for s in steps:
  fg = s.get("fg", "#141414")
  # Shadow
  draw.rectangle([(s["x"]+4, s["y"]+4), (s["x"]+s["w"]+4, s["y"]+s["h"]+4)], fill='#141414')
  # Box
  draw.rectangle([(s["x"], s["y"]), (s["x"]+s["w"], s["y"]+s["h"])], fill=s["bg"], outline='#141414', width=2)
  draw.text((s["x"] + s["w"]/2, s["y"] + 25), s["id"], fill=fg, anchor='mm')
  draw.text((s["x"] + s["w"]/2, s["y"] + 65), s["sub"], fill=fg, anchor='mm')

# Connecting lines & arrows
arrows = [
  # 1 -> 2
  ((260, 170), (310, 170)),
  # 2 -> 3
  ((510, 170), (560, 170)),
  # 3 -> 4
  ((760, 170), (810, 170)),
  # 4 down to 5
  ((910, 220), (910, 380)),
  # 5 -> 6 (left)
  ((810, 430), (760, 430)),
  # 6 -> 7 (left)
  ((560, 430), (510, 430)),
  # 7 -> 8 (left)
  ((310, 430), (260, 430))
]

for p1, p2 in arrows:
  draw.line([p1, p2], fill='#141414', width=3)
  # Draw arrow head
  if p1[1] == p2[1]: # Horizontal
    if p2[0] > p1[0]: # Right
      draw.polygon([(p2[0], p2[1]), (p2[0]-8, p2[1]-5), (p2[0]-8, p2[1]+5)], fill='#141414')
    else: # Left
      draw.polygon([(p2[0], p2[1]), (p2[0]+8, p2[1]-5), (p2[0]+8, p2[1]+5)], fill='#141414')
  else: # Vertical
    draw.polygon([(p2[0], p2[1]), (p2[0]-5, p2[1]-8), (p2[0]+5, p2[1]-8)], fill='#141414')

# Legend and notes
draw.rectangle([(60, 530), (w-60, 640)], fill='#F4EDE0', outline='#141414', width=2)
draw.text((80, 555), "CORE LOGISTICS INTEGRATION:", fill='#E4472B')
draw.text((80, 580), "• LocalStorage Persistence: Real-time synchronization of Cart, Wishlist, User Addresses, and Catalog Inventory.", fill='#141414')
draw.text((80, 605), "• ERP Closed-Loop: Order placed by customer automatically decrements warehouse stock and updates Admin Order Board.", fill='#141414')

img_flow.save('/Users/krish/Desktop/report/screenshots/diagram_user_flow.png')
img_flow.save('/Users/krish/Desktop/pageturn/report/screenshots/diagram_user_flow.png')

# 2. GENERATE ENTITY RELATIONSHIP (ER) DIAGRAM
w_er, h_er = 1200, 720
img_er = Image.new('RGB', (w_er, h_er), color='#FFFDF9')
draw_er = ImageDraw.Draw(img_er)

draw_er.rectangle([(10, 10), (w_er-10, h_er-10)], outline='#141414', width=3)
draw_er.rectangle([(10, 10), (w_er-10, 70)], fill='#141414')
draw_er.text((w_er/2, 40), "PAGETURN RELATIONAL DATA MODEL & ENTITY-RELATIONSHIP ARCHITECTURE", fill='#FFFFFF', anchor='mm')

entities = [
  {
    "title": "USER (Customer / Admin)",
    "x": 60, "y": 110, "w": 260, "h": 220, "bg": "#F4EDE0",
    "attrs": ["PK  id (String)", "    name (String)", "    email (Unique)", "    password (Encrypted)", "    phone (String)", "    membership (String)", "FK  addresses (Array[Addr])"]
  },
  {
    "title": "PRODUCT (Book)",
    "x": 470, "y": 110, "w": 260, "h": 240, "bg": "#F4EDE0",
    "attrs": ["PK  id (Integer)", "    title (String)", "    author (String)", "    genre (Enum)", "    price (Decimal INR)", "    stock (Integer)", "    isbn (String)", "    coverPattern (Enum)", "    rating (Float)"]
  },
  {
    "title": "CART ITEM",
    "x": 880, "y": 110, "w": 260, "h": 180, "bg": "#F4EDE0",
    "attrs": ["PK  cartItemId (String)", "FK  userId (String)", "FK  bookId (Integer)", "    quantity (Integer)", "    priceAtAdd (Decimal)", "    appliedCoupon (String)"]
  },
  {
    "title": "ORDER (Consignment)",
    "x": 240, "y": 420, "w": 280, "h": 240, "bg": "#F4EDE0",
    "attrs": ["PK  orderId (ORD-xxxx-PT)", "    invoiceNumber (INV-xxxx)", "FK  customerId (String)", "    orderDate (Timestamp)", "    deliveryMethod (Enum)", "    paymentMethod (Enum)", "    paymentStatus (Enum)", "    status (Placed|Packed|Shipped|Delivered)", "    grandTotal (Decimal INR)"]
  },
  {
    "title": "REVIEW & RATING",
    "x": 680, "y": 420, "w": 280, "h": 200, "bg": "#F4EDE0",
    "attrs": ["PK  reviewId (String)", "FK  bookId (Integer)", "    userName (String)", "    rating (1..5 Stars)", "    title (String)", "    comment (Text)", "    date (String)"]
  }
]

for ent in entities:
  # Shadow
  draw_er.rectangle([(ent["x"]+4, ent["y"]+4), (ent["x"]+ent["w"]+4, ent["y"]+ent["h"]+4)], fill='#141414')
  # Box
  draw_er.rectangle([(ent["x"], ent["y"]), (ent["x"]+ent["w"], ent["y"]+ent["h"])], fill=ent["bg"], outline='#141414', width=2)
  # Header
  draw_er.rectangle([(ent["x"], ent["y"]), (ent["x"]+ent["w"], ent["y"]+35)], fill='#E4472B', outline='#141414', width=2)
  draw_er.text((ent["x"]+ent["w"]/2, ent["y"]+18), ent["title"], fill='#FFFFFF', anchor='mm')
  
  curr_y = ent["y"] + 48
  for attr in ent["attrs"]:
    is_pk = "PK" in attr
    is_fk = "FK" in attr
    color = "#E4472B" if is_pk else ("#0E7490" if is_fk else "#141414")
    draw_er.text((ent["x"]+15, curr_y), attr, fill=color)
    curr_y += 20

# Relationships connectors
# USER (1) -> (M) ORDER
draw_er.line([(190, 330), (190, 520), (240, 520)], fill='#141414', width=2)
draw_er.text((170, 360), "1:N", fill='#E4472B')

# PRODUCT (1) -> (M) CART ITEM
draw_er.line([(730, 200), (880, 200)], fill='#141414', width=2)
draw_er.text((790, 185), "1:N", fill='#E4472B')

# PRODUCT (1) -> (M) ORDER (via OrderItems)
draw_er.line([(600, 350), (600, 480), (520, 480)], fill='#141414', width=2)
draw_er.text((580, 400), "1:N", fill='#E4472B')

# PRODUCT (1) -> (M) REVIEW
draw_er.line([(730, 300), (820, 300), (820, 420)], fill='#141414', width=2)
draw_er.text((800, 350), "1:N", fill='#E4472B')

img_er.save('/Users/krish/Desktop/report/screenshots/diagram_er_model.png')
img_er.save('/Users/krish/Desktop/pageturn/report/screenshots/diagram_er_model.png')
print("Diagrams successfully generated!")
