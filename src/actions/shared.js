import { showLoading, hideLoading } from 'react-redux-loading'
import {handleFetchQuestions} from './questions'
import {handleFetchUsers} from './users'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([
            dispatch(handleFetchQuestions()),
            dispatch(handleFetchUsers())
        ]).then(() => {
            return dispatch(hideLoading())
        })
    }
}