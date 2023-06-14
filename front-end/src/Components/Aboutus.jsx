import React from "react";
import "../styles/Aboutus.css";
import meta from "../images/metamask.png";
import deadpool from "../images/deadpool1.png";
import spidy from "../images/spidy.png";

function Aboutus() {
  return (
    <>
      <div id="aboutus-title">About us</div>
      <div id="aboutus-text">
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumc
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
        ipsumLorem ipsumc Lorem ipsu
      </div>
      <div id="contributors">
        <div className="contributor-card">
        <img src={deadpool} alt="" />
          <div className="contributor-text">Sudarsan</div>
          <div className="contributor-text" style={{fontSize:16}}>Developer</div>
        </div>
        <div className="contributor-card">
          <img src={deadpool} alt="" />
          <div className="contributor-text">Sudarsan</div>
          <div className="contributor-text" style={{fontSize:16}}>Developer</div>
        </div>
        <div className="contributor-card">
        <img src={deadpool} alt="" />   
          <div className="contributor-text">Sudarsan</div>
          <div className="contributor-text" style={{fontSize:16}}>Developer</div>
        </div>
      </div>
      <div id="footer">
        Made with <span style={{ padding: '0 8px' }}>❤️</span> for HackFS
      </div>
    </>
  );
}

export default Aboutus;
