import { Inter } from '@next/font/google';
import Layout from '@/components/layout';
import SearchBar from '@/components/SearchBar';
import ProductSection from '@/components/ProductSection';
import Hero from '@/components/Hero';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [products, setProducts] = useState([]);

  const { data, error, isLoading } = useSWR('/api/products', (apiURL) =>
    fetch(apiURL).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
    return () => {};
  }, [data]);

  return (
    <>
      <Hero />

      <ProductSection title={'Products'} products={products} />
    </>
  );
}
