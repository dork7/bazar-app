import { Button } from "@chakra-ui/button";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
} from "@chakra-ui/modal";
import React from "react";

const CartDrawer = () => {
  return (
    <div>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
