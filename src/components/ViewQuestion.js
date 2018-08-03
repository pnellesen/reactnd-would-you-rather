import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, CardText, CardHeader, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
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
    const { question_id, question, authedUser, authorAvatar, votes1, votes2, totalVotes, authorName, hasAnswered, isSaving } = this.props
    const {answer, showWaitingMessage} = this.state
    return (
      (question) ?
      <div>

        <Card>
          <CardHeader><h3>Would you rather...</h3>{authorName !== '' && <span className={'auth_avatar'} style={{backgroundImage: `url(/${authorAvatar})`}}>(Submitted by {authorName})</span>}</CardHeader>
          <CardBody>
            {/*<CardTitle>Would you rather...</CardTitle>*/}
            {/*authorName !== '' && <CardSubtitle className={'auth_avatar'} style={{backgroundImage: `url(/${authorAvatar})`}}>(Submitted by {authorName})</CardSubtitle>*/}
            
              <form name={'answerForm'} onSubmit={(e) => this._onSubmit(e)}>
                <fieldset>
                <div>{!hasAnswered && <input type={'radio'} value={'optionOne'} onChange={(e) => this._handleAnswerChange(e)} checked={answer === 'optionOne'}/> }<span className={votes1.includes(authedUser) ? 'isBold' : ''}>{question.optionOne.text}</span> {hasAnswered && ` [Votes: ${votes1.length} (${Math.round(votes1.length/totalVotes * 100)}%)]`} </div>

                <div>or</div>

                <div>{!hasAnswered && <input type={'radio'} value={'optionTwo'} onChange={(e) => this._handleAnswerChange(e)} checked={answer === 'optionTwo'}/> }<span className={votes2.includes(authedUser) ? 'isBold' : ''}>{question.optionTwo.text}</span> {hasAnswered && ` [Votes: ${votes2.length} (${Math.round(votes2.length/totalVotes * 100)}%)]`}</div>
                </fieldset>
                { !hasAnswered && <Button title={answer === '' ? 'Please choose an option' : ''} disabled={answer === ''}>Vote!</Button> }
              </form>
              {(showWaitingMessage === true || isSaving) ? 'Saving answer...' : (!isSaving && showWaitingMessage === false) && 'Your vote saved!'}
            
          </CardBody>
        </Card>

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
    authorAvatar: question ? users[question.author].avatarURL : '',
    votes1: votes1,
    votes2: votes2,
    totalVotes: votes1.length + votes2.length,
    isSaving: loadingBar.default
  }
 }

 export default connect(mapStateToProps)(ViewQuestion);


