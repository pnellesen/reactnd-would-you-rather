// This file copied from a personal project I did before starting the React Nanodegree
// https://github.com/pnellesen/reactjs-cart-demo/blob/master/src/components/TopNav.js
import React, { Component } from 'react';
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
	  NavLink,
	  UncontrolledDropdown,
	  DropdownToggle,
	  DropdownMenu,
	  DropdownItem } from 'reactstrap';



class TopNav extends Component {

    state = {
        isOpen: false
    };

    toggle() {
	    this.setState({
	      isOpen: !this.state.isOpen
	    });
	  }

  	// Use this on links - will only cause rerender if in small viewports and toggler is open. If in large viewport, toggler display will be "none"
	toggleCollapse(e) {
	  	this.props.disabled && e.preventDefault();// "disabled" attribute doesn't work in <NavbarBrand> - do this instead as a workaround
		var togglerDisplay = window.getComputedStyle(this.togglerRef.firstElementChild).getPropertyValue("display");
        if (this.state.isOpen && togglerDisplay != 'none') {
            this.setState({isOpen: !this.state.isOpen});
		}
    }

	render () {
        const { navItems, disabled, dispatch, authedUser } = this.props;
		return (
			<div>
	        <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to={'/'} exact={'true'}  onClick={(e) => this.toggleCollapse(e)}>
				Would you rather</NavbarBrand>
                <div ref={(togglerNode) => {this.togglerRef = togglerNode}}><NavbarToggler onClick={(e) => this.toggle(e)} /></div>
	            <Collapse style={{justifyContent: 'space-between'}} isOpen={this.state.isOpen} navbar>
	            <Nav className="" navbar>{
                    navItems.filter((item) => item.isNavItem).map((item, i) => {
						const { navTo, navText } = item
                        return (
                            <NavItem key={i}>
                                <NavLink tag={Link} exact={navTo === '/' ? 'true': 'false'} disabled={disabled} to={navTo} onClick={(e) => this.toggleCollapse(e)}>{navText}</NavLink>
                            </NavItem>
                        )
					})}
					<NavItem key={'logout'}>
                       <NavLink tag={Link} disabled={disabled} to={'/login'} onClick={(e) => {this.toggleCollapse(e);dispatch(handleDoLogout())}}>Logout</NavLink>
                    </NavItem>

                </Nav>
				{!disabled && <span style={{float: 'right',color: 'white'}}>Logged in as {authedUser}</span>}
			  </Collapse>

	        </Navbar>
	      </div>
		)
	}
}

const mapStateToProps = ({ authedUser }, {navItems}) => {
	return {
		authedUser: authedUser,
		navItems: navItems,
		disabled: authedUser === null
	 }
   }

export default connect(mapStateToProps)(TopNav)