import React from 'react';
import { useAppContext } from '../../context/context';

import Link from 'next/link';
import { useRouter } from 'next/router';
import useFitText from 'use-fit-text';

const MenuItem = ({ name }) => {
  const router = useRouter();
  console.log(router.pathname);

  const { language } = useAppContext();
  const menuName = language == 'en' ? name[0] : name[1];
  const menuClass = router.pathname.includes(name[0])
    ? 'menu-item active'
    : 'menu-item';
  return (
    <Link
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={menuClass}
      href={'/' + name[0]}
      style={
        router.pathname.includes(name[0])
          ? { color: 'grey', pointerEvents: 'none', cursor: 'default' }
          : null
      }
    >
      {menuName}
    </Link>
  );
};

export default MenuItem;
