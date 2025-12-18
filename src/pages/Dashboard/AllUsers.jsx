import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const fetchUsers = useCallback(() => {
    axiosSecure.get("/users").then((res) => {
      console.log("API response:", res);
      setUsers(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);

  useEffect(() => fetchUsers(), [fetchUsers]);
  console.log(users);
  console.log(selectedStatus);

  // User status change ig. block users
  const handleStatusChange = (email, status) => {
    console.log("Button Clicked");
    axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`).then((res) => {
      console.log(res.data);
      fetchUsers();
    });
  };

  // User role change ig. make user to volunteer
  const handleRoleChange = (email, role) => {
    console.log("Make Volunteer Button Clicked");
    axiosSecure.patch(`update/user/role?email=${email}&role=${role}`).then((res) => {
      console.log(res.data);
      fetchUsers();
    });
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
      {/* Filter */}
      <form className="flex flex-wrap gap-1">
        <input
          checked={selectedStatus.includes("active")}
          onChange={() => handleFilterChange("active")}
          className="btn"
          type="checkbox"
          name="frameworks"
          aria-label="Active"
        />
        <input
          checked={selectedStatus.includes("blocked")}
          onChange={() => handleFilterChange("blocked")}
          className="btn"
          type="checkbox"
          name="frameworks"
          aria-label="Blocked"
        />
        <input onClick={handleReset} className="btn btn-square" type="button" value="×" />
      </form>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Header */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Role</th>
              <th>User Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map(
              (user) =>
                user?.status?.includes(selectedStatus) && (
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={user?.userPhotoUrl} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user?.name}</div>
                          <div className="text-sm opacity-50">{user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {user?.role}
                      <br />
                    </td>
                    <td>{user?.status}</td>
                    <th className="flex gap-1">
                      {user?.role == "Donor" && (
                        <>
                          <button onClick={() => handleRoleChange(user?.email, "Volunteer")} className="btn btn-dash btn-xs">
                            Make Volunteer
                          </button>
                          <button onClick={() => handleRoleChange(user?.email, "Admin")} className="btn btn-dash btn-xs">
                            Make Admin
                          </button>
                        </>
                      )}
                      {user?.role == "Volunteer" && (
                        <>
                          <button onClick={() => handleRoleChange(user?.email, "Admin")} className="btn btn-dash btn-xs">
                            Make Admin
                          </button>
                        </>
                      )}
                      {user?.status == "active" ? (
                        <button onClick={() => handleStatusChange(user?.email, "blocked")} className="btn btn-outline btn-error btn-xs">
                          Block
                        </button>
                      ) : (
                        <button onClick={() => handleStatusChange(user?.email, "active")} className="btn btn-outline btn-success btn-xs">
                          Unblock
                        </button>
                      )}
                    </th>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
