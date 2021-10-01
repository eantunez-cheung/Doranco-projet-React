import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/NavBar.jsx';
import styles from './addRecipe.module.css'
import PhotoUploader from '../../components/photoUploader/PhotoUploader.jsx';
import DifficultyRecipe from '../../components/difficultyRecipe/DifficultyRecipe.jsx';
import Ingredient from '../../components/ingredient/Ingredient.jsx';
import RecipeStep from '../../components/recipeStep/RecipeStep.jsx';
import { db, storage } from '../../firebase'
import uid from 'short-uuid'

export default function AddRecipe({ isConnected, user }) {
    const [userName, setUserName] = useState({})
    const [recipeName, setRecipeName] = useState('')
    const [photo, setPhoto] = useState(null)
    const [difficulty, setDifficulty] = useState('')
    const [preparationTime, setPreparationTime] = useState('')
    const [restTime, setRestTime] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [nbPeople, setNbPeople] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])

    useEffect(() => {
        getUser();
    }, []);

    console.log(userName)

    const getUser = () => {
        var docRef = db.collection("users").doc(user);

        docRef.get().then((doc) => {
            if (doc.exists) {
                const userInfo = doc.data()
                setUserName(userInfo.fullName)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const handleSave = async () => {
        try {
            const ref = `${uid.generate()}-${photo.name}`
            await storage.ref(ref).put(photo)
            const urlImage = await storage.ref(ref).getDownloadURL()

            const doc = await db.collection('recipes').add({
                recipeName,
                author: {
                  username: userName,
                },
                urlImage,
                duration: {
                  cooking: Number(cookingTime),
                  rest: Number(restTime),
                  preparation: Number(preparationTime),
                },
                nbPeople,
                level: difficulty,
                score: 0,
                steps,
              })
        
              for (let ingredient of ingredients) {
                await db
                  .collection(`recipes/${doc.id}/ingredients`)
                  .add(ingredient)
              }
        } catch (e) {
            console.warn(e)
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Ajouter une recette</p>
            <div className={styles.divRecipeName}>
                <label htmlFor="recipeName">Nom de la recette</label>
                <input type="text" id="recipeName" onChange={e => setRecipeName(e)} />
            </div>
            <div className={styles.divPhoto}>
                <label htmlFor="photo">Photo</label>
                <PhotoUploader id='photo' onChange={setPhoto} />
            </div>
            <div className={styles.divDifficulty}>
                <label htmlFor="difficulty">Difficulté</label>
                <DifficultyRecipe onChange={setDifficulty} />
            </div>
            <div className={styles.divPreparationTime}>
                <label htmlFor="preparation">Temps de préparation (en minutes)</label>
                <input type="number" id="preparation" onChange={e => setPreparationTime(e)} />
            </div>
            <div className={styles.divRestTime}>
                <label htmlFor="rest">Temps de repos (en minutes)</label>
                <input type="number" id="rest" onChange={e => setRestTime(e)} />
            </div>
            <div className={styles.divCookingTime}>
                <label htmlFor="cooking">Temps de cuisson (en minutes)</label>
                <input type="number" id="cooking" onChange={e => setCookingTime(e)} />
            </div>
            <div className={styles.divNbPeople}>
                <label htmlFor="nbPeople">Nombre de personnes</label>
                <input type="number" id="nbPeople" onChange={e => setNbPeople(e)} />
            </div>
            <div className={styles.divIngredient}>
                <label htmlFor="ingredient">Ingrédients</label>
                <Ingredient ingredients={ingredients} onChange={setIngredients} />
            </div>
            <div className={styles.divStep}>
                <label htmlFor="step">Etapes</label>
                <RecipeStep steps={steps} onChange={setSteps} />
            </div>
            <button className={styles.btnSave} onClick={handleSave}>Sauvegarder</button>
            <NavBar activeMenu="ajouter" isConnected={isConnected} />
        </div>
    )
}