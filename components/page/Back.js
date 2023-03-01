import React from 'react';
import { useRouter } from 'next/router';

const Back = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push('/');
      }}
      className="back"
    >
      &larr;
    </div>
  );
};

export default Back;
