# SEO implementation and launch checks

## Implemented in the website

- Unique page canonicals, titles, descriptions and complete Open Graph/Twitter metadata for all five pages.
- A 1200 × 630 PNG sharing card generated at `/opengraph-image` with no external image-generation service.
- Shared owner-confirmed school details in `src/lib/site.ts`; no invented PIN code or social profile URLs.
- `Preschool` and `WebSite` structured data with stable identifiers. Breadcrumb navigation and its markup are omitted to keep the page headers clean. Self-review aggregate rating markup is excluded; visible school statistics remain.
- A sitemap containing the canonical pages without generated modification dates. Use real content update dates if these are added later.
- Clearer local service wording on the homepage and useful program questions based on existing school content.
- Important content visible in the initial HTML, reduced-motion preferences, a skip link, and hero image preloading.

## Validate locally

Build and start a production server in two terminals:

```powershell
cd C:\SSV
npm.cmd test
npm.cmd run lint
npm.cmd run build
npm.cmd run start -- -p 3100
```

```powershell
cd C:\SSV
node scripts/check-seo.mjs http://localhost:3100
```

Or use `npm.cmd run check:seo -- http://localhost:3100`. The checker reads the actual rendered HTML and image response. It verifies unique titles/descriptions, per-page canonical URLs, social metadata and dimensions, structured data, headings, sitemap, robots and a real 404. It does not submit an enquiry or contact Google Sheets.

## Local mobile and performance audit — 28 September 2026

Tested the production build with headless Chrome at `http://localhost:3100`.

- All five pages: 320 × 568 and 390 × 844 viewports, no horizontal overflow or breadcrumb navigation, no browser JavaScript errors.
- Checked mobile form field bounds, program cards, menu navigation at both portrait sizes and 667 × 375 landscape, and the homepage at 1440 × 900.
- Verified keyboard skip-link focus, the reduced-motion preference, and homepage heading/header visibility without JavaScript. These checks are not a complete accessibility audit or physical-device test.
- Fixed header contrast, low-contrast body/label text, narrow program-card padding and short-screen menu scrolling. Optimized responsive image selection/compression and preloaded the first Programs image.

Latest Lighthouse mobile lab run (default simulated throttling):

| Page | Performance | Accessibility | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 90 | 100 | 100 | 3.6 s | 60 ms | 0 |
| Programs | 97 | 100 | 100 | 2.4 s | 70 ms | 0 |
| Contact | 95 | 100 | 100 | 2.8 s | 140 ms | 0.001 |

Scores vary between runs: the preceding run scored 86/93/93 for performance. These are local lab measurements, not production Core Web Vitals or INP measurements. Home and Contact LCP still exceed the 2.5-second target in this run. Remaining opportunities include initial JavaScript work and image delivery; verify against deployed hosting before deciding the next optimization. Lighthouse scores do not guarantee rankings or complete accessibility.

The final build, ESLint, all 12 enquiry tests and rendered-page SEO checker passed. The checker also rejects leftover breadcrumb navigation and BreadcrumbList markup.

## Deployment checklist

1. Run `node scripts/check-seo.mjs https://www.sairamsanskruthividhyalaya.com` against the live deployment.
2. In Google Search Console, use the existing verified property (or finish verification), submit `https://www.sairamsanskruthividhyalaya.com/sitemap.xml`, then inspect the homepage, About, Programs, Gallery and Contact URLs. Check the user-declared and Google-selected canonical URLs; request indexing of important updated pages. The metadata verification token is preserved.
3. Validate the deployed URLs using Google Rich Results Test and Schema.org Validator. A valid Preschool entity does not guarantee a Google rich result. No FAQ rich-result eligibility is claimed for the program questions.
4. Verify the existing Google Business Profile and keep its business name, address, phone, hours and website consistent with the site. Profile access and verification are account actions, not code changes.
5. Run mobile PageSpeed Insights for Home, Programs and Contact. Check LCP, INP and CLS; test keyboard navigation, reduced motion, and the site with JavaScript disabled. No unmeasured performance score or ranking improvement is claimed.
6. Review Search Console impressions, clicks, indexed pages and relevant local searches over time. Compare equivalent periods rather than treating short-term changes as proof of ranking gains.

## Analytics and future content

No GA4 measurement ID or analytics account was supplied. Do not insert a made-up identifier. Once an actual property is available, add page-view measurement and an enquiry conversion triggered only by a verified `SAVED` result. Never send parent/child names, phone, email, message, or receipt into analytics.

Individual program pages should be added only when useful, distinct content is ready; avoid duplicating the current overview into thin pages. Keep admissions dates, timings and school information current. The Google Sheets endpoint and its credential requirements are unchanged by this SEO work.
