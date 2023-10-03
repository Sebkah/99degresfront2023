import React from 'react';
import { useAppContext } from '../../context/context';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const MenuItem = () => {
  const router = useRouter();

  const { language } = useAppContext();

  const menuClass = router.pathname.includes('director')
    ? 'menu-item active'
    : 'menu-item';
  return (
    <Link className={menuClass} href={'/directors'}>
      {language == 'en' ? (
        'directors'
      ) : (
        <div className="real-title-wrapper">
          créat
          <div className="overflow-wrapper">
            <motion.div
              className="inclusive"
              animate={{ y: '-100%' }}
              transition={{
                repeat: Infinity,

                repeatType: 'reverse',
                repeatDelay: 2,
                duration: 0.1,
              }}
            >
              <div className="eur">rices</div>
              <div className="eur">eurs</div>
            </motion.div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default MenuItem;
