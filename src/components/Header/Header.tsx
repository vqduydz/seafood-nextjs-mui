import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button/Button';

export default function Header() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
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
        <Box
          sx={{
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href={'/'}>
            <Image width="250" height="60" src="/images/logo.png" alt="logo" />
          </Link>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              ' a, button': { textTransform: 'uppercase', fontWeight: '600' },
              a: { padding: '1.2rem 2.4rem' },
            }}
          >
            <Link href={'/'}>Menu</Link>
            <Link href={'/'}>About</Link>
            <Link href={'/'}>Contact</Link>
          </Box>

          <Button primary>RESERVATIONS</Button>
        </Box>
      </Box>
    </AppBar>
  );
}
