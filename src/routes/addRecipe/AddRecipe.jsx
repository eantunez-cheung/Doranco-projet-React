import React, { useState } from 'react';
import NavBar from '../../components/navBar/NavBar.jsx';
import styles from './addRecipe.module.css'
import PhotoUploader from '../../components/photoUploader/PhotoUploader.jsx';
import DifficultyRecipe from '../../components/difficultyRecipe/DifficultyRecipe.jsx';

export default function AddRecipe ({isConnected}) {
    const [recipeName, setRecipeName] = useState('')
    const [photo, setPhoto] = useState(null)
    const [difficulty, setDifficulty] = useState('')
    const [preparationTime, setPreparationTime] = useState('')
    const [restTime, setRestTime] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [nbPeople, setNbPeople] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])

    console.log(difficulty)

    return (
        <div className={styles.container}>
            <p className={styles.title}>Ajouter une recette</p>
            <div>
                <label>Nom de la recette</label>
                <input type="text" placeholder="Nom de la recette" />
            </div>
            <div>
                <label htmlFor="photo">Photo</label>
                <PhotoUploader id='photo' onChange={setPhoto}/>
            </div>
            <div>
                <label htmlFor="difficulty">Difficulté</label>
                <DifficultyRecipe onChange={setDifficulty} />
            </div>
            <div>
                <label htmlFor="preparation">Temps de préparation (en minutes)</label>
                <input type="number" id="preparation" onChange={e => setPreparationTime(e)} />
            </div>
            <div>
                <label htmlFor="rest">Temps de repos (en minutes)</label>
                <input type="number" id="rest" onChange={e => setRestTime(e)} />
            </div>
            <div>
                <label htmlFor="cooking">Temps de cuisson (en minutes)</label>
                <input type="number" id="cooking" onChange={e => setCookingTime(e)} />
            </div>
            <NavBar activeMenu="ajouter" isConnected={isConnected} />
        </div>
    )
}