import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './nav.module.css';
const NavBar = () => {
  const navItems = [
    { id: 1, title: 'EXPLORE STORE', ref: '/' },
    { id: 2, title: 'LOGIN', ref: '/' },
    { id: 3, title: 'SIGN', ref: '/' },
  ];

  const [selectedLink, setSelectedLink] = useState();
  const setSelected = (id) => {
    setSelectedLink(id);
  };

  return (
    <Flex className={styles.navbar} justify="space-around">
      <HStack gap={6}>
        {navItems.map((item) => (
          <Link href="/" key={item.id} onClick={() => setSelected(item.id)}>
            <Text
              variant={selectedLink !== item.id ? 'navText' : 'navTextSelected'}
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
