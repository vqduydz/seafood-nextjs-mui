import { Box, Container, Typography } from '@mui/material';

export default function About() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" gutterBottom>
          About
        </Typography>
      </Box>
    </Container>
  );
}
