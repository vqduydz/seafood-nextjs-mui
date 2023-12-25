import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Box } from '@mui/material';
import { ReactNode, memo } from 'react';

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 246px)', pt: '112px' }}>{children}</Box>
      <Footer />
    </Box>
  );
}
export default memo(DefaultLayout);
