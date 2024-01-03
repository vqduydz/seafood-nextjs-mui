'use client';
import './Loading.css';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@/lib/redux/store';
import { useMyContext } from '@/context/context';

function Loading() {
  const { loading } = useMyContext();

  return (
    <>
      {loading?.loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            zIndex: 99999,
            opacity: 0.9,
            textAlign: 'center',
            color: '#fff',
            padding: ' 0 16px',
          }}
        >
          <Box className={'loading'}></Box>
          <Typography variant="h2">
            {loading.message ? loading.message : "Please wait a moment. I'm in processing..."}
          </Typography>
        </Box>
      )}
    </>
  );
}

export default Loading;
