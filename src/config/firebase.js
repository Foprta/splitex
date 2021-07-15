import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBaUFMx1P_L2HRskPtmy-k8xXeORfhnDjo",
  authDomain: "split-foprta-ru.firebaseapp.com",
  projectId: "split-foprta-ru",
  storageBucket: "split-foprta-ru.appspot.com",
  messagingSenderId: "430281515324",
  appId: "1:430281515324:web:a3ff709d71e0bc909b3e39",
};

export const api = firebase.initializeApp(config);
