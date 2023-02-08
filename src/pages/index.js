import { Inter } from '@next/font/google';
import Layout from '@/components/layout';
import SearchBar from '@/components/SearchBar';
import ProductSection from '@/components/ProductSection';
import Hero from '@/components/Hero';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Hero />

      <ProductSection title={'Products'} />
    </>
  );
}
