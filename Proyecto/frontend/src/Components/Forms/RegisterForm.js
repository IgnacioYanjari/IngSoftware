import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {Button} from 'material-ui';
import Card, {CardContent,CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {message} from 'antd';
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

// Agregar Direccion en : RRHH(4), Guardia Full-Time(1) y Part-Time(2)



class RegisterForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'das@ddsaasjldsa.cl',
      name : 'Juan Jose Saez Vergara',
      rut:'189556373',
      password:'aaaaaaaaa',
      type : 'Guardia Full-Time',
      direccion : 'Miraflores N° 70, Ciudad de Santiago.',
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

  renderDireccion(){
    const typeUser = {
      'Guardia Full-Time' : 1,
      'Guardia Part-Time' : 2,
      'Jefe de guardia' : 3,
      'Recursos Humanos' : 4,
      'Administrador' : 5
    }, {type} = this.state;
    let aux = typeUser[type];
    if( aux === 1 || aux === 2 || aux === 4){
      return(
        <TextField
        value = {this.state.direccion}
        name="direccion"
        type="text"
        label="Direccion"
        margin="normal"
        fullWidth
        required
        onChange = {e => this.handleChange(e)}
        />
      )
    }
  }

  sendAccount(event){
    event.preventDefault();
    let typeUser = {
      'Guardia Full-Time' : 1,
      'Guardia Part-Time' : 2,
      'Jefe de guardia' : 3,
      'Recursos Humanos' : 4,
      'Administrador' : 5
    }
    message.loading('Esperando respuesta del servidor',1);
    const token = localStorage.getItem('token');
    const {name,rut,email,type,password,direccion} = this.state;
    let param = JSON.stringify({
      rut : rut,
      password : password,
      email : email,
      type : typeUser[type.toString()],
      name : name,
      direccion : direccion
    });
    fetch('http://localhost:3000/api/user/sign-in',{
      method: 'POST',
      body : param,
      headers: {
        'authorization' : 'Bearer ' + token,
        'Origin' : 'X-Requested-With',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then( res => {
      console.log(res)
      message.destroy();
      if(res.success === true ){
        localStorage.removeItem('token');
        localStorage.setItem('token',res.token);
        message.success('Cuenta creada correctamente');
      }else
        message.warning(res.message,4);
    })
  }

  render(){
    const {onDisplay} = this.state;
    return(
      <div>
        { onDisplay ?
        (
          <Card >
            <CardContent id="registrar">
              <Typography align="center" variant="body2" >
                <Typography align="center" variant="title" >
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
                    value = {this.state.name}
                    name="name"
                    type="text"
                    label="Ingresar nombre completo "
                    margin="normal"
                    fullWidth
                    required
                    onChange = {e => this.handleChange(e)}
                  />
                  { this.renderDireccion() }
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
                     <MenuItem value={'Administrador'}>Administrador</MenuItem>
                   </Select>
                  </FormControl>
                  <CardActions>
                    <Button type="submit"  size="small" color="primary">
                      Terminar Registro
                    </Button>
                  </CardActions>
                </form>
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <div> </div>
        )}

      </div>
    )
  }
}

export default RegisterForm;
