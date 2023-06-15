import React, { useState, useEffect } from "react";
import Login from "./Login";
import RoomCreation from "./RoomCreation";
import "../styles/App.css";
import logo from "../images/logo.png";

function Loading() {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMetamaskConnection = () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        setIsMetamaskConnected(true);
        console.log("Metamask checking " + window.ethereum.selectedAddress)
        
      } else {
        setIsMetamaskConnected(false);
      }
    };

    // Simulate loading animation for 5 seconds
    const loadingTimer = setTimeout(() => {
      checkMetamaskConnection();
      
      setIsLoading(false);
    }, 5000);

    

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div id="background">
          <div id="fire2">
            <div id="fire_border">
              <img id="fire" src={logo} alt="logo" />
            </div>
          </div>
        </div>
      ) : isMetamaskConnected ? (
        <RoomCreation isMetamaskConnected={isMetamaskConnected}/>
        
      ) : (
        <Login redirectToRoomCreation={true} />
      )}
    </div>
  );
}

export default Loading;
