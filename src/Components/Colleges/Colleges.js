import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        return(
            <div>
                <Button color="danger" onClick={this.toggle}>Add College</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <input type="text" placeholder="enter hackerrank id" name="hkid" value={this.state.hkid} onChange={this.handleChange}/>
                    <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.handleChange}/>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
                {this.state.collegesList!=''&&this.state.collegesList.map( (college) => <h3> <Link to ={`/colleges/${college.id}`}>{college.name}</Link></h3> )}
                </div>
        )
    }
}


export default Colleges