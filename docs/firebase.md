# Firebase Schema (Workout App)

This document defines the Firestore data structure and rules of ownership for the app.

All features must conform to this schema to avoid inconsistent data across the app.

---

# 1. Users

## Collection: users

### Fields
- `email` (string)
- `displayName` (string)
- `photoURL` (string | null)
- `createdAt` (timestamp)
- `currentStreak` (number, default: 0)
- `totalWorkouts` (number, default: 0)
- `lastActiveAt` (timestamp)

### Notes
- `userId` == Firebase Auth UID
- Only the authenticated user can read/write their own document

---

# 2. Workout Sessions

## Collection: workout_sessions

### Fields
- `userId` (string)
- `type` (string) → e.g. "pushups", "squats"
- `startedAt` (timestamp)
- `endedAt` (timestamp | null)
- `totalReps` (number, default: 0)
- `durationSeconds` (number, default: 0)
- `status` (string) → "active" | "completed"

### Notes
- One session = one workout activity instance
- Session is the main unit for tracking progress

---

# 3. Reps (Optional Detailed Tracking)

## Subcollection: reps

### Fields
- `timestamp` (timestamp)
- `confidence` (number) → MediaPipe confidence score
- `formScore` (number | null) → optional future feature
- `type` (string) → e.g. "pushup_rep"

### Notes
- Use only if detailed analytics or replay is needed
- Otherwise, rely on `totalReps` in session for performance

---

# 4. Workout Summary (Optional / Cached Aggregation)

## Collection: workout_summaries

### Fields
- `userId` (string)
- `weeklyWorkouts` (number)
- `weeklyReps` (number)
- `allTimeReps` (number)
- `updatedAt` (timestamp)

### Notes
- This is a cached aggregation for fast UI loading
- Can be updated via Cloud Functions or client-side logic (less ideal)

---

# 5. MediaPipe Event Contract (Frontend → Firebase)

To keep integration consistent, MediaPipe should emit events in this format:

```json
{
  "type": "rep_detected",
  "sessionId": "abc123",
  "timestamp": 1234567890,
  "confidence": 0.92
}