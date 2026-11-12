# Branda V2 — Senior Frontend Engineer Screening Submission

This folder contains the complete, mandatory screening test submission for the **Senior Frontend Engineer (Next.js & Technical SEO)** role at **Branda (Digital by Branda)**.

---

## Deliverables Included

1. **[BRANDA_V2_TECHNICAL_ASSESSMENT_SUBMISSION.md](file:///c:/Users/USER/Downloads/branda/submission/BRANDA_V2_TECHNICAL_ASSESSMENT_SUBMISSION.md)**:
   - Full markdown document covering **Task 1** (Production Experience), **Task 2** (50,000 SKUs Architecture Assessment), and **Task 3** (Proof of Expertise Walkthrough).

2. **[print-to-pdf.html](file:///c:/Users/USER/Downloads/branda/submission/print-to-pdf.html)**:
   - Formatted, print-ready 2-page document strictly complying with the assessment requirement (*"Maximum 2 pages (PDF), excluding supporting links"*).
   - Designed with `@page { size: A4; margin: 14mm 16mm; }` and clean executive styling.

---

## How to Export to PDF (2 Pages)

1. Open `submission/print-to-pdf.html` in your web browser (Chrome, Edge, Brave, etc.).
2. Press `Ctrl + P` (or click the blue **"Print / Save as PDF"** button at the top).
3. In the print dialog:
   - **Destination:** Save as PDF
   - **Pages:** All (will strictly be 2 pages)
   - **Layout:** Portrait
   - **Paper Size:** A4 (or Letter)
   - **Margins:** Default (or None)
   - **Options:** Check *"Background graphics"* so the badges and boxes render crisply.
4. Click **Save** as `Branda_V2_Senior_Frontend_Engineer_Assessment.pdf`.

---

## Summary of Assessment Coverage

- **Task 1 — Production Experience:** Two live Next.js eCommerce projects with verifiable roles, Next.js versions (14 & 15), rendering strategies (ISR/SSR), Core Web Vitals optimizations, technical challenges solved, and measurable outcomes.
- **Task 2 — Technical Assessment (50,000 SKUs):**
  1. *Speed, Scale & Maintainability:* Next.js App Router domain-driven modularity, Server/Client boundary separation, DRY commerce engine.
  2. *SEO, Canonicals & Structured Data:* Server `generateMetadata`, `generateSitemaps()` chunked across 50k SKUs, Schema.org `Product` with `AggregateOffer` (NGN), crawl budget preservation.
  3. *Core Web Vitals & Performance:* Zero CLS via aspect-ratio containers, tree-shaken SVG modules, ISR caching, `useReportWebVitals` telemetry.
  4. *Cart, Checkout & Resilience:* Persistent optimistic cart, circuit-breaker API fallbacks, dual-mode checkout (Mockup request & Test-mode payment gateway).
  5. *Code Reviews & Bug Prevention:* Pre-commit Husky hooks, TypeScript strict checks, PR review checklist, Lighthouse CI assertions.
- **Task 3 — Proof of Expertise:** Architecture walkthrough pointing to the working codebase in `c:\Users\USER\Downloads\branda`.

