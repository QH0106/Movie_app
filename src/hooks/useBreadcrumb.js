import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useBreadcrumb = () => {
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [pageTitle, setPageTitle] = useState('');

  // Mapping tên hiển thị mặc định
  const defaultNames = {
    'Home': 'Trang chủ',
    'movie': 'Chi tiết phim',
    'genre': 'Thể loại',
    'login': 'Đăng nhập',
    'Register': 'Đăng ký'
  };

  // Hàm tạo breadcrumb items từ URL
  const generateBreadcrumbFromURL = useCallback((pathname) => {
    const pathParts = pathname.split("/").filter(Boolean);
    const items = [];
    let currentPath = "";

    pathParts.forEach((part, index) => {
      currentPath += "/" + part;
      const displayName = defaultNames[part] || part.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      
      items.push({
        label: displayName,
        path: currentPath,
        isLast: index === pathParts.length - 1
      });
    });

    return items;
  }, [defaultNames]);

  // Hàm tạo tiêu đề trang từ URL
  const generatePageTitle = useCallback((pathname) => {
    const pathParts = pathname.split("/").filter(Boolean);
    
    if (pathParts.length === 0) {
      return 'Trang chủ';
    }
    
    const lastPart = pathParts[pathParts.length - 1];
    return defaultNames[lastPart] || lastPart.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  }, [defaultNames]);

  // Cập nhật breadcrumb khi location thay đổi
  useEffect(() => {
    const items = generateBreadcrumbFromURL(location.pathname);
    const title = generatePageTitle(location.pathname);
    
    setBreadcrumbItems(items);
    setPageTitle(title);
  }, [location.pathname, generateBreadcrumbFromURL, generatePageTitle]);

  // Hàm cập nhật breadcrumb thủ công
  const updateBreadcrumb = (items, title) => {
    setBreadcrumbItems(items);
    if (title) {
      setPageTitle(title);
    }
  };

  // Hàm thêm item vào breadcrumb
  const addBreadcrumbItem = (item) => {
    setBreadcrumbItems(prev => [...prev, item]);
  };

  // Hàm xóa item cuối cùng
  const removeLastBreadcrumbItem = () => {
    setBreadcrumbItems(prev => prev.slice(0, -1));
  };

  // Hàm reset breadcrumb về trạng thái mặc định
  const resetBreadcrumb = () => {
    const items = generateBreadcrumbFromURL(location.pathname);
    const title = generatePageTitle(location.pathname);
    setBreadcrumbItems(items);
    setPageTitle(title);
  };

  return {
    breadcrumbItems,
    pageTitle,
    updateBreadcrumb,
    addBreadcrumbItem,
    removeLastBreadcrumbItem,
    resetBreadcrumb,
    generateBreadcrumbFromURL,
    generatePageTitle
  };
};

export default useBreadcrumb; 