# GridGuard 🌱

A browser-based Neighborhood Energy Simulation Platform that helps users visualize how renewable energy adoption and EV charging affect local power grid stability in real time.

GridGuard enables users to simulate energy demand, analyze grid stress, and understand sustainability impacts through interactive visualizations.

---

## Table of Contents

- [🚀 Live Demo & Deployments](#-live-demo--deployments)
- [🛠️ Tech Stack](#️-tech-stack)
- [🧱 Project Structure](#-project-structure)
- [📋 System Architecture](#-system-architecture)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🔐 Demo Account](#-demo-account)
- [📡 API Endpoints](#-api-endpoints)
- [🐛 Troubleshooting](#-troubleshooting)

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

```
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
```

---

## 📋 System Architecture

```
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
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js installed (LTS version from https://nodejs.org)
- Supabase account and project

### Step 1: Install Backend Packages

Open Command Prompt inside the backend folder:

```bash
cd gridguard/backend
npm install
```

This installs all packages from `package.json` automatically.

### Step 2: Configure Environment Variables

Create or update the `.env` file in the `backend/` folder with your Supabase credentials:

```env
PORT=3000
JWT_SECRET=gridguard_secret_key_change_this

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_key_here
```

**Important:** Replace the placeholder values with your actual Supabase project credentials.

### Step 3: Start the Backend

In Command Prompt inside the backend folder:

```bash
node server.js
```

You should see output similar to:
```
Supabase connected.
GridGuard running at http://localhost:3000
```

### Step 4: Open the Application

Go to `http://localhost:3000` in your browser.

---

## 🔐 Demo Account

Register a new account through the app, or use the demo button which logs in with:

- **Email:** demo@gridguard.app
- **Password:** demo123

*Note: The demo account must be registered first through the Sign Up page.*

---

## 📡 API Endpoints

| Method | Endpoint | Auth Required |
|--------|----------|---|
| POST | `/api/auth/register` | No |
| POST | `/api/auth/login` | No |
| GET | `/api/auth/me` | Yes |
| POST | `/api/scenarios` | Yes |
| GET | `/api/scenarios` | Yes |
| DELETE | `/api/scenarios/:id` | Yes |
| POST | `/api/bill` | Yes |
| GET | `/api/bill` | Yes |
| GET | `/api/bill/:month` | Yes |
| GET | `/api/health` | No |

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
Change the `PORT` value in `.env` to an available port (e.g., 3001) and restart the backend.

### Supabase Connection Fails
- Verify your `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are correct in `.env`
- Check that your Supabase project is active
- Ensure the service key has appropriate permissions

### Frontend Doesn't Load
- Ensure the backend server is running at `http://localhost:3000`
- Check browser console for any network errors
- Verify CORS settings if backend is on a different domain

### Authentication Issues
- Clear browser cookies and local storage
- Verify JWT_SECRET is set correctly
- Check Supabase Auth configuration in your project settings

---

**Last Updated:** June 2026
