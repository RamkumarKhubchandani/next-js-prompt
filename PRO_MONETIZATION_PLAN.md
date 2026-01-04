# 🚀 Pro Version Monetization Strategy
## Goal: Convert Free Users to Paid "Pro" Subscribers ($19/mo)

To make users pay, we need features that directly impacting their **hiring probability** or **save them significant time**.

### 1. 📄 AI Resume Screener & Rewriter (High Value)
*   **The Hook:** "Your resume is being rejected by ATS. Fix it now."
*   **Feature:** User uploads PDF. AI scans it against "Google L5" standards.
*   **Deliverable:**
    *   ATS Score (0-100).
    *   Live text rewriting (e.g., Change "Worked on React" -> "Architected scalable React frontend serving 1M+ users").
    *   "Red Flag" detection.

### 2. 🏗️ Interactive System Design Whiteboard
*   **The Hook:** "Can you design Netflix in 45 minutes?"
*   **Feature:** A drag-and-drop canvas (Excalidraw style).
*   **AI Co-Pilot:** As user draws "Load Balancer" -> "Database", AI interrupts: *"Wait, you have a single point of failure here. How do you shard this DB?"*
*   **Why Pro?** Essential for Senior/Staff (L5/L6) roles.

### 3. 📊 Advanced Interview Analytics (The "Gym Tracker" for Coding)
*   **Feature:** Track progress over time.
*   **Charts:** "Confidence Score Trend", "Technical Vocabulary Growth", "Filler Word Usage".
*   **Recordings:** Save full audio/video of mock interviews to re-watch.

### 4. 🏢 Company-Specific "Insider" Mode
*   **Feature:** Unlock "Google Mode", "Netflix Mode", "Amazon Mode".
*   **Differentiation:** Amazon mode enforces "Leadership Principles". Google mode focuses on "Googleyness" and edge cases.

---

## 💡 Recommended First Step: "AI Resume Audit"
It's the top of the funnel. Users need a resume to get the interview. If we fix their resume, they trust us for the interview prep.

**Implementation Plan:**
1.  Create `ResumeUpload` component.
2.  Integrate PDF parsing.
3.  Build the "ATS Scoreboard" UI.
