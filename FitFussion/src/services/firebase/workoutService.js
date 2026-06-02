import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createWorkoutSession = async (userId) => {
  return addDoc(collection(db, "workout_sessions"), {
    userId,
    startedAt: serverTimestamp(),
    totalReps: 0
  });
};