import { DropBox } from '@component/dnd'
import Stack from '@mui/material/Stack/Stack'
import { FC } from 'react'

import { DRAG_TYPES } from '@/providers'
import { LAUNCH_STATUSES } from '@/store/launches/constants'

type DroppableColumnType = {
  onDrop?: (v: any) => void
  canDrop?: (v: any) => boolean
  type: DRAG_TYPES
  name: keyof typeof LAUNCH_STATUSES
}

export const DroppableColumn: FC<DroppableColumnType> = ({ name, children, type, onDrop, canDrop }) => {
  const _onDrop = item => {
    onDrop({ name, item })
  }
  const _canDrop = v => {
    const { name } = v
    return canDrop(name)
  }

  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
      spacing={2}
      flex={'1 1 100%'}
      style={{ height: '100%' }}
    >
      <DropBox type={type} onDrop={_onDrop} canDrop={_canDrop} style={{ width: '100%', height: '100%', px: 2 }}>
        {children}
      </DropBox>
    </Stack>
  )
}
