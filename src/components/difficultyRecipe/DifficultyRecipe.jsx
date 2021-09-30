import React, { useState } from 'react'
import styles from './difficultyRecipe.module.css'

export default function DifficultyRecipe({ value, onChange = () => null }) {
    const [difficulty, setDifficulty] = useState('')

    const handleChange = difficulty => () => {
        onChange(difficulty)
        setDifficulty(difficulty)
    }

    return (
        <>
            <button
                className={(difficulty === 'easy' ? styles.easy : styles.btnDifficulty)}
                onClick={handleChange('easy')}
            >
                Facile
            </button>
            <button
                className={(difficulty === 'medium' ? styles.medium : styles.btnDifficulty)}
                onClick={handleChange('medium')}
            >
                Moyen
            </button>
            <button
                className={(difficulty === 'hard' ? styles.hard : styles.btnDifficulty)}
                onClick={handleChange('hard')}
            >
                Difficile
            </button>
        </>
    )
}