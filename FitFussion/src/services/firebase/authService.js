import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const signUp = async (email, password, displayName) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  if (displayName) {
    await updateProfile(credential.user, { displayName });
  }

  return credential;
};

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const listenToAuthChanges = (callback) =>
  onAuthStateChanged(auth, callback);
