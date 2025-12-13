import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const AddRequest = () => {
  const { user } = useContext(AuthContext);

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();

    const form = e.target;

    const requesterName = form.requester_name.value;
    const requesterEmail = form.requester_email.value;
    const recipientName = form.recipient_name.value;
    const hospitalName = form.hospital_name.value;
    const fullAdressLine = form.full_address_line.value;
    const bloodGroup = form.blood_group.value;
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
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
      request_status: "pending",
    };

    axiosInstance
      .post("/requests", formData)
      .then((res) => {
        console.log(res.data.insertedId);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Add Request!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRequest} className="fieldset">
              <label className="label">Requester Name</label>
              <input name="requester_name" type="text" className="input" value={user?.displayName} readOnly disabled />
              <label className="label">Requester Email</label>
              <input name="requester_email" type="email" className="input" value={user?.email} readOnly disabled />
              <label className="label">Recipient Name</label>
              <input name="recipient_name" type="text" className="input" placeholder="Karim" />
              {/* District Selector */}
              <label className="label">Recipient District</label>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} name="district" id="" defaultValue="" className="select">
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
              <select value={upazila} onChange={(e) => setUpazila(e.target.value)} name="upazila" id="" defaultValue="" className="select">
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
              <label className="label">Hospital Name</label>
              <input name="hospital_name" type="text" className="input" placeholder="Dhaka Medical College" />
              <label className="label">Full Address Line</label>
              <input name="full_address_line" type="text" className="input" placeholder="Secretariat Rd, Dhaka 1000" />
              {/* Blood Group Selector */}
              <label className="label">Blood Group</label>
              <select name="blood_group" defaultValue="" className="select">
                <option value="" disabled>
                  -- Select Blood Group --
                </option>
                <option value="a+">A+</option>
                <option value="a-">A-</option>
                <option value="b+">B+</option>
                <option value="b-">B-</option>
                <option value="ab+">AB+</option>
                <option value="ab-">AB-</option>
                <option value="o+">O+</option>
                <option value="o-">O-</option>
              </select>
              <label className="label">Donation Date</label>
              <input name="donation_date" type="date" className="input" />
              <label className="label">Donation Time</label>
              <input name="donation_time" type="time" className="input" />
              <label className="label">Request Message</label>
              <textarea name="request_message" className="textarea" placeholder="Explain why do you need blood"></textarea>
              <button className="btn btn-neutral mt-4">Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;
