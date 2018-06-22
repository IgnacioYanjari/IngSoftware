import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {Button} from 'material-ui';
import Card, {CardContent,CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {message} from 'antd';
import jwt from 'jsonwebtoken';

class HourForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      onDisplay:false
    }
    this.sendAccount = this.sendAccount.bind(this);
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
      if(!err && decoded.dataUser.typeUser === 4){
        this.setState({
          onDisplay : true
        })
      }
    });
  }

  sendAccount(event){
    event.preventDefault();
    // message.loading('Esperando respuesta del servidor',1);
    // const token = localStorage.getItem('token');
    // const {rut} = this.state;
    // let param = JSON.stringify({
    //   rut : rut
    // });
    // fetch('http://localhost:3000/api/user/delete-account',{
    //   method: 'POST',
    //   body : param,
    //   headers: {
    //     'authorization' : 'Bearer ' + token,
    //     'Origin' : 'X-Requested-With',
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then( res => res.json())
    // .then( res => {
    //   message.destroy();
    //   // console.log(res);
    //   if(res.success === true){
    //     message.success('Cuenta Borrada Correctamente');
    //   }else
    //     message.warning(res.message);
    // })
    // .catch(err => console.log(err));
  }

  render(){
    const {onDisplay} = this.state;
       return(
         <div>
           { onDisplay ?
           (
             <Card >
               <CardContent id="consultar_horas_trabajadas">
                 <Typography align="center" variant="body2" >

                   <Typography align="center" variant="title" >
                     Consultar Horas Trabajadas
                   </Typography>

                   <form action="" method="" style={{display: 'flex',flexWrap: 'wrap'}}
                     onSubmit={this.sendAccount}>

                     <TextField
                       type="text"
                       label="   RUT ( Sin guión ni puntos)"
                       margin="normal"
                       fullWidth
                       required
                     />

                     <CardActions>
                       <Button type="submit"  size="small" color="primary">
                         Obtener Horas trabajadas
                       </Button>
                     </CardActions>

                   </form>
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

export default HourForm;


// import React, {Component} from 'react';
// import TextField from 'material-ui/TextField';
// import {Button} from 'material-ui';
// import Card, {CardContent,CardActions} from 'material-ui/Card';
// import Typography from 'material-ui/Typography';
// import {message} from 'antd';
// import jwt from 'jsonwebtoken';
//
// class RegisterForm extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       onDisplay:false
//     }
//     this.sendAccount = this.sendAccount.bind(this);
//   }
//
//   componentDidMount(){
//     const token = localStorage.getItem('token');
//     jwt.verify(token, 'L;/Pr$Pb`~mvsC', (err, decoded) => {
//       if(!err && decoded.dataUser.typeUser === 4){
//         this.setState({
//           onDisplay : true
//         })
//       }
//     });
//   }
//
//   handleChange(event){
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     this.setState({
//       [name] : value
//     });
//   }
//
//   sendAccount(event){
//     event.preventDefault();
//   }
//
//   render(){
//     const {onDisplay} = this.state;
//     return(
//       <div>
//         { onDisplay ?
//         (
//           <Card >
//             <CardContent id="consultar_horas_trabajadas">
//               <Typography align="center" variant="body2" >
//
//                 <Typography align="center" variant="title" >
//                   Consultar Horas Trabajadas
//                 </Typography>
//
//                 <form action="" method="" style={{display: 'flex',flexWrap: 'wrap'}}
//                   onSubmit={this.sendAccount}>
//
//                   <TextField
//                     value = {this.state.rut}
//                     name="rut"
//                     type="text"
//                     label="Rut ( Sin guión ni puntos)"
//                     margin="normal"
//                     fullWidth
//                     required
//                     onChange = {e => this.handleChange(e)}
//                   />
//
//                   <CardActions>
//                     <Button type="submit"  size="small" color="primary">
//                       Obtener Horas trabajadas
//                     </Button>
//                   </CardActions>
//
//                 </form>
//               </Typography>
//             </CardContent>
//           </Card>
//         ) : (
//           <div> </div>
//         )}
//
//       </div>
//     )
//   }
// }
//
// export default RegisterForm;
