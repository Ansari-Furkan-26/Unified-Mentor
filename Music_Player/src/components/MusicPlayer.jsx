import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import songsData from '../data/songsData.json';
import { Heart, Share2, Repeat, Volume2, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

function SongDetails() {
  const { id } = useParams();
  const songList = Object.values(songsData).flat();
  
  const [currentSongIndex, setCurrentSongIndex] = useState(
    songList.findIndex((s) => String(s.id) === String(id))
  );
  const song = songList[currentSongIndex];

  const audioRef = useRef(null);
  const volumeRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(savedPlaylist);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target)) {
        setShowVolume(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);

  const handleSeek = (e) => {
    const time = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const vol = e.target.value;
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = !isLooping;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setPlaylist((prev) => [...prev, song]);
    } else {
      setPlaylist((prev) => prev.filter((s) => s.id !== song.id));
    }
  };

  const handleShare = () => {
    const songUrl = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(songUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const playNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songList.length);
  };

  const playPrevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songList.length) % songList.length);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-00 rounded-3xl shadow-xl text-white grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className='min-h-full'>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">{song.title}</h2>
            <p className="text-sm text-gray-400">{song.author}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={toggleFavorite} className={isFavorite ? 'text-red-500' : 'text-gray-400'}>
              <Heart fill={isFavorite ? 'red' : 'none'} />
            </button>
            <button onClick={handleShare} className="text-gray-400">
              <Share2 />
            </button>
          </div>
        </div>

        <img src={song.img} alt={song.title} className="w-full rounded-xl mb-4" />
        <p className="text-sm text-gray-300 mb-4">{song.info}</p>

        <audio
          ref={audioRef}
          src={song.audio}
          onTimeUpdate={handleTimeUpdate}
          className="hidden"
        />

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs">{Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / audioRef.current?.duration) * 100 || 0}
            onChange={handleSeek}
            className="w-full mx-2 accent-gray-500"
          />
          <span className="text-xs">-{Math.floor((audioRef.current?.duration - currentTime) / 60)}:{('0' + Math.floor((audioRef.current?.duration - currentTime) % 60)).slice(-2)}</span>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button onClick={toggleLoop} className={isLooping ? 'text-green-400' : 'text-gray-400'}>
            <Repeat />
          </button>
          <button onClick={playPrevSong}>
            <SkipBack />
          </button>
          <button onClick={togglePlayPause} className="p-3 bg-gray-700 rounded-full">
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={playNextSong}>
            <SkipForward />
          </button>
          <div className="relative mt-1" ref={volumeRef}>
            <button onClick={() => setShowVolume(!showVolume)}>
              <Volume2 />
            </button>
            {showVolume && (
              <div className="absolute bottom-10 left-15 transform -translate-x-1/2 bg-gray-800 p-2 rounded-xl shadow-md rotate-270">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="accent-gray-500 mt-1.5"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-00 py-4 overflow-auto max-h-[400px] hide-scrollbar">
        <h3 className="text-lg font-bold mb-2">Lyrics</h3>
        <pre className="whitespace-pre-wrap text-sm text-gray-300">{song.lyrics}</pre>
      </div>
    </div>
  );
}

export default SongDetails;
