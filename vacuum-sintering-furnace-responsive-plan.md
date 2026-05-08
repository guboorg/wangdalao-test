# Brother Furnace Vacuum Sintering Furnace Responsive Website Development Plan

## 1. Executive Summary

Build a mobile-first, SEO-focused B2B industrial product landing page for Brother Furnace, centered on vacuum sintering furnaces while clearly presenting the broader vacuum furnace portfolio: vacuum heat treatment furnaces, vacuum brazing furnaces, and vacuum medium-frequency induction melting furnaces. The page should function as a high-conversion lead-generation website for enterprise professionals, including purchasing managers, plant managers, process engineers, R&D labs, and metallurgy manufacturers who need technical confidence before sending an inquiry. The recommended approach is a fast static/SSR marketing page with structured content, strong product taxonomy, comparison tables, application sections, trust signals, technical specifications, and repeated inquiry CTAs. The design should use Brother Furnace's primary orange `#ec6517` as a high-energy industrial accent, balanced with deep graphite neutrals, clean whitespace, precise technical typography, accessible contrast, and responsive components that perform smoothly across 320px mobile screens through 1440px+ large displays.

## 2. Responsive Strategy

### 2.1 Recommended Approach

Use a mobile-first implementation because many international buyers first discover suppliers through Google search, WhatsApp links, email referrals, or mobile browsing at trade shows. Mobile-first CSS also reduces default payload, improves Core Web Vitals, and forces content prioritization before expanding into richer desktop layouts.

Recommended app type assumption: B2B industrial product and lead-generation website.

Recommended target user assumption: enterprise professionals, technical buyers, procurement teams, production engineers, and international distributors evaluating vacuum furnace suppliers.

### 2.2 Breakpoint Strategy

Use content-driven breakpoints with four primary tiers:

| Breakpoint | Token | Target Devices | Layout Behavior | Rationale |
|---|---:|---|---|---|
| `320px` base | `xs` | Small phones | Single-column layout, compact spacing, sticky inquiry CTA | Minimum practical smartphone support. |
| `480px` | `sm` | Large phones | Larger cards, two-column mini stats when space allows | Improves scan speed on modern phones. |
| `768px` | `md` | Tablets | Two-column hero, product type grid, persistent top nav | Common tablet width and important for sales teams. |
| `1024px` | `lg` | Laptops/desktops | Full header nav, 12-column grid, technical tables side-by-side | Main B2B research environment. |
| `1440px` | `xl` | Large monitors | Max-width content, expanded comparison modules, richer imagery | Prevents overly long line lengths while using premium space. |

Implementation values:

```css
:root {
  --zksjl-container-max: 1200px;
  --zksjl-container-wide: 1440px;
  --zksjl-gutter: clamp(16px, 4vw, 40px);
}

.zksjl-container {
  width: min(100% - (var(--zksjl-gutter) * 2), var(--zksjl-container-max));
  margin-inline: auto;
}
```

### 2.3 Layout System

Use a 12-column grid on desktop, 6-column on tablet, and 4-column on mobile. Components should use CSS Grid for macro layout and Flexbox for local alignment.

Recommended section layout:

1. Hero: single column on mobile; 7/5 split on desktop with product image or technical illustration.
2. Quick trust bar: certifications, export experience, customization, factory-direct support.
3. Product taxonomy: sintering furnace types by heating chamber or heating element.
4. Core technical advantages: temperature uniformity, vacuum level, chamber materials, control system, cooling options.
5. Furnace type comparison table: stainless steel chamber, ceramic fiber chamber, molybdenum strip chamber, graphite carbon tube, graphite furnace, tungsten wire furnace.
6. Application industries: powder metallurgy, advanced ceramics, cemented carbide, magnetic materials, aerospace alloys, 3D printing metal powder parts.
7. Buying guide: how to select a vacuum sintering furnace.
8. Engineering and manufacturing capability: design, fabrication, assembly, commissioning, after-sales.
9. Inquiry form and CTA.
10. Related products: vacuum heat treatment furnace, vacuum brazing furnace, vacuum induction melting furnace.

Suggested class prefix: every custom block should begin with `zksjl-`, such as `.zksjl-hero`, `.zksjl-product-grid`, `.zksjl-spec-table`, `.zksjl-inquiry-form`, and `.zksjl-related-products`, to avoid conflicts with other product pages.

### 2.4 Fluid Typography and Scaling

Use `clamp()` for headings and body text to prevent abrupt jumps:

```css
:root {
  --zksjl-text-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem);
  --zksjl-text-sm: clamp(0.875rem, 0.84rem + 0.18vw, 0.9375rem);
  --zksjl-text-base: clamp(1rem, 0.96rem + 0.2vw, 1.0625rem);
  --zksjl-text-lg: clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem);
  --zksjl-h1: clamp(2.25rem, 1.55rem + 3.2vw, 4.75rem);
  --zksjl-h2: clamp(1.75rem, 1.35rem + 1.8vw, 3rem);
  --zksjl-h3: clamp(1.25rem, 1.1rem + 0.8vw, 1.75rem);
  --zksjl-line-body: 1.65;
  --zksjl-line-heading: 1.08;
}
```

Body copy should stay between 45 and 75 characters per line on desktop. Technical descriptions should use short paragraphs, bullets, tables, and visual callouts because buyers scan specifications before contacting suppliers.

### 2.5 Touch, Hover, Keyboard, and Gesture Rules

Minimum target sizes:

- Primary CTA buttons: at least `48px` high on mobile, `44px` high on desktop.
- Icon buttons: minimum `44px × 44px`.
- Form inputs: minimum `48px` high.
- Card links: make the whole card clickable when it leads to a detail section.

Interaction strategy:

- Mobile: avoid hover-dependent content; use tap-to-expand accordions for FAQs and specifications.
- Desktop: add subtle hover lift on product cards using `transform: translateY(-4px)` and shadow transition.
- Keyboard: all interactive elements must have visible focus states using `outline: 3px solid color-mix(in srgb, #ec6517 70%, white)` and `outline-offset: 3px`.
- Navigation: support `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape` for menus and dialogs.
- Gestures: use horizontal swiping only for optional image galleries; never hide key technical data inside swipe-only UI.

### 2.6 Safe Areas and Dynamic Viewports

Use modern viewport units for full-screen sections and sticky mobile CTAs:

```css
.zksjl-hero {
  min-height: min(760px, 100svh);
  padding-top: calc(72px + env(safe-area-inset-top));
}

.zksjl-mobile-cta {
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}
```

Use `svh` for stable mobile viewport sections, `dvh` for drawers/modals that should follow dynamic browser chrome, and avoid `100vh` for mobile full-height layouts because it can create overflow when address bars collapse.

### 2.7 Image Optimization and Art Direction

Use responsive images for furnace photos, chamber details, control cabinets, factory scenes, and application materials:

```html
<picture>
  <source media="(min-width: 1024px)" srcset="/images/vacuum-sintering-furnace-hero-desktop.avif 1x, /images/vacuum-sintering-furnace-hero-desktop@2x.avif 2x">
  <source media="(min-width: 768px)" srcset="/images/vacuum-sintering-furnace-hero-tablet.avif">
  <img src="/images/vacuum-sintering-furnace-hero-mobile.avif" alt="Brother Furnace vacuum sintering furnace with high-vacuum chamber and control cabinet" width="720" height="640" fetchpriority="high" decoding="async">
</picture>
```

Rules:

- Hero image: use `fetchpriority="high"`, explicit `width` and `height`, and AVIF/WebP fallback.
- Below-fold images: use `loading="lazy"` and `decoding="async"`.
- Technical diagrams: prefer SVG when possible for crisp scaling and smaller payload.
- Product gallery: use image CDN resizing or build-time variants at 480, 768, 1024, 1440, and 1920 widths.
- Avoid generic stock photos; use real factory, chamber, heating element, control system, and shipment photos to build trust.

## 3. Performance Blueprint

### 3.1 Core Web Vitals Targets

| Metric | Target | Implementation Focus |
|---|---:|---|
| LCP | `< 2.5s`, goal `< 1.8s` | Optimized hero image, critical CSS, server rendering, no render-blocking sliders. |
| INP | `< 100ms` | Minimal JavaScript, delegated events, no heavy animation libraries. |
| CLS | `< 0.1`, goal `< 0.05` | Reserved media dimensions, stable font loading, fixed CTA space. |
| TTFB | `< 800ms` | Static generation or edge SSR, CDN caching. |
| Total JS | `< 120KB` gzip for page JS | Progressive enhancement and component-level loading. |

### 3.2 Asset Optimization

Recommended techniques:

- Generate AVIF and WebP images from original furnace photos.
- Inline only critical above-the-fold CSS; load non-critical CSS normally with cache headers.
- Use `font-display: swap` or `font-display: optional`.
- Subset fonts to Latin if the English page does not require Chinese body text.
- Self-host Font Awesome 6.5.0 icons as SVG sprites or individual tree-shaken icons instead of loading the full font package.
- Use Brotli compression for HTML, CSS, JS, SVG, JSON, and XML.
- Add immutable cache headers for hashed assets: `Cache-Control: public, max-age=31536000, immutable`.

### 3.3 JavaScript Strategy

The page should work with minimal JavaScript. Required JS should be limited to:

- Mobile navigation drawer.
- Inquiry form validation and submission.
- FAQ/specification accordions.
- Optional product gallery lightbox.
- Optional analytics and conversion tracking, loaded after consent where required.

Code splitting plan:

- Base bundle: navigation, form validation, analytics bootstrap.
- Lazy bundle: gallery/lightbox only when a gallery exists or is opened.
- Lazy bundle: comparison calculator or quote configurator only below the fold.
- Do not ship a full UI library if only a landing page is needed.

### 3.4 Animation Smoothness

Use transform and opacity only for core animations. Avoid animating width, height, top, left, box-shadow, or filter on large elements.

Motion tokens:

```css
:root {
  --zksjl-duration-fast: 120ms;
  --zksjl-duration-base: 220ms;
  --zksjl-duration-slow: 400ms;
  --zksjl-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --zksjl-ease-emphasized: cubic-bezier(0.2, 0, 0, 1.2);
}
```

Use `will-change` only immediately before animation and remove it afterward where possible. Apply `contain: layout paint;` to independent card grids, accordions, and off-canvas drawers to reduce layout recalculation.

Example:

```css
.zksjl-product-card {
  contain: layout paint;
  transition: transform var(--zksjl-duration-base) var(--zksjl-ease-standard),
              box-shadow var(--zksjl-duration-base) var(--zksjl-ease-standard);
}

.zksjl-product-card:hover {
  transform: translateY(-4px);
}
```

Reduced motion support:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3.5 Lazy Loading and Progressive Rendering

- Render hero, trust bar, and first product overview immediately.
- Lazy-load below-fold images.
- Use skeleton placeholders for inquiry form submit state, not for static marketing content.
- Defer non-critical third-party scripts until after user interaction or after `load`.
- Use `content-visibility: auto` for deep below-fold sections, with `contain-intrinsic-size` to avoid layout jumps.

### 3.6 Offline and Graceful Degradation

For a marketing page, full offline application behavior is not required, but graceful degradation should be included:

- If JavaScript fails, all content, phone/email links, and basic form fallback remain accessible.
- If form API fails, show email and WhatsApp fallback CTA.
- If images fail, descriptive alt text and text content still communicate the product.
- Optional service worker can cache the page shell, logo, critical CSS, and contact page for repeat visitors, but avoid complex offline logic that could cache stale product specifications.

## 4. Design System Specification

### 4.1 Design Direction

The visual identity should feel industrial, precise, trustworthy, and modern. Brother Furnace sells high-value manufacturing equipment, so the UI should avoid flashy consumer effects and instead use confident typography, structured grids, technical diagrams, controlled orange accents, and real factory imagery.

### 4.2 Color Tokens

Primary color: `#ec6517`.

Recommended light palette:

```css
:root {
  --zksjl-color-primary-50: #fff3ec;
  --zksjl-color-primary-100: #ffe1cf;
  --zksjl-color-primary-200: #ffc19d;
  --zksjl-color-primary-300: #ff9d63;
  --zksjl-color-primary-400: #ff7f35;
  --zksjl-color-primary-500: #ec6517;
  --zksjl-color-primary-600: #c94f0f;
  --zksjl-color-primary-700: #9f3d0d;
  --zksjl-color-primary-800: #763012;
  --zksjl-color-primary-900: #4d220f;

  --zksjl-color-graphite-950: #111827;
  --zksjl-color-graphite-900: #1f2937;
  --zksjl-color-graphite-800: #374151;
  --zksjl-color-graphite-700: #4b5563;
  --zksjl-color-graphite-600: #6b7280;
  --zksjl-color-graphite-300: #d1d5db;
  --zksjl-color-graphite-200: #e5e7eb;
  --zksjl-color-graphite-100: #f3f4f6;
  --zksjl-color-graphite-50: #f9fafb;

  --zksjl-color-steel: #64748b;
  --zksjl-color-vacuum-blue: #0f4c81;
  --zksjl-color-success: #16803c;
  --zksjl-color-warning: #b45309;
  --zksjl-color-error: #b91c1c;
  --zksjl-color-surface: #ffffff;
  --zksjl-color-background: #f8fafc;
  --zksjl-color-text: #111827;
  --zksjl-color-muted: #4b5563;
}
```

Dark mode palette:

```css
[data-theme="dark"] {
  --zksjl-color-surface: #172033;
  --zksjl-color-background: #0b1120;
  --zksjl-color-text: #f9fafb;
  --zksjl-color-muted: #cbd5e1;
  --zksjl-color-border: rgba(255, 255, 255, 0.12);
}
```

Usage rules:

- Use orange for primary CTAs, active states, section labels, and important technical highlights.
- Use deep graphite for headings and navigation.
- Use vacuum blue sparingly for technical credibility, charts, and secondary tags.
- Avoid orange body text on white for small text unless contrast is verified.
- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text and UI components.

### 4.3 Typography

Recommended font pairing:

- Headings: `Inter`, `Manrope`, or `Sora` for a modern technical appearance.
- Body: `Inter` or `Roboto` for excellent readability in specifications and tables.
- Numeric/spec values: use `font-variant-numeric: tabular-nums;` for aligned technical data.

Recommended CSS:

```css
body {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--zksjl-color-text);
  line-height: var(--zksjl-line-body);
  text-rendering: optimizeLegibility;
}

.zksjl-kpi-value,
.zksjl-spec-value {
  font-variant-numeric: tabular-nums;
}
```

Typography hierarchy:

- H1: one page-level heading with keyword phrase such as “Vacuum Sintering Furnace Manufacturer”.
- H2: major SEO sections such as “Vacuum Sintering Furnace Types”, “Technical Advantages”, “Applications”, and “How to Choose”.
- H3: specific product types and feature groups.
- Body: plain, direct English written for international buyers.

### 4.4 Spacing System

Use an 8px base spacing scale with larger fluid section spacing.

```css
:root {
  --zksjl-space-1: 4px;
  --zksjl-space-2: 8px;
  --zksjl-space-3: 12px;
  --zksjl-space-4: 16px;
  --zksjl-space-5: 24px;
  --zksjl-space-6: 32px;
  --zksjl-space-7: 48px;
  --zksjl-space-8: 64px;
  --zksjl-space-9: 96px;
  --zksjl-section-y: clamp(56px, 8vw, 120px);
}
```

Rules:

- Section vertical padding: `var(--zksjl-section-y)`.
- Card internal padding: `20px` mobile, `28px` tablet, `32px` desktop.
- Grid gaps: `16px` mobile, `24px` tablet, `32px` desktop.
- Keep more whitespace around inquiry CTAs to increase importance and reduce visual noise.

### 4.5 Radius and Shadow System

Border radius philosophy:

- Industrial equipment should feel precise, not overly playful.
- Use moderate radii for cards and buttons.
- Use sharper radii for tables and technical modules.

```css
:root {
  --zksjl-radius-sm: 6px;
  --zksjl-radius-md: 10px;
  --zksjl-radius-lg: 16px;
  --zksjl-radius-xl: 24px;
  --zksjl-radius-pill: 999px;

  --zksjl-shadow-sm: 0 1px 2px rgba(17, 24, 39, 0.08);
  --zksjl-shadow-md: 0 12px 30px rgba(17, 24, 39, 0.10);
  --zksjl-shadow-lg: 0 24px 60px rgba(17, 24, 39, 0.16);
  --zksjl-shadow-orange: 0 18px 40px rgba(236, 101, 23, 0.24);
}
```

Use shadows for hierarchy, not decoration. Avoid heavy shadows on every card; reserve stronger shadows for hero CTA, active cards, and floating quote panels.

### 4.6 Iconography

Use Font Awesome 6.5.0 SVG icons, not the entire icon font, to reduce payload. Recommended icons:

- `fa-fire-flame-curved`: heating technology.
- `fa-gauge-high`: temperature and vacuum performance.
- `fa-industry`: factory capability.
- `fa-temperature-high`: high-temperature sintering.
- `fa-shield-halved`: safety and quality control.
- `fa-screwdriver-wrench`: customization and maintenance.
- `fa-file-lines`: specification sheets.
- `fa-envelope-open-text`: inquiry CTA.

Rules:

- Icons should be `20px` or `24px` in cards, `32px` in feature highlights.
- Use outlined or duotone-style treatment with orange background chips.
- Never rely on icons alone; always include visible text labels.

### 4.7 Imagery and Illustration Style

Recommended image set:

- Hero: finished vacuum sintering furnace with chamber/control cabinet visible.
- Detail photos: heating chamber, graphite heating element, molybdenum strip, vacuum pump system, control screen.
- Factory proof: welding, assembly, testing, packing, shipping.
- Application proof: sintered metal parts, ceramic parts, hard alloy tools, magnetic materials.

Style rules:

- Use consistent warm-neutral color grading.
- Avoid over-saturated blue industrial stock images.
- Use technical callout overlays with labels such as “High-vacuum chamber”, “PLC control system”, and “Custom heating zone”.
- Maintain real equipment proportions; do not use misleading AI-generated machinery as primary product proof.

### 4.8 Component Consistency Rules

- All sections use `.zksjl-section` plus a modifier class.
- Cards use consistent header, icon, title, description, and CTA anatomy.
- CTAs use three variants only: primary orange, secondary outline, and text link.
- Tables use sticky first column on mobile only if it does not create usability issues; otherwise transform into stacked spec cards.
- Every card heading should use an H3 or H4 depending on section depth.
- Do not mix multiple button shapes in the same viewport.

## 5. UX/UI Pattern Library Plan

### 5.1 Recommended Page Content Architecture

Use this SEO and conversion-focused content order:

1. Header and navigation.
2. Hero with H1, product value proposition, image, and two CTAs: “Request a Quote” and “View Furnace Types”.
3. Trust bar: factory-direct manufacturer, custom design, high-vacuum systems, global delivery, installation support.
4. Intro section: what a vacuum sintering furnace is and why Brother Furnace is a strong supplier.
5. Product type grid for vacuum sintering furnaces:
   - Vacuum stainless steel chamber sintering furnace.
   - Vacuum ceramic fiber chamber sintering furnace.
   - Vacuum molybdenum strip chamber sintering furnace.
   - Vacuum graphite carbon tube furnace.
   - Vacuum graphite furnace.
   - Vacuum tungsten wire furnace.
6. Feature section: vacuum system, heating system, insulation chamber, cooling system, control system, safety interlocks.
7. Technical specification table with configurable ranges.
8. Application industries and materials.
9. Selection guide: temperature, work zone size, vacuum level, heating element, cooling rate, automation, budget.
10. Factory capability and quality process.
11. Case or scenario modules, such as powder metallurgy or ceramic sintering.
12. FAQ.
13. Inquiry form.
14. Related products.
15. Footer with contact information and internal links.

### 5.2 Hierarchy and Scannability

Use F-pattern scanning for technical sections and Z-pattern scanning for hero/CTA sections.

Rules:

- Start every major section with a short eyebrow label, H2, and 1 to 2 sentence summary.
- Put key specs in visual chips near the hero, such as “Custom Temperature Range”, “High Vacuum”, “Multiple Heating Chambers”, and “Factory Direct”.
- Use tables for technical comparison, not long paragraphs.
- Add CTA bands after major proof sections, not only at the bottom.
- Use progressive disclosure for dense details: show summary first, then expandable details.

### 5.3 Navigation Patterns

Desktop navigation:

- Sticky top header after scroll with logo, product categories, applications, advantages, FAQ, and contact CTA.
- Mega menu for product categories if the full site has multiple product families.
- Active section highlighting using anchor links.

Mobile navigation:

- Top bar with logo, hamburger, and “Quote” button.
- Off-canvas drawer using `100dvh`, trap focus while open, close with Escape and overlay tap.
- Optional sticky bottom CTA with “Email”, “WhatsApp”, and “Quote” buttons.

Breadcrumbs:

Use schema-supported breadcrumbs near the top:

`Home > Vacuum Furnaces > Vacuum Sintering Furnace`

Wayfinding:

- Add “Back to top” after long technical sections.
- Use anchor links for “Types”, “Specifications”, “Applications”, “FAQ”, and “Inquiry”.
- Related products should clearly state they are sibling categories, not vacuum sintering furnace subtypes.

### 5.4 Feedback and Affordance

Loading states:

- Form submit button changes to “Sending...” with a spinner and disabled state.
- Use `aria-busy="true"` on the form region during submission.
- Gallery images can show low-quality placeholders or blurred dominant-color backgrounds.

Success state:

- Show message: “Thank you. Brother Furnace has received your request. Our engineer will review your process requirements and contact you soon.”
- Provide fallback email and phone/WhatsApp link.

Error state:

- Show inline field errors and a form-level summary.
- Preserve all user-entered form data.
- If network fails, show: “We could not submit the form. Please email your requirements to sales@example.com or try again.”

Micro-interactions:

- CTA hover: slight lift and orange shadow.
- Card hover: border color transitions to orange and image zooms to `scale(1.03)` over `400ms`.
- Accordion: rotate chevron `180deg`; keep animation under `220ms`.
- Do not animate technical tables in ways that delay reading.

### 5.5 Accessibility Checklist

Minimum target: WCAG 2.1 AA.

Required implementation:

- Use semantic landmarks: `header`, `nav`, `main`, `section`, `aside`, `footer`.
- One H1 only.
- Logical heading hierarchy without skipped levels.
- Descriptive link text, not “click here”.
- All images have meaningful `alt` text or empty `alt=""` if decorative.
- All form fields have visible labels.
- Error messages are connected with `aria-describedby`.
- Required fields use both visual indicator and `required` attribute.
- Color is never the only indicator of status.
- Focus visible on all interactive elements.
- Mobile drawer traps focus and restores focus to hamburger on close.
- Accordions use `button`, `aria-expanded`, and `aria-controls`.
- Avoid auto-playing videos; if used, provide controls, captions, and no sound by default.

Contrast targets:

- Body text: at least 4.5:1.
- Large text and icons: at least 3:1.
- Primary orange button should use dark text only if contrast is better; otherwise use white text and test actual ratio. `#ec6517` with white is acceptable for large/bold text but should be checked for smaller labels. A darker hover color such as `#c94f0f` improves contrast.

### 5.6 Forms and Input UX

Inquiry form fields:

1. Name.
2. Company.
3. Email.
4. WhatsApp/Phone.
5. Country/Region.
6. Material to be sintered.
7. Required temperature.
8. Work zone size or loading capacity.
9. Vacuum requirement.
10. Message / process requirements.
11. File upload for drawings or specifications, if backend supports it.

Input types:

- Email: `type="email"`, `autocomplete="email"`.
- Phone: `type="tel"`, `autocomplete="tel"`.
- Country: searchable select or text with `autocomplete="country-name"`.
- Numeric fields: use text input with helpful units if decimals/ranges are common; avoid restrictive number steppers for engineering values.

Validation rules:

- Validate on blur and submit, not on every keystroke.
- Do not block submission for optional technical details.
- Use inline examples: “Example: 1600°C, graphite heating chamber, work zone 300 × 300 × 300 mm”.
- Include privacy note near submit button.

### 5.7 Empty States and Edge Cases

Potential edge cases:

- No product image loaded: show neutral technical placeholder with product category name.
- Form API timeout: preserve data and show email fallback.
- User does not know exact specs: allow “Not sure yet” option.
- Very long country/company names: allow wrapping without breaking layout.
- Table overflow on 320px devices: convert to stacked cards or horizontal scroll with visible affordance.
- Translation expansion: leave 20 percent extra space in buttons and cards for future multilingual pages.

### 5.8 SEO and Content Requirements

Primary SEO focus:

- Main keyword: “vacuum sintering furnace”.
- Supporting keywords: “vacuum sintering furnace manufacturer”, “vacuum sintering oven”, “high temperature vacuum sintering furnace”, “graphite vacuum furnace”, “molybdenum heating vacuum furnace”, “vacuum furnace supplier”.

On-page SEO plan:

- Title tag under 60 characters, for example: “Vacuum Sintering Furnace Manufacturer | Brother Furnace”.
- Meta description around 150 to 160 characters, focused on custom vacuum sintering furnaces, factory supply, and quote CTA.
- Use descriptive URL: `/vacuum-sintering-furnace/`.
- Use Product, BreadcrumbList, Organization, and FAQPage structured data where valid.
- Add internal links to vacuum heat treatment furnace, vacuum brazing furnace, and vacuum induction melting furnace pages.
- Use original product photos with descriptive filenames.
- Avoid keyword stuffing; write naturally for engineers and buyers.

Suggested H1:

“Vacuum Sintering Furnace Manufacturer for Advanced Materials”

Suggested hero copy:

“Brother Furnace designs and manufactures custom vacuum sintering furnaces for powder metallurgy, ceramics, hard alloys, magnetic materials, and high-temperature material research. Choose from stainless steel chamber, ceramic fiber chamber, molybdenum strip, graphite, carbon tube, and tungsten wire heating systems.”

### 5.9 Related Products Module

Place the related products module after the main inquiry CTA and before the footer. It should be visually secondary but useful for visitors who need a different vacuum furnace type.

Recommended cards:

1. Vacuum Heat Treatment Furnace.
   - Includes vacuum quenching furnace, vacuum annealing furnace, vacuum tempering furnace, and vacuum normalizing furnace.
   - Mention vacuum gas quenching furnace and vacuum oil quenching furnace.
2. Vacuum Brazing Furnace.
   - Includes heat-resistant steel chamber brazing furnace, molybdenum strip chamber brazing furnace, and tool brazing furnace.
3. Vacuum Induction Melting Furnace.
   - Also called vacuum medium-frequency induction melting furnace.
   - Highlight medium-frequency induction heating.

Each related card should include a short description, ideal applications, and a “Learn More” link.

## 6. Technical Architecture

### 6.1 Recommended Tech Stack

Recommended stack: Astro with TypeScript, component-based islands, and CSS Modules or scoped component CSS.

Reasoning:

- Static generation provides excellent SEO and Core Web Vitals.
- Astro ships zero JavaScript by default and hydrates only interactive islands.
- TypeScript improves maintainability for component props and structured data.
- The page is primarily content and conversion oriented, so a full SPA framework is unnecessary.
- Astro can integrate React only for interactive components if needed, such as a complex quote configurator.

Recommended supporting tools:

- Package manager: `pnpm`.
- Styling: CSS Modules or Astro scoped styles with global design tokens.
- Validation: Zod for form schema if using an API endpoint.
- Forms: serverless endpoint, CRM webhook, or static form provider.
- Images: Astro Image or a CDN pipeline with AVIF/WebP generation.
- Icons: Font Awesome SVG imports or local optimized SVG sprite.
- Analytics: privacy-conscious analytics plus conversion events for quote submissions.

### 6.2 Component Architecture

Use an atomic-inspired structure but keep naming practical for marketing pages.

```text
src/
  components/
    atoms/
      Button.astro
      Icon.astro
      SectionLabel.astro
      SpecChip.astro
    molecules/
      ProductTypeCard.astro
      FeatureCard.astro
      StatCard.astro
      FAQItem.astro
      InquiryField.astro
    organisms/
      SiteHeader.astro
      MobileNav.astro
      HeroVacuumSintering.astro
      TrustBar.astro
      FurnaceTypeGrid.astro
      TechnicalSpecTable.astro
      ApplicationGrid.astro
      SelectionGuide.astro
      FactoryCapability.astro
      InquiryForm.astro
      RelatedProducts.astro
      SiteFooter.astro
  data/
    vacuum-sintering-furnace.ts
    related-products.ts
    seo.ts
  layouts/
    BaseLayout.astro
    ProductLayout.astro
  pages/
    vacuum-sintering-furnace.astro
  styles/
    tokens.css
    global.css
    utilities.css
```

Component naming:

- Component files use descriptive names.
- CSS classes inside the page use the `zksjl-` prefix.
- Shared global utilities can use a separate prefix such as `u-`, but product-specific classes must remain `zksjl-`.

### 6.3 Theming System

Implement theme tokens with CSS variables:

- Global tokens in `tokens.css`.
- Semantic aliases such as `--zksjl-surface`, `--zksjl-text`, and `--zksjl-border`.
- Use `prefers-color-scheme` for automatic dark mode only if dark mode is fully tested.
- Provide manual override via `[data-theme="dark"]` if the full site supports it.

Recommended default: light mode. Dark mode can be supported but should not be the first launch priority because industrial product photos and technical tables are easier to evaluate in a clean light interface.

### 6.4 CSS Strategy

Recommended CSS approach: scoped component CSS plus global tokens.

Rules:

- Keep tokens global.
- Keep component layout styles next to components.
- Avoid deeply nested selectors beyond two levels.
- Avoid ID selectors for styling.
- Avoid `!important` except for reduced-motion override utilities.
- Use logical properties: `margin-inline`, `padding-block`, `border-inline-start`.
- Use container queries for reusable cards where practical.

Example:

```css
.zksjl-type-card {
  display: grid;
  gap: var(--zksjl-space-4);
  padding: clamp(20px, 3vw, 32px);
  border: 1px solid var(--zksjl-color-graphite-200);
  border-radius: var(--zksjl-radius-lg);
  background: var(--zksjl-color-surface);
}

@container (min-width: 420px) {
  .zksjl-type-card {
    grid-template-columns: auto 1fr;
  }
}
```

### 6.5 Data and Content Modeling

Store product types and specs as structured data to keep the page maintainable.

Example data model:

```ts
export const sinteringFurnaceTypes = [
  {
    name: 'Vacuum Stainless Steel Chamber Sintering Furnace',
    slug: 'stainless-steel-chamber',
    bestFor: ['Lower-temperature sintering', 'Clean chamber requirements'],
    heatingSystem: 'Resistance heating with stainless steel chamber design',
    summary: 'Suitable for processes requiring clean construction and controlled vacuum atmosphere.'
  }
];
```

This enables:

- Consistent card rendering.
- Automatic structured data generation.
- Easier future translation.
- Easier page expansion for each product subtype.

### 6.6 Testing Strategy

Automated checks:

- Unit/component tests with Vitest for data helpers and validation logic.
- Playwright end-to-end tests for navigation, inquiry form, mobile menu, accordions, and CTA links.
- Axe accessibility tests in Playwright.
- Lighthouse CI for performance, SEO, accessibility, and best practices.
- Visual regression testing with Playwright screenshots at key breakpoints.

Manual device matrix:

| Device / Width | Must Test |
|---|---|
| 320px | Small mobile, no horizontal overflow, CTA usability. |
| 375px | iPhone common width, hero and form layout. |
| 390px / 430px | Modern iPhones, safe-area bottom CTA. |
| 768px | Tablet portrait, two-column layouts. |
| 1024px | Tablet landscape/small laptop, desktop nav transition. |
| 1280px | Standard laptop, full content layout. |
| 1440px | Large desktop, max-width behavior. |
| 1920px | Wide monitor, no stretched content or oversized imagery. |

Browsers:

- Chrome latest.
- Safari iOS latest and previous major where possible.
- Safari macOS.
- Firefox latest.
- Edge latest.

Network/device profiles:

- Fast 4G mobile.
- Slow 4G mobile.
- Desktop broadband.
- CPU throttling at 4× in Lighthouse.

## 7. Phased Rollout Plan

### Phase 1: MVP Foundation

Goal: launch a complete SEO-ready and conversion-ready page.

Deliverables:

1. Finalize English content outline and keyword map.
2. Build global tokens, base layout, header, footer, and responsive grid.
3. Implement hero, trust bar, sintering furnace type grid, technical advantages, specifications, applications, FAQ, inquiry form, and related products.
4. Add metadata, canonical URL, Open Graph, Product schema, Organization schema, BreadcrumbList schema, and FAQPage schema.
5. Optimize hero image and all above-the-fold assets.
6. Ensure no horizontal overflow at 320px.
7. Add basic analytics and quote form conversion event.

Acceptance criteria:

- Lighthouse mobile scores: Performance above 90, Accessibility above 95, SEO above 95, Best Practices above 95.
- LCP under 2.5s on simulated mobile.
- Inquiry form can be submitted or gracefully falls back.
- All product structure provided by Brother Furnace is represented clearly.

### Phase 2: UX Polish and Trust Building

Goal: improve buyer confidence and scan efficiency.

Deliverables:

1. Add real factory process timeline.
2. Add downloadable specification sheet or “Request technical proposal” CTA.
3. Add product image gallery with optimized lazy loading.
4. Add application-specific cards for powder metallurgy, ceramics, hard alloys, magnetic materials, and R&D labs.
5. Add comparison table for chamber/heating element selection.
6. Add sticky section navigation on desktop.
7. Add micro-interactions and reduced-motion handling.

Acceptance criteria:

- Users can identify the right furnace type within 60 seconds.
- Quote CTA appears in the hero, mid-page, and bottom form.
- Technical table is usable on 320px mobile without broken layout.

### Phase 3: Optimization and Growth

Goal: improve rankings, conversion rate, and maintainability.

Deliverables:

1. A/B test hero CTA wording: “Request a Quote” versus “Get Technical Proposal”.
2. Add case studies or project examples if customer confidentiality allows.
3. Add multilingual architecture for future Chinese, Spanish, Russian, or Arabic pages.
4. Add CRM integration and lead quality tagging based on selected furnace requirements.
5. Add heatmap or behavior analytics, respecting privacy laws.
6. Build separate detail pages for each vacuum sintering furnace subtype if search volume justifies it.
7. Add internal linking modules between all vacuum furnace categories.

Acceptance criteria:

- Conversion tracking captures CTA clicks, form starts, form submissions, and fallback email/WhatsApp clicks.
- Organic landing page impressions and inquiries are reviewed monthly.
- No regression in Core Web Vitals after adding new content.

## 8. Quality Checklist

### 8.1 Responsive and Layout QA

- Verify layouts at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920px.
- Confirm no horizontal scrolling except intentional technical table scroll areas.
- Confirm sticky mobile CTA does not cover form fields or footer content.
- Confirm off-canvas menu respects safe areas and dynamic viewport changes.
- Confirm cards maintain equal visual rhythm without forcing equal heights that create awkward whitespace.
- Confirm hero image art direction works on mobile and desktop.

### 8.2 Performance QA

- Run Lighthouse mobile and desktop.
- Run WebPageTest or equivalent for real network diagnostics.
- Confirm LCP element is the intended hero heading or hero image and loads with priority.
- Confirm CLS remains below 0.1 after images, fonts, forms, and banners load.
- Confirm JavaScript is not blocking initial rendering.
- Confirm third-party scripts are deferred and audited.
- Confirm image payload is appropriate: hero ideally under 250KB AVIF for mobile and under 500KB for desktop unless visual quality requires more.

### 8.3 SEO QA

- One H1 only.
- Title and meta description are unique and within recommended lengths.
- Canonical URL is present.
- Breadcrumbs are visible and structured data is valid.
- Product and FAQ structured data pass validation.
- Image filenames and alt text describe real products.
- Internal links point to related vacuum furnace categories.
- Content avoids keyword stuffing and clearly answers buyer questions.

### 8.4 Accessibility QA

- Run automated axe checks.
- Navigate the entire page using keyboard only.
- Test screen reader labels for navigation, accordions, form fields, and error states.
- Confirm focus is trapped in mobile drawer and restored after close.
- Confirm all text and UI components meet contrast requirements.
- Confirm reduced-motion mode disables nonessential animation.
- Confirm form errors are announced and connected to fields.

### 8.5 Form and Conversion QA

- Submit with valid data.
- Submit with missing required fields.
- Submit with invalid email.
- Submit with slow network.
- Submit with API failure.
- Confirm entered data is preserved after validation errors.
- Confirm fallback contact methods are visible.
- Confirm conversion events fire once and do not double-count.

### 8.6 Content Accuracy QA

- Confirm vacuum sintering furnace is the primary focus.
- Confirm all listed sintering furnace types are included:
  - Vacuum stainless steel chamber sintering furnace.
  - Vacuum ceramic fiber chamber sintering furnace.
  - Vacuum molybdenum strip chamber sintering furnace.
  - Vacuum graphite carbon tube furnace.
  - Vacuum graphite furnace.
  - Vacuum tungsten wire furnace.
- Confirm related products include:
  - Vacuum heat treatment furnace.
  - Vacuum brazing furnace.
  - Vacuum medium-frequency induction melting furnace.
- Confirm vacuum heat treatment furnace subtypes include quenching, annealing, tempering, normalizing, gas quenching, and oil quenching.
- Confirm vacuum brazing furnace subtypes include heat-resistant steel chamber, molybdenum strip chamber, and tool brazing furnace.
- Confirm the induction melting furnace is described as medium-frequency induction heating.

### 8.7 Common Pitfalls to Avoid

- Do not use a heavy homepage carousel for the hero; it usually hurts LCP and hides key messaging.
- Do not make the site visually impressive but technically vague; B2B buyers need specifications, materials, and process fit.
- Do not hide the inquiry form only at the bottom; repeat CTAs throughout the page.
- Do not make tables unreadable on mobile; use stacked cards when necessary.
- Do not use hover-only menus or hover-only product details.
- Do not ship the full Font Awesome font if only a handful of icons are used.
- Do not use unverified AI-generated furnace images as evidence of manufacturing capability.
- Do not let sticky bars overlap content on notched devices.
- Do not overload the page with JavaScript animations that reduce INP.
- Do not optimize only desktop; many first visits and follow-up checks happen on mobile.
