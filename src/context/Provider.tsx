'use client';
import { ReactNode } from 'react';
import { MyProvider } from './context';

export default function ContextProvider({ children }: { children: ReactNode }) {
  return <MyProvider>{children}</MyProvider>;
}
