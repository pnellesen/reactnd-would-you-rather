import { FETCH_ALL_USERS, STORE_USER_INFO } from '../actions/users'

export default function authors (state={}, action) {
    switch(action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state,
                ...action.users
            }
        case STORE_USER_INFO:
            /**
             * Use this to put any user-specific info we want to keep
             * into the store. userInfo is expected to be an Object, but otherwise
             * can contain any information we want. The primary idea is to use this
             * as a form of psuedo-persistance - it gets wiped when the browser is
             * refreshed, but is maintained if a Route changes or the user logs out.
             */
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