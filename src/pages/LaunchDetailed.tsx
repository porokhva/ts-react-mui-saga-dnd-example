import { Box, Link } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/store'
import { launchesActions } from '@/store/launches'
import { selectCurrentLaunch } from '@/store/launches/selectors'
import { defaults } from '@/utils'

export const LaunchDetailed = () => {
  const dispatch = useAppDispatch()
  const itemData = useAppSelector(selectCurrentLaunch)
  const loading = useAppSelector(state => state.launches.loading.item)
  const { launchId } = useParams<{ launchId: string }>()

  useEffect(() => {
    dispatch(launchesActions.fetchLaunchById(launchId))
    return () => {
      dispatch(launchesActions.setLaunchItem(null))
    }
  }, [launchId])

  if (loading)
    return (
      <Box p={3} flexDirection={'column'} display={'flex'}>
        <Typography mb={2} variant={'h3'}>
          Loading..
        </Typography>
        <RouterLink to={'/'} component={Link}>
          Go back
        </RouterLink>
      </Box>
    )
  if (!itemData)
    return (
      <Box p={3} flexDirection={'column'} display={'flex'}>
        <Typography mb={2} variant={'h3'}>
          Nothing found
        </Typography>
        <RouterLink to={'/'} component={Link}>
          Go back
        </RouterLink>
      </Box>
    )
  return (
    <Box p={3} flexDirection={'column'} display={'flex'}>
      <Typography mb={2} variant={'h3'}>
        {itemData.name}
      </Typography>
      <Box mb={4} width={200} height={200} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <img
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          src={itemData.links?.patch?.small || defaults.notFoundImg}
          alt='patch'
        />
      </Box>
      <RouterLink to={'/'} component={Link}>
        Go back
      </RouterLink>

      <pre>
        <code>{JSON.stringify(itemData, null, 2)}</code>
      </pre>
    </Box>
  )
}
