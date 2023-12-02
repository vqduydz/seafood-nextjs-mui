import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import SupportIcon from '@mui/icons-material/Support';
import { Box } from '@mui/material';

import Header from '@/components/Header/Header';
import '../styles/global.css';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Next.js App Router + Material UI v5',
  description: 'Next.js App Router + Material UI v5',
};

const DRAWER_WIDTH = 240;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${DRAWER_WIDTH}px`,
              mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            Home
          </Box>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
