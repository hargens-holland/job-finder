# MVP Scope Lock — Job Finder App

This document defines the **locked MVP behavior** for the Job Finder & Application Tracking App.

Anything not explicitly listed here is **out of scope** for the MVP.

---

## 🎯 Purpose

- Prevent scope creep
- Lock product behavior
- Guide development decisions
- Enable clean future expansion

---

## ✅ Core MVP Rules (Non-Negotiable)

### 1. Mandatory Profile Creation
- Users **must create a profile** before accessing the app.
- The profile acts as a **structured internal resume**.
- If no profile exists, the user is always redirected to profile creation.

---

### 2. Explicit Job Discovery
- Jobs **do not appear automatically** on login.
- Jobs are only fetched after clicking **“Find Jobs”**.
- This enforces intentional, action-based job searching.

---

### 3. Application State Transition
- When a user applies to a job:
  - The job is **removed from recommendations**
  - The job is added to the **Applied Dashboard**
  - Application date and status are recorded

---

### 4. Applied Jobs Dashboard
- All applied jobs live in a dedicated dashboard.
- Each application includes:
  - Date applied
  - Status
- Applied jobs **never reappear** in recommendations.

---

### 5. Continuous Recommendations
- After applying:
  - The system recommends the **next best matching job**
- The user should never run out of jobs during discovery.

---

### 6. Profile Editability
- Users can **edit their profile at any time**.
- Profile changes affect:
  - Future job recommendations
- Existing applications are not affected.

---

## 🚫 Explicitly Out of Scope for MVP

- Resume PDF upload
- AI/embedding-based matching
- Job scraping or external APIs
- Email notifications
- Follow-up reminders
- Analytics dashboards
- Multiple resume versions

---

## 📌 Guiding Principle

> If a feature does not directly support  
> **profile → find jobs → apply → track**,  
> it does not belong in the MVP.

