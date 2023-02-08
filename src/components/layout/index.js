import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import TabStack from '../CategoryTabs/TabStack';
import Hero from '../Hero';
import NavBar from '../NavBar';
import SearchBar from '../SearchBar';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Flex justify="center" flexDir={'column'} align="center">
        <Box w="70%">
          <SearchBar />
        </Box>
        <Hero />
        {/* <TabStack /> */}
      </Flex>
    </>
  );
};

export default Layout;
