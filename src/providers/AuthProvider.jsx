import { createContext, useState } from "react";
import app from "../firebase/firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const authData = {
    user,
    setUser,
    signInWithGoogle,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
