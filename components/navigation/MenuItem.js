import React from 'react';
import { useAppContext } from '../../context/context';

import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuItem = ({ name }) => {
  const router = useRouter();

  const { language } = useAppContext();
  const menuName = language == 'en' ? name[0] : name[1];
  const menuClass = router.pathname.includes(name[0])
    ? 'menu-item active'
    : 'menu-item';
  return (
    <Link className={menuClass} href={'/' + name[0]}>
      {menuName}
    </Link>
  );
};

export default MenuItem;
