import React from "react";
import Titlebar from "../Components/Titlebar";
import Features from "../Components/Features";
import AvailableRooms from "../Components/AvailableRooms";
import "../styles/App.css";

function RoomCreation() {
    return <div id="dashboard-page">
        <div id="dashboard-container-1">
            <Titlebar />
            <AvailableRooms />
        </div>
        <div id="dashboard-container-2">
           <Features />
        </div>
    </div>;
    }   

export default RoomCreation;