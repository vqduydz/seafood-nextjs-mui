import { Box, Container, Typography } from "@mui/material";


export default function StarredPage() {
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
          Starred Page
        </Typography>
      </Box>
    </Container>
  );
}
