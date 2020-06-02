import React from 'react';
import useDarkMode from 'use-dark-mode';
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, lightTheme, darkTheme } from './Theme';

export default ({ children }) => {
  const { value } = useDarkMode(false)
  const theme = value ? darkTheme : lightTheme

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
    
  const body = 
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
      return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}