import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@/store'
import { LAUNCH_STATUSES } from '@/store/launches/constants'

export const selectMyLaunchesList = createSelector(
  (state: RootState) => state.launches.list.my,
  myLaunchesList => myLaunchesList?.map(v => ({ ...v, status: LAUNCH_STATUSES.my }))
) //* selectors
export const selectPastLaunchesListLoading = (state: RootState) => state.launches.loading.past
export const selectNextLaunchesListLoading = (state: RootState) => state.launches.loading.next
export const selectMyLaunchesListLoading = (state: RootState) => state.launches.loading.my
export const selectPastLaunchesList = createSelector(
  (state: RootState) => state.launches.list.past,
  pastLaunchesList => pastLaunchesList?.map(v => ({ ...v, status: LAUNCH_STATUSES.past }))
)
export const selectNextLaunchesList = createSelector(
  (state: RootState) => state.launches.list.next,
  nextLaunchesList => nextLaunchesList?.map(v => ({ ...v, status: LAUNCH_STATUSES.next }))
)

export const selectCurrentLaunch = createSelector(
  (state: RootState) => state.launches.item,
  item => item
)
