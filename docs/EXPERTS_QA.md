# 🧪 Experts Platform QA & Manual Verification Checklist

This document details the step-by-step manual testing and verification procedures for the OutlineDev Unified Expert Platform (Mentor + Hire roles, Lead Protection, Matching, and Admin Authorization).

---

## 1. Single Account Holding Both Roles (Mentor & Hire)
- [ ] **Registration Verification:**
  1. Navigate to `/become-mentor`.
  2. Complete Step 1: Provide real name, photo, location, and primary skills.
  3. In Step 2, select **"Both (Mentor & Freelance / Contract)"**.
  4. Verify separate headline and summary inputs render for both roles:
     - Mentor headline (≤ 70 chars) & Mentor summary (80–300 words).
     - Hire headline (≤ 70 chars) & Hire summary (80–300 words).
  5. Complete Step 3: Add projects, links, and accept all 6 mandatory consent declarations.
  6. Submit the application and verify it enters `pending` status.
- [ ] **Admin Approval:**
  1. Log in as an admin and open `/admin/mentors`.
  2. Locate the pending application. Verify Draft vs. Published views show both Mentor and Hire role details.
  3. Click **"Approve"**.
- [ ] **Public Profile Inspection:**
  1. Visit `/experts/[slug]`.
  2. Verify that **both** the Mentorship section and the Freelance Hire section are displayed with their respective headlines, summaries, rates, and booking/inquiry actions.

---

## 2. Edit While Live (Draft vs. Published Integrity)
- [ ] **Candidate Edits Live Profile:**
  1. While logged in as an approved expert whose profile is live at `/experts/[slug]`, navigate back to `/become-mentor`.
  2. The form pre-populates the current `draft`.
  3. Modify the headline or summary and click **"Save & Resubmit"**.
- [ ] **Live Profile Remains Unchanged:**
  1. Visit `/experts/[slug]` in an incognito window.
  2. Confirm the public profile **still displays the previously approved `published` content**—none of the unapproved draft changes appear publicly.
- [ ] **Admin Review:**
  1. Open `/admin/mentors`. Notice the status is reset to `pending` review.
  2. Compare Draft vs. Published side-by-side.
  3. Click **"Approve"**.
  4. Refresh `/experts/[slug]`; verify the newly approved draft changes are now published live.

---

## 3. Hide Profile
- [ ] **Admin Hides Profile:**
  1. On `/admin/mentors`, find an approved expert.
  2. Click **"Hide"** (sets `status = 'hidden'`).
- [ ] **Public Route Rejection:**
  1. In a browser or via `curl`, request `/experts/[slug]`.
  2. Confirm the server returns a `404 Not Found` (via Next.js `notFound()`).
- [ ] **Matching Exclusion:**
  1. Verify the hidden expert is excluded from the `/hire/[slug]` and `/mentors/[slug]` matched cards when matching is enabled.
- [ ] **Sitemap Exclusion:**
  1. Check `/sitemap.xml`; confirm the hidden slug does not appear in the sitemap.

---

## 4. Delete Profile & Photo Deletion
- [ ] **Candidate Requests Deletion:**
  1. From the expert editing screen (`/become-mentor`), click **"Request deletion"** (or use admin panel).
  2. Confirm deletion.
- [ ] **Database & Cloudinary Cleanup:**
  1. Verify the `MentorApplication` document is removed from MongoDB.
  2. If a `photoPublicId` was stored in Cloudinary, confirm Cloudinary API's `uploader.destroy(photoPublicId)` is invoked to delete the stored image asset.
  3. Verify accessing `/experts/[slug]` returns `404 Not Found`.

---

## 5. No Private Data in Page Source
- [ ] **Source Code Inspection (`view-source:`):**
  1. Visit `/experts/[slug]` in Google Chrome or Firefox.
  2. Right-click and choose **View Page Source** (or press `Ctrl + U`).
  3. Search (`Ctrl + F`) for the following private fields to ensure ZERO matches:
     - `email` (applicant's private email address)
     - `phone` (applicant's phone number)
     - `adminNotes` (internal review notes)
     - `reviewedBy` (admin reviewer user ID)
     - `reviewedAt`
     - `consents` (consent timestamps and IP records)
     - `draft` (unapproved draft payload)
     - `photoPublicId` (Cloudinary public ID)
     - `_id` / `userId` (internal MongoDB ObjectIDs)
  4. Verify the Person JSON-LD schema (`<script type="application/ld+json">`):
     - Contains: `name`, `image`, `jobTitle`, `knowsAbout`, `sameAs`.
     - Strictly does **NOT** contain `worksFor` or `Founder`.

---

## 6. Admin Authorization Hardening (Non-Admin Lockout)
- [ ] **Unauthenticated Access (Expect `401 Unauthorized`):**
  ```bash
  curl -i -X GET http://localhost:3000/api/admin/leads
  curl -i -X POST http://localhost:3000/api/admin/leads/send-to-expert \
    -H "Content-Type: application/json" -d '{"leadType":"mentorship","leadId":"123","expertIds":["abc"]}'
  curl -i -X GET http://localhost:3000/api/admin/mentors/list
  curl -i -X POST http://localhost:3000/api/admin/mentors/update-status \
    -H "Content-Type: application/json" -d '{"id":"123","status":"approved"}'
  ```
  *Result:* All 4 endpoints return HTTP `401`.

- [ ] **Authenticated Non-Admin Access (Expect `403 Forbidden`):**
  1. Log in with a standard user account (`role !== 'admin'` and email not in `ADMIN_EMAILS`).
  2. Attempt to perform GET or POST requests to `/api/admin/leads`, `/api/admin/leads/send-to-expert`, `/api/admin/mentors/list`, or `/api/admin/mentors/update-status`.
  *Result:* All endpoints return HTTP `403 Forbidden` (`{"error":"Forbidden"}`).

- [ ] **Whitelisted Parameter Injection Prevention:**
  1. In `/api/mentor/apply`, attempt to send a malicious POST payload with `{ "status": "approved", "adminNotes": "hacked" }`.
  2. Confirm the server whitelist strictly drops `status`, `adminNotes`, `reviewedBy`, and `userId`.

---

## 7. Matching Flag & Zero-Regression Check (`EXPERTS_MATCHING_ENABLED`)
- [ ] **Flag Disabled (`EXPERTS_MATCHING_ENABLED=false` or unset):**
  1. Open `/hire/react-developer` and `/mentors/react-mentors-in-online`.
  2. Confirm the matched cards section returns `null` and does **not** render into HTML.
  3. Compare rendered HTML against previous release; confirm output is **byte-for-byte unchanged**.
- [ ] **Flag Enabled (`EXPERTS_MATCHING_ENABLED=true`):**
  1. Start server with `EXPERTS_MATCHING_ENABLED=true npm run dev`.
  2. Open `/hire/react-developer`.
  3. Confirm up to 3 cards appear with links to `/experts/[slug]`.
  4. On hire pages, verify each card displays the candidate's **hire headline and summary**.
  5. Open `/mentors/react-mentors-in-online`.
  6. On mentor pages, verify each card displays the candidate's **mentor headline and summary**.
  7. Verify matching priority order:
     1. Same skill + same city
     2. Same skill + same country
     3. Same skill anywhere
     4. Default owner fallback (`Ramkumar Khubchandani` from `app/lib/default-expert.js`).
