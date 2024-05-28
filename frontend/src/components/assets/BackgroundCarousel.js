import React, { useEffect, useState } from 'react';
import hotel1 from '../assets/hotel1.png';
import hotel2 from '../assets/hotel2.png';
import hotel3 from '../assets/hotel3.png';
import hotel4 from '../assets/hotel4.png';

const images = [hotel1, hotel2, hotel3, hotel4];

const BackgroundCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${images[currentIndex]})`;
  }, [currentIndex]);

  return null;
};

export default BackgroundCarousel;
