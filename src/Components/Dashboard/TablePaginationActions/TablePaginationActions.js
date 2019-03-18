import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import Loading from '../../Loading/Loading'

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

  

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: ''
  };

  componentDidMount(){
    Axios.get("http://localhost:8000/codingcenter/dashboard?assignment_id=1")
    .then((response)=>{
      console.log(response)
     this.setState({
       rows: response.data
     })
    })
    .catch((err)=> console.log(err))
   }


  render() {
    const { classes } = this.props;
    const { rows} = this.state;

    return (
      <div className = "container">
      {rows===''&&<Loading type="bars" color="#000000"/>}
      {rows !==''&&
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Assignment</TableCell>
                <TableCell align="center">Attempted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {rows!==''&&rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>  
                  <TableCell align="center">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
      }
      </div>
              
    );
  }
}

export default withStyles(styles)(CustomPaginationActionsTable);