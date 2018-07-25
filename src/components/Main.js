import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './QuestionList'
import { connect } from 'react-redux'

function Main(props) {
  const { questions } = props;
    return (
      <div>
        {Object.keys(questions).length > 0 ? (
        <div>
          <h3>Questions you have not yet answered:</h3>
          <QuestionList type={'unanswered'}/>
          <h3>Questions you have answered:</h3>
          <QuestionList type={'answered'}/>
        </div>
        
       ) : <h3>Loading questions...</h3>}
       </div>
    );
}

const mapStateToProps = ({ questions }) => {
  return {
    questions: questions
   }
 }

export default connect(mapStateToProps)(Main);

Main.propTypes = {
  questions: PropTypes.object.isRequired,
}
