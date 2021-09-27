import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import { db } from "../firebase";
import styles from "./Recette.module.css";
import { Button } from "@material-ui/core";

export default function Recette(props) {
  const [recipe, setRecipe] = useState({});
  const url = props.match.url.split("/");
  const id = url[2];

  useEffect(() => {
    getRecipe();
  }, []);

  console.log(recipe);

  const getRecipe = () => {
    db.collection("Thumbnails")
      .doc(id)
      .get()
      .then((doc) => {
        setRecipe(doc.data());
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={recipe.image} className={styles.image} />
      </div>
      <div className={styles.firstLineImageContainer}>
        <Button className={styles.button}>
          <i class="fas fa-arrow-left fa-2x"></i>
        </Button>
        <p className={styles.title}>{recipe.title}</p>
      </div>
      <NavBar activeMenu="" />
    </div>
  );
}
