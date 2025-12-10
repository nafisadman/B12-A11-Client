import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import useTitle from "../../hooks/useTitle";

const Registration = () => {
  useTitle("Registration");

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const photo = form.photo.files[0];
    const password = form.password.value;

    console.log(
      "\nEmail: ",
      email,
      "\nPhoto: ",
      photo,
      "\nPassword: ",
      password
    );

    // Photo
    const imgbbUploadPromise = axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      { image: photo },
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    try {
      const imgbbResponse = await toast.promise(imgbbUploadPromise, {
        loading: "Uploading image...",
        success: <b>Image uploaded successfully!</b>,
        error: <b>Failed to upload image.</b>,
      });
      console.log(imgbbResponse.data.data.display_url);
    } catch (error) {
      console.log(error);
    }
    return;
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister} className="fieldset">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Photo</label>
              <input
                name="photo"
                type="file"
                className="file-input"
                placeholder="Photo"
              />
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
                required
              />
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
