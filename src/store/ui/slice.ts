import { createSlice } from '@reduxjs/toolkit'

import { NotificationItem } from './types'

const slice = createSlice({
  name: 'ui',
  initialState: {
    notifications: [],
    openedModal: null
  },
  reducers: {
    showModalById: (state, action) => {
      state.openedModal = action.payload
    },
    closeCurrentModal: state => {
      state.openedModal = null
    },
    pushNotification: (state, action) => {
      state.notifications = [...state.notifications, { ...action.payload }]
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((el: NotificationItem) => el.id !== action.payload.id)
    }
  }
})
export const { closeCurrentModal, showModalById, removeNotification, pushNotification } = slice.actions
const uiReducer = slice.reducer

export { slice, uiReducer }
