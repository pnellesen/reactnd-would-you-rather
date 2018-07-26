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
  
  tabInfo = [
    {type: 'unanswered', tabText: 'Unanswered', heading: 'Questions you have not yet answered:'},
    {type: 'answered', tabText: 'Answered', heading: 'Questions you have answered'},
    {type: 'mine', tabText: 'Mine', heading: 'Questions you have authored'},
  ]

  render() {
    const { questions } = this.props;
    return (
        Object.keys(questions).length > 0 ? (
          <div>
          <Nav tabs className={'main_tabs'}>
          { this.tabInfo.map((thisTab, index) => {
              return (
                <NavItem key={index}>
                  <NavLink
                  className={this.state.activeTab === `${index}` ? 'active' : '' }
                  onClick={() => { this.toggle(`${index}`); }}
                  > 
                  {thisTab.tabText}
                  </NavLink>
                </NavItem>
              )
            }) }
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
        { this.tabInfo.map((thisTab, index) => {
          return (
            <TabPane key={index} tabId={`${index}`}>
              <h3>{thisTab.heading}</h3>
              <QuestionList type={`${thisTab.type}`}/>
            </TabPane>
          )
        }) }
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
  const activeTab = userInfo.activeTab ? userInfo.activeTab : '0'
  
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
