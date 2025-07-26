import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './css/Breadcrumb.css';

function BreadcrumbDetail({ 
  pageTitle = '', // Tiêu đề trang hiện tại
  breadcrumbItems = [], // Mảng các item breadcrumb tùy chỉnh
  showHome = true, // Có hiển thị link trang chủ không
  className = '',
  showPageTitle = true // Có hiển thị tiêu đề trang không
}) {
  const location = useLocation();
  
  // Nếu có breadcrumbItems tùy chỉnh, sử dụng chúng
  if (breadcrumbItems.length > 0) {
    return (
      <nav aria-label="breadcrumb" className={`breadcrumb-nav ${className}`}>
        <div className="breadcrumb-container">
          <ol className="breadcrumb">
            {showHome && (
              <li className="breadcrumb-item">
                <Link to="/" className="breadcrumb-link">
                  <i className="fas fa-home"></i> Trang chủ
                </Link>
              </li>
            )}
            
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              
              return (
                <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                  {isLast ? (
                    <span className="breadcrumb-current">{item.label}</span>
                  ) : (
                    <Link to={item.path} className="breadcrumb-link">
                      {item.icon && <i className={item.icon}></i>}
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
          
          {showPageTitle && pageTitle && (
            <div className="page-title">
              <h1>{pageTitle}</h1>
            </div>
          )}
        </div>
      </nav>
    );
  }
  
  // Tự động tạo breadcrumb từ URL
  const pathParts = location.pathname.split("/").filter(Boolean);
  
  const defaultNames = {
    'Home': 'Trang chủ',
    'movie': 'Chi tiết phim',
    'genre': 'Thể loại',
    'login': 'Đăng nhập',
    'Register': 'Đăng ký'
  };

  const getDisplayName = (part, index) => {
    if (defaultNames[part]) {
      return defaultNames[part];
    }
    
    if (index === 0 && part === 'movie') {
      return 'Chi tiết phim';
    }
    
    if (index === 0 && part === 'genre') {
      return 'Thể loại';
    }
    
    return part.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  let currentPath = "";
  
  return (
    <nav aria-label="breadcrumb" className={`breadcrumb-nav ${className}`}>
      <div className="breadcrumb-container">
        <ol className="breadcrumb">
          {showHome && (
            <li className="breadcrumb-item">
              <Link to="/" className="breadcrumb-link">
                <i className="fas fa-home"></i> Trang chủ
              </Link>
            </li>
          )}
          
          {pathParts.map((part, index) => {
            currentPath += "/" + part;
            const displayName = getDisplayName(part, index);
            const isLast = index === pathParts.length - 1;

            return (
              <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                {isLast ? (
                  <span className="breadcrumb-current">{displayName}</span>
                ) : (
                  <Link to={currentPath} className="breadcrumb-link">
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
        
        {showPageTitle && pageTitle && (
          <div className="page-title">
            <h1>{pageTitle}</h1>
          </div>
        )}
      </div>
    </nav>
  );
}

export default BreadcrumbDetail; 