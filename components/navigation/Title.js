import React from 'react';

import Link from 'next/link';

import LanguageSwitch from './LanguageSwitch';

const Title = () => {
  return (
    <Link href="/">
      {/*      <div className="title">collectif 99°</div> */}
      <div className="title">COL</div>
      <div className="title">LEC</div>
      <div className="title">TIF</div>
      <div className="title">99°</div>
    </Link>
  );
};

export default Title;
