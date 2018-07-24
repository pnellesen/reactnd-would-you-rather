import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
function ErrorPage(props)  {
  return (
      <div>
        <h1>Oops! {props.location ? `"${props.location.pathname}"` : 'That page'} not available</h1>
        {props.authedUser === null ?
           <p>Please <Link to={'/login'}>login</Link> to use the app</p>
          :
           <p>Please select an option from the menu to continue</p>}
      </div>
    );
}

const mapStateToProps = ({ authedUser }) => {
	return {
		authedUser: authedUser,
	 }
}

export default connect(mapStateToProps)(ErrorPage);
