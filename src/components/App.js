import React, { Component } from 'react';


// Will use the following to build out our routing, and to send to TopNav.js to use for the navigation items
const navItems = [
  {navTo:'/', navText:'Main', component: 'Main'},
  {navTo:'/question/:question_id', navText:'Question', component: 'ViewQuestion'},
  {navTo:'/leaderboard', navText:'Leaderboard', component: 'Leaderboard'},
  {navTo:'/add', navText:'New Poll', component: 'NewPoll'},
  {navTo:'/login', navText:'Login', component: 'LoginForm'},
  {navTo:'/logout', navText:'Logout', component: 'LoginForm'}//bring up login form after user logs out?
];

class App extends Component {
  render() {
    return (
      <div><h1>Would you rather app starts here</h1></div>
    );
  }
}

export default App;
