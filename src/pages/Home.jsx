import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieAPI from "../services/movieAPI";
import MovieCard from "../components/MovieCard";
import "./css/Home.css"

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [genres, setGenres] = useState([]);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch featured movies (top rated)
        const featuredResponse = await movieAPI.getTopRatedMovies();
        setFeaturedMovies(featuredResponse.results.slice(0, 3));

        // Fetch new movies
        const newMoviesResponse = await movieAPI.getPopularMovies();
        setNewMovies(newMoviesResponse.results.slice(0, 5));

        // Fetch now playing movies
        const nowPlayingResponse = await movieAPI.getNowPlayingMovies();
        setNowPlaying(nowPlayingResponse.results.slice(0, 5));

        // Fetch top rated movies
        const topRatedResponse = await movieAPI.getTopRatedMovies();
        setTopRated(topRatedResponse.results.slice(0, 5));

        // Fetch genres
        const genresResponse = await movieAPI.getGenres();
        setGenres(genresResponse);
        
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchInitialData();
  }, []);

  const renderMovieCategory = (title, movies, viewAllLink) => (
    <div className="movie-category">
      <div className="category-header">
        <h2 className="category-title">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className="view-all">
            Xem tất cả
          </Link>
        )}
      </div>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {movies.map((movie) => (
          <div key={movie.id} className="col">
            <MovieCard 
              movie={movie} 
              IMAGE_BASE_URL={IMAGE_BASE_URL}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="home-page bg-dark">
      {/* Featured Slider */}
      <div id="featuredCarousel" className="carousel slide featured-slider" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#featuredCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {featuredMovies.map((movie, index) => (
            <div key={movie.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                className="d-block w-100"
                alt={movie.title}
              />
              <div className="carousel-caption">
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>
    
      {/* Movie Categories */}
      {renderMovieCategory("Phim mới cập nhật", newMovies, "/movies/new")}
      {renderMovieCategory("Phim đang chiếu", nowPlaying, "/movies/now-playing")}
      {renderMovieCategory("Top đánh giá cao", topRated, "/movies/top-rated")}

      {/* Genre Categories */}
      {genres.slice(0, 4).map(genre => (
        <div key={genre.id} className="movie-category">
          <div className="category-header">
            <h2 className="category-title text-white">Phim {genre.name}</h2>
            <Link to={`/genre/${genre.id}`} className="view-all">
              Xem tất cả
            </Link>
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
            {newMovies
              .filter(movie => movie.genre_ids.includes(genre.id))
              .slice(0, 4)
              .map(movie => (
                <div key={movie.id} className="col">
                  <MovieCard 
                    movie={movie} 
                    IMAGE_BASE_URL={IMAGE_BASE_URL}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
