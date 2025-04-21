import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAE47Sa-g-GYBWqvNcQA3Tp3qYvU_sEdrU",
    authDomain: "projeto-charis.firebaseapp.com",
    projectId: "projeto-charis",
    storageBucket: "projeto-charis.firebasestorage.app",
    messagingSenderId: "804027148312",
    appId: "1:804027148312:web:775d29d804eefc68bcbb6d",
    measurementId: "G-KY2JBP2GX0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider, signInWithPopup };
