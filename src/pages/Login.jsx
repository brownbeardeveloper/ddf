import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../backend/firebase-config';

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
    <main className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="mb-8">
          {user ? (
            <h1 className="text-3xl font-bold text-blue-500 mb-4 leading-tight">
              Välkommen {user.name}!
            </h1>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-blue-500 mb-4 leading-tight">
                Välkommen tillbaka!
              </h1>
              <p className="text-gray-600 mt-2">Logga in nedanför</p>
            </>
          )}
        </div>

        {!user ? (
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ange din e-post"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Lösenord:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ange ditt lösenord"
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">Login</button>
          </form>
        ) : (
          <button onClick={logout} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">Logout</button>
        )}
      </div>
    </main>
  );
}
