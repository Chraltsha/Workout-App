import { db } from "./firebaseConfig.js";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export const createUserProfile = async (user, displayName = "") => {
  return setDoc(doc(db, "users", user.uid), {
    email: user.email,
    displayName: displayName,
    photoURL: null,
    createdAt: serverTimestamp(),
    currentStreak: 0,
    totalWorkouts: 0,
    lastActiveAt: serverTimestamp(),
  });
};

export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.data();
};

export const updateUserProfile = async (uid, fields) => {
  return updateDoc(doc(db, "users", uid), {
    ...fields,
    lastActiveAt: serverTimestamp(),
  });
};