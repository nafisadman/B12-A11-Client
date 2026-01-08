import React from "react";

const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 w-full shadow-sm border border-gray-100 h-full">
      {/* Image Skeleton */}
      <div className="skeleton h-48 w-full rounded-b-none"></div>

      <div className="card-body p-5">
        {/* Title Skeleton */}
        <div className="skeleton h-6 w-3/4 mb-4"></div>

        {/* Description Skeleton (2 lines) */}
        <div className="skeleton h-4 w-full mb-2"></div>
        <div className="skeleton h-4 w-2/3 mb-4"></div>

        {/* Meta Info Skeleton (Date & Location) */}
        <div className="skeleton h-3 w-1/2 mb-2"></div>
        <div className="skeleton h-3 w-1/2 mb-4"></div>

        {/* Button Skeleton */}
        <div className="card-actions mt-auto">
          <div className="skeleton h-8 w-full rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;