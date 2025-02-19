import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import { loginHandler } from '../../store/database/asynchHandler'

const inputBox = {
  border: "solid",
  borderRadius: "5px",
  borderWidth: "2px",
  paddingLeft: "15px"
}

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // As we use react-redux-firebas-v3 we need to pass firebase object to
    // authActions to be authorized by using firebse.auth method
    const { props, state } = this;
    const { firebase } = props;
    const credentials = { ...state };
    const authData = {
      firebase,
      credentials,
    };

    props.login(authData);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div class="row">
          <div class="col s4">
              <h3>Login</h3>
              <input id="email" style={inputBox} type="text" placeholder="Email Address" onChange={this.handleChange}></input>
              <div>&nbsp;</div>
              <input id="password" style={inputBox} type="password" placeholder="Password" onChange={this.handleChange}></input>
              <div>&nbsp;</div>
              <div>
                <a class="waves-effect waves-light btn" onClick={this.handleSubmit}>Login</a>
                {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
              </div>
          </div>
          <div class="col s2">&nbsp;</div>
          <div class="col s6" style={{textAlign:"center"}}>
              <div class="card medium" style={{padding:"25px", borderRadius:"3px", borderStyle:"solid"}}>
                  <h2>Wireframer™</h2>
              </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.authError,
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  login: authData => dispatch(loginHandler(authData)),
});

// We need firebaseConnect function to provide to this component
// firebase object with auth method.
// You can find more information on the link below
// http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html
export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(LoginScreen);