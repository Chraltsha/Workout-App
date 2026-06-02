import { db } from "./firebaseConfig.js";
import { doc, setDoc, getDoc, increment, serverTimestamp } from "firebase/firestore";

// Get the cached summary for a user
export const getWorkoutSummary = async (userId) => {
  const snap = await getDoc(doc(db, "workout_summaries", userId));
  return snap.exists() ? snap.data() : null;
};

// Update summary after a completed session
export const updateWorkoutSummary = async (userId, { repsToAdd }) => {
  return setDoc(
    doc(db, "workout_summaries", userId),
    {
      userId,
      weeklyWorkouts: increment(1),
      weeklyReps: increment(repsToAdd),
      allTimeReps: increment(repsToAdd),
      updatedAt: serverTimestamp(),
    },
    { merge: true }   // create doc if it doesn't exist, otherwise merge
  );
};