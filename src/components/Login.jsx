import React, { useState } from "react";
import styles from "./Login.module.css"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.Containerconnection}>
            <p className={styles.title}>Connexion</p>
            <div className={styles.email}>
                <p>Email :</p>
                <input type="text" placeholder="Email" onChange={e => handleEmail(e)} />
            </div>
            <div className={styles.password}>
                <p>Mot de passe :</p>
                <input type="password" placeholder="Mot de passe" onChange={e => handlePassword(e)} />
            </div>
            <button className={styles.btnConnection}>Connexion</button>
            <p className={styles.linkRegister}>Créer un compte</p>
            </div>
        </div>
    )
}