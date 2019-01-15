import React, { Component } from 'react';
import {Label,Input,Button} from 'reactstrap';
import axios from 'axios'

class Test extends Component{
    constructor(props){
        super(props)
        this.state ={
            reqType:"POST",
            urltextArea:'',
            datatextArea:''
        }
        this.updateState = this.updateState.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    updateState(e){
        if (e.target.id === "requestType"){
        this.setState({
            reqType:e.target.value
        })
        }
        else if (e.target.id === "urltextarea"){
          this.setState({
             urltextArea: e.target.value
          })
        }
        else if (e.target.id === "datatextarea") {
            this.setState({
                datatextArea: e.target.value
            })
        }
    }

    handleClick(){
        axios({
            method: this.state.reqType,
            url: this.state.urltextArea,
            data: this.state.datatextArea!==''&&JSON.parse(this.state.datatextArea),
            headers:{"Authorization":"JWT "+this.props.token}
        }).then((response)=>{
            console.log(response.data)
        }).catch((err)=>{
        console.log(err)})

    }



    render(){
        return(
        <div className=" container">
            <div className="form-group">
            <Label for="requestType">Select Request Type</Label>
            <select className="form-control" id="requestType" onChange = {this.updateState} value={this.state.reqType}>
                <option>GET</option>
                <option>POST</option>
                <option>PATCH</option>
                <option>PUT</option>
                <option>DELETE</option>
            </select>
                <Label for="urltextarea">URL</Label>
                <Input className="form-control" id="urltextarea" rows="3" value={this.state.urltextArea}type="textarea" onChange={this.updateState}></Input>
                <Label for="datatextarea">Data</Label>
                <Input className="form-control" id="datatextarea" rows="3" type="textarea" value={this.state.datatextArea} onChange={this.updateState}></Input>
                <Button className="primary" id="sub" onClick={this.handleClick}>Send</Button>
            </div>
        </div>
        )
    }
}

export default Test;