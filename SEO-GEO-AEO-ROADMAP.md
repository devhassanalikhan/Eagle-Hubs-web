# Eagle Hubs — Growth / SEO / GEO / AEO / CRO Roadmap

This file tracks execution of the full-platform SEO/GEO/AEO/CRO brief below. Update the
**Status** column as work lands — `Not Started`, `In Progress`, `Done`, or `Blocked`.

Related prior work: the `seo-indexing-fixes` branch already covers baseline items — full
sitemap listing, `/index.html` and www/https 301 redirects, unique titles/meta descriptions
per page, and dedicated Privacy/Terms/Cookie/About/Properties/Automobiles/Investments pages.
That work is a starting point for this roadmap's Phase 2 and Phase 4 items, not a substitute
for them — the scope below (JSON-LD per content type, AI-bot crawl directives, multi-sitemap,
lead-capture/CRO components, calculators) goes well beyond it.

---

## Status Tracker

### Phase 1 — Codebase & Architecture Audit

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Scan repo structure (routing, pages, components, layouts, metadata config, sitemaps, robots.txt) | Not Started | |
| 1.2 | Evaluate Core Web Vitals bottlenecks (LCP, CLS, INP, dynamic imports, image optimization) | Not Started | |
| 1.3 | Identify missing structured data (JSON-LD), OG metadata, canonical handling, dynamic route meta generation | Not Started | |
| 1.4 | Assess lead funnels, CTA visibility, sticky quick-action controls, lead capture forms | Not Started | |

### Phase 2 — SEO, GEO & AEO Metadata Architecture

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | JSON-LD: `Organization` & `LocalBusiness` | Not Started | |
| 2.2 | JSON-LD: `RealEstateAgent`, `SingleFamilyResidence`, `RealEstateListing` | Not Started | Homepage currently has a basic `RealEstateAgent` block only |
| 2.3 | JSON-LD: `Car` / `Product` / `Offer` (vehicle marketplace) | Not Started | |
| 2.4 | JSON-LD: `SoftwareApplication` & `Service` (tech agency) | Not Started | software-development.html has a basic `Service` block only |
| 2.5 | JSON-LD: `FAQPage` & `BreadcrumbList` on key landing pages | Not Started | |
| 2.6 | GEO: LLM-friendly intro/direct-answer content blocks (entities, stats, bullet points, pricing transparency) | Not Started | |
| 2.7 | GEO: `robots.txt` directives for AI bots (PerplexityBot, GPTBot, ClaudeBot, Bytespider) while protecting proprietary endpoints | Not Started | |
| 2.8 | Keyword mapping: Real estate/marketplace terms | Not Started | |
| 2.9 | Keyword mapping: Software/tech B2B terms | Not Started | |
| 2.10 | High-CTR meta titles (<60 chars) & meta descriptions (<155 chars) sitewide | In Progress | Unique titles/descriptions exist per page (seo-indexing-fixes branch); not yet CTR/urgency-optimized or audited against the char limits here |

### Phase 3 — High-Conversion UI/UX & Component Refactoring

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Sticky mobile-responsive Floating Action Bar (WhatsApp / Call / Instant Quote modal) | Not Started | A single WhatsApp floating button exists; no call button or unified action bar |
| 3.2 | Real Estate multi-step lead form (Buy/Sell/Rent selector, budget slider, property type, location, phone/WhatsApp) | Not Started | Current inquiry modal is a single generic form |
| 3.3 | Software Services multi-step lead form (project type, budget tier, timeline, description) | Not Started | |
| 3.4 | Exit-intent popup with lead-magnet downloads | Not Started | |
| 3.5 | Mortgage/ROI Investment Calculator component | Not Started | |
| 3.6 | Software Project Cost Estimator component | Not Started | |
| 3.7 | Trust/social proof blocks (testimonials, partner logos, portfolio/case studies) | Not Started | |

### Phase 4 — Technical Sitemaps & Robots Configuration

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Sitemap index `/sitemap.xml` linking sub-sitemaps | Not Started | Currently one flat `sitemap.xml` listing all pages (seo-indexing-fixes branch) |
| 4.2 | `/sitemap-real-estate.xml` (property/investment/vehicle listings) | Not Started | |
| 4.3 | `/sitemap-tech-services.xml` (software pages, case studies) | Not Started | |
| 4.4 | `robots.txt` update: crawler directives, sitemap paths, crawl-delay rules | Not Started | Existing rules reviewed and confirmed safe for current pages (seo-indexing-fixes branch); no AI-bot-specific directives yet |

### Phase 5 — Execution & Verification

| # | Task | Status | Notes |
|---|------|--------|-------|
| 5.1 | Implement in production-ready code, cleanly separated components | Not Started | |
| 5.2 | Full responsive fidelity across mobile/tablet/desktop | Not Started | |
| 5.3 | Validate no syntax errors, broken imports, or build warnings | Not Started | |
| 5.4 | Final summary: files changed, schemas added, keyword mappings, backlink recommendations | Not Started | |

---

## Original Brief (source of record)

> You are acting as a Senior Staff Software Architect, Lead Growth/SEO Specialist, GEO/AEO Specialist, and Conversion Rate Optimization (CRO) Engineer.
>
> ### OBJECTIVE
> Perform a complete codebase audit, refactoring, and SEO/GEO/AEO/CRO enhancement for our dual-purpose web platform: Eagle Hubs (https://www.eaglehubspk.com/).
> Our site operates across two primary business verticals:
> 1. Multi-Vertical Marketplace: Real Estate, Cars/Vehicles, Investments, and Buy/Sell/Rent/Invest listings.
> 2. Software & AI Engineering Services: Custom Software Development, AI/LLM Integration, Mobile/Web App Development, and Tech Projects.
>
> Our target is aggressive organic growth, top search engine visibility (Google/Bing SEO), Generative Engine Optimization (Perplexity, ChatGPT Search, Gemini GEO), Answer Engine Optimization (AEO for voice/chat search), and maximum lead capture/sales conversion.
>
> ---
>
> ### PHASE 1: CODEBASE & ARCHITECTURE AUDIT
> 1. Scan the repository structure (routing, pages, components, layouts, metadata config, sitemaps, robots.txt).
> 2. Evaluate performance and Core Web Vitals bottlenecks (LCP, CLS, INP, dynamic imports, image optimization).
> 3. Identify missing structured data (JSON-LD), Open Graph metadata, canonical tag handling, and dynamic route meta generation.
> 4. Assess current UI lead funnels, call-to-action (CTA) visibility, sticky quick-action controls (WhatsApp, call, request quote), and lead capture forms.
>
> ---
>
> ### PHASE 2: SEO, GEO & AEO METADATA ARCHITECTURE
> Implement a centralized, dynamic Metadata Engine across the application:
>
> 1. **JSON-LD Schema Integration**: Create modular, type-safe JSON-LD generators for:
>    - `Organization` & `LocalBusiness` (Eagle Hubs corporate & local entity definitions).
>    - `RealEstateAgent`, `SingleFamilyResidence`, and `RealEstateListing` (Real Estate pages).
>    - `Car` and `Product` / `Offer` schemas (Vehicle marketplace pages).
>    - `SoftwareApplication` and `Service` schemas (Tech agency and custom software offerings).
>    - `FAQPage` and `BreadcrumbList` on every key landing page to secure Google Rich Snippets and AEO direct answers.
>
> 2. **GEO (Generative Engine Optimization) Strategy**:
>    - Refactor page headers, intro paragraphs, and direct-answer sections into LLM-friendly factual blocks (clear entity relationships, concise summaries, statistics, bullet points, and pricing transparency).
>    - Ensure AI search bots (PerplexityBot, GPTBot, ClaudeBot, Bytespider) are appropriately handled in `robots.txt` for indexing while protecting proprietary API endpoints.
>
> 3. **Keyword Optimization Engine**:
>    - **Real Estate & Marketplace Keywords**: Focus on local and high-intent commercial terms (e.g., "buy property in Pakistan", "luxury apartments for sale", "plots for investment", "used cars for sale", "real estate rental portal", "high ROI property investments").
>    - **Software & Tech Keywords**: Focus on global and high-value B2B terms (e.g., "custom software development company", "AI application developers", "full-stack development agency", "MVP development for startups", "SaaS development services").
>    - Write dynamic, high-CTR meta titles (under 60 chars) and meta descriptions (under 155 chars) containing primary keywords, urgency triggers, and clear value propositions.
>
> ---
>
> ### PHASE 3: HIGH-CONVERSION UI/UX & COMPONENT REFACTORING
> 1. **Sticky Quick-Action Hub**:
>    - Create a mobile-responsive Floating Action Bar (WhatsApp direct chat, Phone call, Instant Quote/Lead modal trigger).
>
> 2. **Lead Magnet & Capture Components**:
>    - Refactor contact forms into multi-step interactive lead widgets:
>      - *Real Estate Lead Form*: Buy / Sell / Rent intent selector, budget range slider, property type, location, phone/WhatsApp field.
>      - *Software Services Lead Form*: Project type (AI, Web, App, Custom), budget tier, timeline, quick project description field.
>    - Implement exit-intent popups offering high-value downloadable resources (e.g., "Pakistan Real Estate Investment Guide 2026" or "Software Project Estimation Roadmap").
>
> 3. **Interactive Tools / Calculators**:
>    - Build or integrate an **Mortgage/ROI Investment Calculator** component for real estate/investments.
>    - Build or integrate a **Software Project Cost Estimator** component for tech services.
>
> 4. **Trust & Social Proof Blocks**:
>    - Inject structured client testimonials, verified partner logos, project portfolio showcases, and clear case study cards across all primary landing pages.
>
> ---
>
> ### PHASE 4: TECHNICAL SITEMAPS & ROBOTS CONFIGURATION
> 1. Generate multi-sitemap support or dynamic sitemap routes:
>    - `/sitemap.xml` (index linking to sub-sitemaps)
>    - `/sitemap-real-estate.xml` (property, investment, and vehicle listings)
>    - `/sitemap-tech-services.xml` (software solutions, tech agency pages, case studies)
> 2. Update `robots.txt` with standard crawler directives, explicit sitemap location paths, and clean crawl-delay rules.
>
> ---
>
> ### PHASE 5: EXECUTION & VERIFICATION
> 1. Modify/create files in place with production-ready TypeScript/JavaScript, cleanly separated components, and proper CSS/Tailwind utility classes.
> 2. Ensure full responsive fidelity across Mobile, Tablet, and Desktop break-points.
> 3. Validate that no syntax errors, broken imports, or build warnings remain.
> 4. Output a concise summary of all created/modified files, newly added schemas, keyword target mappings, and recommended next steps for off-page backlink campaigns.
