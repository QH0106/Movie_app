import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const movieAPI = {
  getPopularMovies: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  getTopRatedMovies: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  getNowPlayingMovies: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw error;
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,genres`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  getMovieTrailer: async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
      const trailers = response.data.results.filter(video => video.type === "Trailer");
      return trailers[0]?.key || null;
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
      throw error;
    }
  },

  searchMovies: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },
  
  getMovieReviews: async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movie reviews:', error);
      throw error;
    }
  },

  getGenres: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
      return response.data.genres;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thể loại:', error);
      throw error;
    }
  },

  getMoviesByGenre: async (genreId, page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy phim theo thể loại:', error);
      throw error;
    }
  },

  getMoviesByYear: async (year, page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}&page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy phim theo năm:', error);
      throw error;
    }
  },

  getMoviesByCountry: async (countryCode, page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=${countryCode}&page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy phim theo quốc gia:', error);
      throw error;
    }
  },
};

export default movieAPI;
