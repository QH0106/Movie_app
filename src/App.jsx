// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Login from "./components/Login";
import Register from 'components/Register';
import SplashCursor from "./components/SplashCursor/SplashCursor";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./App.css";

const GOOGLE_CLIENT_ID = "52801807573-5lrh45t2ghesoc8utmqm1jk2klo4thh2.apps.googleusercontent.com";

const AppContent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Router>
      <SplashCursor />
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AppContent />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;

