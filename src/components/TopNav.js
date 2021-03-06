// This file based on a top nav from a personal project I did before starting the React Nanodegree
// https://github.com/pnellesen/reactjs-cart-demo/blob/master/src/components/TopNav.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { handleDoLogout } from '../actions/authedUser'

import {
	  Collapse,
	  Navbar,
	  NavbarToggler,
	  NavbarBrand,
	  Nav,
	  NavItem,
	  NavLink
} from 'reactstrap';

class TopNav extends Component {

    state = {
        isOpen: false
    };

  	/**
  	* @description _toggle() open/close the nav in small viewports
    */
	_toggle() {
	    this.setState({
	      isOpen: !this.state.isOpen
	    });
	  }

	/**
  	* @description _toggleCollapse() insure the nav closes after user selects a nav item.
    */
	_toggleCollapse() {
		  // Use this on links - will only cause rerender if in small viewports and toggler is open. If in large viewport, toggler display will be "none"
		var togglerDisplay = window.getComputedStyle(this.togglerRef.firstElementChild).getPropertyValue("display");
        if (this.state.isOpen && togglerDisplay !== 'none') {
            this.setState({isOpen: !this.state.isOpen});
		}
    }

	render () {
        const { navItems, disabled, dispatch, authedUser, users } = this.props;
		return (
			<div>
	        <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to={'/'} exact={'true'}  onClick={() => this._toggleCollapse()}>Would you rather</NavbarBrand>
                <div ref={(togglerNode) => {this.togglerRef = togglerNode}}><NavbarToggler onClick={() => this._toggle()} /></div>
	            <Collapse style={{justifyContent: 'space-between'}} isOpen={this.state.isOpen} navbar>
					<Nav className="" navbar>{
						navItems.filter((item) => item.isNavItem).map((item, i) => {
							const { navTo, navText } = item
							return (
								<NavItem key={i}>
									<NavLink tag={Link} exact={navTo === '/' ? 'true': 'false'} disabled={disabled} to={navTo} onClick={() => this._toggleCollapse()}>{navText}</NavLink>
								</NavItem>
							)
						})}
						<NavItem key={'logout'}>
							<NavLink tag={Link} to={'/login'} onClick={() => {this._toggleCollapse();!disabled && dispatch(handleDoLogout())}}>{!disabled ? 'Logout' : 'Login'}</NavLink>
						</NavItem>
					</Nav>
			  	</Collapse>
	        </Navbar>
			{!disabled && <span style={{backgroundImage: `url(${users[authedUser].avatarURL})`}} className={'userId user_info_nav'}>Logged in as {users[authedUser].name}</span>}
	      </div>
		)
	}
}

const mapStateToProps = ({ authedUser, users }, {navItems}) => {
	return {
		authedUser: authedUser,
		users: users,
		navItems: navItems,
		disabled: authedUser === null
	 }
   }

export default connect(mapStateToProps)(TopNav)

TopNav.propTypes = {
	authedUser: PropTypes.string,
	users: PropTypes.object,
	navItems: PropTypes.array,
	disabled: PropTypes.bool
}