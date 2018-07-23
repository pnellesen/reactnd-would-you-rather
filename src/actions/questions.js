/**
 * Note: the following will eventually go into a "shared" file, along with question loading, but for now we'll keep in here
 */
import {
    _getQuestions,
  } from '../api/_DATA.js'


export const FETCH_ALL_QUESTIONS = 'FETCH_ALL_QUESTIONS'
export const FETCH_QUESTION = 'FETCH_QUESTION'


export function fetchQuestions(questions) {
    return {
        type: FETCH_ALL_QUESTIONS,
        questions

    }
}

export function handleFetchQuestions() {
    return (dispatch) => {
        return _getQuestions().then((questions) => {
            dispatch(fetchQuestions(questions));
        })
    }
}