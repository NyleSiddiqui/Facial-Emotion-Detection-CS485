// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence, signOut,signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, where, query, getDocs  } from "firebase/firestore"

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
const storage = getStorage();
const db = getFirestore();

function addEmotion(filename, classifiedEmotion) {
  
  
  onAuthStateChanged(auth, (user) => {
    try {
      let date = new Date()
      addDoc(collection(db, "Emotions"), {
        uid: user.uid,
        img: filename,
        emotion: classifiedEmotion,
        time: date.toString()
      }).then(() => {
        console.log("Uploaded Emotion Data to Firestore!")
      });
    } catch (e) {
      console.log("Couldn't upload emotion data!")
    }
  });
}

function createAccount(email, password) { 
    email = email['email']
    password = password['password']
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
          const user = userCredential.user;
          let msg = "Account created for " + email;
          console.log(msg);
          verifyEmail();
          resolve();
      });
    })
}

function loginUser(email, password) {
  email = email['email']
  password = password['password']
  // setPersistence(auth, browserSessionPersistence).then(() => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      console.log("Signed In");
      resolve()
    });
  })
}

function setProfile(firstName, lastName, photoLink) {
  let isPhotoPresent = true;
  if(photoLink == null || photoLink == '' || photoLink == undefined) {
    isPhotoPresent = false;
    console.log("Photo not found!")
  }

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if(user) {     
        firstName = firstName['firstName']
        lastName = lastName['lastName']
        if(isPhotoPresent) {
          updateProfile(user, {
            displayName: firstName + " " + lastName, photoURL: photoLink
          }).then(()=> {
            console.log("Profile Updated")
            resolve();
          })
        } else {
          updateProfile(user, {
            displayName: firstName + " " + lastName,
          }).then(()=> {
            console.log("Profile Updated. No new photo.")
            resolve();
          })
        }
      } else {
        console.log("User not logged in!")
      }
      })
  }) 
}

function verifyEmail() {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Sending Verification Email")
    });
}

function getProfile() {
  let profile = {}
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
    console.log(user)
    if(user) {
      let names = user.displayName.split(' ');
      profile = {
        "firstName": names[0],
        "lastName": names[1],
        "email": user.email,
        "photo": user.photoURL
      }
    } else {
      let examplePhoto = "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=466&q=80"
    
      profile = {
        "firstName": "Thomas",
        "lastName": "Reither",
        "email": "myemail@testing.com",
        "photo": examplePhoto
      }
    }
    resolve(profile);
  })
  })
}


function uploadProfilePhoto(file) {
  file = file['file']

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        let filepath = user.uid + "/profile"
        let fileRef = ref(storage, filepath)
        let metadata = {
          contentType: file.type,
        };
        uploadBytes(fileRef, file, metadata).then(() => {
         console.log("File Uploaded")
          fileRef = ref(storage, filepath)
          getDownloadURL(fileRef).then(url => {
            resolve(url)
          })
        })
      } else {
        reject("User not logged in!")
      }
    });
  });
}

function uploadPhoto(file) {
  file = file['file']

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        let time = new Date()
        let filename = "emotion-" + time.valueOf();
        let filepath = user.uid + "/" + filename;
        let fileRef = ref(storage, filepath)
        let metadata = {
          contentType: file.type,
        };
        uploadBytes(fileRef, file, metadata).then(() => {
         console.log("File Uploaded")
          fileRef = ref(storage, filepath)
          getDownloadURL(fileRef).then(url => {
            resolve({'url': url, 'filename': filename})
          })
        })
      } else {
        reject("User not logged in!")
      }
    });
  });
}

function logout() {
  signOut(auth).then(() => {
    console.log("Signed Out!")
  });
}

function getResults() {
  let resultList = [];

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      const emotions = collection(db, "Emotions");
      const q = query(emotions, where("uid", "==", user.uid));
      getDocs(q).then(results => {
        results.forEach(result => {
          resultList.push(result);
        })
        resolve(resultList);
      })
    })
  })
}


export { loginUser, createAccount, verifyEmail, setProfile,
   getProfile, uploadProfilePhoto, uploadPhoto, logout, addEmotion, getResults};