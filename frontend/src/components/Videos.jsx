import React, { useEffect, useRef, useState } from 'react';
import { videos } from '../assets/assets';
import Title from './Title';

// Video Carousel Component (Embedded)
const VideoCarousel = ({ videos, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);

  // Initialize - scroll to initial video
  useEffect(() => {
    setTimeout(() => {
      scrollToVideo(initialIndex, false);
    }, 100);
  }, [initialIndex]);

  // Play/pause current video
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      
      if (index === currentIndex && isPlaying) {
        video.play().catch(err => console.log('Play error:', err));
      } else {
        video.pause();
      }
    });
  }, [currentIndex, isPlaying]);

  // Handle scroll to snap to video
  const handleScroll = () => {
    if (isScrolling.current) return;
    
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const videoHeight = container.clientHeight;
    const newIndex = Math.round(scrollTop / videoHeight);

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < videos.length) {
      setCurrentIndex(newIndex);
    }
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const goToNext = () => {
    if (currentIndex < videos.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToVideo(newIndex);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToVideo(newIndex);
    }
  };

  const scrollToVideo = (index, smooth = true) => {
    const container = containerRef.current;
    if (container) {
      isScrolling.current = true;
      container.scrollTo({
        top: index * container.clientHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    videoRefs.current.forEach(video => {
      if (video) video.muted = newMutedState;
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Icons as SVG components
  const XIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );

  const ShareIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
    </svg>
  );

  const VolumeIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
      <path d="M10.5 3.75a.75.75 0 0 0-1.264-.546L5.203 7H2.667a.75.75 0 0 0-.7.48A6.985 6.985 0 0 0 1.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 0 0 1.264-.546V3.75ZM16.45 5.05a.75.75 0 0 0-1.06 1.061 5.5 5.5 0 0 1 0 7.778.75.75 0 0 0 1.06 1.06 7 7 0 0 0 0-9.899Z" />
      <path d="M14.329 7.172a.75.75 0 0 0-1.061 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 0 0 1.06 1.06 4 4 0 0 0 0-5.656Z" />
    </svg>
  );

  const MuteIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
      <path d="M10.047 3.062a.75.75 0 0 1 .453.688v12.5a.75.75 0 0 1-1.264.546L5.203 13H2.667a.75.75 0 0 1-.7-.48A6.985 6.985 0 0 1 1.5 10c0-.887.165-1.737.468-2.52a.75.75 0 0 1 .7-.48h2.535l4.033-3.796a.75.75 0 0 1 .811-.142ZM13.78 7.22a.75.75 0 1 0-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L16.56 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L15.5 8.94l-1.72-1.72Z" />
    </svg>
  );

  const PauseIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
      <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
      <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
    </svg>
  );

  const ChevronUpIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <button
          onClick={onClose}
          className="p-2 rounded-md bg-gray-900/20 text-white hover:bg-gray-900/40 transition"
          aria-label="Close"
        >
          <XIcon />
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Check out this video',
                url: window.location.href
              }).catch(() => {});
            }
          }}
          className="p-2 rounded-md bg-gray-900/20 text-white hover:bg-gray-900/40 transition"
          aria-label="Share"
        >
          <ShareIcon />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-16 left-0 right-0 z-50 px-4">
        <div className="w-full h-0.5 bg-gray-600/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / videos.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Video Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {videos.map((video, index) => (
          <div
            key={index}
            className="w-full h-full snap-start snap-always flex items-center justify-center bg-black"
          >
            <video
              ref={el => videoRefs.current[index] = el}
              src={video}
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-contain"
              onClick={togglePlayPause}
            />
          </div>
        ))}
      </div>

      {/* Right Side Controls */}
      <div className="absolute bottom-1/3 right-4 z-50 flex flex-col gap-3">
        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="p-2 rounded-md bg-gray-900/30 text-white hover:bg-gray-900/50 transition"
            aria-label="Previous Video"
          >
            <ChevronUpIcon />
          </button>
        )}

        {currentIndex < videos.length - 1 && (
          <button
            onClick={goToNext}
            className="p-2 rounded-md bg-gray-900/30 text-white hover:bg-gray-900/50 transition"
            aria-label="Next Video"
          >
            <ChevronDownIcon />
          </button>
        )}
      </div>

      {/* Audio/Video Controls - Top Right */}
      <div className="absolute top-20 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={toggleMute}
          className="p-2 rounded-md bg-gray-900/30 text-white hover:bg-gray-900/50 transition"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MuteIcon /> : <VolumeIcon />}
        </button>

        <button
          onClick={togglePlayPause}
          className="p-2 rounded-md bg-gray-900/30 text-white hover:bg-gray-900/50 transition"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>

      {/* Video Counter */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white text-sm bg-black/50 px-4 py-2 rounded-full font-medium">
        {currentIndex + 1} / {videos.length}
      </div>
    </div>
  );
};

// Main Videos Component
const Videos = () => {
  const scrollRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    const interval = setInterval(() => {
      container.scrollBy({
        left: 260,
        behavior: 'smooth',
      });
      
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  const handleVideoClick = (index) => {
    setSelectedVideo(index);
  };

  const handleCloseCarousel = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="w-full py-20 bg-[#f7e9d6] overflow-hidden">
      {/* Title */}
      <div className="text-center mb-14">
        <Title text1="WATCH &" text2="BUY" />
      </div>
      
      {/* Auto Scroll Videos */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-6 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {[...videos, ...videos].map((video, index) => (
          <VideoCard 
            key={index} 
            src={video} 
            onClick={() => handleVideoClick(index % videos.length)}
          />
        ))}
      </div>
      
      {/* Show More Button */}
      <div className="mt-16 text-center">
        <a
          href="https://www.instagram.com/royalcollection___22?igsh=NXQzMm0wazcwYXBh&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-black px-10 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition"
        >
          SHOW MORE ON INSTAGRAM
        </a>
      </div>

      {/* Full Screen Video Carousel */}
      {selectedVideo !== null && (
        <VideoCarousel 
          videos={videos}
          initialIndex={selectedVideo}
          onClose={handleCloseCarousel}
        />
      )}
    </section>
  );
};

/* VERTICAL VIDEO CARD (MOBILE FRIENDLY) */
const VideoCard = ({ src, onClick }) => (
  <div
    className="
      min-w-[200px]
      sm:min-w-[240px]
      md:min-w-[260px]
      flex justify-center
      cursor-pointer
      hover:opacity-90
      transition
    "
    onClick={onClick}
  >
    <div
      className="
        w-full
        aspect-[9/16]
        overflow-hidden
        rounded-xl
        shadow-lg
      "
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover bg-black"
      />
    </div>
  </div>
);

export default Videos;
