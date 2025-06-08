// 📁 src/App.jsx
import React from 'react';
import SearchBar from './features/movies/SearchBar';
import MovieList from './features/movies/MovieList';
import MovieDetails from './features/movies/MovieDetails';

const App = () => {
  return (
    <div className="min-h-screen bg-white relative">
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">🎬 Movie Search App</h1>
      <SearchBar />
      <MovieList />
      <MovieDetails />
    </div>
  );
};

export default App;
