import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import movieAPI from '../services/movieAPI';
import watchMovieAPI from '../services/watchMovieAPI';
import Comments from '../components/Comments';
import Breadscrumb from '../components/Breadscrum';
import './css/MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showWatchModal, setShowWatchModal] = useState(false);
  const [streamingData, setStreamingData] = useState(null);
  const [loadingStreaming, setLoadingStreaming] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await movieAPI.getMovieDetails(id);
        setMovie(movieData);
        const trailer = await movieAPI.getMovieTrailer(id);
        setTrailerKey(trailer);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handleWatchMovie = async () => {
    setShowWatchModal(true);
    setLoadingStreaming(true);
    
    try {
      const data = await watchMovieAPI.getMovieStreamingLinks(movie.title, id);
      setStreamingData(data);
    } catch (error) {
      console.error('Error fetching streaming data:', error);
    } finally {
      setLoadingStreaming(false);
    }
  };

  if (!movie) return <div className="text-white text-center mt-5">Đang tải phim...</div>;

  return (
    <div className="movie-detail-page bg-dark text-white">
      <Breadscrumb />
      
      <div
        className="movie-banner"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, height:"650px" }}
      >
        <div className="overlay d-flex align-items-end">
          <div className="container py-5">
            <div className="row align-items-end">
              <div className="col-md-3 text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid rounded shadow"
                />
              </div>
              <div className="col-md-9">
                <h1>{movie.title}</h1>
                <p className="text-white-50">{movie.title} ({movie.release_date.substring(0, 4)})</p>
                <div className="text-warning mb-2 fs-5">
                  {"★".repeat(Math.floor(movie.vote_average / 2))}
                  {"☆".repeat(5 - Math.floor(movie.vote_average / 2))}
                  <span className="text-white ms-2">({movie.vote_average} / {movie.vote_count} lượt)</span>
                </div>
                <div className="d-flex gap-3">
                  {trailerKey && (
                    <button className="btn btn-primary" onClick={() => setShowTrailer(true)}>
                    Xem Trailer
                    </button>
                  )}
                  <button className="btn btn-danger" onClick={handleWatchMovie}>
                    <i className="fas fa-play me-2"></i>Xem phim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row text-white">
          <div className="col-md-4">
            <p><strong>Đang phát:</strong> HD Vietsub</p>
            <p><strong>Thể loại:</strong> {movie.genres?.map(genre => genre.name).join(', ')}</p>
            <p><strong>Diễn viên:</strong> {movie.credits?.cast?.slice(0, 3).map(actor => actor.name).join(', ')}</p>
          </div>
          <div className="col-md-4">
            <p><strong>Năm phát hành:</strong> {movie.release_date.substring(0, 4)}</p>
            <p><strong>Đạo diễn:</strong> {movie.credits?.crew?.find(c => c.job === 'Director')?.name || 'N/A'}</p>
            <p><strong>Quốc gia:</strong> {movie.production_countries?.map(c => c.name).join(', ')}</p>
            <p><strong>Thời lượng:</strong> {movie.runtime} phút</p>
          </div>
        </div>

        {/* Nội dung */}
        <div className="row mt-4">
          <div className="col-md-8">
            <h3>Nội dung phim</h3>
            <p>{movie.overview}</p>
          </div>
        </div>

        {/* Comments */}
        <div className="row mt-4">
          <div className="col-md-8">
            <Comments movieId={id} />
          </div>
        </div>
      </div>

      
      {showTrailer && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">{movie.title} - Trailer</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowTrailer(false)}></button>
              </div>
              <div className="modal-body">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Watch Movie Modal */}
      {showWatchModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title">
                  <i className="fas fa-play-circle me-2"></i>
                  Xem phim "{movie.title}"
                </h5>
                <button 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowWatchModal(false)}
                ></button>
              </div>
              <div className="modal-body p-0">
                {loadingStreaming ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Đang tải thông tin xem phim...</p>
                  </div>
                ) : streamingData ? (
                  <div className="p-4">
                    <div className="row">
                      <div className="col-12">
                        <h4 className="text-center mb-4">Tùy chọn xem phim</h4>
                        
                        {/* Streaming Links */}
                        <div className="mb-4">
                          <h5><i className="fas fa-play me-2"></i>Streaming</h5>
                          <div className="row">
                            {streamingData.direct_links?.map((provider, index) => (
                              <div key={index} className="col-md-4 mb-3">
                                <div className={`card ${provider.available ? 'border-success' : 'border-secondary'} bg-dark`}>
                                  <div className="card-body text-center">
                                    <h6 className="card-title">{provider.name}</h6>
                                    <span className={`badge ${provider.available ? 'bg-success' : 'bg-secondary'}`}>
                                      {provider.available ? 'Có sẵn' : 'Không có sẵn'}
                                    </span>
                                    {provider.available && (
                                      <button 
                                        className="btn btn-primary btn-sm mt-2"
                                        onClick={() => window.open(provider.url, '_blank')}
                                      >
                                        Truy cập
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Torrent Links */}
                        <div className="mb-4">
                          <h5><i className="fas fa-download me-2"></i>Tải phim</h5>
                          <div className="row">
                            {streamingData.streaming?.torrent_links?.map((torrent, index) => (
                              <div key={index} className="col-md-6 mb-3">
                                <div className="card border-info bg-dark">
                                  <div className="card-body">
                                    <h6 className="card-title">{torrent.title}</h6>
                                    <p className="card-text small">
                                      <span className="badge bg-info me-2">{torrent.size}</span>
                                      <span className="text-success">Seeds: {torrent.seeds}</span>
                                      <span className="text-danger ms-2">Leeches: {torrent.leeches}</span>
                                    </p>
                                    <button 
                                      className="btn btn-info btn-sm"
                                      onClick={() => window.open(torrent.magnet, '_blank')}
                                    >
                                      <i className="fas fa-download me-1"></i>Tải về
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
                    <p className="mt-3">Không thể tải thông tin xem phim</p>
                    <button 
                      className="btn btn-primary"
                      onClick={handleWatchMovie}
                    >
                      Thử lại
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
