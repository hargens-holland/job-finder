# Job Finder & Application Tracking App

A full-stack web application that helps users **find, apply to, and track jobs** using a structured, profile-driven workflow.

This project is designed to act as a personal **job search operating system**, not just a job board.

---

## 🚀 Core Features

- Mandatory profile creation (structured internal resume)
- Explicit “Find Jobs” action (no passive job browsing)
- Job recommendations based on user profile
- Auto-apply and manual apply workflows
- Applied jobs tracking with status updates
- Clean, distraction-free user experience

---

## 🧠 Product Philosophy

- Users define themselves once via a structured profile
- Jobs are only shown when the user intentionally searches
- Applied jobs never reappear in recommendations
- The system continuously recommends the next best job
- The app prioritizes **action over scrolling**

---

## 🧭 User Flow

1. User signs up or logs in
2. User creates a profile (skills, projects, experience, preferences)
3. User lands on a blank home page
4. User clicks **Find Jobs**
5. App shows matched job recommendations
6. User applies (auto or manual)
7. Job moves to Applied Dashboard
8. A new job is recommended automatically

---

## 🗂️ Application Status Pipeline

Saved → Applied → Phone Screen → Interview → Final → Offer → Rejected

yaml
Copy code

---

## 🧱 Tech Stack

### Frontend
- React
- TypeScript
- TailwindCSS

### Backend
- Node.js
- Express
- Prisma ORM

### Database
- PostgreSQL

### Authentication
- JWT-based authentication

---

## 🗃️ Core Data Models

### User
- Owns all application data

### Profile
- Education
- Skills
- Projects
- Experience
- Job preferences

### Job
- Company
- Role
- Location
- Description
- Source

### Application
- Job applied to
- Application date
- Status
- Apply type (auto or manual)

---

## 🧩 Job Matching Logic (MVP)

Jobs are ranked using:
- Skill keyword overlap
- Role matching
- Location matching

Applied jobs are excluded from future recommendations.

---

## 📁 Repository Structure

job-finder/
├── frontend/
├── backend/
├── docs/
│ └── mvp-scope.md
├── README.md
└── .gitignore

yaml
Copy code

---

## 🔒 MVP Scope Lock

All locked MVP rules and constraints are defined in:

/docs/mvp-scope.md

yaml
Copy code

Any feature not explicitly listed there is **out of scope** until the MVP is complete.

---

## 🔮 Future Enhancements (Post-MVP)

- Resume PDF upload
- AI-based semantic job matching
- Job scraping integrations
- Follow-up reminders
- Analytics dashboard

---

## 📌 Why This Project Matters

This project demonstrates:
- Real-world CRUD workflows
- Relational database design
- Authentication and authorization
- Product-driven UX decisions
- End-to-end system architecture

Built to be **used personally**, not just demonstrated.

---

## 📄 License

MIT
