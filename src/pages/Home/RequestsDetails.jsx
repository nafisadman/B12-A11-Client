import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router"; 
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const RequestsDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); 
  const location = useLocation();

  const [request, setRequest] = useState(null);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [status, setStatus] = useState("inprogress");

  const dummyImage = "https://i.ibb.co/6y1S6vq/blood-donation-placeholder.jpg"; 

  useEffect(() => {
    // Ideally, these static fetches should be cached or context, but keeping as is for now
    axios.get("/blood-groups.json").then((res) => setBloodGroups(res.data.bloodGroups));
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/districts.json").then((res) => setDistricts(res.data.districts));

    axios.get(`https://b12-a11-server-tan.vercel.app/requests/${id}`)
      .then((res) => setRequest(res.data))
      .catch(err => console.error("Failed to fetch details", err));
  }, [id]);

  const handleDonateClick = () => {
    if (!user) {
      navigate("/auth/login", { state: { from: location } }); 
    } else {
      document.getElementById("my_modal_1").showModal();
    }
  };

  const handleConfirmDonation = async (e) => {
    e.preventDefault();
    axiosSecure.patch(`/update/user/request-status?_id=${request?._id}&request_status=${status}&donor_name=${user?.displayName}&donor_email=${user?.email}`)
      .then((res) => {
        alert("Donation status updated successfully");
        setRequest(prev => ({ ...prev, request_status: status }));
        document.getElementById("my_modal_1").close();
      });
  };

  const getDistrictName = (id) => districts.find((d) => d.id == id)?.name || "Unknown District";
  const getUpazilaName = (id) => upazilas.find((u) => u.id == id)?.name || "Unknown Upazila";
  const getBloodGroup = (id) => bloodGroups.find((g) => g.id == id)?.type || "Unknown";

  if (!request) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

  // FIX: Extract images safely
  const images = request?.requestImageUrls || [];
  const mainImage = images.length > 0 ? images[0] : dummyImage;
  const sideImages = images.slice(1); // Get remaining images (index 1, 2...)

  return (
    <div className="bg-base-100 min-h-screen py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-4">
          <div>
             <div className="badge badge-secondary badge-outline mb-2 uppercase text-xs font-bold">
                {request?.request_status}
             </div>
             <h1 className="text-3xl md:text-4xl font-bold text-error">
                {getBloodGroup(request?.bloodGroup)} Blood Needed
             </h1>
             <p className="text-gray-500 mt-1">Posted on: {new Date(request?.createdAt).toLocaleDateString()}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
             {request?.request_status === 'pending' ? (
                <button className="btn btn-primary px-8" onClick={handleDonateClick}>
                  Donate Now
                </button>
              ) : (
                <button className="btn btn-disabled bg-gray-300 text-gray-500 cursor-not-allowed">
                  In Progress / Completed
                </button>
              )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-1 space-y-4">
            {/* Main Image (First Image) */}
            <div className="overflow-hidden rounded-xl border border-base-300 h-64 w-full">
              <img 
                src={mainImage} 
                alt="Main Request" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Secondary Images (Map through remaining images) */}
            {sideImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {sideImages.map((img, idx) => (
                  <div key={idx} className="overflow-hidden rounded-xl border border-base-300 h-32">
                    <img 
                      src={img} 
                      alt={`Evidence ${idx + 2}`} 
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: All Data Details */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Patient & Hospital Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500">Recipient Name</p>
                    <p className="text-lg font-medium">{request?.recipientName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500">Hospital Name</p>
                    <p className="text-lg font-medium">{request?.hospitalName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500">Donation Date</p>
                    <p className="text-lg font-medium">{request?.donationDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500">Donation Time</p>
                    <p className="text-lg font-medium">{request?.donationTime}</p>
                  </div>
                </div>

                <div className="divider">Address Details</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500">Full Address</p>
                    <p className="text-lg">{request?.fullAdressLine}</p>
                  </div>
                  <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-500">Area</p>
                      <p className="text-lg">
                        {getUpazilaName(request?.upazila)}, {getDistrictName(request?.district)}
                      </p>
                  </div>
                </div>

                <div className="divider">Requester Details</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-500">Requester Name</p>
                      <p className="text-lg">{request?.requesterName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-500">Requester Email</p>
                      <p className="text-lg">{request?.requesterEmail}</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-base-200 rounded-lg">
                     <p className="text-sm font-bold text-gray-500 mb-1">Message from Requester:</p>
                     <p className="italic text-gray-700">"{request?.requestMessage}"</p>
                  </div>

              </div>
            </div>
          </div>
        </div>

        {/* Modal for Donation */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Donation</h3>
            <p className="py-4 text-sm text-gray-500">
                You are about to commit to donating blood for this request. 
            </p>
            <form onSubmit={handleConfirmDonation} className="flex flex-col gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Donor Name</span></label>
                <input defaultValue={user?.displayName} type="text" className="input input-bordered w-full" readOnly disabled />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Donor Email</span></label>
                <input defaultValue={user?.email} type="email" className="input input-bordered w-full" readOnly disabled />
              </div>
              <button className="btn btn-primary w-full mt-4">Confirm Donation</button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>

      </div>
    </div>
  );
};

export default RequestsDetails;