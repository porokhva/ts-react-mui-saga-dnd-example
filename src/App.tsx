import { styled } from '@mui/material'
import { FC } from 'react'

import { Header } from '@/components/header'
import { AppRouter } from '@/router/Router'

const App: FC = () => {
  return (
    <Root>
      <Header />
      <AppRouter />
    </Root>
  )
}

const Root = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  & a {
    text-decoration: none;
    & .MuiCardHeader-title {
      text-decoration: underline;
    }
  }
`

export { App }
