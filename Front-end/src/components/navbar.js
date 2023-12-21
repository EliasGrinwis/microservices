// Navbar.js
import React from "react";
import {Link, useNavigate} from "react-router-dom";

function Navbar({isLoggedIn, setIsLoggedIn, setUserToken}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserToken(null);
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.removeItem("userToken"); // Remove the userToken from localStorage
    navigate("/");
  };

  return (
    <nav className="bg-gray-300 block">
      <div className="nav-container w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
        <div className="logo">Your Hotel</div>
        <div className="links">
          <Link to="/">Home</Link>
          {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {isLoggedIn && <Link onClick={handleLogout}>Logout</Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
