import React, { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { Link } from "react-router";

const RecentRequest = () => {
  const axiosSecure = useAxiosSecure();

  const [bloodGroups, setBloodGroups] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [donorRecentRequests, setDonorRecentRequests] = useState([]);

  const fetchUsers = useCallback(() => {
    axios.get("/blood-groups.json").then((res) => {
      setBloodGroups(res.data.bloodGroups);
    });

    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });

    axiosSecure.get("/my-donation-requests-recent").then((res) => {
      console.log("/my-donation-requests-recent", res.data);
      setDonorRecentRequests(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => fetchUsers(), [fetchUsers]);

  return (
    <div>
      {donorRecentRequests.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Receipient Name</th>
                  <th>Receipient Location</th>
                  <th>Time & Date</th>
                  <th>Hospital</th>
                  <th>Blood Group</th>
                  <th>Donation Status</th>
                  <th>Donor Info</th>
                </tr>
              </thead>
              <tbody>
                {donorRecentRequests.map((donorRecentRequest, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{donorRecentRequest.recipientName}</td>
                    <td>
                      {upazilas.find((u) => u.id == donorRecentRequest?.upazila)?.name}, {districts.find((u) => u.id == donorRecentRequest?.district)?.name}
                    </td>
                    <td>{donorRecentRequest.donationTime}, {donorRecentRequest.donationDate}</td>
                    <td>{donorRecentRequest.hospitalName}</td>
                    <td>{bloodGroups.find((g) => g.id == donorRecentRequest?.bloodGroup)?.type}</td>
                    <td>{donorRecentRequest?.request_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/dashboard/my-donation-requests" className="btn">
            View My All Requests
          </Link>
        </>
      )}
    </div>
  );
};

export default RecentRequest;
