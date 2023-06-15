import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableViews from "react-swipeable-views";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import "../styles/AvailableRooms.css";

function AvailableRooms({ onButtonClick1 }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showSearch, setShowSearch] = useState(false);

  const rooms = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"];

  const renderRooms = () => {
    return rooms.map((room, index) => (
      <div key={index} style={styles.card} className="room">
        <p>{room}</p>
      </div>
    ));
  };

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleCloseClick = () => {
    setShowSearch(false);
  };

  return (
    <div id="available-rooms" style={styles.container}>
      <div id="search-container">
        {!showSearch ? (
          <>
            <div id="available-rooms-header">
              Chat rooms available
              <SearchIcon
                style={styles.searchIcon}
                onClick={handleSearchClick}
              />
            </div>
          </>
        ) : (
          <div id="search-bar" style={styles.searchBar}>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search rooms"
            />
            <CloseIcon style={styles.closeIcon} className="close-icon" onClick={handleCloseClick} />
          </div>
        )}
      </div>

      {isMobile ? (
        <SwipeableViews style={styles.swipeableViewsContainer}>
          {renderRooms()}
        </SwipeableViews>
      ) : (
        <div id="room-container" style={styles.gridContainer}>
          {renderRooms()}
        </div>
      )}
      <div id="button-container">
        <button id="refresh">Refresh</button>
        <button id="create-new" onClick={onButtonClick1}>
          Create new
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: "20px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "50px",
  },
  swipeableViewsContainer: {
    overflowX: "hidden",
    padding: "20px",
  },
  card: {
    background:
      "linear-gradient(0deg, rgba(170, 20, 240, 0.2), rgba(170, 20, 240, 0.2)), linear-gradient(180.71deg, rgba(170, 20, 240, 0.2107) -97.37%, rgba(170, 20, 240, 0.00447917) 99.37%, rgba(217, 217, 217, 0) 99.38%, rgba(217, 217, 217, 0) 99.38%)",
    border: "1.11168px solid #AA14F0",
    borderRadius: "8.8934px",
    padding: "20px",
    clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)",
  },
  searchIcon: {
    cursor: "pointer",
    marginLeft: "10px",
  },
  closeIcon: {
    cursor: "pointer",
    marginLeft: "10px",
  },

  searchInput: {
    width: "200px",
    height: "32px",
    margin: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    padding: "4px 8px",
    outline: "none",
    fontFamily: "Orbitron",
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "24px",
    letterSpacing: "0.14em",
    textAlign: "left",
    color: "#ffffff",
    width: "600px",
  },
  closeIcon: {
    cursor: "pointer",
    marginLeft: "10px",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
    width: "500px", 
  },
  availableRoomsHeader: {
    fontFamily: "Orbitron",
    fontSize: "36px",
    fontWeight: "700",
    lineHeight: "55px",
    letterSpacing: "0.14em",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    color: "#ffffff",
    marginTop: "4vh",
    marginBottom: "4vh",
  },
};

export default AvailableRooms;
