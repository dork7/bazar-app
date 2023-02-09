import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './nav.module.css';
const NavBar = () => {
  const navItems = [
    { id: 1, title: 'EXPLORE STORE', ref: '/' },
    { id: 2, title: 'ADD PRODUCT', ref: '/addProduct' },
    { id: 3, title: 'LOGIN', ref: '/login' },
    { id: 4, title: 'SIGN UP', ref: '/sign-up' },
  ];

  const [selectedLink, setSelectedLink] = useState();
  const setSelected = (id) => {
    setSelectedLink(id);
  };

  return (
    <Flex className={styles.navbar} justify="space-around">
      <HStack gap={6}>
        {navItems.map((item) => (
          <Link
            href={item.ref}
            key={item.id}
            onClick={() => setSelected(item.id)}
          >
            <Text
              variant={selectedLink !== item.id ? 'navText' : 'navTextSelected'}
              fontSize="sm"
            >
              {' '}
              {item.title}
            </Text>
          </Link>
        ))}
      </HStack>
    </Flex>
  );
};

export default NavBar;
