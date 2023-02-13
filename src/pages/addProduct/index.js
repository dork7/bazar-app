import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { FaIoxhost } from "react-icons/fa";
import NotificationContext from "@/store/NotificationContext";
import UserContext from "@/store/UserContext";

const dummytext = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit, sapien et convallis consectetur, orci magna convallis libero, eget gravida sapien orci sit amet arcu. Nulla elementum purus tortor, eu pulvinar nunc molestie eu. Nulla ut eleifend eros. Phasellus ultrices sem nibh, sed accumsan leo efficitur eu. Morbi tellus elit, porttitor sit amet hendrerit vel, varius sit amet metus. In sit amet interdum mi, ac dignissim arcu. Sed ornare massa eget leo venenatis, ac gravida dui mollis. Quisque lectus quam, ornare eget molestie id, feugiat auctor nisl.

Duis pulvinar pulvinar eros, fringilla semper justo vestibulum eget. Integer et ex tempor, laoreet dui et, pretium purus. Etiam hendrerit tortor in justo volutpat, quis cursus lectus hendrerit. Sed tincidunt mauris id lacus pellentesque, in luctus odio ultricies. Ut sit amet eros nunc. Aenean fringilla tellus non pellentesque dignissim. Fusce tempor placerat libero, ac sollicitudin elit vulputate ac. Donec et neque at erat hendrerit fringilla. Proin ullamcorper enim ac mauris sollicitudin gravida. Praesent vitae magna purus. Suspendisse pretium est ac ante lobortis laoreet. Curabitur sed dolor dui. Mauris massa tortor, feugiat id lobortis at, egestas eget justo.

Proin et commodo orci. Etiam mollis semper ante non dictum. Mauris quis orci pulvinar, porta ex in, blandit odio. Morbi feugiat lacus placerat magna finibus, nec ultricies neque congue. Vestibulum blandit lorem ac enim sagittis, quis vulputate enim mollis. Vestibulum imperdiet nisl ac nunc convallis, ac finibus mauris placerat. Sed at pretium sapien. Aliquam molestie blandit est sed elementum. Vestibulum a euismod risus, eu tempor turpis. Sed vitae nisi ante.

Nullam aliquam, eros sed scelerisque cursus, ipsum dui cursus nibh, iaculis molestie urna enim non elit. Phasellus sed varius urna, sed auctor turpis. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus porttitor, nunc vitae tincidunt volutpat, nisi ipsum eleifend leo, eget gravida ligula leo vel risus. Sed pellentesque turpis a accumsan scelerisque. Cras egestas eu sapien non condimentum.

Etiam commodo mi vel risus pellentesque, sed suscipit enim dictum. Etiam interdum dui lectus, ac porttitor dui venenatis a. Duis ullamcorper, metus vel faucibus molestie, tellus diam posuere nisi, et scelerisque eros neque vitae odio. Vestibulum elit urna, posuere eget elementum a, semper in leo. Nulla ut risus ex. Nam ultrices ultrices magna, vitae pellentesque tellus dapibus a. Praesent gravida eget magna a consequat.`;

const AddProduct = () => {
  const imageRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const numOfReviewsRef = useRef();
  const ratingsRef = useRef();
  const descpRef = useRef();
  const [rating, setRating] = React.useState("1");
  const [genStaticPages, setGentStaticPages] = React.useState(false);
  const notificationCtx = useContext(NotificationContext);
  const userCTX = useContext(UserContext);

  const formSubmitted = async (e) => {
    const { userId } = userCTX.getUserInfo();
    console.log("user :>> ", userId);
    e.preventDefault();
    const imgFile = imageRef.current.files[0];
    const formData = new FormData();
    formData.append("imageFile", imgFile);
    formData.append("name", nameRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("numOfReviews", numOfReviewsRef.current.value);
    formData.append("rating", rating);
    formData.append("genStaticPages", genStaticPages);
    formData.append("userId", userId);
    formData.append("description", descpRef.current.value);

    notificationCtx.showNotification({
      title: "Adding product",
      message: "Wait please",
      status: "pending",
    });

    // const fetcher = url => axios.get(url).then(res => res.data)
    try {
      const data = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      console.log("data :>> ", data);
      notificationCtx.showNotification({
        title: "Product Added",
        message: "Ho gya, Mubarik ho",
        status: "success",
      });
    } catch (err) {
      notificationCtx.showNotification({
        title: "Error !",
        message: err.message || "Masla ho gya ha",
        status: "error",
      });
    }
  };

  return (
    <>
      <Box
        fontSize="2xl"
        fontWeight="semibold"
        as="h2"
        // lineHeight="tight"
        color={"gray.500"}
        isTruncated
      >
        Add Product
      </Box>
      <form onSubmit={formSubmitted}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={2}
          backgroundColor="whiteAlpha.900"
          p={6}
          w={"60vw"}
        >
          <FormControl isRequired>
            <FormLabel>Product name</FormLabel>
            <Input placeholder="Product name" ref={nameRef} />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input placeholder="" ref={priceRef} />
          </FormControl>
          <FormControl>
            <FormLabel>Number of Reviews</FormLabel>
            <Input placeholder="" ref={numOfReviewsRef} />
          </FormControl>

          <GridItem p={2}>
            <FormLabel>Choose an image:</FormLabel>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              ref={imageRef}
            ></input>{" "}
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl as="fieldset">
              <FormLabel as="legend">Ratings</FormLabel>
              <RadioGroup onChange={setRating} value={rating}>
                <HStack spacing="24px">
                  <Radio value="1">Ok</Radio>
                  <Radio value="2">Good</Radio>
                  <Radio value="3">Very Good</Radio>
                  <Radio value="4">Best</Radio>
                  <Radio value="5">Unmatchable</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </GridItem>
          <GridItem my={2}>
            <FormLabel htmlFor="gen-pages">Generate Static Page</FormLabel>
            <Switch
              id="gen-pages"
              value={genStaticPages}
              onChange={() => setGentStaticPages((prev) => !prev)}
            />
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl as="fieldset">
              <FormLabel as="legend">Description</FormLabel>
              <Textarea
                value={dummytext}
                ref={descpRef}
                placeholder="Here is a sample placeholder"
                size="sm"
              />
            </FormControl>
          </GridItem>
          <GridItem colStart={2} p={2}>
            <Button
              borderRadius={0}
              type="submit"
              bgColor="mOrange"
              width="full"
              _hover={{ color: "white" }}
            >
              Publish Product
            </Button>
          </GridItem>
        </Grid>
      </form>
    </>
  );
};

export default AddProduct;
