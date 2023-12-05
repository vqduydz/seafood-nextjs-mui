import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Box } from '@mui/material';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import '../styles/global.css';

export const metadata = {
  title: 'Seafood',
  description: 'Seafood',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          <Box sx={{ minHeight: 'calc(100vh - 246px)', pt: '112px' }}>{children}</Box>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
