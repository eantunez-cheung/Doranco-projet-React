import React, { useState } from "react";
import styles from "./Login.module.css"
import { auth } from "../../firebase";
import Welcome from "../welcome/Welcome";

export default function Login({ setForm, setIsConnected, setUser }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            setIsConnected(true)
            setUser(email)
            setForm('welcome')
        })
        .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert('Email et/ou mot de passe incorrect')
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerLogin}>
                <p className={styles.title}>Connexion</p>
                <div className={styles.email}>
                    <p>Email :</p>
                    <input type="text" placeholder="Email" onChange={e => handleEmail(e)} />
                </div>
                <div className={styles.password}>
                    <p>Mot de passe :</p>
                    <input type="password" placeholder="Mot de passe" onChange={e => handlePassword(e)} />
                </div>
                <button className={styles.btnConnection} onClick={handleLogin}>Connexion</button>
                <p className={styles.linkRegister} onClick={() => setForm('register')}>Créer un compte</p>
            </div>
        </div>
    )
}