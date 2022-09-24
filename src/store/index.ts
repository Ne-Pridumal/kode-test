import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './routers'

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
