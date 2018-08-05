import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
function PollResults(props)  {
    const { question, authedUser, votes1, votes2, totalVotes } = props
    return (
      <div>
        <fieldset className={'poll_display'}>
        <div><span className={votes1.includes(authedUser) ? 'isBold' : ''}>{question.optionOne.text}</span> [{votes1.length}/{totalVotes} ({Math.round(votes1.length/totalVotes * 100)}%)] </div>

        <div className={'question_sep'}>or</div>

        <div><span className={votes2.includes(authedUser) ? 'isBold' : ''}>{question.optionTwo.text}</span> [{votes2.length}/{totalVotes} ({Math.round(votes2.length/totalVotes * 100)}%)]</div>
      </fieldset>
      </div>
    );
}

const mapStateToProps = ({ authedUser, questions }, { question_id }) => {

    const question = questions[question_id];
    const votes1 = question ? question.optionOne.votes : []
    const votes2 = question ? question.optionTwo.votes : []

    return {
      authedUser: authedUser,
      question_id: question_id || '',
      question: question,
      votes1: votes1,
      votes2: votes2,
      totalVotes: votes1.length + votes2.length,
    }
   }

export default connect(mapStateToProps)(PollResults);

PollResults.propTypes = {
  authedUser: PropTypes.string,
  question: PropTypes.object,
  votes1: PropTypes.array,
  votes2: PropTypes.array,
  totalVotes: PropTypes.number
}
