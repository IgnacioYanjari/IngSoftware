import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import { Row, Col } from 'antd';
import Typography from 'material-ui/Typography';
import jwt from 'jsonwebtoken';
import Button from '@material-ui/core/Button';


class ListOfButtons extends Component{
  constructor(props){
    super(props);
    this.state = {
      onDisplay:0
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      if(!err){
        const {typeUser} =  decoded.dataUser;
        this.setState({
          onDisplay : typeUser
        })
      }
    });
  }


  renderTypeJefeGuardia(){
    return(
      <Card aling="center">
        <Row>

          <Col span={12}>
            <CardContent>
              <Typography align="center"  >
                <a href='#generar_horario'>
                  <Button variant="raised" color="primary" >
                    Generar Horario
                  </Button>
                </a>

                <br/>
                <br/>
                <a href='#revisar_horario'>
                  <Button variant="raised" color="primary"  >
                    Revisar Horario
                  </Button>
                </a>
              </Typography>
            </CardContent>
          </Col>

          <Col span={12}>
            <CardContent>
              <Typography align="center"  >
                <a href='#ver_horas'>
                  <Button variant="raised" color="primary">
                    Ver horas
                  </Button>
                </a>
                <br/>
                <br/>

                <a href='#gestionar_implementos'>
                  <Button variant="raised" color="primary" >
                    Gestionar implementos
                  </Button>
                </a>
              </Typography>

            </CardContent>
          </Col>
        </Row>

        <Row>
          <Col span={8}>  </Col>
          <Col span={8}>
            <Typography align="center" >
              <a href='#pasar_guardias'>
                <Button variant="raised" color="secondary">
                  Supervisar Asistencia
                </Button>
              </a>
            </Typography>
          </Col>
          <Col span={8}>  </Col>
        </Row>
        <br/>
      </Card>
    )
  }

  renderTypeGuardia(){
    return(
      <Card aling="center">
        <Row>
          <Col span={12}>
            <CardContent>
              <Typography align="center"  >
                <a href='#seleccionar_horario'>
                  <Button variant="raised" color="primary" >
                    Seleccionar Horario
                  </Button>
                </a>
                <br/>
                <br/>
                <a href='#'>
                  <Button variant="raised" color="primary">
                    Revisar Horario
                  </Button>
                </a>
              </Typography>
            </CardContent>
          </Col>

          <Col span={12}>
            <CardContent>
              <Typography align="center" >
                <a href='#'>
                  <Button variant="raised" color="primary" >
                    Ver Horas
                  </Button>
                </a>
                <br/>
                <br/>
                <a href='#'>
                  <Button variant="raised" color="secondary" >
                    Notificar Asistencia
                  </Button>
                </a>
              </Typography>
            </CardContent>
          </Col>
        </Row>
      </Card>
    )
  }

  renderTypeAdmin(){

    return(
      <Card >
        <Row>

          <Col span={12}>
            <CardContent>
              <Typography align="center"  >
                <a href='#registrar'>
                  <Button variant="raised" color="primary">
                    Crear Cuenta
                  </Button>
                </a>
              </Typography>
            </CardContent>

          </Col>

          <Col span={12}>
            <CardContent>
              <Typography align="center"  >
                <a href='#borrar'>
                  <Button variant="raised" color="primary" >
                    Borrar Cuenta
                  </Button>
                </a>
              </Typography>
            </CardContent>
          </Col>
        </Row>
      </Card>
    );
  }

  renderRRHH(){
    return(
      <Card>
        <Row>
          <Col span={8}>  </Col>
          <Col span={8}>
            <CardContent>
              <Typography align="center" >
                <a href='#consultar_horas_trabajadas'>
                  <Button variant="raised" color="primary">
                    Consultar Horas Trabajadas
                  </Button>
                </a>
              </Typography>
            </CardContent>
          </Col>
          <Col span={8}>  </Col>
        </Row>
      </Card>
    )
  }

  renderMain(){
    const {onDisplay} = this.state;

    // ningún tipo
    if( onDisplay === 0)
      return( <div> </div>);

    // Tipo Administrador.
    if( onDisplay === 5)
      return this.renderTypeAdmin();

    // Tipo Guardia Full-Time o Guardia Part-Time.
    if( onDisplay === 1 || onDisplay === 2)
      return this.renderTypeGuardia();

    // Tipo RRHH
    if( onDisplay === 4)
      return this.renderRRHH();

    // Tipo Jefe guardias
    if( onDisplay === 3)
      return this.renderTypeJefeGuardia();

  }

  render(){
    return(
      <div>
        {this.renderMain()}
      </div>
    )
  }
}

export default ListOfButtons;
