import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table } from 'reactstrap';

class Leaderboard extends Component {
  state = {
    users: this.props.users
  }

  doSort = (type) => {
    console.log("doSort - type: ", type)
    switch(type) {
      case 'name':
       this.setState({users: Object.values(this.state.users).sort(function(a,b){return b.name - a.name})})
       break;
      case 'asked':
        this.setState({users: Object.values(this.state.users).sort(function(a,b){
          return (
            1 !== 1 ? b.asked - a.asked : a.asked - b.asked
          )
          //return b.asked - a.asked
        
        })})
        break;
      case 'asked':
        this.setState({users: Object.values(this.state.users).sort(function(a,b){return b.answered - a.answered})})
        break;
      default:
        this.setState({users: Object.values(this.state.users).sort(function(a,b){return b.total - a.total})})
    }
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
