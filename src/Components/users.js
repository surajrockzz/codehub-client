import React from 'react'
import './users.css'
import urls from './backendurls.js'
import Card from './Card.js'

class users extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:urls.sampledata
        }
        this.renderContent = this.renderContent.bind(this)
        
    }
    renderContent(){
     return this.state.list.map(usr => <Card data={usr} />)
    }
    render(){
        return(
        <div className="usersdiv">
            <div className="inputContainer">
                <input type="text"/>
                <button type="button">search</button>
            </div>
            <div className="infContainer">
              {this.renderContent()}
            </div>    
        </div>
            )
    }
}

export default users