import React from 'react';
import { useRouter } from 'next/router';

const Back = ({ backFunction }) => {
  const router = useRouter();
  return (
    <div onClick={backFunction} className="back">
      &larr;
    </div>
  );
};

export default Back;
