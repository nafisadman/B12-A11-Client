import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import Welcome from "../../components/Dashboard/Welcome";

const UserDashboard = () => {
  const { role } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const [donors, setDonors] = useState(0);
  const [funding, setFunding] = useState(0);
  const [bloodDonationRequest, setBloodDonationRequest] = useState(0);
  const [donorRecentRequests, setDonorRecentRequests] = useState([]);

  const fetchUsers = useCallback(() => {
    axiosSecure.get("/users").then((res) => {
      // console.log(res.data.length);
      setDonors(res.data.length);
    });

    axiosSecure.get("/funding").then((res) => {
      console.log(res.data);

      const totalAmount = res.data.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);

      // console.log(totalAmount);
      setFunding(totalAmount);
    });

    axiosSecure.get("/get-blood-donation-requests-info").then((res) => {
      console.log(res.data.length);
      setBloodDonationRequest(res.data.length);
    });

    axiosSecure.get("/my-donation-requests-recent").then((res) => {
      console.log("/my-donation-requests-recent", res.data);
      setDonorRecentRequests(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => fetchUsers(), [fetchUsers]);

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
                <th>{index+1}</th>
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
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="stat-title">Total user (Donors)</div>
            <div className="stat-value">{donors}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total funding</div>
            <div className="stat-value">{funding}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total blood donation requests:</div>
            <div className="stat-value">{bloodDonationRequest}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
