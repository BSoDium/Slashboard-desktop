import React from 'react';

const TempIndicator = () => {
  const temp = {
    cpu: [40, 43, 51, 42, 46, 40],
    gpu: 56,
  }; // fake
  return (
    <div className="hardware-component">
      <div className="flex-row">hello</div>
    </div>
  );
};

export default TempIndicator;
