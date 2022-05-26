import React, { useContext, useState } from 'react';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const Login = () => {
      const [newUserfield, setNewuserfield] = useState(false)
      const [user, setUser] = useState({
            isLoggedIn: false,
            name :'',
            email: '',
            password: '',
            error: '',
            success: '',
      })
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
                        const { displayName, email } = result.user;
                        const signedInUser = { name: displayName, email }
                        setLoggedInUser(signedInUser);
                        history.replace(from)

                        storeAuthToken();
                        console.log(signedInUser);
                        // ...
                  }).catch((error) => {
                        // Handle Errors here.

                        const errorMessage = error.message;
                        console.log(errorMessage);
                  });

      }

      const storeAuthToken = () => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                  .then(function (idToken) {
                        // Send token to your backend via HTTPS
                        // ...
                        console.log(idToken);
                  }).catch(function (error) {
                        // Handle error
                  });
      }

      const handleSubmit = (e) => {
            console.log(user.email, user.password);
            if (newUserfield && user.email && user.password) {
                  const auth = getAuth();
                  createUserWithEmailAndPassword(auth, user.email, user.password)
                        .then((userCredential) => {
                              // Signed in 
                              const createuser = userCredential.user;
                              const newUser = createuser;
                              newUser.error = '';
                              newUser.success = true;
                              setUser(newUser);
                              updateUserName(user.name)
                        })
                        .catch((error) => {
                              const errorMessage = error.message;
                              const newUser = { ...user }
                              newUser.error = errorMessage
                              newUser.success = false
                              setUser(newUser)
                        });
            }
            if (!newUserfield && user.email && user.password) {
                  const auth = getAuth();
                  signInWithEmailAndPassword(auth, user.email, user.password)
                        .then((userCredential) => {

                              const user = userCredential.user;
                              const newUser = user;
                              newUser.error = '';
                              newUser.success = true;
                              setUser(newUser);
                              setLoggedInUser(newUser)
                              history.replace(from)
                              console.log(user);
                        })
                        .catch((error) => {
                              const errorMessage = error.message;
                              const newUser = { ...user }
                              newUser.error = errorMessage
                              newUser.success = false
                              setUser(newUser)
                        });
            }

            e.preventDefault();
      }
      const updateUserName = name => {
            const auth = getAuth();
            updateProfile(auth.currentUser, {
                  displayName: name
            }).then(() => {
                  console.log('user Name Update successfully');
            }).catch((error) => {
                  console.log(error);
            });
      }

      const handleInputValue = (e) => {
            let isFormValid = true
            if (e.target.name === 'email') {
                  const validEmail = /\S+@\S+\.\S+/.test(e.target.value)
                  isFormValid = validEmail
            }
            if (e.target.name === 'password') {
                  const validPassword = e.target.value.length > 6;
                  isFormValid = validPassword;
            }
            if (isFormValid) {
                  const newUser = { ...user }
                  newUser[e.target.name] = e.target.value;
                  setUser(newUser)
            }
      }


      return (
            <div>

                  <button onClick={handleGoogleSignIn}>Log In</button>

                  <form onSubmit={handleSubmit}>
                        <input type="checkbox" onChange={() => { setNewuserfield(!newUserfield) }} name="newUser" id="" />
                        <label htmlFor="newUser">New User Signup</label><br />

                        {newUserfield && <input type="text" name="name" onBlur={handleInputValue} placeholder='Enter Your Name' />} <br />
                        <input type="text" name="email" onBlur={handleInputValue} placeholder='Enter Your Email' /> <br />
                        <input type="password" name="password" onBlur={handleInputValue} placeholder='Enter Your Password' /><br />
                        <input type="submit" value="Submit" />
                  </form>
                  <p style={{ color: 'red' }}>{user.error}</p>
                  {user.success && <p style={{ color: 'green' }}>Account {newUserfield ? 'Created' : 'Loggedin'} successfully</p>}
            </div>
      );
};

export default Login;