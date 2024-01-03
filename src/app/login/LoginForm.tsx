'use client';

import Button from '@/components/Button/Button';
import MyTextField from '@/components/MyTextField/MyTextField';
import { useMyContext } from '@/context/context';
import { getToken, login, loginError } from '@/lib/redux/features/authSlices';
import { useAppDispatch } from '@/lib/redux/store';
import { myColors } from '@/styles/color';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect } from 'react';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { auth } = useMyContext();
  const isLogin = auth?.isLogin;
  const token = auth?.token as string;
  const error = auth?.error as string | null;

  useEffect(() => {
    if (!isLogin && !token) return;
    if (token && !isLogin) {
      dispatch(login(token));
      return;
    }
    if (isLogin) router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, token]);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginError({ error: null }));
    const data = new FormData(e.currentTarget);
    const loginInfo = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };
    getToken(loginInfo);
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            legend: { textAlign: 'center' },
          }}
        >
          <MyTextField
            props={{
              size: 'small',
              name: 'email',
              label: 'Email',
              id: 'email',
              type: 'email',
            }}
          />

          <MyTextField
            props={{
              sx: { margin: '15px 0' },
              size: 'small',
              name: 'password',
              label: 'Password',
              id: 'password',
              type: 'password',
            }}
          />

          <Button primary style={{ backgroundColor: myColors.secondary, width: '100%', fontWeight: 500 }}>
            Đăng nhập
          </Button>
        </Box>
      </form>
      <Box
        sx={{
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ height: '1px', backgroundColor: error ? myColors.primary : myColors.secondary, width: '100%' }} />
        {error && (
          <Typography
            sx={{
              display: 'block',
              position: 'absolute',
              width: 'fit-content',
              backgroundColor: myColors.white,
              color: 'red',
              left: 0,
              right: 0,
              margin: '0 auto',
              padding: '2px 10px',
            }}
          >
            {error as string}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          '& *': { fontSize: '1.4rem' },
        }}
      >
        <Button link href={'/fogot-password'}>
          Quên mật khẩu
        </Button>
        <Button link href={'/register'}>
          Đăng ký
        </Button>
      </Box>
    </>
  );
}
