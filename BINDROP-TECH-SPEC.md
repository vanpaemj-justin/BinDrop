# BinDrop - Technical Specification

**Last Updated:** May 7, 2026  
**Status:** Live (MVP)

---

## 1. Overview

**BinDrop** is a moving bin rental service based in Grand Rapids, MI. The platform allows customers to rent reusable moving bins online through a streamlined booking and payment flow.

**Live URL:** https://bindrop-1.onrender.com (temporary — custom domain pending)

---

## 2. Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React 18 + Vite + TypeScript |
| **Styling** | Tailwind CSS |
| **Payments** | Stripe Payment Links |
| **Forms** | Formspree |
| **Hosting** | Render |
| **Source Control** | GitHub |

### Key Dependencies
- `react` ^18.x
- `vite` ^5.x
- `tailwindcss` ^3.x
- `@stripe/stripe-js` (for Stripe publishable key only)
- `lucide-react` (icons)

---

## 3. Architecture

### 3.1 High-Level Flow

```
User visits site
       ↓
Selects package (Starter/Standard/Large) + duration (2/4 weeks)
       ↓
Enters contact info, delivery/pickup dates, addresses
       ↓
Clicks "Proceed to Payment"
       ↓
Redirects to Stripe Payment Link (includes rental + $100 deposit)
       ↓
After payment → returns to site → Formspree submits booking data
       ↓
Success page displays with order summary
```

### 3.2 Data Storage

- **Products/Pricing:** Hardcoded in `/src/lib/packages.ts`
- **Booking Data:** sessionStorage (temporary, cleared after success)
- **Form Submissions:** Formspree (emails form data to configured recipient)

---

## 4. Key Features

### 4.1 Package Selection
- 3 packages: Starter (15 bins), Standard (30 bins), Large (45 bins)
- 2-week and 4-week rental options
- Pricing stored in `packages.ts`

### 4.2 Payment Integration
- **Stripe Payment Links:** Each package/duration combination has a dedicated payment link
- **Deposit:** $100 refundable deposit included in payment link
- **Live Keys:** 
  - Publishable: `pk_live_51TRvC51AU0U7U9qV4Kt8fKLaNuMQstwIEH0zr0C7GGIiU1oFHnXdbCBxzndHSeJeGphwp9H353D4vjNvXombMDwc00Tk3QUfGs`
  - Account: frontporchinvest@gmail.com

### 4.3 Booking Flow
- 4-step modal wizard:
  1. Select package & duration
  2. Enter dates & addresses
  3. Contact info
  4. Review & pay
- Success callback redirects back with `?payment_success=true` query param
- Formspree submission triggered after successful payment

### 4.4 Formspree Integration
- Form ID: `xlgaolqq`
- Submission happens client-side after Stripe redirect
- reCAPTCHA disabled for AJAX submissions

---

## 5. File Structure

```
bindrop-check/
├── src/
│   ├── components/
│   │   ├── BookingFlow.tsx    # Modal booking wizard
│   │   └── LandingPage.tsx    # Main landing page
│   ├── lib/
│   │   └── packages.ts        # Package data & pricing
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 6. Stripe Integration Details

### Payment Links (Live)

| Package | Duration | Payment Link |
|---------|----------|--------------|
| Starter | 2 weeks | `https://buy.stripe.com/00w4gr10AaOW6MVd5R5Vu00` |
| Starter | 4 weeks | `https://buy.stripe.com/7sYfZ938I5uC4EN1n95Vu01` |
| Standard | 2 weeks | `https://buy.stripe.com/8x228j9x69KS3AJ8PB5Vu02` |
| Standard | 4 weeks | `https://buy.stripe.com/3cIfZ9gZyg9g0oxaXJ5Vu03` |
| Large | 2 weeks | `https://buy.stripe.com/fZu8wH4cMg9g4ENc1N5Vu04` |
| Large | 4 weeks | `https://buy.stripe.com/14A3cn4cMf5cgnve9V5Vu05` |

### Pricing

| Package | 2 Weeks | 4 Weeks |
|---------|----------|---------|
| Starter | $119 | $159 |
| Standard | $169 | $209 |
| Large | $219 | $259 |

*Plus $100 refundable deposit (included in Stripe payment)*

### Stripe Redirect Configuration
- Each payment link has "After payment" redirect set to: `{site}/?payment_success=true`

---

## 7. Security Considerations

- ✅ **Publishable key only in frontend** — Safe for client-side use
- ✅ **Secret key never exposed** — Never included in code
- ✅ **Formspree submissions** — Over HTTPS
- ⚠️ **No CAPTCHA** — Currently disabled (can be re-enabled with proper AJAX setup)
- ⚠️ **Email visible** — Contact email in source code (low risk)

---

## 8. Future Improvements (Backlog)

- [ ] Custom domain (e.g., bindropmoving.com)
- [ ] Address autocomplete (Google Places API or Mapbox)
- [ ] Order notifications via Stripe webhooks
- [ ] Admin dashboard to view/manage bookings
- [ ] Service area validation
- [ ] Realtor portal with bulk pricing
- [ ] Recaptcha protection

---

## 9. Contact

- **Email:** bindropmoving@gmail.com
- **Service Area:** Grand Rapids, MI + 35 miles
- **Formspree Endpoint:** https://formspree.io/f/xlgaolqq

---

*This specification will be updated as the project evolves.*