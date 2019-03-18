import React from 'react';
import Table from './TablePaginationActions/TablePaginationActions'

class Dashboard extends React.Component{
    render(){
        if(this.props.token!=null){
            return(
                <div>
                    <h1>Assignments</h1>
                    <Table/>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1>Assignments</h1>
                    <Table/>
                    
                </div>
            )
            
        }
    }
}

export default Dashboard