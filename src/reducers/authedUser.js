import { GET_AUTHED_USER, SET_AUTHED_USER, DO_LOGOUT } from '../actions/authedUser'

export default function authedUser (state=null, action) {
    switch (action.type) {
        case GET_AUTHED_USER:
            return action.authedUser || null
        case SET_AUTHED_USER:
            return {
                ...state,
                authedUser: action.userId
            }
        case DO_LOGOUT:
            return {
                ...state,
                authedUser: null
            }
       default:
           return state
     }
}