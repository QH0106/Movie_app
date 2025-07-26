import axios from 'axios';

// API cho việc xem phim - sử dụng nhiều nguồn khác nhau
const watchMovieAPI = {
  // API từ TMDB để lấy thông tin phim
  getMovieStreamingInfo: async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching streaming info:', error);
      throw error;
    }
  },

  // API từ RapidAPI - Movie Database Alternative
  searchMovieStreaming: async (movieTitle) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://movie-database-alternative.p.rapidapi.com/',
        params: {
          s: movieTitle,
          r: 'json',
          page: '1'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error('Error searching movie streaming:', error);
      throw error;
    }
  },

  // API từ JustWatch để lấy thông tin streaming
  getJustWatchInfo: async (movieTitle) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://justwatch-api.p.rapidapi.com/content/titles/search/locale/vi_VN',
        params: {
          title: movieTitle,
          content_types: 'movie'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'justwatch-api.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error('Error fetching JustWatch info:', error);
      throw error;
    }
  },

  // API từ StreamFlix (giả lập)
  getStreamFlixStreaming: async (movieId) => {
    try {
      // Giả lập API response
      const mockStreamingData = {
        id: movieId,
        title: "Movie Title",
        streaming_links: [
          {
            provider: "Netflix",
            url: `https://www.netflix.com/watch/${movieId}`,
            quality: "HD",
            available: true
          },
          {
            provider: "Disney+",
            url: `https://www.disneyplus.com/movies/${movieId}`,
            quality: "4K",
            available: true
          },
          {
            provider: "Amazon Prime",
            url: `https://www.primevideo.com/detail/${movieId}`,
            quality: "HD",
            available: false
          }
        ],
        torrent_links: [
          {
            title: "1080p BluRay",
            size: "2.1 GB",
            seeds: 1500,
            leeches: 200,
            magnet: `magnet:?xt=urn:btih:${movieId}1080p`
          },
          {
            title: "720p BluRay",
            size: "1.2 GB", 
            seeds: 800,
            leeches: 100,
            magnet: `magnet:?xt=urn:btih:${movieId}720p`
          }
        ]
      };

      // Giả lập delay network
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return mockStreamingData;
    } catch (error) {
      console.error('Error fetching StreamFlix data:', error);
      throw error;
    }
  },

  // API từ MovieDB để lấy thông tin chi tiết streaming
  getMovieWatchProviders: async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      
      const data = response.data;
      const results = data.results;
      
      // Lấy thông tin cho Việt Nam
      const vietnamInfo = results.VN || results.US || {};
      
      return {
        movieId,
        flatrate: vietnamInfo.flatrate || [], // Netflix, Disney+, etc.
        rent: vietnamInfo.rent || [], // iTunes, Google Play, etc.
        buy: vietnamInfo.buy || [], // Amazon, iTunes, etc.
        ads: vietnamInfo.ads || [], // Free with ads
        free: vietnamInfo.free || [] // Completely free
      };
    } catch (error) {
      console.error('Error fetching watch providers:', error);
      throw error;
    }
  },

  // API để lấy link xem phim từ các nguồn khác nhau
  getMovieStreamingLinks: async (movieTitle, movieId) => {
    try {
      // Kết hợp nhiều nguồn
      const [streamingInfo, watchProviders] = await Promise.all([
        this.getStreamFlixStreaming(movieId),
        this.getMovieWatchProviders(movieId)
      ]);

      return {
        movieId,
        title: movieTitle,
        streaming: streamingInfo,
        providers: watchProviders,
        direct_links: [
          {
            name: "Netflix",
            url: `https://www.netflix.com/search?q=${encodeURIComponent(movieTitle)}`,
            available: watchProviders.flatrate.some(p => p.provider_name === "Netflix")
          },
          {
            name: "Disney+",
            url: `https://www.disneyplus.com/search?q=${encodeURIComponent(movieTitle)}`,
            available: watchProviders.flatrate.some(p => p.provider_name === "Disney Plus")
          },
          {
            name: "Amazon Prime",
            url: `https://www.primevideo.com/search?phrase=${encodeURIComponent(movieTitle)}`,
            available: watchProviders.flatrate.some(p => p.provider_name === "Amazon Prime")
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching streaming links:', error);
      throw error;
    }
  },

  // API để lấy thông tin phim từ IMDb
  getIMDbInfo: async (movieTitle) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/find',
        params: {
          q: movieTitle
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error('Error fetching IMDb info:', error);
      throw error;
    }
  }
};

export default watchMovieAPI; 