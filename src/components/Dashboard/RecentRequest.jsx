import React, { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RecentRequest = () => {
  const axiosSecure = useAxiosSecure();

  const [donorRecentRequests, setDonorRecentRequests] = useState([]);

  const fetchUsers = useCallback(() => {
    axiosSecure.get("/my-donation-requests-recent").then((res) => {
      console.log("/my-donation-requests-recent", res.data);
      setDonorRecentRequests(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => fetchUsers(), [fetchUsers]);

  return (
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
  );
};

export default RecentRequest;
