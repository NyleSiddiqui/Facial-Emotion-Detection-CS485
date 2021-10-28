// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHFgb58e2Iwx9v_ocF8E3lbY8jgvBMw_E",
  authDomain: "feds-9dda6.firebaseapp.com",
  projectId: "feds-9dda6",
  storageBucket: "feds-9dda6.appspot.com",
  messagingSenderId: "65446173545",
  appId: "1:65446173545:web:f2f15b0fb992253eb17bf8"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
const auth = getAuth();

function createAccount(email, password) { 
    email = email['email']
    password = password['password']
    
    createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
        const user = userCredential.user;
        let msg = "Account created for " + email;
        console.log(msg);
        console.log("Verification Status: " + user.emailVerified);
        verifyEmail();
    });
}

function verifyEmail() {
    let user = auth.currentUser;
    sendEmailVerification(user).then(() => {
      console.log("Sending Verification Email")
    });
}

export { createAccount, verifyEmail };