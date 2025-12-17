import React from "react";

const Requests = () => {
  return (
    <div className="min-h-screen">
      {/* Container */}
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card */}
        <div className="card bg-base-100 w-full shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="card bg-base-100 w-full shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="card bg-base-100 w-full shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="card bg-base-100 w-full shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
