import React, { Component } from 'react';
import { connect } from 'react-redux'

class ViewQuestion extends Component {
  render() {
    const { question_id, questions } = this.props
    return ((question_id !== null && questions[question_id]) ?
      <div>
        <h1>Would you rather..</h1>
        <div>{questions[question_id].optionOne.text}</div>
        <div>or</div>
        <div>{questions[question_id].optionTwo.text}</div>
      </div>
    :
      <h3>Question for id {question_id} not found</h3>
    )
  }
}

const mapStateToProps = ({ authedUser, questions}, { match }) => {
  return {
    authedUser: authedUser,
    question_id: match.params.question_id || null,
    questions: questions
  }
 }

 export default connect(mapStateToProps)(ViewQuestion);


