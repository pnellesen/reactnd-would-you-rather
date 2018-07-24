import React from 'react';
import { connect } from 'react-redux'
import { Table } from 'reactstrap';

function Leaderboard(props) {
    const { users, authedUser } = props
    return (
      <div>
        <h1>Leaderboard</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Asked</th>
              <th>Answered</th>
              <th>Total</th>
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

const mapStateToProps = ({users, authedUser}) => {

  return {
    users: Object.values(users).sort(function(a,b){return b.total - a.total}),
    authedUser: {...users[authedUser]}
  }
}

export default connect(mapStateToProps)(Leaderboard)
