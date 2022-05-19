import { combineReducers } from 'redux'

import { launchesReducer } from '@/store/launches'
import { uiReducer } from '@/store/ui'

export const rootReducer = combineReducers({
  launches: launchesReducer,
  ui: uiReducer
})
