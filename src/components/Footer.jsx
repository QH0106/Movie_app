import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about-section">
          <h3>Về Movie App</h3>
          <p>
            Movie App là điểm đến lý tưởng cho những người yêu điện ảnh, cung cấp thông tin chi tiết về phim,
            trailer, đánh giá và cập nhật những bộ phim mới nhất. Khám phá thế giới phim ảnh cùng chúng tôi!
          </p>
          <p>&copy; {new Date().getFullYear()} Movie App. All rights reserved.</p>
        </div>

        <div className="footer-section quick-links">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="#!" className="footer-link-button">Trang chủ</a></li>
            <li><a href="#!" className="footer-link-button">Phim nổi bật</a></li>
            <li><a href="#!" className="footer-link-button">Phim mới</a></li>
            <li><a href="#!" className="footer-link-button">Thể loại</a></li>
            <li><a href="#!" className="footer-link-button">Liên hệ</a></li>
          </ul>
        </div>

        <div className="footer-section social-contact">
          <h3>Theo dõi chúng tôi</h3>
          <div className="social-icons">
            <a href="#!" className="social-icon-button"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#!" className="social-icon-button"><i className="fa-brands fa-twitter"></i></a>
            <a href="#!" className="social-icon-button"><i className="fa-brands fa-instagram"></i></a>
            <a href="#!" className="social-icon-button"><i className="fa-brands fa-youtube"></i></a>
          </div>
          <p>Email: support@movieapp.com</p>
          <p>Điện thoại: +84 123 456 789</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p style={{textAlign:"center"}}>Phim mới nhất, trailer, đánh giá và nhiều hơn nữa.</p>
      </div>
    </footer>
  );
};

export default Footer; 