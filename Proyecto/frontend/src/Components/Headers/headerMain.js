import React,{Component} from 'react';
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
    marginLeft:'10px'
  },
  iconMenu: {
    marginLeft:'40px',
    marginRight: '20px',
    marginBottom:'10px'
  },
  image : {
    maxWidth:100,
  }
};

class  HeaderMain  extends Component {

  constructor(props){
    super(props);
    this.state={
      logOut :false
    }
    this.logOut = this.logOut.bind(this);
  }

  logOut(){

    const token = localStorage.getItem('token');
    message.loading('cerrando sesión',1000);
    fetch('http://localhost:3000/api/user/log-out',{
      method: 'POST',
      headers:{
          'authorization' : 'Bearer ' + token,
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then( res =>{
      if(res.success === true){
          this.props.authenticate.signout(()=>{
            message.destroy();
            message.success('sesión cerrada');
            localStorage.removeItem('token');
            this.setState({logOut:true})
          });
      }else{
        localStorage.removeItem('token');
        this.setState({logOut:true})
        message.warning(res.message,4);
      }
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
          <div style={styles.root}>
            <AppBar position="static" color="inherit">
              <Toolbar>
              <Typography style={styles.iconMenu} >
              <img style={styles.image} src="./logoAlfaChile.jpg" alt="Logo-Empresarial"/>
              </Typography>


                <Typography align="right" variant="title" color="inherit" style={styles.flex}>
                  <Button onClick ={this.logOut} color="inherit" style={styles.flex} >Cerrar sesión</Button>
                </Typography>

              </Toolbar>
            </AppBar>
          </div>
        )
      }
      </div>
    );
  }

}


export default HeaderMain;
