import React, { Component } from 'react';
import { connect } from 'react-redux'

class ViewQuestion extends Component {
  render() {
    const { question_id, question } = this.props
    return ((question_id !== null && question) ?
      <div>
        <h1>Would you rather..</h1>
        <div>{question.optionOne.text} Votes for: {question.optionOne.votes.length}</div>
        <div>or</div>
        <div>{question.optionTwo.text} Votes for: {question.optionTwo.votes.length}</div>
      </div>
    :
      <h3>Question for id {question_id} not found</h3>
    )
  }
}

const mapStateToProps = ({ authedUser, questions }, { match }) => {
  const question_id = match.params.question_id || null

  const question = questions[question_id];

  console.log("ViewQuestion - question: ", question)

  return {
    authedUser: authedUser,
    question_id: question_id,
    question: question
  }
 }

 export default connect(mapStateToProps)(ViewQuestion);


