import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAmu8egS3kn0S38pEuNE3Zxe31RyN-099s",
        authDomain: "crwn-db-23839.firebaseapp.com",
    databaseURL: "https://crwn-db-23839.firebaseio.com",
    projectId: "crwn-db-23839",
    storageBucket: "crwn-db-23839.appspot.com",
    messagingSenderId: "322406503600",
    appId: "1:322406503600:web:8bd1fbd3367204411c9775",
    measurementId: "G-868X0G4EPH"
}

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });

        }catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

