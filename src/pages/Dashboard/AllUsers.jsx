import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchUsers = useCallback(() => {
    axiosSecure.get("/users").then((res) => {
      console.log("API response:", res.data);
      setUsers(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);

  useEffect(() => fetchUsers(), [fetchUsers]);
  console.log(users);

  const handleStatusChange = (email, status) => {
    console.log("Button Clicked");
    axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`).then((res) => {
      console.log(res.data);
      fetchUsers();
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user) => (
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
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">{user?.role}</span>
              </td>
              <td>{user?.status}</td>
              <th>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
