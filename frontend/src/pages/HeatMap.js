import React from 'react';
import './HeatMap.css';

function colorIt() {
    // Generate a random number between 1 and 10
    var x = Math.ceil(Math.random() * 10);
    return x <= 5;
}

function HeatMap({ msg }) {
  // Create an array to dynamically render grid items
  const gridItems = new Array(30).fill(0);

  return (
    <div>
      <div>
        <p>{msg}</p>
      </div>
      <div className='grid-container'>
        {/* Use map to render grid items dynamically */}
        {gridItems.map((_, index) => (
          <div key={index} className={colorIt() ? 'activate grid' : 'grid'}></div>
        ))}
      </div>
    </div>
  );
}

export default HeatMap;
