import React from 'react'
import axios from 'axios';
import urls from '../backendurls'
import {Badge,Button,Input} from 'reactstrap'
class AssignmentsQues extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:'',
            quesList:'',
            title:'',
            creator:'',
            newques:''
        }
        this.renderQues = this.renderQues.bind(this)
        this.addQues = this.addQues.bind(this)
        this.updateValue = this.updateValue.bind(this)
    }
    renderQues(){

        return this.state.quesList.map(question => (<div key={question.id}><h3>{this.extractTitle.bind(this,question.url)()}</h3> <Button color="primary" onClick={this.changeWindow.bind(this,{id:question.id,url:question.url})} size="sm" >Try</Button></div>))
    }
    extractTitle(data){
        var str = ''
        var lastIndex = data.lastIndexOf("/")
        var cIndex = data.indexOf("challenges")
        if(data.indexOf("hackerrank")!==-1)
            str="hackerank "
        return str+data.substring(cIndex+11,lastIndex)
        
    }
    addQues(){
            axios.post(urls.assignmentsList+"/"+this.state.id+"/questions",{
                url:this.state.newques
            },{
                headers:{"Authorization": "JWT " + this.props.token}
            }).then((response)=>{
                    this.setState({
                        quesList: [...this.state.quesList, response.data],
                        newques:''
                    })
            })
            .catch((error)=>{
                console.log(error)
            })
            
    }
    updateValue(e){
        this.setState({
            newques:e.target.value
        })
    }
    changeWindow(data){
        axios.get(urls.apiquestionsLink+data.id,{
                headers: {
                    "Authorization": "JWT " + this.props.token
                }
            })
        .then((response)=>{
            window.open(response.data.url)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        axios.get(urls.assignmentsList+"/"+this.props.match.params.id,
            {headers:{"Authorization":"JWT "+this.props.token}})
        .then((response)=>{
            console.log(response)
               this.setState({
                   title:response.data.title,
                   creator:response.data.created_by.name,
                   quesList:response.data.questions,
                   staff: response.data.created_by.is_staff,
                   admin: response.data.created_by.is_admin,
                   id:response.data.id
               })
        })
        .catch((error)=>{
            console.log(error)
        })


    }
    render(){
        return (<div> 
            <div className="titlediv">
                <h2>{this.state.title}</h2>
                <h5>Created by <Badge color="secondary">{this.state.creator}</Badge></h5>
            </div>
            <div className="questions">
                {this.state.quesList!==''&&this.renderQues()}
            </div>

                {(this.state.staff||this.state.admin)&&(
                    <>
                <Input placeholder="username" value={this.state.newques} onChange={this.updateValue}/>
                <Button color="primary" onClick={this.addQues}>add div</Button>
                </>)}
                

        </div>)
    }
}

export default AssignmentsQues