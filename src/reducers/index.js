import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
//import chirps from './chirps'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    //authors,
    users,
    authedUser,

    loadingBar: loadingBarReducer
})