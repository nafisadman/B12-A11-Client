import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import { Link } from "react-router"; // Ensure this matches your router version (react-router-dom v6 uses 'react-router-dom')
import SkeletonCard from "../../components/SkeletonCard"; 

const Requests = () => {
  const axiosInstance = useAxios();

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1615461066841-6116e61058f5?q=80&w=1000&auto=format&fit=crop";

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const [bgRes, upRes, distRes, reqRes] = await Promise.all([
          axios.get("/blood-groups.json"),
          axios.get("/upazilas.json"),
          axios.get("/districts.json"),
          axiosInstance.get(`/search-request?blood=${bloodGroup}&district=${district}&upazila=${upazila}&status=pending`)
        ]);

        setBloodGroups(bgRes.data.bloodGroups);
        setUpazilas(upRes.data.upazilas);
        setDistricts(distRes.data.districts);
        setPendingRequests(reqRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosInstance, bloodGroup, district, upazila]);

  const getBloodGroupName = (id) => bloodGroups.find((g) => g.id == id)?.type || "Unknown";
  const getDistrictName = (id) => districts.find((d) => d.id == id)?.name || "Unknown";
  const getUpazilaName = (id) => upazilas.find((u) => u.id == id)?.name || "Unknown";

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {loading ? (
          [...Array(8)].map((_, index) => <SkeletonCard key={index} />)
        ) : (
          pendingRequests.map((pendingRequest) => (
            <div
              key={pendingRequest._id}
              className="card bg-base-100 w-full shadow-sm hover:shadow-md transition-shadow h-full border border-gray-100"
            >
              <figure className="relative h-48 w-full bg-gray-200">
                {/* FIX: Access the first image from the array */}
                <img
                  src={pendingRequest.requestImageUrls?.[0] || PLACEHOLDER_IMAGE}
                  alt="Patient Condition"
                  className="h-full w-full object-cover"
                  onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                />
                <div className="absolute top-2 right-2 badge badge-error text-white font-bold">
                  {getBloodGroupName(pendingRequest.bloodGroup)}
                </div>
              </figure>

              <div className="card-body p-5 flex flex-col">
                <h2 className="card-title text-lg font-bold truncate" title={pendingRequest.recipientName}>
                  {pendingRequest.recipientName}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2 flex-grow-0 mb-2">
                  {pendingRequest.requestMessage}
                </p>
                <div className="space-y-1 text-xs text-gray-600 mb-4 flex-grow">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">📅 Date:</span> 
                    {pendingRequest.donationDate} at {pendingRequest.donationTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">📍 Loc:</span> 
                    {getUpazilaName(pendingRequest.upazila)}, {getDistrictName(pendingRequest.district)}
                  </div>
                </div>
                <div className="card-actions mt-auto">
                  <Link to={`/requests/${pendingRequest._id}`} className="btn btn-primary btn-sm w-full">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;