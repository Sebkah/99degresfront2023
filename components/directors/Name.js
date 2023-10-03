import React from 'react';

import Cross from './Cross';

export function Name({
  isFeatured,
  setIndexFeatured,

  surname,
  colorStyle,
  name,
  setDirectorFeatured,
}) {
  return (
    <div className="name-container">
      {/*   <Cross
        render={isFeatured}
        setDirectorFeatured={setDirectorFeatured}
        setIndexFeatured={setIndexFeatured}
      ></Cross> */}
      <div
        className="surname"
        style={{
          backgroundColor: colorStyle,
        }}
      >
        {surname}
      </div>
      <div style={{}} className="name">
        {name}
      </div>
    </div>
  );
}
