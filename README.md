# GridGuard 🌱

A browser-based Neighborhood Energy Simulation Platform that helps users visualize how renewable energy adoption and EV charging affect local power grid stability in real time.

GridGuard enables users to simulate energy demand, analyze grid stress, and understand sustainability impacts through interactive visualizations.

---

## 🚀 Live Demo & Deployments

- **Frontend (Vercel):** [https://grid-guard-inky.vercel.app/](https://grid-guard-inky.vercel.app/)
- **Backend (Railway):** Hosted Node.js API server

---

## 🛠️ Tech Stack

### Frontend
- HTML5 & CSS3
- JavaScript (Vanilla)
- Chart.js (for real-time visualizations)

### Backend & Database
- Node.js & Express.js
- Supabase PostgreSQL
- Supabase Auth (JWT-based authentication)
- bcrypt (for fallback custom password hashing)

### Deployment
- **Frontend:** Vercel
- **Backend API:** Railway
- **Database + Auth:** Supabase

---

## 🧱 Project Structure

```text
gridguard/
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── assets/
│   └── pages/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── .env
│   └── routes/
│       ├── auth.js
│       ├── scenarios.js
│       └── bill.js
│
└── README.md

## System Architecture
[ User ]
                  │
                  ▼
          Frontend (Vercel)
                  │
                  │ Supabase JS Client (Auth + Data Requests)
                  ▼
      Supabase Backend Services
  (PostgreSQL + Authentication + RLS)
                  │
                  ▼
    Node.js / Express Backend (Railway)
                  │
                  ├── Auth Verification (Supabase JWT validation)
                  ├── Scenario Processing
                  └── Bill Analysis Engine
                  │
                  ▼
       [ Response to Frontend ]
