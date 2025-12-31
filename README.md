# 🩸 LifeLine - Blood Donation Management System

**LifeLine** is a full-stack platform built to streamline the blood donation process. It bridges the gap between those in need of blood and generous donors through a location-based search and request system. The platform ensures security and transparency by offering role-based access for **Donors**, **Volunteers**, and **Administrators**.

---

## 📸 Screenshot
<p align="center">
  <img src="https://i.ibb.co/6RjDPmFf/image-fotor-20251231231024.jpg" alt="LifeLine Screenshot" />
</p>

---

## 🚀 Core Features

- **Role-Based Dashboards**  
  Distinct interfaces and permissions for Donors, Volunteers, and Admins.

- **Dynamic Search**  
  Search for donors/requests filtered by **Blood Group**, **District**, and **Upazila**.

- **Donation Request Management**  
  Create, update, delete, and track blood donation requests.

- **Real-time Statistics**  
  Visual data representation using **Recharts** for donation trends and platform usage.

- **Dynamic Theming**  
  Custom UI themes that automatically change based on the logged-in user's role.

- **Secure Authentication**  
  Integrated **Firebase Authentication** with private routing and status-based access control (e.g., blocked users).

- **Funding System**  
  Secure payment gateway integration for community donations.

---

## 🛠️ Technologies Used

### Frontend
- React.js  
- React Router 7  
- Tailwind CSS  
- DaisyUI  

### State & Logic
- Context API (`AuthContext`)  
- Custom Hooks (`useAxiosSecure`, `useTheme`)  

### Backend Communication
- Axios (with interceptors for JWT/Token handling)

### Data Visualization
- Recharts (Bar Charts for donation requests)

### Authentication
- Firebase Authentication

### Notifications
- React Hot Toast

---

## 📦 Dependencies

```json
{
  "react": "^19.0.0",
  "react-router": "^7.0.0",
  "firebase": "^11.0.0",
  "axios": "^1.7.0",
  "recharts": "^2.15.0",
  "react-icons": "^5.4.0",
  "react-hot-toast": "^2.5.0",
  "daisyui": "^5.0.0"
}

## ⚙️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/username/lifeline-client.git
cd lifeline-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Firebase and ImgBB keys:
```env
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_IMGBB_KEY=your_imgbb_api_key
```

### 4. Start the Development Server
```bash
npm run dev
```

### 5. Access the App
Open `http://localhost:5173` in your browser.

## 🔗 Relevant Resources
- **Server Repository:** [LifeLine Server](https://github.com/username/lifeline-server)
- **API Documentation:** [Vercel Deployment](https://your-api-url.vercel.app)
- **Firebase Console:** [Firebase Project](https://console.firebase.google.com)
