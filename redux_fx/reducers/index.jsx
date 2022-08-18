import packageReducer from "./package";
import filterReducer from "./filterReducer";
import {combineReducers} from 'redux'

export default combineReducers({
    package:packageReducer,
    filter:filterReducer
})