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
```
movie-search-app/
├── public/
├── src/
│   ├── components/
│   ├── features/movies/
│   │   ├── MovieList.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── SearchBar.jsx
│   │   └── moviesSlice.js
│   └── App.jsx
├── package.json
└── tailwind.config.js
```

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
```
### 2. Install dependencies
```bash
npm install
```
### 3. Start the development server

```bash
npm start
```

### 4. Build for production
```bash
npm run build
```

## 🔐 API Used
- OMDb API
- Use your own API key or the free one used during development:
```bash
https://www.omdbapi.com/?apikey=11f79808
```

## 📸 Demo Screenshot
- Movies List
  
![Screenshot 2025-06-08 112044](https://github.com/user-attachments/assets/58c27b45-1581-4181-98aa-28a5c2ac9568)

- Movies Detail
  
![Screenshot 2025-06-08 112110](https://github.com/user-attachments/assets/7e51c58a-9951-41f5-b1ef-12cc1075d817)

