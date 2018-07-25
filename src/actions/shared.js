import { showLoading, hideLoading } from 'react-redux-loading'
import {handleFetchQuestions} from './questions'
import {handleFetchUsers} from './users'
import { _saveQuestionAnswer, _saveQuestion } from '../api/_DATA.js'

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

export function handleAnswerQuestion(questionInfo) {
    return (dispatch) => {
        return _saveQuestionAnswer(questionInfo).then(() => {
            dispatch(handleInitialData());
        })
    }
}

export function handleSaveNewPoll(pollInfo) {
    return (dispatch) => {
        return _saveQuestion(pollInfo).then(() => {
            return Promise.all([dispatch(handleInitialData())])
        })
    }

}