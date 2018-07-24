
import Main from '../components/Main'
import ViewQuestion from '../components/ViewQuestion'
import Leaderboard from '../components/Leaderboard'
import NewPoll from '../components/NewPoll'


// Will use the following to build out our routing, and to send to TopNav.js to use for the navigation items
export const routeData = [
  {navTo:'/', navText:'Main', component: Main, isNavItem: true, exact: true},
  {navTo:'/question/:question_id', navText:'Question', component: ViewQuestion, isNavItem: false, exact: false},
  {navTo:'/question', navText:'Question', component: ViewQuestion, isNavItem: false, exact: true},
  {navTo:'/leaderboard', navText:'Leaderboard', component: Leaderboard, isNavItem: true, exact: false},
  {navTo:'/add', navText:'New Poll', component: NewPoll, isNavItem: true, exact: false}
];

export function linkData() {
    return routeData.map(item => ({navTo: item.navTo, navText:item.navText, isNavItem:item.isNavItem}))
}