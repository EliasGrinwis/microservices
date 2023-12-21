import "./Navbar.css";
import Home from "./components/home";
import Dashboard from "./components/dashboard";

import React from "react";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-300">
        <div className="nav-container w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
          <div className="logo">Your Hotel</div>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
