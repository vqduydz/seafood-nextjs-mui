'use client';

import Button from '@/components/Button/Button';
import MyTextField from '@/components/MyTextField/MyTextField';
import { setLoading } from '@/lib/redux/features/loadingSlice';
import { useAppDispatch } from '@/lib/redux/store';
import { myColors } from '@/styles/color';
import { forgotPasswordApi } from '@/utils/services/api/userApi';
import { Box, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    dispatch(setLoading({ isLoading: true, message: 'Hệ thống đang xử lý, vui lòng chờ trong giây lát...' }));
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const email = data.get('email') as string;
      const res = await forgotPasswordApi({ email });
      if (res.data && res.data.message) {
        setError(null);
        setSuccess(res.data.message);
        return;
      }
      if (res.data && res.data.error) {
        setSuccess(null);
        setError(res.data.error);
        return;
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading({ isLoading: false, message: null }));
    }
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
              sx: { margin: '15px 0' },
              size: 'small',
              name: 'email',
              label: 'Email',
              id: 'email',
              type: 'email',
            }}
          />

          <Button primary style={{ backgroundColor: myColors.secondary, width: '100%', fontWeight: 500 }}>
            Quên mật khẩu
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
        <Box
          sx={{
            height: '1px',
            backgroundColor: error ? myColors.error : success ? myColors.success : myColors.secondary,
            width: '100%',
          }}
        />
        {error && (
          <Typography
            sx={{
              display: 'block',
              position: 'absolute',
              width: 'fit-content',
              backgroundColor: myColors.white,
              color: myColors.error,
              left: 0,
              right: 0,
              margin: '0 auto',
              padding: '2px 10px',
            }}
          >
            {error}
          </Typography>
        )}
        {success && (
          <Typography
            sx={{
              display: 'block',
              position: 'absolute',
              width: 'fit-content',
              backgroundColor: myColors.white,
              color: myColors.success,
              left: 0,
              right: 0,
              margin: '0 auto',
              padding: '2px 10px',
              textAlign: 'center',
            }}
          >
            {success}
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
        <Button link href={'/login'}>
          Đăng nhập
        </Button>
        <Button link href={'/register'}>
          Đăng ký
        </Button>
      </Box>
    </>
  );
}
