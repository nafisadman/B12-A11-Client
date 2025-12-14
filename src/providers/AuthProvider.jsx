import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";

const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState("");

  // Form
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const getRole = async () => {
    await axios.get(`http://localhost:5000/users/role/${currentUser.email}`).then((res) => {
      setRole(res.data.role);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/users/role/${user.email}`).then((res) => {
      console.log(res.data.role);
      setRole(res.data.role);
      setUserStatus(res.data.status);
      setRoleLoading(false);
    });
  }, [user]);

  const authData = {
    user,
    setUser,
    loading,
    role,
    createUser,
    updateUser,
    signIn,
    logOut,
    roleLoading,
    userStatus,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
