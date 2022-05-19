import { Box, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Fragment, useCallback, useRef } from 'react'

import { LaunchesMyColumn } from '@/pages/LaunchesDashboard/LaunchesMyColumn'
import { LaunchesNextColumn } from '@/pages/LaunchesDashboard/LaunchesNextColumn'
import { LaunchesPastColumn } from '@/pages/LaunchesDashboard/LaunchesPastColumn'
import { ModalConfirmMoveLaunch } from '@/pages/LaunchesDashboard/ModalConfirmMoveLaunch'
import { useAppDispatch } from '@/store'
import { LAUNCH_STATUSES } from '@/store/launches/constants'
import { launchesActions } from '@/store/launches/slice'

export const LaunchesDashboard = () => {
  const dispatch = useAppDispatch()

  const lastMovedCardIndex = useRef<number>(0)

  const onColumnDrop = useCallback(({ item, name }) => {
    dispatch(launchesActions.onChangeLaunchType({ newType: name, data: item }))
  }, [])

  const canDropPast = useCallback((item: any) => {
    const { past } = LAUNCH_STATUSES

    const currentColumnName = item
    return currentColumnName === past
  }, [])

  const canDropNext = useCallback((item: any) => {
    const { next, my } = LAUNCH_STATUSES
    const currentColumnName = item
    return currentColumnName === next || currentColumnName === my
  }, [])
  const canDropMy = useCallback((item: any) => {
    const { next, my } = LAUNCH_STATUSES
    const currentColumnName = item
    return currentColumnName === next || currentColumnName === my
  }, [])

  const onCardMove = useCallback((dragIndex, hoverIndex, type) => {
    lastMovedCardIndex.current = hoverIndex
    dispatch(launchesActions.updateLaunchIndex({ dragIndex, hoverIndex, type }))
  }, [])

  return (
    <Fragment>
      <ModalConfirmMoveLaunch />
      <Grid container spacing={2}>
        <Grid item xs={4} alignItems={'center'}>
          <Box mt={5} px={2} alignItems={'center'}>
            <Typography variant={'h4'}>Past launches</Typography>
          </Box>
        </Grid>
        <Grid item xs={4} alignItems={'center'}>
          <Box mt={5} px={2} alignItems={'center'}>
            <Typography variant={'h4'}>Next launches</Typography>
          </Box>
        </Grid>
        <Grid item xs={4} alignItems={'center'}>
          <Box mt={5} px={2} alignItems={'center'}>
            <Typography variant={'h4'}> My launches</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <LaunchesPastColumn onCardMove={onCardMove} onColumnDrop={onColumnDrop} canDrop={canDropPast} />
        <LaunchesNextColumn onCardMove={onCardMove} onColumnDrop={onColumnDrop} canDrop={canDropNext} />
        <LaunchesMyColumn onCardMove={onCardMove} onColumnDrop={onColumnDrop} canDrop={canDropMy} />
      </Grid>
    </Fragment>
  )
}
