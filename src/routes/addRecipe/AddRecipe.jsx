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
    const [userName, setUserName] = useState('')
    const [recipeName, setRecipeName] = useState('')
    const [photo, setPhoto] = useState(null)
    const [difficulty, setDifficulty] = useState('')
    const [preparationTime, setPreparationTime] = useState(0)
    const [restTime, setRestTime] = useState(0)
    const [cookingTime, setCookingTime] = useState(0)
    const [nbPersons, setNbPersons] = useState(0)
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])

    const handleRecipeName = e => setRecipeName(e.target.value)
    const handlePreparationTime = e => setPreparationTime(e.target.value)
    const handleRestTime = e => setRestTime(e.target.value)
    const handleCookingTime = e => setCookingTime(e.target.value)
    const handleNbPersons = e => setNbPersons(e.target.value)

    useEffect(() => {
        getUser();
    }, []);

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
                name: recipeName,
                author: {
                  username: userName,
                },
                image: urlImage,
                duration: {
                  cooking: Number(cookingTime),
                  rest: Number(restTime),
                  preparation: Number(preparationTime),
                },
                nbPersons: Number(nbPersons),
                level: difficulty,
                score: 0,
                steps,
              })
        
              for (let ingredient of ingredients) {
                await db
                  .collection(`recipes/${doc.id}/ingredients`)
                  .add(ingredient)
              }
              console.log('succes')
        } catch (e) {
            console.warn(e)
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Ajouter une recette</p>
            <div className={styles.divRecipeName}>
                <label htmlFor="recipeName">Nom de la recette</label>
                <input type="text" id="recipeName" onChange={e => handleRecipeName(e)} />
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
                <input type="number" id="preparation" onChange={e => handlePreparationTime(e)} />
            </div>
            <div className={styles.divRestTime}>
                <label htmlFor="rest">Temps de repos (en minutes)</label>
                <input type="number" id="rest" onChange={e => handleRestTime(e)} />
            </div>
            <div className={styles.divCookingTime}>
                <label htmlFor="cooking">Temps de cuisson (en minutes)</label>
                <input type="number" id="cooking" onChange={e => handleCookingTime(e)} />
            </div>
            <div className={styles.divNbPersons}>
                <label htmlFor="nbPersons">Nombre de personnes</label>
                <input type="number" id="nbPersons" onChange={e => handleNbPersons(e)} />
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