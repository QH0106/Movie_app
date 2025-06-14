import React, { useEffect, useState } from "react";
import movieAPI from "../services/movieAPI";
import MovieCard from "../components/MovieCard";
import "./css/Home.css";

// Helper function to chunk array
const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Tải nhiều phim hơn nếu cần cho carousel nhiều slide
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

  // Group movies for carousel slides , limit to first 12 movies
  const moviesForCarousel = movies.slice(0, 12);
  const chunkedMovies = chunkArray(moviesForCarousel, 4);

  return (
    <div id="home" className="container-fluid justify-content-center align-items-center">
      {movies.length > 0 && (
        <div id="myCarousel" class="carousel slide mx-auto" data-bs-ride="carousel" style={{marginBottom:"50px", maxWidth: "960px"}}> {/* Increased max-width for 4 items */}
          {/* <!-- Indicators/dots --> */}
          <div class="carousel-indicators">
            {chunkedMovies.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
              ></button>
            ))}
          </div>

          {/* <!-- Slides --> */}
          <div class="carousel-inner">
            {chunkedMovies.map((movieGroup, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <div className="d-flex justify-content-around align-items-center carousel-movie-row">
                  {movieGroup.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} className="carousel-movie-card" IMAGE_BASE_URL={IMAGE_BASE_URL} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* <!-- Controls: Prev/Next --> */}
          <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      )}

      <div id="card" className="row row-cols-3 justify-content-center align-items-center" >
        {movies.map((movie) => (
          <div key={movie.id} id="col" className="col" data-aos="fade-up">
            <MovieCard movie={movie} IMAGE_BASE_URL={IMAGE_BASE_URL} />
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
