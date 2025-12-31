# 🩸 LifeLine - Blood Donation Management System

**LifeLine** is a full-stack platform built to streamline the blood donation process. It bridges the gap between those in need of blood and generous donors through a location-based search and request system. The platform ensures security and transparency by offering role-based access for **Donors**, **Volunteers**, and **Administrators**.

---

## 📸 Screenshot
*(A clean UI featuring a hero section with blood donation calls-to-action and a statistics counter)*

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
