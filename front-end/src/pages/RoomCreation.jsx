import React, { useState, useRef } from "react";
import Titlebar from "../Components/Titlebar";
import Features from "../Components/Features";
import AvailableRooms from "../Components/AvailableRooms";
import RoomForm from "../Components/RoomCreationForm";
import Aboutus from "../Components/Aboutus";
import "../styles/App.css";

function RoomCreation({ isMetamaskConnected }) {
  const [showForm, setShowForm] = useState(false);
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
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div id="dashboard-page">
      <div id="dashboard-container-1">
        <Titlebar
          id="home"
          onButtonClick={scrollToFeatures}
          onButtonClick2={scrollToAboutUs}
          
        />
        {showForm ? (
          <RoomForm onButtonClick={handleClose} />
        ) : (
          <AvailableRooms onButtonClick1={handleOpen} />
        )}
      </div>
      <div id="dashboard-container-2" >
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
