import { Inter } from '@next/font/google';
import Layout from '@/components/layout';
import SearchBar from '@/components/searchBar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Layout />
    </>
  );
}
