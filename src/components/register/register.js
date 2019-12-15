import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler'

const inputBox = {
    border: "solid",
    borderRadius: "5px",
    borderWidth: "2px",
    paddingLeft: "15px"
}
class register extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    inputError:false
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

    const { props, state } = this;
    const { firebase } = props;
    const newUser = { ...state };


    if(this.state.email!="" && this.state.password!="" && this.state.firstName && this.state.lastName!=""){
      props.register(newUser, firebase);
      this.setState({inputError:false})
    }
    else
      this.setState({inputError:true})
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }
    return (
      <div class="row">
          <div class="col s4">
              <h3>Register</h3>
              <input id="email" style={inputBox} type="text" placeholder="Email Address" onChange={this.handleChange}></input>
              <div>&nbsp;</div>
              <input id="password" style={inputBox} type="text" placeholder="Password" onChange={this.handleChange}></input>
              <div>&nbsp;</div>
              <input id="firstName" style={inputBox} type="text" placeholder="First Name" onChange={this.handleChange}></input>
              <div>&nbsp;</div>
              <input id="lastName" style={inputBox} type="text" placeholder="Last Name" onChange={this.handleChange}></input>
              <div>&nbsp;</div>
              <div>
                <a class="waves-effect waves-light btn" onClick={this.handleSubmit}>Register</a>
                {this.state.inputError ? <div className="red-text center"><p>Register Error</p></div> : null}
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
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(register);