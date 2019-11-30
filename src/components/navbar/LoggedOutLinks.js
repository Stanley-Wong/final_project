import React from 'react';
import { NavLink } from 'react-router-dom';

class LoggedOutLinks extends React.Component {

  render() {
    return (
      <div>
        <NavLink to="/login" style={{color:"black", fontSize:"25px"}}>Login&nbsp;&nbsp;&nbsp;</NavLink>
        <NavLink to="/register" style={{color:"black", fontSize:"25px"}}>Register</NavLink>
      </div>
    )
  }
} 

export default LoggedOutLinks;