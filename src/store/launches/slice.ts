import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Launch } from '@/models/launches'
import { helpers } from '@/utils'

export type LaunchesTypes = 'past' | 'next' | 'my'
export type LaunchesTypesLoading = LaunchesTypes | 'item'

export interface LaunchesState {
  item: Launch | null
  list: Record<LaunchesTypes, Launch[]>
  loading?: Record<LaunchesTypesLoading, boolean>
}

const initialState: LaunchesState = {
  item: null,
  list: {
    past: [],
    next: [],
    my: []
  },
  loading: {
    past: false,
    next: false,
    my: false,
    item: false
  }
}
const fetchPastLaunchesList = createAction('launches/fetchPastLaunchesList')
const fetchNextLaunchesList = createAction('launches/fetchPastLaunchesList')
const fetchLaunchById = createAction<string>('launches/fetchLaunchById')
const onChangeLaunchType = createAction<{ data: any; newType: string }>('launches/onChangeLaunchType')
const onConfirmChangeLaunchType = createAction<{ confirmed: boolean }>('launches/onConfirmChangeLaunchType')

const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<{ type: LaunchesTypesLoading; value }>) {
      const { type, value } = action.payload
      state.loading[type] = value
    },
    setListByType(state, action: PayloadAction<{ type: LaunchesTypes; value }>) {
      const { type, value } = action.payload
      state.list[type] = value
    },
    setLaunchItem(state, action: PayloadAction<Launch>) {
      state.item = action.payload
    },

    updateLaunchIndex(
      state,
      action: PayloadAction<{
        dragIndex: number
        hoverIndex: number
        type: LaunchesTypes
      }>
    ) {
      const { dragIndex, hoverIndex, type } = action.payload
      const dragItem = state.list[type][dragIndex]

      if (dragItem) {
        const copiedStateArray = helpers.clone(state.list[type])

        // remove item by "hoverIndex" and put "dragItem" instead
        const [prevItem] = copiedStateArray.splice(hoverIndex, 1, dragItem)

        // remove item by "dragIndex" and put "prevItem" instead
        copiedStateArray.splice(dragIndex, 1, prevItem)

        state.list[type] = copiedStateArray
      }
    },
    updateLaunchType(state, action: PayloadAction<{ data: any; newType: string }>) {
      const { data, newType } = action.payload
      if (newType === data.name) return

      const prevList = helpers.clone(state.list[data.name])
      const itemIndex = helpers.findIndex(helpers.propEq('id', data.item.id))(prevList)

      const [prevItem] = prevList.splice(itemIndex, 1)
      state.list[data.name] = prevList

      const nextList = helpers.clone(state.list[newType])

      state.list[newType] = helpers.insert(0, prevItem, nextList)
    }
  }
})

//* actions
export const launchesActions = {
  fetchPastLaunchesList,
  fetchNextLaunchesList,
  onChangeLaunchType,
  onConfirmChangeLaunchType,
  fetchLaunchById,
  ...launchesSlice.actions
}

//*  reducer
const launchesReducer = launchesSlice.reducer
export { launchesReducer }
