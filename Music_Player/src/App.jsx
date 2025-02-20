import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import songsData from "./data/songsData.json"; // Your JSON data
import Player from './pages/Player';
import Playlist from './pages/Playlist';

const App = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/" element={<Home songs={songsData} />} />
      <Route path="/song/:id" element={<Player songs={songsData} />} />
      <Route path="/playlist" element={<Playlist songs={songsData} />} />
    </Routes>
  );
};

export default App;
