import { Route, Switch } from 'react-router-dom'

import { LaunchDetailed } from '@/pages/LaunchDetailed'
import { LaunchesDashboard } from '@/pages/LaunchesDashboard/LaunchesDashboard'

export const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={'/'}>
        <LaunchesDashboard />
      </Route>
      <Route exact path={'/:launchId'}>
        <LaunchDetailed />
      </Route>
    </Switch>
  )
}
