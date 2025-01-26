// src/App.js
import { useState } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [singleImage, setSingleImage] = useState('');
  const [limit, setLimit] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jellyfish-app-oxxq8.ondigitalocean.app/nekos/random?limit=${limit}`
      );
      const data = await response.json();
      setImages(data);
      setSingleImage(''); // Clear single image
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setLoading(false);
  };

  const fetchSingleImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://jellyfish-app-oxxq8.ondigitalocean.app/nekos/random/file'
      );
      const imageUrl = await response.text();
      setSingleImage(imageUrl);
      setImages([]); // Clear multiple images
    } catch (error) {
      console.error('Error fetching single image:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Neko Images</h1>
      <div className="controls">
        <div>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Math.max(1, e.target.value))}
            min="1"
          />
          <button onClick={fetchImages} disabled={loading}>
            Get {limit} Images
          </button>
        </div>
        <button onClick={fetchSingleImage} disabled={loading}>
          Get Single Image
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="gallery">
        {images.map((image, index) => (
          <div key={index} className="card">
            <img src={image.url} alt={`Neko ${index + 1}`} />
            <div className="details">
              <p>Artist: {image.artist?.name || 'Unknown'}</p>
              <p>Source: {image.source || 'N/A'}</p>
            </div>
          </div>
        ))}
        
        {singleImage && (
          <div className="card">
            <img src={singleImage} alt="Random Neko" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;