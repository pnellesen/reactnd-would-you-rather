import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {handleStoreUserInfo} from '../actions/users'
import { Table } from 'reactstrap';

class Leaderboard extends Component {
  state = {
    users: this.props.users,
    sortOrder: this.props.sortOrder,
    sortCol: this.props.sortCol
  }

  leaderHeaders = [
    {colName: 'name', text: 'Name'},
    {colName: 'asked', text: 'Asked'},
    {colName: 'answered', text: 'Answered'},
    {colName: 'total', text: 'Total'}
  ]

  /**
  * @description _doSort(colName, invert) sort the Leaderboard when user clicks on a column.
  *
  * @param {string} colName which column to sort by
  * @param {bool} invert should we switch the sort order?
  */
  _doSort = (colName, invert) => {

    const sortOrder = invert ? !this.state.sortOrder : this.state.sortOrder;
    const userVals = Object.values(this.state.users);

    switch(colName) {
      case 'name':
       // sorting by text suggestion at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        this.setState( { users: userVals.sort( function(a,b){

          let name1 = sortOrder? b.name.toUpperCase() : a.name.toUpperCase();
          let name2 = sortOrder? a.name.toUpperCase() : b.name.toUpperCase();

          if ( name1 < name2 ) { return -1; }
          if ( name1 > name2 ) { return 1; }

          // if we get here, the name values must be equal
          return 0;
        })})
        break;

      default:// We assume here that all other sorting will be numeric
        this.setState({ users: userVals.sort(function(a,b){
          return sortOrder ? b[colName] - a[colName] : a[colName]- b[colName]
        })})
    }
    this.setState({
      sortOrder: sortOrder,
      sortCol: colName
    })
  }
  // End _doSort()

  componentWillUnmount() {
    //save sorting data for the user to the store here in case user navigates away and comes back
    const userInfo = {
      sortOrder:this.state.sortOrder,
      sortCol: this.state.sortCol
    }

    this.props.dispatch(handleStoreUserInfo({ authedUser: this.props.authedUser.id, userInfo: userInfo }))
  }

  componentWillMount() {
    // set up the initial sorting here from the stored info before we render the table.
    this._doSort(this.state.sortCol)
  }

  render () {
      const { authedUser } = this.props
      const { users, sortOrder, sortCol } = this.state
      return (
        <div>
          <h1>Leaderboard</h1>
          <Table responsive className={'leaderboard'}>
            <thead>
              <tr>
                {this.leaderHeaders.map((header) =>
                  <th key={header.colName} onClick={() => this._doSort(header.colName, true)} title={'Click to sort'}>{header.text}<span className={`sorter ${sortCol === header.colName ? `show` : `hide`}`}> {sortOrder ? `\u2193` : `\u2191`}</span></th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return ( <tr key={user.id} className={user.id === authedUser.id ? 'authedUserRow' : ''}>
                  <td className={user.id === authedUser.id ? 'isBold' : ''}><span className={`auth_avatar`} style={{backgroundImage: `url(/${user.avatarURL})`}}>{user.name}</span></td>
                  <td>{user.asked}</td>
                  <td>{user.answered}</td>
                  <td>{user.total}</td>
                </tr> )
              })}
            </tbody>
          </Table>
        </div>
      );
    }

}

const mapStateToProps = ({users, authedUser}) => {
  const usersArray = Object.values(users);//This converts the users object to an array, which we can then sort by whichever key we wish
  const userInfo = users[authedUser].userInfo || {}
  return {
    users: usersArray,
    authedUser: users[authedUser],
    sortOrder: userInfo.hasOwnProperty('sortOrder') ? userInfo.sortOrder : true,
    sortCol: userInfo.hasOwnProperty('sortCol') ? userInfo.sortCol : 'total'
  }
}

export default connect(mapStateToProps)(Leaderboard)

Leaderboard.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
    id: PropTypes.string,
    name:PropTypes.string,
    asked: PropTypes.number,
    answered: PropTypes.number,
    total: PropTypes.number
  })).isRequired,
  authedUser: PropTypes.object.isRequired,
  sortOrder: PropTypes.bool.isRequired,
  sortCol: PropTypes.string.isRequired
}
