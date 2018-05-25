import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class headerMain extends Component{
  render(){
    return(
      <AppBar
        title={'Bienvenido : ' + this.props.name}
      />
    )
  }

}

export default headerMain;
