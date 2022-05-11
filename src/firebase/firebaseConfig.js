// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
initializeApp(firebaseConfig);



export const AuthContext = createContext(null);
export const AuthProvider = ({children}) => {

    const auth = getAuth();
    //states

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");


    //create new user
    const createNewUser = async (email,password) => {
      try {
        setError(false);
        setLoading(true);

        if(email == "" || password == ""){
          setError(true);
          setMessage("Hay campos vacios");
          setLoading(false);
          return;
        }

        const newUser = await createUserWithEmailAndPassword(auth,email,password);
        localStorage.setItem('chat-user',JSON.stringify({email}));
        setUser(newUser.user);
        setLoading(false);
        return newUser;
      } catch (error) {
        console.error("Error creando usuario", error);
        if(error.code == "auth/email-already-in-use"){
          setError(true);
          setMessage("El usuario ya esta registrado");
          setLoading(false);
          return;
        }
      }
    }

    //login user
    const loginUser = async (email,password) => {
      try {
        setError(false);
        setLoading(true);

        if(email == "" || password == ""){
          setError(true);
          setMessage("Hay campos vacios");
          setLoading(false);
          return;
        }
        const signedUser = await signInWithEmailAndPassword(auth,email,password);
        localStorage.setItem('chat-user',JSON.stringify({email}));
        setUser(signedUser.user);
        setLoading(false);
        return signedUser;
      } catch (error) {
        console.error("Error al logear usuario",error);
      }
    }

    //user persistence
    const persisUser = () => {
      const userExists = localStorage.getItem('chat-user');
      if(userExists){
        const user = JSON.parse(userExists);
        setUser(user);
        return true;
      }else{
        return false;
      }
    }

    //sign out user
    const signOut = () => {
      localStorage.removeItem('chat-user');
    };


    return <AuthContext.Provider value={{user, createNewUser, loading, error, message, loginUser, persisUser, signOut}}>
      {children}
    </AuthContext.Provider>;
};
