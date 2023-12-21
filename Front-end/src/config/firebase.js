import {initializeApp} from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeCGInpdGmMzKoZLlGdownmesFbO3WwSo",
  authDomain: "microservices-ea59d.firebaseapp.com",
  projectId: "microservices-ea59d",
  storageBucket: "microservices-ea59d.appspot.com",
  messagingSenderId: "882876421524",
  appId: "1:882876421524:web:f12ab320c3d9ec04dc2b81",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage, ref, uploadBytes, getDownloadURL};
