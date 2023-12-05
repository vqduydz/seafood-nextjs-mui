import { Box, Container, Typography } from '@mui/material';

export default function Contact() {
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
          Contact Page
        </Typography>
      </Box>
    </Container>
  );
}
