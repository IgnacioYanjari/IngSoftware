import React, {Component} from 'react';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {message} from 'antd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';
import jwt from 'jsonwebtoken';
import chrono from 'chrono-node';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import InfiniteCalendar from 'react-infinite-calendar';
import format from 'date-fns/format';
import {Calendar,defaultMultipleDateInterpolation,withMultipleDates} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import shortid from 'shortid';

const MultipleDatesCalendar = withMultipleDates(Calendar);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

class DateForm extends Component{

  constructor(props){
    super(props);

    this.state = {
      onDisplay:false,
      dates : []
    }
    this.handleChangePicker = this.handleChangePicker.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      if(!err){
        const {typeUser} = decoded.dataUser;
        // Si es Guardia Full-time o Part-Time
        if(typeUser === 1 || typeUser === 2 ){
          this.setState({
            onDisplay : true,
          })
        }
      }
    });
  }

  sendData(){
    message.loading('Esperando respuesta del servidor',1);
    const token = localStorage.getItem('token');
    const {dates} = this.state;
    let param = JSON.stringify({
      dates : dates
    });
    fetch('http://localhost:3000/api/user/add-horario',{
      method: 'POST',
      body : param,
      headers: {
        'authorization' : 'Bearer ' + token,
        'Origin' : 'X-Requested-With',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then( res => {
      message.destroy();
      if(res.success === true){
        localStorage.removeItem('token');
        localStorage.setItem('token',res.token);
        message.success(res.message);
      }else
        message.warning(res.message);
    })
    .catch(err => console.log(err));
  }

  handleChangePicker(){
    this.setState((prevState, props) => {
      return {displayPicker: !prevState.displayPicker};
    });
  }

  renderPicker(){
    const {dates} = this.state,
      minDate = moment().endOf('hour').fromNow(),
      maxDate = moment().endOf('month').fromNow();

    let aux = moment(chrono.parseDate(minDate)).toDate();

    return(
      <InfiniteCalendar
        Component = {MultipleDatesCalendar}
        onSelect = { (selectedDate) =>{
            let aux = defaultMultipleDateInterpolation(selectedDate,dates)
            this.setState({
              dates:aux
            })
            return aux;
          }
        }
        width = {'100%'}
        height = {300}
        minDate = { moment(chrono.parseDate(minDate)).toDate()}
        maxDate = { moment(chrono.parseDate(maxDate)).toDate()}
        interpolateSelection = {defaultMultipleDateInterpolation}
        selected = { this.state.dates}
        keyboardSupport = {true}
      />
    )
  }

  render(){
    const {dates,onDisplay} = this.state;
    return(
      <div>
        { onDisplay ? (
          <Card >
            <CardContent id="seleccionar_horario">
              <Typography align="center" variant="body2" >

                <Typography align="center" variant="title" >
                  Seleccionar Horario
                </Typography>

                <br/>
                <p> Fechas seleccionadas {'( Formato Mes-Dia )'} : </p>
                <List style={flexContainer}>
                  { dates.map( (date,pos) => {
                      return(
                        <ListItem key ={shortid.generate()}>
                          <ListItemText inset
                            primary = { 'Nro : ' + (pos+1).toString()}
                            secondary ={moment(date).format('MM-DD')}/>
                        </ListItem>
                      )
                    })
                  }
                </List>
                <br/>
                {this.renderPicker()}
                <br/>

                <Button onClick = { this.sendData } variant="raised" color="primary" >
                  Guardiar Horario Preferido
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

export default DateForm;
