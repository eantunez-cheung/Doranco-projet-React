import React, { useState } from "react";
import styles from "./Login.module.css"
import { auth, db } from "../../firebase";

export default function Login({ form, setIsConnected, setUser }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                db.collection("users").where("email", "==", email)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            setUser(doc.id)
                            setIsConnected(true)
                            form.setForm('welcome')
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });

            })
            .catch((error) => {
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
                <p className={styles.linkRegister} onClick={() => form.setForm('register')}>Créer un compte</p>
            </div>
        </div>
    )
}