import { FETCH_ALL_USERS } from '../actions/users'

export default function authors (state={}, action) {
    switch(action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state,
                ...action.users
            }
        default:
            return state
    }
}