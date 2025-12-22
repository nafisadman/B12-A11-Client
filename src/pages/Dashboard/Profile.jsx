import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  useTitle("My Profile");

  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const { user, setUser, updateUser } = use(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [currentUser, setCurrentUser] = useState("");

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

    axiosSecure.get("/users/update").then((res) => {
      console.log("/users/update", res.data);
      setCurrentUser(res.data);
      if (res.data.bloodGroup) setBloodGroup(res.data.bloodGroup);
      if (res.data.district) setDistrict(res.data.district);
      if (res.data.upazila) setUpazila(res.data.upazila);
    });
  }, [axiosSecure]);

  // Form
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoFile = form.photo.files[0];

    let userPhotoUrl = currentUser.userPhotoUrl;

    try {
      if (photoFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", photoFile);

        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, imageFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          userPhotoUrl = res.data.data.display_url;
        }
      }

      const formData = {
        name,
        userPhotoUrl,
        bloodGroup,
        district,
        upazila,
      };

      await updateUser({ displayName: name, photoURL: userPhotoUrl });

      const dbResponse = await axiosSecure.patch(`/users/${currentUser.email}`, formData);

      if (dbResponse.data.modifiedCount > 0 || dbResponse.data.acknowledged) {
        console.log("Database updated successfully");

        setCurrentUser((prev) => ({
          ...prev,
          name: name,
          userPhotoUrl: userPhotoUrl,
          bloodGroup: bloodGroup,
          district: district,
          upazila: upazila,
        }));

        // Update local state so the UI reflects changes immediately
        setUser((prev) => ({ ...prev, displayName: name, photoURL: userPhotoUrl }));

        alert("Profile Updated Successfully!");
      }
    } catch (error) {
      console.error("Update failed", error);
      alert(error.message);
    }

    setIsEditing(false);
  };
  return (
    <div>
      <h1 className="text-2xl mb-4">My Profile</h1>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Update Profile!</h1>
            <p className="py-6">
              
            </p>
            <div className="avatar">
              <div className="w-24 rounded">
                <img src={currentUser.userPhotoUrl || "https://img.daisyui.com/images/profile/demo/batperson@192.webp"} alt="Profile" />
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              {!isEditing && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(true);
                  }}
                  className="btn btn-neutral mt-4"
                >
                  Edit
                </button>
              )}

              <form onSubmit={handleUpdate} className="fieldset">
                {/* Personal Information */}
                <label className="label">Email</label>
                <input defaultValue={currentUser.email} name="email" type="email" className="input" readOnly disabled required />
                <label className="label">Name</label>
                <input defaultValue={currentUser.name} name="name" type="text" className="input" placeholder="Rahim" required disabled={!isEditing} />
                <label className="label">Photo</label>
                <input name="photo" type="file" className="file-input" placeholder="Photo" disabled={!isEditing} />
                {/* Blood Group Selector */}
                <label className="label">Blood Group</label>
                <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} name="blood_group" className="select" disabled={!isEditing}>
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
                <label className="label">District</label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} name="district" id="" className="select" disabled={!isEditing}>
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
                <label className="label">Upazila</label>
                <select value={upazila} onChange={(e) => setUpazila(e.target.value)} name="upazila" id="" className="select" disabled={!isEditing}>
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
                {isEditing && <button className="btn btn-neutral mt-4">Save</button>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
