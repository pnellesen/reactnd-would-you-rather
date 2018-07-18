import React, { Component , Fragment} from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import TopNav from './TopNav'
import { routeData, linkData } from '../api/_RoutingData'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Fragment>
            {/*<LoadingBar/>*/}
            <div>
              <TopNav navItems={linkData()}/>
              {routeData.map((item, i) => {
                  const { navTo, component} = item

                  return (
                    <Route key={i} exact={navTo === '/' ? true: false} path={navTo} component={component}/>
                  )
              })}
            </div>
          </Fragment>
        </BrowserRouter>



    );
  }
}

export default connect()(App);

App.propTypes = {
  authedUser: PropTypes.string.isRequired
}
