import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table } from 'reactstrap';

class Leaderboard extends Component {
  state = {
    users: this.props.users,
    sortOrder: {name: true, asked: true, answered: true, total: true}
  }

  doSort = (type) => {
    console.log("doSort - sortOrder[" + type + "]: ", this.state.sortOrder[type] )
    const sortOrder = !this.state.sortOrder[type];
    switch(type) {
      case 'name':
      sortOrder ? this.setState({users: Object.values(this.state.users).sort()}) : this.setState({users: Object.values(this.state.users).reverse()})
      /*  
       this.setState({users: Object.values(this.state.users).sort(function(a,b){
         return (sortOrder ? b.name - a.name : a.name - b.name)
        })})
        */
       break;
      case 'asked':
        this.setState({users: Object.values(this.state.users).sort(function(a,b){
          return (
            sortOrder ? b.asked - a.asked : a.asked - b.asked
          )
   
        })})
        break;
      case 'answered':
        this.setState({users: Object.values(this.state.users).sort(function(a,b){
          return (sortOrder ? b.answered - a.answered : a.answered - b.answered)
        })})
        break;
      default:
        this.setState({users: Object.values(this.state.users).sort(function(a,b){
          return (sortOrder ? b.total - a.total : a.total - b.total)
        })})
    }
    this.setState({sortOrder: {...this.state.sortOrder, [type]: sortOrder}})
  }
  render () {
      const { authedUser } = this.props
      const { users } = this.state
      return (
        <div>
          <h1>Leaderboard</h1>
          <Table responsive className={'leaderboard'}>
            <thead>
              <tr>
                <th onClick={() => this.doSort('name')} title={'Click to sort'}>Name</th>
                <th onClick={() => this.doSort('asked')} title={'Click to sort'}>Asked</th>
                <th onClick={() => this.doSort('answered')} title={'Click to sort'}>Answered</th>
                <th onClick={() => this.doSort('total')} title={'Click to sort'}>Total</th>
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

  return {
    users: Object.values(users).sort(function(a,b){return b.total - a.total}),
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
