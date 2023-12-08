import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 246px)', pt: '112px' }}>{children}</Box>
      <Footer />
    </>
  );
}
