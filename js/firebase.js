
  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

    // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB5uCLX8C6lJZfSeynGMxMwBbVeTO0KBGY",
    authDomain: "nosotros-app-4651f.firebaseapp.com",
    projectId: "nosotros-app-4651f",
    storageBucket: "nosotros-app-4651f.firebasestorage.app",
    messagingSenderId: "972056365780",
    appId: "1:972056365780:web:85a967446da32a1de5c941"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  

  export{db};

