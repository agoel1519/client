import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize2, 
  X 
} from 'lucide-react';
import './VideoShowcase.css';

const featuredVideo = {
  id: 1,
  thumbnail: '/banners/banner-wellness.jpg',
  videoUrl: ''
};

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePlayVideo = () => {
    setShowModal(true);
    setIsPlaying(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsPlaying(false);
  };

  return (
    <section className="video-section" id="media">
      <div className="video-container">
        {/* Single Pure Clean Video Frame */}
        <div className="featured-video-card">
          <div className="featured-video-media">
            <img 
              src={featuredVideo.thumbnail} 
              alt="Aevora Video" 
              className="featured-thumbnail"
              loading="lazy"
              decoding="async"
            />

            {/* Centered Glowing Play Button */}
            <button 
              className="play-btn-pulse" 
              onClick={handlePlayVideo}
              aria-label="Play Video"
            >
              <div className="pulse-ring"></div>
              <div className="play-btn-circle">
                <Play size={32} className="play-icon" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal Player (Cinematic Popup) */}
      {showModal && (
        <div className="video-modal-backdrop" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeModal} aria-label="Close Video">
              <X size={24} />
            </button>

            <div className="modal-player-wrapper">
              <div className="simulated-player">
                <img 
                  src={featuredVideo.thumbnail} 
                  alt="Aevora Video" 
                  className="modal-backdrop-img" 
                />
                <div className="modal-player-overlay">
                  <div className="player-brand-tag">
                    <img src="/aevora-logo-clean.png" alt="Aevora" className="player-logo" />
                  </div>

                  {/* Player Controls Bar */}
                  <div className="player-controls-bar">
                    <button 
                      className="control-btn"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>

                    <div className="progress-bar-container">
                      <div className="progress-fill" style={{ width: '45%' }}></div>
                    </div>

                    <button className="control-btn">
                      <Volume2 size={18} />
                    </button>
                    <button className="control-btn">
                      <Maximize2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoShowcase;
