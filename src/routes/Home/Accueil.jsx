import React, { useEffect, useState } from "react";
import styles from "./Accueil.module.css";
import Thumbnail from "../../components/recipeThumbnail/Thumbnail.jsx";
import { db } from "../../firebase";
import NavBar from "../../components/navBar/NavBar.jsx";
import Login from "../../components/login/Login";
import Register from '../../components/register/Register';
import Welcome from "../../components/welcome/Welcome";

export default ({ connected, setUser }) => {
  const [RecetteThumbnail, setRecetteThumbnail] = useState([]);
  const [form, setForm] = useState('')
  const [email, setEmail] = useState('')

  setUser(email)

  useEffect(() => {
    const fetchRecetteThumbnail = async () => {
      const snapshot = await db.collection("Thumbnails").get();
      const receivedRecetteThumbnail = snapshot.docs.map((document) => {
        return {
          ...document.data(),
          id: document.id,
        };
      });
      setRecetteThumbnail(receivedRecetteThumbnail);
    };
    fetchRecetteThumbnail();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <p className={styles.titlePage}>Nos dernières recettes</p>
        {RecetteThumbnail.map((thumbnail) => (
          <Thumbnail
            key={`thumbnail-${thumbnail.id}`}
            id={thumbnail.id}
            title={thumbnail.title}
            time={thumbnail.time}
            favorite={thumbnail.favorite}
            image={thumbnail.image}
            difficulty={thumbnail.difficulty}
            grade={thumbnail.grade}
          />
        ))}
        <NavBar activeMenu="accueil" isConnected={connected.isConnected} setForm={setForm} />
      </div>
      {
        (form === 'login' ? <Login setIsConnected={connected.setIsConnected} setForm={setForm} setUser={setEmail} /> : form === 'register' ? <Register setForm={setForm} /> : form === 'welcome' ? <Welcome user={email} setForm={setForm} /> : '')
      }
    </div>
  );
};
