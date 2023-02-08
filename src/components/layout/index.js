import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import TabStack from '../CategoryTabs/TabStack';
import Footer from '../Footer';
import Hero from '../Hero';
import NavBar from '../NavBar';
import ProductCard from '../ProductCard';
import ProductSection from '../ProductSection';
import SearchBar from '../SearchBar';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Flex justify="center" flexDir={'column'} align="center">
        <Box w="70%">
          <SearchBar />
        </Box>
        <Hero />
        <Flex
          w="full"
          justify="center"
          flexDir={'column'}
          align="center"
          bgColor={'#f5f5f5'}
          pt={4}
          pb={4}
        >
          {children}
        </Flex>
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
