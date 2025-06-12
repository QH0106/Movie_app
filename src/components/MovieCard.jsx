import React from "react";
import { Link } from "react-router-dom";
import "./css/MovieCard.css"

const MovieCard = ({ movie }) => {
  return (
    <div className="card movie-card-custom " style={{ maxWidth: '240px' }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="card-img-top"
          alt={movie.title}
        />
        <div className="card-title-overlay">
          <h5 className="card-title" style={{ color: '#fff'}}>{movie.title}</h5>
          <p className="card-text">
            <small className="movie-rating" style={{ color: '#cc7701'}}>
              Rating: {movie.vote_average}/10
            </small>
          </p>
        </div>
      </Link>
        
    </div>
  );
};

export default MovieCard;
