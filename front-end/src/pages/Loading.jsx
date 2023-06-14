import React, { useState, useEffect } from "react";
import Login from "./Login";
import RoomCreation from "./RoomCreation";
import "../styles/App.css";
import logo from "../images/logo.png"

function Loading() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserCookie = () => {
      const userCookie = localStorage.getItem("user");
      const isAuthenticated = !userCookie;
      setIsLoggedIn(isAuthenticated);
      console.log(isAuthenticated);
    };

    // Simulate loading animation for 5 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    checkUserCookie();

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div id='background'>
        <div id='fire2'>
            <div id='fire_border'>
                <img id="fire" src={logo} />
            </div>
        </div>
    </div>
      ) : isLoggedIn ? (
        <Login />
      ) : (
        <RoomCreation />
      )}
    </div>
  );
}

export default Loading;
