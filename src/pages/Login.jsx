import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../database/firebase-config';
import '../styles/Login.css';

export default function Login({ user, setUser }) {

  const login = async (email, password) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.email);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        userData.email = user.email;
        setUser(userData);
        alert('Du är nu inloggad!');
      } else {
        alert('Ogiltigt användarnamn eller lösenord. Vänligen kontrollera att du har angett rätt uppgifter och försök igen. Om problemet kvarstår, vänligen kontakta administratören för hjälp.');
        setUser(null);
      }

    } catch (error) {
      setUser(null);
      alert('Kontakta administratören.');
      console.error('ERROR: ', error);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    login(email, password);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content">
          {user ? (
            <div>
              <h1 className="login-header">Välkommen {user.name}!</h1>
            </div>
          ) : (
            <div>
              <h1 className="login-header">Välkommen Tillbaka!</h1>
              <p className="login-subheader">Logga in nedanför</p>
            </div>
          )}

          {!user ? (
            <div className="form-container">
              <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <div className="label-input">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Ange din e-post"
                    />
                  </div>
                  <div className="label-input">
                    <label htmlFor="password">Lösenord:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Ange ditt lösenord"
                    />
                  </div>
                </div>
                <button type="submit">Login</button>
              </form>
            </div>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
}
