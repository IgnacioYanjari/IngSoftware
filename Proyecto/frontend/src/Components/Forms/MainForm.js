import React, { Component } from 'react';
import LoginForm from './LoginForm.js';

class MainForm extends Component{
  renderLogin(){
    return(
      <LoginForm/>
    )
  }

  render(){
    return(
      <div>
        {this.renderLogin()}
      </div>
    )
  }

}

export default MainForm;
