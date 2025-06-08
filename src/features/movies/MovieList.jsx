import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, setSelectedMovieId, fetchMovieDetails, fetchMovies } from './moviesSlice';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import EmptyState from '../../components/EmptyState';

const MovieList = () => {
  const dispatch = useDispatch();
  const {
    results,
    loading,
    error,
    favorites,
    page,
    totalResults,
    searchTerm,
  } = useSelector((state) => state.movies);

  const canLoadMore = results.length < totalResults;

  const handleLoadMore = () => {
    dispatch(fetchMovies({ searchTerm, page: page + 1 }));
  };

  if (loading && page === 1)
    return <Spinner/>
  if (error) return <ErrorMessage error={error}/>
  if (!results.length) return <EmptyState/>

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {results.map((movie) => {
          const isFavorite = favorites.includes(movie.imdbID);

          return (
            <div
              key={movie.imdbID}
              className="border rounded shadow hover:shadow-lg p-2 bg-white transition relative cursor-pointer"
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded"
                onClick={() => {
                  dispatch(setSelectedMovieId(movie.imdbID));
                  dispatch(fetchMovieDetails(movie.imdbID));
                }}
              />
              <h3 className="mt-2 font-semibold text-center">{movie.Title}</h3>
              <p className="text-sm text-gray-500 text-center">{movie.Year}</p>

              {/* Favorite heart icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleFavorite(movie.imdbID));
                }}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                className={`absolute top-2 right-2 text-2xl transition-colors ${
                  isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
          );
        })}
      </div>

      {loading && page > 1 && (
        <p className="text-center mt-4 text-blue-500">Loading more...</p>
      )}

      {!loading && canLoadMore && (
        <div className="flex justify-center my-4">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default MovieList;
