import { call, put, takeLatest } from '@redux-saga/core/effects'
import { all, take } from 'redux-saga/effects'

import { launchesApiService } from '@/services/api/launches/launches.service'
import { LAUNCH_STATUSES } from '@/store/launches/constants'
import { launchesActions } from '@/store/launches/slice'
import { showModalById } from '@/store/ui'
import { MODAL_IDS } from '@/store/ui/types'

function* fetchLaunchesPast() {
  try {
    yield put(launchesActions.setIsLoading({ value: true, type: 'past' }))
    const response = yield call(launchesApiService.getPastList)

    yield put(launchesActions.setListByType({ value: response.data, type: 'past' }))
  } catch (error) {
    console.error(error, 'error')
  } finally {
    yield put(launchesActions.setIsLoading({ value: false, type: 'past' }))
  }
}
function* fetchLaunchesNext() {
  try {
    yield put(launchesActions.setIsLoading({ value: true, type: 'past' }))
    const response = yield call(launchesApiService.getUpcomingList)

    yield put(launchesActions.setListByType({ value: response.data, type: 'next' }))
  } catch (error) {
    console.error(error, 'error')
  } finally {
    yield put(launchesActions.setIsLoading({ value: false, type: 'next' }))
  }
}

function* fetchLaunchById({ payload }) {
  try {
    yield put(launchesActions.setIsLoading({ value: true, type: 'item' }))
    const response = yield call(launchesApiService.getOne, payload)

    yield put(launchesActions.setLaunchItem(response.data))
  } catch (error) {
    console.log(error, 'error')
  } finally {
    yield put(launchesActions.setIsLoading({ value: false, type: 'item' }))
  }
}

function* onChangeLaunchType({ payload }) {
  const itemId = payload.data.item.id
  const itemType = payload.data.name
  const newType = payload.newType
  try {
    if (itemType === LAUNCH_STATUSES.my && itemType !== newType) {
      yield put(showModalById(MODAL_IDS.ASK_SHOULD_MOVE_LAUNCH_FROM_MY))
      const {
        payload: { confirmed }
      } = yield take(launchesActions.onConfirmChangeLaunchType)
      if (!confirmed) return
    }
    if (itemType !== newType) {
      yield call(launchesApiService.updateOne, { newType, id: itemId })
    }

    yield put(launchesActions.updateLaunchType(payload))
  } catch (error) {
    console.error(error, 'error')
  }
}

function* watchFetchLaunchesListData() {
  yield takeLatest(launchesActions.fetchPastLaunchesList.type, fetchLaunchesPast)
}

function* watchFetchLaunchesNextListData() {
  yield takeLatest(launchesActions.fetchNextLaunchesList.type, fetchLaunchesNext)
}

function* watchOnChangeLaunchType() {
  yield takeLatest(launchesActions.onChangeLaunchType, onChangeLaunchType)
}

function* watchFetchLaunchById() {
  yield takeLatest(launchesActions.fetchLaunchById, fetchLaunchById)
}

export function* launchesSage() {
  yield all([
    call(watchFetchLaunchesListData),
    call(watchFetchLaunchesNextListData),
    call(watchOnChangeLaunchType),
    call(watchFetchLaunchById)
  ])
}
