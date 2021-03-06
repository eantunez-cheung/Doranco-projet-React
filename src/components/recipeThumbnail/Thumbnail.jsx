import React from "react";
import { Link } from "react-router-dom";
import styles from "./Thumbnail.module.css";

export default function Thumbnail({ id, title, time, favorite, difficulty, grade, image }) {
  return (
    <Link to={`/Recette/${id}`} className={styles.link}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={image} className={styles.image} />
        </div>
        <div className={styles.firstLineContainer}>
          <p className={styles.title}>{title}</p>
          {favorite ? (
            <i class="fas fa-heart fa-2x" />
          ) : (
            <i class="far fa-heart fa-2x" />
          )}
        </div>
        <div className={styles.secondLineContainer}>
          <p className={styles.timing}>{time}</p>
        </div>
        <div className={styles.thirdLineContainer}>
          <p
            id="diff"
            className={
              styles.difficulty +
              " " +
              (difficulty === "facile"
                ? styles.easy
                : difficulty === "moyenne"
                  ? styles.medium
                  : difficulty === "difficile"
                    ? styles.hard
                    : "")
            }
          >
            {difficulty}
          </p>
          <p className={styles.grade}>
            {Array(grade)
              .fill(null)
              .map(() => (
                <i class="fas fa-star" />
              ))}
          </p>
        </div>
      </div>
    </Link>
  );
};
