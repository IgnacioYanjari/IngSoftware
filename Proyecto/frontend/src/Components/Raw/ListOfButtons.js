import React, { Component } from 'react';
import './../../App.css';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import jwt from 'jsonwebtoken';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});


class ListOfButtons extends Component{
  constructor(props){
    super(props);
    this.state = {
      onDisplay:false
    }
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


  render(){
    const {onDisplay} = this.state;
    return(
      <div>
        { onDisplay ?
        (
          <Card aling="center">
            <CardContent>
              <Typography align="center" variant="body2" >
                <Button variant="raised" color="primary" className={styles.button} href='#register'>
                  Crear Cuenta
                </Button>
                <br/>
                <br/>
                <Button variant="raised" color="primary" className={styles.button} href='#delete'>
                  Borrar Cuenta
                </Button>
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

export default ListOfButtons;
