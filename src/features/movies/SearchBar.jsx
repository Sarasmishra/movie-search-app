import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm, fetchMovies } from './moviesSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.trim() === '') return;

    const handler = setTimeout(() => {
      dispatch(setSearchTerm(query));
      dispatch(fetchMovies({ searchTerm: query, page: 1 }));
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [query, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    dispatch(setSearchTerm(query));
    dispatch(fetchMovies({ searchTerm: query, page: 1 }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-4 p-4 bg-gray-100"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="border border-gray-300 rounded-md px-4 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
