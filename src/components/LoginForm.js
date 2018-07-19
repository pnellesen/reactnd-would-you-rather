import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
//import { withRouter } from 'react-router-dom'

class LoginForm extends Component {

  doAuth = () => {
    this.props.dispatch(handleSetAuthedUser({userId: 'pnellesen'}))
  }

  render() {
    const { from } = this.props.location.state || { from: {pathname: '/'}}
    const { authedUser } = this.props
    if (authedUser !== null ) {
      return <Redirect to={from}/>
    }

    return (
      <div><h1>Log in form here</h1>
        <button onClick={()=> this.doAuth()}>Login</button>
      </div>
    );
  }
}
const mapStateToProps = ({ authedUser }) => {
  return { authedUser: authedUser }
 }

export default connect(mapStateToProps)(LoginForm)

LoginForm.propTypes = {
	authedUser: PropTypes.string,
}