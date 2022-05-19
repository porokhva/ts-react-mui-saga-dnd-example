import { useLocalStorage } from '@caldwell619/react-hooks'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createContext, Dispatch, FC, SetStateAction, useContext } from 'react'

export const ChosenTheme = createContext<IChosenTheme>({} as IChosenTheme)
export const useChosenThemeContext = () => useContext(ChosenTheme)
export const ChosenThemeProvider: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useLocalStorage<ThemeName>('theme', prefersDarkMode ? 'dark' : 'light', true)

  return <ChosenTheme.Provider value={{ theme, setTheme }}>{children}</ChosenTheme.Provider>
}

type ThemeName = 'dark' | 'light'
interface IChosenTheme {
  theme: ThemeName
  setTheme: Dispatch<SetStateAction<ThemeName>>
}
