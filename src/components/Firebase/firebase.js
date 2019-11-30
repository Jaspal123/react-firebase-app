import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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

        this.auth = app.auth();
        this.db = app.database();

        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
        this.githubProvider = new app.auth.GithubAuthProvider();
    }
    
    // ********** Auth API ************ //

    doCreateUserWithEmailAndPassword = (email,password) => this.auth.createUserWithEmailAndPassword(email,password);

    doSignInWithEmailAndPassword = (email,password) => this.auth.signInWithEmailAndPassword(email,password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

    doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

    doSignInWithGithub = () => this.auth.signInWithPopup(this.githubProvider);

    
    // ********* User API ************ //

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users')

    // ********* Merge auth and db user API ***********//
    onAuthUserListener = (next, fallback) => this.auth.onAuthStateChanged(authUser => {
        if(authUser){
            this.user(authUser.uid).once('value').then(snapshot => {
                const dbUser = snapshot.val();

                // default empty roles
                if(!dbUser.roles)
                {
                    dbUser.roles = [];
                }
                // merge auth and db User
                authUser = {
                    uid: authUser.uid,
                    email: authUser.email,
                    ...dbUser
                }
                next(authUser)
            })
        }else{
            fallback()
        }
    })
}

export default Firebase;