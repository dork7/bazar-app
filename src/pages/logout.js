import UserContext from "@/store/UserContext";
import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const Logout = () => {
  const router = useRouter();
  const userCTX = useContext(UserContext);

  localStorage.setItem("user", JSON.stringify({}));
  userCTX.clearUserInfo();
  userCTX.clearCart();
  router.push("/");

  return (
    <Flex justify="center" w={"100vw"} h={"80vh"} align="center">
      <Spinner size="xl" />
    </Flex>
  );
};

export default Logout;
