import { Box } from '@mui/material';
import { ReactNode } from 'react';

export default function OnlyContentLayout({ children }: { children: ReactNode }) {
  return <Box>{children}</Box>;
}
