import axios from "axios";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate } from "react-router";
import GoogleIcon from "../../components/Icons/GoogleIcon";

const Registration = () => {
  useTitle("Registration");

  const { setUser, createUser, updateUser } = use(AuthContext);
  
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
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

    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.files[0];
    const password = form.password.value;
    const bloodGroup = form.blood_group.value;

    console.log("\nEmail: ", email, "\nPhoto: ", photo, "\nPassword: ", password, "\nBlood Group: ", bloodGroup);

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
      password,
      bloodGroup,
      district,
      upazila,
    };

    console.log(formData);

    if (res.data.success == true) {
      createUser(email, password)
        .then((result) => {
          const user = result.user;
          updateUser({ displayName: name, photoUrl: userPhotoUrl })
            .then(() => {
              setUser({ ...user, displayName: name, photoUrl: userPhotoUrl });
              axios
                .post("http://localhost:5000/users", formData)
                .then((res) => console.log(res.data))
                .catch((error) => console.log(error));
            })
            .catch((error) => {
              alert(error.errorCode, error.errorMessage);
              setUser(user);
            });
        })
        .catch((error) => {
          alert(error.errorCode, error.errorMessage);
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
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister} className="fieldset">
              <label className="label">Email</label>
              <input name="email" type="email" className="input" placeholder="rahim@email.com" required />
              <label className="label">Name</label>
              <input name="name" type="text" className="input" placeholder="Rahim" required />
              <label className="label">Photo</label>
              <input name="photo" type="file" className="file-input" placeholder="Photo" />
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
              <div>
                <a className="link link-hover">Forgot password?</a>
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
