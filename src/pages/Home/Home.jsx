import React from "react";
import { Link } from "react-router"; // Reverted to your original import
import useTitle from "../../hooks/useTitle";
import { motion } from "framer-motion";

const Home = () => {
  useTitle("LifeLine");

  // Keep your original transition settings
  const transition = {
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01],
  };

  // Data for new sections
  const processes = [
    { title: "Registration", desc: "Sign up and fill out a simple health form." },
    { title: "Screening", desc: "A mini-physical checkup to ensure safety." },
    { title: "Donation", desc: "The actual blood draw takes only 10 mins." },
    { title: "Refreshment", desc: "Enjoy a snack and drink to replenish." },
  ];

  const donationTypes = [
    { title: "Whole Blood", time: "15 min" },
    { title: "Platelets", time: "2 hours" },
    { title: "Plasma", time: "1 hour" },
  ];

  const faqs = [
    { q: "Is it painful?", a: "Only a slight pinch when the needle is inserted." },
    { q: "How often can I donate?", a: "Every 56 days for whole blood." },
    { q: "How long does it take?", a: "About 45-60 minutes total." },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section (Your Original Code) */}
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

      {/* Visual hint (Your Original Code) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <a href="#stats" className="btn btn-circle btn-neutral text-neutral-content">
          ↓
        </a>
      </div>

      {/* 2. Statistics (Your Original Code) */}
      <div id="stats" className="flex justify-center py-9 bg-base-100">
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

      {/* 3. NEW: Mission / About */}
      <div className="hero bg-base-200 py-16">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="py-6 text-lg">
              We connect donors with those in need to ensure no life is lost due to a lack of blood. 
              Our technology makes the process seamless, fast, and secure.
            </p>
          </div>
        </div>
      </div>

      {/* 4. NEW: Process (Steps) */}
      <div className="py-16 bg-white container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {processes.map((step, i) => (
            <div key={i} className="card bg-base-100 shadow-md border border-base-200">
              <div className="card-body text-center items-center">
                <div className="badge badge-neutral badge-lg mb-2">{i + 1}</div>
                <h3 className="card-title">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. NEW: Services (Donation Types) */}
      <div className="py-16 bg-base-200">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Donation Types</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {donationTypes.map((type, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="card w-80 bg-white shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-red-600">{type.title}</h2>
                <p>Takes about {type.time}. Helps trauma patients and surgeries.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. NEW: Urgent Request (Call to Action Highlight) */}
      <div className="bg-red-600 text-white py-12 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Emergency Alert: O- Negative Needed</h2>
            <p>Hospitals are facing a critical shortage.</p>
          </div>
          <button className="btn btn-white text-red-600 border-none">Find Center</button>
        </div>
      </div>

      {/* 7. NEW: Testimonials */}
      <div className="py-16 bg-base-100 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Voices of Hope</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="italic">"The process was so easy. The staff made me feel like a hero."</p>
              <div className="font-bold mt-2">- Sarah J., Donor</div>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="italic">"I am alive today thanks to a stranger's donation."</p>
              <div className="font-bold mt-2">- Mike R., Recipient</div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. NEW: Blogs / Updates */}
      <div className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Who Can Donate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Basic Requirements */}
            <div className="card bg-base-100 shadow-xl border-t-4 border-green-500">
              <div className="card-body">
                <h3 className="card-title">Basic Requirements</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 mt-2">
                  <li>Must be 18 - 65 years old</li>
                  <li>Weight at least 50kg (110lbs)</li>
                  <li>Pulse rate between 60-100 bpm</li>
                  <li>Hemoglobin level 12.5g/dL+</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Frequency */}
            <div className="card bg-base-100 shadow-xl border-t-4 border-blue-500">
              <div className="card-body">
                <h3 className="card-title">Safe Frequency</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 mt-2">
                  <li>Whole Blood: Every 56 days</li>
                  <li>Platelets: Every 7 days</li>
                  <li>Plasma: Every 28 days</li>
                  <li>Double Red Cells: Every 112 days</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Temporary Deferrals */}
            <div className="card bg-base-100 shadow-xl border-t-4 border-red-500">
              <div className="card-body">
                <h3 className="card-title">You Cannot Donate If...</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 mt-2">
                  <li>You have a cold or flu today</li>
                  <li>Got a tattoo in last 6 months</li>
                  <li>Pregnant or breastfeeding</li>
                  <li>Taking antibiotics currently</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 9. NEW: FAQ Section */}
      <div className="py-16 bg-white container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>
        <div className="join join-vertical w-full">
          {faqs.map((f, i) => (
            <div key={i} className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" defaultChecked={i === 0} />
              <div className="collapse-title text-xl font-medium">{f.q}</div>
              <div className="collapse-content"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Contact Us (Your Original Code) */}
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
      
      {/* 11. EXTRA: Newsletter */}
      <div className="bg-neutral text-neutral-content py-10 text-center">
        <h3 className="text-xl font-bold mb-4">Subscribe for Updates</h3>
        <div className="join">
          <input className="input input-bordered join-item text-black" placeholder="Email" />
          <button className="btn btn-primary join-item">Subscribe</button>
        </div>
      </div>

    </div>
  );
};

export default Home;