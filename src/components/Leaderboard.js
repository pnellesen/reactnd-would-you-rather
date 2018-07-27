import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table } from 'reactstrap';

class Leaderboard extends Component {
  state = {
    users: this.props.users,
    sortOrder: {name: true, asked: true, answered: true, total: true},
    isSorted: {name: false, asked: false, answered: false, total: true}
  }
  
  leaderHeaders = [
    {type: 'name', text: 'Name'},
    {type: 'asked', text: 'Asked'},
    {type: 'answered', text: 'Answered'},
    {type: 'total', text: 'Total'}
  ]

  doSort = (type) => {

    const sortOrder = !this.state.sortOrder[type];
    const userVals = Object.values(this.state.users);
    const isSortedVals = Object.keys(this.state.isSorted);
    let unsortedArray = {}
    isSortedVals.filter((thisType) => thisType !== type).map((thisType) => unsortedArray[thisType] = false);
    
    switch(type) {
      case 'name':// sorting by text suggestion at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
       this.setState({users: userVals.sort(function(a,b){
          
          let name1 = a.name.toUpperCase();
          let name2 = b.name.toUpperCase();
          
          if (sortOrder) {
            name1 = b.name.toUpperCase();
            name2 = a.name.toUpperCase();
          }
          
          if ( name1 < name2) {
            return -1;
          }
          if (name1 > name2) {
            return 1;
          }
        
          // names must be equal
          return 0;
        })})
      
        break;
      default:// We assume here that all other sorting will be numeric
        this.setState({users: userVals.sort(function(a,b){
          return (
            sortOrder ? b[type] - a[type] : a[type]- b[type]
          )
   
        })})
    }
    this.setState({
      sortOrder: {...this.state.sortOrder, [type]: sortOrder},
      isSorted: {...unsortedArray, [type]:true}
    })
  }

  render () {
      const { authedUser } = this.props
      const { users, sortOrder, isSorted } = this.state
      return (
        <div>
          <h1>Leaderboard</h1>
          <Table responsive className={'leaderboard'}>
            <thead>
              <tr>
                {this.leaderHeaders.map((header) =>
                  <th key={header.type} onClick={() => this.doSort(header.type)} title={'Click to sort'}>{header.text} {isSorted[header.type] && (sortOrder[header.type] ? `\u2193` : `\u2191`)}</th>  
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return ( <tr key={user.id} className={user.id === authedUser.id ? 'authedUserRow' : ''}>
                  <td className={user.id === authedUser.id ? 'isBold' : ''}>{user.name}</td>
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
  return {
    users: usersArray.sort(function(a,b){return b.total - a.total}),
    authedUser: {...users[authedUser]}
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
  authedUser: PropTypes.object.isRequired
}
