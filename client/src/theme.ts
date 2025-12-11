import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8B4513', // Brick red / Saddle Brown
      light: '#A0522D', // Sienna (lighter)
      dark: '#6B3410', // Darker brick
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
  },
  shape: {
    borderRadius: 8,
  },
})

export default theme
