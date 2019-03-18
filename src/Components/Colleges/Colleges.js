import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CollegeName from './CollegeName'
import Loading from '../Loading/Loading';


const styles = theme => ({
    
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
  });



class Colleges extends Component{

    constructor(props){
        super(props)
        this.state={
            collegesList:'',
            hkid:'',
            name:'',
            modal: false
        }
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        axios.get("http://localhost:8000/codingcenter/colleges")
        .then((response)=>{
            console.log(response.data)
            this.setState({
                collegesList:response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })

    }
    toggle() {
        if(this.state.hkid!==''&&this.state.name!==''){
        axios.post("http://localhost:8000/codingcenter/colleges",{
            hackerrank_college_id:this.state.hkid,
            name:this.state.name
        }).then((response)=>{
            console.log(response.data)
        })
    }
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render(){
        const { classes } = this.props;
        return(
            <div className="container">
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.toggle}>Add college</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add new  College</ModalHeader>
                <ModalBody>
                <Input type="text" name="assignmentName" id="assignmentName" placeholder="enter hackerrank id" value={this.state.hkid} onChange={this.handleChange}/>
                <Input type="text" name="assignmentName" id="assignmentName" placeholder="college name" value={this.state.name} onChange={this.handleChange}/>
                </ModalBody>
                <ModalFooter>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.toggle}>Submit</Button>{' '}
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
                {this.state.collegesList==''&&<Loading type="bars" color="#000000"/>}
                {this.state.collegesList!=''&&this.state.collegesList.map( (college) => <CollegeName id={college.id} name={college.name}/> )}
                </div>
        )
    }
}

export default withStyles(styles)(Colleges);
