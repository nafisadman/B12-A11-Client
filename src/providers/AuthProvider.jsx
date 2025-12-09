import { createContext } from "react";
import app from "../firebase/firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return <AuthContext>{children}</AuthContext>;
};

export default AuthProvider;
