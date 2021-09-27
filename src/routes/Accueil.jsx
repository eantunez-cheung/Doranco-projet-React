import React, { useEffect, useState } from "react";
import styles from "./Accueil.module.css";

import Thumbnail from "../components/Thumbnail.jsx";
import { db } from "../firebase";

import NavBar from "../components/NavBar.jsx";
import { StylesContext } from "@material-ui/styles";

export default () => {
  const [RecetteThumbnail, setRecetteThumbnail] = useState([]);

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
      <h1>Nos dernières recettes</h1>
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
      <NavBar activeMenu="accueil" />
    </div>
  );
};
