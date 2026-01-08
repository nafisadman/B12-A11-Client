import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddRequest = () => {
  const { user } = useContext(AuthContext);

  const [bloodGroups, setBloodGroups] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  
  // Form State
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  
  // Loading State for smoother UX during multiple uploads
  const [isUploading, setIsUploading] = useState(false);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/blood-groups.json").then((res) => setBloodGroups(res.data.bloodGroups));
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/districts.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    const form = e.target;

    // 1. Get all files
    const imageFiles = form.request_images.files;

    // Validation: Check if user selected more than 3 images
    if (imageFiles.length > 3) {
      alert("You can only upload a maximum of 3 images.");
      return;
    }

    if (imageFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setIsUploading(true); // Start loading state

    const requesterName = form.requester_name.value;
    const requesterEmail = form.requester_email.value;
    const recipientName = form.recipient_name.value;
    const hospitalName = form.hospital_name.value;
    const fullAdressLine = form.full_address_line.value;
    const donationDate = form.donation_date.value;
    const donationTime = form.donation_time.value;
    const requestMessage = form.request_message.value;

    try {
      // 2. Create an array of upload promises
      const uploadPromises = [];
      
      // Loop through selected files and prepare upload requests
      for (let i = 0; i < imageFiles.length; i++) {
        const formData = new FormData();
        formData.append("image", imageFiles[i]);

        const uploadRequest = axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
          formData, // axios handles Content-Type for FormData automatically, but you can keep headers if preferred
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        
        uploadPromises.push(uploadRequest);
      }

      // 3. Wait for ALL images to upload
      const responses = await Promise.all(uploadPromises);
      
      // 4. Extract URLs from all responses
      const imageUrls = responses.map(res => res.data.data.display_url);

      // Check if all uploads were successful (optional strict check)
      if (imageUrls.length > 0) {
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
          requestImageUrls: imageUrls, // CHANGED: Sending an Array of URLs
          request_status: "pending",
        };

        // 5. Send data to your server
        axiosSecure
          .post("/requests", formData)
          .then((res) => {
            console.log("Request added ID:", res.data.insertedId);
            alert("Request Added Successfully!");
            // Optional: form.reset();
          })
          .catch((error) => console.log(error))
          .finally(() => setIsUploading(false)); // Stop loading
      }
    } catch (error) {
      console.error("Image upload failed or Server Error", error);
      alert("Failed to upload images. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Add Request!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRequest} className="fieldset">
              <label className="label">Requester Name</label>
              <input name="requester_name" type="text" className="input" value={user?.displayName} readOnly disabled />
              
              <label className="label">Requester Email</label>
              <input name="requester_email" type="email" className="input" value={user?.email} readOnly disabled />
              
              <label className="label">Recipient Name</label>
              <input name="recipient_name" type="text" className="input" placeholder="Karim" required />

              {/* UPDATED IMAGE UPLOAD FIELD */}
              <label className="label">Medical Documents (Max 3)</label>
              <input 
                name="request_images" 
                type="file" 
                className="file-input w-full max-w-xs" 
                multiple // Allows selecting multiple files
                accept="image/*" // Restrict to images only
                required 
              />
              <span className="label-text-alt text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple images</span>

              {/* Blood Group Selector */}
              <label className="label">Blood Group</label>
              <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} name="blood_group" className="select" required>
                <option value="" disabled>-- Select Blood Group --</option>
                {bloodGroups?.map((bg) => (
                  <option value={bg?.id} key={bg?.id}>{bg?.type}</option>
                ))}
              </select>

              {/* District Selector */}
              <label className="label">Recipient District</label>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} name="district" className="select" required>
                <option value="" disabled>-- Select District --</option>
                {districts.map((dist) => (
                  <option value={dist?.id} key={dist?.id}>{dist?.name}</option>
                ))}
              </select>

              {/* Upazila Selector */}
              <label className="label">Recipient Upazila</label>
              <select value={upazila} onChange={(e) => setUpazila(e.target.value)} name="upazila" className="select" required>
                <option value="" disabled>-- Select Upazila --</option>
                {upazilas
                  .filter((upz) => upz?.district_id == district)
                  .map((upz) => (
                    <option value={upz?.id} key={upz?.id}>{upz?.name}</option>
                  ))}
              </select>

              <label className="label">Hospital Name</label>
              <input name="hospital_name" type="text" className="input" placeholder="Dhaka Medical College" required />
              
              <label className="label">Full Address Line</label>
              <input name="full_address_line" type="text" className="input" placeholder="Secretariat Rd, Dhaka 1000" required />

              <label className="label">Donation Date</label>
              <input name="donation_date" type="date" className="input" required />
              
              <label className="label">Donation Time</label>
              <input name="donation_time" type="time" className="input" required />
              
              <label className="label">Request Message</label>
              <textarea name="request_message" className="textarea" placeholder="Explain why do you need blood" required></textarea>
              
              <button 
                className="btn btn-neutral mt-4" 
                disabled={isUploading}
              >
                {isUploading ? "Uploading Images..." : "Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;