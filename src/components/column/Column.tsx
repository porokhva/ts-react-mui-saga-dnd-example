import Stack from '@mui/material/Stack/Stack'
import { FC } from 'react'

export const Column: FC = ({ children }) => {
  return (
    <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={2}>
      {children}
    </Stack>
  )
}
