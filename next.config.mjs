const nextConfig = {
  // Advanced Load Speed Optimizations
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'lucide-react', 'framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
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
      {
        source: '/blogs/:path(store|createCartSlice|CartWidget)',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/:path(createCartSlice|createAuthSlice|CartWidget|store|Component|Widget|ThemeProvider|theme)',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/todos',
        destination: '/challenges',
        permanent: true,
      },
      {
        source: '/dashboard/:path(123|test)',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/:path(config|app/config|app/config/settings.json|out.txt|pkg/image_filters|src/app/:subpath*)',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
