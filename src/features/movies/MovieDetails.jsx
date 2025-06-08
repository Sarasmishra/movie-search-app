import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearMovieDetails,
  toggleFavorite,
} from './moviesSlice';
import Spinner from '../../components/Spinner';

const MovieDetails = () => {
  const dispatch = useDispatch();
  const {
    movieDetails,
    detailsLoading,
    selectedMovieId,
    error,
    favorites,
  } = useSelector((state) => state.movies);
  

  const isFavorite = favorites.includes(selectedMovieId);

  const handleClose = () => {
    dispatch(clearMovieDetails());
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(selectedMovieId));
  };

  // Close modal on ESC key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      {!selectedMovieId ? null : (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh] shadow-lg"
            tabIndex={-1}
          >
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ✖
            </button>

            {detailsLoading ? (
              <div className="py-20">
                <Spinner />
              </div>
            ) : error ? (
              <p className="text-center text-red-600 py-10">
                Failed to load movie details. Please try again.
              </p>
            ) : !movieDetails ? (
              <p className="text-center py-10">No details available.</p>
            ) : (
              <div className="flex flex-col md:flex-row gap-6">
{movieDetails.Poster !== 'N/A' && (
  <img
    src={movieDetails.Poster}
    alt={movieDetails.Title}
    className="w-full md:w-1/3 h-auto rounded"
  />
)}

                <div className="flex-1">
                  <h2
                    id="modal-title"
                    className="text-2xl font-bold mb-2"
                  >
                    {movieDetails.Title}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {movieDetails.Year} | {movieDetails.Runtime}
                  </p>
                  <p className="text-sm mb-4">
                    <strong>Genre:</strong> {movieDetails.Genre}
                  </p>
                  <p className="text-sm mb-4">
                    <strong>Director:</strong> {movieDetails.Director}
                  </p>
                  <p className="text-sm mb-4">
                    <strong>Plot:</strong> {movieDetails.Plot}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Rating:</strong> {movieDetails.imdbRating}/10
                  </p>
                  <p className="text-sm mb-4">
                    <strong>Actors:</strong> {movieDetails.Actors}
                  </p>

                  <button
                    onClick={handleToggleFavorite}
                    className={`mt-4 px-4 py-2 rounded ${
                      isFavorite
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                    } transition`}
                    aria-pressed={isFavorite}
                  >
                    {isFavorite ? '★ Remove Favorite' : '☆ Add to Favorites'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
