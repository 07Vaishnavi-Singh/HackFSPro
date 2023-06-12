import React, { useState, useEffect } from "react";
import metamask from "../images/metamask.png";
import WalletConnect from "../images/walletconnect.png";
import image1 from "../images/image1.jpeg";
import image2 from "../images/image2.jpeg";
import image3 from "../images/image3.jpeg";
import image4 from "../images/image4.jpeg";
import image5 from "../images/image5.jpeg";

import "../styles/Carousal.css";
const Carousel = () => {
  const [cards, setCards] = useState([
    {
      image: image5,
      topic: "topic goes here",
      quote:
        "Spark Connections, Embrace Unleashed Freedom - Elevate Your Conversations with Huddle01",
    },
    {
      image: image1,
      topic: "topic goes here",
      quote:
        "Spark Connections, Embrace Unleashed Freedom - Elevate Your Conversations with Huddle01",
    },
    { image: image2, topic: "topic goes here", quote: "Quotdsgcyjdgyfe 2" },
    { image: image3, topic: "topic goes here", quote: "Quotesdjhgfdgfhj 3" },
    { image: image4, topic: "topic goes here", quote: "Quotydsgdfggffrfe 4" },

    { image: metamask, topic: "topic goes here", quote: "Quote 6" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [cards.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const getVisibleCards = () => {
    const visibleIndices = [
      currentIndex,
      (currentIndex + 1) % cards.length,
      (currentIndex + 2) % cards.length,
    ];
    return visibleIndices.map((index) => cards[index]);
  };

  const visibleCards = getVisibleCards();

  return (
    <div>
      <div id="carousel-topic"><p>Features</p></div>
      <div className="carousel-container">
        <button className="button-carousel" onClick={handlePrevious}>
          {"<"}
        </button>
        <div className="carousel">
          {visibleCards.map((card, index) => (
            <div className="card" key={index}>
              <img src={card.image} />
              <p>{card.topic}</p>
              <h6>{card.quote}</h6>
            </div>
          ))}
        </div>

        <button className="button-carousel" onClick={handleNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
