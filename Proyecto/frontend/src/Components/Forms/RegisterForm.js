import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {Button} from 'material-ui';
import {CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
// import {message} from 'antd';

class RegisterForm extends Component{
  render(){
    return(
      <div>
        <Typography align="center" variant="title" >
          <br/>
          Registrarse
        </Typography>
        <form style={{display: 'flex',flexWrap: 'wrap'}}>
          <TextField
            id="name"
            label="Usuario"
            margin="normal"
            fullWidth
            required
          />

          <TextField
            id="email"
            label="E-mail"
            margin="normal"
            fullWidth
            required
          />

          <TextField
            id="password"
            label="Contraseña"
            margin="normal"
            fullWidth
            required
          />
          <CardActions>
            <Button  size="small" color="primary">
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
