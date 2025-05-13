'use client';

import { Container } from '@mantine/core';
import { Header } from './Header';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <Container size="lg">
          {children}
        </Container>
      </main>
    </div>
  );
}