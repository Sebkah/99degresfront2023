import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/context';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import MenuItemReal from '../MenuItemReal';

const HamburgerMenu = ({ style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsModalOpen(false);
  }, [router.pathname]);

  return (
    <>
      <motion.div
        className="hamburger-menu"
        onClick={() => {
          setIsModalOpen((state) => {
            return !state;
          });
          console.log(isModalOpen);
        }}
        animate={{
          transform: !isModalOpen
            ? 'rotate(0deg) translateX(0)'
            : 'rotate(45deg) translateX(2vh)',
        }}
        transition={{ duration: 0.2 }}
        style={{
          mixBlendMode: router.pathname == '/' ? 'difference' : 'normal',
          ...style,
        }}
      >
        <motion.div
          animate={{
            transform: !isModalOpen
              ? 'translateY(0)'
              : 'translateY(max(3vw, 10px))',
          }}
          transition={{ duration: 0.2 }}
          className="hamburger-menu-line"
        ></motion.div>
        <motion.div
          animate={{
            transform: !isModalOpen ? 'rotate(0deg)' : 'rotate(90deg)',
            transformOrigin: 'center',
          }}
          transition={{ duration: 0.2 }}
          className="hamburger-menu-line"
        ></motion.div>
        <motion.div
          animate={{
            transform: !isModalOpen ? 'scaleX(1)' : 'scaleX(0)',
            /*  transformOrigin: 'bottom left', */
          }}
          transition={{ duration: 0.2 }}
          className="hamburger-menu-line"
        ></motion.div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="hamburger-menu-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <Menu>
              <MenuItemReal />
              <MenuItem name={['movies', 'films']} />
              <MenuItem name={['about', 'à propos']} />
            </Menu>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default HamburgerMenu;
