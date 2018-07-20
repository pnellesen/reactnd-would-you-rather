import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { handleFetchQuestions } from '../actions/questions';

class Main extends Component {
  componentDidMount() {
    Object.keys(this.props.questions).length === 0 && this.props.dispatch(handleFetchQuestions())
  }

  render() {
    const { qAnswered, qUnanswered, authedUser } = this.props;
    return (
      <div className={'container'}>
        <h3>Questions you have not yet answered:</h3>
        <ul>
        {qUnanswered && Object.keys(qUnanswered).map((answer) => <li key={answer}>{qUnanswered[answer]['optionOne'].text} or {qUnanswered[answer]['optionTwo'].text}?</li>)}
        </ul>
        <h3>Questions you have answered:</h3>
        <ul>
        {qAnswered && Object.keys(qAnswered).map((answer) => {
            const optionOne = qAnswered[answer]['optionOne']
            const optionTwo = qAnswered[answer]['optionTwo']
            const qOneStyle = optionOne.votes.includes(authedUser) ? 'qAnswered' : ''
            const qTwoStyle = optionTwo.votes.includes(authedUser) ? 'qAnswered' : ''
            return <li key={answer}><span className={qOneStyle}>{optionOne.text}</span> or <span className={qTwoStyle}>{optionTwo.text}</span>?</li>}
          )}
        </ul>

      </div>

    );
  }
}

const mapStateToProps = ({ questions, users, authedUser }) => {
  const authedUserInfo = users[authedUser]
  const authedUserAnswered = Object.keys(authedUserInfo.answers)

  // The following suggestion to filter an object by keys from https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
  const qAnswered = Object.keys(questions)
  .filter(key => authedUserAnswered.includes(key))
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: questions[key]
    };
  }, {});

  const qUnanswered = Object.keys(questions)
  .filter(key => !authedUserAnswered.includes(key))
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: questions[key]
    };
  }, {});

  return {
    authedUser: authedUser,
    questions: questions,
    qAnswered: qAnswered,
    qUnanswered: qUnanswered
   }
 }

export default connect(mapStateToProps)(Main);

Main.propTypes = {
  authedUser: PropTypes.string,
  qAnswered: PropTypes.object,
  qUnanswered: PropTypes.object
}
