import React from "react";
import { Link } from "react-router";
import useTitle from "../../hooks/useTitle";
import { motion } from "framer-motion";

const Home = () => {
  useTitle("LifeLine");

  const transition = {
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01],
  };

  return (
    <div>
      {/* Hero with overlay image */}
      <motion.div
        className="hero min-h-[60vh] overflow-hidden relative"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 12,
          ease: "easeOut",
        }}
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <motion.div className="max-w-md" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.h1 className="mb-5 text-5xl font-bold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Donate Blood, <br /> Save a Life Today.
            </motion.h1>
            <motion.p className="mb-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              Your blood is precious: It gives life to another. Join our community of heroes and make a difference.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link to="/auth/registration">
                <motion.button className="btn btn-neutral" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Join as a donor
                </motion.button>
              </Link>
              <Link to="/search">
                <motion.button className="btn btn-neutral btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Search Donors
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Visual hint to the next section. */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <a href="#stats" className="btn btn-circle btn-neutral text-neutral-content">
          ↓
        </a>
      </div>

      {/* Homepage Statistics */}
      <div id="stats" className="flex justify-center py-9">
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
