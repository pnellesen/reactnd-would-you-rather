import { combineReducers } from 'redux'
import authedUser from './authedUser'
//import authors from './authors'
//import chirps from './chirps'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    //authors,
    //chirps,
    authedUser,
    loadingBar: loadingBarReducer
})