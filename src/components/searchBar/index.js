import { HStack } from "@chakra-ui/layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import CartDrawer from "../CartDrawer";
import Search from "../SearchField/Search";
const SearchBar = () => {
  return (
    // <Flex justify="space-around">
    <HStack gap={6} m={2}>
      <Link href="/">
        <Image
          src="/assets/images/darazLogo.png"
          width={120}
          height={20}
          alt="logo"
        />
      </Link>
      <Search />

      <CartDrawer />
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
