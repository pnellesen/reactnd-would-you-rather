import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, CardHeader, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'

class LoginForm extends Component {

  /**
  * @description _doAuth() set the authedUser in the store
  *
  * @param {string} userId
  */
  _doAuth = (userId) => {
    this.props.dispatch(handleSetAuthedUser({userId: userId}))
  }

  render() {
    const { from } = this.props.location.state || { from: {pathname: '/'}}
    const { authedUser, users } = this.props
    if (authedUser !== null ) {
      return <Redirect to={from}/>
    }

    return (
          <Card>
            <CardHeader><h3>Log In</h3></CardHeader>
            {Object.keys(users).length > 0 ? (
            <CardBody>
              <CardTitle>Please select a user to log in as</CardTitle>
                <ListGroup>
                  {Object.keys(users).map((userId) => <ListGroupItem key={userId}><Button color="link" onClick={() => this._doAuth(userId)}><span className={`auth_avatar`} style={{backgroundImage: `url(/${users[userId].avatarURL})`}}>{users[userId].name}</span></Button></ListGroupItem>)}
              </ListGroup>
            </CardBody>
        ) : (
          <CardBody>...Loading data, please wait</CardBody>
        )}
        </Card>
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