import React, { Component } from 'react';
import './../../App.css';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import jwt from 'jsonwebtoken';

class userPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      rut : '',
      email : ''
    }
  }

  componentDidMount(){
    const token = this.props.token;
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      this.setState({rut:decoded.dataUser.rut, email : decoded.dataUser.email})
    });
  }

  render() {
    let {rut,email} = this.state;
    return (
      <Grid container alignItems="center" className="margin" >
        <Grid item xs={1} sm={3} md={3} lg={4} >
        </Grid>

        <Grid item xs={10} sm={6} md={6} lg={4} >
          <Card aling="center">
            <CardContent>
              <Typography style={{marginTop:'5%'}} align="center" variant="body2" >
                <p> rut : {rut} </p>
                <p> email : {email} </p>
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
// <LockIcon style={{ fontSize: 30 }}/>
export default userPage;
