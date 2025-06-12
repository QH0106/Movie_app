import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";  
import movieAPI from "../services/movieAPI";
import "./css/Navbar.css";

const Navbar = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null);
    const searchRef = useRef(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSuggestions([]);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (search.trim().length === 0) {
                setSuggestions([]);
                return;
            }
    
            try {
                const response = await movieAPI.searchMovies(search);
                setSuggestions(response.results || []);
            } catch (error) {
                console.error("Lỗi khi tìm phim:", error);
                setSuggestions([]);
            }
        };
    
        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                <div className="container-fluid" >
                    <Link className="navbar-brand" to="/" > Movie App</Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavbar"
                        aria-controls="mainNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mainNavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ margin: "auto", gap: "20px" }}>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/movies">
                                    Phim
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tv-shows">
                                    Chương trình TV
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/people">
                                    Diễn viên
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <button 
                                    className="nav-link dropdown-toggle" 
                                    type="button"
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    Thể Loại
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="Dropdown">
                                    <li><a className="dropdown-item" href="/">Hành Động</a></li>
                                    <li><a className="dropdown-item" href="/">Tình Cảm</a></li>
                                    <li><a className="dropdown-item" href="/">Hài Hước</a></li>
                                    <li><a className="dropdown-item" href="/">Cổ Trang</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <button 
                                    className="nav-link dropdown-toggle" 
                                    type="button"
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    Năm Phát Hành
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="Dropdown">
                                    <li><a className="dropdown-item" href="/">Phim 2025</a></li>
                                    <li><a className="dropdown-item" href="/">Phim 2024</a></li>
                                    <li><a className="dropdown-item" href="/">Phim 2023</a></li>
                                    <li><a className="dropdown-item" href="/">Phim 2022</a></li>
                                </ul>
                            </li>
                        </ul>

                        <div className="d-flex flex-column flex-lg-row align-items-center w-25" style={{margin:"auto"}}>
                            <div className="me-lg-2 flex-grow-1 position-relative" ref={searchRef}>
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Tìm kiếm phim..."
                                    value={search}
                                    onChange={handleSearch}
                                />
                                {suggestions.length > 0 && (
                                    <div className="search-suggestions" style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        backgroundColor: 'white',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        zIndex: 1000,
                                        maxHeight: '300px',
                                        overflowY: 'auto'
                                    }}>
                                        {suggestions.map((movie) => (
                                            <div key={movie.id} className="suggestion-item" style={{
                                                padding: '10px',
                                                borderBottom: '1px solid #eee',
                                                cursor: 'pointer'
                                            }}>
                                                <Link to={`/movie/${movie.id}`}
                                                onClick={() => {
                                                    setTimeout(() => {
                                                      setSearch("");
                                                      setSuggestions([]);
                                                    }, 200);
                                                  }}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    textDecoration: 'none',
                                                    color: 'black'
                                                }}>
                                                    <img 
                                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} 
                                                        alt={movie.title} 
                                                        width="40" 
                                                        height="40" 
                                                        style={{marginRight:"20px"}}
                                                    />
                                                    <span>{movie.title}</span>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {user ? (
                                <div className="dropdown">
                                <button
                                    className="d-flex align-items-center"
                                    type="button"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={handleLogout}
                                >
                                    <i className="fa-regular fa-user me-2" style={{ fontSize: "25px", marginRight: "20px" }}></i>
                                    {user.name}
                                </button>
                                </div>
                            ) : (
                                <a href="/Login" className="text-white">
                                <i className="fa-solid fa-user" style={{ fontSize: "25px", marginRight: "20px" }}></i>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;                                    