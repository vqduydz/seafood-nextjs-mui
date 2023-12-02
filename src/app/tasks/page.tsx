import { Box, Container, Typography } from "@mui/material";


export default function TasksPage() {
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
          Tasks Page
        </Typography>
      </Box>
    </Container>
  );
}
