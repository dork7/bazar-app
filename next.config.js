/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    title: 'MY WEBSITE',
    mongoUser: 'nextjs-user',
    mongoPass: '9gUGaiTKckA4auWN',
    connectionString:
      'mongodb+srv://nextjs-user:9gUGaiTKckA4auWN@mcluster.7kxtv.mongodb.net/nextjs-db?retryWrites=true&w=majority',
  },
};

module.exports = nextConfig;
