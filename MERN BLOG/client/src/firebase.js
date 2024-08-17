// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vnr-blog.firebaseapp.com",
  projectId: "vnr-blog",
  storageBucket: "vnr-blog.appspot.com",
  messagingSenderId: "850022210284",
  appId: "1:850022210284:web:ec761648d314cd91daa3c9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

function checkIfWindowClosed(someWindow) {
  try {
      if (someWindow.closed) {
          console.log("Window is closed.");
      } else {
          console.log("Window is open.");
      }
  } catch (e) {
      console.error("Cross-Origin-Opener-Policy blocked the window.closed call:", e);
      // Implement fallback mechanism or alternative logic here
  }
}

// Example usage
let someWindow = window.open('https://example.com');
// Check the window status after a delay
setTimeout(() => {
  checkIfWindowClosed(someWindow);
}, 5000);