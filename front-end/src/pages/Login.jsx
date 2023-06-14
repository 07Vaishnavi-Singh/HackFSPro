import React, { useState, useRef } from "react";
import Titlebar from "../Components/Titlebar";
import Heropage from "../Components/Heropage";
import Carousel from "../Components/Features";
import metamask from "../images/metamask.png";
import WalletConnect from "../images/walletconnect.png";
import "../styles/App.css";

function Login() {
  const [showWalletConnection, setShowWalletConnection] = useState(false);
  const featuresRef = useRef(null);

  const handleButtonClick = () => {
    setShowWalletConnection(true);
  };

  const handleCloseButtonClick = () => {
    setShowWalletConnection(false);
  };

  function WalletConnection() {
    return (
      <div id="wallet-container">
        <p id="close-button" onClick={handleCloseButtonClick}>
          x
        </p>
        <div id="button-container">
          <button className="wallet-button">
            <img src={metamask} alt="metamask" /> <p>Metamask</p>
          </button>
          <br />
          <button className="wallet-button">
            <img src={WalletConnect} alt="wallet" />
            <p> Wallet Connect</p>
          </button>
        </div>
      </div>
    );
  }

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="blah">
      <div id="slide1">
        <div id="slide1-bgm">
          <div id="gradient">
            <Titlebar id="home" onButtonClick={scrollToFeatures} />

            {showWalletConnection && <WalletConnection />}
            {!showWalletConnection && (
              <Heropage onButtonClick={handleButtonClick} />
            )}
          </div>
        </div>
      </div>

      <div id="Features" ref={featuresRef}>
        <Carousel />
      </div>
    </div>
  );
}

export default Login;
