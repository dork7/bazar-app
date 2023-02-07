import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import Hero from '../Hero';
import NavBar from '../nav-bar';
import SearchBar from '../searchBar';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Flex justify="center" flexDir={'column'} align="center">
        <Box w="70%">
          <SearchBar />
        </Box>
        <Hero />
      </Flex>
    </>
  );
};

export default Layout;
