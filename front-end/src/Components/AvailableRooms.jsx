import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableViews from 'react-swipeable-views';
import "../styles/AvailableRooms.css"

function AvailableRooms() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const rooms = ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5', 'Room 6'];

  const renderRooms = () => {
    return rooms.map((room, index) => (
      <div key={index} style={styles.card} className='room'>
        <p>{room}</p>
      </div>
    ));
  };

  return (
    <div id="available-rooms" style={styles.container}>
      <div id="available-rooms-header">Chat rooms available</div>
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
        <button id="create-new">Create new</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '20px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '50px',
  },
  swipeableViewsContainer: {
    overflowX: 'hidden',
    padding: '20px',
  },
  card: {
    background: 'linear-gradient(0deg, rgba(170, 20, 240, 0.2), rgba(170, 20, 240, 0.2)), linear-gradient(180.71deg, rgba(170, 20, 240, 0.2107) -97.37%, rgba(170, 20, 240, 0.00447917) 99.37%, rgba(217, 217, 217, 0) 99.38%, rgba(217, 217, 217, 0) 99.38%)',
    border: '1.11168px solid #AA14F0',
    borderRadius: '8.8934px',
    padding: '20px',
  },
};

export default AvailableRooms;
