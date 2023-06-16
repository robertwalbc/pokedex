import React from 'react';
import './App.css';
import Home from './pages/home/home.tsx';
import { PokemonDetail } from './pages/pokemonDetails/pokemonDetail.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
