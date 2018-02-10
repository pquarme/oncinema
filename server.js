require("dotenv").config();
const express = require("express");
const fetch = require("isomorphic-fetch");
const path = require('path');
const app = express();

app.set("port", process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, 'build')));

const API_KEY = process.env.API_KEY;

const GENRE_KEY = {
  action: 28,
  drama: 18,
  comedy: 35,
  horror: 27,
  romance: 10749
};

const getMovieDetails = (genre, movieIds, response) => {
  Promise.all(
    movieIds.map(id => {
      return fetch(getMovieUrl(id)).then(req => req.json());
    })
  ).then(res => {
    const movies = res.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      genre: genre,
      media: {
        backdrop: movie.backdrop_path,
        poster: movie.poster_path,
        video: movie.trailers.youtube[0].source
      }
    }));
    response.json(movies);
  }).catch(err =>
		response.status(500).json({ error: "TMDB movie resource failure." })
	);;
};

const getMovieUrl = movieId => {
  const url =
    `http://api.themoviedb.org/3/movie/${movieId}` +
    `?api_key=${API_KEY}&append_to_response=trailers`;

  return url;
};

app.get("/api/discover/:genre", (request, response) => {
  const genre = request.params.genre;
  const genreExists = Object.keys(GENRE_KEY).includes(genre);

  //make sure genre exists
  if (!genreExists) {
    response.status(500).json({ error: "Genre doesn't exist." });
  }

  //get date
  const today = new Date();
  const formatDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  //create request url
  const url =
    `http://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}` +
    `&with_genres=${GENRE_KEY[genre]}` +
    `&release_date.gte=${formatDate}` +
    `&sort_by=popularity.desc` +
    `&year=${today.getFullYear()}`+
		'&region=US';

  console.log("url - ", url);

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      const results = res.results.slice(0, 4);
      const movieIds = results.map(movie => movie.id);
      getMovieDetails(genre, movieIds, response);
    })
    .catch(err =>
      response.status(500).json({ error: "TMDB discover resource failure." })
    );
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(app.get("port"), () => {
  console.log(`Server: http://localhost:${app.get("port")}/`);
});
