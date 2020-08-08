import * as firebase from 'firebase';
import 'firebase/auth';
// import 'firebase/database';
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA-eWWlbOoNgpKItmogBNTD3OsXblqVeao",
    authDomain: "rosey-604c6.firebaseapp.com",
    databaseURL: "https://rosey-604c6.firebaseio.com",
    projectId: "rosey-604c6",
    storageBucket: "rosey-604c6.appspot.com",
    messagingSenderId: "327139446530",
    appId: "1:327139446530:web:6b989aad401e316a"
};

try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
} catch (e) {
    console.log(e);
    // firebase.analytics();
}

// export { firebase };a