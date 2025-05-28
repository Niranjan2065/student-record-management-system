// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, get, push, child, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1hnJlT9nixcWFTfNSRZVNe-hov1laRS8",
  authDomain: "student-record-system-92.firebaseapp.com",
  databaseURL: "https://student-record-system-92-default-rtdb.firebaseio.com",
  projectId: "student-record-system-92",
  storageBucket: "student-record-system-92.appspot.com",
  messagingSenderId: "595631053147",
  appId: "1:595631053147:web:2a50a7483e983f5c91e27e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, push, child, onValue };
