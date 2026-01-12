import axios from "axios";
import React, { use, useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router";

const Registration = () => {
  useTitle("Registration");

  const navigate = useNavigate();
  const { setUser, createUser, updateUser } = use(AuthContext);

  const [bloodGroups, setBloodGroups] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  
  // Form State
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {
    axios.get("/blood-groups.json").then((res) => setBloodGroups(res.data.bloodGroups));
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/districts.json").then((res) => setDistricts(res.data.districts));
  }, []);

  // Form
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); 

    const form = e.target;
    const email = form.email.value.toLowerCase();
    const name = form.name.value;
    const photo = form.photo.files[0];
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    if (!bloodGroup || !district || !upazila) {
      setError("Please select all location and blood group fields.");
      return;
    }

    try {
      // Photo Upload
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        { image: photo },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const userPhotoUrl = res.data.data.display_url;

      const formData = {
        email,
        name,
        userPhotoUrl,
        bloodGroup,
        district,
        upazila,
      };

      if (res.data.success) {
        // Firebase
        createUser(email, password)
          .then((result) => {
            const user = result.user;
            updateUser({ displayName: name, photoURL: userPhotoUrl })
              .then(() => {
                axios
                  .post("https://b12-a11-server-tan.vercel.app/users", formData)
                  .then((res) => {
                    setUser({ ...user, displayName: name, photoURL: userPhotoUrl });
                    navigate("/");
                  })
                  .catch((error) => setError(error.message));
              })
              .catch((error) => setError(error.message));
          })
          .catch((error) => setError(error.message));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to upload image or register. Please try again.");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister} className="fieldset">
              {/* Personal Information */}
              <label className="label">Email</label>
              <input name="email" type="email" className="input" placeholder="rahim@email.com" required />
              
              <label className="label">Name</label>
              <input name="name" type="text" className="input" placeholder="Rahim" required />
              
              <label className="label">Photo</label>
              <input name="photo" type="file" className="file-input" required />
              
              {/* Blood Group Selector */}
              <label className="label">Blood Group</label>
              <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} name="blood_group" className="select" required>
                <option value="" disabled>-- Select Blood Group --</option>
                {bloodGroups?.map((bg) => (
                  <option value={bg?.id} key={bg?.id}>{bg?.type}</option>
                ))}
              </select>

              {/* District Selector */}
              <label className="label">District</label>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} name="district" className="select" required>
                <option value="" disabled>-- Select District --</option>
                {districts.map((dist) => (
                  <option value={dist?.id} key={dist?.id}>{dist?.name}</option>
                ))}
              </select>

              {/* Upazila Selector */}
              <label className="label">Upazila</label>
              <select value={upazila} onChange={(e) => setUpazila(e.target.value)} name="upazila" className="select" required>
                <option value="" disabled>-- Select Upazila --</option>
                {upazilas
                  .filter((upz) => upz?.district_id == district)
                  .map((upz) => (
                    <option value={upz?.id} key={upz?.id}>{upz?.name}</option>
                  ))}
              </select>

              <label className="label">Password</label>
              <input name="password" type="password" className="input" placeholder="Password" required />
              
              <label className="label">Confirm Password</label>
              <input name="confirmPassword" type="password" className="input" placeholder="Confirm Password" required />
              
              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div>
                <p>
                  Already have an Account?{" "}
                  <Link to="/auth/login" className="link link-primary">Sign In</Link>
                </p>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;