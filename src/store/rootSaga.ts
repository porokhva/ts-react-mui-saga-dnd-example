import { call } from '@redux-saga/core/effects'
import { all } from 'redux-saga/effects'

import { launchesSage } from '@/store/launches'
import { saga } from '@/store/ui'

export default function* rootSaga(): Generator<any> {
  return yield all([call(launchesSage), call(saga)])
}
