import {
    _getUsers,
  } from '../api/_DATA.js'


export const FETCH_ALL_USERS = 'FETCH_ALL_USERS'
export const FETCH_USER = 'FETCH_USER'
export const STORE_USER_INFO = 'STORE_USER_INFO'

export function storeUserInfo(userInfo) {
    return {
        type: STORE_USER_INFO,
        userInfo
    }
}

export function handleStoreUserInfo(userInfo) {
    return (dispatch) => {
        dispatch(storeUserInfo(userInfo))
    }
}

export function fetchUsers(users) {
    return {
        type: FETCH_ALL_USERS,
        users

    }
}

export function handleFetchUsers() {
    return (dispatch) => {
        return _getUsers().then((users) => {
            /**
             * This is where we insert fields for total number of questions asked, answered, and
             * the sum of both, rather than do it in a component.
             */
             Object.keys(users).map((user) => {
                const totalAnswers = Object.keys(users[user].answers).length;
                const totalQuestions = users[user].questions.length;
                return  users[user] = {...users[user], asked: totalQuestions, answered: totalAnswers, total: totalAnswers + totalQuestions}
            })
            dispatch(fetchUsers(users));
        })
    }
}