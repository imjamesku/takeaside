import { combineReducers } from "redux"
import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { topics } from './topic.reducer'
import { alert } from './alert.reducer'

const rootReducer = combineReducers({
    alert,
    authentication,
    registration,
    topics
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>