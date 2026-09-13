# jmellolicsw.com — publication-readiness audit

Repository: https://github.com/chrisfolmar/jmellolicsw

Reviewed commit: `cbfc76799a8b5cac2be908dd2e0a45ea72b5839c` (main, confirmed through GitHub). Audit date: September 7, 2026.

## A. Publication verdict

**Ready after targeted fixes.** The existing architecture is appropriate and does not need a rewrite. However, I would not sign off on publication of this commit today. Contact notifications are not dependable, accessibility defects exist in shared controls, and the operational handling of inquiries needs a defined owner and verification. Testimonials and business policies also need client approval before being represented as facts.

This is a code-backed verdict with limited runtime verification, not certification of the deployed website. Successful database persistence, real email delivery, deployment configuration, and mobile/desktop browser behavior remain unverified. Those are release gates even after the identified fixes.

### Context and architecture

This is a therapy-practice marketing website for prospective adolescent/adult clients and existing clients in Massachusetts. Its primary conversion is a consultation inquiry; secondary journeys are telephone/email contact, reviewing services and fees, and accessing external SimplePractice/Doxy.me portals. There is no local patient login, payment flow, scheduling engine, or CMS.

React 18 and TypeScript render seven content routes in a Vite client-side application. Wouter handles navigation; Tailwind and shadcn/Radix components provide styling and controls; Framer Motion supplies animations. Express 5 serves the built client and one contact API. PostgreSQL stores inquiries through Drizzle. Resend sends notifications. Optional Google Analytics is enabled by a build-time environment variable. Replit autoscaling is the declared deployment target.

Representative interaction: contact form → React Hook Form/shared Zod validation → React Query mutation → POST /api/contact → IP limiter → server validation → PostgreSQL insert → two unawaited email operations → HTTP 201 → form replaced with success copy. The response proves only that the insert returned successfully, not that the practice received a notification.

The existing checkout was clean, matched GitHub main, and remained clean after checks. No AGENTS.md was found outside dependencies. No tracked application tests or GitHub Actions workflows were found. No refactors, dependency changes, production submissions, database migrations, or deployments were performed.

## B. Graded scorecard

Scores describe inspected implementation, with verification limits incorporated; they are not averaged into a release decision.

| Area | Grade / 5 | Confidence | Rationale |
|---|---:|---|---|
| Functionality and content | 3 | High for code; low for delivery | Complete page/journey structure, but notification failures and unapproved content claims remain. |
| Code quality and maintainability | 4 | High | Direct data flow, small backend modules, strict TypeScript. Repeated business facts and scaffold dependencies are manageable. |
| Architecture and dependencies | 3 | Medium | Suitable stack; known dependency alerts require exposure triage and targeted updates. |
| Accessibility implementation | 2 | High for source defects | Insufficient button contrast, nested interactive controls, zoom restriction, incomplete menu semantics. |
| Visual polish and responsive behavior | Not verified | Low | Browser could not reach local site; no defensible visual grade. |
| Performance and SEO | 3 | Medium | Moderate bundle, client-only metadata, soft 404s; no measured Core Web Vitals. |
| Security and privacy | 2 | Medium | Validation and Helmet exist, but inquiry handling, privacy claims, and delivery logging need correction. No demonstrated compromise. |
| Testing, deployment and handoff | 2 | High for repository; low for hosting | Build/type check work; no regression suite or CI; setup and operations documentation incomplete. |
| **Overall** | **3** | **Medium** | A viable client website needing bounded release work. Contact delivery and privacy handling prevent signoff regardless of other strengths. |

## C. Prioritized findings

Paths and line references below are relative to the reviewed commit.

### F01 — Contact notification failures can be reported as success

**High; blocks publication. Verified code defect; actual account configuration unknown.**

Evidence: `server/email.ts:5,31–54,70–99` hardcodes `onboarding@resend.dev`, ignores the result of `emails.send`, logs “sent,” and includes recipient email addresses in logs. The installed SDK returns an error object on unsuccessful responses (`node_modules/resend/dist/index.mjs:1076–1118`). `server/routes.ts:29–34` launches both sends without awaiting them; no delivery status or retry exists. Missing RESEND_API_KEY simply skips mail. Storage exposes only insertion (`server/storage.ts:4–16`), with no documented practice retrieval workflow.

Resend's testing domain can only send to the account owner's address; arbitrary visitor replies require a verified sender domain. [Resend official guidance](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

Impact: the practice can miss a saved inquiry while the visitor sees success. An autoscaling instance may stop before outstanding work completes; that is an additional inferred risk, not an observed event.

Fix: configure a verified sender; explicitly inspect provider results; record notification status against the persisted inquiry; provide a small retry/reconciliation procedure and an accountable operator. Await an initial bounded attempt or use an existing reliable host job facility. Do not add Redis or a general queue framework solely for this form. Log submission ID/provider ID and sanitized failure category instead of email addresses. Auto-reply failure must not erase a saved inquiry or tell visitors to submit it again.

Acceptance: controlled tests cover accepted send, returned provider error, rejected promise, missing config, timeout, database failure, and restart recovery. Each persisted inquiry remains discoverable and unresolved delivery is visible. Authorized staging delivery is confirmed in a controlled mailbox, separately from provider acceptance. Effort: 1–2 engineering days plus DNS/provider verification time.

### F02 — Inquiry privacy promises are not backed by a demonstrated operating process

**High; blocks publication until resolved. Verified implementation mismatch; operational controls unknown.**

Evidence: `client/src/pages/contact.tsx:303,329–332` invites open-ended details and promises confidentiality without the sensitive-information warning present only at `pages/privacy.tsx:115`. Full inquiry content is sent by email (`server/email.ts:35–49`). `pages/privacy.tsx:122` promises deletion when no longer needed; the repository supplies no retention/deletion workflow. `pages/privacy.tsx:90` categorically denies tracking cookies, but `components/analytics.tsx:28–44` enables Google Analytics whenever configured. Whether analytics is enabled in production is unknown.

Impact: visitors can disclose sensitive material to a channel whose access, retention, and processors have not been established by this audit. This is not a determination that HIPAA applies or that the practice violates law.

Fix: put a concise inquiry-only warning and secure-portal link directly beside the form, clarify expected response time and urgent-contact alternatives, minimize emailed content, and document database/mail/log access and deletion responsibilities. Keep optional analytics off until its behavior and privacy wording are approved. Have the practice approve clinical/privacy statements; do not infer compliance from provider names.

Acceptance: actual data destinations and retention process match the published policy; an owner demonstrates retrieval and deletion using synthetic data; contact warnings appear before submission. Effort: 0.5–1.5 days, dependent on client/provider decisions; coordinate data changes with F01.

### F03 — Testimonials and business claims need provenance and approval

**High; conditional publication blocker. Content exists; authenticity is unverified, not alleged false.**

Evidence: `client/src/pages/home.tsx:311–395` presents three attributed client quotations with five stars. No approval/source evidence was supplied. `pages/services.tsx:186–206` publishes $200 fees, while `pages/faq.tsx:31–34` says fees are discussed during consultation. FAQ also asserts cancellation, consultation length, and sliding-scale policies.

Impact: a paying client's site must not publish invented endorsements or unconfirmed policies. Fee copy is inconsistent in specificity, not necessarily contradictory.

Fix: obtain client-approved source/permission records for testimonials or remove the section; confirm rates, hours, policies, credentials, image rights, and portal destinations. Synchronize fee copy. Do not put private testimonial consent records into this public repository.

Acceptance: each claim has client approval; unverifiable testimonials are absent; fees/policies agree across pages. Effort: 1–3 hours editing plus client review.

### F04 — Shared accessibility defects affect conversion controls

**High; blocks accessibility signoff. Verified source/calculation findings; rendered behavior unverified.**

Evidence: `client/src/index.css:113–114` pairs white text with HSL(152,35%,50%): calculated contrast **2.76:1**. Default buttons use this pairing (`components/ui/button.tsx:14–15`). Normal text requires 4.5:1. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum).

`client/index.html:5` sets maximum-scale=1. `components/navigation.tsx:248–260` wraps a native Button in an anchor; similar patterns appear in home and other page CTAs. `navigation.tsx:200–209` declares menu/menuitem roles without corresponding desktop menu keyboard behavior. Mobile code does include Escape, focus trapping, and focus restoration, which should be preserved. Contact success (`pages/contact.tsx:224–251`) lacks explicit status announcement/focus management.

Fix: adjust primary foreground/background tokens in both themes; remove the zoom cap; use Button's existing asChild support for links; use a plain disclosure with normal links for Current Clients or the existing Radix dropdown implementation. Announce contact completion. Respect reduced motion, including the infinite home scroll indicator (`pages/home.tsx:119–131`).

Acceptance: normal button text ≥4.5:1 in both themes; 200% text zoom and narrow-screen reflow work; one focus target per CTA; keyboard-only navigation opens/closes cleanly; success announced; reduced-motion preference honored. Manual mobile/desktop and automated accessibility checks required. Effort: 0.5–1 day plus browser QA.

### F05 — Proxy-sensitive rate limiting and loose field boundaries

**Medium; deployed limiter verification is a release gate. Code verified; proxy failure suspected.**

Evidence: `server/routes.ts:9–15` uses five requests/hour and the default memory store; `server/index.ts` does not set trust proxy. Replit autoscale is declared in `.replit`. `shared/schema.ts:21–24` lacks trimming and maximum lengths; whitespace passes name/message minimum checks. `pages/contact.tsx:83–89` replaces all server errors, including 429, with a generic retry message.

Impact: depending on proxy topology, users may share a limiter bucket; multiple instances do not share counts. Form noise, oversized fields within the parser limit, and repeated user retries waste attention. The JSON parser still has its default body limit; the request is not unlimited.

Fix: verify actual forwarding topology and narrowly configure trust; never blindly trust all forwarding headers. Use hosting-edge limits or a shared store only if deployment behavior requires it. Add client/server trim and sensible field limits, and preserve clear 429 feedback.

Acceptance: distinct simulated client IPs behave independently through staging proxy; forged headers cannot evade control; sixth request is rejected; whitespace and oversized fields get 400; submitted content survives retryable UI errors. Effort: 0.5 day, potentially longer for host configuration.

### F06 — Unknown paths return successful HTML, and route metadata depends on JavaScript

**Medium; fix status behavior before publication; improve metadata soon after.**

Evidence: `server/static.ts:13–18` serves index.html for every unmatched path. Local GET `/does-not-exist` and `/api/missing` both returned 200 text/html. `pages/not-found.tsx:9–13` lacks noIndex and canonicalizes to /404. `client/index.html` contains generic title/description but no route-specific OG/canonical tags; those are inserted by `components/seo.tsx` after JavaScript executes.

Impact: misleading monitoring/API responses and soft 404s; social consumers that do not execute JavaScript lack route-specific previews. Search indexing failure is not established.

Fix: separate API 404 JSON, known SPA routes, and unknown-page 404 handling. Add noindex for unknown pages. Consider build-time prerendering for these fixed marketing pages to deliver content/metadata; no framework migration needed. Correct robots disallow/noindex interaction for privacy if exclusion is intended.

Acceptance: known deep links return 200 and load; unknown pages return 404; unknown API returns JSON 404; missing assets do not receive successful HTML. Inspect raw HTML and actual social previews after metadata work. Effort: 2–4 hours for routing; 0.5–1.5 days for prerendering.

### F07 — Release and handoff lack repeatable gates

**High; blocks dependable client handoff. Verified repository gaps; hosting controls unknown.**

Evidence: `package.json:6–12` has build/check but no test/lint scripts; no tracked tests or GitHub workflow found. README omits RESEND_API_KEY and sender setup, recommends unused SESSION_SECRET, and describes Express 4 while installed code uses Express 5. `.replit` defines build/run but not inquiry recovery, backup restoration, or rollback. No migration history was found; db:push exists.

Fix: add focused contact integration tests and route/accessibility smoke coverage, CI for clean lockfile install/typecheck/build/tests, and a concise deployment/handoff runbook. Pin a tested runtime; document required server versus public build variables. Use reviewed migrations for production schema changes and test restore/rollback. No arbitrary coverage percentage or large testing framework is needed.

Acceptance: a second developer can build a clean checkout, configure staging, apply schema safely, verify an inquiry, locate sanitized errors, and restore the prior release. Effort: 1–2 days, partially overlapping F01/F04 tests.

### F08 — Dependency alerts need targeted exposure triage

**Medium; triage before publication; no proven exploitable path established.**

Evidence: executed npm audit returned **18 affected package entries: 13 high, 2 moderate, 3 low, 0 critical**. This is not 18 distinct exploitable vulnerabilities. Alerts include Drizzle, path-to-regexp, Vite, Rollup, ws and build tooling.

Initial source assessment: this app uses static Drizzle identifiers and parameterized values, not user-controlled identifiers implicated by its alert. Express routes do not contain the multiple wildcard/sequential optional patterns described by the routing alerts. Production takes the static-server branch rather than Vite middleware. No application WebSocket endpoint was found. These observations reduce apparent exposure but do not replace full advisory review.

Fix: review affected paths against current advisories and lockfile, prioritize compatible security patches, rerun functional checks, and document any deferred alert. Avoid npm audit fix --force and broad upgrades. Effort: 0.5–1 day; compatibility uncertainty remains.

### F09 — Frontend payload and repeated configuration offer modest cleanup opportunities

**Low; not a publication blocker without adverse measurements.**

Evidence: build produces a single **591.23 kB JS / 182.96 kB gzip** chunk and **92.35 kB CSS / 14.56 kB gzip**. App.tsx eagerly imports all routes. Photos are roughly 112–280 KiB each; several lack loading/dimension attributes. Shared validation imports database schema into the frontend graph. Contact details and portal URLs recur across navigation, footer, SEO, contact and email. Package manifest includes unused-looking authentication/session scaffolding.

Fix: measure first; lazy-load secondary pages where useful, reserve image dimensions and lazy-load below-fold images, extract plain contact validation from database table definitions if bundle analysis supports it, and centralize public practice facts. Remove dependencies only after usage verification. Keep server secrets outside shared/client config.

Acceptance: no broken deep links or layout shifts from changes; before/after build measurements and a throttled mobile trace demonstrate value. Effort: 0.5–1 day. Do not introduce a CMS, global state system, generic repository layer, or design-system rewrite.

## D. Refactor plan

| Order | Scope and intended change | Preserve | Verification / dependencies | Effort |
|---|---|---|---|---|
| Before publication 1 | F01: email.ts, routes.ts, schema/storage; explicit provider result, configurable sender, recorded status and recovery | Persist-first semantics, visitor form values on failure | Synthetic failure/recovery tests; controlled staging delivery; verified sender | 1–2 days |
| Before publication 2 | F02/F03: contact/privacy/home/FAQ/services and runbook; accurate disclosures and approved content | Brand voice, valid rates, secure portal access | Client approval and data-flow/retention demonstration; coordinates with step 1 | 0.5–1.5 days plus approval |
| Before publication 3 | F04: CSS, HTML viewport, navigation and CTA composition | Sage/cream identity, dark mode, mobile focus restoration | Contrast, zoom, keyboard, status announcements, mobile/desktop QA | 0.5–1 day |
| Before publication 4 | F05/F06: validation, limiter configuration, static handler, NotFound | Valid form payloads and known deep links | Local API tests and staging proxy verification | 0.5–1 day |
| Before publication 5 | F08/F07: lockfile triage, focused CI/tests, setup/deploy/rollback documentation | Existing stack and deterministic install | Clean staging build, restore drill, all prior acceptance criteria | 1–2 days plus patch uncertainty |
| Soon after | F06/F09: route HTML/metadata, measured image and chunk optimization, shared practice facts | URLs, content, metadata intent, visual design | Raw HTML/social preview check; measured before/after mobile loading | 1–2 days |
| Defer | Remove proven unused UI/dependencies; optional minor page extraction | Working components and familiar conventions | Build/typecheck and affected journey smoke test | As justified |

Combined release work is roughly **4–7 focused engineering days**, with overlap between tasks; client review, DNS verification, and hosting access can extend elapsed time. This is an estimate, not a fixed quote.

Keep the existing module structure. If notification status is persisted, add only fields such as delivery state, attempt timestamp, and provider reference to the existing inquiry model, with one focused email-result helper. A separate outbox is warranted only if the chosen reliable retry mechanism needs it. No major structural refactor is recommended.

Migration/rollback: use additive nullable/defaulted fields compatible with the old application, snapshot staging/production as appropriate, test forward migration on synthetic data, and deploy compatible code after schema. Roll back application artifact without dropping inquiry records or delivery state. Keep sender configuration and mail recovery instructions versioned in the runbook, with secrets stored in the hosting secret manager. For dependency changes, retain the previous lockfile and build artifact.

## E. Release checklist and verification ledger

| Status | Check / result | Remaining action |
|---|---|---|
| Completed | GitHub main SHA matched clean local checkout | Recheck release SHA after fixes |
| Completed | npm run check exited 0 | Add to CI |
| Environment-blocked, alternative passed | npm run build hit tsx IPC EPERM; node --import tsx script/build.ts exited 0 | Verify documented npm command on target runtime |
| Completed | Production entry point started with isolated local config | Verify actual hosting environment separately |
| Completed | Empty POST /api/contact returned 400 | Add boundary/429 tests |
| Completed | Synthetic valid request with deliberately unavailable local DB returned generic 500 | Successful insert remains unverified |
| Failed | Unknown page and unknown API returned 200 HTML | Implement F06 |
| Failed | Dark primary/white contrast calculated 2.76:1 | Implement F04 and assess both themes |
| Completed with findings | npm audit exited 1, 18 package entries flagged | Triage and patch F08 |
| Unverified | Fresh npm ci and exact target Node version | Run in clean CI; current tests used pre-existing dependencies and Node 24.19.0 |
| Unverified | Desktop/mobile visual layout, keyboard journeys, console/network errors, screen-reader behavior | Browser returned ERR_BLOCKED_BY_CLIENT for localhost; test accessible staging at 390/768/1440 widths and 200% zoom |
| Unverified | Successful database persistence and actual recipient delivery | Controlled staging DB/mailbox; verify record and delivery separately |
| Unverified | Rate limiting through proxy/multiple instances | F05 staging tests |
| Unverified | Live-domain build parity, TLS/redirects, external portal/resource links | Read-only production smoke checks; no patient login or real submissions |
| Unverified | Client content, endorsement permissions, data retention, service ownership | F02/F03 signoff |
| Unverified | Lab performance and real-user metrics | Run Lighthouse/mobile trace and inspect available field data; no scores claimed |
| Unverified | Production backup restore, alerting, rollback and schema state | Demonstrate documented staging recovery |

No lint/test command was available to execute. No real inquiry was submitted, no email was sent, and no production database was accessed. Build warnings about Browserslist age, PostCSS source attribution, and chunk size were observed; none alone demonstrates a broken release.

## F. What to preserve

- The React/Express/PostgreSQL stack and straightforward separation of routes, persistence, and email.
- Shared validation intent, strict TypeScript, server-side validation, and ORM value parameterization.
- Disabled submit button while pending, generic database-error response, and clear telephone alternative.
- Existing semantic main landmark, skip link, labeled form primitives, mobile focus handling, and FAQ disclosure relationships.
- Separate public website and external client-care portals; do not build patient authentication into this project.
- Existing theme tokens, page layouts, local images, and warm editorial tone, subject to browser verification and contrast fixes.
- Existing lockfile and production bundling; refine the release process instead of replacing it.

## G. Recommended first change

**Make contact notifications observable and recoverable (F01).** This is the highest-value change because consultation inquiries are the site's main business outcome.

Exact scope: server/email.ts, server/routes.ts, minimal additive notification fields/storage methods if used, focused integration tests, and sender/recovery configuration documentation. Configure the verified sender, inspect returned provider errors, record each persisted inquiry's notification outcome, and make failed work recoverable without requiring another visitor submission. Preserve the existing endpoint and form payload. Do not redesign the website or replace the stack in this change.

Done means: synthetic success, error, timeout, missing-key and database-failure cases behave predictably; restart recovery is demonstrated; logs contain IDs rather than inquiry content; a controlled staging inquiry is both persisted and delivered to the intended test mailbox. Provider acceptance alone is not proof of inbox delivery.

Self-review: source defects, operational uncertainties, and unavailable browser checks are distinguished; dependency alert totals are not presented as exploit counts; no legal compliance verdict or unsupported visual grade is asserted; recommendations favor bounded changes and consolidate shared causes.
