import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { db } from "../../firebase";
import styles from "./Recette.module.css";
import TopRecipe from "./TopRecipe";

export default function Recette(props, {isConnected}) {
  const [recipe, setRecipe] = useState({});
  console.log(isConnected)
  const url = props.match.url.split("/");
  const id = url[2];


  useEffect(() => {
    getRecipe();
  }, []);

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
      <TopRecipe title={recipe.title} image={recipe.image} favorite={recipe.favorite} />
      <NavBar activeMenu="" isConnected={isConnected} />
    </div>
  );
}
