import React from 'react'
import axios from 'axios'

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
            <div className="info">
                <p>{this.props.data.name}</p>
                <p>{this.props.data.username}</p>
                <div className="buttonsDiv">
                    {this.state.admin&&<button type="button" id="admin">Admin</button>}
                    {this.state.staff&&<button type="button" id="staff">Staff</button>}
                    {((!this.state.admin&&!this.state.staff)
                    &&this.state.visible)&&
                    (<><button type="button" id="makeAdmin" onClick={this.handleChange}>Make as Admin</button>
                    <button type="button" id="makeStaff" onClick={this.handleChange}>Make as Staff</button></>)
                    }
                </div>
            </div>
            <div className="imagesdiv">
                <img src="https://picsum.photos/100?random" alt="sample" className="imgdim"/>
            </div>
        </div>
   )
    }

}

export default Card