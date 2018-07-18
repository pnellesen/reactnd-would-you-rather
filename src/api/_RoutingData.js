
import Main from '../components/Main'
import ViewQuestion from '../components/ViewQuestion'
import Leaderboard from '../components/Leaderboard'
import NewPoll from '../components/NewPoll'

// Will use the following to build out our routing, and to send to TopNav.js to use for the navigation items
export const routeData = [
  {navTo:'/', navText:'Main', component: Main, isNavItem: true},
  //{navTo:'/question/:question_id', navText:'Question', component: ViewQuestion, isNavItem: false},
  {navTo:'/question', navText:'Question', component: ViewQuestion, isNavItem: false},
  {navTo:'/leaderboard', navText:'Leaderboard', component: Leaderboard, isNavItem: true},
  {navTo:'/add', navText:'New Poll', component: NewPoll, isNavItem: true},
  //{navTo:'/login', navText:'Login', component: LoginForm, isNavItem: false},
  //{navTo:'/login', navText:'Logout', component: LoginForm, isNavItem: true, cb: ()=>handleDoLogout()}//bring up login form after user logs out?
];

export function linkData() {
    return routeData.map(item => ({navTo: item.navTo, navText:item.navText, isNavItem:item.isNavItem}))
}

//export default routeData;