import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button  } from 'reactstrap';


class ViewQuestion extends Component {
  state = {
    answer: ''
  };

  _onSubmit = (evt) => {
    evt.preventDefault();
    console.log("submit - answser? ", this.state, " - props: ", this.props);
  }

  _handleAnswerChange = (evt) => {
    this.setState({answer: evt.target.value})
  }
  render() {
    const { question_id, question, authedUser, votes1, votes2, authorName, hasAnswered } = this.props
    const {answer} = this.state
    return (
      (question) ?
      <div>
        <h1 style={{display: 'inline-block'}}>Would you rather..</h1>{authorName !== '' && <span> (Submitted by {authorName})</span>}
        <form name={'answerForm'} onSubmit={(e) => this._onSubmit(e)}>
          <fieldset>
          <div><span className={votes1.includes(authedUser) ? 'isBold' : ''}>{question.optionOne.text}</span> {hasAnswered ? `Votes for: ${votes1.length}` : <input type={'radio'} value={'optionOne'} onChange={(e) => this._handleAnswerChange(e)} checked={answer === 'optionOne'}/>} </div>

          <div>or</div>

          <div><span className={votes2.includes(authedUser) ? 'isBold' : ''}>{question.optionTwo.text}</span> {hasAnswered ? `Votes for: ${votes2.length}` : <input type={'radio'} value={'optionTwo'} onChange={(e) => this._handleAnswerChange(e)} checked={answer === 'optionTwo'}/>}</div>
          </fieldset>
          { !hasAnswered && <Button title={answer === '' ? 'Please choose an option' : ''} disabled={answer === ''}>Vote!</Button> }
        </form>
      </div>
    :
      <div>
        <h3>Question for id {question_id || '[blank]'} not found</h3>
        <p>Please go back or select an option from the menu</p>
      </div>

    )
  }
}

const mapStateToProps = ({ authedUser, questions, users }, { match }) => {
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
    votes1: votes1,
    votes2: votes2
  }
 }

 export default connect(mapStateToProps)(ViewQuestion);


