import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Welcome = () => {
  const { name } = useContext(AuthContext);
  return (
    <div
      className="hero"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1589560486051-2c0f69c32276?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello {name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
