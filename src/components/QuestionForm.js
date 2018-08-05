import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {handleAnswerQuestion} from '../actions/shared'
import { Button } from 'reactstrap';

class QuestionForm extends Component {
  state = {
    answer: '',
    showWaitingMessage: null
  };

  /**
  * @description _onSubmit() send question info to the backend
  *
  * @param {SyntheticEvent} evt Form submit button event
  */
  _onSubmit = (evt) => {
    evt.preventDefault();
    this.setState({showWaitingMessage: true})
    this.props.dispatch(handleAnswerQuestion({authedUser: this.props.authedUser, qid: this.props.question_id, answer: this.state.answer})).then(() => {this.setState({showWaitingMessage: false})})
  }

  /**
  * @description _handleAnswerChange() update state when user types something in question input fields
  *
  * @param {SyntheticEvent} evt Text field change event
  */
  _handleAnswerChange = (evt) => {
    this.setState({answer: evt.target.value})
  }

  render() {
    const { question, isSaving } = this.props
    const {answer, showWaitingMessage} = this.state
    return (
      <form name={'answerForm'} onSubmit={(e) => this._onSubmit(e)}>
          <fieldset className={'poll_display'}>
              <div><input type={'radio'} value={'optionOne'} onChange={(e) => this._handleAnswerChange(e)} checked={answer === 'optionOne'}/> <span>{question.optionOne.text}</span> </div>

              <div className={'question_sep'}>or</div>

              <div><input type={'radio'} value={'optionTwo'} onChange={(e) => this._handleAnswerChange(e)} checked={answer === 'optionTwo'}/> <span>{question.optionTwo.text}</span></div>
          </fieldset>
          <div><Button className={'marTop10'} title={answer === '' ? 'Please choose an option' : ''} disabled={answer === ''}>Vote!</Button></div>
          {(showWaitingMessage === true || isSaving) ? <div className={'marTop10'}>Saving answer...</div> : ''}
        </form>
    )
  }
}

const mapStateToProps = ({ authedUser, questions, loadingBar }, { question_id }) => {
  const question = question_id ? (questions ? questions[question_id] : {}) : {}
  return {
    authedUser: authedUser,
    question_id: question_id || '',
    question: question,
    isSaving: loadingBar.default
  }
}

export default connect(mapStateToProps)(QuestionForm);

QuestionForm.propTypes = {
  authedUser: PropTypes.string,
  question_id: PropTypes.string,
  question: PropTypes.object,
  isSaving: PropTypes.number
}