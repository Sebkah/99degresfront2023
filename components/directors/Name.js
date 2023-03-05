import React from 'react';

import Cross from './Cross';

export function Name({ isFeatured, setFeatured, surname, colorStyle, name }) {
  return (
    <div className="name-container">
      <Cross render={isFeatured} setFeatured={setFeatured}></Cross>
      <div
        className="surname"
        style={{
          color: colorStyle,
        }}
      >
        {surname}
      </div>
      <div className="name">{name}</div>
    </div>
  );
}
