/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'irpc-air.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
