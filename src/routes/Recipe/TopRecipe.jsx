import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import styles from "./TopRecipe.module.css";

export default function TopRecipe({title, image, favorite}) {
    return (
        <div>
            <div className={styles.imageContainer}>
                <img src={image} className={styles.image} />
            </div>
            <div className={styles.firstLineImageContainer}>
                <Button component={Link} exact to='/Accueil' className={styles.button}>
                    <i class="fas fa-arrow-left fa-2x"></i>
                </Button>
                <p className={styles.title}>{title}</p>
            </div>
            <div className={styles.secondLineImageContainer}>
                {favorite ? (
                    <i class="fas fa-heart fa-2x" />
                ) : (
                    <i class="far fa-heart fa-2x" />
                )}
            </div>
        </div>
    )
}