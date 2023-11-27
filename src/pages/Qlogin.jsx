import React from "react";
import { auth, provider } from '../database/firebase-config';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../styles/CreateEvent.css';

export default function Login() {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Skicka användarens ID-token till din server för att verifiera autentiseringen
            const idToken = await user.getIdToken();

            // Skicka ID-token till servern
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idToken })
            });

            if (response.ok) {
                // Här skulle du normalt spara autentiseringstoken från servern i en HttpOnly-cookie
                // och sedan omdirigera användaren
                navigate("/create-event");
            }
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }

    return (
        <>
            <div className="signin-container">
                <h1 className="signin-header">Sign in with Google to continue</h1>
                <button className="signin-button" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </>
    );
}
