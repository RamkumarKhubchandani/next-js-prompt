/** @type {import('next').NextConfig} */
const nextConfig = {
  // Renamed tutorials to blogs to avoid slug conflict - build 8
  async headers() {
    return [
      {
        source: '/(.*).(jpg|jpeg|png|webp|svg|ico|js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
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
