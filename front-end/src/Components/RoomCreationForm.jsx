import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import "../styles/RoomCreation.css";

function RoomForm({onButtonClick}) {
  const [roomName, setRoomName] = useState("");
  const [capacity, setCapacity] = useState(10);
  const [interests, setInterests] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions with the form data
    console.log("Room Name:", roomName);
    console.log("Capacity:", capacity);
    console.log("Interests:", interests);
    console.log("Public:", isPublic);
    // Reset the form
    setRoomName("");
    setCapacity(10);
    setInterests([]);
    setIsPublic(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <div className="form-field">
          <div className="form-title">Interests:</div>
          <div className="input">
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
          <div className="form-title ">Public / Private :</div>
          <FormControlLabel
            id="public-private"
            control={
              <Switch
                checked={isPublic}
                onChange={handleToggleChange}
                
              />
            }
          />
          <div id="toggle-value">{isPublic ? "Public " : "Private"}</div>
        </div>
      </form>
      <div id="button-container">
        <Button
          id="button-stylings2"
          onClick={onButtonClick}
          variant="contained"
          color="primary"
          style={{ backgroundColor: "transparent" }}
        >
          Back
        </Button>

        <Button
          id="button-stylings"
          onClick={onButtonClick}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default RoomForm;
