import './App.css';
import app from './firebase.init';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error', error);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
      })
      .catch(error => {
        console.error('error', error);
      })
  }

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
      })
      .catch(error => {
        console.error('error', error);
      })
  }

  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(() => {
        setUser({})
      })
  }
  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleGoogleSignOut}>Sign Out</button> :
          <>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleFacebookSignIn}>Facebook Sign In</button>
            <button onClick={handleGithubSignIn}>Github Sign In</button>
          </>
      }
      <div>
        <p>Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>
    </div>
  );
}

export default App;
