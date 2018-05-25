import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginPage   from './Components/Pages/LoginPage.js';

// module.exports = { secret_key : 'L;/Pr$Pb`~mvsC'}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
