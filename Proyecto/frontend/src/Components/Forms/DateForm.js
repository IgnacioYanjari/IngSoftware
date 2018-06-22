import React, {Component} from 'react';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {message} from 'antd';
import jwt from 'jsonwebtoken';
import chrono from 'chrono-node';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import InfiniteCalendar from 'react-infinite-calendar';
import format from 'date-fns/format';
import {Calendar,defaultMultipleDateInterpolation,withMultipleDates} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once


const MultipleDatesCalendar = withMultipleDates(Calendar);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});


class DateForm extends Component{

  constructor(props){
    super(props);
    const today = new Date();

    this.state = {
      onDisplay:false,
      displayPicker: false,
      dates : [today]
    }
    this.handleChangePicker = this.handleChangePicker.bind(this);
    this.renderTextButton = this.renderTextButton.bind(this);
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


  // sendDate(event){
  //   event.preventDefault();
  //   message.loading('Esperando respuesta del servidor',1);
  // }

  handleChangePicker(){
    this.setState((prevState, props) => {
      return {displayPicker: !prevState.displayPicker};
    });
  }

  renderPicker(){
    const {displayPicker,dates} = this.state,
      minDate = moment().startOf('hour').fromNow(),
      maxDate = moment().endOf('month').fromNow();
    if( !displayPicker)
      return(<div></div>)
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

  renderTextButton(){
    const {displayPicker} = this.state;
    if( !displayPicker)
      return("Iniciar selección de horario")
    return("Finalizar horario")
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

                <p> Fechas elegidas : </p>

                {dates.map( date => <p> {moment(date).format('YYYY-MM-DD')} </p>)}


                <br/>
                <Button onClick ={this.handleChangePicker} variant="raised" color="primary" className={styles.button} >
                  {this.renderTextButton()}
                </Button>

                <br/>
                <br/>
                {this.renderPicker()}

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
