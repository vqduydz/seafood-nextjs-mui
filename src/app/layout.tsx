import ScrollTopBtn from '@/components/ScrollTopBtn/ScrollTopBtn';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Box } from '@mui/material';
import '../styles/global.css';
import ReduxProvider from '@/lib/redux/provider';
import Loading from '@/components/Loading/Loading';

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
            <Loading />
            <ScrollTopBtn />
          </ReduxProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
