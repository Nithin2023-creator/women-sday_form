import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [story, setStory] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleStoryChange = (e) => {
    setStory(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least one field has content
    if (!story && !image) {
      setError('Please share your story or upload an image (or both)!');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    if (story) formData.append('story', story);
    if (image) formData.append('image', image);
    
    try {
      // Use absolute URL to backend - adjust this URL based on your deployment
      const apiUrl = process.env.REACT_APP_API_URL || 'https://women-sday-form-backend-4otecg7hj-nss-projects-62a124fd.vercel.app/';
      await axios.post(`${apiUrl}/api/stories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSubmitted(true);
      setStory('');
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error('Error details:', err);
      setError('Something went wrong! Please try again. ' + 
               (err.response?.data?.error || err.message || ''));
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setSubmitted(false);
    setError('');
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="app-container">
      <div className="floating-clouds">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
      </div>
      
      <div className="stars"></div>
      
      <header>
        <h1>✨ Share Your Story ✨</h1>
        <p>In celebration of Women's Day</p>
      </header>
      
      {!submitted ? (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="story-form">
            <div className="textarea-container">
              <label htmlFor="story">Your Story</label>
              <textarea
                id="story"
                value={story}
                onChange={handleStoryChange}
                placeholder="Share your journey, dreams, or experiences..."
                rows="6"
              />
            </div>
            
            <div className="file-upload">
              <label htmlFor="image" className="custom-file-upload">
                <span className="upload-icon">📷</span>
                <span>Add a photo</span>
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
              />
              
              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button type="button" onClick={removeImage} className="remove-image-btn">
                    ✕
                  </button>
                </div>
              )}
              
              {image && !imagePreview && <p className="file-name">{image.name}</p>}
            </div>
            
            {error && <p className="error">{error}</p>}
            
            <button 
              type="submit" 
              className="submit-button" 
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Share My Story ✨'}
            </button>
          </form>
        </div>
      ) : (
        <div className="success-message">
          <div className="success-icon">🎉</div>
          <h2>Thank You!</h2>
          <p>Your story has been added to our Women's Day celebration!</p>
          <button onClick={handleReset} className="new-story-button">
            Share Another Story
          </button>
        </div>
      )}
      
      <footer>
        <p>Your stories inspire us all! 💖</p>
      </footer>
    </div>
  );
}

export default App;