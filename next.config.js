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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
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

    GOOGLE_CLIENT_ID: '817534087116-v9sfervnm24u0t2ume3ie3db5je87ai9.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    FACEBOOK_CLIENT_ID: '',
    FACEBOOK_CLIENT_SECRET: '',

    NEXTAUTH_SECRET: 'secret!JWTrandom65',
    NEXTAUTH_URL: 'http://localhost:3000',
  },
};

module.exports = nextConfig;
