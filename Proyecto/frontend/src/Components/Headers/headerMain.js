import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {message} from 'antd';
import {Redirect} from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  }
};

class  HeaderMain  extends Component {

  //propiedades estáticas
  static defaultProps = {
    ...Component.defaultProps,
    classes: styles
  }

  constructor(defaultProps){
    super(defaultProps);
    this.state={
      logOut :false
    }
    this.logOut = this.logOut.bind(this);
  }

  logOut(){

    const token = localStorage.getItem('token');
    message.loading('cerrando sesión');
    fetch('http://localhost:3000/api/user/log-out',{
      method: 'POST',
      headers:{
          'authorization' : 'Bearer ' + token,
          'Origin' : 'X-Requested-With',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then( res =>{
      if(res.success){
          this.props.authenticate.signout(()=>{
            message.destroy();
            message.success('sesión cerrada');
            localStorage.removeItem('token');
            this.setState({logOut:true})
          });
      }else
        message.warning(res.message,4);
    })
    .catch(err=>{
      message.destroy();
      console.log(err);
      message.warning('Error en conexión');
    })
  }

  render(){
    const {logOut} = this.state;
    return (
      <div>
      { logOut ? (
          <Redirect to="/" />
        ): (
          <div className={this.props.classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography align="center" variant="title" color="inherit" className={this.props.classes.flex}>
                  {this.props.user}
                </Typography>
                <Button onClick ={this.logOut} color="inherit">Cerrar sesión</Button>
              </Toolbar>
            </AppBar>
          </div>
        )
      }
      </div>

    );
  }

}

HeaderMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderMain);
