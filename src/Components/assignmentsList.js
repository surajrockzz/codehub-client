import React from 'react'
import axios from 'axios'
import AssignmentCard from './AssignmentCard'
import urls from './backendurls'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';


class assignmentsList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showQues:false,
            assignmentsList:''
        }
        this.renderLists = this.renderLists.bind(this);
        this.addModal = this.addModal.bind(this)
    }
        renderLists(){
            return this.state.assignmentsList.map( assignment =>  <AssignmentCard data={assignment}/>)
        }
        render(){
            return(<div>
                <div className="assignmentSearch">
       start edit here              <input type="text"/>    
                    <button type="button">search</button>
                    <button type="button" onClick={this.addModal}>add</button>
                </div>
                <div className="assignmentList">
                {this.state.showQues && this.renderLists()}
                </div>
                
            </div>)
        }
        componentDidMount(){
            axios.get(urls.assignmentsList)
            .then((response)=>{
                this.setState({
                showQues:!this.state.showQues,
                assignmentsList:response.data
            })
        })
            .catch(function(error){
                console.log(error)
            })
        }

}

export default assignmentsList