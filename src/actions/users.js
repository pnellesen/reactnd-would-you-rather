/**
 * Note: the following will eventually go into a "shared" file, along with question loading, but for now we'll keep in here
 */
import {
    _getUsers,
  } from '../api/_DATA.js'


export const FETCH_ALL_USERS = 'FETCH_ALL_USERS'
export const FETCH_USER = 'FETCH_USER'
export const STORE_NEW_POLL = 'STORE_NEW_POLL'

export function storeNewPoll(pollInfo) {
    return {
        type: STORE_NEW_POLL,
        pollInfo

    }
}

export function handleStoreNewPoll(pollInfo) {
    return (dispatch) => {
        dispatch(storeNewPoll(pollInfo))
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
             * the sum of both, rather than do it in a component. Use reduce to convert the
             * array returned by the map() to an object with the original keys
             */
            const modifiedUsers = Object.keys(users).map((user) => {
                const totalAnswers = Object.keys(users[user].answers).length;
                const totalQuestions = users[user].questions.length;
                return {...users[user], asked: totalQuestions, answered: totalAnswers, total: totalAnswers + totalQuestions}
            }).reduce(function(obj,item){
                obj[item.id] = {...item};
                return obj;
              }, {});
            dispatch(fetchUsers(modifiedUsers));
        })
    }
}