🎬 Movie Search App (React + OMDb API)

A simple and modern Movie Search Application built using React + OMDb API.
Users can search for movies, view detailed information, posters, ratings, release year, genre, cast, and much more.

🚀 Live Demo

(Add your deployment link here)

⭐ Features

🔍 Search movies by name

🎞 Displays movie poster, title, year, and type

📄 Detailed movie information page

⚡ Fast search with OMDb API

🎨 Clean and responsive UI

🧭 React Router for navigation

♻ Reusable components

🧩 Loading & error states

🛠 Tech Stack

React

React Router v6

Tailwind CSS / CSS

OMDb API

Axios / fetch

📦 Installation & Setup

Clone the project:

git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
cd YOUR_REPO_NAME


Install dependencies:

npm install


Start development server:

npm run dev

🔑 OMDb API Setup

Get your free API key from
https://www.omdbapi.com/apikey.aspx

Then create a .env file in project root:

VITE_OMDB_API_KEY=YOUR_API_KEY


Use it in code:

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

📂 Folder Structure
src/
 ├── components/
 │   ├── SearchBar.jsx
 │   ├── MovieCard.jsx
 ├── Pages/
 │   ├── Home.jsx
 │   ├── MovieDetails.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css

🖼 Screenshots

(Add your screenshots here)

📘 API Used

OMDb API → http://www.omdbapi.com/

🤝 Contributing

Contributions are always welcome!
Just fork the repo and open a pull request.

📄 License

This project is free and open-source.