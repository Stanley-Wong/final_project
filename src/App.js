import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

import Register from './components/register/register';
import HomeScreen from './components/home/home';
import DatabaseTester from './test/DatabaseTester';
import Navbar from './components/navbar/Navbar.js';
import Login from './components/login/LoginScreen';
import EditScreen from './components/edit/editScreen';

class App extends Component {
  render() {
    const { auth } = this.props;
    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <div className="App" style={{width:"1100px", height:"1100px", margin:"auto"}}>
            <Navbar />
            <Switch>
              <Route path="/home" component={HomeScreen} />
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/testing" component={DatabaseTester} />
              <Route path="/editscreen/:id" component={EditScreen}/>
              <Route path="/:any" component={HomeScreen} />
              <Route path="" component={HomeScreen} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);