import Loading from '@/components/Loading/Loading';
import ScrollTopBtn from '@/components/ScrollTopBtn/ScrollTopBtn';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import ContextProvider from '@/context/Provider';
import ReduxProvider from '@/lib/redux/provider';
import { Box } from '@mui/material';
import '../styles/global.css';
import SnackbarProvider from '@/components/Snackbar/Snackbar';

export const metadata = {
  title: 'Seafood',
  description: 'Seafood',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Box sx={{ '.notistack-SnackbarContainer': { top: '10px', right: '20px' } }}>
          <ThemeRegistry>
            <ReduxProvider>
              <ContextProvider>
                <SnackbarProvider>
                  <Box sx={{ minHeight: 'calc(100vh - 246px)' }}>{children}</Box>
                  <Loading />
                </SnackbarProvider>
              </ContextProvider>
              <ScrollTopBtn />
            </ReduxProvider>
          </ThemeRegistry>
        </Box>
      </body>
    </html>
  );
}
