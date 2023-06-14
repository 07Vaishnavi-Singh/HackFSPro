import React from 'react';
import '../styles/Titlebar.css';

// Define a functional component
function Titlebar({onButtonClick2,onButtonClick}) {



async function addingWallet(){

console.log("requesting accounts...");


if(window.ethereum){
  console.log("detected");
try{
const accounts = await window.ethereum.request({
  method : "eth_requestAccounts",
});
console.log(accounts);
document.getElementById("login-container").innerHTML = "Connected";
}catch{


alert("Not able to connect to metamask");


}
}
else{
  alert("please install metmask");
}
}






  return (
    <div id='titlebar'>
      <div id='logo-container'>
        <div id='logo'>Archangel</div>
      </div>
      <div id='navlink-list'>
        <div className='navlink active' >Home</div>
        <div className='navlink' onClick={onButtonClick}>Features</div>
        <div className='navlink' onClick={onButtonClick2}>About Us</div>
      </div>
      <div id="login-container" onClick={addingWallet}>
        Connect Wallet
      </div>
     
    </div>
  );
}

export default Titlebar;
