import React from 'react';

import Link from 'next/link';

import LanguageSwitch from './LanguageSwitch';

const Title = () => {
  return (
    <div href="/" className="big-title">
      <div className="title-line">COL</div>
      <div className="title-line">LEC</div>
      <div className="title-line">TIF</div>
      <div className="title-line">99°</div>
    </div>
  );
};

export default Title;
