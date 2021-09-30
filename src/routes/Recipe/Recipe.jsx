import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { db } from "../../firebase";
import styles from "./recipe.module.css";
import TopRecipe from "./TopRecipe";

export default function Recipe(props) {
  const [recipe, setRecipe] = useState({});
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
      <NavBar activeMenu="" isConnected={props.isConnected} form={props.form}/>
    </div>
  );
}
