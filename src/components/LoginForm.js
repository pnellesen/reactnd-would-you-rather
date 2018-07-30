import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'

class LoginForm extends Component {

  doAuth = (userId) => {
    this.props.dispatch(handleSetAuthedUser({userId: userId}))
  }

  render() {
    const { from } = this.props.location.state || { from: {pathname: '/'}}
    const { authedUser, users } = this.props
    if (authedUser !== null ) {
      return <Redirect to={from}/>
    }

    return (
      <div><h1>Log In</h1>

        {Object.keys(users).length > 0 ? (
          <div>
          <Card>
            <CardBody>
              <CardTitle>Please select a user to log in as</CardTitle>
              <CardText>
                <ul style={{listStyleType: 'none'}}>
                  {Object.keys(users).map((userId) => <li key={userId}><Button color="link" onClick={() => this.doAuth(userId)}><span className={`auth_avatar`} style={{backgroundImage: `url(/${users[userId].avatarURL})`}}>{users[userId].name}</span></Button></li>)}
              </ul>
              </CardText>
            </CardBody>
          </Card>
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