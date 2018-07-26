import { FETCH_ALL_USERS, STORE_USER_INFO } from '../actions/users'

export default function authors (state={}, action) {
    switch(action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state,
                ...action.users
            }
        case STORE_USER_INFO:
            const {authedUser, userInfo} = action.userInfo
            const prevInfo = state[authedUser].userInfo
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    userInfo: {
                        ...prevInfo,
                        ...userInfo
                    }
                }
            }
        default:
            return state
    }
}