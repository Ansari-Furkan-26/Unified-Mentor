import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import songsData from '../../data/songsData.json';
import { Pause, Play } from 'lucide-react';

function SongList() {
  const [selectedCategory, setSelectedCategory] = useState('loveSong'); // Default category
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRefs = useRef({});
  const navigate = useNavigate();

  const handlePlayPause = (index, audioSrc) => {
    const audio = audioRefs.current[index];

    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (audio.paused) {
      audio.play();
      setCurrentAudio(audio);
    } else {
      audio.pause();
      setCurrentAudio(null);
    }
  };

  const handleNavigation = (song) => {
    navigate(`/song/${song.id}`); // Assuming each song has a unique 'id'
  };

  return (
    <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-8 overflow-hidden">
      <div className="border-t border-gray-600 mt-4 mb-5"></div>

      {/* Category Selector */}
      <div className="flex justify-start mb-5 gap-3">
        {['loveSong', 'sadSong', 'gymSong'].map((category) => (
          <button
            id={category}
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`${
              selectedCategory === category ? 'bg-gray-900' : 'bg-gray-900'
            } text-white p-2 text-sm rounded w-full sm:w-auto text-center transition-colors duration-300`}
          >
            {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Song List */}
      <div className="space-y-4">
        {songsData[selectedCategory].map((song, index) => (
          <div key={index} className="flex items-start rounded-xl text-white gap-3">
            <img
              src={song.img}
              alt={song.title}
              className="w-16 h-16 object-cover rounded-lg cursor-pointer"
              onClick={() => handleNavigation(song)}
            />
            <div className="flex-1 cursor-pointer" onClick={() => handleNavigation(song)}>
              <h3 className="text-base font-semibold">{song.title}</h3>
              <p className="text-sm truncate  text-gray-400">{song.author}, {song.info}</p>
            </div>

            {/* <button
              onClick={() => handlePlayPause(index, song.audio)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-2 mr-2 rounded-full transition duration-300"
            >
              {audioRefs.current[index]?.paused || !audioRefs.current[index] ? <Play /> : <Pause />}
            </button> */}
            

            <audio ref={(el) => (audioRefs.current[index] = el)} src={song.audio} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongList;
