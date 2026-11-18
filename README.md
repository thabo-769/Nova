# Nova Diner – Premium Restaurant Application (Bulawayo, Zimbabwe)

An international-grade, luxury restaurant platform built with **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, and **Firebase**.

---

## Key Application Features

### 1. Customer Digital Experience
- **Interactive Digital Food Menu (`/menu`)**:
  - Full catalog covering Grills, Wagyu Burgers, Woodfired Pizza, Piri Piri Chicken, Starters, Salads, Desserts, Cocktails, Breakfast.
  - Portion size selection (e.g. Standard Cut vs Tomahawk Reserve).
  - Ingredient breakdowns, dietary tags (*Halal, Gluten-Free, Vegan, Vegetarian, Chef's Special, Spicy*), and allergen advisories.
  - Customization options (Doneness temperature, artisan sauces, crust types).
  - Search, category filter tabs, dietary filters, and sorting.
- **Table Reservation System (`/reservations`)**:
  - Date and time slot picker.
  - Seating preferences: *Main Dining Hall*, *Starlight Patio*, *VIP Private Booth*, and *Window View*.
  - Real-time table allocation with **double-booking prevention**.
  - Instant confirmation code generation (`NV-XXXXX`).
- **Exclusive Nova Date Night Privé (`/date-night`)**:
  - Curated romantic packages: *The Matopos Starlight Romance*, *Anniversary Royal Celebration*, *The Nova Forever Proposal Package*.
  - Candlelight setup, velvet rose petals, chilled champagne on ice, violinist requests.
  - Custom plate messaging hand-piped in warm Belgian molten chocolate.
- **Live Order Tracker (`/track-order`)**:
  - 5-stage real-time stepper:
    1. *Order Received*
    2. *Confirmed*
    3. *Preparing*
    4. *Dispatched / Ready for Collection*
    5. *Delivered / Collected*
  - Live timeline audit log with timestamps.
- **Nova Privé Rewards (`/rewards`)**:
  - Tiered membership: **Bronze**, **Silver**, **Gold**, **Platinum**.
  - Accumulate 10 points per \$1 spent.
  - Instant redeemable vouchers applied straight to cart checkout.
  - Referral code system (200 points referral bonus).
- **Customer Account Portal (`/account`)**:
  - Profile details, order history with instant re-tracking, reservation records, favorite meals, and saved Bulawayo delivery addresses (Burnside, Kumalo, Suburbs, Hillside, CBD, etc.).

### 2. Zimbabwe Payment Integration
- **EcoCash**: Handset USSD push authorization flow.
- **OneMoney**: NetOne mobile wallet integration.
- **InnBucks**: Merchant reference code & QR authorization.
- **Bank Cards**: Visa, Mastercard, and Zimswitch.
- **Cash on Delivery or Collection**: Clear USD and ZiG cash settlement options.

---

## Luxury Brand Palette

| Color | Hex | Purpose |
| :--- | :--- | :--- |
| **Luxury Gold** | `#D4AF37` | Monogram insignia, shimmer headlines, price tags |
| **Rich Black** | `#101010` | Dark mode background, luxury contrast |
| **Warm Ivory** | `#F8F5EF` | Light mode background surfaces |
| **White** | `#FFFFFF` | Clean typography and borders |

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Firebase credentials:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm run start
```

---

## Firebase Infrastructure

- **`firebase.json`**: Deployment settings for Firestore, Storage, Hosting, and Cloud Functions.
- **`firestore.rules`**: Production security rules enforcing owner-only profile access, public read / admin-only writes on menu and promotions, and staff role verification for orders and reservations.
- **`storage.rules`**: Secure bucket rules for food photography and customer avatars.
- **`functions/`**: Cloud Functions for order processing, loyalty point calculation, table double-booking validation, and Zimbabwe payment webhooks.
