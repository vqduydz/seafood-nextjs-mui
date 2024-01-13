'use client';

import Button from '@/components/Button/Button';
import MyTextField from '@/components/MyTextField/MyTextField';
import { useMyContext } from '@/context/context';
import { ISubmitForm } from '@/interface/interface';
import { myColors } from '@/styles/color';
import { resetPasswordApi } from '@/utils/services/api/userApi';
import { Box, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') as string;

  const { setLoading } = useMyContext();
  const handleLogin = async (e: ISubmitForm) => {
    if (setLoading) setLoading({ loading: true });
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const password = data.get('password') as string;
      const confirmPassword = data.get('confirmPassword') as string;
      if (password !== confirmPassword) {
        if (setLoading) setLoading({ loading: false });
        return setError('Xác nhận mật khẩu không trùng khớp !');
      }
      const res = await resetPasswordApi(token, password);

      if (res.data && res.data.error) {
        if (setLoading) setLoading({ loading: false });
        setError(res.data.error);
        setSuccess(null);
        return;
      }
      if (res.data && res.data.message) {
        setSuccess(res.data.message);
        setError(null);
        if (setLoading)
          setLoading({ loading: true, message: 'Cập nhật mật khẩu thành công. Chuyển tiếp đến Đăng nhập' });
        return setTimeout(() => {
          if (setLoading) setLoading({ loading: false });
          router.push('/login');
        }, 5000);
      }
    } catch (error) {
      if (setLoading) setLoading({ loading: false });
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MyTextField
            props={{
              size: 'small',
              name: 'password',
              label: 'Đặt lai mật khẩu',
              id: 'password',
              type: 'password',
            }}
          />
          <MyTextField
            props={{
              sx: { margin: '15px 0' },
              size: 'small',
              name: 'confirmPassword',
              label: 'Xác nhận lại mật khẩu',
              id: 'confirmPassword',
              type: 'password',
            }}
          />

          <Button primary style={{ backgroundColor: myColors.secondary, width: '100%', fontWeight: 500 }}>
            Đặt lại mật khẩu
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
        <Button link href={'/fogot-password'}>
          Quên mật khẩu
        </Button>
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
