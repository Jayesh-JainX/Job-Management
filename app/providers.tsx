'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const theme = createTheme({
  primaryColor: 'violet',
  colors: {
    violet: [
      '#f5f0ff',
      '#e8dcff',
      '#d4bfff',
      '#c1a2ff',
      '#ad85ff',
      '#9968ff',
      '#864bff',
      '#722eff',
      '#5e11ff',
      '#4a00f4'
    ],
  },
  components: {
    Button: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}