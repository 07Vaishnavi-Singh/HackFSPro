import React from "react";
import "../styles/Titlebar.css";

function Titlebar({ onButtonClick2, onButtonClick, metamaskconnect, isMetamaskConnected }) {
  return (
    <div id="titlebar">
      <div id="logo-container">
        <div id="logo">Archangel</div>
      </div>
      <div id="navlink-list">
        <div className="navlink active">Home</div>
        <div className="navlink" onClick={onButtonClick}>
          Features
        </div>
        <div className="navlink" onClick={onButtonClick2}>
          About Us
        </div>
      </div>
      <div id="login-container" onClick={metamaskconnect}>
        {isMetamaskConnected ? "Connected" : "Connect Wallet"}
      </div>
    </div>
  );
}

export default Titlebar;
