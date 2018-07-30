import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button  } from 'reactstrap';
import {handleAnswerQuestion} from '../actions/shared'


class ViewQuestion extends Component {
  state = {
    answer: '',
    showWaitingMessage: null
  };

  _onSubmit = (evt) => {
    evt.preventDefault();
    this.setState({showWaitingMessage: true})
    this.props.dispatch(handleAnswerQuestion({authedUser: this.props.authedUser, qid: this.props.question_id, answer: this.state.answer})).then(() => {this.setState({showWaitingMessage: false})})
  }



  _handleAnswerChange = (evt) => {
    this.setState({answer: evt.target.value})
  }
  render() {
    const { question_id, question, authedUser, authedUserAvatar, votes1, votes2, totalVotes, authorName, hasAnswered, isSaving } = this.props
    const {answer, showWaitingMessage} = this.state
    return (
      (question) ?
      <div>
        <h1 style={{display: 'inline-block'}}>Would you rather... </h1>{authorName !== '' && <span className={'auth_avatar'} style={{backgroundImage: `url(/${authedUserAvatar})`}}>(Submitted by {authorName})</span>}
        <form name={'answerForm'} onSubmit={(e) => this._onSubmit(e)}>
          <fieldset>
          <div><span className={votes1.includes(authedUser) ? 'isBold' : ''}>{question.optionOne.text}</span> {hasAnswered ? `Votes for: ${votes1.length} (${Math.round(votes1.length/totalVotes * 100)}%)` : <input type={'radio'} value={'optionOne'} onChange={(e) => this._handleAnswerChange(e)} checked={answer === 'optionOne'}/>} </div>

          <div>or</div>

          <div><span className={votes2.includes(authedUser) ? 'isBold' : ''}>{question.optionTwo.text}</span> {hasAnswered ? `Votes for: ${votes2.length} (${Math.round(votes2.length/totalVotes * 100)}%)` : <input type={'radio'} value={'optionTwo'} onChange={(e) => this._handleAnswerChange(e)} checked={answer === 'optionTwo'}/>}</div>
          </fieldset>
          { !hasAnswered && <Button title={answer === '' ? 'Please choose an option' : ''} disabled={answer === ''}>Vote!</Button> }
        </form>
        {(showWaitingMessage === true || isSaving) ? <p>Saving answer...</p> : (!isSaving && showWaitingMessage === false) && <p>Your vote saved!</p>}
      </div>
    :
      <div>
        <h3>Question for id {question_id || '[blank]'} not found</h3>
        <p>Please go back or select an option from the menu</p>
      </div>

    )
  }
}

const mapStateToProps = ({ authedUser, questions, users, loadingBar }, { match }) => {
  const question_id = match.params.question_id;
  const question = questions[question_id];
  const votes1 = question ? question.optionOne.votes : []
  const votes2 = question ? question.optionTwo.votes : []

  const authorName = question ? users[question.author].name : ''

  const hasAnswered = question && (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
  return {
    authedUser: authedUser,
    question_id: question_id,
    question: question,
    hasAnswered: hasAnswered,
    authorName: authorName,
    authedUserAvatar: users[question.author].avatarURL,
    votes1: votes1,
    votes2: votes2,
    totalVotes: votes1.length + votes2.length,
    isSaving: loadingBar.default
  }
 }

 export default connect(mapStateToProps)(ViewQuestion);


