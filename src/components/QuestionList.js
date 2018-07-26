import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

function QuestionList(props) {
  const { questions, authedUser } = props;
  return (
    <ul>
    {questions && questions.map((answer) => {
      const optionOne = answer['optionOne']
      const qDate = new Date(answer['timestamp']).toLocaleDateString()
      const optionTwo = answer['optionTwo']
      const qOneStyle = optionOne.votes.includes(authedUser) ? 'qAnswered' : ''
      const qTwoStyle = optionTwo.votes.includes(authedUser) ? 'qAnswered' : ''
      return <li key={ answer.id }><Link to={`/question/${ answer.id }`}><span className={ qOneStyle }>{ optionOne.text }</span> or <span className={ qTwoStyle }>{ optionTwo.text }</span>?</Link> (asked on { qDate })</li>}
    )}
    </ul>
  )
}

const mapStateToProps = ({ authedUser, questions }, { type }) => {
  
  // convert our questions object to an array, so we can use .map() when rendering. Add filtering for anwered and unanswered questions
  let filteredQs = {}
  switch(type) {
    case 'answered':
        filteredQs = Object.keys(questions)
          .filter((question) => questions[question].optionOne.votes.includes(authedUser) || questions[question].optionTwo.votes.includes(authedUser))
          .map(question => questions[question])
        break;
    case 'unanswered':
      filteredQs = Object.keys(questions)
        .filter((question) => !questions[question].optionOne.votes.includes(authedUser) && !questions[question].optionTwo.votes.includes(authedUser))
        .map(question => questions[question])
      break;
    case 'mine':
      filteredQs = Object.keys(questions)
        .filter((question) => questions[question].author === authedUser)
        .map(question => questions[question])
      break;
    default:
      filteredQs = Object.keys(questions).map(question => questions[question]);
      break;
    }
  
  // Now order our filtered questions by timestamp, descending  
  const orderedQs = filteredQs.sort(function(a,b){return b.timestamp - a.timestamp})
  
  return {
    authedUser: authedUser,
    questions: orderedQs
  }
}

export default connect(mapStateToProps)(QuestionList)