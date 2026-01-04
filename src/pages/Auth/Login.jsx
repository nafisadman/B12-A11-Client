import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const fillCredentials = (email, password) => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = email;
      passwordRef.current.value = password;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        console.log("User signed in: \n", result.user);
        navigate("/");
      })
      .catch((err) => {
        setError("Invalid email or password. Please try again.");
        console.error(err);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            
            <div className="mb-4 p-3 bg-base-200 rounded-lg">
                <p className="text-xs font-bold mb-2 text-center uppercase text-gray-500">Demo Login</p>
                <div className="flex flex-wrap justify-center gap-2">
                    <button 
                        type="button" 
                        onClick={() => fillCredentials('admin@email.com', '123456')} 
                        className="btn btn-xs btn-outline btn-primary"
                    >
                        Admin
                    </button>
                    <button 
                        type="button" 
                        onClick={() => fillCredentials('volunteer@email.com', '123456')} 
                        className="btn btn-xs btn-outline btn-secondary"
                    >
                        Volunteer
                    </button>
                    <button 
                        type="button" 
                        onClick={() => fillCredentials('user@email.com', '123456')} 
                        className="btn btn-xs btn-outline btn-accent"
                    >
                        User
                    </button>
                </div>
            </div>

            <form onSubmit={handleLogin} className="fieldset">
              <label className="label">Email</label>
              <input 
                ref={emailRef}
                name="email" 
                type="email" 
                className="input" 
                placeholder="Email" 
                required 
              />
              <label className="label">Password</label>
              <input 
                ref={passwordRef}
                name="password" 
                type="password" 
                className="input" 
                placeholder="Password" 
                required 
              />
              
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div>
                <p>
                  Don't have an Account?{" "}
                  <Link to="/auth/registration" className="link link-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;