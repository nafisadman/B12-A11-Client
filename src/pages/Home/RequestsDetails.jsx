import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const RequestsDetails = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);
  console.log(user);

  const axiosSecure = useAxiosSecure();

  const [request, setRequest] = useState();
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [status, setStatus] = useState("inprogress");

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

    axiosSecure.get(`/requests/${id}`).then((res) => {
      console.log(res);
      setRequest(res.data);
    });
  }, [axiosSecure, id]);

  console.log("request", request);

  const handleConfirmDonation = async (e) => {
    e.preventDefault();

    console.log("Confirm Button");

    axiosSecure.patch(`/update/user/request-status?_id=${request?._id}&request_status=${status}&donor_name=${user?.displayName}&donor_email=${user?.email}`).then((res) => {
      alert(status, "Updated successfully");
      console.log(res.data);
    });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-5xl font-bold">Request Details</h1>
            <div className="py-6">
              {/* <p>Requester Name: {request?._id}</p> */}
              <p>Requester Name: {request?.recipientName}</p>
              <p>Hospital Name: {request?.hospitalName}</p>
              <p>Full Address Line: {request?.fullAdressLine}</p>
              <p>Donation Time: {request?.donationTime}</p>
              <p>Donation Date: {request?.donationDate}</p>
              <p>Upazila: {upazilas.find((u) => u.id == request?.upazila)?.name}</p>
              <p>District: {districts.find((d) => d.id == request?.district)?.name}</p>
              <p>Blood Group: {bloodGroups.find((g) => g.id == request?.bloodGroup)?.type}</p>
              <p>Request Message: {request?.requestMessage}</p>
              <p>Requester Email: {request?.requesterEmail}</p>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {request?.request_status=='pending' ? (
              <>
                <button className="btn btn-primary" onClick={() => document.getElementById("my_modal_1").showModal()}>
                  Donate
                </button>
              </> ):(
              <>
                <button className="btn btn-primary" disabled onClick={() => document.getElementById("my_modal_1").showModal()}>
                  In Progress
                </button>
              </>
            )
            }

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Donate!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <form onSubmit={handleConfirmDonation} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                  <legend className="fieldset-legend">Donation Form</legend>

                  <label className="label">Donor Name</label>
                  <input defaultValue={user?.displayName || "displayName"} type="email" className="input" placeholder="Email" readOnly disabled />

                  <label className="label">Donor Email</label>
                  <input defaultValue={user?.email} type="email" className="input" placeholder="Password" readOnly disabled />

                  <button className="btn btn-neutral mt-4">Confirm</button>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsDetails;
