// Fichier firebase.ts
import firebase from 'firebase'
import "firebase/database"
const config = {
    apiKey: "AIzaSyD68B6U566jznZcc6BDyNgnrAPV0wU6zT4",
    authDomain: "ionic-test-bc2d8.firebaseapp.com",
    databaseURL: "https://ionic-test-bc2d8-default-rtdb.firebaseio.com",
    projectId: "ionic-test-bc2d8",
    storageBucket: "ionic-test-bc2d8.appspot.com",
    messagingSenderId: "668023076432",
    appId: "1:668023076432:web:7604c07e3f23590e544355",
    measurementId: "G-JKKRBQF1ST"
 };
firebase.initializeApp(config)
export default firebase.database()