import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const MyRequests = () => {
  const [bloodGroups, setBloodGroups] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [myRequests, setMyRequests] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/blood-groups.json").then((res) => {
      setBloodGroups(res.data.bloodGroups);
    });

    axiosSecure.get(`/my-donation-requests?page=${currentPage - 1}&size=${itemsPerPage}`).then((res) => {
      setMyRequests(res.data.result);
      setTotalRequests(res.data.totalRequest);
    });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberOfPages = Math.ceil(totalRequests / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  console.log("currentPage", currentPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  console.log(bloodGroups);

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Receipient Name</th>
              <th>Hospital</th>
              <th>Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map((myRequest, index) => (
              <tr>
                <th>{(currentPage * 10) + (index + 1) - 10}</th>
                <td>{myRequest.recipientName}</td>
                <td>{myRequest.hospitalName}</td>
                <td>{bloodGroups.find(g => g.id == myRequest.bloodGroup)?.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div>
        <button onClick={handlePrev} className="btn" disabled={currentPage === 1}>
          Previous
        </button>
        {pages.map((page) => (
          <button className={`btn ${page === currentPage ? "btn-active" : ""}`} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
        <button onClick={handleNext} className="btn" disabled={currentPage === pages.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MyRequests;
