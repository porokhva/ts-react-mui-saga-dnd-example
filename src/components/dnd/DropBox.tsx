import { Box, useTheme } from '@mui/material'
import { FC } from 'react'
import { useDrop } from 'react-dnd'

import { DRAG_TYPES } from '@/providers'

type DropBoxType = {
  onDrop?: (v: any) => void
  canDrop?: (v: any) => boolean
  type: DRAG_TYPES
  className?: string
  style?: any
}

export const DropBox: FC<DropBoxType> = props => {
  const { children, type, onDrop, className, style, canDrop: _canDrop } = props
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: type,
    drop: onDrop,
    // Override monitor.canDrop() function
    canDrop: _canDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  const theme = useTheme()

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return theme.palette.action.active
      } else if (!canDrop) {
        return theme.palette.error.main
      }
    } else {
      return theme.palette.background.default
    }
  }

  return (
    <Box borderRadius={2} sx={{ ...style, backgroundColor: getBackgroundColor() }} ref={drop} className={className}>
      {children}
    </Box>
  )
}
