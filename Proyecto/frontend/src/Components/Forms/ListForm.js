import React, {Component} from 'react';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from '@material-ui/core/Button';
import jwt from 'jsonwebtoken';

import ListOfSecurityGuard from './../Raw/TableOfSecurityGuard.js';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class ListForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      onDisplay:false,
      displayList: true
    }
    this.handleChangePicker = this.handleChangePicker.bind(this);
    this.renderTextButton = this.renderTextButton.bind(this);

  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      if(!err){
        const {typeUser} = decoded.dataUser;
        // Solo si es Jefe de guardias
        if(typeUser === 3){
          this.setState({
            onDisplay : true,
          })
        }
      }
    });
  }

  handleChangePicker(){
    this.setState((prevState, props) => {
      return {displayList: !prevState.displayList};
    });
  }

  renderList(){
    const {displayList} = this.state;
    if(!displayList)
      return(<div></div>)

    return(<ListOfSecurityGuard data={[]}/>)
  }

  renderTextButton(){
    const {displayList} = this.state;
    if( !displayList)
      return("Mostrar Lista")
    return("Ocultar Lista")
  }


  render(){
    const {onDisplay} = this.state;
    return(
      <div>
        { onDisplay ? (
          <Card >
            <CardContent id="pasar_guardias">
              <Typography align="center" variant="title" >
                  Supervisar asistencia
              </Typography>

              <br/>
              <Typography align="center" >
                  <Button onClick ={this.handleChangePicker} variant="raised" color="primary" className={styles.button} >
                    {this.renderTextButton()}
                  </Button>
              </Typography>

              {this.renderList()}

            </CardContent>
          </Card>
        ) : (
          <div> </div>
        )}
      </div>
    )
  }
}

export default ListForm;