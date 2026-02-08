/** @type {import('next').NextConfig} */
const nextConfig = {
  // Renamed tutorials to blogs to avoid slug conflict - build 8
  async redirects() {
    return [
      {
        source: '/techblogs',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/techblog',
        destination: '/blogs',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
