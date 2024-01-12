import { SxMui } from '@/interface/interface';
import Box from '@mui/material/Box';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AuthWrapper({ children, sx }: { children: ReactNode; sx?: SxMui }) {
  return (
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
        position: 'relative',
        zIndex: '1',
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
      <Box
        sx={{
          borderRadius: { md: '10px' },
          padding: '37px 20px 37px',
          maxWidth: { md: '480px' },
          width: '100%',
          minWidth: '300px',
          margin: '0 auto',
          backgroundColor: '#fff',
          position: 'fixed',
          top: { md: '10px' },
          left: { md: '50%' },
          transform: { md: 'translateX(-50%)' },
          boxShadow: '0 0 10px 5px #00000012',
          height: { xs: '100%', md: 'calc(100% - 20px)' },
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            mb: '20px',
          }}
        >
          <Link style={{ padding: 0, margin: 0 }} href={'/'}>
            <Image width="250" height="80" src="/images/logo.png" alt="logo" priority />
          </Link>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px', flexDirection: 'column', pt: '15px' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
