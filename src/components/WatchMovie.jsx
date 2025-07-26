import React, { useState, useEffect } from 'react';
import watchMovieAPI from '../services/watchMovieAPI';
import './css/WatchMovie.css';

const WatchMovie = ({ movieId, movieTitle }) => {
  const [streamingData, setStreamingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('streaming');

  useEffect(() => {
    const fetchStreamingData = async () => {
      try {
        setLoading(true);
        const data = await watchMovieAPI.getMovieStreamingLinks(movieTitle, movieId);
        setStreamingData(data);
      } catch (err) {
        setError('Không thể tải thông tin xem phim');
        console.error('Error fetching streaming data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId && movieTitle) {
      fetchStreamingData();
    }
  }, [movieId, movieTitle]);

  const handleStreamingClick = (url) => {
    window.open(url, '_blank');
  };

  const handleTorrentClick = (magnet) => {
    window.open(magnet, '_blank');
  };

  if (loading) {
    return (
      <div className="watch-movie-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải thông tin xem phim...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="watch-movie-container">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!streamingData) {
    return null;
  }

  return (
    <div className="watch-movie-container">
      <div className="watch-movie-header">
        <h3>Xem phim "{movieTitle}"</h3>
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'streaming' ? 'active' : ''}`}
            onClick={() => setActiveTab('streaming')}
          >
            <i className="fas fa-play"></i> Streaming
          </button>
          <button 
            className={`tab-btn ${activeTab === 'torrent' ? 'active' : ''}`}
            onClick={() => setActiveTab('torrent')}
          >
            <i className="fas fa-download"></i> Torrent
          </button>
          <button 
            className={`tab-btn ${activeTab === 'providers' ? 'active' : ''}`}
            onClick={() => setActiveTab('providers')}
          >
            <i className="fas fa-tv"></i> Nền tảng
          </button>
        </div>
      </div>

      <div className="watch-movie-content">
        {activeTab === 'streaming' && (
          <div className="streaming-section">
            <h4>Link xem phim trực tuyến</h4>
            <div className="streaming-links">
              {streamingData.streaming?.streaming_links?.map((link, index) => (
                <div key={index} className={`streaming-link ${link.available ? 'available' : 'unavailable'}`}>
                  <div className="provider-info">
                    <span className="provider-name">{link.provider}</span>
                    <span className="quality">{link.quality}</span>
                  </div>
                  {link.available ? (
                    <button 
                      className="watch-btn"
                      onClick={() => handleStreamingClick(link.url)}
                    >
                      <i className="fas fa-play"></i> Xem ngay
                    </button>
                  ) : (
                    <span className="unavailable-text">Không có sẵn</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'torrent' && (
          <div className="torrent-section">
            <h4>Link tải phim</h4>
            <div className="torrent-links">
              {streamingData.streaming?.torrent_links?.map((torrent, index) => (
                <div key={index} className="torrent-link">
                  <div className="torrent-info">
                    <span className="torrent-title">{torrent.title}</span>
                    <div className="torrent-details">
                      <span className="size">{torrent.size}</span>
                      <span className="seeds">Seeds: {torrent.seeds}</span>
                      <span className="leeches">Leeches: {torrent.leeches}</span>
                    </div>
                  </div>
                  <button 
                    className="download-btn"
                    onClick={() => handleTorrentClick(torrent.magnet)}
                  >
                    <i className="fas fa-download"></i> Tải về
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'providers' && (
          <div className="providers-section">
            <h4>Nền tảng streaming</h4>
            <div className="providers-grid">
              {streamingData.direct_links?.map((provider, index) => (
                <div key={index} className={`provider-card ${provider.available ? 'available' : 'unavailable'}`}>
                  <div className="provider-logo">
                    <i className={`fab fa-${provider.name.toLowerCase().replace('+', 'plus')}`}></i>
                  </div>
                  <div className="provider-info">
                    <h5>{provider.name}</h5>
                    <span className="status">
                      {provider.available ? 'Có sẵn' : 'Không có sẵn'}
                    </span>
                  </div>
                  {provider.available && (
                    <button 
                      className="visit-btn"
                      onClick={() => handleStreamingClick(provider.url)}
                    >
                      Truy cập
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="watch-movie-footer">
        <div className="disclaimer">
          <i className="fas fa-info-circle"></i>
          <p>
            Thông tin này được cung cấp để tham khảo. Vui lòng tuân thủ luật bản quyền của quốc gia bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchMovie; 