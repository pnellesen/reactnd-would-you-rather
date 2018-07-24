import React, { Component } from 'react';
import { connect } from 'react-redux'

class ViewQuestion extends Component {
  render() {
    const { question_id, question, authedUser, gotQuestion, votes1, votes2, authorName, hasAnswered } = this.props
    return (
      (gotQuestion) ? 
      <div>
        <h1 style={{display: 'inline-block'}}>Would you rather..</h1>{authorName !== '' && <span> (Submitted by {authorName})</span>}
        <div><span className={votes1.includes(authedUser) ? 'isBold' : ''}>{question.optionOne.text}</span> {hasAnswered && `Votes for: ${votes1.length}`} </div>
        <div>or</div>
        <div><span className={votes2.includes(authedUser) ? 'isBold' : ''}>{question.optionTwo.text}</span> {hasAnswered && `Votes for: ${votes2.length}`}</div>
      </div>
    :
      <h3>Question for id {question_id} not found</h3>
    )
  }
}

const mapStateToProps = ({ authedUser, questions, users }, { match }) => {
  const question_id = match.params.question_id;
  const question = questions[question_id];
  const gotQuestion = question_id && question;
  const votes1 = gotQuestion ? question.optionOne.votes : []
  const votes2 = gotQuestion ? question.optionTwo.votes : []
  const authorName = gotQuestion ? users[question.author].name : ''
  const hasAnswered = gotQuestion && (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
  console.log("ViewQuestion - question_id: ", question_id, " - question: ", question)

  return {
    authedUser: authedUser,
    question_id: question_id,
    question: question,
    hasAnswered: hasAnswered,
    authorName: authorName,
    gotQuestion: gotQuestion,
    votes1: votes1,
    votes2: votes2
  }
 }

 export default connect(mapStateToProps)(ViewQuestion);


