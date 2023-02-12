import UserContext from "@/store/UserContext";
import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Center, Divider, Stack, Text } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import ItemCards from "./ItemCards";

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const userCTX = useContext(UserContext);

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
    if (isOpen) {
      getItemFromContext();
    }
    return () => {};
  }, [isOpen]);

  const removeItem = (productId) => {
    userCTX.removeCartItem(productId);
    getItemFromContext();
  };

  return (
    <div>
      <IconButton ref={btnRef} onClick={onOpen}>
        <FiShoppingCart size={"25px"} />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>
          <DrawerBody>
            {!cartList || cartList.length === 0 ? (
              <Center pt={"4rem"}>Cart is empty</Center>
            ) : (
              cartList.map((cartItem) => {
                return <ItemCards item={cartItem} {...{ removeItem }} />;
              })
            )}
          </DrawerBody>

          <DrawerFooter>
            <Stack w={"100%"}>
              <Text fontSize="md" fontSize="md" fontWeight="semibold" as="h6">
                Total Amount {totalPrice}
              </Text>
              <Divider />
              <Box>
                <Button
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                  color="mOrange"
                >
                  Cancel
                </Button>
                <Link href="/checkout">
                  <Button
                    colorScheme="black"
                    variant="outline"
                    onClick={onClose}
                    isDisabled={cartList.length === 0}
                  >
                    Checkout
                  </Button>
                </Link>
              </Box>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
