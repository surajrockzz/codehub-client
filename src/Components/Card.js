import React from 'react'

class Card extends React.Component{
    constructor(props){
        super(props)
        this.state={
            button:''
        }
    }
    render(){
   return(
        <div className="contentDiv"> 
            <div className="info">
                <p>{this.props.data.name}</p>
                <p>{this.props.data.username}</p>
                <div className="buttonsDiv">
                    <button type="button">Admin</button>
                    <button type="button">Staff</button>
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