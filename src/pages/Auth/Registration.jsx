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
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

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
  }, []);

  // Form
  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email =  form.email.value.toLowerCase();
    const name = form.name.value;
    const photo = form.photo.files[0];
    const password = form.password.value;

    console.log("\nEmail: ", email, "\nPhoto: ", photo, "\nPassword: ", password);

    // Photo
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      { image: photo },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const userPhotoUrl = res.data.data.display_url;
    console.log(userPhotoUrl);

    const formData = {
      email,
      name,
      userPhotoUrl,
      bloodGroup: bloodGroup,
      district: district,
      upazila: upazila,
    };

    console.log(formData);

    if (res.data.success == true) {
      createUser(email, password)
        .then((result) => {
          const user = result.user;
          updateUser({ displayName: name, photoURL: userPhotoUrl })
            .then(() => {
              axios
                .post("https://b12-a11-server-tan.vercel.app/users", formData)
                .then((res) => {
                  console.log(res.data);
                  setUser({ ...user, displayName: name, photoURL: userPhotoUrl });
                  navigate("/");
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => {
              alert(error.errorCode, error.errorMessage);
              console.log(error);
              setUser(user);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    }

    console.log("Process Completed");
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            
          </p>
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
              <input name="photo" type="file" className="file-input" placeholder="Photo" />
              {/* Blood Group Selector */}
              <label className="label">Blood Group</label>
              <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} name="blood_group" defaultValue="" className="select">
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
              <label className="label">Upazila</label>
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
              <label className="label">Password</label>
              <input name="password" type="password" className="input" placeholder="Password" required />
              <label className="label">Confirm Password</label>
              <input name="confirmPassword" type="password" className="input" placeholder="Password" required />
              <div>
                <p>
                  Already have an Account?{" "}
                  <Link to="/auth/login" className="link link-primary">
                    Sign In
                  </Link>
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
