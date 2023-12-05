import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button/Button';
import { Wrapper } from '../CustomComponents/CustomMui';

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
            button: { textTransform: 'uppercase', fontWeight: '900', fontSize: '1.6rem', padding: '1.2rem 2.4rem' },
          }}
        >
          <Link style={{ padding: 0, margin: 0 }} href={'/'}>
            <Image width="250" height="80" src="/images/logo.png" alt="logo" priority />
          </Link>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <Link href={'/menu'}>
              <Button text_e>Menu</Button>
            </Link>
            <Link href={'/about'}>
              <Button text_e>About</Button>
            </Link>
            <Link href={'/contact'}>
              <Button text_e>Contact</Button>
            </Link>
          </Box>
          <Button primary>RESERVATIONS</Button>
        </Wrapper>
      </Box>
    </AppBar>
  );
}
