import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
//import { withRouter } from 'react-router-dom'

class LoginForm extends Component {

  doAuth = (userId) => {

    console.log("doAuth = userId: ", userId);
    this.props.dispatch(handleSetAuthedUser({userId: userId}))
  }

  render() {
    const { from } = this.props.location.state || { from: {pathname: '/'}}
    const { authedUser, users } = this.props
    if (authedUser !== null ) {
      return <Redirect to={from}/>
    }

    return (
      <div><h1>Log in form here</h1>

        {Object.keys(users).length > 0 ? (
          <div><p>Please select a user</p>
          <ul>
            {Object.keys(users).map((userId) => <li key={userId}><Button color="link" onClick={() => this.doAuth(userId)}>{users[userId].name}</Button></li>)}
          </ul>
          </div>

        ) : (<p>...Loading data, please wait</p>)}
      </div>
    );
  }
}
const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser: authedUser,
    users: users
   }
 }

export default connect(mapStateToProps)(LoginForm)

LoginForm.propTypes = {
  authedUser: PropTypes.string,
  users: PropTypes.object.isRequired
}