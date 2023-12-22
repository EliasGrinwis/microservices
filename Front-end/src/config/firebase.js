import {initializeApp} from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBs3DY9CqqaX4fKnfzVP_Ejt5uSHE0X4Ig",
  authDomain: "microservices-402412.firebaseapp.com",
  projectId: "microservices-402412",
  storageBucket: "microservices-402412.appspot.com",
  messagingSenderId: "549978783695",
  appId: "1:549978783695:web:5a4bb758969baa0a7c1cba",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage, ref, uploadBytes, getDownloadURL};
