import React, { Component } from 'react';
import './../../App.css';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import HeaderMain from './../Headers/headerMain';
import ListOfButtons from './../Raw/ListOfButtons';
import RegisterForm from './../Forms/RegisterForm';
import DeleteAccount from './../Forms/DeleteForm';
import DateForm from './../Forms/DateForm';
import ListForm from './../Forms/ListForm';
import HourForm from './../Forms/HourForm';

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

  componentDidMount(){
    const token = localStorage.getItem('token');
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      if(!err){
        this.setState({
          logOut : false,
          rut : decoded.dataUser.rut
        })
        // message.info('Tipo de usuario : ' + decoded.dataUser.typeUser);
      }
    })
  }

  render() {
    let {logOut} = this.state;

    return (
      <div>
      { logOut === true ?
        (
          <Grid container className="margin" >
            <Grid item xs={1} sm={3} md={3} lg={4} >
            </Grid>
            <Grid item xs={10} sm={6} md={6} lg={4} >
              <Card aling="center">
                <CardContent>
                  <Typography className="margin" align="center" variant="body2" >
                    <p> Su sesión ya expiró </p>
                    <Link id="raised-button-file" to='/'>
                        <Button variant="raised" color="primary" style={styles.button}>
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
            <HeaderMain authenticate={this.props.authenticate}/>
              <div style={{marginTop:'2%', marginRight:'5%',marginLeft:'5%', marginBottom:'5%'}}  >
                <ListOfButtons/>
              </div>

              <div style={{marginRight:'5%',marginLeft:'5%', marginBottom:'5%'}}  >
                < RegisterForm />
                < DateForm />
                < ListForm />
                < HourForm />
              </div>

              <div style={{marginRight:'5%',marginLeft:'5%', marginBottom:'5%'}}  >
                < DeleteAccount />
              </div>

          </div>

        )
      }
      </div>
    );
  }
}
export default UserPage;
