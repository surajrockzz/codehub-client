import React from 'react'
import {Link} from 'react-router-dom'
class AssignmentCard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            button:''
        }
    }
    render(){
   return(
        <div className="contentDiv"> 
           <Link to={`/assignments/${this.props.data.id}`} key={this.props.data.id}> <h3>{this.props.data.title}</h3></Link>
            <h4>{this.props.data.owner}</h4>
        </div>
   )
    }

}

export default AssignmentCard