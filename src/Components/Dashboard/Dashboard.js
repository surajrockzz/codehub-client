import React from 'react';

class Dashboard extends React.Component{
    render(){
        if(this.props.token!=null){
            return(
                <div>DashbOard  {this.props.token}</div>
            )
        }
        else{
            window.location = '/login'
        }
    }
}

export default Dashboard