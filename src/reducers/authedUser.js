import { GET_AUTHED_USER } from '../actions/authedUser'

export default function GET_AUTHED_USER (state=null, action) {
    switch (action.type) {
        case GET_AUTHED_USER:
           return state.authedUserid || null;
       default:
           return state
     }
}