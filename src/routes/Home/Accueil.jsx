import React, { useEffect, useState } from "react";
import styles from "./Accueil.module.css";
import Thumbnail from "../../components/Thumbnail.jsx";
import { db } from "../../firebase";
import NavBar from "../../components/NavBar.jsx";
import Login from "../../components/Login";

export default ({ connected }) => {
  const [RecetteThumbnail, setRecetteThumbnail] = useState([]);
  const [connection, setConnection] = useState(true)

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
        <NavBar activeMenu="accueil" isConnected={connected.isConnected} setConnection={setConnection} />
      </div>
      {
        (connection ? <Login /> : '')
      }
    </div>
  );
};
