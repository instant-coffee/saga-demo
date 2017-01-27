import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'
import { helloSaga } from './sagas'

import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	reducer,
	applyMiddleware(sagaMiddleware)
	)

const action = type => store.dispatch({type})

sagaMiddleware.run(helloSaga)

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} 
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)



