import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from "@material-ui/core/Checkbox";
import Paper from '@material-ui/core/Paper';
import Typography from 'material-ui/Typography';
import { Row, Col } from 'antd';
import Button from '@material-ui/core/Button';
import {message} from 'antd';

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 17,
    textAlign:'center',
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
		marginTop: theme.spacing.unit * 3
	},

	tableBodyRow: {
		//Small Screen
		display: "block",
		height: "auto",
		marginTop: 10,
		backgroundColor: "lightgrey",

        [theme.breakpoints.up("sm")]: {
        	height: 48,
        	display: "table-row",
        	border: 0,
        	backgroundColor: "#ffffff"
        }
	},

	tableBodyData: {
		display: "block",
		padding: 12,
		fontSize: 14,
		textAlign: "right",
		border: 0,

		// Adding each data table head from here
		"&:before": {
			content: "attr(datatitle)",
			float: "left",
			fontWeight: 600,
			color: "#00000"
		},

        [theme.breakpoints.up("sm")]: {
        	display: "table-cell",
        	padding: "20px 24px",
        	fontSize: 14,
        	textAlign: "left",
        	borderBottom: "1px solid #ccc",

        	"&:before": {
        		content: "",
        		display: "none"
        	}
        }
	}
});

let id = 0;
function createData(name) {
  id += 1;
  return { id, name };
}

class  CustomizedTable extends Component {
  constructor(props){
    super(props);
    this.onChangeBox = this.onChangeBox.bind(this);
    this.state={
      data:[],
      checked:[]
    }
  }

  componentDidMount(){

    message.loading('Esperando respuesta del servidor',100);
    const token = localStorage.getItem('token');
    let param = {}
    fetch('http://localhost:3000/api/user/get-listaGuardias',{
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
      console.log(res)
      message.destroy();
      if(res.success === true ){
        localStorage.remove('token');
        localStorage.setItem('token',res.token);
        this.createDataList(res.data);
        message.success(res.message,10);
      }else
        message.warning(res.message,10);
    })

  }

  createDataList(data){
    let arr = [],
      checked = [];
    for( let name of data){
      arr.push(createData(name));
      checked.push(false);
    }
    this.setState({
      data : arr,
      checked : checked
    });
  }

  sendList(){
    const {checked, data} = this.state;
    let posArray = [];
    for( let i in checked){
      if( checked[i] )
        posArray.push( parseInt(i) );
    }

    let jsonObject = {}, cnt = 0;
    for( let elem of posArray){
      jsonObject[cnt] = data[elem];
      cnt++;
    }

    console.log(jsonObject);
  }

  onChangeBox(i){
    this.setState((prevState,props)=>{
      let aux = prevState.checked;
      aux[i] = !aux[i];
      return { checked : aux}
    })
  }

  renderTable(classes){
    const { data, checked } = this.state;
    return(
      data.map ( Guard => {
        return (
          <TableRow className={classes.row} key={Guard.id}>
            <CustomTableCell >
              <Row>

                <Col span={8}>
                  <Checkbox id={Guard.id.toString()} color="primary"
                    onChange = {() => this.onChangeBox(Guard.id-1)}
                    checked = { checked[Guard.id-1] } />
                </Col>

                <Col span={8} style={{marginTop:'10px'}}>
                  <Typography align="center">
                    <label htmlFor = {Guard.id.toString()}> {Guard.name} </label>
                  </Typography>
                </Col>

                <Col span={8}></Col>

              </Row>
            </CustomTableCell>
          </TableRow>
        );
      })
    )
  }


  render(){
    const {classes} = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell> Nombre Guardia </CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.renderTable(classes)}
            </TableBody>
          </Table>
        </Paper>
        <br/>
        <Typography align="center">
          <Button  onClick = {() => this.sendList()} variant="raised"
              color="primary"  >
            Terminar Paso de lista
          </Button>
        </Typography>
      </div>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
