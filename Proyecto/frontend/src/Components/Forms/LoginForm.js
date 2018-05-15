import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Button} from 'material-ui';
import {CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {message} from 'antd';

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state={
      name :'',
      password:''
    };
    this.checkUser = this.checkUser.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  checkUser(e){
    const name = this.state.name;
    const password = this.state.password;
    if(name.length === 0 && password.length === 0)
      message.error('Agregar usuario y contraseña',2)
    else if (name.length === 0)
      message.error('Agregar usuario',2)
    else if (password.length === 0)
      message.error('Agregar contraseña',2)
    else {
      message.loading('Esperando respuesta del servidor',5)
      console.log( "nombre : ", name);
      console.log( "password : ", password);
      //Realizar confirmación con base de datos.
    }
  }

  updateName(e){
    this.setState({
      name:e.target.value
    });
  }

  updatePassword(e){
    this.setState({
      password:e.target.value
    })
  }

  render(){
    return(
      <div>
        <Typography align="center" variant="title" >
          <br/>
          Iniciar Sesión
        </Typography>
        <form style={{display: 'flex',flexWrap: 'wrap'}}>
            <TextField
              id="name"
              label="Usuario"
              margin="normal"
              fullWidth
              required
              onChange = {e => this.updateName(e)}
              error = {this.state.name.length === 0}
            />

            <TextField
              id="password"
              label="Contraseña"
              margin="normal"
              fullWidth
              required
              onChange = {e => this.updatePassword(e)}
              error = {this.state.password.length === 0}
            />
            <CardActions>
              <Button onClick={(e)=>this.checkUser(e)} size="small" color="primary">
                Ingresar
              </Button>

              <Button onClick={(e)=>this.props.changeRender(e)} size="small" color="primary">
                Registrarse
              </Button>
            </CardActions>
        </form>
      </div>
    )
  }

}

export default LoginForm;
