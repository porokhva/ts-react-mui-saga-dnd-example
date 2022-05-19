import { AppCard } from '@component/card/Card'
import { MovableCard } from '@component/card/MovableCard'
import { DroppableColumn } from '@component/column/DropableColumn'
import { Box, Grid } from '@mui/material'
import { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { DRAG_TYPES } from '@/providers'
import { useAppDispatch, useAppSelector } from '@/store'
import { LAUNCH_STATUSES } from '@/store/launches/constants'
import { selectNextLaunchesList, selectNextLaunchesListLoading } from '@/store/launches/selectors'
import { launchesActions } from '@/store/launches/slice'
import { dateUtils } from '@/utils'

export const LaunchesNextColumn = ({ onCardMove, onColumnDrop, canDrop: canDropNext }) => {
  const dispatch = useAppDispatch()
  const loadingLaunchesNext = useAppSelector(selectNextLaunchesListLoading)

  const launchesListNext = useAppSelector(selectNextLaunchesList)

  useEffect(() => {
    if (!launchesListNext.length) {
      dispatch(launchesActions.fetchPastLaunchesList())
    }
  }, [])

  return (
    <Fragment>
      <Grid item xs={4}>
        <DroppableColumn canDrop={canDropNext} name={LAUNCH_STATUSES.next} type={DRAG_TYPES.CARD} onDrop={onColumnDrop}>
          {loadingLaunchesNext
            ? Array.from(Array(4).keys()).map((_, i) => {
                return (
                  <Box key={i}>
                    <AppCard loading={true} />
                  </Box>
                )
              })
            : launchesListNext?.map((l, i) => {
                return (
                  <Link to={l.id} key={l.id}>
                    <MovableCard
                      index={i}
                      name={LAUNCH_STATUSES.next}
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
