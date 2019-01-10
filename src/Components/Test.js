import React, { Component } from 'react';

class Test extends Component{
    constructor(props){
        super(props)
        this.state ={
            reqType:"POST",
            url:"basic"
        }
        this.updateSelect = this.updateSelect.bind(this);
    }
    updateSelect(e){
        this.setState({
            reqType:e.target.value
        })
    }

    render(){
        return(
        <div className=" container">
            <div className="form-group">
            <label for="exampleFormControlSelect1">Select Request Type</label>
            <select className="form-control" id="formcontromselect" onChange = {this.updateSelect} value={this.state.reqType}>
                <option>GET</option>
                <option>POST</option>
                <option>PATCH</option>
                <option>PUT</option>
                <option>DELETE</option>
            </select>
            <label for="exampleFormControlTextarea1">URL</label>
                <textarea className="form-control" id="textarea" rows="3"></textarea>
                <button className="btn btn-lg btn-primary btn-block" type="submit" id="sub">Send</button>
            </div>
        </div>
        )
    }
}

export default Test;