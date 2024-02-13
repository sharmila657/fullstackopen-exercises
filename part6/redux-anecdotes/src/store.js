import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    notification : notificationReducer
  }

const store = configureStore({ reducer })

export default store;