import { combineReducers } from 'redux'
//import currentUser from './currentUser'
//import authors from './authors'
//import chirps from './chirps'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    //authors,
    //chirps,
    //currentUser,
    loadingBar: loadingBarReducer
})