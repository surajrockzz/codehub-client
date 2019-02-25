import React from 'react';
import Table from './TablePaginationActions/TablePaginationActions'
import UsersEdit from './UsersEdit/UsersEdit'
class Dashboard extends React.Component{
    render(){
        if(this.props.token!=null){
            return(
                <div>
                    <h1>tablename</h1>
                    <Table/>
                    <UsersEdit/>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1>tablename</h1>
                    <Table/>
                    <UsersEdit/>
                </div>
            )
            
        }
    }
}

export default Dashboard