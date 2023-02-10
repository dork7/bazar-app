import React from 'react';
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import {
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import Logo from './Logo';
import Image from 'next/image';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import Search from '../SearchField/Search';
const SearchBar = () => {
  return (
    // <Flex justify="space-around">
    <HStack gap={6} m={2}>
      <Logo />
      <Search />
      {/* <InputGroup>
        <Input placeholder="Search Item" borderRadius={'0px'} />
        <InputRightAddon borderRadius={'0px'} bgColor="mOrange">
          <FiSearch />
        </InputRightAddon>
      </InputGroup> */}
      <FiShoppingCart size={'30px'} />
      <Image
        src="/assets/images/srchBarLogo.png"
        width={120}
        height={20}
        alt="logo"
      />
    </HStack>
    // </Flex>
  );
};

export default SearchBar;
