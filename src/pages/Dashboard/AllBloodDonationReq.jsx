import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import useTitle from "../../hooks/useTitle";

const AllBloodDonationReq = () => {
  useTitle("All Blood Donation Requests");
  
  const [bloodGroups, setBloodGroups] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [myRequests, setMyRequests] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserRole, setCurrentUserRole] = useState("");

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

    axiosSecure.get(`/users/update`).then((res) => {
      setCurrentUserRole(res.data.role);
    });

    axiosSecure.get(`/admin/all-donation-requests?page=${currentPage - 1}&size=${itemsPerPage}&status=${selectedStatus}`).then((res) => {
      setMyRequests(res.data.result);
      setTotalRequests(res.data.totalRequest);
    });
  }, [axiosSecure, currentPage, itemsPerPage, selectedStatus]);

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

  // Handle Status Button
  const handleStatusUpdate = (id, newStatus) => {
    axiosSecure.patch(`/donation-request-status/${id}`, { status: newStatus }).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        const updatedRequests = myRequests.map((request) => (request._id === id ? { ...request, request_status: newStatus } : request));
        setMyRequests(updatedRequests);
      }
    });
  };

  // Handle Delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this donation request?");

    if (!confirmDelete) return;

    axiosSecure
      .delete(`/requests/${id}`)
      .then(() => {
        setMyRequests((prev) => prev.filter((item) => item._id !== id));
      })
      .catch(console.error);
  };

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
      <h1 className="text-2xl mb-4">All Blood Donation Requests</h1>
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
            checked={selectedStatus.includes("inprogress")}
            onChange={() => handleFilterChange("inprogress")}
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
              {/* <th>Hospital</th> */}
              <th>Blood Group</th>
              <th>Donation Status</th>
              <th>Donor Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map((myRequest, index) => (
              <tr>
                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td>{myRequest.recipientName}</td>
                <td>
                  {upazilas.find((u) => u.id == myRequest?.upazila)?.name}, {districts.find((u) => u.id == myRequest?.district)?.name}
                </td>
                <td>
                  {myRequest.donationTime}, {myRequest.donationDate}
                </td>
                {/* <td>{myRequest.hospitalName}</td> */}
                <td>{bloodGroups.find((g) => g.id == myRequest?.bloodGroup)?.type}</td>
                <td>{myRequest?.request_status}</td>
                <td>
                  {myRequest?.request_status === "inprogress" ? (
                    <>
                      {myRequest?.donorName}
                      <br />
                      {myRequest?.donorEmail}
                    </>
                  ) : (
                    ""
                  )}
                </td>
                <td className="flex gap-1">
                  {currentUserRole == "Admin" && (
                  <>
                    <Link to={`/dashboard/edit-donation-request/${myRequest._id}`} className="btn btn-xs">
                      Edit
                    </Link>
                    <button className="btn btn-xs" onClick={() => handleDelete(myRequest._id)}>
                      Delete
                    </button>
                  </>
                )}
                  <Link to={`/requests/${myRequest._id}`} className="btn btn-xs">
                    View
                  </Link>
                  {myRequest?.request_status === "inprogress" && (
                    <>
                      <button onClick={() => handleStatusUpdate(myRequest._id, "done")} className="btn btn-xs">
                        Done
                      </button>
                      <button onClick={() => handleStatusUpdate(myRequest._id, "canceled")} className="btn btn-xs">
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
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

export default AllBloodDonationReq;
