import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBBTb2gah6onBScRrHMECXyptAp4vPr5w0",
    authDomain: "crown-clothing-db-1dbcb.firebaseapp.com",
    projectId: "crown-clothing-db-1dbcb",
    storageBucket: "crown-clothing-db-1dbcb.appspot.com",
    messagingSenderId: "578238147271",
    appId: "1:578238147271:web:9a7ce7a600722b6826ece2",
    measurementId: "G-7VDQHDWM7F"
  };

  //initialize firebase
  firebase.initializeApp(config);

  //export auth for authentication
  export const auth = firebase.auth();

  //export firestore for storage
  export const firestore = firebase.firestore();

  //set up google authentication utility
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  //Storing data in firebase
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    //if userAuth is null i.e person is signed out
    if (!userAuth) return;

    //if person is signed in
      //userRef returns an object for the document path regardless of its existence or not in the database
    const userRef = firestore.doc(`users/${userAuth.uid}`)
      //snapshot has a parameter that helps us know if this userRef document exist in the database 
    const snapShot = await userRef.get();
    //console.log(snapShot)

      //if userRef doesnot exist we have to create it in the database
    if (!snapShot.exist) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    } else {
      console.log('woo!')
    }

    return userRef;
  }
  
  export default firebase;