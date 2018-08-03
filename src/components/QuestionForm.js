import React, { Component } from 'react';
import { connect } from 'react-redux'
import {handleAnswerQuestion} from '../actions/shared'
import { Button } from 'reactstrap';

class QuestionForm extends Component {
    state = {
      answer: '',
      showWaitingMessage: null
    };
  
    _onSubmit = (evt) => {
      evt.preventDefault();
      this.setState({showWaitingMessage: true})
      this.props.dispatch(handleAnswerQuestion({authedUser: this.props.authedUser, qid: this.props.question_id, answer: this.state.answer})).then(() => {this.setState({showWaitingMessage: false})})
    }
  
    _handleAnswerChange = (evt) => {
      this.setState({answer: evt.target.value})
    }

    render() {
      const { question, isSaving } = this.props
      const {answer, showWaitingMessage} = this.state
      return (
        <form name={'answerForm'} onSubmit={(e) => this._onSubmit(e)}>
            <fieldset>
                <div><input type={'radio'} value={'optionOne'} onChange={(e) => this._handleAnswerChange(e)} checked={answer === 'optionOne'}/> <span>{question.optionOne.text}</span> </div>

                <div>or</div>

                <div><input type={'radio'} value={'optionTwo'} onChange={(e) => this._handleAnswerChange(e)} checked={answer === 'optionTwo'}/> <span>{question.optionTwo.text}</span></div>
            </fieldset>
            <Button className={'marTop10'} title={answer === '' ? 'Please choose an option' : ''} disabled={answer === ''}>Vote!</Button>
            {(showWaitingMessage === true || isSaving) ? <div className={'marTop10'}>Saving answer...</div> : ''}
         </form>
      )
    }
   
}

const mapStateToProps = ({ authedUser, questions, loadingBar }, { question_id }) => {

    const question = question_id ? (questions ? questions[question_id] : {}) : {}
    
    return {
      authedUser: authedUser,
      question_id: question_id || '',
      question: question,
      isSaving: loadingBar.default
    }
   }
  
   export default connect(mapStateToProps)(QuestionForm);
      