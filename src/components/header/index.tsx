import { AppBar, Toolbar } from '@mui/material'
import { FC } from 'react'

import { DarkModeToggle } from '@/components/DarkModeToggle'

const Header: FC = () => {
  return (
    <AppBar position='sticky'>
      <Toolbar variant='dense'>
        <DarkModeToggle />
      </Toolbar>
    </AppBar>
  )
}

export { Header }
