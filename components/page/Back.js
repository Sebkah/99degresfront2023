import React from 'react';
import { useRouter } from 'next/router';

const Back = ({ back }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(back);
      }}
      className="back"
    >
      &larr;
    </div>
  );
};

export default Back;
