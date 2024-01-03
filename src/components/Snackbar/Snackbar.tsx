'use client';

import { SnackbarProvider as Provider } from 'notistack';
import { ReactNode } from 'react';
export default function SnackbarProvider({ children }: { children: ReactNode }) {
  return (
    <Provider style={{ fontSize: '1.6rem' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} maxSnack={3}>
      {children}
    </Provider>
  );
}
