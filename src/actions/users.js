/**
 * Note: the following will eventually go into a "shared" file, along with question loading, but for now we'll keep in here
 */
import { showLoading, hideLoading } from 'react-redux-loading'
import {
    _getUsers,
    //_getTweets,
    //_saveLikeToggle,
    //_saveTweet,
  } from '../api/_DATA.js'


export const FETCH_ALL_USERS = 'FETCH_ALL_USERS'
export const FETCH_USER = 'FETCH_USER'


export function fetchUsers(users) {
    return {
        type: FETCH_ALL_USERS,
        users

    }
}

export function handleFetchUsers() {
    return (dispatch) => {
        dispatch(showLoading())
        return _getUsers().then((users) => {
            dispatch(fetchUsers(users));
            dispatch(hideLoading())
        })
    }
}