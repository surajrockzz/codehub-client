import React from 'react'
import './users.css'
import urls from './backendurls.js'

class ContentDiv extends React.Component{
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
                <p>suraj</p>
                <p>suraj penugonda</p>
                <div className="buttonsDiv">
                    <button type="button">Admin</button>
                    <button type="button">Staff</button>
                </div>
            </div>
            <div className="imagesdiv">
                <img src="https://picsum.photos/100?random" className="imgdim"/>
            </div>
        </div>
   )
    }

}

class users extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:''
        }
        this.renderContent = this.renderContent.bind(this)
    }
    renderContent() {
         return 
    }
    render(){
        return(
        <div className="usersdiv">
            <div className="inputContainer">
                <input type="text"/>
                <button type="button">search</button>
            </div>
            <div className="infContainer">
              <ContentDiv/>
            </div>    
        </div>
            )
    }
}

export default users