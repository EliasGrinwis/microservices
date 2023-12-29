// Navbar.js
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {faSignOut, faDashboard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Navbar({
  isLoggedIn,
  setIsLoggedIn,
  setUserToken,
  setUserProfile,
  userProfile,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserToken(null);
    setUserProfile(null);
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.removeItem("userToken"); // Remove the userToken from localStorage
    localStorage.removeItem("userProfile"); // Remove the userToken from localStorage
  };

  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const handleLogoutAndClick = () => {
    navigate("/");
    handleImageClick();
    handleLogout();
  };

  const handleImageClick = () => {
    setIsProfileVisible((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-lg block">
      <div className="nav-container w-[95%] lg:w-[85%] mx-auto max-w-[1650px]">
        <div className="logo">HotelHub</div>
        <div className="links flex items-center">
          <Link to="/">Home</Link>

          {isLoggedIn && userProfile.picture !== null ? (
            <div className="relative">
              <img
                className="w-10 rounded-full cursor-pointer"
                src={userProfile.picture}
                alt="avatar"
                onClick={handleImageClick}
              />

              {isProfileVisible && (
                <div className="absolute top-12 right-0 bg-gray-400 shadow-lg rounded-lg p-4 z-50 w-64 menu">
                  <h3 className="mb-4">
                    {userProfile.name}
                    <br />
                    <span>{userProfile.email}</span>
                  </h3>
                  <hr className="my-3 w-full border-indigo-600 border" />
                  <ul>
                    <Link to="/dashboard">
                      <li
                        className="cursor-pointer mb-2 hover:bg-gray-300 px-2 py-1 rounded-md"
                        onClick={handleImageClick}>
                        <FontAwesomeIcon
                          icon={faDashboard}
                          className="mr-2 text-lg"
                        />
                        Dashboard
                      </li>
                    </Link>
                    <Link onClick={handleLogoutAndClick}>
                      <li className="cursor-pointer mb-2 hover:bg-gray-300 px-2 py-1 rounded-md">
                        <FontAwesomeIcon
                          icon={faSignOut}
                          className="mr-2 text-lg"
                        />
                        Logout
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          ) : null}
          {!isLoggedIn && <Link to="/login">Login</Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
