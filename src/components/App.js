import React, { Component , Fragment} from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import TopNav from './TopNav'
import Main from './Main'
import ViewQuestion from './ViewQuestion'
import Leaderboard from './Leaderboard'
import NewPoll from './NewPoll'
import LoginForm from './LoginForm'

// Will use the following to build out our routing, and to send to TopNav.js to use for the navigation items
const routeData = [
  {navTo:'/', navText:'Main', component: Main, isNavItem: true},
  {navTo:'/question/:question_id', navText:'Question', component: ViewQuestion, isNavItem: false},
  {navTo:'/leaderboard', navText:'Leaderboard', component: Leaderboard, isNavItem: true},
  {navTo:'/add', navText:'New Poll', component: NewPoll, isNavItem: true},
  {navTo:'/login', navText:'Login', component: LoginForm, isNavItem: true},
  {navTo:'/logout', navText:'Logout', component: LoginForm, isNavItem: true}//bring up login form after user logs out?
];

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Fragment>
            {/*<LoadingBar/>*/}
            <div>
              <TopNav navItems={routeData.map(item => ({navTo: item.navTo, navText:item.navText, isNavItem:item.isNavItem}))}/>
              {routeData.map((item, i) => {
                  const { navTo, navText, component} = item

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

export default App;
