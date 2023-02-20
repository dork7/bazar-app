import { NumberInput } from "@/components/Inputs/NumberInput";
import { Rating } from "@/components/ProductCard";
import UserContext from "@/store/UserContext";
import { getProductById, getStaticProductIds } from "@/utils/api.utils";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { GiReturnArrow, GiStorkDelivery } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import useSWR from "swr";
import styles from "./productDetail.module.css";

const dummytext = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit, sapien et convallis consectetur, orci magna convallis libero, eget gravida sapien orci sit amet arcu. Nulla elementum purus tortor, eu pulvinar nunc molestie eu. Nulla ut eleifend eros. Phasellus ultrices sem nibh, sed accumsan leo efficitur eu. Morbi tellus elit, porttitor sit amet hendrerit vel, varius sit amet metus. In sit amet interdum mi, ac dignissim arcu. Sed ornare massa eget leo venenatis, ac gravida dui mollis. Quisque lectus quam, ornare eget molestie id, feugiat auctor nisl.

Duis pulvinar pulvinar eros, fringilla semper justo vestibulum eget. Integer et ex tempor, laoreet dui et, pretium purus. Etiam hendrerit tortor in justo volutpat, quis cursus lectus hendrerit. Sed tincidunt mauris id lacus pellentesque, in luctus odio ultricies. Ut sit amet eros nunc. Aenean fringilla tellus non pellentesque dignissim. Fusce tempor placerat libero, ac sollicitudin elit vulputate ac. Donec et neque at erat hendrerit fringilla. Proin ullamcorper enim ac mauris sollicitudin gravida. Praesent vitae magna purus. Suspendisse pretium est ac ante lobortis laoreet. Curabitur sed dolor dui. Mauris massa tortor, feugiat id lobortis at, egestas eget justo.

Proin et commodo orci. Etiam mollis semper ante non dictum. Mauris quis orci pulvinar, porta ex in, blandit odio. Morbi feugiat lacus placerat magna finibus, nec ultricies neque congue. Vestibulum blandit lorem ac enim sagittis, quis vulputate enim mollis. Vestibulum imperdiet nisl ac nunc convallis, ac finibus mauris placerat. Sed at pretium sapien. Aliquam molestie blandit est sed elementum. Vestibulum a euismod risus, eu tempor turpis. Sed vitae nisi ante.

Nullam aliquam, eros sed scelerisque cursus, ipsum dui cursus nibh, iaculis molestie urna enim non elit. Phasellus sed varius urna, sed auctor turpis. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus porttitor, nunc vitae tincidunt volutpat, nisi ipsum eleifend leo, eget gravida ligula leo vel risus. Sed pellentesque turpis a accumsan scelerisque. Cras egestas eu sapien non condimentum.

Etiam commodo mi vel risus pellentesque, sed suscipit enim dictum. Etiam interdum dui lectus, ac porttitor dui venenatis a. Duis ullamcorper, metus vel faucibus molestie, tellus diam posuere nisi, et scelerisque eros neque vitae odio. Vestibulum elit urna, posuere eget elementum a, semper in leo. Nulla ut risus ex. Nam ultrices ultrices magna, vitae pellentesque tellus dapibus a. Praesent gravida eget magna a consequat.`;

const ProductDetail = (props) => {
  const params = useRouter();

  const { productId } = params.query;
  const userCTX = useContext(UserContext);

  const [productDetails, setProductDetails] = useState(props?.productDetails);
  // const [userLoggedIn, setIserLoggedIn] = useState(initialState)
  const quantityRef = useRef();

  const { data, error, isLoading } = useSWR(
    `/api/products/${productId}`,
    (apiURL) => fetch(apiURL).then((res) => res.json())
  );

  const addToCart_handler = () => {
    userCTX.addToCart({
      ...productDetails,
      quantity: quantityRef.current.value,
    });
  };

  useEffect(() => {
    if (data) {
      setProductDetails(data[0]);
    }
    return () => {};
  }, [data]);

  if (!productDetails) {
    return (
      <Flex
        gap={6}
        p={4}
        bg="white"
        justify={"center"}
        align={"center"}
        wrap="wrap"
        h={500}
        w={"70vw"}
      >
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  return (
    <>
      <Flex
        // gap={6}
        // p={4}
        // bg="white"
        // justify={"space-between"}
        // wrap="wrap"
        // w="100%"
        className={styles.productDetails}
      >
        <Box h={400} display="flex" alignItems={"center"}>
          <Image
            height={400}
            width={400}
            alt={productDetails?.name}
            src={productDetails?.imageURL}
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Box as={"header"} display={"flex"} flexDir={"column"} gap={4}>
          {productDetails?.genStaticPages === "true" && (
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              Hot Selling
            </Badge>
          )}
          <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "2xl" }}>
            {productDetails?.name}
          </Heading>
          <Rating
            {...{
              rating: productDetails?.rating,
              numReviews: productDetails?.numReviews,
            }}
          />
          <Divider />
          <Text color={"mOrange"} fontWeight={300} fontSize={"2xl"}>
            Rs {productDetails?.price}
          </Text>
          <Divider />

          <NumberInput title={"Quantity"} qtyRef={quantityRef} />
          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            bg={"mOrange"}
            color={"white"}
            textTransform={"uppercase"}
            _hover={{
              boxShadow: "lg",
            }}
            onClick={addToCart_handler}
            isDisabled={!userCTX.isLoggedIn}
          >
            Add to cart
          </Button>
        </Box>
        <Box
          bg="#f5f5f5"
          p={4}
          display={"flex"}
          flexDir={"column"}
          gap={4}
          borderRadius={8}
          // maxW={'30%'}
        >
          <Heading fontWeight={200} fontSize={{ base: "2xl" }}>
            Delivery Address
          </Heading>
          <HStack className={styles.deliveryCard}>
            <GoLocation />{" "}
            <Text fontSize={{ base: "sm" }}>
              Rawalpindi, House 09, Street 21, Sector 18
            </Text>
          </HStack>
          <HStack className={styles.deliveryCard}>
            <GiStorkDelivery />{" "}
            <Text fontSize={{ base: "sm" }}>Standard Delivery</Text>
            <Text fontSize={{ base: "xs" }} color="gray" fontWeight={600}>
              Rs-100
            </Text>
          </HStack>
          <HStack className={styles.deliveryCard}>
            <BsCashCoin />{" "}
            <Text fontSize={{ base: "sm" }}>Cash on Delivery</Text>
          </HStack>
          <HStack className={styles.deliveryCard}>
            <GiReturnArrow />{" "}
            <Text fontSize={{ base: "sm" }}>7 Days Return Policy</Text>
          </HStack>
        </Box>
      </Flex>
      <Box py={4} className={styles.productDescription}>
        <Card>
          <CardHeader>
            <Heading size="md">Product Description</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Text pt="2" fontSize="sm">
                  {productDetails?.description ?? dummytext}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const product = await getProductById(productId);

  return {
    props: {
      productDetails: product[0],
    },
    // revalidate: 60,
  };
}

export async function getStaticPaths() {
  const { productIds } = await getStaticProductIds();
  console.log(`productIds for static page generation`, productIds);
  return {
    paths: productIds,
    fallback: true,
  };
}

export default ProductDetail;
