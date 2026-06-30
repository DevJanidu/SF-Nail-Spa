# Software Requirements Specification (SRS)
## SF Nail Spa — Business Website

**Document Version:** 1.0
**Date:** June 30, 2026
**Prepared For:** SF Nail Spa, 1324 Noriega Street, San Francisco, CA 94122
**Status:** Draft for Review

---

## 1. Introduction

### 1.1 Purpose
This document specifies the functional and non-functional requirements for the design and development of the SF Nail Spa business website. It is intended to guide designers, developers, content writers, and stakeholders through the full build, ensuring the final product reflects the salon's brand, services, and business goals as outlined in the source business profile document.

### 1.2 Scope
The website will serve as the primary online presence for SF Nail Spa, a nail and beauty salon located in the Outer Sunset neighborhood of San Francisco. The site will:

- Present the salon's brand, services, pricing, and location to prospective and existing customers.
- Allow visitors to browse services, view a nail art gallery, read testimonials, and find business hours and contact details.
- Provide a path to book an appointment (either via an embedded booking widget/third-party scheduler or a request-to-book contact form, pending stakeholder decision — see Open Issues in Section 9).
- Be optimized for local search visibility (SEO) in the San Francisco / Outer Sunset market.
- Be fully responsive across desktop, tablet, and mobile devices.

Out of scope for v1.0: e-commerce/gift card sales, customer account login/loyalty program, multi-location support, and native mobile apps.

### 1.3 Intended Audience
- Project stakeholders / salon owner(s)
- UI/UX designers
- Front-end and back-end developers
- Content writers / SEO specialists
- QA testers

### 1.4 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|---|---|
| SRS | Software Requirements Specification |
| CMS | Content Management System |
| SEO | Search Engine Optimization |
| UI/UX | User Interface / User Experience |
| WCAG | Web Content Accessibility Guidelines |
| CTA | Call to Action |
| Responsive Design | Layout that adapts to different screen sizes and devices |

### 1.5 References
- SF Nail Spa Business Profile & Website Content Document (source document, provided by client)

### 1.6 Document Overview
Section 2 describes the product at a high level. Section 3 details functional requirements by page/module. Section 4 covers external interfaces. Section 5 covers non-functional requirements. Section 6 covers content and data requirements. Section 7 lists the sitemap. Section 8 covers acceptance criteria, and Section 9 lists assumptions and open issues.

---

## 2. Overall Description

### 2.1 Product Perspective
The SF Nail Spa website is a new, standalone marketing and informational website. It is not replacing an existing system. It will likely be built on a CMS (e.g., WordPress, Squarespace, or a custom static/React site) or a no-code website builder, to be determined by the development team's recommendation and the client's budget for ongoing self-management of content.

### 2.2 Product Features (Summary)
- Informational pages: Home, About Us, Services, Pricing, FAQs, Contact
- Visual content: Nail Art Gallery organized by category
- Social proof: Testimonials section
- Conversion features: Book Appointment CTA, click-to-call phone number, embedded map
- Legal pages: Privacy Policy, Terms & Conditions
- SEO-optimized content and metadata throughout

### 2.3 User Classes and Characteristics

| User Class | Description | Needs |
|---|---|---|
| Prospective Customer | First-time visitor researching local nail salons | Quick access to services, pricing, location, hours, reviews |
| Returning Customer | Existing client looking to rebook or check hours | Fast access to booking/contact, hours, phone number |
| Mobile User | Majority of local searchers on mobile devices | Fast load times, thumb-friendly navigation, tap-to-call |
| Site Administrator | Salon staff/owner managing content | Easy CMS access to update hours, pricing, gallery images, testimonials |
| Search Engine Crawlers | Bots indexing the site for search results | Clean semantic HTML, structured data, fast performance |

### 2.4 Operating Environment
- The website must function correctly on the latest two major versions of Chrome, Safari, Firefox, and Edge.
- Must render correctly on iOS and Android mobile browsers.
- Hosting environment to be determined (recommend managed hosting compatible with chosen CMS).

### 2.5 Design and Implementation Constraints
- Visual design must reflect a "luxury, organic, relaxing" brand tone consistent with the business slogan: "Luxury Nail Care with Organic Beauty & Exceptional Service."
- Must accommodate the business's stated accessibility feature (wheelchair accessible, no steps) by also meeting digital accessibility standards (WCAG 2.1 AA recommended).
- Content must reflect accurate business hours, services, and policies as provided by the client; no service should be advertised that the salon does not offer (e.g., hard gel nails are explicitly **not** offered, per FAQ).

### 2.6 Assumptions and Dependencies
- Client will supply or approve final photography for the gallery (manicure, pedicure, gel nails, nail art, eyelash extensions, before/after).
- Client will confirm final pricing for the Pricing page (not provided in the source document).
- A booking method (third-party scheduler vs. contact form) will be confirmed before development of the Booking page begins.
- Domain name and hosting account will be provided or set up by the client/agency.

---

## 3. Functional Requirements (By Page/Module)

Each requirement is tagged with an ID for traceability (FR = Functional Requirement) and a priority: **Must Have (M)**, **Should Have (S)**, **Could Have (C)**.

### 3.1 Home Page

| ID | Requirement | Priority |
|---|---|---|
| FR-1.1 | Display business name, logo, and slogan ("Luxury Nail Care with Organic Beauty & Exceptional Service.") above the fold. | M |
| FR-1.2 | Display a primary CTA button ("Book Appointment") visible without scrolling. | M |
| FR-1.3 | Display business hours and phone number in the header or hero section. | M |
| FR-1.4 | Display a short business introduction summarizing services and brand values (organic, non-toxic, cruelty-free). | M |
| FR-1.5 | Display a snapshot of core services with links to the full Services page. | M |
| FR-1.6 | Display 2–4 rotating or static testimonials. | S |
| FR-1.7 | Display a gallery preview (3–6 images) linking to the full Nail Art Gallery. | S |
| FR-1.8 | Display an embedded Google Map showing the salon's location. | M |
| FR-1.9 | Display footer with address, phone, hours, navigation links, and social media icons (if applicable). | M |

### 3.2 About Us Page

| ID | Requirement | Priority |
|---|---|---|
| FR-2.1 | Display the "Welcome to SF Nail Spa" introductory copy. | M |
| FR-2.2 | Display Mission statement. | M |
| FR-2.3 | Display Vision statement. | M |
| FR-2.4 | Display Core Values as a structured list (e.g., icon grid). | S |
| FR-2.5 | Optionally display staff/technician photos or salon interior photos. | C |

### 3.3 Services Page

| ID | Requirement | Priority |
|---|---|---|
| FR-3.1 | Display services grouped into categories: Manicure, Pedicure, Gel Nails, Nail Art, Eyelash Services, Waxing Services, Additional Services. | M |
| FR-3.2 | Each category must list its sub-services exactly as defined in the source content (e.g., Manicure includes Classic, Gel, Deluxe, French, Nail Strengthening, Nail Shaping, Cuticle Care, Hand Massage). | M |
| FR-3.3 | Each service category should link to or anchor-scroll to the Pricing page/section. | S |
| FR-3.4 | Display a CTA ("Book Now") at the end of each service category or at page bottom. | M |
| FR-3.5 | Clearly indicate services NOT offered if relevant to avoid customer confusion (e.g., no hard gel/artificial nail extensions), consistent with the FAQ content. | S |

### 3.4 Pricing Page

| ID | Requirement | Priority |
|---|---|---|
| FR-4.1 | Display a pricing table organized by service category, mirroring the Services page structure. | M |
| FR-4.2 | Pricing values are pending client input (not included in source document) — placeholder content required until final pricing is supplied. | M |
| FR-4.3 | Include a disclaimer noting that prices may vary based on nail length, condition, or design complexity. | S |
| FR-4.4 | Include CTA to book an appointment. | M |

### 3.5 Nail Art Gallery Page

| ID | Requirement | Priority |
|---|---|---|
| FR-5.1 | Display a filterable or categorized image gallery with the following categories: Manicure, Pedicure, Gel Nails, Cat Eye Nails, Chrome Nails, Nail Art, French Nails, Eyelash Extensions, Before & After / Customer Transformations. | M |
| FR-5.2 | Support lightbox/full-screen image viewing on click/tap. | S |
| FR-5.3 | Images must be optimized (compressed, responsive sizes) for fast page load. | M |
| FR-5.4 | Gallery should be easily updatable by the site administrator via CMS. | M |

### 3.6 Testimonials Page / Section

| ID | Requirement | Priority |
|---|---|---|
| FR-6.1 | Display all provided 5-star testimonials with reviewer star ratings. | M |
| FR-6.2 | Support adding new testimonials via CMS without developer involvement. | S |
| FR-6.3 | Optionally integrate live Google/Yelp review feed. | C |

### 3.7 FAQs Page

| ID | Requirement | Priority |
|---|---|---|
| FR-7.1 | Display FAQs in an expandable accordion format. | M |
| FR-7.2 | Include all FAQs from the source document (walk-ins, appointments, hard gel services, elderly clients, products used, gel polish removal, nail repair). | M |
| FR-7.3 | Support adding new FAQs via CMS. | S |

### 3.8 Book Appointment Page

| ID | Requirement | Priority |
|---|---|---|
| FR-8.1 | Provide a method for users to request or schedule an appointment (third-party booking widget integration OR a structured contact/request form — pending client decision). | M |
| FR-8.2 | If using a form: capture name, phone, email, preferred service(s), preferred date/time, and optional notes. | M |
| FR-8.3 | Display a confirmation message upon successful submission. | M |
| FR-8.4 | Send an email/SMS notification to salon staff upon new booking/request. | M |
| FR-8.5 | Display a note that "Walk-ins are welcome" alongside the booking option. | M |
| FR-8.6 | Display click-to-call phone number prominently as an alternative booking method. | M |

### 3.9 Contact Us Page

| ID | Requirement | Priority |
|---|---|---|
| FR-9.1 | Display full address: 1324 Noriega Street, San Francisco, CA 94122. | M |
| FR-9.2 | Display phone number: (415) 564-5581 as a tap-to-call link on mobile. | M |
| FR-9.3 | Display full business hours table (Tue–Sat 10:00 AM–7:00 PM, Sun 10:00 AM–6:00 PM, Mon Closed). | M |
| FR-9.4 | Embed an interactive map (Google Maps) with directions link. | M |
| FR-9.5 | Include a general contact/inquiry form (name, email, message). | S |
| FR-9.6 | Display social media links, if provided by client. | C |

### 3.10 Privacy Policy & Terms & Conditions Pages

| ID | Requirement | Priority |
|---|---|---|
| FR-10.1 | Provide a standard Privacy Policy page covering data collection (e.g., contact form submissions, cookies/analytics). | M |
| FR-10.2 | Provide a standard Terms & Conditions page covering site usage, booking/cancellation policy (pending client input on cancellation terms). | M |

### 3.11 Global / Site-Wide Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-11.1 | Persistent header navigation with links to: Home, About Us, Services, Nail Gallery, Pricing, Testimonials, FAQs, Book Appointment, Contact. | M |
| FR-11.2 | Persistent footer with address, hours, phone, navigation links, and legal page links (Privacy Policy, Terms & Conditions). | M |
| FR-11.3 | Sticky or easily accessible "Book Appointment" CTA across all pages. | M |
| FR-11.4 | Mobile-responsive hamburger menu for navigation on small screens. | M |
| FR-11.5 | 404 error page with navigation back to Home. | S |

---

## 4. External Interface Requirements

### 4.1 User Interfaces
- Clean, modern, salon-appropriate visual design reflecting an "organic luxury" aesthetic (soft, natural color palette; elegant typography; high-quality imagery).
- Consistent header/footer across all pages.
- Mobile-first responsive layout.

### 4.2 Hardware Interfaces
- No special hardware interfaces required. Must support standard desktop, tablet, and smartphone displays.

### 4.3 Software Interfaces
- **CMS** (e.g., WordPress, Squarespace, Webflow) for content management — to be finalized with client.
- **Google Maps API/Embed** for location display.
- **Booking/Scheduling integration** (e.g., Square Appointments, Vagaro, Fresha, Calendly, or similar) if a third-party scheduler is chosen over a custom form.
- **Email service** (e.g., SMTP provider or form-handling service such as Formspree/SendGrid) for contact and booking form submissions.
- **Analytics** (e.g., Google Analytics, Google Search Console) for traffic and SEO monitoring.

### 4.4 Communication Interfaces
- Standard HTTPS for all site traffic.
- Email notifications triggered by form submissions.

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Pages should achieve a Google PageSpeed/Lighthouse performance score of 85+ on mobile and desktop.
- Initial page load should complete within 3 seconds on a standard broadband/4G connection.
- Images must be served in modern, optimized formats (e.g., WebP) with responsive sizing.

### 5.2 Security
- Site must be served over HTTPS with a valid SSL certificate.
- Contact and booking forms must include spam protection (e.g., reCAPTCHA or honeypot fields).
- CMS and plugins (if applicable) must be kept up to date to mitigate vulnerabilities.

### 5.3 Usability & Accessibility
- Navigation must be intuitive, requiring no more than 2–3 clicks to reach any page from the homepage.
- Site should meet WCAG 2.1 AA accessibility guidelines (alt text for images, sufficient color contrast, keyboard navigability, accessible form labels).
- Content should be written in plain, welcoming language consistent with the brand voice.

### 5.4 Reliability & Availability
- Target uptime of 99.9%, dependent on hosting provider SLA.
- Regular automated backups of site content and database (if CMS-based).

### 5.5 Maintainability
- Salon staff with no technical background should be able to update business hours, pricing, gallery images, and testimonials through the CMS without developer assistance.
- Codebase (if custom-built) should be documented for future developer handoff.

### 5.6 Scalability
- Site architecture should allow for future additions (e.g., online gift card sales, loyalty program, blog) without a full rebuild.

### 5.7 SEO Requirements
- Each page must have unique, optimized title tags and meta descriptions incorporating target keywords (e.g., "Nail Salon San Francisco," "Best Nail Salon Outer Sunset," "Organic Nail Salon").
- Implement local SEO best practices: Google Business Profile alignment, NAP (Name, Address, Phone) consistency, schema markup for LocalBusiness.
- Image alt text should be descriptive and keyword-relevant where natural (e.g., "chrome nail design at SF Nail Spa").
- XML sitemap and robots.txt must be generated and submitted to Google Search Console.
- Target keyword list to inform content and metadata: SF Nail Spa, Nail Salon San Francisco, Best Nail Salon Outer Sunset, Gel Manicure San Francisco, Pedicure San Francisco, Organic Nail Salon, Cat Eye Nails, Chrome Nails, Nail Art San Francisco, Eyelash Extensions San Francisco, Waxing Services San Francisco, Luxury Nail Salon, Cruelty-Free Nail Salon, Non-Toxic Nail Salon, Manicure Near Me, Pedicure Near Me.

---

## 6. Content & Data Requirements

### 6.1 Business Data (Confirmed, from source document)

| Field | Value |
|---|---|
| Business Name | SF Nail Spa |
| Address | 1324 Noriega Street, San Francisco, CA 94122 |
| Neighborhood | Outer Sunset |
| Phone | (415) 564-5581 |
| Hours | Mon: Closed · Tue–Sat: 10:00 AM–7:00 PM · Sun: 10:00 AM–6:00 PM |
| Categories | Nail Salon, Beauty Salon, Waxing Services, Eyelash Services |

### 6.2 Content Pending From Client
- Final service pricing (no pricing was provided in the source document).
- High-resolution photography for gallery categories.
- Decision on booking method (third-party scheduler vs. custom form).
- Cancellation/no-show policy text for Terms & Conditions.
- Social media account links (if applicable).
- Staff/technician bios or photos (optional).

---

## 7. Proposed Sitemap

```
Home
├── About Us
├── Services
│   ├── Manicure
│   ├── Pedicure
│   ├── Gel Nails
│   ├── Nail Art
│   ├── Eyelash Services
│   └── Waxing Services
├── Nail Art Gallery
├── Pricing
├── Testimonials
├── FAQs
├── Book Appointment
├── Contact Us
├── Privacy Policy
└── Terms & Conditions
```

---

## 8. Acceptance Criteria
The website will be considered complete and ready for launch when:

1. All pages listed in Section 7 are built, populated with approved content, and pass internal QA review.
2. All functional requirements marked **Must Have (M)** in Section 3 are implemented and verified.
3. The site is fully responsive and tested across major browsers and devices (Section 2.4).
4. The site meets the performance, accessibility, and SEO benchmarks defined in Section 5.
5. Booking/contact forms successfully submit and trigger notifications in a test environment.
6. Client has reviewed and approved all content, pricing, and imagery.
7. Google Analytics and Search Console are connected and verified.

---

## 9. Assumptions & Open Issues

| # | Item | Status |
|---|---|---|
| 1 | Final pricing for all services | **Pending client input** |
| 2 | Booking method: third-party scheduler vs. custom form | **Pending client decision** |
| 3 | Source/ownership of gallery photography | **Pending client input** |
| 4 | Cancellation policy text | **Pending client input** |
| 5 | CMS/platform selection | **Pending stakeholder decision** |
| 6 | Hosting and domain provider | **Pending client setup** |
| 7 | Social media links | **Pending client input** |

---

*End of Document*