import { DragSourceMonitor, useDrag } from 'react-dnd'

const style = {
  cursor: 'move'
}
export const DragBox = ({ item, children, onDrop, type }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { item, type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        onDrop && onDrop(item)
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })
  const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {children}
    </div>
  )
}
