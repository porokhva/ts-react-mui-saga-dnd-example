import { AppCard } from '@component/card/Card'
import { MovableCard } from '@component/card/MovableCard'
import { DroppableColumn } from '@component/column/DropableColumn'
import { Box, Grid } from '@mui/material'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { DRAG_TYPES } from '@/providers'
import { useAppSelector } from '@/store'
import { LAUNCH_STATUSES } from '@/store/launches/constants'
import { selectMyLaunchesList, selectMyLaunchesListLoading } from '@/store/launches/selectors'
import { dateUtils } from '@/utils'

export const LaunchesMyColumn = ({ onCardMove, onColumnDrop, canDrop: canDropMy }) => {
  const loadingLaunchesMy = useAppSelector(selectMyLaunchesListLoading)

  const launchesListMy = useAppSelector(selectMyLaunchesList)

  return (
    <Fragment>
      <Grid item xs={4}>
        <DroppableColumn canDrop={canDropMy} name={LAUNCH_STATUSES.my} type={DRAG_TYPES.CARD} onDrop={onColumnDrop}>
          {loadingLaunchesMy
            ? Array.from(Array(4).keys()).map((_, i) => {
                return (
                  <Box key={i}>
                    <AppCard loading={true} />
                  </Box>
                )
              })
            : launchesListMy?.map((l, i) => {
                return (
                  <Link to={l.id} key={l.id}>
                    <MovableCard
                      index={i}
                      name={LAUNCH_STATUSES.my}
                      type={DRAG_TYPES.CARD}
                      onDrop={onCardMove}
                      id={l.id}
                      header={l.name}
                      content={l.details}
                      subheader={dateUtils.formatDate(l.date_local)}
                    />
                  </Link>
                )
              })}
        </DroppableColumn>
      </Grid>
    </Fragment>
  )
}
