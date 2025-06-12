import React, { useEffect, useState } from "react";
import movieAPI from "../services/movieAPI";
import MovieCard from "../components/MovieCard";
import "./css/Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await movieAPI.getPopularMovies(page);
        setMovies((prevMovies) => {
          const existingIds = new Set(prevMovies.map(movie => movie.id));
          const newMovies = response.results.filter(movie => !existingIds.has(movie.id));
          return [...prevMovies, ...newMovies];
        });
      } catch (error) {
        console.error("Lỗi khi tải phim:", error);
      }
    };
    fetchMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div id="home" className="container-fluid justify-content-center align-items-center">
      <div id="card" className="row row-cols-3 justify-content-center align-items-center" >
        {movies.map((movie) => (
          <div key={movie.id} id="col" className="col" data-aos="fade-up">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center py-4">
        <button onClick={handleLoadMore} id="btn">
          Tải thêm
        </button>
      </div>
    </div>
  );
};

export default Home;
