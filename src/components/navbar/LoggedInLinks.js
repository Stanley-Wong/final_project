import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { logoutHandler } from '../../store/database/asynchHandler'

class LoggedInLinks extends React.Component {

  // As in SignIn.jsx we need to use a function that gets as an argument firebase object
  handleLogout = () => {
    const { firebase } = this.props;
    this.props.signOut(firebase);
  }

  render() {
    const { profile } = this.props;
    return (
      <div>
        <NavLink to="/" onClick={this.handleLogout} style={{color:"black", fontSize:"25px"}}>Log Out &nbsp;&nbsp;&nbsp;</NavLink>
        <NavLink to="/" style={{fontSize:"15px"}} class="btn btn-floating black lighten-1">{profile.initials}</NavLink>
      </div>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  signOut: firebase => dispatch(logoutHandler(firebase)),
});

export default compose(
  firebaseConnect(),
  connect(null, mapDispatchToProps),
)(LoggedInLinks);