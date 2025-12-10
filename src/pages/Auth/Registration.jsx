import axios from "axios";
import React, { use } from "react";
import toast from "react-hot-toast";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate } from "react-router";

const Registration = () => {
  useTitle("Registration");

  const { user, setUser, signInWithGoogle } = use(AuthContext);

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

  const handleRegisterWithGoogle = () => {
    console.log("Registered with Google Successfully");
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        Navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
            {/* Google */}
            <button
              onClick={handleRegisterWithGoogle}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Register with Google
            </button>
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
