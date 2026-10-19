# EkanaVet Enterprise Platform

> Licensed B2B wholesale veterinary pharmaceutical & logistics management platform.

---

## 🌟 Key Features
- **B2B Product Catalog:** Wholesale pricing and inventory for veterinary medicines, vaccines, and supplements.
- **Cart & Order Flow:** Redux Toolkit cart drawer with subtotal calculations.
- **Dual Role Dashboards:**
  - **Admin Portal:** System overview, inventory management, and secured access restricted to local machine.
  - **Employee / Field Logistics:** Route management for Medical Representatives (MRs) and Delivery Agents.
  - **B2B Partner Portal:** Clinic / Retailer purchasing.
- **AI Vet Assistant:** Clinical guidance and symptom-to-medicine advisory interface.

---

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite 7, Tailwind CSS 3.4, Redux Toolkit, React Router v7.
- **Backend:** FastAPI, Uvicorn, SQLAlchemy 2.0, Pydantic v2, Passlib (Bcrypt), Python-JOSE (JWT).
- **Database:** SQLite for development (`sql_app.db`), PostgreSQL ready.

---

## 🚀 Quick Start

### 1. Backend
```bash
cd backend
# With virtual environment:
..\..\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
* **API Docs:** http://127.0.0.1:8000/docs
* **Health Check:** http://127.0.0.1:8000/health

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
* **App URL:** http://localhost:5173

---

## 🔑 Default Admin Credentials
* **Email:** `admin@ekanavet.com`
* **Password:** `admin123`
* **Admin Login Route:** http://localhost:5173/admin/login

---

## 📂 Architecture & Roadmap
For in-depth architecture, data schemas, API specifications, and phased development plans, refer to:
* [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)
* [docs/workplan.pdf](docs/workplan.pdf)
