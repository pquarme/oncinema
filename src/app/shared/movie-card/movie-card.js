import React from "react";
import "./movie-card.css";

const MovieCard = props => {
  const movie = props.movie;
  const poster = `https://image.tmdb.org/t/p/w342/${movie.media.poster}`;

  return (
    <div
      className={`movie-card genre-${props.genre} ${props.isSelected &&
        "selected"}`}
    >
      <div className="poster">
        <img src={poster} alt={movie.title + " poster"} />
        <div className="play" onClick={() => props.handlePlay(movie)}>
          <div className="icon">
            <svg viewBox="0 0 124.512 124.512">
              <g>
                <path d="M113.956,57.006l-97.4-56.2c-4-2.3-9,0.6-9,5.2v112.5c0,4.6,5,7.5,9,5.2l97.4-56.2
					C117.956,65.105,117.956,59.306,113.956,57.006z" />
              </g>
            </svg>
          </div>
          <div className="bg" />
        </div>
      </div>
      <p className="movie-title" onClick={() => props.handleSelectMovie(movie)}>
        {movie.title}
      </p>
    </div>
  );
};

export default MovieCard;
