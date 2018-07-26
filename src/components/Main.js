import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import QuestionList from './QuestionList'
import {handleStoreUserInfo} from '../actions/users'

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';


class Main extends Component {
  state = {
    activeTab: this.props.activeTab
  }

  toggle(tab) {
    this.state.activeTab !== tab && this.setState({activeTab: tab})
  }


  componentWillUnmount() {
    const { activeTab } = this.state
    const userInfo = { activeTab: activeTab }
    this.props.dispatch(handleStoreUserInfo({ authedUser: this.props.authedUser, userInfo: userInfo }))
  }  
  render() {
    const { questions } = this.props;
    console.log("active tab? ", this.state.activeTab)
    return (

        Object.keys(questions).length > 0 ? (
          <div>
          <Nav tabs className={'main_tabs'}>
        <NavItem>
          <NavLink
            className={this.state.activeTab === '1' ? 'active' : '' }
            onClick={() => { this.toggle('1'); }}
          >
            Unanswered
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={this.state.activeTab === '2' ? 'active' : ''  }
            onClick={() => { this.toggle('2'); }}
          >
           Answered
          </NavLink>
        </NavItem>
      </Nav>
        <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <h3>Questions you have not yet answered:</h3>
          <QuestionList type={'unanswered'}/>
        </TabPane>
        <TabPane tabId="2">
         
        <h3>Questions you have answered:</h3>
          <QuestionList type={'answered'}/>
        </TabPane>
        </TabContent>
        </div> 
       ) : (
       <h3>Loading questions...</h3>
       )
       
    );
  }
}

const mapStateToProps = ({ authedUser, questions, users  }) => {
  const userInfo = users[authedUser].userInfo || {}
  const activeTab = userInfo.activeTab ? userInfo.activeTab : '1'
  
  return {
    authedUser: authedUser,
    questions: questions,
    activeTab: activeTab
   }
 }

export default connect(mapStateToProps)(Main);

Main.propTypes = {
  questions: PropTypes.object.isRequired,
}
