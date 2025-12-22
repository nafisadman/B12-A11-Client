import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Welcome from "../../components/Dashboard/Welcome";
import AdminStat from "../../components/Dashboard/AdminStat";
import RecentRequest from "../../components/Dashboard/RecentRequest";

const UserDashboard = () => {
  const { role } = useContext(AuthContext);

  return (
    <div>
      {/* Welcome */}
      <Welcome></Welcome>

      {/* Donor */}
      {role == "Donor" && <RecentRequest></RecentRequest>}

      {/* Admin & Volunteer */}
      {(role === "Admin" || role === "Volunteer") && (
        <div>
          <AdminStat></AdminStat>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
