import React, { useState, useRef } from "react";
import Titlebar from "../Components/Titlebar";
import Features from "../Components/Features";
import AvailableRooms from "../Components/AvailableRooms";
import RoomForm from "../Components/RoomCreationForm";
import Aboutus from "../Components/Aboutus";
import "../styles/App.css";
import RandomForm from "../Components/Random";

function RoomCreation({ isMetamaskConnected, setEthAddress }) {
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAboutUs = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpen = () => {
    setShowForm(true);
    setShowForm2(true);
    
  };
  const handleOpen2 = () => {
    setShowForm(true);
    setShowForm2(false);
    
  };

  const handleClose = () => {
    setShowForm(false);
    setShowForm2(true);
    
  };

  return (
    <div id="dashboard-page">
      <div id="dashboard-container-1">
        <Titlebar
          id="home"
          onButtonClick={scrollToFeatures}
          onButtonClick2={scrollToAboutUs}
          isMetamaskConnected={isMetamaskConnected}
        />
        {showForm ? (
          showForm2 ? (
            <RoomForm
              onButtonClick={handleClose}
              setEthAddress={setEthAddress}
            />
          ) : (
            <RandomForm
              handleClick3={handleClose}
              setEthAddress={setEthAddress}
            />
          )
        ) : (
          <AvailableRooms
            onButtonClick1={handleOpen}
            onButtonClick2={handleOpen2}
          />
        )}
      </div>
      <div id="dashboard-container-2">
        <div id="Features" ref={featuresRef}>
          <Features />
        </div>
      </div>
      <div id="About" ref={aboutRef}>
        <Aboutus />
      </div>
    </div>
  );
}

export default RoomCreation;
