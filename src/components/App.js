import React, { Component , Fragment} from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import TopNav from './TopNav'
import { routeData, linkData } from '../api/_RoutingData'
import {handleInitialData} from '../actions/shared'
import LoginForm from './LoginForm';
import ErrorPage from './ErrorPage'
import '../App.css'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {

    // This from Tyler's blog: https://tylermcginnis.com/react-router-protected-routes-authentication/
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.authedUser !== null
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
          }} />
      )} />
    )

    return (
        <BrowserRouter>
          <Fragment>
            <TopNav navItems={linkData()}/>
            <LoadingBar/>
            <div className={'app_container'}>
              <Switch>
                <Route path={'/login'} component={LoginForm}/>
                {routeData.map((item, i) => {
                  const { navTo, component, exact} = item
                    return (
                      <PrivateRoute key={i} exact={exact} path={navTo} component={component}/>
                    )
                })}
                <Route path="*" component={ErrorPage}/>
              </Switch>
            </div>
          </Fragment>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {

 return { authedUser: authedUser }
}

export default connect(mapStateToProps)(App);

App.propTypes = {
  authedUser: PropTypes.string,
  location: PropTypes.object
}
