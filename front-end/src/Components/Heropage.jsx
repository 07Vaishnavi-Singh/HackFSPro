import React from "react";
import "../styles/Heropage.css";

function Heropage({ onButtonClick }) {
  return (
    <div id="hero-page">
      <div id="hero-page-heading">Omegle for Web3</div>
      <div id="hero-page-subheading">
        Secure, Spontaneous, and Decentralized communication
      </div>
      <div id="hero-page-button" onClick={onButtonClick}>Try Archangel</div>
    </div>
  );
}
export default Heropage;
