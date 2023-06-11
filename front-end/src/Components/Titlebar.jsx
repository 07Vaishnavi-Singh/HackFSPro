import React from 'react';
import '../styles/Titlebar.css';

// Define a functional component
function Titlebar({onButtonClick}) {
  return (
    <div id='titlebar'>
      <div id='logo-container'>
        <div id='logo'>Archangel</div>
      </div>
      <div id='navlink-list'>
        <div className='navlink active'>Home</div>
        <div className='navlink'>Features</div>
        <div className='navlink'>About Us</div>
      </div>
      <div id="login-container" onClick={onButtonClick}>
        Connect Wallet
      </div>
    </div>
  );
}

export default Titlebar;