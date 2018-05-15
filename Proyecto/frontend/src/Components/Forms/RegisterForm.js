import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {Button} from 'material-ui';
import {CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {message} from 'antd';
import {Redirect} from 'react-router';

class RegisterForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'',
      user:'',
      password:'',
      onUser : false
    }
    this.sendAccount = this.sendAccount.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name + ':' + value);
    this.setState({
      [name] : value
    });
  }

  sendAccount(event){
    // Realizar validación
    message.loading('caca');
    this.setState({onUser: true})
    event.preventDefault();
  }

  render(){
    return(
      <div>
        { this.state.onUser  && (<Redirect to="/user"/>) }
        <Typography align="center" variant="title" >
          <br/>
          Registrarse
        </Typography>
        <form action="" method="" style={{display: 'flex',flexWrap: 'wrap'}} onSubmit={this.sendAccount}>
          <TextField
            name="user"
            type="text"
            label="Usuario"
            margin="normal"
            fullWidth
            required
            onChange = {e => this.handleChange(e)}
          />

          <TextField
            name="email"
            label="E-mail"
            margin="normal"
            type="email"
            fullWidth
            required
            onChange = {e => this.handleChange(e)}
          />

          <TextField
            name="password"
            value={this.state.password}
            label="Contraseña"
            type="password"
            margin="normal"
            fullWidth
            required
            onChange = {e => this.handleChange(e)}
          />
          <CardActions>
            <Button type="submit"  size="small" color="primary">
              Terminar Registro
            </Button>

            <Button onClick={(e)=>this.props.changeRender(e)} size="small" color="primary">
              Volver atras
            </Button>
          </CardActions>
        </form>
      </div>
    )
  }
}

export default RegisterForm;
