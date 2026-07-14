import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Volume2, VolumeX, X, Share2, Pause, Play } from 'lucide-react';

const VideoCarousel = ({ videos, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      scrollToVideo(initialIndex, false);
    }, 100);
  }, [initialIndex]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === currentIndex && isPlaying) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [currentIndex, isPlaying]);

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

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">

        <button
          onClick={onClose}
          className="p-2 rounded-md bg-gray-900/20 text-white hover:bg-gray-900/40 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Check out this video',
                url: window.location.href
              });
            }
          }}
          className="p-2 rounded-md bg-gray-900/20 text-white hover:bg-gray-900/40 transition"
        >
          <Share2 className="w-6 h-6" />
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
            className="w-full h-full snap-start flex items-center justify-center bg-black"
          >

            <video
              ref={el => videoRefs.current[index] = el}
              src={video}
              loop
              muted={isMuted}
              playsInline
              preload="none"
              className="w-full h-full object-contain"
              onClick={togglePlayPause}
            />

          </div>

        ))}

      </div>


      {/* Right Controls */}

      <div className="absolute bottom-1/3 right-4 z-50 flex flex-col gap-3">

        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="p-2 rounded-md bg-gray-900/30 text-white hover:bg-gray-900/50 transition"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}

        {currentIndex < videos.length - 1 && (
          <button
            onClick={goToNext}
            className="p-2 rounded-md bg-gray-900/30 text-white hover:bg-gray-900/50 transition"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        )}

      </div>


      {/* Audio Controls */}

      <div className="absolute top-20 right-4 z-50 flex flex-col gap-2">

        <button
          onClick={toggleMute}
          className="p-2 rounded-md bg-gray-900/30 text-white hover:bg-gray-900/50 transition"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>

        <button
          onClick={togglePlayPause}
          className="p-2 rounded-md bg-gray-900/30 text-white hover:bg-gray-900/50 transition"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

      </div>


      {/* Counter */}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white text-sm bg-black/50 px-4 py-2 rounded-full font-medium">
        {currentIndex + 1} / {videos.length}
      </div>

    </div>
  );
};

export default VideoCarousel;
