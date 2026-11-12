# Branda V2 — Integrated Branding & Corporate Gifting Storefront

Production-ready Next.js App Router storefront architecture for **Branda (Digital by Branda)**, engineered for high-scale eCommerce (50,000+ SKUs), advanced technical SEO, DRY volume tier pricing, and dual-mode checkout (free digital 3D mockup reviews & test-mode production deposits).

---

## 🌟 Key Architecture & Highlights

- **Next.js App Router & Hybrid Rendering:** Server Components by default with client boundary isolation for interactive product leaves (swatches, carousels, steppers).
- **Technical SEO at Scale:**
  - Automated XML sitemaps chunked into 10,000-URL indexes via `generateSitemaps()` to support 50,000+ SKUs (`/sitemap/0.xml` through `4.xml`).
  - Server-rendered Schema.org JSON-LD structured data (`Product` with `AggregateOffer` in NGN, `BreadcrumbList`, `Organization`, `WebSite`).
  - Deterministic canonical URLs and `robots.ts` crawl-trap prevention for facet queries.
- **DRY Commerce & Volume Pricing Engine:**
  - Single source of truth in `src/lib/commerce/pricing.ts` backed by 100% test coverage in `src/lib/commerce/pricing.test.ts`.
  - Dynamic volume discount tiers (MOQ, 25+, 50+, 100+), real-time NGN/USD currency formatting, and Nigerian FIRS 7.5% VAT calculation.
- **Public API Integration & Resilient Fallbacks:**
  - Server-side API proxy (`/api/products`) with ISR caching (`revalidate = 3600`) normalizing external public catalogs into enterprise corporate merchandise categories with instant local fallback.
- **Dual-Path Commercial Checkout:**
  - *Stage 1:* Free Digital 3D Mockup Request (no payment required upfront, matching enterprise procurement).
  - *Stage 2:* Test Mode Payment Gateway (`PaymentModal`) simulating Paystack/Flutterwave card & virtual bank transfer authorization.
- **Core Web Vitals & Real User Monitoring:**
  - `useReportWebVitals` telemetry measuring real-user LCP, INP, and CLS, paired with a development performance HUD widget.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Navigating to the root redirects directly to the `/shop` merchandise catalogue.

### 3. Run Automated Tests
```bash
npm test
```

---

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── (storefront)/
│   │   │   ├── shop/               # 4-column catalog, search & pagination
│   │   │   ├── products/[slug]/    # Server/Client split PDP & cross-sells
│   │   │   ├── categories/[slug]/  # Canonical department hubs
│   │   │   ├── search/             # Dedicated faceted search results
│   │   │   ├── cart/               # Bulk product card, pill steppers
│   │   │   ├── checkout/           # Dual-mode checkout & confirmation
│   │   │   └── account/            # Client dashboard & 3D proof approvals
│   │   ├── api/products/           # ISR API proxy & normalizer
│   │   ├── sitemap.ts              # 50,000 SKU chunked XML sitemaps
│   │   └── robots.ts               # Crawl budget & facet trap directives
│   ├── components/
│   │   ├── products/               # ProductCard, image canvas
│   │   ├── layout/                 # ShopNavbar, Navbar, CartDrawer
│   │   ├── checkout/               # Paystack test mode PaymentModal
│   │   ├── seo/                    # JsonLd schema renderer
│   │   └── analytics/              # Core Web Vitals telemetry HUD
│   ├── hooks/                      # useCart (Zustand persistent storage)
│   └── lib/
│       ├── commerce/               # DRY pricing engine & test suites
│       └── seo/                    # Schema.org structured data generators
└── submission/                     # 2-Page Technical Assessment PDF Deliverables
```

---

## 📄 Screening Assessment Deliverables

The 2-page PDF deliverable for the **Senior Frontend Engineer** application is located in [`submission/`](./submission):
- `submission/BRANDA_V2_TECHNICAL_ASSESSMENT_SUBMISSION.md`
- `submission/print-to-pdf.html` (Print-ready A4 2-page layout)
