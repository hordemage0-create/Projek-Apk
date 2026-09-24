import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAuaHZbh0ohvivhtRCO_xIhk_hhj94Jgl4",
  authDomain: "toko-putzzpedia.firebaseapp.com",
  projectId: "toko-putzzpedia",
  storageBucket: "toko-putzzpedia.firebasestorage.app",
  messagingSenderId: "281478806980",
  appId: "1:281478806980:web:581f8e718829e874dd3891",
  measurementId: "G-MEK90XNV0N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

window.firebaseAuth = auth;
window.fbGoogleProvider = GoogleAuthProvider;
window.fbSignInWithPopup = signInWithPopup;
window.fbSignOut = signOut;
window.fbOnAuthStateChanged = onAuthStateChanged;

console.log('✅ Firebase initialized');
