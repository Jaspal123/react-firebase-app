import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyAjOoiiKx88S8BHd5MbFrTAc1ZqbSqY2S4",
    authDomain: "fir-react-app-3cea3.firebaseapp.com",
    databaseURL: "https://fir-react-app-3cea3.firebaseio.com",
    projectId: "fir-react-app-3cea3",
    storageBucket: "fir-react-app-3cea3.appspot.com",
    messagingSenderId: "707902117584",
    appId: "1:707902117584:web:3c8e93e7d9876a602270d5",
    measurementId: "G-8G611RP1PE"
};

class Firebase{
    constructor(){
        app.initializeApp(config);
    }
}

export default Firebase;