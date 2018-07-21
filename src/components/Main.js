import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionList from './QuestionList'
import { connect } from 'react-redux'
import { handleFetchQuestions } from '../actions/questions';

class Main extends Component {
  componentDidMount() {
    Object.keys(this.props.questions).length === 0 && this.props.dispatch(handleFetchQuestions())
  }

  render() {
    const { qAnswered, qUnanswered, questions } = this.props;
    return (
      <div>
        {Object.keys(questions).length > 0 ? (
        <div><h3>Questions you have not yet answered:</h3>
        <QuestionList questions={qUnanswered}/>
        <h3>Questions you have answered:</h3>
        <QuestionList questions={qAnswered}/></div>
       ) : <h3>Loading questions...</h3>}
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
    questions: questions,
    qAnswered: qAnswered,
    qUnanswered: qUnanswered
   }
 }

export default connect(mapStateToProps)(Main);

Main.propTypes = {
  questions: PropTypes.object.isRequired,
  qAnswered: PropTypes.object,
  qUnanswered: PropTypes.object
}
