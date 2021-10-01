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
                className={styles.btnDifficulty + ' ' + (difficulty === 'easy' ? styles.easy : '')}
                onClick={handleChange('easy')}
            >
                Facile
            </button>
            <button
                className={styles.btnDifficulty + ' ' + (difficulty === 'medium' ? styles.medium : '')}
                onClick={handleChange('medium')}
            >
                Moyen
            </button>
            <button
                className={styles.btnDifficulty + ' ' + (difficulty === 'hard' ? styles.hard : '')}
                onClick={handleChange('hard')}
            >
                Difficile
            </button>
        </>
    )
}