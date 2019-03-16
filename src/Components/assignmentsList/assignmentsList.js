import React from 'react'
import axios from 'axios'
import AssignmentCard from './AssignmentCard'
import urls from '../backendurls'
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import jwt from 'jsonwebtoken'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });


class AssignmentsList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showQues:false,
            assignmentsList:'',
            assignmentName:'',
            modal:false
        }
        this.renderLists = this.renderLists.bind(this);
        this.toggle = this.toggle.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.createAssignment = this.createAssignment.bind(this);
    }
        renderLists(){
            return this.state.assignmentsList.map( assignment =>  <AssignmentCard data={assignment} key={assignment.id}/>)
        }
        toggle() {
            this.setState({
                modal: !this.state.modal
            });
        }
        handleInput(e){
            this.setState({
                assignmentName:e.target.value
            })
        }
        createAssignment(){
            axios.post(urls.assignmentsList,{
                  title:this.state.assignmentName

            },{
                headers:{"Authorization": "JWT " + this.props.token}
            })
            .then((response)=>{
                    if(response.status > 199){
                        window.location="/assignments/"+response.data.id;
                    }
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        render(){
            const { classes } = this.props;
            const token = jwt.decode(this.props.token)
            const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
            return(<div>
                <div className="container">
                   <input type="text"/>
                    <Button type="button">search</Button>
                   {(token.is_admin||token.is_staff)&&<Button variant="contained" color="secondary" className={classes.button} onClick={this.toggle}>add</Button> }
                </div>
                <div className="assignmentList">
                {this.state.showQues && this.renderLists()}
                </div>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>Create New Assignment</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="assignmentName">Name</Label>
                            <Input type="text" name="assignmentName" id="assignmentName" placeholder="new assignment" value={this.state.assignmentName} onChange={this.handleInput}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.createAssignment}>Create</Button>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


            </div>)
        }
        componentDidMount(){
            axios.get(urls.assignmentsList,{
                headers:{'Authorization': "JWT "+window.localStorage.getItem("JWT")}
        })
            .then((response) => {
                        this.setState({
                            showQues: !this.state.showQues,
                            assignmentsList: response.data
                        })
                    console.log(this.state.assignmentsList)
            })
            .catch(function(error){
                console.log(error)
            })
        }
}

export default withStyles(styles)(AssignmentsList);
