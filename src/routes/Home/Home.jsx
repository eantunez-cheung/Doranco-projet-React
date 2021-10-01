import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Thumbnail from "../../components/recipeThumbnail/Thumbnail.jsx";
import { db } from "../../firebase";
import NavBar from "../../components/navBar/NavBar.jsx";
import Login from "../../components/login/Login";
import Register from '../../components/register/Register';
import Welcome from "../../components/welcome/Welcome";

export default function Home({ connected, user, form }) {
  const [RecetteThumbnail, setRecetteThumbnail] = useState([]);
  const [userId, setUserId] = useState('')

  if (userId !== user.user && userId !== '' ) {
    user.setUser(userId)
  }

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
    <div className={styles.container}>
      <div className={styles.containerThumbnail}>
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
        <NavBar activeMenu="accueil" isConnected={connected.isConnected} form={form} />
      </div>
      {
        (form.form === 'login' ? <Login setIsConnected={connected.setIsConnected} form={form} setUser={setUserId} /> : form.form === 'register' ? <Register setForm={form.setForm} /> : form.form === 'welcome' ? <Welcome user={userId} setForm={form.setForm} /> : '')
      }
    </div>
  );
};
