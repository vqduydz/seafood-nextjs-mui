import { AppBar, Avatar, Box, Container, Toolbar, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button/Button';
import { Wrapper } from '../CustomComponents/CustomMui';
import UserAvatar from '../Avatar/Avatar';
import UserBox from './UserBox';

export default function Header() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 100, boxShadow: '0px -15px 15px 20px rgba(0,0,0,0.2)' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.4rem',
          background: '#fff',
          color: '#333',
        }}
      >
        <Wrapper
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Link style={{ padding: 0, margin: 0 }} href={'/'}>
            <Image width="250" height="80" src="/images/logo.png" alt="logo" priority />
          </Link>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              button: {
                textTransform: 'uppercase',
                fontWeight: '900',
                fontSize: '1.8rem',
                padding: '1.2rem 2.4rem',
              },
            }}
          >
            <Link href={'/menu'}>
              <Button text_e>Menu</Button>
            </Link>
            <Button text_e>Đặt bàn</Button>
            <Link href={'/contact'}>
              <Button text_e>Liên hệ</Button>
            </Link>
          </Box>
          <UserBox />
        </Wrapper>
      </Box>
    </AppBar>
  );
}
