import { NumberInput } from '@/components/Inputs/NumberInput';
import { Rating } from '@/components/ProductCard';
import { getProductById, getStaticProductIds } from '@/utils/api.utils';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { BsCashCoin } from 'react-icons/bs';
import { GiReturnArrow, GiStorkDelivery } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';
import styles from './productDetail.module.css';
const ProductDetail = (props) => {
  const { isNew, imageURL, name, price, rating, numReviews } =
    props?.productDetails ?? '';

  return (
    <Flex gap={6} p={4} bg="white" justify={'space-between'} wrap="wrap">
      <Box>
        <Image
          height={400}
          width={400}
          alt={name}
          src={imageURL}
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box as={'header'} display={'flex'} flexDir={'column'} gap={4}>
        <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '2xl' }}>
          {name}
        </Heading>
        <Rating {...{ rating, numReviews }} />
        <Divider />
        <Text color={'mOrange'} fontWeight={300} fontSize={'2xl'}>
          Rs {price}
        </Text>
        <Divider />

        <NumberInput title={'Quantity'} />
        <Button
          rounded={'none'}
          w={'full'}
          mt={8}
          size={'lg'}
          bg={'mOrange'}
          color={'white'}
          textTransform={'uppercase'}
          _hover={{
            boxShadow: 'lg',
          }}
        >
          Add to cart
        </Button>
      </Box>
      <Box
        bg="#f5f5f5"
        p={2}
        display={'flex'}
        flexDir={'column'}
        gap={4}
        borderRadius={8}
        // maxW={'30%'}
      >
        <Heading fontWeight={200} fontSize={{ base: '2xl' }}>
          Delivery Address
        </Heading>
        <HStack className={styles.deliveryCard}>
          <GoLocation />{' '}
          <Text fontSize={{ base: 'sm' }}>
            Rawalpindi, House 09, Street 21, Sector 18
          </Text>
        </HStack>
        <HStack className={styles.deliveryCard}>
          <GiStorkDelivery />{' '}
          <Text fontSize={{ base: 'sm' }}>Standard Delivery</Text>
          <Text fontSize={{ base: 'xs' }} color="gray" fontWeight={600}>
            Rs-100
          </Text>
        </HStack>
        <HStack className={styles.deliveryCard}>
          <BsCashCoin /> <Text fontSize={{ base: 'sm' }}>Cash on Delivery</Text>
        </HStack>
        <HStack className={styles.deliveryCard}>
          <GiReturnArrow />{' '}
          <Text fontSize={{ base: 'sm' }}>7 Days Return Policy</Text>
        </HStack>
      </Box>
    </Flex>
  );
};

export async function getStaticProps(context) {
  const productId = context.params.productId;

  console.log('productId :>> ', productId);
  const product = await getProductById(productId);
  console.log('product :>> ', product);

  const data = {
    isNew: false,
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4000,
    rating: 4.2,
    numReviews: 34,
  };
  return {
    props: {
      productDetails: product[0],
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const { productIds } = await getStaticProductIds();
  console.log('productIds :>> ', productIds);
  return {
    paths: productIds,
    fallback: true,
  };
}

export default ProductDetail;
