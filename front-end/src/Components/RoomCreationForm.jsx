import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import "../styles/RoomCreation.css";
import axios from "axios";

function RoomForm({ onButtonClick, setEthAddress }) {
  const [roomName, setRoomName] = useState("");
  const [interests, setInterests] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [chainType, setChainType] = useState("");
  const [capacity, setCapacity] = useState(10);
  const [token, setToken] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  const handleInputChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleCapacityChange = (event) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      value = "";
    } else if (value < 2) {
      value = 2;
    } else if (value > 20) {
      value = 20;
    }
    setCapacity(value);
  };

  const handleInterestsChange = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newInterest = event.target.value.trim();
      if (newInterest && interests.length < 5) {
        setInterests([...interests, newInterest]);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (index) => {
    const updatedInterests = [...interests];
    updatedInterests.splice(index, 1);
    setInterests(updatedInterests);
  };

  const handleToggleChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleChainTypeChange = (event) => {
    setChainType(event.target.value);
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleContractAddressChange = (event) => {
    setContractAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();   
    console.log("Form submitted!" + setEthAddress);

    if (isPublic) {
      // Make request to public room endpoint
      try {
        const response = await axios.post("http://localhost:3001/joininPublicRoom", {
          roomName,
          interests,
          ethAddress: setEthAddress,
        });

        if (response.status === 200) {
          const meetingLink = response.data.meetingLink;
          console.log("Meeting Link:", meetingLink);
          // Redirect the user to the meeting link
          window.location.href = meetingLink;  
        } else {
          console.log("Failed to join public room");
        }
      } catch (error) {
        console.error("Error joining public room:", error);
      }      
    } else {

      try {    

        const response = await axios.get("http://localhost:3001/joininPrivateRoom", {
            roomName,
            chainType,
            token,
            contractAddress,
          });

        if (response.status === 200) {
          console.log("Joined private room:", roomName);
        } else {
          console.log("Failed to join private room");
        }
      } catch (error) {
        console.error("Error joining private room:", error);
      }
    }

    // Reset the form fields
    setRoomName("");
    setIsPublic(true);
    setCapacity(10);
    setChainType("");
    setToken("");
    setContractAddress("");
    setInterests([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit} >
        <div className="form-field">
          <div className="form-title">Public / Private:</div>
          <FormControlLabel
            id="public-private"
            control={
              <Switch checked={isPublic} onChange={handleToggleChange} />
            }
          />
          <div id="toggle-value">{isPublic ? "Public" : "Private"}</div>
        </div>
        <div className="form-field">
          <div className="form-title">Name:</div>
          <div className="input">
            <TextField
              label="Enter the name of the room"
              variant="outlined"
              value={roomName}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
        </div>
        {!isPublic && (
          <>
            <div className="form-field">
              <div className="form-title">Chain :</div>
              <div className="input">
                <TextField
                  label="Chain Type"
                  variant="outlined"
                  value={chainType}
                  onChange={handleChainTypeChange}
                  fullWidth
                  required
                />
              </div>
            </div>
            <div className="form-field">
              <div className="form-title">Token type :</div>
              <div className="input">
                <TextField
                  label="Token"
                  variant="outlined"
                  value={token}
                  onChange={handleTokenChange}
                  fullWidth
                  required
                />
              </div>
            </div>
            <div className="form-field">
              <div className="form-title">Contract Address:</div>
              <div className="input">
                <TextField
                  label="Contract Address"
                  variant="outlined"
                  value={contractAddress}
                  onChange={handleContractAddressChange}
                  fullWidth
                  required
                />
              </div>
            </div>
          </>
        )}
        
        {!isPublic ? null : (
          <>
            <div className="form-field">
              <div className="form-title">Interests:</div>
              <div className="input" >
                <TextField
                  label="Interests"
                  variant="outlined"
                  onKeyDown={handleInterestsChange}
                  fullWidth
                />
              </div>
              <div className="chips-container">
                {interests.map((interest, index) => (
                  <Chip
                    key={index}
                    color="secondary"
                    label={interest}
                    onDelete={() => handleDeleteChip(index)}
                    className="chip"
                  />
                ))}
              </div>
            </div>
            <div className="form-field">
          <div className="form-title">Capacity:</div>
          <div className="input">
            <TextField
              label="Capacity"
              type="number"
              variant="outlined"
              value={capacity}
              onChange={handleCapacityChange}
              inputProps={{
                min: 2,
                max: 20,
              }}
              fullWidth
              required
            />
          </div>
        </div>
          </>
        )}
        <div id="button-containers">
          <button id="#button1" onClick={onButtonClick}>
            Back
          </button>
          <button id="#button2" type="submit">
            Join
          </button>
        </div>
      </form>
    </>
  );
}

export default RoomForm;
