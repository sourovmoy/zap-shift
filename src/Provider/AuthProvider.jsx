import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const sendEmailVerificationFunc = () => {
    setLoader(true);
    return sendEmailVerification(auth.currentUser);
  };

  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateProfileFunc = (name, photo) => {
    setLoader(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const sendPasswordResetEmailFunc = (email) => {
    setLoader(true);
    return sendPasswordResetEmail(auth, email);
  };

  const signInWithPopupFunc = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };
  const signOutFunc = () => {
    setLoader(true);
    return signOut(auth);
  };

  const authInfo = {
    createUserWithEmailAndPasswordFunc,
    sendEmailVerificationFunc,
    signInWithEmailAndPasswordFunc,
    updateProfileFunc,
    sendPasswordResetEmailFunc,
    signInWithPopupFunc,
    signOutFunc,
    user,
    setUser,
    error,
    setError,
    loader,
    setLoader,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
