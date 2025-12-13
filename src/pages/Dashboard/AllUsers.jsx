import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);

  useEffect(() => {
    if (!user) return;
    axiosSecure.get("/users").then((res) => {
      console.log("API response:", res.data);
      setUsers(res.data);
    });
  }, [axiosSecure, user]);
  console.log(users);
  return <div>All Users</div>;
};

export default AllUsers;
