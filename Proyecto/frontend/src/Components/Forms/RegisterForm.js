import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {Button} from 'material-ui';
import {CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {message,notification} from 'antd';
import {Redirect} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});



class RegisterForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'das@dasjl.cl',
      rut:'11',
      password:'aaaaaaaaa',
      type : 'Guardia Full-Time',
      onDisplay:false
    }
    this.sendAccount = this.sendAccount.bind(this);
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      if(!err && decoded.dataUser.typeUser === 5){
        this.setState({
          onDisplay : true
        })
      }
    });
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
  }
  // <MenuItem value={'Guardia Full-Time'}>Guardia</MenuItem>
  // <MenuItem value={'Guardia Part-Time'}>Guardia</MenuItem>
  // <MenuItem value={'Jefe de guardia'}>Jefe de guardia</MenuItem>
  // <MenuItem value={'Recursos Humanos'}>Recursos Humanos</MenuItem>

  sendAccount(event){
    event.preventDefault();
    let typeUser = {
      'Guardia Full-Time' : 1,
      'Guardia Part-Time' : 2,
      'Jefe de guardia' : 3,
      'Recursos Humanos' : 4
    }
    message.loading('Esperando respuesta del servidor',1);
    const {rut,email,type,password} = this.state;

    let param = JSON.stringify({
      rut : rut,
      password : password,
      email : email,
      type : typeUser[type.toString()]
    });
    fetch('http://localhost:3000/api/user/sign-in',{
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
        message.success('Cuenta creada correctamente');
      }else
        message.warning(res.message,4);
    })
  }

  //  Si necesito imprimir los valores :
  // message.success('Cuenta creada correctamente \r\n '
  // + param)

  render(){
    const {onDisplay} = this.state;
    return(
      <div>
        { onDisplay ?
        (
          <div>
            <Typography align="center" variant="title" >
              <br/>
              Crear Cuenta
            </Typography>
            <form action="" method="" style={{display: 'flex',flexWrap: 'wrap'}} onSubmit={this.sendAccount}>
              <TextField
                value = {this.state.rut}
                name="rut"
                type="text"
                label="Rut ( Sin guión ni puntos)"
                margin="normal"
                fullWidth
                required
                onChange = {e => this.handleChange(e)}
              />

              <TextField
                value = {this.state.email}
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
              <FormControl fullWidth className={styles.formControl}>
               <InputLabel htmlFor="type-user">Tipo usuario</InputLabel>
               <Select
                required
                value={this.state.type}
                onChange={e => this.handleChange(e)}
                inputProps={{
                  name: 'type',
                  id: 'type-user',
                }}
                >
                 <MenuItem value={'Guardia Full-Time'}>Guardia Full-Time</MenuItem>
                 <MenuItem value={'Guardia Part-Time'}>Guardia Part-Time</MenuItem>
                 <MenuItem value={'Jefe de guardia'}>Jefe de guardia</MenuItem>
                 <MenuItem value={'Recursos Humanos'}>Recursos Humanos</MenuItem>
               </Select>
              </FormControl>
              <CardActions>
                <Button type="submit"  size="small" color="primary">
                  Terminar Registro
                </Button>
              </CardActions>
            </form>
          </div>
        ) : (
          <div> </div>
        )}
        { this.state.onUser  && (<Redirect to="/user"/>) }

      </div>
    )
  }
}

export default RegisterForm;
