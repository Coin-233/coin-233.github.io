import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

const EXTERNAL_IMAGES = [
  "https://img.sakuras.in/uploads/20260523/604aa3f6cc450df0f6460df7dcc8c93b.jpg",
  "https://img.sakuras.in/uploads/20260523/348b5048d2636bf81086a2733dbdd851.jpg",
  "https://img.sakuras.in/uploads/20260523/ace31f05f9a64b3a89d9b631a09e05ee.jpg",
  "https://img.sakuras.in/uploads/20260523/0e25efe12c3d8c15fc8a73680faebca2.jpg",
  "https://img.sakuras.in/uploads/20260523/732dec2bc52b8ced9af0fd1bc151c775.png",
  "https://img.sakuras.in/uploads/20260523/e59abd781823c4e92d0d90e07e1f4839.png"
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const lastSnapOffsetRef = useRef(0);
  const autoPlayTimerRef = useRef<number | null>(null);

  // 轮播
  const startAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    autoPlayTimerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % EXTERNAL_IMAGES.length);
    }, 10000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
  }, []);

  useEffect(() => {
    if (isGalleryOpen) stopAutoPlay();
    else startAutoPlay();
    return () => stopAutoPlay();
  }, [isGalleryOpen, startAutoPlay, stopAutoPlay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % EXTERNAL_IMAGES.length);
    startAutoPlay();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + EXTERNAL_IMAGES.length) % EXTERNAL_IMAGES.length);
    startAutoPlay();
  };

  const handleThumbClick = (index: number) => {
    setCurrentIndex(index);
    setIsGalleryOpen(false);
  };
  
  const handlePointerDown = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setOffsetX(0);
    lastSnapOffsetRef.current = 0;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    stopAutoPlay(); // 拖拽时暂停轮播
  };

  const handlePointerMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setOffsetX(clientX - startX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    lastSnapOffsetRef.current = offsetX;
    
    // 有效切换值
    const threshold = 100; 
    
    if (offsetX > threshold) handlePrev();
    else if (offsetX < -threshold) handleNext();
    else startAutoPlay();
    
    setOffsetX(0);
  };

  return (
    <div className="app-main-container">
      
      {/* 渐变背景 */}
      <div 
        className="background-full-slider"
        onTouchStart={handlePointerDown} onTouchMove={handlePointerMove} onTouchEnd={handlePointerUp}
        onMouseDown={handlePointerDown} onMouseMove={handlePointerMove} onMouseUp={handlePointerUp} onMouseLeave={handlePointerUp}
      >
        {EXTERNAL_IMAGES.map((src, index) => {
          const len = EXTERNAL_IMAGES.length;
          let diff = index - currentIndex;
          if (diff < -len / 2) diff += len;
          if (diff > len / 2) diff -= len;
          if (Math.abs(diff) > 1) return null;

          const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
          const percent = Math.max(-1, Math.min(1, offsetX / (screenWidth * 0.5)));

          let opacity = diff === 0 ? 1 : 0;
          
          if (isDragging) {
            if (diff === 0) {
              opacity = 1 - Math.abs(percent);
            } else if (diff === 1 && percent < 0) {
              opacity = Math.abs(percent);
            } else if (diff === -1 && percent > 0) {
              opacity = Math.abs(percent);
            }
          }

          let zIndex = 1;
          
          if (isDragging) {
            if (diff === 0) zIndex = 1;
            else if ((diff === 1 && percent < 0) || (diff === -1 && percent > 0)) {
              zIndex = 2;
            }
          } else {
            if (diff === 0) {
              zIndex = 2;
            } else if (
              (diff === -1 && lastSnapOffsetRef.current < 0) ||
              (diff === 1 && lastSnapOffsetRef.current > 0)
            ) {
              zIndex = 1;
            }
          }

          return (
            <img 
              key={index} 
              src={src} 
              className={`bg-image-layer ${!isDragging ? 'snap-transition' : ''}`}
              style={{
                opacity: opacity,
                zIndex: zIndex
              }}
              alt="bg" 
              draggable={false}
            />
          );
        })}
      </div>

      <header className="top-nav-bar">
        <nav>
          <a href="#home">HOME GALLERY</a>
          <a href="#info">INFORMATION</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      <div className="center-signature-area">
        <h1>氷の妖精</h1>
        <p>バカ</p>
      </div>

      <div className={`bottom-left-copyright-text ${isGalleryOpen ? 'hidden' : ''}`}>
        Copyright © 2026
      </div>

      {/* 右下角按钮 */}
      <div className="bottom-right-fixed-controls">
        <button className="fixed-play-btn" onClick={handleNext}>
          <svg viewBox="0 0 24 24" fill="white"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
        </button>
        
        <button className="fixed-toggle-btn" onClick={() => setIsGalleryOpen(!isGalleryOpen)}>
          {isGalleryOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
              <circle cx="12" cy="12" r="11" fill="white" stroke="none" />
              <line x1="16" y1="8" x2="8" y2="16"></line>
              <line x1="8" y1="8" x2="16" y2="16"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          )}
        </button>
      </div>

      {/* 画廊列表背景 */}
      <div className={`bottom-gallery-transparent-bar ${isGalleryOpen ? 'open' : ''}`}>
        <div className="gallery-thumbnail-track">
          {EXTERNAL_IMAGES.map((src, index) => (
            <div 
              key={index} 
              className="gallery-thumb-wrapper" 
              onClick={() => handleThumbClick(index)}
            >
              <img src={src} alt={`thumb-${index}`} draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;