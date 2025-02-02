import React, { useState, useEffect } from 'react';
import songsData from '../../data/songsData.json';

function SongList() {
  const [selectedCategory, setSelectedCategory] = useState('loveSong'); // Default category

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Divider */}
      <div className="border-t border-gray-600 mt-4 mb-6"></div>

      {/* Category Selector */}
      <div className="flex justify-start mb-6 md:gap-0 gap-3">
        <button
          onClick={() => setSelectedCategory('loveSong')}
          className={`${
            selectedCategory === 'loveSong' ? 'bg-gray-600' : 'bg-gray-700'
          } text-white p-2 rounded mb-2 sm:mb-0 sm:mr-4 w-full sm:w-auto text-center transition-colors duration-300`}>
          Love Song
        </button>
        <button
          onClick={() => setSelectedCategory('sadSong')}
          className={`${
            selectedCategory === 'sadSong' ? 'bg-gray-600' : 'bg-gray-700'
          } text-white p-2 rounded mb-2 sm:mb-0 sm:mr-4 w-full sm:w-auto text-center transition-colors duration-300`}>
          Sad Song
        </button>
        <button
          onClick={() => setSelectedCategory('gymFryK')}
          className={`${
            selectedCategory === 'gymFryK' ? 'bg-gray-600' : 'bg-gray-700'
          } text-white p-2 rounded mb-2 sm:mb-0 sm:mr-4 w-full sm:w-auto text-center transition-colors duration-300`}>
          Gym Song
        </button>
      </div>

      {/* Song List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {songsData[selectedCategory].map((song, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-4 text-white overflow-hidden">
            <img
              src={song.img}
              alt={song.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{song.title}</h3>
            <p className="text-sm text-gray-400">{song.author}</p>
            <p className="text-xs text-gray-300 mt-2">{song.info}</p>

            <audio key={song.audio} controls className="w-full mt-4">
            <source src={song.audio} type="audio/mp3" />
            Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongList;
