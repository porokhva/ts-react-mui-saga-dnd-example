import { configureStore } from '@reduxjs/toolkit'
import { AnyAction, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

export const store: Store<unknown, AnyAction> = configureStore({
  reducer: rootReducer,
  middleware: defaultMiddleware => defaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
