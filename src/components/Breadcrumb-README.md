# Breadcrumb Component Guide

## Tổng quan
Breadcrumb component được thiết kế để hiển thị đường dẫn điều hướng cho tất cả các trang trong ứng dụng. Có 2 phiên bản:

1. **Breadscrumb** - Component cơ bản, tự động tạo breadcrumb từ URL
2. **BreadcrumbDetail** - Component nâng cao, hỗ trợ tùy chỉnh chi tiết

## Cách sử dụng

### 1. Breadscrumb (Component cơ bản)

#### Import
```jsx
import Breadscrumb from './components/Breadscrum';
```

#### Sử dụng cơ bản
```jsx
<Breadscrumb />
```

#### Sử dụng với tùy chỉnh
```jsx
<Breadscrumb 
  showOnPages={['/Home', '/movie', '/genre', '/login', '/Register']}
  customNames={{
    'login': 'Đăng nhập',
    'Register': 'Đăng ký',
    'movie': 'Chi tiết phim'
  }}
  className="custom-breadcrumb"
/>
```

#### Props
- `showOnPages` (array): Danh sách các trang sẽ hiển thị breadcrumb
- `customNames` (object): Tùy chỉnh tên hiển thị cho các route
- `className` (string): CSS class tùy chỉnh

### 2. BreadcrumbDetail (Component nâng cao)

#### Import
```jsx
import BreadcrumbDetail from './components/BreadcrumbDetail';
```

#### Sử dụng với breadcrumb tùy chỉnh
```jsx
<BreadcrumbDetail 
  pageTitle="Tên phim cụ thể"
  breadcrumbItems={[
    { label: 'Phim hành động', path: '/genre/28', icon: 'fas fa-film' },
    { label: 'Tên phim cụ thể', path: '/movie/123' }
  ]}
  showHome={true}
  showPageTitle={true}
/>
```

#### Sử dụng tự động từ URL
```jsx
<BreadcrumbDetail 
  pageTitle="Trang chủ"
  showPageTitle={true}
/>
```

#### Props
- `pageTitle` (string): Tiêu đề trang hiện tại
- `breadcrumbItems` (array): Mảng các item breadcrumb tùy chỉnh
  - `label` (string): Tên hiển thị
  - `path` (string): Đường dẫn
  - `icon` (string): Icon class (tùy chọn)
- `showHome` (boolean): Có hiển thị link trang chủ không
- `showPageTitle` (boolean): Có hiển thị tiêu đề trang không
- `className` (string): CSS class tùy chỉnh

## Ví dụ sử dụng trong các trang

### Trang Home
```jsx
// Trong Home.jsx
import BreadcrumbDetail from '../components/BreadcrumbDetail';

function Home() {
  return (
    <div>
      <BreadcrumbDetail 
        pageTitle="Khám phá phim hay"
        showPageTitle={true}
      />
      {/* Nội dung trang */}
    </div>
  );
}
```

### Trang Movie Detail
```jsx
// Trong MovieDetail.jsx
import BreadcrumbDetail from '../components/BreadcrumbDetail';

function MovieDetail({ movie }) {
  return (
    <div>
      <BreadcrumbDetail 
        pageTitle={movie.title}
        breadcrumbItems={[
          { label: 'Trang chủ', path: '/', icon: 'fas fa-home' },
          { label: movie.title, path: `/movie/${movie.id}` }
        ]}
      />
      {/* Nội dung trang */}
    </div>
  );
}
```

### Trang Genre Movies
```jsx
// Trong GenreMovies.jsx
import BreadcrumbDetail from '../components/BreadcrumbDetail';

function GenreMovies({ genreName }) {
  return (
    <div>
      <BreadcrumbDetail 
        pageTitle={`Phim ${genreName}`}
        breadcrumbItems={[
          { label: 'Trang chủ', path: '/', icon: 'fas fa-home' },
          { label: genreName, path: `/genre/${genreId}` }
        ]}
      />
      {/* Nội dung trang */}
    </div>
  );
}
```

## Tích hợp vào App.jsx

Để sử dụng breadcrumb cho tất cả các trang, thêm vào App.jsx:

```jsx
import Breadscrumb from './components/Breadscrum';

function App() {
  return (
    <Router>
      <SplashCursor />
      <Breadscrumb 
        showOnPages={['/Home', '/movie', '/genre', '/login', '/Register']}
        customNames={{
          'login': 'Đăng nhập',
          'Register': 'Đăng ký'
        }}
      />
      <Routes>
        {/* Routes */}
      </Routes>
      <Footer />
    </Router>
  );
}
```

## Tính năng

- ✅ Responsive design
- ✅ Tự động tạo breadcrumb từ URL
- ✅ Hỗ trợ tùy chỉnh tên hiển thị
- ✅ Hỗ trợ icon
- ✅ Animation mượt mà
- ✅ Dark mode support
- ✅ High contrast mode support
- ✅ Accessibility friendly
- ✅ SEO friendly

## CSS Classes

Các class CSS chính:
- `.breadcrumb-nav`: Container chính
- `.breadcrumb-container`: Container nội dung
- `.breadcrumb`: Danh sách breadcrumb
- `.breadcrumb-item`: Item breadcrumb
- `.breadcrumb-link`: Link breadcrumb
- `.breadcrumb-current`: Item hiện tại
- `.page-title`: Tiêu đề trang 