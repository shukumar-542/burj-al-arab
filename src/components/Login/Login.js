import React, { useContext } from 'react';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Login = () => {
      const [loggedInUser, setLoggedInUser] = useContext(UserContext);
      const history = useHistory();
      const location = useLocation();
      const { from } = location.state || { from: { pathname: "/" } };

      
      const app = initializeApp(firebaseConfig);
      const handleGoogleSignIn = () => {
            const provider = new GoogleAuthProvider();


            const auth = getAuth();
            signInWithPopup(auth, provider)
                  .then((result) => {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        // The signed-in user info.
                        const {displayName, email} = result.user;
                        const signedInUser = {name: displayName, email}
                        setLoggedInUser(signedInUser);
                        history.replace(from)
                        console.log(signedInUser);
                        // ...
                  }).catch((error) => {
                        // Handle Errors here.
                        
                        const errorMessage = error.message;
                        console.log(errorMessage);               
                  });

      }
      return (
            <div>
                  <h1>this is login page</h1>
                  <button onClick={handleGoogleSignIn}>Log In</button>
            </div>
      );
};

export default Login;