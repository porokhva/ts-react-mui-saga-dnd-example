import { createSelector } from '@reduxjs/toolkit'

export const selectorNotifications = createSelector(
  state => state.ui.notifications,
  value => value
)

export const selectorCurrentModalId = createSelector(
  state => state.ui.openedModal,
  value => value
)
