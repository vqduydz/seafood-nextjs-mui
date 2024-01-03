'use client';

import Button from '@/components/Button/Button';
import MyTextField from '@/components/MyTextField/MyTextField';
import { useMyContext } from '@/context/context';
import { getToken, login, loginError, setToken } from '@/lib/redux/features/authSlices';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import useSocket from '@/lib/socket.io/useSocket';
import { myColors } from '@/styles/color';
import capitalize from '@/utils/capitalize';
import { createNewUserApi } from '@/utils/services/api/userApi';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);

  const [kasf, setKasf] = useState(true);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token) as string;
  const isLogin = useAppSelector((state) => state.auth.isLogin) as string;
  const router = useRouter();
  const socket = useSocket() as Socket;
  const { setLoading } = useMyContext();

  useEffect(() => {
    if (socket) {
      socket.on('sendToken', (token) => {
        if (token && !token.error) {
          setError(null);
          dispatch(setToken(token));
        } else {
          setError(token.error);
          dispatch(loginError(token.error));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kasf]);

  useEffect(() => {
    if (!isLogin && !token) return;
    if (token && !isLogin) {
      dispatch(login(token));
      return;
    }
    return router.push('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, token]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    if (setLoading) setLoading({ loading: true });
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const registerInfo = {
        name: capitalize(((data.get('firstName') as string) + ' ' + data.get('lastName')) as string),
        email: data.get('email') as string,
        phoneNumber: data.get('phoneNumber') as string,
        password: data.get('password') as string,
        confirmPassword: data.get('confirmPassword') as string,
        gender: data.get('gender') as string,
      };

      if (registerInfo.password !== registerInfo.confirmPassword) {
        setError('Xác nhận mật khẩu không trùng khớp !');
        return;
      }
      const res = await createNewUserApi(registerInfo);
      if (res.data && res.data.error) {
        return setError(res.data.error);
      }

      if (res.data && !res.data.error) {
        getToken({ email: data.get('email') as string, password: data.get('password') as string });
        return setKasf(!kasf);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (setLoading) setLoading({ loading: false });
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
              size: 'small',
              name: 'firstName',
              label: 'Họ',
              id: 'firstName',
            }}
          />
          <MyTextField
            props={{
              size: 'small',
              name: 'lastName',
              label: 'Tên',
              id: 'lastName',
            }}
          />
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
              size: 'small',
              name: 'phoneNumber',
              label: 'Số điện thoại',
              id: 'phoneNumber',
              type: 'number',
            }}
          />
          <Box sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
            <RadioGroup defaultValue="Male" row aria-labelledby="gender" name="gender">
              <FormControlLabel value="Male" control={<Radio />} label={'Nam'} />
              <FormControlLabel value="Female" control={<Radio />} label={'Nữ'} />
              <FormControlLabel value="Other" control={<Radio />} label={'Khác'} />
            </RadioGroup>
          </Box>
          <MyTextField
            props={{
              size: 'small',
              name: 'password',
              label: 'Mật khẩu',
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
            Đăng ký
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
            {error}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          '& *': { fontSize: '1.4rem' },
        }}
      >
        <Typography>Đã có tài khoản ?</Typography> <Typography> {'=>'}</Typography>
        <Button link href={'/login'}>
          Đăng nhập
        </Button>
      </Box>
    </>
  );
}
