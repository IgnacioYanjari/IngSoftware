import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {Button} from 'material-ui';
import {CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {message} from 'antd';
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
      email:'',
      user:'',
      password:'',
      type : 'Guardia',
      onDisplay:false
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      if(!err){
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

  sendAccount(event){
    message.loading('caca');
    event.preventDefault();
  }

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
                 <MenuItem value={'Guardia'}>Guardia</MenuItem>
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
