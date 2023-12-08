import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollTopBtn from '@/components/ScrollTopBtn/ScrollTopBtn';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import ReduxProvider from '@/lib/redux/provider';
import { Box } from '@mui/material';
import '../styles/global.css';
import Test from '.test/Test';
export const metadata = {
  title: 'Seafood',
  description: 'Seafood',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <ReduxProvider>
            <Box sx={{ minHeight: 'calc(100vh - 246px)' }}>{children}</Box>
            <ScrollTopBtn />
          </ReduxProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
