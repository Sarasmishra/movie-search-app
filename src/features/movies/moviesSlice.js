import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utility function to load favorites from localStorage
const loadFavorites = () => {
  try {
    const serializedFavorites = localStorage.getItem('favorites');
    if (serializedFavorites === null) return [];
    return JSON.parse(serializedFavorites);
  } catch {
    return [];
  }
};

// Utility function to save favorites to localStorage
const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch {
    // fail silently
  }
};

const initialState = {
  searchTerm: '',
  results: [],
  loading: false,
  error: null,
  selectedMovieId: null,
  movieDetails: null,
  detailsLoading: false,
  favorites: loadFavorites(), // Load from localStorage initially
  page: 1,
  totalResults: 0,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ searchTerm, page = 1 }, thunkAPI) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          apikey: '11f79808',
          s: searchTerm,
          page,
        },
      });

      if (response.data.Response === 'False') {
        return thunkAPI.rejectWithValue(response.data.Error);
      }

      return {
        results: response.data.Search || [],
        totalResults: parseInt(response.data.totalResults, 10) || 0,
        page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (imdbID, thunkAPI) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          apikey: '11f79808',
          i: imdbID,
          plot: 'full',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.results = [];
      state.page = 1;
      state.totalResults = 0;
    },
    setSelectedMovieId: (state, action) => {
      state.selectedMovieId = action.payload;
    },
    clearMovieDetails: (state) => {
      state.selectedMovieId = null;
      state.movieDetails = null;
      state.detailsLoading = false;
    },
    toggleFavorite: (state, action) => {
      const imdbID = action.payload;
      if (state.favorites.includes(imdbID)) {
        state.favorites = state.favorites.filter((id) => id !== imdbID);
      } else {
        state.favorites.push(imdbID);
      }
      saveFavorites(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.page === 1) {
          state.results = action.payload.results;
        } else {
          state.results = [...state.results, ...action.payload.results];
        }
        state.page = action.payload.page;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch movies';
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.detailsLoading = true;
        state.movieDetails = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.detailsLoading = false;
        state.movieDetails = null;
      });
  },
});

export const { setSearchTerm, setSelectedMovieId, clearMovieDetails, toggleFavorite } = moviesSlice.actions;
export default moviesSlice.reducer;
