import React, { useState } from "react";
import styles from "./Register.module.css"
import { auth, db } from "../../firebase";

export default function Login({ setForm }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleFullName = (e) => setFullName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value)

    const handleRegister = () => {
        if (password === confirmPassword) {
            auth.createUserWithEmailAndPassword(email, confirmPassword)
                .then(() => {
                    db.collection("users").doc().set({
                        email: email,
                        fullName: fullName,
                    })
                        .then(() => {
                            console.log("Document successfully written!");
                            setForm('login')
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(`${errorCode} : ${errorMessage}`)
                });
        } else {
            alert('Le mot de passe et la confirmation du mot de passe sont différent !')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerRegister}>
                <p className={styles.title}>Register</p>
                <div className={styles.fullName}>
                    <p>Nom Prénom :</p>
                    <input type="text" placeholder="Nom Prénom" onChange={e => handleFullName(e)} />
                </div>
                <div className={styles.email}>
                    <p>Email :</p>
                    <input type="email" placeholder="Email" onChange={e => handleEmail(e)} />
                </div>
                <div className={styles.password}>
                    <p>Mot de passe :</p>
                    <input type="password" placeholder="Mot de passe" onChange={e => handlePassword(e)} />
                </div>
                <div className={styles.password}>
                    <p>Confirmer mot de passe :</p>
                    <input type="password" placeholder="Confirmer mot de passe" onChange={e => handleConfirmPassword(e)} />
                </div>
                <button className={styles.btnConnection} onClick={handleRegister}>S'inscrire</button>
            </div>
        </div>
    )
}