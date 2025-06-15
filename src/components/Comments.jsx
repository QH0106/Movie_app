import React, { useState, useEffect } from 'react';
import movieAPI from '../services/movieAPI';
import './css/Comments.css';

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem('user'));
  const username = userData?.name || 'Khách';

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const reviews = await movieAPI.getMovieReviews(movieId);
        setComments(reviews.map(review => ({
          id: review.id,
          text: review.content,
          user: review.author,
          timestamp: new Date(review.created_at).toLocaleString('vi-VN'),
        })));
      } catch (error) {
        console.error('Lỗi khi tải bình luận:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [movieId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const userData = JSON.parse(localStorage.getItem('user'));
      const comment = {
        id: Date.now(),
        text: newComment,
        user: userData?.name || 'Khách',
        timestamp: new Date().toLocaleString('vi-VN'),
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  if (loading) {
    return <div className="text-white">Đang tải bình luận...</div>;
  }

  return (
    <div className="comments-section">
      <h3>Bình luận</h3>
      
      {/* Form bình luận */}
      <form onSubmit={handleSubmitComment} className="comment-form mb-4">
        <div className="form-group">
          <textarea
            className="form-control bg-dark text-white"
            rows="3"
            placeholder="Viết bình luận của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Gửi bình luận
        </button>
      </form>

      {/* Danh sách bình luận */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="text-muted">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <strong>{comment.user}</strong>
                <small className="ms-2 text-white">{comment.timestamp}</small>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments; 