import React, { useState, useRef } from "react";
import Titlebar from "../Components/Titlebar";
import Heropage from "../Components/Heropage";
import Carousel from "../Components/Features";
import metamask from "../images/metamask.png";
import Aboutus from "../Components/Aboutus";
import RoomCreation from "./RoomCreation";
import WalletConnect from "../images/walletconnect.png";
import "../styles/App.css";

function Login({ redirectToRoomCreation }) {
  const [showWalletConnection, setShowWalletConnection] = useState(false);
  const [redirectToRoom, setRedirectToRoom] = useState(false);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);

  const handleButtonClick = () => {
    setShowWalletConnection(true);
  };

  const handleButtonClickClose = () => {
    setShowWalletConnection(false);
  };

  async function handleCloseButtonClickMetamask() {
    console.log("requesting accounts...");

    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        document.getElementById("login-container").innerHTML = "Connected";

        if (redirectToRoomCreation) {
          setRedirectToRoom(true);
        }
      } catch {
        alert("Not able to connect to Metamask");
      }
    } else {
      alert("Please install Metamask");
    }
  }

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAboutUs = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (redirectToRoom) {
    return <RoomCreation isMetamaskConnected={true} />;
  }

  function WalletConnection() {
    return (
      <div id="wallet-container">
        <p id="close-button" onClick={handleButtonClickClose}>
          x
        </p>
        <div id="button-container">
          <button className="wallet-button" onClick={handleCloseButtonClickMetamask}>
            <img src={metamask} alt="My Image" /> <p>Metamask</p>
          </button>
          <br />
          <button className="wallet-button">
            <img src={WalletConnect} alt="My Image" />
            <p> Wallet Connect</p>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div id="blah">
      <div id="slide1">
        <div id="slide1-bgm">
          <div id="gradient">
            <Titlebar
              id="home"
              onButtonClick={scrollToFeatures}
              onButtonClick2={scrollToAboutUs}
              metamaskconnect={handleCloseButtonClickMetamask}
            />

            {showWalletConnection && <WalletConnection />}
            {!showWalletConnection && <Heropage onButtonClick={handleButtonClick} />}
          </div>
        </div>
      </div>

      <div id="Features" className="blah" ref={featuresRef}>
        <Carousel />
      </div>
      <div id="About" ref={aboutRef}>
        <Aboutus />
      </div>
    </div>
  );
}

export default Login;
