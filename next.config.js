/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    domains: ['192.168.1.250'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '/*',
        port: '',
        pathname: '/random',
      },
    ],
  },
  env: {
    port: '3000',
    // NODE_ENV: 'development',
    apiEndpoint: 'http://192.168.1.250:8080/v1/api',
    backendUrl: 'http://192.168.1.250:8080/',
    secretKey: 'myCryptoJS',
  },
};

module.exports = nextConfig;
