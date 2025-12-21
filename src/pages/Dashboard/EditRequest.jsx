import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";

const EditRequest = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const [bloodGroups, setBloodGroups] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [currentRequest, setCurrentRequest] = useState("");

  const axiosSecure = useAxiosSecure();

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
      setCurrentRequest(res.data);
      if (res.data.bloodGroup) setBloodGroup(res.data.bloodGroup);
      if (res.data.district) setDistrict(res.data.district);
      if (res.data.upazila) setUpazila(res.data.upazila);
    });
  }, [axiosSecure, id]);

  const handleUpdateRequest = async (e) => {
    e.preventDefault();

    const form = e.target;

    const requesterName = form.requester_name.value;
    const requesterEmail = form.requester_email.value;
    const recipientName = form.recipient_name.value;
    const hospitalName = form.hospital_name.value;
    const fullAdressLine = form.full_address_line.value;
    const donationDate = form.donation_date.value;
    const donationTime = form.donation_time.value;
    const requestMessage = form.request_message.value;

    const formData = {
      requesterName,
      requesterEmail,
      recipientName,
      hospitalName,
      fullAdressLine,
      district,
      upazila,
      bloodGroup: bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
    };

    // axiosSecure
    //   .post("/requests", formData)
    //   .then((res) => {
    //     console.log(res.data.insertedId);
    //   })
    //   .catch((error) => console.log(error));

    axiosSecure
      .patch(`/requests/${id}`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Edit Request!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleUpdateRequest} className="fieldset">
              <label className="label">Requester Name</label>
              <input name="requester_name" type="text" className="input" defaultValue={currentRequest?.displayName} readOnly disabled />
              <label className="label">Requester Email</label>
              <input name="requester_email" type="email" className="input" value={currentRequest?.email} readOnly disabled />
              <label className="label">Recipient Name</label>
              <input name="recipient_name" type="text" className="input" defaultValue={currentRequest?.recipientName} />
              {/* Blood Group Selector */}
              <label className="label">Blood Group</label>
              <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} name="blood_group" className="select">
                <option value="" disabled>
                  -- Select Blood Group --
                </option>
                {bloodGroups?.map((bloodGroup) => (
                  <option value={bloodGroup?.id} key={bloodGroup?.id}>
                    {bloodGroup?.type}
                  </option>
                ))}
              </select>
              {/* District Selector */}
              <label className="label">Recipient District</label>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} name="district" id="" className="select">
                <option value="" disabled>
                  -- Select District --
                </option>
                {districts.map((district) => (
                  <option value={district?.id} key={district?.id}>
                    {district?.name}
                  </option>
                ))}
              </select>
              {/* Upazila Selector */}
              <label className="label">Recipient Upazila</label>
              <select value={upazila} onChange={(e) => setUpazila(e.target.value)} name="upazila" id="" className="select">
                <option value="" disabled>
                  -- Select Upazila --
                </option>
                {upazilas
                  .filter((upazila) => upazila?.district_id == district)
                  .map((upazila) => (
                    <option value={upazila?.id} key={upazila?.id}>
                      {upazila?.name}
                    </option>
                  ))}
              </select>
              {/* Hospital */}
              <label className="label">
                Hospital Name{" "}
                <div className="dropdown dropdown-start">
                  <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                    <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div tabIndex={0} className="card card-sm dropdown-content bg-base-100 rounded-box z-1 w-64 shadow-sm">
                    <div tabIndex={0} className="card-body">
                      <p>Where the donor will go to donate blood</p>
                    </div>
                  </div>
                </div>
              </label>
              <input name="hospital_name" type="text" className="input" defaultValue={currentRequest?.hospitalName} placeholder="Dhaka Medical College" />
              <label className="label">Full Address Line</label>
              <input name="full_address_line" type="text" className="input" defaultValue={currentRequest?.fullAdressLine} placeholder="Secretariat Rd, Dhaka 1000" />
              <label className="label">Donation Date</label>
              <input name="donation_date" type="date" defaultValue={currentRequest?.donationDate} className="input" />
              <label className="label">Donation Time</label>
              <input name="donation_time" type="time" defaultValue={currentRequest?.donationTime} className="input" />
              <label className="label">Request Message</label>
              <textarea
                name="request_message"
                className="textarea"
                defaultValue={currentRequest?.requestMessage}
                placeholder="Explain why do you need blood"
              ></textarea>
              <button className="btn btn-neutral mt-4">Edit Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRequest;
