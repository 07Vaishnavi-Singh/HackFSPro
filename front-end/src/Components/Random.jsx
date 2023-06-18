import React, { useState } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import '../styles/RandomnessForm.css';

const firebaseConfig = {
  apiKey: "AIzaSyAnI3UqmrELKb7ZZ6SYHTElCVYVIpEwNPc",
  authDomain: "huddle01-cf3f9.firebaseapp.com",
  projectId: "huddle01-cf3f9",
  storageBucket: "huddle01-cf3f9.appspot.com",
  messagingSenderId: "1039301002023",
  appId: "1:1039301002023:web:c5205fda0a01b497785f02",
  measurementId: "G-43FC2RR3YW",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const RandomForm = ({ handleClick3 }) => {
  const [priority1, setPriority1] = useState('');
  const [priority2, setPriority2] = useState('');
  const [priority3, setPriority3] = useState('');

  const handlePriority1Change = (e) => {
    setPriority1(e.target.value);
  };

  const handlePriority2Change = (e) => {
    setPriority2(e.target.value);
  };

  const handlePriority3Change = (e) => {
    setPriority3(e.target.value);
  };

  const handleJoinRandom = async () => {
    const q = query(collection(firestore, 'rooms'), where('interests', 'array-contains', ''));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const allRoomsSnapshot = await getDocs(collection(firestore, 'rooms'));
        const allRooms = allRoomsSnapshot.docs.map((doc) => doc.data());

        if (allRooms.length > 0) {
          const randomRoomIndex = Math.floor(Math.random() * allRooms.length);
          const randomRoom = allRooms[randomRoomIndex];
          const meetingLink = randomRoom.meetingLink;
          window.location.href = meetingLink;
        } else {
          console.log('No rooms available');
        }
      } else {
        const randomIndex = Math.floor(Math.random() * querySnapshot.size);
        const room = querySnapshot.docs[randomIndex].data();
        const meetingLink = room.meetingLink;
        window.location.href = meetingLink;
      }
    } catch (error) {
      console.error('Error joining random room:', error);
    }
  };

  const handleSearchRooms = async () => {
    const userPriorities = [priority1, priority2, priority3];
    const q = query(collection(firestore, 'rooms'), where('interests', 'array-contains-any', userPriorities));

    try {
      const querySnapshot = await getDocs(q);
      let bestMatchCount = 0;
      let bestMatchRoom = null;

      querySnapshot.forEach((doc) => {
        const room = doc.data();
        const matchingInterests = room.interests.filter((interest) =>
          userPriorities.includes(interest)
        );

        if (matchingInterests.length > bestMatchCount) {
          bestMatchCount = matchingInterests.length;
          bestMatchRoom = room;
        }
      });

      if (bestMatchRoom) {
        const meetingLink = bestMatchRoom.meetingLink;
        window.location.href = meetingLink;
      } else {
        console.log('No matching rooms found');
      }
    } catch (error) {
      console.error('Error searching rooms:', error);
    }
  };

  return (
    <div className="random-form">
      <div className="form-group">
        <label className="label" htmlFor="priority1">
          Priority 1:
        </label>
        <input
          type="text"
          id="priority1"
          className="input"
          value={priority1}
          onChange={handlePriority1Change}
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="priority2">
          Priority 2:
        </label>
        <input
          type="text"
          className="input"
          id="priority2"
          value={priority2}
          onChange={handlePriority2Change}
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="priority3">
          Priority 3:
        </label>
        <input
          className="input"
          type="text"
          id="priority3"
          value={priority3}
          onChange={handlePriority3Change}
        />
      </div>

      <div className="button-group">
        <button onClick={handleJoinRandom}>Join Random</button>
        <button onClick={handleSearchRooms}>Search Rooms</button>
        <button className="close-button" onClick={handleClick3}>
          X
        </button>
      </div>
    </div>
  );
};

export default RandomForm;
