import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import { Link } from "react-router";

const Requests = () => {
  const axiosInstance = useAxios();

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("/blood-groups.json").then((res) => {
      setBloodGroups(res.data.bloodGroups);
    });

    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });

    axiosInstance.get(`/search-request?blood=${bloodGroup}&district=${district}&upazila=${upazila}&status=pending`).then((res) => {
      // console.log("Browser Output", res.data);
      setPendingRequests(res.data);
    });
  }, [axiosInstance, bloodGroup, district, upazila]);

  console.log(pendingRequests);
  return (
    <div className="min-h-screen">
      {/* Container */}
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card */}
        {pendingRequests.map((pendingRequest) => (
          <div
            key={pendingRequest.id} // or any unique value
            className="card bg-base-100 w-full shadow-sm"
          >
            <div className="card-body">
              <h2 className="card-title">{pendingRequest?.recipientName}</h2>
              <p>
                {upazilas.find((u) => u.id == pendingRequest?.upazila)?.name}, {districts.find((d) => d.id == pendingRequest?.district)?.name}
              </p>
              <p>
                {pendingRequest?.createdAt
                  ? new Date(pendingRequest.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      hour12: true,
                    })
                  : "Loading..."}
              </p>
              <p>{bloodGroups.find((g) => g.id == pendingRequest?.bloodGroup)?.type}</p>
              <div className="card-actions justify-end">
                <Link className="btn btn-primary">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
