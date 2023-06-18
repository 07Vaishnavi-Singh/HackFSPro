const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const port = 3001;

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
const db = getFirestore();

app.use(cors());
app.use(express.json());

app.set("view engine", "jade");

app.get("/joininPrivateRoom", (req, res) => {
  const roomId = req.query.roomId;
  const capacity = req.query.capacity;
  const chainType = req.query.chainType;
  const token = req.query.token;
  const contractAddress = req.query.contractAddress;
  const ethAddress = req.query.ethAddress;

  res.json({ roomId, capacity, chainType, token, contractAddress, ethAddress });
});

app.post("/joininPublicRoom", async (req, res) => {
  const { roomName, interests, ethAddress } = req.body;

  try {
    const response = await axios.post(
      "https://api.huddle01.com/api/v1/create-room",
      {
        title: "Huddle01-Test",
        hostWallets: [ethAddress],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "O3J9Ce0Xpm9vRXxBwaU0rCweeDANeqMr",
        },
      }
    );

    const createdRoomId = response.data.data?.roomId;
    if (!createdRoomId) {
      throw new Error("Invalid response: Missing roomId");
    }
    const meetingLink = `https://app.huddle01.com/${createdRoomId}`;

    console.log("Joining public room:", roomName);
    const roomData = {
      meetingLink,
      roomName,
      interests,
    };
    await addDoc(collection(db, "rooms"), roomData);
    res.json({ meetingLink });
  } catch (error) {
    console.error("Error joining public room:", error);
    let errorMessage = "Error joining public room";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
