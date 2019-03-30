import React from 'react'
import axios from 'axios';
import urls from '../backendurls'
import {Badge,Input} from 'reactstrap'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loading from '../Loading/Loading'
import {Redirect} from 'react-router-dom'
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });


class AssignmentsQues extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:'',
            quesList:'',
            title:'',
            creator:'',
            newques:'',
            dashboardclick:false
        }
        this.renderQues = this.renderQues.bind(this)
        this.addQues = this.addQues.bind(this)
        this.updateValue = this.updateValue.bind(this)
        this.handleDashboard = this.handleDashboard.bind(this)
    }
    renderQues(){
        const {classes} = this.props
        return this.state.quesList.map(question => (<div key={question.id} className="contentDiv"><h3>{this.extractTitle.bind(this,question.url)()}<Button variant="contained" color="primary" className={classes.button} onClick={this.changeWindow.bind(this,{id:question.id,url:question.url})} size="sm" >Try</Button></h3> </div>))
    }
    extractTitle(data){
        var str = ''
        var lastIndex = data.lastIndexOf("/")
        var cIndex = data.indexOf("challenges")
        if(data.indexOf("hackerrank")!==-1)
            str="hackerank "
        return str+data.substring(cIndex+11,lastIndex)
        
    }
    handleDashboard(){
        console.log("clicked")
       this.setState({
        dashboardclick:true
       })
    }
    addQues(){
            axios.post(urls.assignmentsList+"/"+this.state.id+"/questions",{
                url:this.state.newques
            },{
                headers:{"Authorization": "JWT " + this.props.token}
            }).then((response)=>{
                    console.log(response.data)
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
        if (this.state.dashboardclick === true) {
            return <Redirect to={`/dashboard/${this.state.id}`} />
          }
        const { classes } = this.props
        return (
        <div class = "container"> 
            <div className="titlediv">
                <div className="HeadingDiv">
                    <h2>{this.state.title}</h2>
                    <h5>Created by <Badge color="secondary">{this.state.creator}</Badge></h5>
                </div>
                <div className="DashboardDiv">
                    <Button variant="contained" color="primary" onClick={this.handleDashboard} className={classes.button}>Dashboard</Button>
                </div>
            </div>
        
            <div className="questions">
                {this.state.quesList===''&&<Loading type="bars" color="#000000"/>}
                {this.state.quesList!==''&&this.renderQues()}
            </div>
                {(this.state.staff||this.state.admin)&&(
                    <>
                <Input placeholder="paste url" value={this.state.newques} onChange={this.updateValue}/>
                <Button variant="contained" color="primary" onClick={this.addQues} className={classes.button}>New Question</Button>
                </>)}
        </div>)
    }
}

export default withStyles(styles)(AssignmentsQues);
