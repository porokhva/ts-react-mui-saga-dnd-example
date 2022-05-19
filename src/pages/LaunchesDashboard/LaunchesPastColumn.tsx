import { AppCard } from '@component/card/Card'
import { MovableCard } from '@component/card/MovableCard'
import { DroppableColumn } from '@component/column/DropableColumn'
import { Box, Grid } from '@mui/material'
import { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { DRAG_TYPES } from '@/providers'
import { useAppDispatch, useAppSelector } from '@/store'
import { LAUNCH_STATUSES } from '@/store/launches/constants'
import { selectPastLaunchesList, selectPastLaunchesListLoading } from '@/store/launches/selectors'
import { launchesActions } from '@/store/launches/slice'
import { dateUtils } from '@/utils'

export const LaunchesPastColumn = ({ onCardMove, onColumnDrop, canDrop: canDropPast }) => {
  const dispatch = useAppDispatch()
  const loadingLaunchesPast = useAppSelector(selectPastLaunchesListLoading)

  const launchesListPast = useAppSelector(selectPastLaunchesList)

  useEffect(() => {
    if (!launchesListPast.length) {
      dispatch(launchesActions.fetchPastLaunchesList())
    }
  }, [])

  return (
    <Fragment>
      <Grid item xs={4}>
        <DroppableColumn canDrop={canDropPast} name={LAUNCH_STATUSES.past} type={DRAG_TYPES.CARD} onDrop={onColumnDrop}>
          {loadingLaunchesPast
            ? Array.from(Array(4).keys()).map((_, i) => {
                return (
                  <Box key={i}>
                    <AppCard loading={true} />
                  </Box>
                )
              })
            : launchesListPast?.map((l, i) => {
                return (
                  <Link to={l.id} key={l.id}>
                    <MovableCard
                      name={LAUNCH_STATUSES.past}
                      index={i}
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
