import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginPage   from './Components/Pages/LoginPage.js';
import UserPage   from './Components/Pages/userPage.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/user" component={UserPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
