import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import LoginPage   from './Components/Pages/LoginPage.js';
import UserPage from './Components/Pages/UserPage.js';
import jwt from 'jsonwebtoken';

// module.exports = { secret_key : 'L;/Pr$Pb`~mvsC'}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={
    props =>
      authenticate.isAuthenticated ?
      (<Component {...props} authenticate={authenticate}/>)
      : (<Redirect to='/' />)
    }
  />
);

function isLoged(token){
  return jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
    if(!err)
    return true;
    return false;
  })
}

const authenticate = {
  isAuthenticated : isLoged(localStorage.getItem('token')),
  authenticate(token,callback){
    localStorage.setItem('token',token);
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      if(!err){
        this.isAuthenticated = true;
        setTimeout(callback,100);
      }
    })

  },
  signout(callback){
    this.isAuthenticated = false;
    setTimeout(callback,100);
  }
}

class App extends Component {
  render() {
    console.log(authenticate.isAuthenticated);
    return (
      <Router>
        <div>
          <Route exact path="/" render={ props => <LoginPage {...props} authenticate={authenticate} /> } />
          <PrivateRoute exact path="/user" component={UserPage} />
        </div>
      </Router>
    );
  }
}


export default App;
