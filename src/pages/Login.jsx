import React from "react";
import { auth, provider } from '../database/firebase-config'
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

export default function Login({ isAuth, setIsAuth }) {
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            setIsAuth(true);
            navigate("/create-event");
        });
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-header">Welcome Back!</h1>
                <p className="login-subheader">Sign in with your Google account to continue.</p>
                <button className="login-button" onClick={signInWithGoogle}>
                    <span className="button-icon">
                        <i className="fab fa-google"></i>
                    </span>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
