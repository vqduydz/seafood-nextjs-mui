'use client';
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/lib/redux/store';
import { myColors } from '@/styles/color';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DefaultLayout from './DefaultLayout';
import { Wrapper } from '@/components/Wrapper/Wrapper';

const loginOnly = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const isLogin = useAppSelector((state) => state.auth.isLogin) as string;
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
      if (!isLogin) {
        const timeoutId = setTimeout(() => {
          router.push('/login');
        }, 10000);
        const intervalId = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        return () => {
          clearTimeout(timeoutId);
          clearInterval(intervalId);
        };
      }
    }, [isLogin, router]);
    return isLogin ? (
      <DefaultLayout>
        <Wrapper sx={{ mt: '10px' }}>
          <WrappedComponent {...props} />
        </Wrapper>
      </DefaultLayout>
    ) : (
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
        <Box textAlign={'center'} color={myColors.primary}>
          <Typography fontSize={'2rem'} fontWeight={700}>
            Liên kết này cần đăng nhập để truy cập.{' '}
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
      </Box>
    );
  };

  return AuthComponent;
};

export default loginOnly;
