import "./Navbar.css";
import Home from "./components/home";
import Dashboard from "./components/dashboard";

import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login";
import Navbar from "./components/navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      setUserToken(localStorage.getItem("userToken"));
      console.log(userToken);
    }
  }, [userToken]);

  return (
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserToken={setUserToken}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<Dashboard userToken={userToken} />}
        />
        <Route
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} setUserToken={setUserToken} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
