import React, { Component } from 'react';

class footerMain extends Component{
  constructor(props){
    super(props);
    this.state={
      render : true
    };
  }

  renderLogin(){
    return(
      <LoginForm/>
    )
  }

  render(){
    let render = this.state.render;
    return(
      <div>
        {this.renderLogin()}
      </div>
    )
  }

}

export default footerMain;
