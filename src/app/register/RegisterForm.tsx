'use client';

import Button from '@/components/Button/Button';
import MyTextField from '@/components/MyTextField/MyTextField';
import { useMyContext } from '@/context/context';
import { ISubmitForm } from '@/interface/interface';
import { login, loginError, setToken } from '@/lib/redux/features/authSlices';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { myColors } from '@/styles/color';
import capitalize from '@/utils/capitalize';
import { createNewUserApi } from '@/utils/services/api/userApi';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token) as string;
  const isLogin = useAppSelector((state) => state.auth.isLogin) as string;
  const router = useRouter();
  const { setLoading, emitEvent, listenToEvent } = useMyContext();

  useEffect(() => {
    if (!isLogin && !token) return;
    if (token && !isLogin) {
      dispatch(login(token));
      return;
    }
    router.push('/');
    if (setLoading) setLoading({ loading: false });
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, token]);

  const handleRegister = async (e: ISubmitForm) => {
    if (setLoading) setLoading({ loading: true });
    try {
      e.preventDefault();
      dispatch(loginError({ error: null }));
      const data = new FormData(e.currentTarget);
      const registerInfo = {
        name: capitalize(((data.get('firstName') as string) + ' ' + data.get('lastName')) as string),
        email: (data.get('email') as string).toLowerCase(),
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
        if (setLoading) setLoading({ loading: false });
        return setError(res.data.error);
      }

      if (res.data && !res.data.error && emitEvent && listenToEvent) {
        if (emitEvent && listenToEvent) {
          emitEvent('getToken', { email: data.get('email') as string, password: data.get('password') as string });
          const token = await listenToEvent('getToken');
          if (token.error) dispatch(loginError({ error: token.error }));
          else {
            dispatch(loginError({ error: null }));
            dispatch(setToken(token));
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const textFields = [
    { name: 'firstName', label: 'Họ', id: 'firstName' },
    { name: 'lastName', label: 'Tên', id: 'lastName', type: '' },
    { name: 'email', label: 'Email', id: 'email', type: 'email', autoComplete: 'email' },
    { name: 'phoneNumber', label: 'Số điện thoại', id: 'phoneNumber', type: 'number' },
    { name: 'password', label: 'Mật khẩu', id: 'password', type: 'password' },
    { name: 'confirmPassword', label: 'Xác nhận lại mật khẩu', id: 'confirmPassword', type: 'password' },
  ];

  return (
    <>
      <form onSubmit={handleRegister}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {textFields.map((item) => {
            const { id, label, name, type, autoComplete } = item;
            return (
              <MyTextField
                key={item.id}
                center={true}
                props={{
                  size: 'small',
                  name,
                  label,
                  id,
                  autoComplete: autoComplete ? autoComplete : 'off',
                  type: type ? type : 'text',
                }}
              />
            );
          })}

          <Box sx={{ margin: '15px 0', display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
            <RadioGroup defaultValue="Male" row aria-labelledby="gender" name="gender">
              <FormControlLabel value="Male" control={<Radio />} label={'Nam'} />
              <FormControlLabel value="Female" control={<Radio />} label={'Nữ'} />
              <FormControlLabel value="Other" control={<Radio />} label={'Khác'} />
            </RadioGroup>
          </Box>
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
