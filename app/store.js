import {createStore, applyMiddleware, combineReducers} from 'redux'
import axios from 'axios'
import loggingMiddleware from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk
import students from './reducers/students'
import campuses from './reducers/campuses'


const reducer = combineReducers({campuses, students})


const store = createStore(
  reducer,
  applyMiddleware(
    // `withExtraArgument` gives us access to axios in our async action creators!
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunkMiddleware.withExtraArgument({axios}),
    loggingMiddleware
  )
)

export default store;

export * from './reducers/campuses';
export * from './reducers/students';
