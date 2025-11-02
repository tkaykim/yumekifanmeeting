export const designTokens = {
  colors: {
    primary: {
      background: '#A8DDE6',
      text: '#0A4A5A',
      light: '#D1EFF5',
      dark: '#7BC4D1',
    },
    secondary: {
      background: '#1E88E5',
      text: '#FFFFFF',
      light: '#64B5F6',
      dark: '#1565C0',
    },
    accent: {
      background: '#FF9800',
      text: '#FFFFFF',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    grayscale: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: {
      heading: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      body: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
} as const;

export type DesignTokens = typeof designTokens;

