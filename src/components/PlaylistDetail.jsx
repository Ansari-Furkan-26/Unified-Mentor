import React, { useEffect, useState } from 'react';
import { Heart, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

function Playlist() {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(savedPlaylist);
  }, []);

  const toggleFavorite = (song) => {
    const updatedPlaylist = playlist.some((s) => s.id === song.id)
      ? playlist.filter((s) => s.id !== song.id)
      : [...playlist, song];

    setPlaylist(updatedPlaylist);
    localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
  };

  return (
    <div className="max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">My Playlist</h1>
      {playlist.length === 0 ? (
        <p className="text-gray-400">Your playlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlist.map((song) => (
            <div key={song.id} className="bg-gray-900 p-4 rounded-xl shadow-md">
              <img src={song.img} alt={song.title} className="w-full h-48 object-cover rounded-md mb-2" />
              <h2 className="text-lg font-semibold">{song.title}</h2>
              <p className="text-sm text-gray-400">{song.author}</p>
              <div className="flex justify-between items-center mt-2">
                <Link to={`/song/${song.id}`} className="p-2 bg-gray-700 rounded-full">
                  <Play />
                </Link>
                <button
                  onClick={() => toggleFavorite(song)}
                  className={`p-2 rounded-full ${playlist.some((s) => s.id === song.id) ? 'text-red-500' : 'text-gray-400'}`}
                >
                  <Heart fill={playlist.some((s) => s.id === song.id) ? 'red' : 'none'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Playlist;
