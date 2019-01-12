import React from 'react'
import axios from 'axios'
import AssignmentCard from './AssignmentCard'
import urls from './backendurls'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import jwt from 'jsonwebtoken'

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
        //this.addModal = this.addModal.bind(this)
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
            const token = jwt.decode(this.props.token)
            const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
            return(<div>
                <div className="assignmentSearch">
                   <input type="text"/>    
                    <button type="button">search</button>
                   {(token.is_admin||token.is_staff)&& <button type="button" onClick={this.addModal}>add</button>}
                </div>
                <div className="assignmentList">
                {this.state.showQues && this.renderLists()}
                </div>
                <Button color="danger" onClick={this.toggle}>modal</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>Create New Assignment</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="assignmentName">Name</Label>
                            <Input type="text" name="assignmentName" id="assignmentName" placeholder="new assignment" value={this.state.assignmentName} onChange={this.handleInput}/>
                        </FormGroup>
          </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createAssignment}>Create</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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

export default AssignmentsList