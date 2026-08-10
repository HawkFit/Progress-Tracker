import { useState } from 'react'

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([])

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newPhoto = {
          id: Date.now(),
          src: event.target.result,
          date: new Date().toLocaleDateString()
        }
        setPhotos([newPhoto, ...photos])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="photo-gallery">
      <h2>Progress Photos</h2>
      
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          id="photo-input"
          style={{ display: 'none' }}
        />
        <label htmlFor="photo-input" className="btn-primary">
          Upload Photo
        </label>
      </div>

      <div className="gallery-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.src} alt="Progress" />
            <p>{photo.date}</p>
          </div>
        ))}
      </div>

      {photos.length === 0 && <p>No photos yet. Upload your first progress photo!</p>}
    </div>
  )
}
