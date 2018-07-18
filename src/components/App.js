import React, { Component , Fragment} from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TopNav from './TopNav'
import { routeData, linkData } from '../api/_RoutingData'
import { handleFetchAuthedUser } from '../actions/authedUser'
import LoginForm from './LoginForm';




class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleFetchAuthedUser())
    console.log("componentDidMount. props?: ", this.props)
  }




  render() {
  
    // From Tyler's blog: https://tylermcginnis.com/react-router-protected-routes-authentication/
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.authedUser !== null
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )

    return (
        <BrowserRouter>
          <Fragment>
            {/*<LoadingBar/>*/}
            <div>
              {this.props.authedUser !== null && <TopNav navItems={linkData()}/>}
              <Route path={'/login'} component={LoginForm}/>
              {routeData.map((item, i) => {
                 const { navTo, component} = item
                  return (
                    <PrivateRoute key={i} exact={navTo === '/' ? true: false} path={navTo} component={component}/>
                  )
              })}
            </div>
            
          </Fragment>
        </BrowserRouter>



    );
  }
}

const mapStateToProps = ({ authedUser }) => {
 console.log("mapStatetoProps: authedUser - ", authedUser);
 return { authedUser: 'pnellesen' }
}


export default connect(mapStateToProps)(App);

App.propTypes = {
  authedUser: PropTypes.string
}
