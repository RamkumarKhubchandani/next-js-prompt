# Local Testing Guide: Verified Experts Matching & Join Flow

This guide walks through configuring your local development environment to test the mentor/developer join flow, multi-location matching, admin lead dispatch, and expert dashboard.

---

## 1. Environment Configuration (`.env.local`)

Ensure your `.env.local` contains the following keys:

```bash
# Database: Point to a separate TEST database on Atlas or local MongoDB (NOT production)
# Note: Seed scripts strictly require the database name or URI to contain "test"
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/outlinedev_test?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=local-development-secret-key-at-least-32-chars-long

# Admin Access: Your email address for admin privileges (/admin/mentors, /admin/leads)
ADMIN_EMAILS=your.email@example.com

# Feature Flag: Enable matched experts cards on landing and SEO pages
EXPERTS_MATCHING_ENABLED=true

# Cloudinary (Optional for local testing)
# Photo upload can be skipped locally if not configured (the join form allows saving and submitting without a photo)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email Provider (Optional for local testing)
# If RESEND_API_KEY or EMAIL_USER/EMAIL_PASSWORD are omitted, email notifications
# are automatically logged to the terminal console instead of failing.
RESEND_API_KEY=
EMAIL_USER=
EMAIL_PASSWORD=
EMAIL_FROM=no-reply@outlinedev.com
```

> [!IMPORTANT]
> Always use a dedicated test database (e.g. `outlinedev_test`). The expert seed script enforces safety checks and will abort if `NODE_ENV === 'production'` or if `MONGODB_URI` does not contain the word `test`.

---

## 2. Seed Test Expert Profiles

A seed script is provided to populate 6 approved test profiles across varied skills, roles, and locations (2 multi-location profiles, 1 online-only, and 3 single-location profiles):

### Seed 6 Profiles
```bash
node scripts/seed-test-experts.mjs
```

This creates:
1. **Aarav Sharma** (`/experts/test-aarav-sharma`): React, Next.js, TypeScript | Locations: `pune`, `bangalore`, `mumbai` (Multi-location) | Roles: Mentor + Hire | Interviewed: Yes
2. **Priya Patel** (`/experts/test-priya-patel`): React, Node.js, MongoDB | Locations: `london`, `manchester` (Multi-location) | Roles: Mentor + Hire | Interviewed: Yes
3. **Rohan Verma** (`/experts/test-rohan-verma`): React, Vue.js, Tailwind CSS | Locations: `online` (Online only) | Roles: Mentor + Hire | Interviewed: No
4. **Dev Kapoor** (`/experts/test-dev-kapoor`): React, Node.js, AWS, Docker | Locations: `pune` | Roles: Mentor + Hire | Interviewed: No
5. **Ananya Iyer** (`/experts/test-ananya-iyer`): Python, AI, SQL | Locations: `bangalore` | Roles: Mentor only | Interviewed: Yes
6. **Marcus Vance** (`/experts/test-marcus-vance`): Node.js, Go, Kubernetes, AWS | Locations: `san-francisco` | Roles: Hire only | Interviewed: No

### Clean Up Seeded Data
To remove all seeded test profiles and their associated test user records:
```bash
node scripts/seed-test-experts.mjs --clean
```

---

## 3. Starting the Development Server

```bash
npm run dev
```

The application runs at [http://localhost:3000](http://localhost:3000).

---

## 4. Manual Test Checklist

Tick each item to verify the complete join and matching lifecycle:

- [ ] **1. User Profile Creation (`/join`)**
  - Register or sign in with test user A (non-admin).
  - Open `/join` (verify light theme styling: white background, dark text, clean borders).
  - Fill out Step 1: Display Name, Headline, Years of Experience (numeric text input), WhatsApp number with country code.
  - Fill out Step 2: Select 3 locations (e.g., Pune, Bangalore, Mumbai), pick overlap time zones (e.g., IST, GST).
  - Fill out Step 3: Select skills (e.g., React, Next.js).
  - Fill out Step 4: Accept required checkboxes and submit.
  - Verify success alert with "Go to My Dashboard" button linking to `/expert-dashboard`.
  - Check `/expert-dashboard`: Status banner shows "Submitted for review" with blue badge.

- [ ] **2. Admin Review & Approval (`/admin/mentors`)**
  - Sign in with an account matching `ADMIN_EMAILS`.
  - Navigate to `/admin/mentors`.
  - Find User A's pending application. Verify all selected locations and overlap zones are displayed in the review card.
  - Click **Approve**.

- [ ] **3. Profile Listing & 4-Card Matching**
  - Open `/mentors/react-mentors-in-pune` and `/hire/react-developer`.
  - Verify User A appears alongside default profile.
  - Verify order: Default profile (Ramkumar) is **always first**, followed by up to 3 community matches (Total: max 4 cards).
  - Verify layout: responsive 4-column grid (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`).

- [ ] **4. Fallback Matching When No Location Matches**
  - Open a page where location has no exact candidate match.
  - Verify default profile is first and up to 3 approved candidates matching the role/skill from any location are shown.
  - Total never exceeds 4 cards. Default profile is never cut off.

- [ ] **5. Lead Submission & Admin Assignment**
  - As a normal visitor, submit a mentorship request on `/mentorship` or a hire enquiry on `/hire`.
  - Log in as admin and visit `/admin/leads`.
  - Select the newly created lead and click **Assign to Expert**, choosing User A.
  - If email keys are missing, verify that the console logs `[LEAD DISPATCH CONSOLE FALLBACK]` and the lead status updates to `sent`.

- [ ] **6. Expert Dashboard View (`/expert-dashboard`)**
  - Log in as User A and visit `/expert-dashboard`.
  - Status banner shows **Approved** with public URL (`https://www.outlinedev.com/experts/[slug]`) and clickable "Preview public profile" link.
  - Navigate between the **Mentorship students** and **Hire enquiries** tabs with count badges.
  - Verify the assigned lead appears with client name, reply email, details, and date.
  - Verify another expert's lead is NOT visible.

- [ ] **7. Header Navigation & Link Hit-Testing**
  - Verify header nav items at 1280px, 1440px, and 1920px viewports.
  - Badges (HOT, NEW) render inline and do not obstruct link hitboxes.
  - "Become Mentor/Dev" links to `/join`.
  - Accessing legacy `/become-mentor` URL returns a 301 permanent redirect to `/join`.
  - When logged in as User A (an applicant/expert), verify "My Expert Dashboard" appears in top nav, mobile menu, and avatar menu.

- [ ] **8. Light Theme Default**
  - Verify `/join` and `/expert-dashboard` load in light mode by default.
  - Confirm high contrast for all text, pills, cards, inputs, and error states.
