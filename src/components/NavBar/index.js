import UserContext from "@/store/UserContext";
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/layout";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styles from "./nav.module.css";
const NavBar = () => {
  const navItems = [
    { id: 1, title: "EXPLORE STORE", ref: "/" },
    // { id: 2, title: 'ADD PRODUCT', ref: '/addProduct' },
    { id: 3, title: "LOGIN", ref: "/login" },
    { id: 4, title: "SIGN UP", ref: "/sign-up" },
  ];
  const userCTX = useContext(UserContext);

  const [reRenderer, setReRenderer] = useState(false);
  const [navBarItems, setNavBarItems] = useState(navItems);

  useEffect(() => {
    // console.log(`userCTX.isUserLoggedIn()`, userCTX.isUserLoggedIn());
    // console.log(`userCTX.isLoggedIn`, userCTX.isLoggedIn);
    if (userCTX.isUserLoggedIn()) {
      setNavBarItems([
        { id: 1, title: "EXPLORE STORE", ref: "/" },
        { id: 2, title: "ADD PRODUCT", ref: "/addProduct" },
        { id: 3, title: "LOGOUT", ref: "/logout" },
      ]);
      setReRenderer(!reRenderer);
    } else {
      setNavBarItems(navItems);
    }

    return () => {};
  }, [userCTX.isLoggedIn]);

  const [selectedLink, setSelectedLink] = useState();
  const setSelected = (id) => {
    setSelectedLink(id);
  };

  return (
    <Flex className={styles.navbar} justify="space-around">
      <HStack gap={6}>
        {navBarItems.map((item) => (
          <Link
            href={item.ref}
            key={item.id}
            onClick={() => setSelected(item.id)}
          >
            <Text
              variant={selectedLink !== item.id ? "navText" : "navTextSelected"}
              fontSize="sm"
            >
              {" "}
              {item.title}
            </Text>
          </Link>
        ))}
      </HStack>
    </Flex>
  );
};

export default NavBar;
