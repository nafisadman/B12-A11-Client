import React, { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../providers/AuthProvider";

const Donate = () => {
  const axiosInstance = useAxios();

  const { user } = useContext(AuthContext);

  const handleCheckout = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donate_amount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donateAmount,
      donorEmail,
      donorName,
    };
    axiosInstance
      .post("/create-payment-checkout", formData)
      .then((res) => {
        console.log("Donation Frontend", res.data);
        window.location.href = res.data.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Donate!</h1>
          <p className="py-6">
            
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleCheckout} className="fieldset">
              <label className="label">Donation Amount</label>
              <input name="donate_amount" type="text" className="input" placeholder="500" />
              <button className="btn btn-neutral mt-4">Donate</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
