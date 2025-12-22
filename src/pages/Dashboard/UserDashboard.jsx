import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Welcome from "../../components/Dashboard/Welcome";
import AdminStat from "../../components/Dashboard/AdminStat";
import RecentRequest from "../../components/Dashboard/RecentRequest";
// 1. Import the new component
import DonationRequestsChart from "../../components/Dashboard/DonationRequestsChart";

const UserDashboard = () => {
  const { role } = useContext(AuthContext);

  return (
    <div className="p-4"> 
      {/* Welcome */}
      <Welcome></Welcome>

      {/* Donor */}
      {role == "Donor" && <RecentRequest></RecentRequest>}

      {/* Admin & Volunteer */}
      {(role === "Admin" || role === "Volunteer") && (
        <div className="flex flex-col gap-6 mt-6">
            {/* Stats Row */}
            <div className="flex justify-center">
                <AdminStat></AdminStat>
            </div>

            {/* 2. Add Chart Component Here */}
            <DonationRequestsChart></DonationRequestsChart>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;