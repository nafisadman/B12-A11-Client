import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
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
      <RecentRequest></RecentRequest>

      {/* Admin */}
      {role == "Admin" && (
        <div>
          <AdminStat></AdminStat>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
