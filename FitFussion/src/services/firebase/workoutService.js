import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  increment,
} from "firebase/firestore";

// Start a new workout session
export const createWorkoutSession = async (userId, type) => {
  return addDoc(collection(db, "workout_sessions"), {
    userId,
    type,                        // e.g. "pushups", "squats"
    startedAt: serverTimestamp(),
    endedAt: null,
    totalReps: 0,
    durationSeconds: 0,
    status: "active",
  });
};

// Complete a session and update user stats
export const completeWorkoutSession = async (sessionId, userId, { totalReps, durationSeconds }) => {
  // Update the session document
  await updateDoc(doc(db, "workout_sessions", sessionId), {
    endedAt: serverTimestamp(),
    totalReps,
    durationSeconds,
    status: "completed",
  });

  // Increment user's total workout count and update lastActiveAt
  await updateDoc(doc(db, "users", userId), {
    totalWorkouts: increment(1),
    lastActiveAt: serverTimestamp(),
  });
};

// Log a single rep into the reps subcollection
export const logRep = async (sessionId, { confidence, type, formScore = null }) => {
  return addDoc(
    collection(db, "workout_sessions", sessionId, "reps"),
    {
      timestamp: serverTimestamp(),
      confidence,
      type,                      // e.g. "pushup_rep"
      formScore,
    }
  );
};