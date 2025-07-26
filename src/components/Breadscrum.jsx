import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './css/Breadcrumb.css';

function Breadscrumb({ 
  pageTitle = '', 
  breadcrumbItems = [], 
  showHome = true, 
  className = '',
  showPageTitle = false 
}) {
  const location = useLocation();
  
  
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
  
  // Mapping tên hiển thị mặc định
  const defaultNames = {
    'Home': 'Trang chủ',
    'movie': 'Chi tiết phim',
    'genre': 'Thể loại',
    'login': 'Đăng nhập',
    'Register': 'Đăng ký'
  };

  // Hàm lấy tên hiển thị cho một phần path
  const getDisplayName = (part, index) => {
    // Nếu là movie ID, hiển thị "Chi tiết phim"
    if (index === 0 && part === 'movie') {
      return 'Chi tiết phim';
    }
    
    // Nếu là genre ID, hiển thị "Thể loại"
    if (index === 0 && part === 'genre') {
      return 'Thể loại';
    }
    
    // Mặc định: chuyển đổi kebab-case thành title case
    return part.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  // Nếu không có path parts (trang chủ), không hiển thị breadcrumb
  if (pathParts.length === 0) {
    return null;
  }

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

export default Breadscrumb;
