// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";

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
  appId: "1:65446173545:web:f2f15b0fb992253eb17bf8",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

function addEmotion(filename, classifiedEmotion) {
  onAuthStateChanged(auth, (user) => {
    try {
      let date = new Date();
      addDoc(collection(db, "Emotions"), {
        uid: user.uid,
        img: filename,
        emotion: classifiedEmotion,
        time: date.toString(),
      }).then(() => {
        console.log("Uploaded Emotion Data to Firestore!");
      });
    } catch (e) {
      console.log("Couldn't upload emotion data!");
    }
  });
}

function createAccount(email, password) {
  email = email["email"];
  password = password["password"];
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let msg = "Account created for " + email;
        console.log(msg);
        verifyEmail();
        resolve();
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            reject("Your password is too weak");
            break;
          case "auth/operation-not-allowed":
            reject("Accounts are currently not able to be created");
            break;
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            reject("Unable to create account with the provided email");
            break;
          default:
            reject("An unexpected error occurred.");
        }
      });
  });
}

function isAuthenticated() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Signed In");
        resolve();
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            reject("Invalid email address");
            break;
          case "auth/user-disabled":
            reject("Email has been disabled");
            break;
          case "auth/user-not-found":
            reject("No user found");
            break;
          case "auth/wrong-password":
            reject("Incorrect password");
            break;
          default:
            reject("Unexpected error");
        }
      });
  });
}

function setProfile(firstName, lastName, photoLink) {
  let isPhotoPresent = true;
  if (photoLink == null || photoLink === "" || photoLink === undefined) {
    isPhotoPresent = false;
    console.log("Photo not found!");
  }

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        firstName = firstName["firstName"];
        lastName = lastName["lastName"];
        if (isPhotoPresent) {
          updateProfile(user, {
            displayName: firstName + " " + lastName,
            photoURL: photoLink,
          })
            .then(() => {
              console.log("Profile Updated");
              resolve();
            })
            .catch((error) => {
              console.error(error);
              reject("An error occurred when updating your profile");
            });
        } else {
          updateProfile(user, {
            displayName: firstName + " " + lastName,
          })
            .then(() => {
              console.log("Profile Updated. No new photo.");
              resolve();
            })
            .catch((error) => {
              console.error(error);
              reject("An error occurred when updating your profile");
            });
        }
      } else {
        console.log("User not logged in!");
      }
    });
  });
}

function verifyEmail() {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log("Sending Verification Email");
    })
    .catch((error) => {
      console.error(error);
    });
}

function getProfile() {
  let profile = {};
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let names = user.displayName.split(" ");
        profile = {
          firstName: names[0],
          lastName: names[1],
          email: user.email,
          photo: user.photoURL,
        };
      } else {
        let examplePhoto =
          "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=466&q=80";

        profile = {
          firstName: "Thomas",
          lastName: "Reither",
          email: "myemail@testing.com",
          photo: examplePhoto,
        };
      }
      resolve(profile);
    });
  });
}

function uploadProfilePhoto(file) {
  file = file["file"];

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let filepath = user.uid + "/profile";
        let fileRef = ref(storage, filepath);
        let metadata = {
          contentType: file.type,
        };
        uploadBytes(fileRef, file, metadata)
          .then(() => {
            console.log("File Uploaded");
            fileRef = ref(storage, filepath);
            getDownloadURL(fileRef)
              .then((url) => {
                resolve(url);
              })
              .catch((error) => {
                console.error(error);
                reject("Unable to fetch profile picture");
              });
          })
          .catch((error) => {
            console.error(error);
            reject("Unable to upload profile picture");
          });
      } else {
        reject("User not logged in!");
      }
    });
  });
}

function uploadPhoto(file) {
  file = file["file"];

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let time = new Date();
        let filename = "emotion-" + time.valueOf();
        let filepath = user.uid + "/" + filename;
        let fileRef = ref(storage, filepath);
        let metadata = {
          contentType: file.type,
        };
        uploadBytes(fileRef, file, metadata)
          .then(() => {
            console.log("File Uploaded");
            fileRef = ref(storage, filepath);
            getDownloadURL(fileRef)
              .then((url) => {
                resolve({ url: url, filename: filename });
              })
              .catch((error) => {
                reject("Unable to fetch picture");
              });
          })
          .catch((error) => {
            console.error(error);
            reject("Unable to upload picture");
          });
      } else {
        reject("User not logged in!");
      }
    });
  });
}

function getModelURL() {
  return new Promise((resolve, reject) => {
    let filepath = "model/model.json";
    let fileRef = ref(storage, filepath);
    getDownloadURL(fileRef).then((url) => {
      // console.log(url)
      // resolve(url)
      resolve(
        "https://storage.googleapis.com/model-bucket69/weighted-model/model.json"
      );
    });
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        console.log("Signed Out!");
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

function getResults() {
  let resultList = [];

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      const emotions = collection(db, "Emotions");
      const q = query(
        emotions,
        where("uid", "==", user.uid)
      );
      getDocs(q)
        .then((results) => {
          results.forEach((result) => {
            resultList.push(result);
          });

          // Sort the results by their timestamp (they are string-based not date-based in the database)
          resultList.sort((doc1, doc2) => {

            let doc1Time = Date.parse(doc1.data().time)
            let doc2Time = Date.parse(doc2.data().time)

            if (doc1Time < doc2Time) {
              return 1
            } else if (doc1Time > doc2Time) {
              return -1
            }

            return 0
          });

          resolve(resultList);
        })
        .catch((error) => {
          console.error(error);
          reject("Unable to fetch past results");
        });
    });
  });
}

function resetPassword(email) {
  email = email["email"];

  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Sent login reset");
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject("Password reset email was not able to be sent");
      });
  });
}

export {
  loginUser,
  createAccount,
  verifyEmail,
  setProfile,
  getProfile,
  uploadProfilePhoto,
  uploadPhoto,
  logout,
  addEmotion,
  getResults,
  isAuthenticated,
  resetPassword,
  getModelURL,
};
