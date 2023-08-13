import NotificationContext from "@/store/NotificationContext";
import { Box, Flex } from "@chakra-ui/layout";
import { useContext } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import Notification from "../Notification/notification";
import SearchBar from "../searchBar";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  const notificationContext = useContext(NotificationContext);

  const notification = notificationContext.notification;
  return (
    <>
      <NavBar />
      <Flex justify="center" flexDir={"column"} align="center">
        <Box w="70%"
        >
          <SearchBar />
        </Box>
        <Box
          className={styles.mainLayout}
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
