import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const ChatContext = createContext(null);

export const ChatProvider = ({children}) => {

    //state del chat
    const [chatData, setChatData] = useState({
        from: '',
        time: '',
        message: ''
    });

    const [loading, setLoading] = useState(true);
    //guardando mensajes
    const sendMessage = async (from, message) => {
        try {
            if (message == "") {
                return;
            }
            await addDoc(collection(db,"chatDevApp"), {
                from: from,
                message: message,
                time: Date.now()
            });
            updateChatHistory();
        } catch (error) {
            console.error("Error enviando el mensaje", error);
        }
    }

    //obtener el historial del chat
    const getChatHistory = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "chatDevApp"));

            let tempChatData = []
            querySnapshot.forEach(doc => {
                if(doc.exists()){
                    tempChatData.push({id: doc.id, ...doc.data()});
                    setChatData([...tempChatData]);
                }
            });
            setLoading(false);
            scrollLastMessage();
        } catch (error) {
            console.error("Error obteniendo el historial", error);
        };
        
    }

    //update chat history
    const updateChatHistory =  async () => {
        const q = query(collection(db,"ChatDevApp"));
        const querySnapshot = await getDocs(collection(db, "chatDevApp"));
        onSnapshot(q,(querySnapshot) => {
            /*console.log("enserio?");
            let tempData = []
            querySnapshot.forEach(doc => {
                tempData.push({id: doc.id, ...doc.data()});
                setChatData([...tempData]); 
                setLoading(false);
            });*/
            getChatHistory();
            
            
        });
        //scrollLastMessage();
    }


    const scrollLastMessage = () => {
        const chatDiv =  document.querySelector(".chat");
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }



    return <ChatContext.Provider value={{sendMessage,getChatHistory, chatData, loading, updateChatHistory}}>{children}</ChatContext.Provider>
}


export default db;





