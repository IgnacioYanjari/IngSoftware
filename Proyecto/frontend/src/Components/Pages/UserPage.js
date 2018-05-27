import React, { Component } from 'react';
import './../../App.css';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import RegisterForm from './../Forms/RegisterForm';
import {message} from 'antd';
import HeaderMain from './../Headers/headerMain';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class UserPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      logOut:true,
      rut:''
    }
  }
// localStorage.removeItem('id_token'); para logOut

  componentDidMount(){
    const token = localStorage.getItem('token');
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      if(!err){
        this.setState({
          logOut : false,
          rut : decoded.dataUser.rut
        })
        message.info('Tipo de usuario : ' + decoded.dataUser.typeUser);
      }
    });
  }

  render() {
    let {logOut} = this.state;

    return (
      <div>
      { logOut === true ?
        (
          <Grid container alignItems="center" className="margin" >
            <Grid item xs={1} sm={3} md={3} lg={4} >
            </Grid>
            <Grid item xs={10} sm={6} md={6} lg={4} >
              <Card aling="center">
                <CardContent>
                  <Typography style={{marginTop:'5%'}} align="center" variant="body2" >
                    <p> Su sesión ya expiró </p>
                    <Link id="raised-button-file" to='/'>
                        <Button variant="raised" color="primary" className={styles.button}>
                          Regresar a iniciar sesión
                        </Button>
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={1} sm={3} md={3} lg={4} >
            </Grid>
          </Grid>
        ) : (
          <div>
            <HeaderMain user={'Rut : ' + this.state.rut } authenticate={this.props.authenticate}/>
            <Grid container alignItems="center" className="margin" >
              <Grid item xs={1} sm={3} md={3} lg={4} >
              </Grid>

              <Grid item xs={10} sm={6} md={6} lg={4} >
                <Card aling="center">
                  <CardContent>
                    <Typography style={{marginTop:'5%'}} align="center" variant="body2" >
                      <RegisterForm/>
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
    );
  }
}
// <LockIcon style={{ fontSize: 30 }}/>
// <div>

export default UserPage;
