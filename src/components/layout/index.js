import NotificationContext from "@/store/NotificationContext";
import { Box, Flex } from "@chakra-ui/layout";
import React, { useContext } from "react";
import TabStack from "../CategoryTabs/TabStack";
import Footer from "../Footer";
import Hero from "../Hero";
import NavBar from "../NavBar";
import Notification from "../Notification/notification";
import ProductCard from "../ProductCard";
import ProductSection from "../ProductSection";
import SearchBar from "../SearchBar";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  const notificationContext = useContext(NotificationContext);

  const notification = notificationContext.notification;
  return (
    <>
      <NavBar />
      <Flex justify="center" flexDir={"column"} align="center">
        <Box w="70%">
          <SearchBar />
        </Box>
        <Box
          className={styles.mainLayout}
          // w="full"
          // justify="center"
          // flexDir={'column'}
          // align="center"
          // bgColor={'#f5f5f5'}
          // py={2}
        >
          {children}
        </Box>
        <Footer />
      </Flex>
      {notification && (
        <Notification
          title={notification?.title}
          message={notification?.message}
          status={notification?.status}
        />
      )}
    </>
  );
};

export default Layout;
