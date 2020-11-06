import {combineReducers} from 'redux'
import hobbyreducer from '../resoleredux/reducers'

const rootReducer=combineReducers({
    login:hobbyreducer,
})
export default rootReducer