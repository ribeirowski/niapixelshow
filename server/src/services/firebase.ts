import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfigTest = {
  apiKey: "AIzaSyDSFiUDASWXi8HwqVpTHnAIq6P5GJGiUFw",
  authDomain: "nia-pixel-show---testes.firebaseapp.com",
  projectId: "nia-pixel-show---testes",
  storageBucket: "nia-pixel-show---testes.appspot.com",
  messagingSenderId: "660691809608",
  appId: "1:660691809608:web:fbc5af4d64f3f965a32f7d"
};

// Initialize Firebase
const appTest = initializeApp(firebaseConfigTest);
const authTest = getAuth(appTest);

export { appTest, authTest };