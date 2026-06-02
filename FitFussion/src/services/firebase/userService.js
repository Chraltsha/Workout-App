import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const createUserProfile = async (user) => {
  return setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: new Date(),
    currentStreak: 0
  });
};

export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.data();
};