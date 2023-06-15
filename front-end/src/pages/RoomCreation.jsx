import React, { useState } from "react";
import Titlebar from "../Components/Titlebar";
import Features from "../Components/Features";
import AvailableRooms from "../Components/AvailableRooms";
import RoomForm from "../Components/RoomCreationForm";
import "../styles/App.css";

function RoomCreation({ isMetamaskConnected }) {
  const [showForm, setShowForm] = useState(false);

  const handleOpen = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div id="dashboard-page">
      <div id="dashboard-container-1">
        <Titlebar isMetamaskConnected={isMetamaskConnected} />
        {showForm ? <RoomForm onButtonClick={handleClose} /> : <AvailableRooms onButtonClick1={handleOpen} />}
      </div>
      <div id="dashboard-container-2">
        <Features />
      </div>
    </div>
  );
}

export default RoomCreation;
