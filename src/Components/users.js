import React from 'react'
import './users.css'
import urls from './backendurls.js'
import Card from './Card.js'
import axios from 'axios'
import jwt from 'jsonwebtoken'

class Users extends React.Component{
    constructor(props){
        super(props)
        var decoded = jwt.decode(this.props.token)
        this.state={
            list:"",
            username:decoded.username
        }
        this.renderContent = this.renderContent.bind(this)
        
    }
    renderContent(){
     return this.state.list.map(usr => <Card data={usr} username={this.state.username} token={this.props.token}/>)
    }

    componentDidMount(){
        axios.get(urls.apiusers,{
                headers:{"Authorization":"JWT "+this.props.token}
        }).then((response)=>{
            this.setState({
                list:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
    render(){
        return(
        <div className="usersdiv">
            <div className="inputContainer">
                <input type="text"/>
                <button type="button">search</button>
            </div>
            <div className="infContainer">
              {this.state.list!==''&&this.renderContent()}
            </div>    
        </div>
            )
    }
}

export default Users