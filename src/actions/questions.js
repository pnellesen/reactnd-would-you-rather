/**
 * Note: the following will eventually go into a "shared" file, along with question loading, but for now we'll keep in here
 */
import { showLoading, hideLoading } from 'react-redux-loading'
import {
    _getQuestions,
    //_getTweets,
    //_saveLikeToggle,
    //_saveTweet,
  } from '../api/_DATA.js'


export const FETCH_ALL_QUESTIONS = 'FETCH_ALL_QUESTIONS'
export const FETCH_QUESTION = 'FETCH_QUESTION'


export function fetchQuestion(questions) {
    return {
        type: FETCH_ALL_QUESTIONS,
        questions

    }
}

export function handleFetchQuestions() {
    return (dispatch) => {
        dispatch(showLoading())
        return _getQuestions().then((questions) => {
            console.log("fetchQuestions: ", questions)
            dispatch(fetchQuestion(questions));
            dispatch(hideLoading())
        })
    }
}