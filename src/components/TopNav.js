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

    toggleCollapse() {// Use this on links - will only cause rerender if in small viewports and toggler is open. If in large viewport, toggler display will be "none"
		var togglerDisplay = window.getComputedStyle(this.togglerRef.firstElementChild).getPropertyValue("display");
        if (this.state.isOpen && togglerDisplay != 'none') {
            this.setState({isOpen: !this.state.isOpen});
		}
    }

	render () {
		console.log("TopNav props: ", this.props)
        const { navItems, dispatch } = this.props;
		return (
			<div>
	        <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/" exact="true" disabled={this.props.disabled} onClick={() => this.toggleCollapse()}>Would you rather</NavbarBrand>
                <div ref={(togglerNode) => {this.togglerRef = togglerNode}}><NavbarToggler onClick={() => this.toggle()} /></div>
	            <Collapse isOpen={this.state.isOpen} navbar>
	            <Nav className="" navbar>{
                    navItems.filter((item) => item.isNavItem).map((item, i) => {
						const { navTo, navText } = item
                        return (
                            <NavItem key={i}>
                                <NavLink tag={Link} exact={navTo === '/' ? 'true': 'false'} disabled={this.props.disabled} to={navTo} onClick={() => this.toggleCollapse()}>{navText}</NavLink>
                            </NavItem>
                        )
					})}
					<NavItem key={'logout'}>
                       <NavLink tag={Link} disabled={this.props.disabled} to={'/login'} onClick={() => {}}>Logout</NavLink>
                    </NavItem>
                </Nav>
	          </Collapse>
	        </Navbar>
	      </div>
		)
	}
}
export default connect()(TopNav)