import React from 'react'
import { connect } from 'react-redux'

function QuestionList(props) {
        const { questions, authedUser } = props;
        const orderedQKeys = Object.keys(questions).sort(function(a,b){return questions[b].timestamp - questions[a].timestamp})
        return (
          <ul>
          {questions && orderedQKeys.map((answer) => {
            const optionOne = questions[answer]['optionOne']
            const qDate = new Date(questions[answer]['timestamp']).toLocaleDateString()
            const optionTwo = questions[answer]['optionTwo']
            const qOneStyle = optionOne.votes.includes(authedUser) ? 'qAnswered' : ''
            const qTwoStyle = optionTwo.votes.includes(authedUser) ? 'qAnswered' : ''

            return <li key={answer}><span className={qOneStyle}>{optionOne.text}</span> or <span className={qTwoStyle}>{optionTwo.text}</span>? (asked on {qDate})</li>}

          )}
          </ul>
        )
}

const mapStateToProps = ({authedUser, users}, {questions}) => {
  return {
    authedUser: users[authedUser].id,
    question: questions
  }
}

export default connect(mapStateToProps)(QuestionList)


