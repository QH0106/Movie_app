import React from "react";
import { Link } from "react-router-dom";
import "./css/MovieCard.css"

const MovieCard = ({ movie, className, IMAGE_BASE_URL }) => {
  // Tạo URL hình ảnh từ poster_path, hoặc rỗng nếu không có
  const imageUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '';

  return (
    <div className={`card movie-card-custom ${className || ''}`} style={{ maxWidth: '240px' }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={movie.title}
        />
        <div className="card-title-overlay">
          <h5 className="card-title" style={{ color: '#fff'}}>{movie.title}</h5>
          <p className="card-text">
            <small className="movie-rating" style={{ color: '#cc7701'}}>
              Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
            </small>
          </p>
        </div>
      </Link>
        
    </div>
  );
};

export default MovieCard;
