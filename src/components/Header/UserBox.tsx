'use client';

import { useMyContext } from '@/context/context';
import { logout } from '@/lib/redux/features/authSlices';
import { useAppDispatch } from '@/lib/redux/store';
import { Logout } from '@mui/icons-material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar, Box, Tooltip } from '@mui/material';
import Link from 'next/link';
import { memo, useEffect, useRef, useState } from 'react';
import UserAvatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import { Wrapper } from '../Wrapper/Wrapper';
import { setOrderItems } from '@/lib/redux/features/orderSlice';

const UserBox = () => {
  const [anchorElUser, setAnchorElUser] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleOutsideClick = (event: MouseEvent) => {
    const element = elementRef.current as HTMLElement;
    const btn = btnRef.current as HTMLElement;
    if (element && !element.contains(event.target as Node) && btn && !btn.contains(event.target as Node))
      setAnchorElUser(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const isLogin = useMyContext().auth?.isLogin;
  return (
    <>
      <Tooltip title={anchorElUser ? '' : 'Tài khoản'}>
        <Box ref={btnRef}>
          <Button style={{ padding: 0 }} onClick={() => setAnchorElUser(!anchorElUser)}>
            {isLogin ? (
              <UserAvatar sx={{ width: '50px', height: '50px' }} />
            ) : (
              <Avatar sx={{ width: '40px', height: '40px' }} />
            )}
          </Button>
        </Box>
      </Tooltip>
      {anchorElUser && (
        <Wrapper sx={{ position: 'absolute' }}>
          <Box
            ref={elementRef}
            sx={{
              boxShadow: '0 0 1px 1px #e0592a',
              backgroundColor: '#fff',
              color: 'rgba(0, 0, 0, 0.87)',
              borderRadius: '4px',
              position: 'absolute',
              maxWidth: '270px',
              top: '40px',
              right: 0,
              opacity: '1',

              '.user-btn': {
                height: 'auto',
                borderRadius: 0,
                padding: '5px 15px',
                width: '100%',
                display: 'flex',
                pr: '25px',
                '.title': { justifyContent: 'start' },
                '+.user-btn': { borderTop: '1px solid #e0592a57' },
                '.icon': { width: '40px', backgroundColor: 'transparent', color: ' #e0592a', mr: '10px' },
                ':hover': {
                  backgroundColor: '#0000000a',
                },
              },
            }}
          >
            {isLogin ? (
              <>
                <Link className="user-btn" href={'#'} onClick={() => setAnchorElUser(false)}>
                  <Button text style={{ padding: 0 }}>
                    <Avatar className="icon" />
                    Quản lý tài khoản
                  </Button>
                </Link>
                <Link className="user-btn" href={'#'} onClick={() => setAnchorElUser(false)}>
                  <Button text style={{ padding: 0 }}>
                    <ListAltIcon className="icon" />
                    Đơn hàng của tôi
                  </Button>
                </Link>
                <Button
                  text
                  className="user-btn"
                  onClick={() => (setAnchorElUser(false), dispatch(logout()), dispatch(setOrderItems([])))}
                >
                  <Logout className="icon" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link className="user-btn" href={'/login'} onClick={() => setAnchorElUser(false)}>
                  <Button text style={{ padding: 0 }}>
                    <LoginIcon className="icon" />
                    Đăng nhập
                  </Button>
                </Link>
                <Link className="user-btn" href={'/register'} onClick={() => setAnchorElUser(false)}>
                  <Button text style={{ padding: 0 }}>
                    <AppRegistrationIcon className="icon" />
                    Đăng ký
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Wrapper>
      )}
    </>
  );
};

export default memo(UserBox);
