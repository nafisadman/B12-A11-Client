import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";

const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState("");

  // Form Functions
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (!currentUser) {
        setRoleLoading(false); 
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setRoleLoading(true);
      
      axios.get(`https://b12-a11-server-tan.vercel.app/users/role/${user.email}`)
        .then((res) => {
          console.log('AuthProvider.jsx: ', res.data.role);
          setName(res.data.name);
          setRole(res.data.role);
          setUserStatus(res.data.status);
        })
        .finally(() => {
          setRoleLoading(false); 
        });
    }
  }, [user]);

  const authData = {
    user,
    setUser,
    loading,
    name,
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