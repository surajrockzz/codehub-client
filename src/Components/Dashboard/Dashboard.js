import React from 'react';
import Table from './TablePaginationActions/TablePaginationActions'

class Dashboard extends React.Component{
    render(){
        if(this.props.token!=null){
            if(this.props.match.params.id === undefined){
                return(
                    <div class = "container">
                        <h1>Assignments</h1>
                        <Table hright="assignments" hleft="Attempted" allassignments = {true} />
                    </div>
                )
            }
            else{
                return(
                <div class = "container">
                        <h1>Assignment name</h1>
                        <Table hright="username"  hleft="status" allassignments = {false} assign_id ={this.props.match.params.id}/>
                    </div>
                )
                }
        }
        else{
            return(
                <div>
                   <h1>Unauthorised route</h1>
                </div>
            )
            
        }
    }
}

export default Dashboard