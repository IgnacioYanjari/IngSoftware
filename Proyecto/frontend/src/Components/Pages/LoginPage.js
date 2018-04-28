import React, { Component } from 'react';
import './../../App.css';
import LoginForm from './../Forms/LoginForm.js';
import LockIcon from '@material-ui/icons/Lock'

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class LoginPage extends Component {
  render() {
    return (
      <Grid container alignItems="center" className="margin" >
        <Grid item xs={1} sm={3} md={3} lg={4} >
        </Grid>

        <Grid item xs={10} sm={6} md={6} lg={4} >
          <Card aling="center">
            <CardContent>
              <Typography align="center" variant="title" >
                  <LockIcon style={{ fontSize: 30 }}/>
                  </Typography>
              <Typography align="center" variant="title" >
                Iniciar Sesión
              </Typography>
              <LoginForm/>
              <Typography style={{marginTop:'5%'}}align="center" variant="body2" >
                Consultas a ......
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={1} sm={3} md={3} lg={4} >

        </Grid>

      </Grid>

    );
  }
}

export default LoginPage;
