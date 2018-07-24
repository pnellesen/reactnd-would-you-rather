import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Button, Input  } from 'reactstrap';

// Idea to use the <Prompt> component from https://github.com/ReactTraining/react-router/issues/5409
import { Prompt } from "react-router-dom";

class NewPoll extends Component {
  state = {
    answerOne: '',
    answerTwo: '',
    showWaitingMessage: null
  };

  _onChange = (evt) => {
    const {id, value} = evt.target
    this.setState({
      ...this.state,
      [id]: value
    })
    /**
     * would somehting here to save anything typed in answerOne/answerTwo boxes to store onChange
     * be worthwhile? Or do like we did in book search and do it after user stops typing for X seconds?
     * this.props.dispatch(storePollInfo(this.state))
     */
  }


  render() {
    console.log("New Poll - props? ", this.props)
    const {answerOne, answerTwo} = this.state;
    return (

      <div>
        <h1>Submit a new poll</h1>
        <p>Would you rather...</p>
        <Form onSubmit={(e) => this._onSubmit(e)}>
          <ol className={'poll'}>
            <li><Input type="text" id={'answerOne'} value={answerOne} onChange={(e) => this._onChange(e)} placeholder={'Enter Question 1 text'}/></li>
            <div style={{marginTop: '10px'}}>Or...</div>
            <li><Input type="text" id={'answerTwo'} value={answerTwo} onChange={(e) => this._onChange(e)} placeholder={'Enter Question 2 text'}/></li>
          </ol>
          <Button disabled={answerOne === '' || answerTwo === ''}>Submit Poll</Button>
          <Prompt when={answerOne !== '' ||  answerTwo !== ''} message={'Poll info not saved - are you sure you want to leave?'}/>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (({authedUser}) => {
  return {authedUser: authedUser}
})

export default connect(mapStateToProps)(NewPoll);
