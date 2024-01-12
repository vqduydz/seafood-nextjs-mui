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
    REACT_APP_GOOGLE_MAPS_API_KEY: 'AIzaSyBN9XkKOtu7xtxh0NwuEXILfHpn0ZSmfD4',
    REACT_APP_GOONG_API_KEY: 'hXqN5VLZ8jK6CPWKhe5ygeEUdfxA5E68ZCj3yaUN',
  },
};

module.exports = nextConfig;
