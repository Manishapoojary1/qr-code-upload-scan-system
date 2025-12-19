# QR Code Upload & Scan Management System

## 📌 Project Overview
This is a full-stack web application that allows users to securely upload QR code images, extract QR data, store scan results, and view scan history.  
The project demonstrates QR image processing, authentication, frontend–backend integration, and database storage.

---

## 🎯 Assignment Objective
- Upload QR code images
- Scan and extract QR data
- Store scan results securely
- Display user-specific scan history

---

## ✨ Key Features
- User Registration & Login
- JWT-based Authentication
- QR Code Image Upload (PNG / JPG)
- QR Data Extraction (Text / URL)
- Scan History with Timestamp
- User-specific data access
- Clean and responsive UI

---

## 👤 User Roles
### User
- Register & Login
- Upload QR code images
- View own scan history
- Logout securely

(Admin role optional – not implemented)

---

## 🔐 Authentication
- Passwords hashed using **bcrypt**
- JWT token generated on login
- Protected routes for scan & history
- Token stored securely in browser

---

## 📸 QR Scanning Approach
1. User uploads a QR code image
2. Backend processes the image
3. QR code data is decoded
4. Extracted value is returned to frontend
5. Scan result is stored with timestamp in database

---

## 🧰 Tech Stack

### Frontend
- React.js
- HTML, CSS, JavaScript
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- **MongoDB Atlas**

---

## 🗂 Folder Structure
qr-code-upload-scan-system/
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ │ └── App.js
│
├── qr-backend/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── server.js
│
└── README.md


---

## 🚀 Deployment

### Backend (Render)
🔗 https://qr-backend-nvaj.onrender.com

### Frontend (Render)
🔗 https://qr-frontend-bnxv.onrender.com

---

## ⚙️ How to Run Locally

### Backend
```bash
cd qr-backend
npm install
npm start


### Frontend
cd frontend
npm install
npm start


📸 Screenshots
Login Page
QR Upload & Scan
QR Scan Result
Scan History

🧪 API Endpoints

POST /api/auth/register – Register user
POST /api/auth/login – Login user
POST /api/scan/upload – Upload & scan QR code
GET /api/scan/history – View scan history for logged-in user






