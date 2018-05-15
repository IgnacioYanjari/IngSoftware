import React, { Component } from 'react';
import RegisterForm from './RegisterForm.js';
import LoginForm from './LoginForm.js';

class MainForm extends Component{
  constructor(props){
    super(props);
    this.state={
      render : true
    };
    this.changeRender = this.changeRender.bind(this);
  }

  renderLogin(){
    return(
      <LoginForm
      changeRender = {this.changeRender}
      />
    )
  }

  renderRegister(){
    return(
      <RegisterForm
      changeRender = {this.changeRender}
      />
    )
  }

  changeRender(e){
    this.setState( (prevState,props)=>{
      return{render : !prevState.render}
    });
  }

  render(){
    let render = this.state.render;
    return(
      <div>
        {render ?(this.renderLogin()) :(this.renderRegister())}
      </div>
    )
  }

}

export default MainForm;
