// `combineReducers` is not currently used, but eventually should be for modular code :D
// When you're ready to use it, un-comment the line below!
import {combineReducers} from 'redux'
import students from './students'
import campuses from './campuses'

const initialState = {}

const rootReducer = combineReducers({
  students,
  campuses
})

//export action creators
export * from './students'
export * from './campuses'
