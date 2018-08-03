import React from 'react';
import { connect } from 'react-redux'
import { Card, CardHeader, CardBody } from 'reactstrap';
import PollResults from './PollResults'
import QuestionForm from './QuestionForm';


  function ViewQuestion(props) {
    const { question_id, question, authorAvatar, authorName, hasAnswered } = props
    return (
      (question) ?
      <div>
        <Card>
          <CardHeader><h3>Would you rather...</h3>{authorName !== '' && <span className={'auth_avatar'} style={{backgroundImage: `url(/${authorAvatar})`}}>(Submitted by {authorName})</span>}</CardHeader>
          <CardBody>
            {hasAnswered ? (
                <PollResults question_id={question_id}/>
              ) : (
                <QuestionForm question_id={question_id}/>
              )
            }
          </CardBody>
        </Card>
      </div>
    :
      <div>
        <h3>Question for id {question_id || '[blank]'} not found</h3>
        <p>Please go back or select an option from the menu</p>
      </div>
    )
}

const mapStateToProps = ({ authedUser, questions, users }, { match }) => {
  const question_id = match.params.question_id || '';
  const question = questions[question_id];
  const authorName = question ? users[question.author].name : ''
  const hasAnswered = question && (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
  return {
    question_id: question_id,
    question: question,
    hasAnswered: hasAnswered,
    authorName: authorName,
    authorAvatar: question ? users[question.author].avatarURL : ''
  }
 }

 export default connect(mapStateToProps)(ViewQuestion);


