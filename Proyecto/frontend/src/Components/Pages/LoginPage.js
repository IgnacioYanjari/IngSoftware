import React, { Component } from 'react';
import './../../App.css';
import LoginForm from './../Forms/LoginForm.js';
import {Redirect} from 'react-router-dom';
import jwt from 'jsonwebtoken';
// import LockIcon from '@material-ui/icons/Lock'
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoged:false
    }
  }
// localStorage.removeItem('id_token'); para logOut

  componentDidMount(){
    const token = localStorage.getItem('token');
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      if(!err){
        this.setState({
          isLoged : true
        })
      }
    });
  }

  render() {
    const {isLoged} = this.state;
    return(
      <div>
        { isLoged ? (
            <Redirect to ='/user' />
          ):(
            <div className="margin"  >
              <Grid container alignItems="center">
                <Grid item xs={1} sm={3} md={3} lg={4} >
                </Grid>

                <Grid item xs={10} sm={6} md={6} lg={4} >
                  <Card aling="center">
                    <CardContent>
                      <Typography align="center" variant="title" >
                          <img src="./logoAlfaChile.jpg" alt="Logo-Empresarial"/>
                      </Typography>
                      <LoginForm {...this.props} authenticate={this.props.authenticate}/>
                      <Typography style={{marginTop:'5%'}} align="center" variant="body2" >
                        Consultas a ......
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={1} sm={3} md={3} lg={4} >
                </Grid>
              </Grid>
            </div>
          )
        }
      </div>
    )
  }
}
// <LockIcon style={{ fontSize: 30 }}/>
export default LoginPage;
