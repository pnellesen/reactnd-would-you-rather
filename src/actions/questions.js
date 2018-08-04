import {
    _getQuestions
  } from '../api/_DATA.js'

export const FETCH_ALL_QUESTIONS = 'FETCH_ALL_QUESTIONS'
export const FETCH_QUESTION = 'FETCH_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function fetchQuestions(questions) {
    return {
        type: FETCH_ALL_QUESTIONS,
        questions

    }
}

export function answerQuestion(questionInfo) {
    return {
        type: ANSWER_QUESTION,
        questionInfo

    }
}

export function handleFetchQuestions() {
    return (dispatch) => {
        return _getQuestions().then((questions) => {
            dispatch(fetchQuestions(questions));
        })
    }
}


