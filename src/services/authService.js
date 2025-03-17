import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

// Sign up with email and password
export const signUp = async (email, password, name, grade, school, locality) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with display name
    if (name) {
      await updateProfile(user, { displayName: name });
    }

    // Create user document in Firestore
    const userData = {
      uid: user.uid,
      email,
      displayName: name || email.split("@")[0], // Fallback to email prefix
      grade,
      school,
      locality,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      role: "student"
    };

    await setDoc(doc(db, "users", user.uid), userData);
    
    return userData;
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    throw error; // Rethrow for UI handling
  }
};

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update last login time
    await updateDoc(doc(db, "users", user.uid), {
      lastLogin: serverTimestamp()
    });

    // Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      const userData = {
        uid: user.uid,
        email,
        displayName: user.displayName || email.split("@")[0],
        role: "student",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      };
      
      await setDoc(doc(db, "users", user.uid), userData);
      return userData;
    }
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    throw error;
  }
};

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error during logout:", error.message);
    return false;
  }
};

// Get current user data from Firestore
export const getCurrentUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
};
