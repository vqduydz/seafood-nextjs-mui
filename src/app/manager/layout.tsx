'use client';
import Button from '@/components/Button/Button';
import ManagerHeader from '@/components/ManagerHeader/ManagerHeader';
import { Wrapper } from '@/components/Wrapper/Wrapper';
import { useMyContext } from '@/context/context';
import { useAppSelector } from '@/lib/redux/store';
import { myColors } from '@/styles/color';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactNode, Suspense, useEffect, useState } from 'react';

const ManagerLayout = ({ children }: { children: ReactNode }) => {
  const isLogin = useAppSelector((state) => state.auth.isLogin) as string;
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  const { currentUser } = useMyContext();
  useEffect(() => {
    if (!isLogin || (isLogin && currentUser?.role === 'Customer')) {
      const timeoutId = setTimeout(() => {
        if (!isLogin) router.push('/login');
        else router.push('/');
      }, 10000);
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, [currentUser, isLogin, router]);

  return (isLogin && currentUser?.role === 'Customer') || !isLogin ? (
    <Box
      sx={{
        backgroundImage: "url('/images/bg-01.jpg')",
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: '1',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
        '&::before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          zIndex: '-1',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          backgroundColor: 'rgba(255,255,255,.9)',
        },
      }}
    >
      {!isLogin && (
        <>
          <Box textAlign={'center'} color={myColors.primary}>
            <Typography fontSize={'2rem'} fontWeight={700}>
              Liên kết này cần đăng nhập để truy cập.
            </Typography>
            <Typography fontSize={'2rem'} fontWeight={700}>
              Tự động chuyển đến đăng nhập sau {countdown} giây.
            </Typography>
          </Box>
          <Box textAlign={'center'}>
            <Button primary href="/">
              Đến trang chủ
            </Button>
            <Button style={{ marginLeft: '10px', width: '210px' }} outline href="/login">
              Đến đăng nhập ({countdown}s)
            </Button>
          </Box>
        </>
      )}
      {isLogin && currentUser?.role === 'Customer' && (
        <>
          <Box textAlign={'center'} color={myColors.primary}>
            <Typography fontSize={'2rem'} fontWeight={700}>
              Bạn không có quyền truy cập liên kết này
            </Typography>
            <Typography fontSize={'2rem'} fontWeight={700}>
              Tự động chuyển đến trang chủ sau {countdown} giây.
            </Typography>
          </Box>
          <Button style={{ width: '210px' }} primary href="/">
            Đến trang chủ({countdown}s)
          </Button>
        </>
      )}
    </Box>
  ) : (
    <Box sx={{ minWidth: '768px' }}>
      <ManagerHeader />
      <Box sx={{ minHeight: 'calc(100vh - 222px)', pt: '70px' }}>
        <Wrapper sx={{ mt: '10px' }}>{children}</Wrapper>
      </Box>
    </Box>
  );
};

export default ManagerLayout;
