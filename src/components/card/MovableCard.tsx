import { AppCard, AppCardProps } from '@component/card/Card'
import { DragNDropBox } from '@component/dnd'
import { DragSourceMonitor } from 'react-dnd'

interface MovableCardProps extends AppCardProps {
  id: string
  index: number
  name: string
  type: string
  onDrop: (i: number, b, number) => void
  onDrag?: (v: AppCardProps & { id: string }, monitor: DragSourceMonitor) => void
}

const MovableCard = (props: MovableCardProps) => {
  const { type, name, index, id, onDrop, onDrag, ...rest } = props

  return (
    <DragNDropBox name={name} index={index} type={type} item={{ id, ...rest }} onDrop={onDrop} onDrag={onDrag}>
      <AppCard {...rest} />
    </DragNDropBox>
  )
}
export { MovableCard }
