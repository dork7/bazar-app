import Hero from '@/components/Hero';
import ProductSection from '@/components/ProductSection';
import UserContext from '@/store/UserContext';
import { getAllProducts } from '@/utils/api.utils';
import { Inter } from '@next/font/google';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
const inter = Inter({ subsets: ['latin'] });

export default function Home(props) {
  const { preFetchedProducts } = props;
  const userCTX = useContext(UserContext);

  const [products, setProducts] = useState(preFetchedProducts);
  const { data, error, isLoading } = useSWR('/api/products', (apiURL) =>
    fetch(apiURL).then((res) => res.json())
  );
  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
    return () => {};
  }, [data]);
  console.log('userCTX :>> ', userCTX.user);

  return (
    <>
      <Hero />
      <ProductSection
        title={'Products'}
        products={products}
        isLoading={!preFetchedProducts || isLoading}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const data = await getAllProducts();

  return {
    props: {
      preFetchedProducts: data.products,
    },
    // revalidate: 100,
  };
}
