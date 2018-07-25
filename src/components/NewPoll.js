import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'
import { Form, Button, Input  } from 'reactstrap';
import {handleStoreNewPoll} from '../actions/users'
import {handleSaveNewPoll} from '../actions/shared'

class NewPoll extends Component {
  state = {
    answerOne: this.props.answerOne,
    answerTwo: this.props.answerTwo,
    showWaitingMessage: null
  };

  keyTimer = null;

  _onChange = (evt) => {
    const {id, value} = evt.target
    this.setState({
      ...this.state,
      [id]: value
    })
  }

  /**
   * Save input fields to store - this will NOT create a new poll, 
   * this simply stores the current state of the form so the user can navigate away and come back.
   */
  _onKeyUp = (evt) => {
    clearTimeout(this.keyTimer);
    evt.persist();
    this.keyTimer = setTimeout(() => {
      const { answerOne, answerTwo } = this.state
      const newPollInfo = {answerOne: answerOne, answerTwo: answerTwo}
      this.props.dispatch(handleStoreNewPoll({authedUser: this.props.authedUser, newPollInfo: newPollInfo}));
    }, 500)
  }

  _onSubmit = (evt) => {
    evt.preventDefault();
    const { answerOne, answerTwo } = this.state
    const author = this.props.authedUser
    this.setState({showWaitingMessage: true})
    this.props.dispatch(handleSaveNewPoll({optionOneText:answerOne, optionTwoText: answerTwo, author: author})).then(() => {
      this.setState({
        showWaitingMessage: false
      })
    })
  } 

  render() {
    const {answerOne, answerTwo, showWaitingMessage} = this.state;
    return (
      <div>
        <h1>Submit a new poll</h1>
        <p>Would you rather...</p>
        <Form onSubmit={(e) => this._onSubmit(e)}>
          <ol className={'poll'}>
            <li><Input type="text" id={'answerOne'} value={answerOne} onChange={(e) => this._onChange(e)} onKeyUp={(e) => this._onKeyUp(e)} placeholder={'Enter Question 1 text'}/></li>
            <div style={{marginTop: '10px'}}>Or...</div>
            <li><Input type="text" id={'answerTwo'} value={answerTwo} onChange={(e) => this._onChange(e)} onKeyUp={(e) => this._onKeyUp(e)} placeholder={'Enter Question 2 text'}/></li>
          </ol>
          <Button disabled={answerOne === '' || answerTwo === ''}>Submit Poll</Button>
        </Form>
        {showWaitingMessage === true ? <div>Submitting...</div> : showWaitingMessage === false && <Redirect to={'/'}/>}
      </div>
    );
  }
}

const mapStateToProps = (({authedUser, users}) => {
  const {newPollInfo} = users[authedUser]
  
  return {
    authedUser: authedUser,
    answerOne: newPollInfo ? newPollInfo.answerOne : '',
    answerTwo: newPollInfo ? newPollInfo.answerTwo : ''
  }
})

export default connect(mapStateToProps)(NewPoll);
