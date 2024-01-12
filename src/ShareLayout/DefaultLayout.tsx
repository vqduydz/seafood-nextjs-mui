import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Box } from '@mui/material';
import { ReactNode, memo } from 'react';

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 222px)', pt: { xs: '88px', lg: '108px' } }}>{children}</Box>
      <Footer />
    </Box>
  );
}
export default memo(DefaultLayout);
