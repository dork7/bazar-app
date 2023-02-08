import { Box, Button } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { GiFruitBowl } from 'react-icons/gi';

const CategoryTabs = ({ title, img }) => {
  return (
    <Box
      as="button"
      height="32px"
      lineHeight="1.2"
      w="full"
      border="1px"
      px="8px"
      borderRadius="20px"
      fontSize="14px"
      fontWeight="semibold"
      bg="#f5f6f7"
      borderColor="#ccd0d5"
      color="#4b4f56"
      _hover={{ bg: '#ebedf0' }}
      _active={{
        bg: '#dddfe2',
        transform: 'scale(0.98)',
        borderColor: '#bec3c9',
      }}
      p={2}
      d="flex"
    >
      {/* <GiFruitBowl /> */}
      {title}
    </Box>
  );
};

export default CategoryTabs;
