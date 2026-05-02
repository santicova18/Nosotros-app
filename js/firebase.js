
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
  import { configDotenv } from "dotenv";

  const entorno = configDotenv();
  const apiKey = process.API_KEY;
  const authDomain = process.AUTH_DOMAIN;
  const projectId = process.PROJECT_ID;
  const storageBucket = process.STORAGE_BUCKET;
  const messagingSenderId = process.MESSAGING_SENDER_ID;
  const appId = process.APP_ID;

    // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
