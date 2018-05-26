import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Button} from 'material-ui';
import {CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {message} from 'antd';
import {Redirect} from 'react-router-dom';

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state={
      user :'192098327',
      password:'telescopi'
    };
    this.checkLogin = this.checkLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


/*
{
	"email" : "ignacio.yanjari@mail.udp.cl",
	"password" :"telescopi",
	"type":"5",
	"rut":"192098327"
}
sesiones :
token1 : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVXNlc…jIwfQ.UhrYic2MstTiKOaZEkPOfzI0hETNfl_Ekr2tImR2vek
*/

  checkLogin(e){
    message.loading('Esperando respuesta del servidor',1)
    const user = this.state.user;
    const password = this.state.password;
    let param = JSON.stringify({
      rut : user,
      password : password,
      token : '',
      onUser:false
    });

    fetch('http://localhost:3000/api/user/log-in',{
      method: 'POST',
      body : param,
      headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then( res =>{
      message.destroy();
      if(res.success){
          message.success('Ingreso correcto');
            this.props.authenticate.authenticate(res.token,()=>{
              this.setState({onUser:true})
            })
      }else
        message.warning(res.message,4);
    })
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
    let onUser = this.state.onUser;
    // const { from } = this.props.location.state || { from: { pathname: '/' } }
    return(
      <div>
      { onUser ?
        (<Redirect to='/user' />):
        (
          <div>
            <Typography align="center" variant="title" >
              <br/>
              Iniciar Sesión
            </Typography>
            <form style={{display: 'flex',flexWrap: 'wrap'}} onSubmit={this.checkLogin}>
                <TextField
                  value = {this.state.user}
                  name="user"
                  label="Usuario"
                  margin="normal"
                  fullWidth
                  required
                  onChange = {e => this.handleChange(e)}

                />

                <TextField
                  value = {this.state.password}
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
                </CardActions>
            </form>
          </div>
      )}
      </div>
    )
  }
}

export default LoginForm;
