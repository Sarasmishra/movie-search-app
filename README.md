# 🎬 Movie Search App (Redux)

A responsive and interactive movie search application built with React and Redux Toolkit. It allows users to search for movies, view detailed information, mark favorites, and paginate through results using the OMDb API.

---

## 🚀 Features

- 🔍 **Movie Search** with debounced input
- 🖼️ **Results List**: Show movie posters, titles, and release years
- 📃 **Movie Details** Modal with plot, rating, and other metadata
- ❤️ **Favorite Functionality** with persistent localStorage support
- ⏳ **Loading Indicator** and Error Messages
- 📄 **Pagination / Load More** for search results
- 📦 **Redux Toolkit** architecture with async thunks
- 💅 Styled using **Tailwind CSS**
- ⚡ **Debounced** API calls to avoid unnecessary requests

---

## 🛠️ Tech Stack

- **React**
- **Redux Toolkit**
- **Redux Thunk**
- **Axios**
- **Tailwind CSS**
- **OMDb API**

---

## 🧱 Folder Structure

src/
│
├── app/ # Redux store
│
├── features/movies/ # Redux slice, components
│ ├── MovieList.jsx
│ ├── SearchBar.jsx
│ ├── MovieDetails.jsx
│ └── moviesSlice.js
│
├── components/ # Reusable UI components
│ ├── Spinner.jsx
│ ├── ErrorMessage.jsx
│ └── EmptyState.jsx
│
├── App.js # Main App
└── index.js # Entry Point

---

## 🧪 Functionalities

### ✅ Core Features

- Search for movies using the OMDb API
- See list of results with title, poster, and year
- Click on a movie to view detailed info in a modal
- Favorite or unfavorite any movie (with heart icon)
- Persist favorites using `localStorage`
- Handle empty results and display meaningful errors
- Loading states with spinners

### ✨ Stretch Features

- Debounced search input (500ms delay)
- "Load More" button to paginate through OMDb search results
- Favorite movies saved in localStorage
- Placeholder image if poster not available

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/movie-search-app-redux.git
cd movie-search-app-redux
### 2. Install dependencies

