import { FETCH_ALL_USERS, STORE_NEW_POLL } from '../actions/users'

export default function authors (state={}, action) {
    switch(action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state,
                ...action.users
            }
        case STORE_NEW_POLL:
            const {authedUser, newPollInfo} = action.pollInfo
            return {
                ...state,
                [authedUser]: {...state[authedUser], newPollInfo: {...newPollInfo}}
            }
        default:
            return state
    }
}