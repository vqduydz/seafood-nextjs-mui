'use client';
import { useAppSelector } from '@/lib/redux/store';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Box } from '@mui/material';
import { ReactNode, memo, useEffect } from 'react';

function LoginOnlyLayout({ children }: { children: ReactNode }) {
  const isLogin = useAppSelector((state) => state.auth.isLogin) as string;
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) return router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <Box>
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 246px)', pt: '112px' }}>{children}</Box>
      <Footer />
    </Box>
  );
}
export default memo(LoginOnlyLayout);
