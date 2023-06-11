import React, { useState } from "react";
import Titlebar from "../Components/Titlebar";
import Heropage from "../Components/Heropage";
import "../styles/App.css";
import metamask from "../images/metamask.png";
import WalletConnect from "../images/walletconnect.png";

function Login() {
  const [showWalletConnection, setShowWalletConnection] = useState(false);

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
    <div>
      <Titlebar onButtonClick={handleButtonClick} />

      {showWalletConnection && <WalletConnection />}
      {!showWalletConnection && <Heropage onButtonClick={handleButtonClick} />}
    </div>
  );
}

export default Login;
