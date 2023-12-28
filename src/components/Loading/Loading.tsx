'use client';
import './Loading.css';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@/lib/redux/store';

function Loading() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const message = useAppSelector((state) => state.loading.message);

  return (
    <>
      {isLoading && (
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
          <Typography variant="h2">{message ? message : "Please wait a moment. I'm in processing..."}</Typography>
        </Box>
      )}
    </>
  );
}

export default Loading;
