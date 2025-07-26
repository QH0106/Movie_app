import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import movieAPI from '../services/movieAPI';
import MovieCard from '../components/MovieCard';
import Breadscrumb from '../components/Breadscrum';
import './css/GenreMovies.css';

const GenreMovies = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genreName, setGenreName] = useState('');
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setMovies([]);
        setPage(1);
        const response = await movieAPI.getMoviesByGenre(genreId, 1);
        setMovies(response.results);
      } catch (error) {
        console.error("Lỗi khi tải phim:", error);
      }
    };

    const fetchGenreName = async () => {
      try {
        const genres = await movieAPI.getGenres();
        const genre = genres.find(g => g.id === parseInt(genreId));
        if (genre) {
          setGenreName(genre.name);
        }
      } catch (error) {
        console.error("Lỗi khi tải tên thể loại:", error);
      }
    };

    fetchMovies();
    fetchGenreName();
  }, [genreId]);

  useEffect(() => {
    if (page > 1) {
      const fetchMoreMovies = async () => {
        try {
          const response = await movieAPI.getMoviesByGenre(genreId, page);
          setMovies(prevMovies => {
            const existingIds = new Set(prevMovies.map(movie => movie.id));
            const newMovies = response.results.filter(movie => !existingIds.has(movie.id));
            return [...prevMovies, ...newMovies];
          });
        } catch (error) {
          console.error("Lỗi khi tải thêm phim:", error);
        }
      };
      fetchMoreMovies();
    }
  }, [page, genreId]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="genre-page">
      <Breadscrumb />
      <h2 className="genre-title">Phim {genreName}</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} IMAGE_BASE_URL={IMAGE_BASE_URL} />
        ))}
      </div>
      <button onClick={handleLoadMore} className="load-more-btn">
        Tải thêm
      </button>
    </div>
  );
};

export default GenreMovies; 