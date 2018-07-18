import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
//import { withRouter } from 'react-router-dom'

class LoginForm extends Component {
  componentDidMount() {
    console.log("login form mounted");
    
  }
  render() {
    const { dispatch } = this.props;
    return (
      <div><h1>Log in form here</h1>
      
        <button onClick={()=>dispatch(handleSetAuthedUser({userId: 'pnellesen'}))}>Login</button>
      
      </div>
    );
  }
}

//export default withRouter(connect()(LoginForm));
export default connect()(LoginForm)