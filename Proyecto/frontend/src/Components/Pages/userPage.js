import React, { Component } from 'react';
import './../../App.css';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class userPage extends Component {
  render() {
    return (
      <Grid container alignItems="center" className="margin" >
        <Grid item xs={1} sm={3} md={3} lg={4} >
        </Grid>

        <Grid item xs={10} sm={6} md={6} lg={4} >
          <Card aling="center">
            <CardContent>
              <Typography style={{marginTop:'5%'}}align="center" variant="body2" >
                USER PAGE
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
