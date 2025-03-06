import React, { useState } from 'react';
import './App.css';

function App() {
  const [story, setStory] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story }),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setStory('');
      } else {
        alert('Something went wrong. Please try again!');
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      alert('Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <div className="header">
          <div className="title-container">
            <span className="title-sparkle sparkle1">✨</span>
            <span className="title-sparkle sparkle2">✨</span>
            <span className="title-sparkle sparkle3">✨</span>
            <span className="title-sparkle sparkle4">✨</span>
            <h1>She Speaks, We Listen</h1>
          </div>
          <p className="subtitle">Share your magical story and inspire the world!</p>
        </div>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="story-form">
            <div className="form-group">
              <label htmlFor="story">Your Amazing Story</label>
              <textarea
                id="story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Once upon a time in a land of dreams..."
                required
                rows={10}
              />
            </div>
            
            <button 
              className="submit-button" 
              type="submit" 
              disabled={loading || !story.trim()}
            >
              {loading ? 'Sending your story...' : 'Share My Story! 💫'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <h2>✨ Thank you for sharing your story! ✨</h2>
            <p>Your voice matters and inspires others. Your story has been added to our magical collection.</p>
            <button className="new-story-button" onClick={() => setSubmitted(false)}>
              Share Another Story 💫
            </button>
          </div>
        )}
      </div>
      
      <div className="decorations">
        {/* Stars */}
        <div className="star star1">⭐</div>
        <div className="star star2">✨</div>
        <div className="star star3">⭐</div>
        <div className="star star4">✨</div>
        <div className="star star5">⭐</div>
        <div className="star star6">✨</div>
        <div className="star star7">⭐</div>
        
        {/* Hearts */}
        <div className="heart heart1">💖</div>
        <div className="heart heart2">💕</div>
        <div className="heart heart3">💗</div>
        <div className="heart heart4">💓</div>
        
        {/* Clouds */}
        <div className="cloud cloud1">☁️</div>
        <div className="cloud cloud2">☁️</div>
        
        {/* Butterflies */}
        <div className="butterfly butterfly1">🦋</div>
        <div className="butterfly butterfly2">🦋</div>
        
        {/* Rainbow */}
        <div className="rainbow rainbow1">🌈</div>
        
        {/* Sparkles */}
        <div className="sparkle sparkle1">✨</div>
        <div className="sparkle sparkle2">✨</div>
        <div className="sparkle sparkle3">✨</div>
        <div className="sparkle sparkle4">✨</div>
        <div className="sparkle sparkle5">✨</div>
        <div className="sparkle sparkle6">✨</div>
        <div className="sparkle sparkle7">✨</div>
        <div className="sparkle sparkle8">✨</div>
      </div>
    </div>
  );
}

export default App;