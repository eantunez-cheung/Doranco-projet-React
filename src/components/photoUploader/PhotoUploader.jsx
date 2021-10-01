import React, { useEffect, useState } from 'react'
import styles from './photoUploader.module.css'

export default function PhotosUploader({
  id = 'photos',
  onChange = () => null,
}) {
  const [photo, setPhoto] = useState(null)
  const [photoName, setPhotoName] = useState('')

  const handleFileChange = ev => {
    const files = ev.target.files


    const photo = files[0]

    const fileReader = new FileReader()

    fileReader.readAsDataURL(photo)
    fileReader.addEventListener('load', e => {
      setPhoto(e.target.result)
      setPhotoName(photo.name)
      onChange(photo)
    })
  }

  const removeFile = () => {
    setPhotoName('')
    setPhoto(null)
  }

  if (!photo) {
    return (
      <>
        <label htmlFor={id} className={styles.noPhotosContainer}>
          <input
            type='file'
            id={id}
            className={styles.fileInput}
            onChange={handleFileChange}
            accept='image/*'
          />
          <i className='far fa-images'></i>
          {/* <p>Ajouter une photo</p> */}
        </label>
      </>
    )
  }

  return (
    <>
      <div className={styles.preview}>
        <input
          type='file'
          id={id}
          className={styles.fileInput}
          onChange={handleFileChange}
          accept='image/*'
        />
        <img alt={photoName} src={photo} />
      </div>
      <button className='btn btn-red' onClick={removeFile}>
        Retirer image
      </button>
    </>
  )
}