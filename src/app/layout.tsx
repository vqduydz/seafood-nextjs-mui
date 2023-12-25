import ScrollTopBtn from '@/components/ScrollTopBtn/ScrollTopBtn';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Box } from '@mui/material';
import '../styles/global.css';
// import { NextAuthProvider } from '@/lib/nextAuth/providers';
import ReduxProvider from '@/lib/redux/provider';

export const metadata = {
  title: 'Seafood',
  description: 'Seafood',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {/* <NextAuthProvider> */}
          <ReduxProvider>
            <Box sx={{ minHeight: 'calc(100vh - 246px)' }}>{children}</Box>
            <ScrollTopBtn />
          </ReduxProvider>
          {/* </NextAuthProvider> */}
        </ThemeRegistry>
      </body>
    </html>
  );
}
