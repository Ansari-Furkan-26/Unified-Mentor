import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, MoreHorizontal, Volume } from 'lucide-react'; // Importing Lucide Icons

// Audio file import
import Soni from '../../assets/soni-soni.mp3'; // Update this path if needed

function Banner() {
  const audioRef = useRef(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); // Volume control (range from 0 to 1)
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 3 dots menu state
  const [showOverlay, setShowOverlay] = useState(true); // Control visibility of overlay (title, author, play/pause)
  const [isHovered, setIsHovered] = useState(false); // Track if the player is being hovered

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setShowOverlay(true); // Show overlay immediately when paused
    } else {
      audioRef.current.play();
      setShowOverlay(false); // Hide overlay when playing starts
      hideOverlayAfterDelay(); // Hide overlay after 2 seconds if paused
    }
    setIsPlaying(!isPlaying);
  };

  const hideOverlayAfterDelay = () => {
    setTimeout(() => {
      if (isPlaying) {
        setShowOverlay(false); // Hide overlay after 2 seconds
      }
    }, 2000);
  };

  const handleProgressChange = (event) => {
    const value = event.target.value;
    setProgress(value);
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
  };

  const handleVolumeChange = (event) => {
    const value = event.target.value;
    setVolume(value);
    audioRef.current.volume = value;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // Update the progress bar as the audio plays
  useEffect(() => {
    const updateProgress = () => {
      const progressValue = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressValue);
      setCurrentTime(audioRef.current.currentTime);
    };

    const updateDuration = () => {
      setDuration(audioRef.current.duration);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('loadedmetadata', updateDuration);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('loadedmetadata', updateDuration);
      }
    };
  }, []);

  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-1 lg:px-8">
        {/* Banner container */}
        <div className="block md:flex md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8">

          {/* Playlist of the Day */}
          <div className="flex-1 text-center md:text-left text-white bg-[#220125] py-8 px-6 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Playlist of the Day
            </h2>
            <p className="text-gray-400 mb-4">Discover new music to brighten your day</p>
            <img src="https://i.pinimg.com/736x/b0/9a/d3/b09ad30edc8bb8671c9ebd8b03eb109b.jpg" 
                alt="Playlist cover" className="w-full h-28 object-cover rounded-lg"/>
            </div>

          {/* Song Section */}
          <div className="flex-1 rounded-xl hidden overflow-hidden shadow-lg relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div
              className="w-full h-64 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://i.ytimg.com/vi/VUV7LkobH-I/maxresdefault.jpg)', // External Image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              <div className={`absolute z-0 inset-0 ${showOverlay || isHovered ? 'bg-black opacity-60' : ''}  p-4`}>
                <div className="text-white top-0 z-1">
                  {/* Title & Author */}
                  <div className={`transition-all duration-300 ${showOverlay || isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="top-1 flex flex-col sm:flex-row sm:space-x-2">
                      <h3 className="text-sm sm:text-xl font-semibold">Soni Soni | Mohabbatein</h3>
                      <h3 className="text-xs sm:text-lg">Jatin-Lalit, Anand B</h3>
                    </div>
                  </div>

                  {/* Controls container */}
                  <div className={`transition-all duration-300 ${showOverlay || isHovered ? '' : 'opacity-0'}`}>
                    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
                      {/* Play/Pause Button */}
                      <div className="flex justify-center items-center mt-10 space-x-4 w-full">
                        <button
                          onClick={togglePlayPause}
                          className="text-white bg-gray-700 hover:bg-gray-600 p-4 rounded-full"
                        >
                          {isPlaying ? <Pause /> : <Play />}
                        </button>
                      </div>

                      {/* 3 dots menu for more controls */}
                      <div className="absolute top-2 right-2 text-white cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MoreHorizontal />
                      </div>

                      {isMenuOpen && (
                        <div className="absolute top-12 right-2 bg-gray-800 p-2 rounded-md">
                          {/* Additional controls */}
                          <button onClick={toggleMute} className="text-white">{isMuted ? 'Unmute' : 'Mute'}</button>
                        </div>
                      )}

                      {/* Volume Control */}
                      <div className="absolute bottom-16 right-4 flex items-center space-x-2">
                        <Volume />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-2 bg-gray-500 rounded-lg cursor-pointer"
                          style={{ appearance: 'none', outline: 'none' }}
                        />
                      </div>

                      {/* YouTube-style Progress Bar */}
                      <div className="absolute bottom-8 w-full px-4 flex flex-col items-center">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progress}
                          onChange={handleProgressChange}
                          className="w-full h-2 bg-red-500 rounded-lg cursor-pointer"
                          style={{ appearance: 'none', outline: 'none' }}
                        />
                      </div>

                      {/* Time Display */}
                      <div className="absolute bottom-4 px-4 flex justify-between w-full text-sm text-gray-300">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Audio player */}
      <audio ref={audioRef} src={Soni} preload="metadata" className="px-10" />
    </section>
  );
}

export default Banner;
