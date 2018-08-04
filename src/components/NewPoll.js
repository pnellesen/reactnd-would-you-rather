import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button, Input  } from 'reactstrap';
import {handleStoreUserInfo} from '../actions/users'
import {handleSaveNewPoll} from '../actions/shared'

class NewPoll extends Component {
  state = {
    answerOne: this.props.answerOne,
    answerTwo: this.props.answerTwo,
    showWaitingMessage: null
  };

  /**
  * @description _onChange() set the authedUser in the store
  *
  * @param {SyntheticEvent} evt update the state when the user types in the question form
  */
  _onChange = (evt) => {
    const {id, value} = evt.target
    this.setState({
      ...this.state,
      [id]: value
    })
  }

/**
  * @description _onSubmit() set the authedUser in the store
  *
  * @param {SyntheticEvent} evt add new poll to the store when form submit button is clicked
  */
  _onSubmit = (evt) => {
    evt.preventDefault();
    const { answerOne, answerTwo } = this.state
    const author = this.props.authedUser
    this.setState({showWaitingMessage: true})
    this.props.dispatch(handleSaveNewPoll({ optionOneText:answerOne, optionTwoText: answerTwo, author: author })).then(() => {
      this.setState({
        showWaitingMessage: false,
        answerOne: '',
        answerTwo: ''

      })
    })
  }

  /**
   * Save input fields to store - this will NOT create a new poll,
   * this simply stores the current state of the form so the user can navigate away and come back.
   * Should only need to do this when the component is unmounting.

   */
  componentWillUnmount() {
    const { answerOne, answerTwo, showWaitingMessage } = this.state
    if (showWaitingMessage === null) {// We only want to do this if they haven't actually submitted the form.
      const userInfo = { answerOne: answerOne, answerTwo: answerTwo }
      this.props.dispatch(handleStoreUserInfo({ authedUser: this.props.authedUser, userInfo: userInfo }))
    }
  }

  render() {
    const { answerOne, answerTwo, showWaitingMessage } = this.state;
    return (
      <div>
        <h1>Submit a new poll</h1>
        <p>Would you rather...</p>
        <Form onSubmit={(e) => this._onSubmit(e)}>
          <ol className={'poll'}>
            <li><Input type="text" id={'answerOne'} value={ answerOne } onChange={ (e) => this._onChange(e) } placeholder={'Enter Question 1 text'}/></li>
            <div style={{marginTop: '10px'}}>Or...</div>
            <li><Input type="text" id={'answerTwo'} value={ answerTwo } onChange={ (e) => this._onChange(e) } placeholder={'Enter Question 2 text'}/></li>
          </ol>
          <Button disabled={ answerOne === '' || answerTwo === '' }>Submit Poll</Button>
        </Form>
        { showWaitingMessage === true ? <div className={'marTop10'}>Submitting...</div> : showWaitingMessage === false && <Redirect push to={'/'}/> }
      </div>
    );
  }
}

const mapStateToProps = (({ authedUser, users }) => {
  const userInfo = users[authedUser].userInfo || {}
  return {
    authedUser: authedUser,
    answerOne: userInfo.answerOne ? userInfo.answerOne : '',
    answerTwo: userInfo.answerTwo ? userInfo.answerTwo : ''
  }
})

export default connect(mapStateToProps)(NewPoll);

NewPoll.propTypes = {
  authedUser: PropTypes.string,
  answerOne: PropTypes.string,
  answerTwo: PropTypes.string
}