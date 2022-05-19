import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { Fragment } from 'react'

export interface AppCardProps {
  loading?: boolean
  header?: string
  content?: string
  subheader?: string
}

const AppCard = (props: AppCardProps) => {
  const { loading = false, content, header, subheader } = props

  return (
    <Card sx={{ flex: '1 1 100%', mb: 2, mt: 2 }}>
      <CardHeader
        title={loading ? <Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} /> : header}
        subheader={loading ? <Skeleton animation='wave' height={10} width='40%' /> : subheader}
      />
      <CardContent>
        {loading ? (
          <Fragment>
            <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation='wave' height={10} width='80%' />
          </Fragment>
        ) : (
          <Typography variant='body2' color='text.secondary' component='p'>
            {content}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
export { AppCard }
