import { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import { isMobileDevice, isTouchSupported } from '@/utils'

export const AppDndProvider: FC = ({ children }) => {
  const shouldUseTouch = isMobileDevice() && isTouchSupported()
  return <DndProvider backend={shouldUseTouch ? TouchBackend : HTML5Backend}>{children}</DndProvider>
}

export enum DRAG_TYPES {
  CARD = 'card'
}
