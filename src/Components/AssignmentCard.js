import React from 'react'

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
            <h3>{this.props.data.title}</h3>
            <h4>{this.props.data.owner}</h4>
        </div>
   )
    }

}

export default AssignmentCard