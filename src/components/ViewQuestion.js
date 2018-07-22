import React, { Component } from 'react';
import { connect } from 'react-redux'

class ViewQuestion extends Component {
  render() {
    console.log("ViewQuestion - props: ", this.props)
    return (
      <div><h1>View a single Question/Poll here</h1></div>
    );
  }
}

const mapStateToProps = ({ authedUser, questions }) => {
  return { authedUser: authedUser, questions: questions }
 }

 export default connect(mapStateToProps)(ViewQuestion);


