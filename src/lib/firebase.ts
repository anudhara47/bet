
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "final-project-3obqd",
  "appId": "1:325596126921:web:d4ea68134d8ef418933718",
  "storageBucket": "final-project-3obqd.firebasestorage.app",
  "apiKey": "AIzaSyBSYkgwOaR407wOhO3P5cs0yK6C3d9VzMY",
  "authDomain": "final-project-3obqd.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "325596126921"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
