import React from 'react';
import '../services/BackgroundAnimation.scss';

const BackgroundBubbles = () => {
  return (
    <ul className="bg-bubbles">
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} />
      ))}
    </ul>
  );
};

export default BackgroundBubbles;
