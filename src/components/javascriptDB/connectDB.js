import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDLrbF4UYPUaKQ2InUMiSmWfsIQqYR68Yw",
  authDomain: "log-in-practice-d8322.firebaseapp.com",
  databaseURL: "https://log-in-practice-d8322-default-rtdb.firebaseio.com",
  projectId: "log-in-practice-d8322",
  storageBucket: "log-in-practice-d8322.appspot.com",
  messagingSenderId: "382029960513",
  appId: "1:382029960513:web:3cba34ff80d1a233627dc0"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { auth, db };
