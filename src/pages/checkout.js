import ItemCards from "@/components/CartDrawer/ItemCards";
import NotificationContext from "@/store/NotificationContext";
import UserContext from "@/store/UserContext";
import { getUser } from "@/utils/api.utils";
import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import {
  Box,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";

const CheckOut = (props) => {
  const { userData, error } = props;

  const userCTX = useContext(UserContext);
  const notificationCtx = useContext(NotificationContext);

  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getItemFromContext = () => {
    const cartItems = userCTX.getCartItem();
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
    setCartList(cartItems);
  };
  useEffect(() => {
    getItemFromContext();
  }, []);
  const removeItem = (productId) => {
    userCTX.removeCartItem(productId);
    getItemFromContext();
  };

  const placeOrder = async () => {
    if (cartList.length === 0) return;
    const itemIds = cartList.flatMap((item) => item.productId);
    console.log(`itemIds`, itemIds);

    notificationCtx.showNotification({
      title: "Placing you order.... 😁",
      message: "Wait please",
      status: "pending",
    });
    const orderBody = {
      itemIds,
      totalPrice,
    };
    try {
      const response = await fetch(`/api/order`, {
        method: "POST",
        body: JSON.stringify(orderBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(`data`, data);
      notificationCtx.showNotification({
        title: `Order Placed 😍 `,
        message: ` Your order id is ${data.orderId}`,
        status: "success",
      });
    } catch (err) {
      console.log(`err`, err);
      notificationCtx.showNotification({
        title: "Error 😐",
        message: err.message || "Masla ho gya ha",
        status: "error",
      });
    }
  };
  if (error) return "Error...";

  return (
    <Flex
      w="100%"
      justify="space-around"
      gap={4}
      // flexDir={"column"}
      // backgroundColor={"gray.100"}
      p={"2rem"}
    >
      <Flex w="50%" p={4} justifyContent="center">
        <Card>
          <CardHeader>
            <Heading size="md">Shipping Details</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                {userData?.name && (
                  <>
                    <Heading size="xs" textTransform="uppercase">
                      Full Name
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {userData?.name}
                    </Text>
                  </>
                )}
                <Heading size="xs" textTransform="uppercase">
                  Email
                </Heading>
                <Text pt="2" fontSize="sm">
                  {userData?.email}{" "}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Address
                </Heading>
                <Text pt="2" fontSize="sm">
                  {userData?.address}{" "}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Total Amount
                </Heading>
                <Text pt="2" fontSize="sm">
                  Rs {totalPrice}
                </Text>
              </Box>
              <Box justifyContent="flex-end" display="flex">
                <Button variant={"categoryBtn"} onClick={placeOrder}>
                  Place Order
                </Button>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Flex>
      <Flex
        w="50%"
        backgroundColor={"gray.100"}
        align="center"
        py={"4rem"}
        flexDir={"column"}
        gap={4}
        maxH={"50vh"}
        overflowY="scroll"
      >
        {cartList.map((cartItem) => {
          return (
            <Box maxW="300" maxH="480" key={cartItem?.productId}>
              <ItemCards item={cartItem} {...{ removeItem }} />
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const userId = req.cookies.userId;
  if (userId === "deleted") {
    res.setHeader("location", "/logout");
    res.statusCode = 302;
    res.end();
    return;
  }
  console.log(`userId`, userId);
  const userData = await getUser(userId);
  if (!userData) {
    return {
      props: {
        error: "User not found",
      },
    };
  }
  return {
    props: {
      userData,
    },
  };
}

export default CheckOut;
