# Mohammad Mahfooz — Construction Contractor Platform & Secure Admin Dashboard

A luxury, fully functional, responsive construction contractor website and secure administrative content management system (CMS) built for **Mohammad Mahfooz (General Contractor & Structural Specialist)**.

The platform provides a public-facing website crafted with a **Black, White, and Gold** theme, paired with an executive administrator dashboard allowing Mohammad Mahfooz to manage and edit every section, building project, high-resolution photograph, service, achievement metric, and customer quote inquiry without touching code.

---

## 🏗️ Architecture & Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling & Theme:** Tailwind CSS with custom luxury gold gradients (`#C5A028`), obsidian dark backgrounds (`#07090C`, `#0D1117`), Cinzel/Playfair Display typography, and responsive layouts
- **Icons:** Lucide React
- **Backend / Authentication:** Supabase Auth (Email & Password, role-verified)
- **Database:** Supabase PostgreSQL with comprehensive Row Level Security (RLS)
- **Object Storage:** Supabase Storage (Bucket: `contractor-media`) for project and section photographs
- **Resilient Fallback Mode:** Dual-driver API service that operates smoothly in local offline mode when Supabase keys are not yet configured, and seamlessly switches to live Supabase Auth, PostgreSQL, and Storage the moment environment variables are entered.

---

## 🛡️ User Roles & Permissions Matrix

| Capability | Public Visitor | Administrator (Mohammad Mahfooz) |
| :--- | :---: | :---: |
| View Published Projects, Services & Photos | ✅ Yes | ✅ Yes |
| View Unpublished / Draft Content | ❌ Denied | ✅ Yes |
| Access Admin Portal (`/admin/login`, `/admin`) | ❌ Denied | ✅ Yes |
| Submit New Quote Inquiries | ✅ Yes | ✅ Yes |
| Read / Inspect Other Customer Inquiries | ❌ Strictly Denied (RLS Enforced) | ✅ Yes |
| Edit Website Sections, Bio & Settings | ❌ Denied | ✅ Yes |
| Upload, Replace & Delete Photographs | ❌ Denied | ✅ Yes |
| Create, Edit & Delete Building Projects | ❌ Denied | ✅ Yes |
| Public User Self-Registration | ❌ Disabled | ❌ Disabled (Pre-authorized only) |

---

## 📂 Project Structure

```
c:\mahfooz\
├── supabase/
│   └── schema.sql              # Complete PostgreSQL schema, RLS policies, buckets & seed data
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx      # Public responsive luxury header with quote CTA & direct buttons
│   │   │   ├── Footer.tsx      # Public footer with contractor info & discreet admin link
│   │   │   ├── Modal.tsx       # Accessible dialog modal
│   │   │   ├── ConfirmDialog.tsx # Destruction safety dialogs for delete actions
│   │   │   ├── ImageUploadModal.tsx # Multi-mode image manager (Upload / URL / Captions)
│   │   │   └── Toast.tsx       # Live toast feedback notifications
│   │   └── public/
│   │       ├── HeroSection.tsx # Luxury architectural hero banner
│   │       ├── AboutSection.tsx # Contractor profile, leadership creed & licensing
│   │       ├── ServicesSection.tsx # 4+ contracting service cards with deliverables
│   │       ├── ProjectsSection.tsx # Filterable portfolio (Residential, Commercial, Renovation)
│   │       ├── ProjectDetailModal.tsx # Full architectural gallery & specs lightbox
│   │       ├── GallerySection.tsx # High-definition image archive with full zoom modal
│   │       ├── AchievementsSection.tsx # Key metrics (18+ Years, 240+ Builds, 100% Safety)
│   │       ├── HowWeWorkSection.tsx # 4-stage engineering protocol
│   │       ├── LocationsSection.tsx # Active geographic coverage areas
│   │       ├── TestimonialsSection.tsx # Verified client reviews & 5-star ratings
│   │       ├── QuoteCalculatorSection.tsx # Interactive cost estimator & inquiry form
│   │       └── ContactSection.tsx # Direct phone, priority WhatsApp, office address
│   ├── context/
│   │   ├── AuthContext.tsx     # Supabase Auth session & role-verification state
│   │   └── WebsiteDataContext.tsx # Global CRUD operations, sync, and toast notifications
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client & image storage upload handler
│   │   └── constants.ts        # Seed data and default contractor records
│   ├── pages/
│   │   ├── PublicHomePage.tsx  # Full public showcase landing page
│   │   ├── AdminLoginPage.tsx  # Secure admin portal at /admin/login
│   │   └── admin/
│   │       ├── AdminLayout.tsx # Responsive admin dashboard shell with 13-item menu
│   │       ├── AdminOverview.tsx # Real database stats, recent inquiries & quick actions
│   │       ├── ManageSections.tsx # Live content editor for Hero, About, How We Work, CTAs
│   │       ├── ManageProjects.tsx # CRUD portfolio management, categories, draft/publish
│   │       ├── ManageProjectPhotos.tsx # Multi-photo gallery uploader, cover photo selector
│   │       ├── ManageServices.tsx # Services editor with custom features and imagery
│   │       ├── ManageAbout.tsx # Biography, executive portrait, certifications
│   │       ├── ManageAchievements.tsx # Metric statistics and milestones editor
│   │       ├── ManageLocations.tsx # Active coverage cities and districts
│   │       ├── ManageTestimonials.tsx # Client reviews, ratings, and avatars
│   │       ├── ManageContact.tsx # Direct telephone, WhatsApp, email, office address
│   │       ├── ManageInquiries.tsx # Encrypted client lead CRM with status pipeline
│   │       └── WebsiteSettingsPage.tsx # Brand name, tagline, gold accent colors, logo
│   ├── services/
│   │   └── api.ts              # Database abstraction layer (Supabase + Local sync)
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Client router supporting /, /admin/login, and /admin/*
│   ├── index.css               # Tailwind directives and gold luxury accents
│   └── main.tsx                # Application bootstrap
├── .env.example                # Environment variables template
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 Step-by-Step Initial Setup Guide

### 1. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your Supabase credentials:

```ini
# Obtain from Supabase Project Settings -> API
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Pre-authorized Admin Email for Mohammad Mahfooz
VITE_ADMIN_EMAIL=admin@mahfoozconstruction.com
```

---

### 2. Supabase Database Schema & RLS Setup

1. Open your [Supabase Project Dashboard](https://app.supabase.com).
2. Navigate to **SQL Editor** in the left sidebar.
3. Open `supabase/schema.sql` from this codebase, copy the entire SQL script, and click **Run**.

This will automatically create:
- `admin_users` table with strict role checking
- `website_settings`, `website_sections`, `projects`, `project_photos`, `services`, `achievements`, `service_locations`, `testimonials`
- `quote_inquiries` table with write-only policy for public visitors and read/write policy strictly for authenticated administrators
- `contractor-media` Supabase Storage bucket with public read access and admin-only upload/delete policies
- Realistic initial seed data for Mohammad Mahfooz

---

### 3. Creating the Secure Administrator Account for Mohammad Mahfooz

To ensure high security without hardcoding passwords in code:

1. In Supabase Dashboard, go to **Authentication &rarr; Users**.
2. Click **Add User &rarr; Create User**.
3. Enter Mohammad Mahfooz's email: `admin@mahfoozconstruction.com` (or the email configured in `VITE_ADMIN_EMAIL`).
4. Set a strong password of your choice.
5. In the **SQL Editor**, execute this quick query to link the authentication user to the authorized administrator table:

```sql
INSERT INTO public.admin_users (id, email, full_name, role)
SELECT id, email, 'Mohammad Mahfooz', 'admin'
FROM auth.users
WHERE email = 'admin@mahfoozconstruction.com'
ON CONFLICT (id) DO NOTHING;
```

6. Navigate to `http://localhost:5173/admin/login` on the website and sign in with those credentials!

---

## 💻 Running the Application Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript compilation and build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 🖥️ Admin Dashboard Modules (13 Menu Items)

1. **Overview:** Actual database statistics (total projects, published vs drafts, stored photos, incoming quote inquiries) and quick access cards.
2. **Manage Website Sections:** Edit headlines, subtitles, paragraphs, button targets, badges, and background images across Hero, About, How We Work, and CTAs.
3. **Manage Projects:** Add, edit, delete, publish, and unpublish construction projects across categories (*Residential, Commercial, Renovation, Industrial, Other*).
4. **Manage Project Photos:** Upload multiple photographs to individual projects, set cover photos, add captions, alt text, and reorder.
5. **Manage Services:** Full CRUD management of contracting capabilities, scope checklists, and service images.
6. **About the Contractor:** Mohammad Mahfooz's executive profile, philosophy quote, licensing credentials, and portrait photography.
7. **Experience & Achievements:** Live metric counters (*18+ Years, 240+ Builds, 1.2M+ Sqft, 100% Safety*).
8. **Service Locations:** Active operational regions, cities, and zoning coverage.
9. **Testimonials:** Client quotes, star ratings (1-5), and client headshots.
10. **Contact Information:** Direct phone, priority WhatsApp hotline, email, office address, and Google Maps location.
11. **Quote Inquiries:** Encrypted CRM for reviewing prospective client estimates with status pipelines (*New, In Review, Contacted, Estimated, Archived*) and private contractor notes.
12. **Website Settings:** Brand name, executive tagline, primary gold accent tone, hero CTA, and logo.
13. **Logout:** Terminate administrator session with confirmation safety dialog.

---

## 🔒 Security & Data Protection Guarantees

- **No Hardcoded Secrets:** Credentials and emails are managed through environment variables.
- **True Database RLS:** PostgreSQL Row Level Security enforces that public visitors cannot mutate website records or read other customers' private quote submissions.
- **No Client-Only Security:** Protected routes verify real session tokens. Direct unauthenticated REST or GraphQL requests will be rejected by Supabase database policies.
- **Storage Protection:** Only authenticated administrators can upload, replace, or delete files in the `contractor-media` storage bucket.
- **Destructive Action Confirmation:** All delete operations prompt a modal confirmation dialog to prevent accidental data loss.
