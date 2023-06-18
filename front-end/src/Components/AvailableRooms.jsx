import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableViews from "react-swipeable-views";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import "../styles/AvailableRooms.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function AvailableRooms({ onButtonClick1 , onButtonClick2}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Initialize Firebase
    // Your Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAnI3UqmrELKb7ZZ6SYHTElCVYVIpEwNPc",
      authDomain: "huddle01-cf3f9.firebaseapp.com",
      projectId: "huddle01-cf3f9",
      storageBucket: "huddle01-cf3f9.appspot.com",
      messagingSenderId: "1039301002023",
      appId: "1:1039301002023:web:c5205fda0a01b497785f02",
      measurementId: "G-43FC2RR3YW",
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);

    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        const roomsData = querySnapshot.docs.map((doc) => doc.data());

        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchRooms();
  }, []);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleCloseClick = () => {
    setShowSearch(false);
    setSearchInput("");
    setFilteredRooms([]);
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    const filtered = rooms.filter((room) =>
      room.roomName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handleCardHover = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].isHovered = !updatedRooms[index].isHovered;
    setRooms(updatedRooms);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderRooms = () => {
    const roomLimit = 6;
    const startIndex = currentPage * roomLimit;
    const endIndex = startIndex + roomLimit;
    let roomsToRender = rooms.slice(startIndex, endIndex);

    if (searchInput.trim() !== "") {
      roomsToRender = filteredRooms.length > 0 ? filteredRooms : [];
    }

    if (roomsToRender.length === 0) {
      return <div style={styles.notFoundMessage}>Room not found</div>;
    }

    return roomsToRender.map((room, index) => (
      <div
        key={index}
        style={styles.card}
        className={`room ${room.isHovered ? "hovered" : ""}`}
        onMouseEnter={() => handleCardHover(startIndex + index)}
        onMouseLeave={() => handleCardHover(startIndex + index)}
      >
        {room.isHovered ? (
          <>
            <a
              href={room.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Join Meeting</p>
            </a>
            <h5 id="interest-container">
              {room.interests.map((interest, index) => {
                if (index !== room.interests.length - 1) {
                  return (
                    <span id="interests" key={index}>
                      {interest},{" "}
                    </span>
                  );
                } else {
                  return (
                    <span id="interests" key={index}>
                      {interest}
                    </span>
                  );
                }
              })}
            </h5>
          </>
        ) : (
          <p>{room.roomName}</p>
        )}
      </div>
    ));
  };

  return (
    <div id="available-rooms" style={styles.container}>
      <div id="search-container">
        {!showSearch ? (
          <>
            <div
              id="available-rooms-header"
              style={styles.availableRoomsHeader}
            >
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
              onChange={handleSearchInputChange}
              value={searchInput}
            />
            <CloseIcon
              style={styles.closeIcon}
              className="close-icon"
              onClick={handleCloseClick}
            />
          </div>
        )}
      </div>

      {isMobile ? (
        <SwipeableViews style={styles.swipeableViewsContainer}>
          {renderRooms()}
        </SwipeableViews>
      ) : (
        <div id="room-container-main">
          {currentPage > 0 && (
            <button className="navigate-buttons" onClick={handlePreviousPage}>{"<"}</button>
          )}
          <div id="room-container" style={styles.gridContainer}>
            {renderRooms()}
          </div>
          {rooms.length > (currentPage + 1) * 6 && (
            <button className="navigate-buttons" onClick={handleNextPage}>{">"}</button>
          )}
        </div>
      )}
      <div id="button-container">
        <button id="refresh" onClick={onButtonClick2}>Refresh</button>
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
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    position: "relative",
  },
  searchIcon: {
    cursor: "pointer",
    marginLeft: "10px",
    background: "transparent",
  },
  closeIcon: {
    cursor: "pointer",
    marginLeft: "10px",
    background: "transparent",
  },
  searchInput: {
    width: "100%",
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
    background: "transparent",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
    width: "600px",
  },
  availableRoomsHeader: {
    fontFamily: "Orbitron",
    fontSize: "36px",
    fontWeight: "700",
    lineHeight: "55px",
    letterSpacing: "0.25em",
    textAlign: "left",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
  },
  notFoundMessage: {
    fontFamily: "Orbitron",
    fontSize: "24px",
    fontWeight: "700",
    lineHeight: "36px",
    letterSpacing: "0.25em",
    textAlign: "center",
    color: "#ffffff",
    marginTop: "50px",
  },
};

export default AvailableRooms;
