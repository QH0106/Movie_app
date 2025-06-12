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
  
};

export default movieAPI;
