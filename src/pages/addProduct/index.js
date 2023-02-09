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
} from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaIoxhost } from 'react-icons/fa';
import NotificationContext from '@/store/NotificationContext';

const AddProduct = () => {
  const imageRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const numOfReviewsRef = useRef();
  const ratingsRef = useRef();
  const [rating, setRating] = React.useState('1');
  const [genStaticPages, setGentStaticPages] = React.useState(false);
  const notificationCtx = useContext(NotificationContext);

  const formSubmitted = async (e) => {
    e.preventDefault();
    const imgFile = imageRef.current.files[0];
    const formData = new FormData();
    formData.append('imageFile', imgFile);
    formData.append('name', nameRef.current.value);
    formData.append('price', priceRef.current.value);
    formData.append('numOfReviews', numOfReviewsRef.current.value);
    formData.append('rating', rating);
    formData.append('genStaticPages', genStaticPages);
    formData.append('userId', 'DUMMY ID');

    notificationCtx.showNotification({
      title: 'Adding product',
      message: 'Wait please',
      status: 'pending',
    });

    // const fetcher = url => axios.get(url).then(res => res.data)
    try {
      const data = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });
      console.log('data :>> ', data);
      notificationCtx.showNotification({
        title: 'Product Added',
        message: 'Ho gya, Mubarik ho',
        status: 'success',
      });
    } catch (err) {
      notificationCtx.showNotification({
        title: 'Error !',
        message: err.message || 'Masla ho gya ha',
        status: 'error',
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
        color={'gray.500'}
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
          w={'60vw'}
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
            ></input>{' '}
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
          <GridItem colStart={2} p={2}>
            <Button
              borderRadius={0}
              type="submit"
              bgColor="mOrange"
              width="full"
              _hover={{ color: 'white' }}
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
