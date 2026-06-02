import { createUserProfile, getUserProfile, updateUserProfile } from "./userService.js";
import "dotenv/config";
// Fake Firebase user object (like what Auth gives you)
const fakeUser = {
  uid: "testUser123",
  email: "test@email.com",
};

console.log("API KEY:", process.env.EXPO_PUBLIC_FIREBASE_API_KEY);
async function runTests() {
  try {
    console.log("🔥 Creating user profile...");

    await createUserProfile(fakeUser, "Test User");

    console.log("✅ Created");

    console.log("📥 Fetching user profile...");

    const profile = await getUserProfile(fakeUser.uid);

    console.log("Profile:", profile);

    console.log("✏️ Updating user profile...");

    await updateUserProfile(fakeUser.uid, {
      displayName: "Updated Name",
      totalWorkouts: 5,
    });

    console.log("✅ Updated");

    const updated = await getUserProfile(fakeUser.uid);

    console.log("Final profile:", updated);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

runTests();