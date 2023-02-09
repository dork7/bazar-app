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
  Spinner,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { GiReturnArrow, GiStorkDelivery } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';
import useSWR from 'swr';
import styles from './productDetail.module.css';
const ProductDetail = (props) => {
  // const { isNew, imageURL, name, price, rating, numReviews } =
  //   props?.productDetails ?? '';

  const params = useRouter();

  const { productId } = params.query;

  const [productDetails, setProductDetails] = useState(props?.productDetails);

  const { data, error, isLoading } = useSWR(
    `/api/products/${productId}`,
    (apiURL) => fetch(apiURL).then((res) => res.json())
  );

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
        justify={'center'}
        align={'center'}
        wrap="wrap"
        h={500}
        w={'70vw'}
      >
        <Spinner size={'xl'} />
      </Flex>
    );
  }

  return (
    <Flex gap={6} p={4} bg="white" justify={'space-between'} wrap="wrap">
      <Box h={400} display="flex" alignItems={'center'}>
        <Image
          height={400}
          width={400}
          alt={productDetails?.name}
          src={productDetails?.imageURL}
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box as={'header'} display={'flex'} flexDir={'column'} gap={4}>
        <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '2xl' }}>
          {productDetails?.name}
        </Heading>
        <Rating
          {...{
            rating: productDetails?.rating,
            numReviews: productDetails?.numReviews,
          }}
        />
        <Divider />
        <Text color={'mOrange'} fontWeight={300} fontSize={'2xl'}>
          Rs {productDetails?.price}
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
        p={4}
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
  return {
    paths: productIds,
    fallback: true,
  };
}

export default ProductDetail;
