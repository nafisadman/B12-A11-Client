import React from "react";
import { Link } from "react-router";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("LifeLine");
  return (
    <div>
      {/* Hero with overlay image */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Donate Blood, <br /> Save a Life Today.
            </h1>
            <p className="mb-5">Your blood is precious: It gives life to another. Join our community of heroes and make a difference.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link to="/auth/registration">
                <button className="btn btn-neutral">Join as a donor</button>
              </Link>
              <Link to="/search">
                <button className="btn btn-neutral btn-outline">Search Donors</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Homepage Statistics */}
      <div className="flex justify-center py-9">
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-value text-center">12,050</div>
            <div className="stat-desc text-center">Happy Donors</div>
          </div>

          <div className="stat">
            <div className="stat-value text-center">50</div>
            <div className="stat-desc text-center">Awards Won</div>
          </div>

          <div className="stat">
            <div className="stat-value text-center">35,200</div>
            <div className="stat-desc text-center">Happy Recipients</div>
          </div>
        </div>
      </div>
      {/* Contact Us Section */}
      <div className="hero bg-base-200 py-9">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Contact us!</h1>
            <p className="py-6">The donation process from the time you arrive center until the time you leave</p>
            <p className="text-xl font-semibold">📞 +880 123 456 789</p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="label">Message</label>
                <textarea className="textarea" placeholder="Your message..."></textarea>
                <button className="btn btn-neutral mt-4">Send Message</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
