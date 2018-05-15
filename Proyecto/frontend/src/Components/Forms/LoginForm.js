import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Button} from 'material-ui';
import {CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {message} from 'antd';
import {Redirect} from 'react-router';

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state={
      user :'',
      password:'',
      onUser : false
    };
    this.checkLogin = this.checkLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  checkLogin(e){
    const name = this.state.name;
    const password = this.state.password;
    message.loading('Esperando respuesta del servidor',1)
    console.log( "password : ", password);
    console.log( "nombre : ", name);
    this.setState({onUser: true});
    e.preventDefault();
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
  }

  render(){
    return(
      <div>
        { this.state.onUser  && (<Redirect to="/user"/>) }
        <Typography align="center" variant="title" >
          <br/>
          Iniciar Sesión
        </Typography>
        <form style={{display: 'flex',flexWrap: 'wrap'}} onSubmit={this.checkLogin}>
            <TextField
              name="user"
              label="Usuario"
              margin="normal"
              fullWidth
              required
              onChange = {e => this.handleChange(e)}

            />

            <TextField
              name="password"
              label="Contraseña"
              type="password"
              margin="normal"
              fullWidth
              required
              onChange = {e => this.handleChange(e)}

            />
            <CardActions>
              <Button type="submit" size="small" color="primary">
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
