import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import Welcome from "../../components/Dashboard/Welcome";
import AdminStat from "../../components/Dashboard/AdminStat";

const UserDashboard = () => {
  const { role } = useContext(AuthContext);

  const [donorRecentRequests, setDonorRecentRequests] = useState([]);

  return (
    <div>
      {/* Welcome */}
      <Welcome></Welcome>

      {/* Donor */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Receipient Name</th>
              <th>Hospital</th>
              <th>Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {donorRecentRequests.map((donorRecentRequest, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{donorRecentRequest.recipientName}</td>
                <td>{donorRecentRequest.hospitalName}</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
