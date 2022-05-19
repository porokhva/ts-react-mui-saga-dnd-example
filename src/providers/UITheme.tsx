import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { FC, useMemo } from 'react'

import { useChosenThemeContext } from '@/providers/ChosenTheme'

export const ThemeProvider: FC = ({ children }) => {
  const { theme } = useChosenThemeContext()
  const muiTheme = useMemo(() => createThemeHelper(theme), [theme])

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

const brandColor = '#749797'
const createThemeHelper = (theme: 'dark' | 'light') => {
  const isDark = theme === 'dark'
  return createTheme({
    palette: {
      mode: theme,
      background: {
        default: isDark ? '#303030;' : '#f0f0f0',
        paper: isDark ? '#242526' : '#ffffff'
      },
      primary: {
        main: brandColor
      },
      error: {
        main: 'rgb(193,55,55)'
      },
      success: {
        main: 'rgb(76,175,80)'
      }
    }
  })
}
