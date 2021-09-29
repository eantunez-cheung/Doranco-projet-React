import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styles from './Welcome.module.css';

export default function Welcome({ user, setForm }) {
    const [fullName, setFullName] = useState('')

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        var docRef = db.collection("users").doc(user);

        docRef.get().then((doc) => {
            if (doc.exists) {
                let infoUser = doc.data()
                setFullName(infoUser.fullName)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    return (
        <div className={styles.container} onClick={() => setForm('')}>
            <div className={styles.containerWelcome}>
                <p>Bienvenue {fullName}</p>
                <i class="far fa-smile-beam fa-2x"></i>
            </div>
        </div>
    )
}