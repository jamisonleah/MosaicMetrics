// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Add SDKs for Firebase products that you want to use
// Email/Password Authentication and Google Authentication are enabled
// https://firebase.google.com/docs/web/setup#available-libraries
const FireBaseAuthenticator = () => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDyLDFkP7JvAiAe4S8OWbO-7mV6SV6XFto",
        authDomain: "local-budget.firebaseapp.com",
        projectId: "local-budget",
        storageBucket: "local-budget.appspot.com",
        messagingSenderId: "329736133390",
        appId: "1:329736133390:web:10b46249eff444b18e555f",
        measurementId: "G-RPWHX0V99T"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const signUp = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const signIn = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
    return { signUp, signIn };
}

export default FireBaseAuthenticator;