import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const MyRequests = () => {
  const [bloodGroups, setBloodGroups] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [myRequests, setMyRequests] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedStatus, setSelectedStatus] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/blood-groups.json").then((res) => {
      setBloodGroups(res.data.bloodGroups);
    });

    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });

    axiosSecure.get(`/my-donation-requests?page=${currentPage - 1}&size=${itemsPerPage}`).then((res) => {
      console.log("/my-donation-requests", res.data.result);
      setMyRequests(res.data.result);
      setTotalRequests(res.data.totalRequest);
    });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberOfPages = Math.ceil(totalRequests / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  // console.log("currentPage for pagination", currentPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  // console.log(bloodGroups);

  // Handle Checkbox Toggle
  const handleFilterChange = (status) => {
    setSelectedStatus((prevSetSelectedStatus) => {
      if (prevSetSelectedStatus.includes(status)) {
        // Remove if already selected
        return prevSetSelectedStatus.filter((s) => s !== status);
      } else {
        // Add if not selected
        return [...prevSetSelectedStatus, status];
      }
    });
  };

  // Handle Reset
  const handleReset = () => {
    setSelectedStatus([]); // Clear all filters
  };

  return (
    <div>
      {/* Header for Filtering */}
      <div>
        <form className="flex flex-wrap gap-1">
          <input
            checked={selectedStatus.includes("pending")}
            onChange={() => handleFilterChange("pending")}
            className="btn"
            type="checkbox"
            name="frameworks"
            aria-label="Pending"
          />
          <input
            checked={selectedStatus.includes("in_progress")}
            onChange={() => handleFilterChange("in_progress")}
            className="btn"
            type="checkbox"
            name="frameworks"
            aria-label="In Progress"
          />
          <input
            checked={selectedStatus.includes("done")}
            onChange={() => handleFilterChange("done")}
            className="btn"
            type="checkbox"
            name="frameworks"
            aria-label="Done"
          />
          <input
            checked={selectedStatus.includes("cancelled")}
            onChange={() => handleFilterChange("cancelled")}
            className="btn"
            type="checkbox"
            name="frameworks"
            aria-label="Cancelled"
          />
          <input onClick={handleReset} className="btn btn-square" type="reset" value="×" />
        </form>
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Receipient Name</th>
              <th>Receipient Location</th>
              <th>Time & Date</th>
              <th>Hospital</th>
              <th>Blood Group</th>
              <th>Donation Status</th>
              <th>Donor Info</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map(
              (myRequest, index) =>
                myRequest?.request_status?.includes(selectedStatus) && (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{myRequest.recipientName}</td>
                    <td>
                      {upazilas.find((u) => u.id == myRequest?.upazila)?.name}, {districts.find((u) => u.id == myRequest?.district)?.name}
                    </td>
                    <td>
                      {myRequest.donationTime}, {myRequest.donationDate}
                    </td>
                    <td>{myRequest.hospitalName}</td>
                    <td>{bloodGroups.find((g) => g.id == myRequest?.bloodGroup)?.type}</td>
                    <td>{myRequest?.request_status}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center">
        <div className="join flex-wrap">
          <button onClick={handlePrev} className="join-item btn" disabled={currentPage === 1}>
            Previous
          </button>
          {pages.map((page) => (
            <button className={`join-item btn ${page === currentPage ? "btn-active" : ""}`} onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          ))}
          <button onClick={handleNext} className="join-item btn" disabled={currentPage === pages.length}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
