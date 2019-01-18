import React from 'react'
import axios from 'axios'
import {Badge} from 'reactstrap'

class Card extends React.Component{
    constructor(props){
        super(props)
        this.state={
            button:'',
            admin:this.props.data.is_admin,
            staff: this.props.data.is_staff,
            visible:true
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        if (e.target.id === "makeAdmin") {
            axios.put("http://localhost:8000/admin/users/" + this.props.data.username, {
                is_admin: true,
                is_staff: false
            }, {
                headers: {
                    "Authorization": "JWT " + this.props.token
                }}).then((response) => {
                    console.log(response)
                    if(response.status === 202){
                this.setState({
                    admin: response.data.is_admin,
                    visible:false
                })
            }
            }).catch((error) => {
                console.log(error)
            })
        } else if (e.target.id === "makeStaff") {
            axios.put("http://localhost:8000/admin/users/" + this.props.data.username, {
                is_admin: false,
                is_staff: true
            },{headers:{"Authorization":"JWT "+this.props.token}}).then((response) => {
                if(response.status === 202){
                this.setState({
                    staff: response.data.is_staff,
                    visible:false
                })
            }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    render(){
   return(
        <div className="contentDiv"> 
             <div className="imagesdiv">
                <img src="https://via.placeholder.com/150" alt="sample" className="imgdim"/>
            </div>
            <div className="info">
                <h3 id="cname">{this.props.data.name}</h3>
                <h3 id="cusername">{this.props.data.username}</h3>
                <div className="buttonsDiv">
                    {this.state.admin&&<Badge id="admin" color="success"><i className="fas fa-user-edit"></i>Admin</Badge>}
                    {this.state.staff&&<Badge id="staff" color="success"><i className="fas fa-user"></i>Staff</Badge>}
                    {((!this.state.admin&&!this.state.staff)
                    &&this.state.visible)&&
                    (<><button type="button" id="makeAdmin" onClick={this.handleChange}><i className="fas fa-user-edit"></i>Make as Admin</button>
                    <button type="button" id="makeStaff" onClick={this.handleChange}><i className="fas fa-user"></i>Make as Staff</button></>)
                    }
                </div>
            </div>
           
        </div>
   )
    }

}

export default Card